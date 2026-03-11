import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');

  const query: any = {};
  if (category) query.category = category;
  if (location) query.location = location;

  const jobs = await Job.find(query).populate('createdBy', 'name email').sort({ createdAt: -1 });
  return NextResponse.json(jobs);
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

  const { title, description, category, location, salary, contact } = await request.json();

  if (!title || !description || !category || !location || !contact) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const job = new Job({
    title,
    description,
    category,
    location,
    salary,
    contact,
    createdBy: user._id,
  });
  await job.save();

  return NextResponse.json(job, { status: 201 });
}