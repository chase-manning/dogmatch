import styled from "styled-components";
import { DogType } from "../../components/DogContext";
import useDogs from "../../app/use-dogs";
import DogPreview from "../../components/DogPreview";
import { useEffect, useState } from "react";

import arrow from "../../assets/arrow.svg";
import dogSimilarity from "../../app/dog-similarity";

const StyledYouMayAlsoLike = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10rem 0;
  margin-bottom: 4rem;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 4rem;
  font-weight: 650;
  margin-bottom: 5rem;
  width: 100%;
`;

const Dogs = styled.div`
  display: flex;
  gap: 3rem;
`;

const PageIndicators = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 6rem;
`;

const PageIndicator = styled.button<{ $active: boolean }>`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "var(--sub)" : "var(--bg)")};
  border: solid 2px var(--sub);
  cursor: pointer;
`;

const Button = styled.button<{ direction: "left" | "right" }>`
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.direction === "left" ? "-7rem" : "auto")};
  right: ${(props) => (props.direction === "right" ? "-7rem" : "auto")};
  height: 5.7rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled.img<{ direction: "left" | "right" }>`
  height: 3.6rem;
  opacity: 0.5;
  transform: rotate(
    ${(props) => (props.direction === "right" ? "180deg" : "0")}
  );
`;

interface Props {
  dog: DogType | null;
}

const YouMayAlsoLike = ({ dog }: Props) => {
  const { dogs } = useDogs();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [dog]);

  if (!dog || dogs.length === 0) return null;

  const sortedDogs = dogs
    .map((d) => ({ dog: d, difference: dogSimilarity(dog, d, true) }))
    .sort((a, b) => b.difference - a.difference)
    .filter((d) => d.dog.id !== dog.id)
    .slice(0 + page * 4, 4 + page * 4)
    .map((d) => d.dog);

  return (
    <StyledYouMayAlsoLike>
      <Header>You may also like</Header>
      <Dogs>
        {sortedDogs.map((d) => (
          <DogPreview key={d.id} dog={d} />
        ))}
      </Dogs>
      <PageIndicators>
        {[0, 1, 2].map((index) => (
          <PageIndicator
            key={index}
            $active={index === page}
            onClick={() => setPage(index)}
          />
        ))}
      </PageIndicators>
      {page !== 0 && (
        <Button onClick={() => setPage((prev) => prev - 1)} direction="left">
          <ButtonIcon src={arrow} direction="left" />
        </Button>
      )}
      {page !== 2 && (
        <Button onClick={() => setPage((prev) => prev + 1)} direction="right">
          <ButtonIcon src={arrow} direction="right" />
        </Button>
      )}
    </StyledYouMayAlsoLike>
  );
};

export default YouMayAlsoLike;
