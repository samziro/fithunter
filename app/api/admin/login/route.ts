import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('admin/login: missing env vars');
      return NextResponse.json({ ok: false, message: 'Server misconfigured' }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await request.json().catch(() => ({}));
    const name = String(body?.name || '').trim();
    const password = String(body?.password || '').trim();

    if (!name || !password) {
      return NextResponse.json({ ok: false, message: 'Missing credentials' }, { status: 400 });
    }

    // Adjust query to match your admin table columns (this assumes `name` and `password` columns exist).
    const { data: adminRow, error } = await supabase
      .from('adminCredentials')
      .select('id, name, password')
      .eq('name', name)
      .limit(1)
      .single();

    if (error || !adminRow) {
      console.error('admin/login: lookup failed', error);
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // NOTE: replace this with proper password hashing check if DB stores hashes
    if (adminRow.password !== password) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true, admin: { id: adminRow.id, name: adminRow.name } });

    // set httpOnly cookie
    res.cookies.set({
      name: 'adminAuth',
      value: encodeURIComponent(JSON.stringify({ id: adminRow.id, name: adminRow.name })),
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (err) {
    console.error('admin/login error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
