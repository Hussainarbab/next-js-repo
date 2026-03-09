'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Job, Application, Message } from '@/types';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/jobs', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setJobs);

    fetch('/api/applications', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setApplications);

    fetch('/api/messages', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Jobs ({jobs.length})</h2>
          <Link href="/admin/jobs" className="text-blue-600">Manage Jobs</Link>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Applications ({applications.length})</h2>
          <Link href="/admin/applications" className="text-blue-600">View Applications</Link>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Messages ({messages.length})</h2>
          <Link href="/admin/messages" className="text-blue-600">View Messages</Link>
        </div>
      </div>
    </div>
  );
}