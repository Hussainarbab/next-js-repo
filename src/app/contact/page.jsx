'use client';

import { useState } from 'react';

export default function Contact() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first');
      return;
    }

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` },
      body: JSON.stringify({ to: 'admin@example.com', subject, content }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess('Message sent successfully!');
      setSubject('');
      setContent('');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Contact Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div>
          <label className="block">Message</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2">
          Send Message
        </button>
      </form>
    </div>
  );
}

fgFD
gTT
GHGGF
h
gB
fB
fgV
fB
fn
gF
B
gfFFH
fbV
fB
<GfN><BGfB>gfB
  <GFb><VgfB>FDg</VgfB></GFb></BGfB></GfN>

