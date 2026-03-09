import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const { id } = await params;
  const job = await Job.findById(id).populate('createdBy', 'name email');
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params;
  const { title, description, category, location, salary, contact } = await request.json();

  const job = await Job.findByIdAndUpdate(id, { title, description, category, location, salary, contact }, { new: true });
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Job deleted' });
}