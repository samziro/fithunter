import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: 'adminAuth',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
    return res;
  } catch (err) {
    console.error('admin/logout error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}