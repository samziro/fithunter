import { NextResponse } from 'next/server';
// Import Supabase client

export async function POST(request: Request) {
  const body = await request.json();
  // Log and update booking status in Supabase based on ResultCode
  console.log('M-Pesa Callback:', body);

  if (body.Body.stkCallback.ResultCode === 0) {
    // Success - update booking to confirmed
  } else {
    // Failed/Cancelled
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
}