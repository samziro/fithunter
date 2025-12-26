'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!open) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      const json = await res.json();

      if (json?.ok) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminName', name);
        onClose();
        router.push('/admin/orders');
        return;
      }

      // Fallback: allow default credentials from env (exposed as NEXT_PUBLIC_...)
      const defaultName = process.env.NEXT_PUBLIC_ADMIN_DEFAULT_NAME || 'admin';
      const defaultPass = process.env.NEXT_PUBLIC_ADMIN_DEFAULT_PASSWORD || 'password';

      if (name === defaultName && password === defaultPass) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminName', name);
        onClose();
        router.push('/admin/orders');
        return;
      }

      setError(json?.message || 'Invalid credentials');
    } catch (err) {
      setError('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-semibold mb-4">Admin Login</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
