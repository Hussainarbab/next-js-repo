'use client';

import { useEffect, useState } from 'react';
import { Message } from '@/types';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/messages', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="border p-4">
            <p><strong>From:</strong> {msg.from.name} ({msg.from.email})</p>
            <p><strong>Subject:</strong> {msg.subject}</p>
            <p><strong>Content:</strong> {msg.content}</p>
            <p><strong>Sent At:</strong> {new Date(msg.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}