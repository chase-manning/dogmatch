import styled, { keyframes } from "styled-components";
import Button from "../../components/Button";
import useDogs from "../../app/use-dogs";
import DogCard from "../../components/DogCard";
import { useEffect, useState } from "react";
import { DogType } from "../../components/DogContext";

import pawImage from "../../assets/paw.svg";

interface PawType {
  x: number;
  y: number;
  rotation: number;
}

const paws: PawType[] = [
  {
    x: -15,
    y: 30,
    rotation: 40,
  },
  {
    x: -15,
    y: 10,
    rotation: -20,
  },
  {
    x: -10,
    y: -10,
    rotation: -5,
  },
  {
    x: 7,
    y: -17,
    rotation: 35,
  },
  {
    x: 25,
    y: -20,
    rotation: 15,
  },
  {
    x: 43,
    y: -15,
    rotation: -5,
  },
  {
    x: 65,
    y: -25,
    rotation: 40,
  },
];

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
  position: relative;
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

const PawContainer = styled.div<{ paw: PawType }>`
  position: absolute;
  top: ${(props) => props.paw.y}%;
  left: ${(props) => props.paw.x}%;
  transform: rotate(${(props) => props.paw.rotation}deg);
`;

const plop = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`;

const Paw = styled.img<{ delay: number }>`
  opacity: 0;
  animation: ${plop} 1ms ${(props) => props.delay * 0.2}s forwards;
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
          {paws.map((paw, index) => (
            <PawContainer
              key={index}
              paw={paw}
              style={{
                opacity: (30 + index * 3) / 100,
              }}
            >
              <Paw
                delay={index + 3}
                src={pawImage}
                alt="paw"
                style={{
                  width: `${3 + index}rem`,
                }}
              />
            </PawContainer>
          ))}
        </TextContent>
      </TextSection>
      <DogSection>
        <DogCard dog={randomDog} />
      </DogSection>
    </StyledLandingPage>
  );
};

export default LandingPage;
