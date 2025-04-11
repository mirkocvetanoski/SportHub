import connectDB from '@/config/database';
import Countries from '@/models/Country';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestBody {
  competition?: string;
  // other expected fields
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Parse and type the request body
    const body: IRequestBody = await request.json();

    if (!body.competition) {
      return NextResponse.json(
        { message: 'Competition field is required' },
        { status: 400 }
      );
    }

    // Now you can safely use body.competition
    const countriesData = await Countries.findOne({
      competition: body.competition,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!countriesData) {
      return NextResponse.json(
        { message: 'No competitions found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ competitions: countriesData }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Server error while processing request.' },
      { status: 500 }
    );
  }
}
