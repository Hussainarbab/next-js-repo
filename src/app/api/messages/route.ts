import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  await dbConnect();

  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const messages = await Message.find({ to: user._id }).populate('from', 'name email').sort({ createdAt: -1 });
  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  await dbConnect();

  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { to, subject, content } = await request.json();

  if (!to || !subject || !content) {
    return NextResponse.json({ error: 'To, subject, and content are required' }, { status: 400 });
  }

  const recipient = await User.findOne({ email: to, role: 'admin' });
  if (!recipient) {
    return NextResponse.json({ error: 'Recipient not found' }, { status: 400 });
  }

  const message = new Message({ from: user._id, to: recipient._id, subject, content });
  await message.save();

  return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
}