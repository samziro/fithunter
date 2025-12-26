import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body?.slug || '').trim();
    if (!slug) return NextResponse.json({ ok: false, message: 'Missing slug' }, { status: 400 });

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ ok: false, message: 'Server misconfigured' }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { error } = await supabase.from('blogs').delete().eq('slug', slug);
    if (error) {
      console.error('delete-blog error', error);
      return NextResponse.json({ ok: false, message: 'Delete failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('delete-blog exception', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
