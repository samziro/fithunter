'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ClientLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      // Try server-side login API if you have one (not required)
      // Fallback to environment-provided default creds for dev
      const defaultEmail = process.env.NEXT_PUBLIC_CLIENT_DEFAULT_EMAIL || 'client@example.com';
      const defaultPass = process.env.NEXT_PUBLIC_CLIENT_DEFAULT_PASSWORD || 'password';

      if (trimmedEmail === defaultEmail && trimmedPassword === defaultPass) {
        localStorage.setItem('clientAuth', 'true');
        localStorage.setItem('clientEmail', trimmedEmail);
        router.push('/client/dashboard');
        return;
      }

      // If you have Supabase auth, you could sign in here.
      setError('Invalid credentials');
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <Image src="/favicon.png" alt="logo" width={64} height={64} className="mx-auto" />
          <h2 className="text-2xl font-bold mt-2">Client Sign In</h2>
          <p className="text-sm text-gray-500">Sign in to access your dashboard and purchased programs</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
