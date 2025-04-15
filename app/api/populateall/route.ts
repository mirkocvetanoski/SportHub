import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  console.log(_req);
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/competitions/populate`);
    await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/countries/populate`);
    await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/footballleagues/populate`
    );

    return NextResponse.json(
      { message: 'All jobs completed' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', details: String(error) },
      { status: 500 }
    );
  }
}
