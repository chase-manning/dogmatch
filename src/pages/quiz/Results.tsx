import styled from "styled-components";
import { DogRatings } from "../../app/dog-rating";
import useDogs from "../../app/use-dogs";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const StyledResult = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--bg);
  z-index: 3;
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

  return (
    <StyledResult>
      {dogs
        .sort((a, b) => ratings[b.id].percent - ratings[a.id].percent)
        .slice(0, 10)
        .map((dog, i) => {
          const rating = ratings[dog.id];
          if (!rating) throw new Error("Rating not found");
          return (
            <div key={dog.id}>
              <h2>{dog.generalInformation.name}</h2>
              <p>{`${Math.round(rating.percent * 100)}%`}</p>
            </div>
          );
        })}
      {loading && <Loading>Calculating your perfect match...</Loading>}
    </StyledResult>
  );
};

export default Results;
