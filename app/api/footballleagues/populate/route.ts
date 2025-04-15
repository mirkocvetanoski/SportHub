import { NextRequest, NextResponse } from 'next/server';
import FootballLeagues from '@/models/FootballLeague';
import connectDB from '@/config/database';

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    console.log(request);

    // Fetch countries data
    const responseCountries = await fetch(
      `${process.env.GET_COUNTRIES_BY_SPORT}/Football`
    );
    const dataCountries = await responseCountries.json();

    // Prepare to store the leagues data
    const formattedCountriesData = [];

    for (const country of dataCountries) {
      // Fetch leagues for each country (or handle country-specific leagues data)
      const responseLeagues = await fetch(
        `${process.env.GET_COMPETITION_BY_COUNTRY}/${country.GN}`
      );
      if (!responseLeagues.ok) {
        throw new Error(
          `External API request failed with status ${responseLeagues.status} for country ${country.GN}`
        );
      }

      const dataLeagues = await responseLeagues.json();

      // Check if the leagues data is in the expected format
      if (!Array.isArray(dataLeagues)) {
        return NextResponse.json(
          {
            message: `Invalid leagues data format for country ${country.GN}. Expected an array.`,
          },
          { status: 400 }
        );
      }

      // Format the league data for the current country
      const formattedLeagues = dataLeagues
        .filter(league => league.LN) // Ensure LN exists
        .map(league => ({
          LN: league.LN,
        }));

      // Add the country and its leagues to the final array
      formattedCountriesData.push({
        country: country.GN,
        footballLeagues: formattedLeagues,
      });
    }

    // Delete any existing football leagues to prevent duplicates
    await FootballLeagues.deleteMany({});

    console.log(
      'Formatted data:',
      JSON.stringify(formattedCountriesData, null, 2)
    );

    // Save the newly fetched leagues data
    await FootballLeagues.insertMany(formattedCountriesData);

    return NextResponse.json(
      { message: 'Football leagues saved successfully!' },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        'Error saving football leagues:',
        error.message,
        error.stack
      );
      return NextResponse.json(
        {
          message:
            error.message || 'Server error while saving football leagues.',
        },
        { status: 500 }
      );
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json(
        { message: 'An unknown error occurred.' },
        { status: 500 }
      );
    }
  }
}
