import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Diagnostic: return which env var(s) are missing (no secret values are exposed)
export async function POST(request: Request) {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const missing: string[] = [];
    if (!SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');

    if (missing.length) {
      console.error('update-booking: missing env vars ->', missing.join(', '));
      return NextResponse.json(
        { ok: false, message: `Server misconfigured: missing ${missing.join(', ')}` },
        { status: 500 }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const body = await request.json().catch(() => ({}));
    const bookingId = body?.bookingId;
    const newStatus = String(body?.newStatus || '').trim();

    if (!bookingId || !newStatus) {
      return NextResponse.json({ ok: false, message: 'Missing bookingId or newStatus' }, { status: 400 });
    }

    if (!['pending', 'confirmed', 'completed'].includes(newStatus)) {
      return NextResponse.json({ ok: false, message: 'Invalid status' }, { status: 400 });
    }

    const payload = { 
      status: newStatus, 
      notificationSent: newStatus !== 'pending' 
    };

    const { data: updated, error: updateErr } = await supabase
      .from('bookings')
      .update(payload)
      .eq('id', bookingId)
      .select('id, status, notificationSent')
      .single();

    if (updateErr || !updated) {
      console.error('Booking update error', updateErr);
      return NextResponse.json({ ok: false, message: 'Failed to update booking' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, booking: updated });
  } catch (err: any) {
    console.error('update-booking route unexpected error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}