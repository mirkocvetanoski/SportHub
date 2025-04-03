import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import bcrypt from 'bcryptjs';

// GET /api/users/[id]
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract user ID from the request URL
    const { pathname } = new URL(request.url);
    const userId = pathname.split('/').pop(); // Extracts the `[id]` from the URL

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required.' },
        { status: 400 }
      );
    }

    // Ensure we have a session user
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
      return NextResponse.json(
        { message: 'Unauthorized: User ID is required.' },
        { status: 401 }
      );
    }

    // Ensure the logged-in user is deleting their own account
    if (sessionUser.userId !== userId) {
      return NextResponse.json(
        { message: 'Unauthorized: You can only get your own account.' },
        { status: 403 }
      );
    }

    // Connect to the database
    await connectDB();

    // Find and delete the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User Not Found.' }, { status: 404 });
    }

    return NextResponse.json(JSON.stringify(user), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error finding user:', error.message);
      return NextResponse.json(
        { message: `Error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract user ID from the request URL
    const { pathname } = new URL(request.url);
    const userId = pathname.split('/').pop(); // Extracts the `[id]` from the URL

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required.' },
        { status: 400 }
      );
    }

    // Ensure we have a session user
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
      return NextResponse.json(
        { message: 'Unauthorized: User ID is required.' },
        { status: 401 }
      );
    }

    // Ensure the logged-in user is deleting their own account
    if (sessionUser.userId !== userId) {
      return NextResponse.json(
        { message: 'Unauthorized: You can only delete your own account.' },
        { status: 403 }
      );
    }

    // Connect to the database
    await connectDB();

    // Find and delete the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User Not Found.' }, { status: 404 });
    }

    await user.deleteOne();

    return NextResponse.json({ message: 'User Deleted.' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting user:', error.message);
      return NextResponse.json(
        { message: `Error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Both old and new passwords are required.' },
        { status: 400 }
      );
    }

    // Get the logged-in user
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(sessionUser.userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Incorrect old password.' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: 'Password updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
