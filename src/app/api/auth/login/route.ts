import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { token } = await request.json();

  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    console.error("ADMIN_TOKEN is not set in the environment variables.");
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  if (token === adminToken) {
    const cookieStore = cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return new NextResponse('Login successful', { status: 200 });
  } else {
    return new NextResponse('Invalid token', { status: 401 });
  }
}