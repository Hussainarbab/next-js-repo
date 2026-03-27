'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Labor',
    'Driver',
    'Electrician',
    'Plumber',
    'Mechanic',
    'Painter',
    'Carpenter',
    'Technician',
  ];

  const locations = [
    'Gilgit',
    'Skardu',
    'Hunza',
    'Nagar',
    'Astore',
    'Diamer',
    'Ghizer',
    'Ghanche',
    'Shigar',
    'Kharmang',
    'Tangir',
    'Darel',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first to post a job.');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        category,
        location,
        salary,
        contact,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess('Job posted successfully!');
      setTimeout(() => router.push('/jobs'), 1500);
    } else {
      setError(data.error || 'Failed to post job');
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Post a Job</h1>
        <p className="mt-1 text-sm text-slate-400">
          Share your opportunity so workers in Gilgit-Baltistan can apply.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/70"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Job title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              placeholder="e.g. Experienced electrician needed"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            required
          >
            <option value="">Select district</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Job description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-30 w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            placeholder="Describe the work, required skills, and any important details."
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Salary / Payment
            </label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              placeholder="e.g. PKR 2,500 / day"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Contact details
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              placeholder="Phone or WhatsApp number"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-400">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-sky-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:from-sky-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Posting…' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}



