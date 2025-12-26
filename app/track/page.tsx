/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  location: string;
  program: string;
  quantity: number;
  totalAmount: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed';
  bookingDate: string;
  notificationSent: boolean;
  notifications: Array<{
    message: string;
    timestamp: string;
    type: 'info' | 'success' | 'warning';
  }>;
}

export default function TrackBookingPage() {
  const [bookingId, setBookingId] = useState('');
  const [phone, setPhone] = useState('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setBooking(null);
    try {
      const res = await fetch(`/api/book?id=${bookingId}&phone=${phone}`);
      const result = await res.json();
      setIsLoading(false);
      if (res.ok && result.booking) {
        const foundBooking = result.booking;
        let notifications = foundBooking.notifications;
        if (!notifications || notifications.length === 0) {
          notifications = [];
          notifications.push({
            message: `Booking #${foundBooking.id} has been received. We'll contact you shortly to confirm payment and schedule.`,
            timestamp: foundBooking.bookingDate,
            type: 'info' as const
          });
          if (foundBooking.status === 'confirmed' || foundBooking.status === 'completed') {
            notifications.push({
              message: 'Your payment has been confirmed and booking is scheduled.',
              timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
              type: 'info' as const
            });
          }
          if (foundBooking.status === 'completed') {
            notifications.push({
              message: 'Your sessions are complete. Thank you for training with Fit Hunter!',
              timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
              type: 'success' as const
            });
          }
        }
        setBooking({
          ...foundBooking,
          notifications
        });
      } else {
        setError(result.error || 'Booking not found. Please check your Booking ID and phone number.');
      }
    } catch (e) {
      setIsLoading(false);
      setError('Booking not found. Please check your Booking ID and phone number.');
    }
  };

  // Poll for updates when a booking has been found (every 10s)
  useEffect(() => {
    if (!booking) return;
    let mounted = true;
    const pollInterval = 10000;
    const id = String(booking.id);
    const doPoll = async () => {
      try {
        const res = await fetch(`/api/book?id=${encodeURIComponent(id)}&phone=${encodeURIComponent(phone)}`);
        if (!res.ok) return;
        const result = await res.json();
        if (!mounted) return;
        if (result.booking) {
          setBooking((prev) => ({
            ...prev!,
            ...result.booking,
            notifications: result.booking.notifications ?? prev?.notifications ?? []
          }));
        }
      } catch (e) {
        console.error(e);
      }
    };

    doPoll();
    const interval = setInterval(doPoll, pollInterval);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [booking?.id, phone]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'ri-time-line';
      case 'confirmed': return 'ri-calendar-check-line';
      case 'completed': return 'ri-check-double-line';
      default: return 'ri-information-line';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'ri-check-line';
      case 'warning': return 'ri-alert-line';
      default: return 'ri-information-line';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <>
      <Header/>
      <div className="min-h-dvh bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Booking</h1>
            <p className="text-gray-600">Enter your booking details to see the latest updates and payment status</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleTrackBooking} className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
                  <input
                    type="text"
                    required
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your 6-digit booking ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Phone number used for booking"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    'Track Booking'
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2">
                  <i className="ri-error-warning-line text-red-600"></i>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Booking Details */}
          {booking && (
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Booking #{booking.id}</h2>
                  <div className={`px-4 py-2 rounded-full border-2 font-medium ${getStatusColor(booking.status)}`}>
                    <div className="flex items-center space-x-2">
                      <i className={`${getStatusIcon(booking.status)} text-lg`}></i>
                      <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Program:</span> {booking.quantity}x {booking.program}</p>
                      <p><span className="text-gray-600">Total Amount:</span> <span className="font-semibold text-blue-600">KES {booking.totalAmount}</span></p>
                      <p><span className="text-gray-600">Payment:</span> M-Pesa</p>
                      <p><span className="text-gray-600">Booking Date:</span> {formatDate(booking.bookingDate)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Client Information</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Name:</span> {booking.customerName}</p>
                      <p><span className="text-gray-600">Phone:</span> {booking.phone}</p>
                      <p><span className="text-gray-600">Preferred Area:</span> {booking.location}</p>
                      {booking.notes && (
                        <p><span className="text-gray-600">Notes:</span> {booking.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Booking Progress</h3>
                
                <div className="space-y-4">
                  {/* Pending */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <i className="ri-calendar-event-line"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Booking Received</p>
                      <p className="text-sm text-gray-600">Your booking has been received. Complete M-Pesa payment to confirm.</p>
                    </div>
                    {(booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'completed') && (
                      <i className="ri-check-line text-blue-600 text-xl"></i>
                    )}
                  </div>

                  {/* Confirmed */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${booking.status === 'confirmed' || booking.status === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <i className="ri-checkbox-circle-line"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Payment Confirmed</p>
                      <p className="text-sm text-gray-600">Your payment is confirmed and sessions are scheduled.</p>
                    </div>
                    {(booking.status === 'confirmed' || booking.status === 'completed') && (
                      <i className="ri-check-line text-blue-600 text-xl"></i>
                    )}
                  </div>

                  {/* Completed */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${booking.status === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <i className="ri-check-double-line"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Completed</p>
                      <p className="text-sm text-gray-600">Your program sessions are complete. Thank you!</p>
                    </div>
                    {booking.status === 'completed' && (
                      <i className="ri-check-line text-blue-600 text-xl"></i>
                    )}
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Booking Updates</h3>
                
                {booking.notifications && booking.notifications.length > 0 ? (
                  <div className="space-y-4">
                    {booking.notifications.map((notification, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          <i className={`${getNotificationIcon(notification.type)} text-sm`}></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">{notification.message}</p>
                          <p className="text-sm text-gray-600 mt-1">{formatDate(notification.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-notification-3-line text-gray-400 text-2xl"></i>
                    </div>
                    <p className="text-gray-600">No updates available yet</p>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                  <p className="text-blue-700 mb-4">Contact us if you have questions about your booking or payment</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="tel:+254769751566"
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <i className="ri-phone-line"></i>
                        <span>Call Us</span>
                      </div>
                    </a>
                    <Link
                      href="/"
                      className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}