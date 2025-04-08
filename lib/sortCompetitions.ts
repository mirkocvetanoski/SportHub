import popularityScores from './sportsByPopularity';

type Sport = keyof typeof popularityScores;

export function sortCompetitions(competitions: string[]) {
  return [...competitions].sort((a, b) => {
    const sportA = a as Sport;
    const sportB = b as Sport;

    const scoreA = popularityScores[sportA] || 0;
    const scoreB = popularityScores[sportB] || 0;

    return scoreB - scoreA;
  });
}
