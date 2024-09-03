import styled from "styled-components";
import { DogElos, LooksType, QuizType } from "./quiz-data";
import useDogs from "../../app/use-dogs";
import dogRating from "../../app/dog-rating";
import { useEffect, useState } from "react";
import { DogType } from "../../components/DogContext";
import getNewElo from "../../app/new-elo";

const SAMPLE_RANGE = 30;
export const TOTAL_ROUNDS = Math.floor((SAMPLE_RANGE / 4) * 3);

const StyledTournament = styled.div`
  position: relative;
  display: flex;
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
  background: var(--bg-image);
`;

const FinishedOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: var(--bg);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2rem;
  font-weight: 650;
  color: var(--sub);
`;

interface Props {
  quiz: QuizType;
  updateElos: (elos: DogElos) => void;
  question: LooksType;
}

const Tournament = ({ quiz, updateElos, question }: Props) => {
  const { dogs } = useDogs();
  const [order, setOrder] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<DogType[]>([]);

  const { rounds, dogElos } = question;

  const dogRatings = dogRating(dogs, quiz);

  const finished = rounds === TOTAL_ROUNDS;

  useEffect(() => {
    if (dogs.length === 0) return;

    const topDogs = dogs
      .filter((dog) => {
        const elo = dogElos[dog.id];
        if (!elo) throw new Error("Ranking not found");
        return elo.rounds < 3;
      })
      .sort((a, b) => {
        const aRating = dogRatings[a.id];
        const bRating = dogRatings[b.id];

        if (!aRating || !bRating) throw new Error("Rating not found");

        return bRating.percent - aRating.percent;
      })
      .slice(0, 10);

    const firstRound = topDogs.filter((dog) => {
      const elo = dogElos[dog.id];
      if (!elo) throw new Error("Ranking not found");
      return elo.rounds === 0;
    });
    const secondRound = topDogs.filter((dog) => {
      const elo = dogElos[dog.id];
      if (!elo) throw new Error("Ranking not found");
      return elo.rounds === 1;
    });
    const thirdRound = topDogs.filter((dog) => {
      const elo = dogElos[dog.id];
      if (!elo) throw new Error("Ranking not found");
      return elo.rounds === 2;
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
        const dogElo = dogElos[dog.id];
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
                let newDogElos = { ...dogElos };
                for (let i = 0; i < newOrder.length; i++) {
                  const winner = newOrder[i];
                  newDogElos[winner].rounds += 1;
                  if (i === newOrder.length - 1) continue;
                  for (let j = i + 1; j < newOrder.length; j++) {
                    const loser = newOrder[j];
                    const [newWinnerElo, newLoserElo] = getNewElo(
                      newDogElos[winner].elo,
                      newDogElos[loser].elo
                    );

                    newDogElos[winner].elo = newWinnerElo;
                    newDogElos[loser].elo = newLoserElo;
                  }
                }
                updateElos(newDogElos);
              }
            }}
            $disabled={disabled}
          >
            <DogImage
              src={
                dogElo.rounds === 0
                  ? dog.images.small.outdoors
                  : dogElo.rounds === 1
                  ? dog.images.small.indoors
                  : dog.images.small.studio
              }
              alt={dog.generalInformation.name}
            />
          </DogButton>
        );
      })}
      {finished && (
        <FinishedOverlay>Ready to find your dream dog!</FinishedOverlay>
      )}
    </StyledTournament>
  );
};

export default Tournament;
