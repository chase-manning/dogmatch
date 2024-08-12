import styled from "styled-components";
import Button from "../../components/Button";
import useDogs from "../../app/use-dogs";
import DogCard from "../../components/DogCard";
import { useEffect, useState } from "react";
import { DogType } from "../../components/DogContext";

const StyledLandingPage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: calc(100dvh - 10rem);
  padding: 0 4rem;
`;

const TextSection = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContent = styled.div`
  max-width: 60rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 9.6rem;
  font-weight: 650;
`;

const SubHeader = styled.h2`
  font-size: 2.4rem;
  font-weight: 400;
  margin-top: 2rem;
`;

const DogSection = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(var(--primary) 0, var(--bg) 65%);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4rem;
  margin-top: 3rem;
`;

const LandingPage = () => {
  const { dogs } = useDogs();

  const [randomDog, setRandomDog] = useState<DogType | null>(null);

  useEffect(() => {
    if (dogs.length > 0) {
      setRandomDog(dogs[Math.floor(Math.random() * dogs.length)]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs.length]);

  return (
    <StyledLandingPage>
      <TextSection>
        <TextContent>
          <Header>The best way to find your dream dog</Header>
          <SubHeader>
            Fluffy, friendly, faithful or all three... Take the dogmatch quiz to
            find the perfect dog for you.
          </SubHeader>
          <ButtonContainer>
            <Button primary>Find your dog</Button>
            <Button>All dogs</Button>
          </ButtonContainer>
        </TextContent>
      </TextSection>
      <DogSection>
        <DogCard dog={randomDog} />
      </DogSection>
    </StyledLandingPage>
  );
};

export default LandingPage;
