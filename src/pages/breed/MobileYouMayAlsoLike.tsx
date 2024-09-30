import styled from "styled-components";
import { DogType } from "../../components/DogContext";
import useDogs from "../../app/use-dogs";
import DogPreview from "../../components/DogPreview";

import dogSimilarity from "../../app/dog-similarity";
import Carousel from "../../components/Carousel";

const DOGS = 2;
const TOTAL_DOGS = 10;

const StyledYouMayAlsoLike = styled.div`
  position: relative;
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const Header = styled.h2`
  font-size: 3.2rem;
  font-weight: 600;
  margin-bottom: 5rem;
  width: 100%;
  text-align: center;
`;

const Dogs = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 10rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  dog: DogType | null;
}

const MobileYouMayAlsoLike = ({ dog }: Props) => {
  const { dogs } = useDogs();

  if (!dog || dogs.length === 0) return null;

  const sortedDogs = dogs
    .map((d) => ({ dog: d, difference: dogSimilarity(dog, d, true) }))
    .sort((a, b) => b.difference - a.difference)
    .filter((d) => d.dog.id !== dog.id)
    .map((d) => d.dog);

  let dogSections: DogType[][] = [];

  for (let i = 0; i < TOTAL_DOGS; i += DOGS) {
    dogSections.push(sortedDogs.slice(i, i + DOGS));
  }

  return (
    <StyledYouMayAlsoLike>
      <Header>You may also like</Header>
      <Carousel>
        {dogSections.map((section) => (
          <Container key={section[0].id}>
            <Dogs>
              {section.map((d) => (
                <DogPreview key={d.id} dog={d} />
              ))}
            </Dogs>
          </Container>
        ))}
      </Carousel>
    </StyledYouMayAlsoLike>
  );
};

export default MobileYouMayAlsoLike;
