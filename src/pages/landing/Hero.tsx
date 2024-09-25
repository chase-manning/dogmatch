import styled, { keyframes } from "styled-components";
import Button from "../../components/Button";
import useDogs from "../../app/use-dogs";
import DogCard from "../../components/DogCard";
import { useEffect, useState } from "react";
import { DogType } from "../../components/DogContext";

import pawImage from "../../assets/paw.svg";
import { BREEDS_PATH, QUIZ_PATH } from "../../app/paths";

const NUMBER_OF_DOGS = 5;
const MAX_TRANSFORM = 40;
const MAX_ROTATE = 10;
const CARD_FLICK_FREQUENCY = 6000;
const ANIMATION_DURATION = 800;

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
  justify-content: space-evenly;
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
    padding: 0 1.4rem;
  }
`;

const DogSection = styled.div`
  width: 55rem;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

const YellowBackground = styled.div`
  position: absolute;
  width: 100rem;
  height: 100%;
  background: var(--yellow);
  z-index: -1;
  background: radial-gradient(var(--primary) 0, var(--bg) 65%);
`;

const flick = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  49% {
    transform: translate(80%, -60%) rotate(10deg);
  }
  51% {
    transform: translate(80%, -60%) rotate(10deg);
  }
  100% { 
    transform: translate(-50%, -50%) rotate(0deg);
  }
`;

const DogCardContainer = styled.div<{ $animate: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: ${(props) => (props.$animate ? flick : "none")}
    ${ANIMATION_DURATION}ms forwards;
`;

const PivotContainer = styled.div`
  position: relative;
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

  interface DogCardType {
    dog: DogType | null;
    translateX: number;
    translateY: number;
    rotate: number;
  }

  const [isAnimationVirgin, setIsAnimationVirgin] = useState<boolean>(true);
  const [cardPositionOffset, setCardPositionOffset] = useState<number>(0);
  const [delayedCardPositionOffset, setDelayedCardPositionOffset] =
    useState<number>(0);
  const [randomDogCards, setRandomDogCards] = useState<DogCardType[]>(
    Array.from({ length: NUMBER_OF_DOGS }, () => {
      return {
        dog: null,
        translateX: Math.random() * MAX_TRANSFORM - MAX_TRANSFORM / 2,
        translateY: Math.random() * MAX_TRANSFORM - MAX_TRANSFORM / 2,
        rotate: Math.random() * MAX_ROTATE - MAX_ROTATE / 2,
      };
    })
  );

  const getRandomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  useEffect(() => {
    if (dogs.length < NUMBER_OF_DOGS) return;

    const randomIndexes: number[] = [];
    while (randomIndexes.length < NUMBER_OF_DOGS) {
      const randomIndex = getRandomIndex(dogs.length);
      if (randomIndexes.includes(randomIndex)) continue;
      randomIndexes.push(randomIndex);
    }

    const randomDogs = randomIndexes.map((dogIndex, index) => {
      return {
        dog: dogs[dogIndex],
        translateX: randomDogCards[index].translateX,
        translateY: randomDogCards[index].translateY,
        rotate: randomDogCards[index].rotate,
      };
    });
    setRandomDogCards(randomDogs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimationVirgin(false);
      setCardPositionOffset((prev) => (prev + 1) % NUMBER_OF_DOGS);
      setTimeout(() => {
        setDelayedCardPositionOffset((prev) => (prev + 1) % NUMBER_OF_DOGS);
      }, ANIMATION_DURATION / 2);
    }, CARD_FLICK_FREQUENCY);

    return () => {
      clearInterval(interval);
    };
  });

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
        <YellowBackground />
        {randomDogCards.map((dogCard, index) => (
          <DogCardContainer
            $animate={
              (index + cardPositionOffset) % NUMBER_OF_DOGS === 0 &&
              !isAnimationVirgin
            }
            key={index}
            style={{
              zIndex:
                1 + ((index + delayedCardPositionOffset) % NUMBER_OF_DOGS),
            }}
          >
            <PivotContainer
              style={{
                transform: `translate(${dogCard.translateX}px, ${dogCard.translateY}px) rotate(${dogCard.rotate}deg)`,
              }}
            >
              <DogCard dog={dogCard.dog} />
            </PivotContainer>
          </DogCardContainer>
        ))}
      </DogSection>
    </StyledHero>
  );
};

export default Hero;
