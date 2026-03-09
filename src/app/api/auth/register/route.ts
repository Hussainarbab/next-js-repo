import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  await dbConnect();

  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}