import styled from "styled-components";
import { DogRatings, CoupleRatings } from "../../app/dog-rating";
import useDogs from "../../app/use-dogs";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Winner, { Placement } from "./Winner";
import TopTenDogs from "./TopTenDogs";
import { QuizType } from "./quiz-data";
import ExportResultsButton from "./ExportResultsButton";

const StyledResult = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg);
  padding: 5rem 0;
  max-width: 180rem;

  @media (max-width: 900px) {
    padding: 3rem 3rem;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 3rem;
  margin-bottom: 8rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-bottom: 3.5rem;
    gap: 2.5rem;
  }
`;

const Header = styled.div`
  font-size: 4.6rem;
  font-weight: 650;

  @media (max-width: 900px) {
    font-size: 4rem;
    text-align: center;
  }
`;

const Winners = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 4.5rem;
  }
`;

interface Props {
  ratings: DogRatings;
  show: boolean;
  quiz: QuizType;
  coupleRatings?: CoupleRatings | null;
}

const Results = ({ ratings, show, quiz, coupleRatings }: Props) => {
  const { dogs } = useDogs();
  const [loading, setLoading] = useState(true);

  const isCouple = quiz.mode === "couple" && !!coupleRatings;
  const names = quiz.coupleNames;

  useEffect(() => {
    if (!show) return;
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [show]);

  const winners = dogs
    .sort((a, b) => ratings[b.id].percent - ratings[a.id].percent)
    .slice(0, 10);

  if (winners.length < 10) throw new Error("Not enough winners");

  const loadingText = isCouple
    ? "Calculating your perfect match together..."
    : "Calculating your perfect match...";

  if (loading) return <Loading>{loadingText}</Loading>;

  const headerText = isCouple
    ? "Your perfect match together is..."
    : "Your perfect match is...";

  return (
    <StyledResult>
      <HeaderRow>
        <Header>{headerText}</Header>
        <ExportResultsButton
          ratings={ratings}
          quiz={quiz}
          coupleRatings={coupleRatings}
          dogs={dogs}
          topBreedName={winners[0].general.name}
        />
      </HeaderRow>
      <Winners>
        <Winner
          dog={winners[0]}
          placement={Placement.FIRST}
          rating={ratings[winners[0].id]}
          coupleRatings={coupleRatings}
          names={names}
        />
        <Winner
          dog={winners[1]}
          placement={Placement.SECOND}
          rating={ratings[winners[1].id]}
          coupleRatings={coupleRatings}
          names={names}
        />
        <Winner
          dog={winners[2]}
          placement={Placement.THIRD}
          rating={ratings[winners[2].id]}
          coupleRatings={coupleRatings}
          names={names}
        />
      </Winners>
      <TopTenDogs
        ratings={ratings}
        quiz={quiz}
        coupleRatings={coupleRatings}
      />
    </StyledResult>
  );
};

export default Results;
