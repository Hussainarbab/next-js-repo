import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  await dbConnect();

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken(user);

  return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}