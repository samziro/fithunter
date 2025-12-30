'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BookPage() {
  const [selectedProgram, setSelectedProgram] = useState('personal');
  const [quantity, setQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    location: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'prompt_sent' | 'success' | 'failed'>('idle');
  const [checkoutRequestId, setCheckoutRequestId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const programs = [
    { id: 'personal', name: 'One-on-One Personal Training', price: 2000 },
    { id: 'group', name: 'Group Beach Classes', price: 1000 },
    { id: 'package10', name: '10-Session Package (Save 10%)', price: 18000 },
    { id: 'online', name: 'Online Coaching (Monthly)', price: 5000 },
  ];

  const selectedProgramData = programs.find((p) => p.id === selectedProgram);
  const totalAmount = selectedProgramData ? selectedProgramData.price * quantity : 0;

  const handleInputChange = (field: keyof typeof customerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || totalAmount === 0) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setStatus('processing');

    const phone = customerInfo.phone.replace(/\D/g, '');
    if (!/^2547\d{8}$/.test(phone)) {
      setErrorMsg('Please enter a valid Kenyan phone number (07xxxxxxxx)');
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      customerName: customerInfo.name.trim(),
      phone,
      location: customerInfo.location.trim(),
      program: selectedProgramData?.name || '',
      quantity,
      totalAmount,
      notes: customerInfo.notes.trim(),
    };

    try {
      const res = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to initiate payment');
      }

      if (result.CustomerMessage) {
        setCheckoutRequestId(result.CheckoutRequestID);
        setStatus('prompt_sent');
      } else {
        throw new Error('No response from M-Pesa');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Payment failed. Try again.');
      setStatus('failed');
      setIsSubmitting(false);
    }
  };

  // Prompt Sent Screen
  if (status === 'prompt_sent') {
    return (
      <div className="min-h-dvh bg-[#292929] flex items-center justify-center py-12 px-6">
        <div className="max-w-2xl w-full bg-[#4a4a4a] rounded-2xl shadow-2xl p-10 text-center">
          <i className="ri-smartphone-line text-8xl text-green-500 mb-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 font-poppins">
            Check Your Phone!
          </h1>
          <p className="text-xl text-slate-300 mb-8 font-inter leading-relaxed">
            An M-Pesa prompt has been sent to <span className="font-bold text-white">{customerInfo.phone}</span>.
          </p>
          <p className="text-lg text-slate-300 mb-10 font-inter">
            Enter your M-Pesa PIN to complete payment of <span className="font-bold text-yellow-500">KSh {totalAmount.toLocaleString()}</span> for {quantity} × {selectedProgramData?.name}.
          </p>

          <div className="bg-[#292929] rounded-xl p-6 mb-8">
            <p className="text-slate-400 text-sm font-inter">We'll confirm your booking once payment is received.</p>
          </div>

          <Link
            href="/"
            className="inline-block bg-yellow-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-yellow-700 transition-colors font-poppins"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#292929] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
            Book & Pay with M-Pesa
          </h1>
          <p className="text-xl text-slate-300 font-inter leading-relaxed">
            Secure direct payment using your existing Paybill. Get instant STK Push prompt.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Program Selection */}
          <div className="bg-[#4a4a4a] rounded-2xl shadow-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-8 font-poppins">Choose Program</h2>

            <div className="space-y-4 mb-8">
              {programs.map((program) => (
                <button
                  key={program.id}
                  type="button"
                  onClick={() => setSelectedProgram(program.id)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                    selectedProgram === program.id
                      ? 'border-yellow-600 bg-yellow-600/10 shadow-lg'
                      : 'border-slate-600 hover:border-yellow-600/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white font-poppins">{program.name}</h3>
                    <p className="text-2xl font-bold text-yellow-500">
                      KSh {program.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-lg font-medium text-slate-300 mb-4 font-poppins">
                Quantity
              </label>
              <div className="flex items-center justify-center space-x-6">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 bg-[#292929] rounded-full flex items-center justify-center hover:bg-yellow-600/20 transition">
                  <i className="ri-subtract-line text-2xl text-white" />
                </button>
                <span className="text-3xl font-bold text-white w-20 text-center font-poppins">{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 bg-[#292929] rounded-full flex items-center justify-center hover:bg-yellow-600/20 transition">
                  <i className="ri-add-line text-2xl text-white" />
                </button>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-600/50 rounded-xl p-5">
              <div className="flex items-center gap-4">
                <i className="ri-smartphone-line text-3xl text-green-400" />
                <div>
                  <p className="font-semibold text-white font-poppins">Direct M-Pesa STK Push</p>
                  <p className="text-sm text-slate-300 font-inter">Pay instantly to your Paybill</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Pay */}
          <div className="space-y-8">
            <div className="bg-[#4a4a4a] rounded-2xl shadow-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-8 font-poppins">Your Details</h2>

              <div className="space-y-6">
                {/* Same inputs as before */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-inter">Full Name *</label>
                  <input type="text" required value={customerInfo.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full px-5 py-4 bg-[#292929] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition" placeholder="John Doe" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-inter">Phone Number *</label>
                  <input type="tel" required value={customerInfo.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-5 py-4 bg-[#292929] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition" placeholder="07xxxxxxxx" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-inter">Preferred Location *</label>
                  <input type="text" required value={customerInfo.location} onChange={(e) => handleInputChange('location', e.target.value)} className="w-full px-5 py-4 bg-[#292929] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition" placeholder="Watamu Beach, hotel, or home" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-inter">Notes (Optional)</label>
                  <textarea value={customerInfo.notes} onChange={(e) => handleInputChange('notes', e.target.value)} rows={4} className="w-full px-5 py-4 bg-[#292929] border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition resize-none" placeholder="Goals, availability..." maxLength={500} />
                </div>
              </div>
            </div>

            <div className="bg-[#4a4a4a] rounded-2xl shadow-xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6 font-poppins">Order Summary</h3>
              <div className="space-y-4 text-slate-200 font-inter">
                <div className="flex justify-between"><span>{selectedProgramData?.name}</span><span>KSh {selectedProgramData?.price.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Quantity</span><span>{quantity}</span></div>
                <div className="border-t border-slate-600 pt-4 flex justify-between text-2xl font-bold text-white">
                  <span>Total</span>
                  <span className="text-yellow-500">KSh {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {errorMsg && <div className="mt-6 p-4 bg-red-900/30 border border-red-600/50 rounded-xl text-red-300 text-center font-inter">{errorMsg}</div>}

              <button type="submit" disabled={isSubmitting} className="w-full mt-8 bg-yellow-600 text-white py-5 rounded-xl text-xl font-bold hover:bg-yellow-700 disabled:opacity-60 disabled:cursor-not-allowed transition font-poppins flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Prompt...
                  </>
                ) : (
                  'Pay with M-Pesa (STK Push)'
                )}
              </button>

              <p className="text-center text-sm text-slate-400 mt-4 font-inter">
                Direct payment to your Paybill • No extra fees
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}