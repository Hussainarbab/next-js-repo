'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/types';

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState({ title: '', description: '', category: '', location: '', salary: '', contact: '' });
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/jobs', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setJobs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/jobs/${editing}` : '/api/jobs';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchJobs();
      setForm({ title: '', description: '', category: '', location: '', salary: '', contact: '' });
      setEditing(null);
    }
  };

  const handleEdit = (job: Job) => {
    setForm({ title: job.title, description: job.description, category: job.category, location: job.location, salary: job.salary || '', contact: job.contact });
    setEditing(job._id);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/jobs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchJobs();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Manage Jobs</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-2 border" required />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full p-2 border" required>
          <option value="">Select Category</option>
          <option value="Driver">Driver</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Mason">Mason</option>
          <option value="Technician">Technician</option>
        </select>
        <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full p-2 border" required>
          <option value="">Select Location</option>
          <option value="Gilgit">Gilgit</option>
          <option value="Skardu">Skardu</option>
          <option value="Hunza">Hunza</option>
          <option value="Nagar">Nagar</option>
        </select>
        <input type="text" placeholder="Salary (optional)" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} className="w-full p-2 border" />
        <input type="text" placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full p-2 border" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">{editing ? 'Update' : 'Add'} Job</button>
      </form>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 flex justify-between">
            <div>
              <h2 className="font-bold">{job.title}</h2>
              <p>{job.category} - {job.location}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(job)} className="text-blue-600 mr-2">Edit</button>
              <button onClick={() => handleDelete(job._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}