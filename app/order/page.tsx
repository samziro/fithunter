/* eslint-disable react/no-unescaped-entities */
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
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const programs = [
    { id: 'personal', name: 'Personal Training', price: 2000 },
    { id: 'abs', name: 'Defined Abs Program', price: 2000 },
    { id: 'custom', name: 'Custom Workout Programs', price: 2000 },
    { id: 'online', name: 'Online Coaching', price: 2000 },
  ];

  const selectedProgramData = programs.find(p => p.id === selectedProgram);
  const totalAmount = selectedProgramData ? selectedProgramData.price * quantity : 0;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customerName: customerInfo.name,
      phone: customerInfo.phone.replace(/\D/g, ''),
      location: customerInfo.location,
      program: selectedProgramData?.name,
      quantity: quantity,
      totalAmount: totalAmount,
      notes: customerInfo.notes
    };

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const result = await res.json();
      setIsSubmitting(false);
      if (res.ok && result.orderId) {
        setOrderId(result.orderId);
        setOrderSubmitted(true);
      } else {
        alert(result.error || 'Failed to submit booking. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      alert('Failed to submit booking. Please try again.');
    }
  };

  if (orderSubmitted) {
    return (
      <div className="min-h-dvh bg-gray-50 pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-blue-600 text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for choosing Fit Hunter. We'll contact you shortly at {customerInfo.phone} to confirm your program and arrange details.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Booking Summary:</h3>
              <p className="text-sm text-gray-600 mb-2">Booking ID: #{orderId}</p>
              <p className="font-bold">{quantity}x {selectedProgramData?.name} - KES {totalAmount}</p>
              <p className="text-sm text-gray-600">Payment via M-Pesa</p>
            </div>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Program</h1>
          <p className="text-gray-600">Secure your transformation with online M-Pesa payment—all programs KES 2000</p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Program Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Select Your Program</h2>

            <div className="space-y-4 mb-6">
              {programs.map((program) => (
                <div 
                  key={program.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedProgram === program.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedProgram(program.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{program.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">KES {program.price}</p>
                      <div className={`w-4 h-4 rounded-full border-2 mt-2 ${
                        selectedProgram === program.id 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Sessions/Packages)</label>
              <div className="flex items-center space-x-4">
                <button 
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  <i className="ri-subtract-line"></i>
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button 
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <i className="ri-smartphone-line text-2xl text-blue-600"></i>
                <div>
                  <p className="font-medium text-blue-800">Payment via M-Pesa</p>
                  <p className="text-sm text-blue-600">Secure online payment processed instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="07xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location / Preferred Session Area *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Watamu Beach or preferred area"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={customerInfo.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  placeholder="Any fitness goals, preferred times, or special requests"
                  maxLength={500}
                ></textarea>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <input id="agreeTerms" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" required type="checkbox" />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700 cursor-pointer">
                    <span className="font-medium">I agree to the payment terms:</span><br />
                    Payment is processed securely via M-Pesa. Once confirmed, bookings are non-refundable but can be rescheduled with 24 hours notice.
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mt-6">
              <h3 className="font-semibold mb-3">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{selectedProgramData?.name}</span>
                  <span>KES {selectedProgramData?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">KES {totalAmount}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Payment: M-Pesa (Paybill/Till to be provided after submission)
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-6 disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Booking...</span>
                </div>
              ) : (
                'Complete Booking & Pay via M-Pesa'
              )}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              After submission, you will receive M-Pesa payment instructions via SMS. Your booking is confirmed upon successful payment.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}