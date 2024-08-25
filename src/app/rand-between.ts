import getRand from "./rand";

const randBetween = (min: number, max: number, seed = undefined) => {
  const rand = getRand(seed);
  return rand() * (max - min) + min;
};

export default randBetween;
