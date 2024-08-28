import styled from "styled-components";

import paw from "../../assets/paw.svg";
import { DogRatings } from "../../app/dog-rating";
import useDogs from "../../app/use-dogs";
import DogRow from "./DogRow";
import { QuizType } from "./quiz-data";

const StyledTopTenDogs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 17.5rem 0;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 6rem;
`;

const Paw = styled.img`
  width: 7rem;
`;

const Header = styled.div`
  font-size: 4rem;
  font-weight: 650;
`;

const RowHeader = styled.div`
  display: flex;
  width: 100%;
  border-bottom: solid 1px var(--sub);
  align-items: center;
  height: 5rem;
  margin-bottom: 1rem;
`;

const RowItem = styled.div<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
  font-size: 2rem;
  font-weight: 500;
  font-family: "Jost", sans-serif;
`;

interface Props {
  ratings: DogRatings;
  quiz: QuizType;
}

const TopTenDogs = ({ ratings, quiz }: Props) => {
  const { dogs } = useDogs();

  if (!dogs) return null;

  return (
    <StyledTopTenDogs>
      <HeaderContainer>
        <Paw src={paw} alt="paw" />
        <Header>Top 10 most compatible dogs</Header>
      </HeaderContainer>
      <RowHeader>
        <RowItem $flex={2}>Ranking</RowItem>
        <RowItem $flex={4}>Breed Name</RowItem>
        <RowItem $flex={1}>% Match</RowItem>
        <RowItem $flex={4}>Key Characteristics</RowItem>
      </RowHeader>
      {dogs
        .sort((a, b) => ratings[b.id].percent - ratings[a.id].percent)
        .slice(0, 10)
        .map((dog, index) => (
          <DogRow
            key={dog.id}
            dog={dog}
            rating={ratings[dog.id]}
            quiz={quiz}
            place={index + 1}
          />
        ))}
    </StyledTopTenDogs>
  );
};

export default TopTenDogs;
