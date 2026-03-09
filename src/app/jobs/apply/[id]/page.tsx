'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function Apply() {
  const { id } = useParams();
  const [applicantName, setApplicantName] = useState('');
  const [applicantContact, setApplicantContact] = useState('');
  const [resume, setResume] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: id, applicantName, applicantContact, resume, message }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess('Application submitted successfully!');
      setTimeout(() => router.push('/jobs'), 2000);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div>
          <label className="block">Contact</label>
          <input
            type="text"
            value={applicantContact}
            onChange={(e) => setApplicantContact(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div>
          <label className="block">Resume (optional)</label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div>
          <label className="block">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Submit Application</button>
      </form>
    </div>
  );
}