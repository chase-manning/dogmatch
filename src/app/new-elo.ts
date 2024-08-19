const K = 100;
const DIV = 460;

const getNewElo = (winner: number, loser: number): [number, number] => {
  const expected = 1 / (1 + 10 ** ((loser - winner) / DIV));
  const change = K * (1 - expected);
  return [winner + change, loser - change];
};

export default getNewElo;
