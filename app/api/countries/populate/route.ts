import { NextRequest, NextResponse } from 'next/server';
import Countries from '@/models/Country';
import connectDB from '@/config/database';

type CountryInput = string | { GN: string };

/**
 * POST /api/countries
 * Fetches competitions, fetches countries for each competition, and saves to MongoDB.
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB(); // Connect to MongoDB

    console.log(request);

    // Fetch competitions
    const competitionsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/competitions/getcompetitions`
    );
    if (!competitionsResponse.ok) {
      throw new Error(
        `Failed to fetch competitions: ${competitionsResponse.statusText}`
      );
    }

    const data = await competitionsResponse.json();
    console.log('Fetched competitions data:', data);

    // Access the competitions array from the response object
    const competitions = data.competitions;

    // Check if competitions is an array
    if (!Array.isArray(competitions)) {
      throw new Error('Competitions is not an array');
    }

    if (competitions.length === 0) {
      return NextResponse.json(
        { message: 'No competitions found.' },
        { status: 400 }
      );
    }

    // Loop through each competition to fetch countries
    for (const competition of competitions) {
      const apiUrl = `${process.env.GET_COUNTRIES_BY_SPORT}/${competition}`;

      if (!apiUrl) {
        console.error(`API URL not configured for competition: ${competition}`);
        continue;
      }

      // Fetch countries for the competition
      const countriesResponse = await fetch(apiUrl);
      if (!countriesResponse.ok) {
        console.error(
          `Failed to fetch countries for competition ${competition}: ${countriesResponse.statusText}`
        );
        continue;
      }

      const rawData: CountryInput[] = await countriesResponse.json();
      console.log(`Fetched countries for ${competition}:`, rawData);

      if (!Array.isArray(rawData)) {
        console.warn(
          `Expected an array of countries for competition ${competition}. Skipping...`
        );
        continue;
      }

      // Transform data and filter out invalid entries
      const transformedData = rawData
        .map(item => {
          const countryName = typeof item === 'string' ? item : item.GN;
          return { GN: countryName };
        })
        .filter(item => {
          if (!item.GN || item.GN.trim() === '') {
            console.warn('Skipping country with empty name:', item);
            return false;
          }
          return true;
        });

      if (transformedData.length === 0) {
        console.warn(
          `No valid country data found for competition ${competition}. Skipping...`
        );
        continue;
      }

      const cleanedCompetition = competition
        .replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
        .trim() // Remove leading/trailing spaces
        .toLowerCase();

      // Save countries for the competition in MongoDB
      await Countries.create({
        competition: cleanedCompetition,
        countries: transformedData,
      });

      console.log(
        `Countries for competition ${competition} saved successfully!`
      );
    }

    return NextResponse.json(
      { message: 'Competitions and countries saved successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/countries:', error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Failed to save countries.',
      },
      { status: 500 }
    );
  }
}
