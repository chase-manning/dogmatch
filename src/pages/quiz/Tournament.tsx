import styled from "styled-components";
import { EloType, LooksType, QuizType } from "./quiz-data";
import useDogs from "../../app/use-dogs";
import dogRating from "../../app/dog-rating";
import { useEffect, useState } from "react";
import { DogType } from "../../components/DogContext";
import getNewElo from "../../app/new-elo";

const FIRST_ROUND = 12;
const SECOND_ROUND = 6;
const THIRD_ROUND = 3;

const StyledTournament = styled.div`
  width: 100%;
  display: flex;
  gap: 3rem;
`;

const DogButton = styled.button<{ $disabled: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? "auto" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0 : 1)};
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
  const isFirstRound = rounds < FIRST_ROUND;
  const isSecondRound = rounds < SECOND_ROUND + FIRST_ROUND;
  const isThirdRound = rounds < THIRD_ROUND + SECOND_ROUND + FIRST_ROUND;
  const isFinished = rounds === FIRST_ROUND + SECOND_ROUND + THIRD_ROUND;

  const dogRatings = dogRating(dogs, quiz);

  useEffect(() => {
    if (dogs.length === 0) return;
    if (rankings.length === 0) return;

    const candidates_ = dogs
      .filter((dog) => {
        const dogElo = rankings.find((ranking) => ranking.breed === dog.id);
        if (!dogElo) throw new Error("Elo not found 1");
        if (isFirstRound) return dogElo.rounds < 1;
        if (isSecondRound) return dogElo.rounds < 2;
        if (isThirdRound) return dogElo.rounds < 3;
        return false;
      })
      .sort((a, b) => {
        const aRating = dogRatings.find((rating) => rating.dogId === a.id);
        const bRating = dogRatings.find((rating) => rating.dogId === b.id);

        if (!aRating || !bRating) throw new Error("Rating not found");

        return bRating.rating - aRating.rating;
      })
      .slice(0, 4);

    setCandidates(candidates_);
    setOrder([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs.length, rounds]);

  return (
    <StyledTournament>
      {candidates.map((dog) => {
        const disabled = order.includes(dog.id);

        const rating = dogRatings.find((rating) => rating.dogId === dog.id);
        if (!rating) throw new Error("Rating not found");
        const dogElo = rankings.find((ranking) => ranking.breed === dog.id);
        if (!dogElo) throw new Error("Elo not found 2");

        return (
          <DogButton
            key={dog.id}
            onClick={() => {
              if (disabled) return;

              if (order.length < 2) {
                setOrder([...order, dog.id]);
              } else {
                const remainingDog = candidates.find(
                  (candidate) =>
                    !order.includes(candidate.id) && candidate.id !== dog.id
                );
                if (!remainingDog) throw new Error("Remaining dog not found");
                const newOrder = [...order, dog.id, remainingDog.id];
                let newRankings = [...rankings];
                for (let i = 0; i < newOrder.length - 1; i++) {
                  const winner = newOrder[i];
                  const winnerEloIndex = newRankings.findIndex(
                    (ranking) => ranking.breed === winner
                  );
                  if (winnerEloIndex === -1) throw new Error("Elo not found 3");
                  for (let j = i + 1; j < newOrder.length; j++) {
                    const loser = newOrder[j];
                    console.log("Loser", loser);
                    console.log("meow", newRankings);
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
                    newRankings[winnerEloIndex].rounds++;
                    newRankings[loserEloIndex].elo = newLoserElo;
                    newRankings[loserEloIndex].rounds++;
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
                  ? dog.images.indoors
                  : dogElo.rounds === 1
                  ? dog.images.studio
                  : dog.images.indoors
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
