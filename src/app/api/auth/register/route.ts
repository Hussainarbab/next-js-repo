import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  await dbConnect();

  const { name, email, password, phone } = await request.json();

  if (!name || !email || !password || !phone) {
    return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    phone,
  });
  await user.save();

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}