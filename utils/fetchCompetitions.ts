export async function fetchCompetitions(): Promise<{} | string> {
  try {
    const response = await fetch(`${process.env.GET_ALL_SPORTS}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // Assuming the response contains a list of competitions
    return data as {};
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
