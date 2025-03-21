import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';

// DELETE /api/users/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const userId = params.id;

    // Get the session user
    const sessionUser = await getSessionUser();

    // Check for session and user ID
    if (!sessionUser || !sessionUser.userId) {
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

    // Find the user by ID
    const user = await User.findById(userId);

    // If user not found, return 404
    if (!user) {
      return NextResponse.json({ message: 'User Not Found.' }, { status: 404 });
    }

    // Delete the user
    await user.deleteOne();

    // Return success response
    return NextResponse.json({ message: 'User Deleted.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Something Went Wrong' },
      { status: 500 }
    );
  }
}
