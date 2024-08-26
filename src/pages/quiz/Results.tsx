import styled from "styled-components";
import { DogRatings } from "../../app/dog-rating";
import useDogs from "../../app/use-dogs";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Winner, { Placement } from "./Winner";

const StyledResult = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg);
  padding: 5rem 0;
  max-width: 180rem;
`;

const Header = styled.div`
  font-size: 4.6rem;
  font-weight: 650;
  margin-bottom: 8rem;
  width: 100%;
`;

const Winners = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

interface Props {
  ratings: DogRatings;
  show: boolean;
}

const Results = ({ ratings, show }: Props) => {
  const { dogs } = useDogs();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!show) return;
    setTimeout(() => setLoading(false), 3000);
  }, [show]);

  const winners = dogs
    .sort((a, b) => ratings[b.id].percent - ratings[a.id].percent)
    .slice(0, 10);

  if (winners.length < 10) throw new Error("Not enough winners");

  return (
    <StyledResult>
      <Header>Your perfect match is...</Header>
      <Winners>
        <Winner
          dog={winners[0]}
          placement={Placement.FIRST}
          rating={ratings[winners[0].id]}
        />
        <Winner
          dog={winners[1]}
          placement={Placement.SECOND}
          rating={ratings[winners[1].id]}
        />
        <Winner
          dog={winners[2]}
          placement={Placement.THIRD}
          rating={ratings[winners[2].id]}
        />
      </Winners>
      {loading && <Loading>Calculating your perfect match...</Loading>}
    </StyledResult>
  );
};

export default Results;
