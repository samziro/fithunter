'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ClientModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!open) return null;

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
      const defaultEmail = process.env.NEXT_PUBLIC_CLIENT_DEFAULT_EMAIL || 'client@example.com';
      const defaultPass = process.env.NEXT_PUBLIC_CLIENT_DEFAULT_PASSWORD || 'password';

      if (trimmedEmail === defaultEmail && trimmedPassword === defaultPass) {
        localStorage.setItem('clientAuth', 'true');
        localStorage.setItem('clientEmail', trimmedEmail);
        onClose();
        router.push('/client/dashboard');
        return;
      }

      setError('Invalid credentials');
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="max-w-md w-full bg-[#4a4a4a] shadow-xl p-6">
        <div className="text-center mb-4">
          <Image src="/logo.png" alt="logo" width={48} height={48} className="mx-auto" />
          <h3 className="text-lg font-semibold mt-2 text-white">Client Sign In</h3>
          <p className="text-sm text-slate-100">Sign in to continue to payment and your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-100 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-100 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end space-x-2 text-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2  border">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2  bg-yellow-600 text-white disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
