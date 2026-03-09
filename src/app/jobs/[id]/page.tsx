'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Job } from '@/types';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/jobs/${id}`)
        .then((res) => res.json())
        .then(setJob);
    }
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="mb-2"><strong>Category:</strong> {job.category}</p>
      <p className="mb-2"><strong>Location:</strong> {job.location}</p>
      {job.salary && <p className="mb-2"><strong>Salary:</strong> {job.salary}</p>}
      <p className="mb-2"><strong>Contact:</strong> {job.contact}</p>
      <p className="mb-4">{job.description}</p>
      <Link href={`/jobs/apply/${id}`} className="bg-blue-600 text-white px-4 py-2 rounded">Apply Now</Link>
    </div>
  );
}