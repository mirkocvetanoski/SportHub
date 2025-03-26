import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import User from '@/models/User';

export async function POST(request: Request) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const { email, password } = await request.json();

    // Enhanced input validation
    if (!email || !email.includes('@') || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'Valid email and password (min 8 chars) are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT with more secure options
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        // Add other non-sensitive user data if needed
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h',
        algorithm: 'HS256', // Explicitly specify algorithm
      }
    );

    // Set secure cookie
    const cookie = serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Changed to 'strict' for better CSRF protection
      maxAge: 8 * 60 * 60,
      path: '/',
      // Consider adding domain if needed
    });

    // Return response with cookie
    const response = NextResponse.json(
      {
        user: {
          id: user._id,
          email: user.email,
          // Exclude sensitive data
        },
      },
      { status: 201 }
    );

    response.headers.set('Set-Cookie', cookie);

    // Enhanced security headers
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Content-Security-Policy', "default-src 'self'");

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
