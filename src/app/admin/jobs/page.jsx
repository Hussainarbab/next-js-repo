'use client';

import { useEffect, useState } from 'react';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    salary: '',
    contact: '',
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/jobs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setJobs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/jobs/${editing}` : '/api/jobs';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchJobs();
      setForm({
        title: '',
        description: '',
        category: '',
        location: '',
        salary: '',
        contact: '',
      });
      setEditing(null);
    }
  };

  const handleEdit = (job) => {
    setForm({
      title: job.title,
      description: job.description,
      category: job.category,
      location: job.location,
      salary: job.salary || '',
      contact: job.contact,
    });
    setEditing(job._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  const categories = [
    'Driver',
    'Carpenter',
    'Mason',
    'Technician',
    'Electrician',
    'Plumber',
    'Welder',
    'Tailor',
    'Chef / Cook',
    'Teacher',
    'IT Support',
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Manage Jobs</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full p-2 border"
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Salary (optional)"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          className="w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editing ? 'Update' : 'Add'} Job
        </button>
      </form>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 flex justify-between">
            <div>
              <h2 className="font-bold">{job.title}</h2>
              <p className="text-sm text-gray-600">
                {job.category} - {job.location}
              </p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(job)}
                className="text-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="text-gray-600">No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
}

