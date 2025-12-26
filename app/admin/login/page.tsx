/* eslint-disable react/no-unescaped-entities */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Use environment variables for your Supabase credentials
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',

    
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Helper: trim all credentials
  const trimmedCredentials = {
    name: credentials.name.trim(),
    
    password: credentials.password.trim()
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check for empty fields
    if (!trimmedCredentials.name || !trimmedCredentials.password) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    // Query Supabase for admin credentials
    const { data, error: supabaseError } = await supabase
      .from('adminCredentials')
      .select('*')
      .eq('name', trimmedCredentials.name)
      
      .eq('password', trimmedCredentials.password)
      .single();

    setIsLoading(false);

    if (supabaseError || !data) {
      setError('Invalid name or password. Please try again.');
    } else {
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      router.push('/admin/orders');
    }
  };

  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check for empty fields
    if (!trimmedCredentials.name || !trimmedCredentials.password) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    // Check if user already exists (by email)
    const { data: existing, error: checkError } = await supabase
      .from('adminCredentials')
      .select('id')
     
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // Not found is fine, but other errors should be shown
      setIsLoading(false);
      setError('Error checking existing account. Please try again.');
      return;
    }

    if (existing) {
      setIsLoading(false);
      setError('Incorrect password or username.');
      return;
    }

    // Insert new admin
    const { error: insertError } = await supabase
      .from('adminCredentials')
      .insert([
        {
          name: trimmedCredentials.name,
          
          password: trimmedCredentials.password // plaintext for now; hash in production
        }
      ]);

    setIsLoading(false);

    if (insertError) {
      setError('Failed to create account. Please try again.');
      console.error(insertError);
    } else {
      setMode('login');
      setError('');
      setCredentials({ name: '', password: '' });
      alert('Account created! Please log in.');
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/favicon.png"
              alt="Tapps Broilers Logo"
              width={80}
              height={80}
              className="mx-auto mb-2 rounded-full"
            />
            <h1 className="text-3xl font-['Pacifico'] text-green-700 mb-2">Tapps Broilers</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Admin Login' : 'Admin Sign Up'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login'
              ? 'Access your order management dashboard'
              : 'Create an admin account to manage orders'}
          </p>
        </div>

        {/* Login/Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-user-3-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  autoComplete="username"
                  value={credentials.name}
                  onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-lock-2-line text-gray-400"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-green-600 hover:underline font-medium"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-green-600 hover:underline font-medium"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 font-medium cursor-pointer"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
