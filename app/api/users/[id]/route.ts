import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

// DELETE /api/users/:id
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> => {
  try {
    const userId = params.id;

    console.log(params);

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required.', { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userId);

    if (!user) return new Response('User Not Found.', { status: 404 });

    await user.deleteOne();

    return new Response('User Deleted.', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
