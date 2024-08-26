import styled from "styled-components";
import { DogType } from "../../components/DogContext";
import { DogRatingType } from "../../app/dog-rating";
import { QuizType } from "./quiz-data";

import gold from "../../assets/gold.svg";
import silver from "../../assets/silver.svg";
import bronze from "../../assets/bronze.svg";
import white from "../../assets/white.svg";

const StyledDogRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 8.2rem;
  position: relative;
  margin: 1.6rem 0;
`;

const Section = styled.div<{ $flex: number }>`
  height: 100%;
  flex: ${({ $flex }) => $flex};
  position: relative;
  display: flex;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 200%;
  transform: translateX(-50%);
  background: var(--bg-blue);
`;

const AwardContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Award = styled.img`
  width: 9rem;
`;

const AwardNumber = styled.div<{ $white: boolean }>`
  font-size: 3.8rem;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Jost", sans-serif;

  color: ${({ $white }) => ($white ? "var(--bg)" : "var(--sub)")};
`;

const Image = styled.img`
  height: 10.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1.9rem;
`;

const Name = styled.div`
  font-size: 3.2rem;
  font-weight: 500;
  font-family: "Jost", sans-serif;
`;

const Match = styled.div`
  font-size: 3.2rem;
  font-weight: 400;
  font-family: "Jost", sans-serif;
`;

interface Props {
  dog: DogType;
  rating: DogRatingType;
  quiz: QuizType;
  place: number;
}

const DogRow = ({ dog, rating, quiz, place }: Props) => {
  return (
    <StyledDogRow>
      <Background />
      <Section $flex={1}>
        <AwardContainer>
          <Award
            src={
              place === 1
                ? gold
                : place === 2
                ? silver
                : place === 3
                ? bronze
                : white
            }
          />
          <AwardNumber $white={place <= 3}>{place}</AwardNumber>
        </AwardContainer>
      </Section>
      <Section $flex={1}>
        <Image src={dog.images.outdoors} />
      </Section>
      <Section $flex={4}>
        <Name>{dog.generalInformation.name}</Name>
      </Section>
      <Section $flex={1}>
        <Match>{Math.round(rating.percent * 100)}%</Match>
      </Section>
      <Section $flex={4}>meow</Section>
    </StyledDogRow>
  );
};

export default DogRow;
