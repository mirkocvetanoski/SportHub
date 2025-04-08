import { NextRequest, NextResponse } from 'next/server';
import Competitions from '@/models/Competition';
import connectDB from '@/config/database';
import { Document } from 'mongoose';

export interface ICompetition {
  name: string;
}

export interface ICompetitionsDocument extends Document {
  competitions: ICompetition[];
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    console.log(request);

    // Find the most recent competitions document with proper typing
    const competitionsData = (await Competitions.findOne()
      .sort({ createdAt: -1 })
      .lean()) as ICompetitionsDocument | null;

    if (!competitionsData) {
      return NextResponse.json(
        { message: 'No competitions found.' },
        { status: 404 }
      );
    }

    // Now TypeScript knows competitionsData has a competitions property
    return NextResponse.json(
      { competitions: competitionsData.competitions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return NextResponse.json(
      { message: 'Server error while fetching competitions.' },
      { status: 500 }
    );
  }
}
