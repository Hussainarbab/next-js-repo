'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Job } from '@/types';

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [category, location]);

  const fetchJobs = async () => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (location) params.append('location', location);

    const res = await fetch(`/api/jobs?${params}`);
    const data = await res.json();
    setJobs(data);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>
      <div className="mb-4 flex space-x-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border">
          <option value="">All Categories</option>
          <option value="Driver">Driver</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Mason">Mason</option>
          <option value="Technician">Technician</option>
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 border">
          <option value="">All Locations</option>
          <option value="Gilgit">Gilgit</option>
          <option value="Skardu">Skardu</option>
          <option value="Hunza">Hunza</option>
          <option value="Nagar">Nagar</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.category} - {job.location}</p>
            <p>{job.salary && `Salary: ${job.salary}`}</p>
            <Link href={`/jobs/${job._id}`} className="text-blue-600">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}