import styled from "styled-components";
import { EloType, LooksType, QuizType } from "./quiz-data";
import useDogs from "../../app/use-dogs";
import dogRating from "../../app/dog-rating";
import { useEffect, useState } from "react";
import { DogType } from "../../components/DogContext";
import getNewElo from "../../app/new-elo";

const SAMPLE_RANGE = 30;
export const TOTAL_ROUNDS = Math.floor((SAMPLE_RANGE / 4) * 3);

const StyledTournament = styled.div`
  display: relative;
  width: 100%;
  display: flex;
  gap: 3rem;
`;

const DogButton = styled.button<{ $disabled: boolean }>`
  display: relative;
  cursor: ${({ $disabled }) => ($disabled ? "auto" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0 : 1)};

  transform: ${({ $disabled }) => ($disabled ? "scale(0)" : "scale(1)")};
  opacity: 1;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
  width: 100%;
  aspect-ratio: 1/1;

  :hover {
    transition: all 0.3s;
    transform: scale(1.03);
    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.25);
  }
`;

const DogImage = styled.img`
  border-radius: 2rem;
  width: 100%;
`;

interface Props {
  quiz: QuizType;
  updateRankings: (rankings: EloType[]) => void;
  question: LooksType;
}

const Tournament = ({ quiz, updateRankings, question }: Props) => {
  const { dogs } = useDogs();
  const [order, setOrder] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<DogType[]>([]);

  const { rounds, rankings } = question;

  const dogRatings = dogRating(dogs, quiz);

  useEffect(() => {
    if (dogs.length === 0) return;
    if (rankings.length === 0) return;

    const topDogs = dogs
      .filter((dog) => {
        const ranking = rankings.find((ranking) => ranking.breed === dog.id);
        if (!ranking) throw new Error("Ranking not found");
        return ranking.rounds < 3;
      })
      .sort((a, b) => {
        const aRating = dogRatings[a.id];
        const bRating = dogRatings[b.id];

        if (!aRating || !bRating) throw new Error("Rating not found");

        return bRating.percent - aRating.percent;
      })
      .slice(0, 10);

    const firstRound = topDogs.filter((dog) => {
      const ranking = rankings.find((ranking) => ranking.breed === dog.id);
      if (!ranking) throw new Error("Ranking not found");
      return ranking.rounds === 0;
    });
    const secondRound = topDogs.filter((dog) => {
      const ranking = rankings.find((ranking) => ranking.breed === dog.id);
      if (!ranking) throw new Error("Ranking not found");
      return ranking.rounds === 1;
    });
    const thirdRound = topDogs.filter((dog) => {
      const ranking = rankings.find((ranking) => ranking.breed === dog.id);
      if (!ranking) throw new Error("Ranking not found");
      return ranking.rounds === 2;
    });
    if (firstRound.length >= 4) {
      setCandidates(firstRound.slice(0, 4));
    } else if (secondRound.length >= 4) {
      setCandidates(secondRound.slice(0, 4));
    } else if (thirdRound.length >= 4) {
      setCandidates(thirdRound.slice(0, 4));
    } else {
      throw new Error("Not enough dogs");
    }

    setOrder([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs.length, rounds]);

  return (
    <StyledTournament>
      {candidates.map((dog) => {
        const disabled = order.includes(dog.id);

        const rating = dogRatings[dog.id];
        if (!rating) throw new Error("Rating not found");
        const dogElo = rankings.find((ranking) => ranking.breed === dog.id);
        if (!dogElo) throw new Error("Elo not found 2");

        return (
          <DogButton
            key={dog.id}
            onClick={() => {
              if (disabled) return;

              if (order.length < 3) {
                setOrder([...order, dog.id]);
              } else {
                const newOrder = [...order, dog.id];
                let newRankings = [...rankings];
                for (let i = 0; i < newOrder.length; i++) {
                  const winner = newOrder[i];
                  const winnerEloIndex = newRankings.findIndex(
                    (ranking) => ranking.breed === winner
                  );
                  newRankings[winnerEloIndex].rounds += 1;
                  if (i === newOrder.length - 1) continue;
                  if (winnerEloIndex === -1) throw new Error("Elo not found 3");
                  for (let j = i + 1; j < newOrder.length; j++) {
                    const loser = newOrder[j];
                    const loserEloIndex = newRankings.findIndex(
                      (ranking) => ranking.breed === loser
                    );
                    if (loserEloIndex === -1)
                      throw new Error("Elo not found 4");
                    const [newWinnerElo, newLoserElo] = getNewElo(
                      newRankings[winnerEloIndex].elo,
                      newRankings[loserEloIndex].elo
                    );

                    newRankings[winnerEloIndex].elo = newWinnerElo;
                    newRankings[loserEloIndex].elo = newLoserElo;
                  }
                }
                updateRankings(newRankings);
              }
            }}
            $disabled={disabled}
          >
            <DogImage
              src={
                dogElo.rounds === 0
                  ? dog.images.outdoors
                  : dogElo.rounds === 1
                  ? dog.images.indoors
                  : dog.images.studio
              }
              alt={dog.generalInformation.name}
            />
          </DogButton>
        );
      })}
    </StyledTournament>
  );
};

export default Tournament;
