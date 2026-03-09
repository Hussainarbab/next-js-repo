import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Application from '@/models/Application';
import Job from '@/models/Job';
import { verifyToken } from '@/lib/auth';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

  const applications = await Application.find().populate('job').sort({ appliedAt: -1 });
  return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
  await dbConnect();

  const { jobId, applicantName, applicantContact, resume, message } = await request.json();

  if (!jobId || !applicantName || !applicantContact) {
    return NextResponse.json({ error: 'Job ID, name, and contact are required' }, { status: 400 });
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  const application = new Application({ job: jobId, applicantName, applicantContact, resume, message });
  await application.save();

  // Send email notification
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Admin email
      subject: 'New Job Application',
      text: `New application for ${job.title} from ${applicantName}. Contact: ${applicantContact}`,
    });
  } catch (error) {
    console.error('Email send failed:', error);
  }

  return NextResponse.json({ message: 'Application submitted successfully' }, { status: 201 });
}