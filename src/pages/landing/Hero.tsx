import styled, { keyframes } from "styled-components";
import Button from "../../components/Button";
import useDogs from "../../app/use-dogs";
import DogCard from "../../components/DogCard";
import { useEffect, useState } from "react";
import { DogType } from "../../components/DogContext";

import pawImage from "../../assets/paw.svg";
import { BREEDS_PATH, QUIZ_PATH } from "../../app/paths";

interface PawType {
  x: number;
  y: number;
  rotation: number;
}

const paws: PawType[] = [
  {
    x: 0,
    y: -20,
    rotation: 0,
  },
  {
    x: 13,
    y: -12,
    rotation: 35,
  },
  {
    x: 27,
    y: -22,
    rotation: 10,
  },
  {
    x: 46,
    y: -13,
    rotation: 35,
  },
  {
    x: 65,
    y: -25,
    rotation: 38,
  },
  {
    x: 82,
    y: -14,
    rotation: 50,
  },
];

const mobilePaws: PawType[] = [
  {
    x: 10,
    y: 40,
    rotation: -5,
  },
  {
    x: 25,
    y: 17,
    rotation: 35,
  },
  {
    x: 43,
    y: 30,
    rotation: 15,
  },
  {
    x: 61,
    y: 15,
    rotation: -5,
  },
  {
    x: 81,
    y: 25,
    rotation: 40,
  },
];

const StyledHero = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: calc(100dvh - 10rem);
  padding: 0 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 10rem;
    height: auto;
    padding: 0 3rem;
  }
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
  position: relative;
  font-size: 9.6rem;
  font-weight: 650;

  @media (max-width: 900px) {
    font-size: 9rem;
    font-weight: 600;
    line-height: 1.2r;
    text-align: center;
  }

  @media (max-width: 388px) {
    font-size: 8rem;
  }
`;

const SubHeader = styled.h2`
  position: relative;
  font-size: 2.4rem;
  font-weight: 400;
  margin-top: 2rem;

  @media (max-width: 900px) {
    margin-top: 4rem;
    text-align: center;
    padding: 0 1rem;
  }
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
  position: relative;
  display: flex;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 900px) {
    gap: 2rem;
    margin-top: 6rem;
    width: 100%;
    justify-content: space-evenly;
  }
`;

const MobilePaws = styled.div`
  position: relative;
  margin-top: 2rem;
  height: 10rem;
  width: 100%;
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const DesktopPaws = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 900px) {
    display: none;
  }
`;

const PawContainer = styled.div<{ $paw: PawType }>`
  position: absolute;
  top: ${(props) => props.$paw.y}%;
  left: ${(props) => props.$paw.x}%;
  transform: rotate(${(props) => props.$paw.rotation}deg);
`;

const plop = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`;

const Paw = styled.img<{ $delay: number }>`
  opacity: 0;
  animation: ${plop} 1ms ${(props) => props.$delay * 0.2}s forwards;
`;

const Hero = () => {
  const { dogs } = useDogs();

  const [randomDog, setRandomDog] = useState<DogType | null>(null);

  useEffect(() => {
    if (dogs.length > 0) {
      setRandomDog(dogs[Math.floor(Math.random() * dogs.length)]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs.length]);

  return (
    <StyledHero>
      <TextSection>
        <TextContent>
          <MobilePaws>
            {mobilePaws.map((paw, index) => (
              <PawContainer
                key={index}
                $paw={paw}
                style={{
                  opacity: (30 + index * 3) / 100,
                }}
              >
                <Paw
                  $delay={index + 3}
                  src={pawImage}
                  alt="paw"
                  style={{
                    width: `${3 + index}rem`,
                  }}
                />
              </PawContainer>
            ))}
          </MobilePaws>
          <DesktopPaws>
            {paws.map((paw, index) => (
              <PawContainer
                key={index}
                $paw={paw}
                style={{
                  opacity: (30 + index * 3) / 100,
                }}
              >
                <Paw
                  $delay={index + 3}
                  src={pawImage}
                  alt="paw"
                  style={{
                    width: `${4 + index}rem`,
                  }}
                />
              </PawContainer>
            ))}
          </DesktopPaws>
          <Header>The best way to find your dream dog</Header>
          <SubHeader>
            Fluffy, friendly, faithful or all three... Take the dogmatch quiz to
            find the perfect dog for you.
          </SubHeader>
          <ButtonContainer>
            <Button primary link={QUIZ_PATH}>
              Take the quiz
            </Button>
            <Button link={BREEDS_PATH}>All dogs</Button>
          </ButtonContainer>
        </TextContent>
      </TextSection>
      <DogSection>
        <DogCard dog={randomDog} />
      </DogSection>
    </StyledHero>
  );
};

export default Hero;
