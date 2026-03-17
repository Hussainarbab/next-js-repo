'use client';

import { useEffect, useState } from 'react';

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

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view your profile.');
      setLoading(false);
      return;
    }

    fetch('/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProfile({
            ...data,
            portfolioImages: data.portfolioImages || [],
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load profile');
        setLoading(false);
      });
  }, []);

  const toggleSkill = (skill) => {
    if (!profile) return;
    const exists = profile.skills?.includes(skill);
    const skills = exists
      ? profile.skills.filter((s) => s !== skill)
      : [...(profile.skills || []), skill];
    setProfile({ ...profile, skills });
  };

  const updateField = (field, value) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const updatePortfolioImage = (index, value) => {
    if (!profile) return;
    const next = [...(profile.portfolioImages || [])];
    next[index] = value;
    setProfile({ ...profile, portfolioImages: next });
  };

  const addPortfolioImage = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      portfolioImages: [...(profile.portfolioImages || []), ''],
    });
  };

  const removePortfolioImage = (index) => {
    if (!profile) return;
    const next = [...(profile.portfolioImages || [])];
    next.splice(index, 1);
    setProfile({ ...profile, portfolioImages: next });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!profile) return;
    setError('');
    setSuccess('');
    setSaving(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login again.');
      setSaving(false);
      return;
    }

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        experience: profile.experience,
        skills: profile.skills || [],
        profileImage: profile.profileImage,
        portfolioImages: (profile.portfolioImages || []).filter((url) => url),
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (res.ok) {
      setProfile({ ...data, portfolioImages: data.portfolioImages || [] });
      setSuccess('Profile updated successfully.');
    } else {
      setError(data.error || 'Failed to update profile');
    }
  };

  const uploadFile = async (file, onUrlReady) => {
    if (!file) return;
    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        onUrlReady(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-300">Loading profile…</p>;
  }

  if (!profile) {
    return (
      <p className="text-sm text-red-400">
        {error || 'Profile not found.'}
      </p>
    );
  }

  const initials =
    profile.name &&
    profile.name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('');

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">
            Your Profile
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Keep your information up to date so employers can trust and contact
            you easily.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/70"
      >
        <div className="flex flex-col gap-4 border-b border-slate-800/70 pb-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 text-xl font-semibold text-slate-100">
              {profile.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials || 'GB'}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-50">
                {profile.name}
              </p>
              <p className="text-xs text-slate-400">
                {profile.email}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                CNIC: {profile.cnic || 'Not provided'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Full name
            </label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Phone number
            </label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Location (district)
            </label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Years of experience
            </label>
            <input
              type="text"
              value={profile.experience || ''}
              onChange={(e) => updateField('experience', e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              placeholder="e.g. 3-5 years"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[2fr,3fr]">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Profile picture
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  uploadFile(e.target.files?.[0], (url) =>
                    updateField('profileImage', url),
                  )
                }
                className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-500/90 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-950 hover:file:bg-sky-400"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Upload a clear photo so employers can recognize you.
            </p>
            <input
              type="text"
              value={profile.profileImage || ''}
              onChange={(e) => updateField('profileImage', e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              placeholder="Or paste an existing image URL"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-slate-800 text-xl font-semibold text-slate-100">
              {profile.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials || 'GB'}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Short bio
          </label>
          <textarea
            value={profile.bio || ''}
            onChange={(e) => updateField('bio', e.target.value)}
            className="min-h-22.5 w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            placeholder="Tell employers about your background, languages, and strengths."
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Skills & categories
            </label>
            <span className="text-[11px] text-slate-500">
              Tap to select multiple skills
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SKILL_CATEGORIES.map((skill) => {
              const active = profile.skills?.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    active
                      ? 'border-emerald-400/70 bg-emerald-500/25 text-emerald-200 shadow-sm shadow-emerald-500/40'
                      : 'border-slate-700/80 bg-slate-900 text-slate-300 hover:border-sky-500/70 hover:text-sky-200'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Work images / portfolio
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  files.forEach((file) =>
                    uploadFile(file, (url) =>
                      setProfile((prev) =>
                        prev
                          ? {
                              ...prev,
                              portfolioImages: [
                                ...(prev.portfolioImages || []),
                                url,
                              ],
                            }
                          : prev,
                      ),
                    ),
                  );
                }}
                className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-500/90 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-950 hover:file:bg-sky-400"
              />
              <button
                type="button"
                onClick={addPortfolioImage}
                className="text-xs font-medium text-sky-400 hover:text-sky-300"
              >
                + Add URL
              </button>
            </div>
          </div>
          {profile.portfolioImages && profile.portfolioImages.length > 0 && (
            <div className="grid gap-3 md:grid-cols-3">
              {profile.portfolioImages.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-950/60 p-2"
                >
                  <input
                    type="text"
                    value={url}
                    onChange={(e) =>
                      updatePortfolioImage(index, e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-950/80 px-2 py-1.5 text-[11px] text-slate-50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/40"
                    placeholder="Image URL"
                  />
                  {url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt="Work example"
                      className="h-24 w-full rounded-lg object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removePortfolioImage(index)}
                    className="w-full rounded-lg border border-slate-700/70 px-2 py-1 text-[11px] text-slate-300 hover:border-red-400/70 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {(!profile.portfolioImages ||
            profile.portfolioImages.length === 0) && (
            <p className="text-xs text-slate-500">
              Add a few image links showing your best work (e.g. carpentry,
              painting, construction, etc.).
            </p>
          )}
        </div>

        {uploading && (
          <p className="text-sm text-sky-300">
            Uploading image…
          </p>
        )}
        {error && !uploading && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-400">
            {success}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-xl bg-linear-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:from-sky-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

