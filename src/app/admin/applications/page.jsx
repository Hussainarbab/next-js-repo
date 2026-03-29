'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/applications', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setApplications);
  }, []);

  const jobs = useMemo(() => {
    const map = new Map();
    applications.forEach((app) => {
      if (app.job && !map.has(app.job._id)) {
        map.set(app.job._id, app.job);
      }
    });
    return Array.from(map.values());
  }, [applications]);

  const filteredApplications = applications.filter(
    (app) => !selectedJobId || (app.job && app.job._id === selectedJobId),
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Applications</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="p-2 border w-full md:w-1/2"
        >
          <option value="">All Jobs</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title} ({job.location})
            </option>
          ))}
        </select>
        <span className="text-gray-600">
          Showing {filteredApplications.length} of {applications.length} applications
        </span>
      </div>

      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <div key={app._id} className="border p-4 rounded shadow-sm">
            <p>
              <strong>Job:</strong> {app.job?.title || 'N/A'}
            </p>
            <p>
              <strong>Applicant:</strong> {app.applicantName}
            </p>
            <p>
              <strong>Contact:</strong> {app.applicantContact}
            </p>
            {app.resume && (
              <p>
                <strong>Resume:</strong> {app.resume}
              </p>
            )}
            {app.message && (
              <p>
                <strong>Message:</strong> {app.message}
              </p>
            )}
            <p>
              <strong>Applied At:</strong>{' '}
              {app.appliedAt
                ? new Date(app.appliedAt).toLocaleString()
                : 'N/A'}
            </p>
          </div>
        ))}
        {filteredApplications.length === 0 && (
          <p className="text-gray-600">No applications found for this job.</p>
        )}
      </div>
    </div>
  );
}

//////dd///
'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/applications', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setApplications);
  }, []);

  const jobs = useMemo(() => {
    const map = new Map();
    applications.forEach((app) => {
      if (app.job && !map.has(app.job._id)) {
        map.set(app.job._id, app.job);
      }
    });
    return Array.from(map.values());
  }, [applications]);

  const filteredApplications = applications.filter(
    (app) => !selectedJobId || (app.job && app.job._id === selectedJobId),
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Applications</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="p-2 border w-full md:w-1/2"
        >
          <option value="">All Jobs</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title} ({job.location})
            </option>
          ))}
        </select>
        <span className="text-gray-600">
          Showing {filteredApplications.length} of {applications.length} applications
        </span>
      </div>

      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <div key={app._id} className="border p-4 rounded shadow-sm">
            <p>
              <strong>Job:</strong> {app.job?.title || 'N/A'}
            </p>
            <p>
              <strong>Applicant:</strong> {app.applicantName}
            </p>
            <p>
              <strong>Contact:</strong> {app.applicantContact}
            </p>
            {app.resume && (
              <p>
                <strong>Resume:</strong> {app.resume}
              </p>
            )}
            {app.message && (
              <p>
                <strong>Message:</strong> {app.message}
              </p>
            )}
            <p>
              <strong>Applied At:</strong>{' '}
              {app.appliedAt
                ? new Date(app.appliedAt).toLocaleString()
                : 'N/A'}
            </p>
          </div>
        ))}
        {filteredApplications.length === 0 && (
          <p className="text-gray-600">No applications found for this job.</p>
        )}
      </div>
    </div>
  );
}

