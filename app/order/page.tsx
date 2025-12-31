'use client';

import { useState } from 'react';

export default function PaymentForm({ account }: { account: string }) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const isValidPhone = (phone: string) =>
    /^254(7|1)\d{8}$/.test(phone);

  const handlePayment = async () => {
    if (!isValidPhone(phone)) {
      alert('Enter a valid phone number (2547XXXXXXXX)');
      return;
    }

    if (!amount || amount <= 0) {
      alert('Enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: Number(amount),
          account, // e.g FITNESS-GOLD
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.error || 'Payment initiation failed');
        return;
      }

      alert('STK Push sent. Check your phone 📱');
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 max-w-sm">
      <input
        type="text"
        placeholder="Phone (2547XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value.trim())}
        className="border p-2 w-full text-gray-900"
      />

      <input
        type="number"
        placeholder="Amount (KES)"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value === '' ? '' : Number(e.target.value))
        }
        className="border p-2 w-full text-gray-900"
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-black text-white p-2 w-full disabled:opacity-50"
      >
        {loading ? 'Processing…' : 'Pay Now'}
      </button>
    </div>
  );
}
