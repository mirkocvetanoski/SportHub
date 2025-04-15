import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/competitions/populate`);
    await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/countries/populate`);
    await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/footballleagues/populate`
    );
    res.status(200).json({ message: 'All jobs completed' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error });
  }
}
