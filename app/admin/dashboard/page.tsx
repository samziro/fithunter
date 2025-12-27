/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  notifications?: {
    message: string;
    timestamp: string;
    type: 'info' | 'success';
  }[];
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [sendingNotificationId, setSendingNotificationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const router = useRouter();

  // send notification (opens app/link) then mark booking as notified on server
  const sendNotification = async (booking: Booking, channel: 'whatsapp' | 'sms') => {
    if (sendingNotificationId) return;
    setSendingNotificationId(booking.id);
    try {
      const messageText = `Hi ${booking.customerName}, your booking #${booking.id} for ${booking.program} is ${booking.status}. Thank you for choosing Fit Hunter!`;
      const encoded = encodeURIComponent(messageText);
      const phone = formatPhoneForWhatsApp(booking.phone);

      if (channel === 'whatsapp') {
        window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
      } else {
        window.open(`sms:${booking.phone}?body=${encoded}`, '_blank');
      }

      // mark notified on server
      const res = await fetch('/api/admin/mark-notified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bookingId: booking.id }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        console.error('mark-notified failed', res.status, txt);
        setError('Failed to mark booking as notified.');
      } else {
        const json = await res.json().catch(() => ({}));
        if (json?.ok && json.booking) {
          setBookings((prev) => prev.map((o) => (o.id === json.booking.id ? { ...o, ...json.booking } : o)));
        } else {
          setBookings((prev) => prev.map((o) => (o.id === booking.id ? { ...o, notificationSent: true } : o)));
        }
      }
    } catch (e) {
      console.error('sendNotification error', e);
      setError('Failed to send notification.');
    } finally {
      setSendingNotificationId(null);
    }
  };

  // Fetch bookings from Supabase
  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('bookingDate', { ascending: false });

      if (error) {
        setError('Failed to fetch bookings.');
        setBookings([]);
        setLoading(false);
        return;
      }
      setBookings(data || []);
      setLoading(false);
    };

    loadBookings();

    const interval = setInterval(loadBookings, 10000);

    return () => clearInterval(interval);
  }, []);

  // Update booking status in Supabase
  // const updateBookingStatus = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'completed') => {
  //   setError('');
  //   try {
  //     const body = { bookingId, newStatus };

  //     const res = await fetch('/api/admin/update-booking', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       body: JSON.stringify(body),
  //     });

  //     if (!res.ok) {
  //       const txt = await res.text().catch(() => '');
  //       console.error('update-booking response status', res.status, 'text:', txt);
  //       const json = (() => { try { return JSON.parse(txt || '{}'); } catch { return {}; } })();
  //       setError(json?.message || `Update failed (status ${res.status})`);
  //       return;
  //     }

  //     const json = await res.json();
  //     if (!json?.ok) {
  //       console.error('updateBookingStatus failed:', json);
  //       setError(json?.message || 'Failed to update booking.');
  //       return;
  //     }

  //     const updated = json.booking;
  //     setBookings((prev) => prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)));
  //   } catch (err) {
  //     console.error('updateBookingStatus error', err);
  //     setError('Failed to update booking.');
  //   }
  // };

  

  const formatPhoneForWhatsApp = (phone: string) => {
    let cleaned = String(phone).replace(/[\s-]/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    }
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    return cleaned;
  };

  const filteredBookings = filter === 'all' ? bookings : bookings.filter((booking) => booking.status === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((o) => o.status === 'pending').length;
  const confirmedBookings = bookings.filter((o) => o.status === 'confirmed').length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    
      <div className="min-h-dvh bg-[#4a4a4a] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-xl md:text-3xl md:text-center font-bold text-white">Booking Management</h1>
              <p className="text-slate-100 my-4">Manage and track all client bookings - Updates in real-time</p>
            </div>
            <div className="flex flex-row space-x-4">
              <Link
                href="/"
                className="bg-yellow-600 text-white px-6 py-3  hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Back to Website
              </Link>
              {/* <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <i className="ri-logout-box-line"></i>
                  <span>Logout</span>
                </div>
              </button> */}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/30 shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="ri-calendar-check-line text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-yellow-500 text-sm">Total Clients</p>
                  <p className="text-2xl font-bold text-yellow-500">{totalBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/30 shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="ri-time-line text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-yellow-500 text-sm">Registered and not paid</p>
                  <p className="text-2xl font-bold text-yellow-500">{pendingBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/30 shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-yellow-500 text-sm">Registered and paid Clients</p>
                  <p className="text-2xl font-bold text-yellow-500">{confirmedBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 backdrop-blur-sm border-2 border-yellow-400/30 shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-yellow-500 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-yellow-500">KES {totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
            <div className="flex space-x-2 md:space-x-3">
              {(['all', 'pending', 'confirmed', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`${filter === status ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-lg md:px-6 md:py-2 md:rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-1 md:ml-2 text-sm">
                      ({status === 'pending' ? pendingBookings : status === 'confirmed' ? confirmedBookings : bookings.filter((o) => o.status === 'completed').length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <i className="ri-error-warning-line text-red-500"></i>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* New Booking Alert */}
          {!loading && bookings.some((booking) => booking.status === 'pending' && !booking.notificationSent) && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="ri-notification-3-line text-yellow-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-yellow-800">New Bookings Available!</p>
                  <p className="text-yellow-700 text-sm">
                    You have {bookings.filter((o) => o.status === 'pending' && !o.notificationSent).length} new bookings waiting.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bookings List */}
          <div className="space-y-4">
            {!loading && filteredBookings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-inbox-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600">No bookings match your current filter.</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-lg font-bold text-gray-900">Booking #{booking.id}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        {booking.notificationSent && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Notified
                          </span>
                        )}
                        {booking.status === 'pending' && !booking.notificationSent && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium animate-pulse">
                            New
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="font-semibold">Client</p>
                          <p className="text-sm text-gray-600">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.phone}</p>
                        </div>

                        <div>
                          <p className="font-semibold">Program & Sessions</p>
                          <p className="text-sm text-gray-600">{booking.quantity} x {booking.program}</p>
                          <p className="text-sm text-blue-600 font-medium">KES {booking.totalAmount}</p>
                        </div>

                        <div>
                          <p className="font-semibold">Preferred Area</p>
                          <p className="text-sm text-gray-600">{booking.location}</p>
                        </div>

                        <div>
                          <p className="font-semibold">Booking Date</p>
                          <p className="text-sm text-gray-600">{formatDate(booking.bookingDate)}</p>
                        </div>

                        {booking.notes && (
                          <div className="md:col-span-2">
                            <p className="font-semibold">Notes</p>
                            <p className="text-sm text-gray-600">{booking.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 lg:w-48">
                      {/* Status Update */}
                      {/* <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer pr-8"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select> */}

                      {/* Notify Client Buttons */}
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => sendNotification(booking, 'whatsapp')}
                          disabled={booking.status === 'completed' || sendingNotificationId === booking.id}
                          className={`flex-1 px-2 py-2 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            booking.status === 'completed' || sendingNotificationId === booking.id
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          title="Notify via WhatsApp"
                        >
                          {sendingNotificationId === booking.id ? 'Sending...' : 'WhatsApp'}
                        </button>

                        <button
                          type="button"
                          onClick={() => sendNotification(booking, 'sms')}
                          disabled={booking.status === 'completed' || sendingNotificationId === booking.id}
                          className={`flex-1 px-2 py-2 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            booking.status === 'completed' || sendingNotificationId === booking.id
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          title="Notify via SMS"
                        >
                          {sendingNotificationId === booking.id ? 'Sending...' : 'SMS'}
                        </button>
                      </div>

                      {/* Call Client */}
                      <a
                        href={`tel:${booking.phone}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-center whitespace-nowrap cursor-pointer"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <i className="ri-phone-line"></i>
                          <span>Call</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    
  );
}