'use client';

import { useEffect, useState } from 'react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [replyingToId, setReplyingToId] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/messages', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  const startReply = (msg) => {
    setReplyingToId(msg._id);
    setReplySubject(msg.subject.startsWith('Re:')
      ? msg.subject
      : `Re: ${msg.subject}`);
    setReplyContent('');
    setStatus('');
  };

  const submitReply = async (msg) => {
    setStatus('');
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Missing admin token');
      return;
    }

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: msg.from?.email,
        subject: replySubject,
        content: replyContent,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Reply sent successfully.');
      setReplyingToId(null);
      setReplySubject('');
      setReplyContent('');
    } else {
      setStatus(data.error || 'Failed to send reply.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      {status && <p className="mb-4 text-sm text-blue-700">{status}</p>}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="border p-4 rounded shadow-sm">
            <p>
              <strong>From:</strong> {msg.from?.name} ({msg.from?.email})
            </p>
            <p>
              <strong>Subject:</strong> {msg.subject}
            </p>
            <p>
              <strong>Content:</strong> {msg.content}
            </p>
            <p>
              <strong>Sent At:</strong>{' '}
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleString()
                : 'N/A'}
            </p>

            <button
              className="mt-3 text-blue-600"
              onClick={() => startReply(msg)}
            >
              Reply
            </button>

            {replyingToId === msg._id && (
              <div className="mt-4 border-t pt-4 space-y-3">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Subject"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                />
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={() => submitReply(msg)}
                  >
                    Send Reply
                  </button>
                  <button
                    className="px-4 py-1 border rounded"
                    onClick={() => {
                      setReplyingToId(null);
                      setReplySubject('');
                      setReplyContent('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-600">No messages yet.</p>
        )}
      </div>
    </div>
  );
}

