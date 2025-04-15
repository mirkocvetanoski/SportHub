import connectDB from '@/config/database';
import FootballLeagues from '@/models/FootballLeague';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestBody {
  country?: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Parse and type the request body
    const body: IRequestBody = await request.json();

    if (!body.country) {
      return NextResponse.json(
        { message: 'Country field is required' },
        { status: 400 }
      );
    }

    // Now you can safely use body.country
    const FootballLeaguesData = await FootballLeagues.findOne({
      country: body.country,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!FootballLeaguesData) {
      return NextResponse.json(
        { message: 'No football leagues found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { footballLeagues: FootballLeaguesData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Server error while processing request.' },
      { status: 500 }
    );
  }
}
