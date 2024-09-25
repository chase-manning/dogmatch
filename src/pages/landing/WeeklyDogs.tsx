import styled from "styled-components";
import { Header3 } from "../../styles/Headers";
import useDogs from "../../app/use-dogs";
import getRand from "../../app/rand";
import DogPreview from "../../components/DogPreview";
import { useEffect, useState } from "react";
import DogCarousel from "../../components/DogCarousel";

const StyledWeeklyDogs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20rem;

  @media (max-width: 900px) {
    margin-top: 10rem;
    margin-bottom: 0;
  }
`;

const MobileDogContainer = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
    width: 100%;
  }
`;

const DesktopDogContainer = styled.div`
  margin-top: 8rem;
  display: flex;
  gap: 4rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const WeeklyDogs = () => {
  const { dogs } = useDogs();

  const [dogIds, setDogIds] = useState<number[] | null>(null);

  // This creates a random seeded function
  // Where the seed changes once a week
  // Simulating (weekly dogs)
  const now = new Date();
  now.setDate(now.getDate() + 3.25);
  const time = now.getTime();
  const weekInSeconds = 7 * 24 * 60 * 60 * 1000;
  const week = Math.floor(time / weekInSeconds).toString();

  useEffect(() => {
    const rand = getRand(week);

    const randBetween = (min: number, max: number) => {
      return Math.floor(rand() * (max - min + 1) + min);
    };
    if (dogs.length === 0) return;

    const dogIds_: number[] = [];

    while (dogIds_.length < 4) {
      const totalPopularities = dogs.reduce(
        (acc, dog) => acc + dog.generalInformation.popularity,
        0
      );
      const randomNumber = randBetween(0, totalPopularities);

      let currentTotal = 0;
      for (let i = 0; i < dogs.length; i++) {
        currentTotal += dogs[i].generalInformation.popularity;
        if (currentTotal >= randomNumber) {
          dogIds_.push(i);
          break;
        }
      }
    }

    setDogIds(dogIds_);

    // eslint-disable-next-line
  }, [dogs.length, week]);

  return (
    <StyledWeeklyDogs>
      <Header3>Most popular dogs this week</Header3>
      <DesktopDogContainer>
        <DogPreview dog={dogs.length > 0 && dogIds ? dogs[dogIds[0]] : null} />
        <DogPreview dog={dogs.length > 0 && dogIds ? dogs[dogIds[1]] : null} />
        <DogPreview dog={dogs.length > 0 && dogIds ? dogs[dogIds[2]] : null} />
        <DogPreview dog={dogs.length > 0 && dogIds ? dogs[dogIds[3]] : null} />
      </DesktopDogContainer>
      <MobileDogContainer>
        <DogCarousel
          dogs={
            dogs.length > 0 && dogIds
              ? dogIds.slice(0, 4).map((id) => dogs[id])
              : [null, null, null, null]
          }
        />
      </MobileDogContainer>
    </StyledWeeklyDogs>
  );
};

export default WeeklyDogs;
