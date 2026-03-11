'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, location]);

  const fetchJobs = async () => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (location) params.append('location', location);

    const res = await fetch(`/api/jobs?${params}`);
    const data = await res.json();
    setJobs(data);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">
            Find work in Gilgit-Baltistan
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Browse opportunities by skill and district, then apply in a few
            clicks.
          </p>
        </div>
        <Link
          href="/post-job"
          className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/40 hover:bg-sky-400"
        >
          + Post a Job
        </Link>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:grid-cols-2 sm:p-5">
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Job Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            key={job._id}
            href={`/jobs/${job._id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-sm shadow-slate-900/60 transition hover:-translate-y-0.5 hover:border-sky-500/60 hover:shadow-sky-900/40"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-50">
                {job.title}
              </h2>
              <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[11px] font-medium text-sky-300">
                {job.category}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {job.location}
            </p>
            {job.salary && (
              <p className="mt-2 text-sm font-medium text-emerald-300">
                {job.salary}
              </p>
            )}
            <p className="mt-3 line-clamp-2 text-xs text-slate-400">
              {job.description}
            </p>
            <span className="mt-4 inline-flex items-center text-xs font-medium text-sky-400 group-hover:text-sky-300">
              View details
              <span className="ml-1 transition group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ))}
        {jobs.length === 0 && (
          <p className="col-span-full rounded-xl border border-dashed border-slate-700/70 bg-slate-900/50 p-6 text-center text-sm text-slate-400">
            No jobs found for the selected filters yet. Try changing the
            category or location.
          </p>
        )}
      </div>
    </div>
  );
}


