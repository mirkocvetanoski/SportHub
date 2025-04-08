import { NextRequest, NextResponse } from 'next/server';
import Competitions from '@/models/Competition';
import connectDB from '@/config/database';

// POST request to save the competitions array to the database
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    console.log(request);

    // Fetch the competitions data from the external API
    const response = await fetch(`${process.env.GET_ALL_SPORTS}`);
    if (!response.ok) {
      throw new Error(
        `External API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    // Assuming the response is an array of competitions
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: 'Invalid data format from external API.' },
        { status: 400 }
      );
    }

    // Delete existing competitions to avoid duplicates
    await Competitions.deleteMany({});

    // Create a new Competitions document
    const competitions = new Competitions({
      competitions: data,
      createdAt: new Date(),
    });

    // Save the competitions data to the database
    await competitions.save();

    // Send success response
    return NextResponse.json(
      { message: 'Competitions saved successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving competitions:', error);
    return NextResponse.json(
      { message: 'Server error while saving competitions.' },
      { status: 500 }
    );
  }
}
