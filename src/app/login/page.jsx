'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      setLoading(false);

      if (!res.ok) {
        try {
          const data = JSON.parse(text);
          setError(data.error || 'Login failed');
        } catch {
          setError(text || 'Login failed');
        }
        return;
      }

      const data = text ? JSON.parse(text) : {};
      if (!data.token || !data.user) {
        setError('Login failed. Invalid server response.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push(data.user.role === 'admin' ? '/admin' : '/jobs');
    } catch (err) {
      console.error('Login error', err);
      setLoading(false);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="form-card w-full max-w-md rounded-2xl bg-slate-900/70 p-8 shadow-xl shadow-slate-900/60 ring-1 ring-slate-800/80">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-50">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Sign in to manage jobs, applications and your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 placeholder-slate-500 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2.5 pr-10 text-sm text-slate-50 placeholder-slate-500 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 flex items-center text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-sky-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:from-sky-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold text-sky-400 hover:text-sky-300"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}


