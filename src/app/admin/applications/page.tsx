'use client';

import { useEffect, useState } from 'react';
import { Application } from '@/types';

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/applications', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setApplications);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Applications</h1>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="border p-4">
            <p><strong>Job:</strong> {app.job.title}</p>
            <p><strong>Applicant:</strong> {app.applicantName}</p>
            <p><strong>Contact:</strong> {app.applicantContact}</p>
            {app.resume && <p><strong>Resume:</strong> {app.resume}</p>}
            {app.message && <p><strong>Message:</strong> {app.message}</p>}
            <p><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}