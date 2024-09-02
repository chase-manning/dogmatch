import styled from "styled-components";
import { DogType } from "../../components/DogContext";
import { DogRatingType } from "../../app/dog-rating";
import { QuizType } from "./quiz-data";

import gold from "../../assets/gold.svg";
import silver from "../../assets/silver.svg";
import bronze from "../../assets/bronze.svg";
import white from "../../assets/white.svg";
import { BREEDS_PATH } from "../../app/paths";

const StyledDogRow = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  height: 8.2rem;
  position: relative;
  margin: 1.6rem 0;
  cursor: pointer;
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

const KeyAttributes = styled.div`
  display: flex;
  gap: 2rem;
`;

const Attribute = styled.div`
  height: 3.45rem;
  width: 19rem;
  padding: 0 2rem;
  background: var(--bg);
  border: solid 1px var(--main);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 650;
`;

interface Props {
  dog: DogType;
  rating: DogRatingType;
  quiz: QuizType;
  place: number;
}

const DogRow = ({ dog, rating, quiz, place }: Props) => {
  return (
    <StyledDogRow href={`/${BREEDS_PATH}/${dog.id}`} target="_blank">
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
        <Image src={dog.images.small.outdoors} />
      </Section>
      <Section $flex={4}>
        <Name>{dog.generalInformation.name}</Name>
      </Section>
      <Section $flex={1}>
        <Match>{Math.round(rating.percent * 100)}%</Match>
      </Section>
      <Section $flex={4}>
        <KeyAttributes>
          {dog.generalInformation.personalityTraits.map((trait) => (
            <Attribute key={trait}>{trait}</Attribute>
          ))}
        </KeyAttributes>
      </Section>
    </StyledDogRow>
  );
};

export default DogRow;
