import { NextResponse } from 'next/server';

const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE!; // Your Paybill
const MPESA_PASSKEY = process.env.MPESA_PASSKEY!;
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;
const CALLBACK_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/mpesa/callback`;

async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', { // Change to api.safaricom.co.ke for production
    headers: { Authorization: `Basic ${auth}` },
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await getAccessToken();

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

    const stkBody = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: body.totalAmount,
      PartyA: body.phone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: body.phone,
      CallBackURL: CALLBACK_URL,
      AccountReference: `FH${Date.now()}`,
      TransactionDesc: `${body.program} booking`,
    };

    const res = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkBody),
    });

    const result = await res.json();

    if (result.ResponseCode === '0') {
      // Save booking to Supabase with CheckoutRequestID = result.CheckoutRequestID
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: result.CustomerMessage || 'STK Push failed' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('STK Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}