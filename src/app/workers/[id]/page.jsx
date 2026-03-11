'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const SKILL_CATEGORIES = [
  'Labor',
  'Driver',
  'Electrician',
  'Plumber',
  'Mechanic',
  'Painter',
  'Carpenter',
  'Technician',
];

export default function WorkerProfilePage() {
  const params = useParams();
  const id = params?.id;

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setWorker(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load worker profile');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-sm text-slate-300">Loading worker profile…</p>;
  }

  if (!worker) {
    return (
      <p className="text-sm text-red-400">
        {error || 'Worker not found.'}
      </p>
    );
  }

  const initials =
    worker.name &&
    worker.name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('');

  const skills = worker.skills || [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/70 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-slate-800 text-2xl font-semibold text-slate-100">
            {worker.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={worker.profileImage}
                alt={worker.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{initials || 'GB'}</span>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-50">
              {worker.name}
            </p>
            <p className="text-xs text-slate-400">
              {worker.location || 'Location not specified'}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {worker.experience
                ? `${worker.experience} experience`
                : 'Experience not specified'}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Contact: {worker.phone || worker.email}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
            <h2 className="text-sm font-semibold text-slate-100">
              About
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {worker.bio || 'This worker has not added a bio yet.'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Skills & categories
              </h2>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-emerald-400/70 bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-500">
                  No skills listed yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
            <h2 className="text-sm font-semibold text-slate-100">
              Verification
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              CNIC:{' '}
              <span className="font-mono text-slate-200">
                {worker.cnic || 'Not provided'}
              </span>
            </p>
            {worker.role === 'driver' && (
              <p className="mt-1 text-xs text-slate-400">
                Licence:{' '}
                <span className="font-mono text-slate-200">
                  {worker.drivingLicence || 'Not provided'}
                </span>
              </p>
            )}
            <p className="mt-2 text-xs text-slate-400">
              Status:{' '}
              <span className="font-semibold text-emerald-300">
                {worker.verified ? 'Verified' : 'Not verified'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-100">
          Work images / portfolio
        </h2>
        {worker.portfolioImages && worker.portfolioImages.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {worker.portfolioImages.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="Work example"
                  className="h-40 w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            This worker has not added any portfolio images yet.
          </p>
        )}
      </div>
    </div>
  );
}

