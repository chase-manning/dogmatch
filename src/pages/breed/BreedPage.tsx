import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useDogs from "../../app/use-dogs";
import { NOT_FOUND_PATH } from "../../app/paths";
import BreedHeader from "./BreedHeader";
import Stat from "../../components/Stat";

import height from "../../assets/stats/height.svg";
import length from "../../assets/stats/length.svg";
import lifespan from "../../assets/stats/lifespan.svg";
import paw from "../../assets/stats/paw.svg";
import texture from "../../assets/stats/texture.svg";
import typeIcon from "../../assets/stats/type.svg";
import weight from "../../assets/stats/weight.svg";
import { inchesToCentimeters, poundsToKilograms } from "../../app/conversions";
import Skeleton from "../../components/Skeleton";
import Rating from "../../components/Rating";
import YouMayAlsoLike from "./YouMayAlsoLike";
import Seo from "../../components/Seo";
import getDogName from "../../app/dog-name";

type Maintenance = "low" | "medium" | "high";

const StyledBreed = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media (max-width: 900px) {
    padding: 0 3rem;
  }
`;

const Section = styled.div`
  width: 100%;
  max-width: 150rem;
  border: solid 1px var(--main);
  border-radius: 3rem;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 8rem;
  padding: 4.5rem 5.5rem;
  display: flex;
  gap: 13rem;
  align-items: center;

  @media (max-width: 900px) {
    padding: 2rem 3rem;
    border: solid 0.5px var(--main);
    box-shadow: none;
    flex-direction: column;
    gap: 0.7rem;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;

  @media (max-width: 900px) {
    height: auto;
    width: 100%;
    margin-bottom: 6rem;
  }
`;

const Header = styled.h2`
  font-size: 3.2rem;
  font-weight: 600;
  text-decoration: underline;
  font-family: "Jost", sans-serif;
  margin-bottom: 3rem;

  @media (max-width: 900px) {
    font-size: 3rem;
    margin: auto;
    margin-bottom: 2.7rem;
  }
`;

const SectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const RatingColumn = styled(SectionColumn)`
  gap: 4rem;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const TraitsColumn = styled(SectionColumn)`
  @media (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Behaviour = styled.div`
  height: 5rem;
  width: 28.4rem;
  background: var(--main);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  font-family: "Jost", sans-serif;
  color: var(--bg);
  font-weight: 600;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const StyledMaintenance = styled.div<{ $maintenance: Maintenance }>`
  height: 5rem;
  width: 28.4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  font-family: "Jost", sans-serif;
  background: ${({ $maintenance }) => {
    if ($maintenance === "low") return "var(--green)";
    if ($maintenance === "medium") return "var(--orange)";
    if ($maintenance === "high") return "var(--red)";
  }};
  color: var(--bg);
  font-weight: 600;
  margin-bottom: 1.5rem;

  @media (max-width: 900px) {
    width: 100%;

    // Take up two grid items
    grid-column: span 2;
  }
`;

const AboutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h2 {
    margin-bottom: 0;
  }
`;

const AboutBreed = styled.p`
  font-size: 2.8rem;
  font-weight: 400;
  line-height: 1.4;

  @media (max-width: 900px) {
    font-size: 2.4rem;
  }
`;

const BreedPage = () => {
  const breedId = useParams().breed;
  const { dogs, loading } = useDogs();
  const navigate = useNavigate();

  const dog = dogs.find((dog) => dog.id === breedId);
  if (!dog && !loading) navigate(NOT_FOUND_PATH);

  const getAverageMaintenance = (dog: any) => {
    const averageMaintenance = dog
      ? (6 -
          dog.behavior.barkingFrequency +
          (6 - dog.behavior.playfulness) +
          (6 - dog.care.exerciseNeeds) +
          (6 - dog.care.sheddingAmount) +
          (6 - dog.care.groomingFrequency) +
          dog.care.trainingDifficulty +
          (6 - dog.care.mentalStimulationNeeds) +
          (6 - dog.physical.droolingFrequency)) /
        8
      : null;
    return averageMaintenance;
  };
  const averegeMaintenance = getAverageMaintenance(dog);
  const maintenance = averegeMaintenance
    ? averegeMaintenance > 3.25
      ? "low"
      : averegeMaintenance < 3
      ? "high"
      : "medium"
    : "low";

  return (
    <StyledBreed>
      {breedId && (
        <Seo
          title={`${getDogName(breedId)} Dog Breed Information`}
          description={`Learn more about the ${getDogName(
            breedId
          )} dog breed, including its characteristics, care requirements, and behavioral traits.`}
        />
      )}
      <BreedHeader dog={dog ?? null} />
      <Sections>
        <Section>
          <HeaderSection>
            <Header>Key stats</Header>
            <SectionColumn>
              {dog ? (
                <>
                  <Stat
                    category="general"
                    trait="group"
                    value={dog.general.group}
                    icon={paw}
                  />
                  <Stat
                    category="general"
                    trait="lifespan"
                    value={`${dog.general.lifespan.toLocaleString()} years`}
                    icon={lifespan}
                  />
                  <Stat
                    category="general"
                    trait="height"
                    value={`${dog.general.height.toLocaleString()} in (${Math.round(
                      inchesToCentimeters(dog.general.height)
                    ).toLocaleString()} cm)`}
                    icon={height}
                  />
                  <Stat
                    category="general"
                    trait="weight"
                    value={`${dog.general.weight.toLocaleString()} lb (${Math.round(
                      poundsToKilograms(dog.general.weight)
                    ).toLocaleString()} kg)`}
                    icon={weight}
                  />
                </>
              ) : (
                <>
                  <Skeleton width="20rem" height="3rem" />
                  <Skeleton width="30rem" height="3rem" />
                  <Skeleton width="30rem" height="3rem" />
                  <Skeleton width="30rem" height="3rem" />
                </>
              )}
            </SectionColumn>
            <div />
          </HeaderSection>
          <RatingColumn>
            <Rating
              category="general"
              trait="popularity"
              value={dog?.general.popularity ?? null}
              color="var(--red)"
            />
            <Rating
              category="physical"
              trait="lifespan"
              value={dog?.physical.lifespan ?? null}
              color="var(--green)"
            />
            <Rating
              category="behavior"
              trait="adaptability"
              value={dog?.behavior.adaptability ?? null}
              color="var(--orange)"
            />
          </RatingColumn>
          <RatingColumn>
            <Rating
              category="physical"
              trait="size"
              value={dog?.physical.size ?? null}
              color="var(--brown)"
            />
            <Rating
              category="physical"
              trait="coatLength"
              value={dog?.physical.coatLength ?? null}
              color="var(--teal)"
            />
            <Rating
              category="behavior"
              trait="barkingFrequency"
              value={dog?.behavior.barkingFrequency ?? null}
              color="var(--yellow)"
            />
          </RatingColumn>
        </Section>
        <Section>
          <HeaderSection>
            <Header>Behavioral Traits</Header>
            <TraitsColumn>
              {dog ? (
                <>
                  {dog.general.personalityTraits.map((trait) => (
                    <Behaviour key={trait}>{trait.toLowerCase()}</Behaviour>
                  ))}
                </>
              ) : (
                <>
                  <Skeleton width="30rem" height="5rem" />
                  <Skeleton width="30rem" height="5rem" />
                  <Skeleton width="30rem" height="5rem" />
                </>
              )}
            </TraitsColumn>
            <div />
          </HeaderSection>
          <RatingColumn>
            <Rating
              category="behavior"
              trait="familyAffection"
              value={dog?.behavior.familyAffection ?? null}
              color="var(--red)"
            />
            <Rating
              category="behavior"
              trait="dogSociability"
              value={dog?.behavior.dogSociability ?? null}
              color="var(--teal)"
            />
            <Rating
              category="behavior"
              trait="friendlinessToStrangers"
              value={dog?.behavior.friendlinessToStrangers ?? null}
              color="var(--yellow)"
            />
          </RatingColumn>
          <RatingColumn>
            <Rating
              category="behavior"
              trait="childFriendly"
              value={dog?.behavior.childFriendly ?? null}
              color="var(--green)"
            />
            <Rating
              category="behavior"
              trait="playfulness"
              value={dog?.behavior.playfulness ?? null}
              color="var(--orange)"
            />
            <Rating
              category="behavior"
              trait="protectiveInstincts"
              value={dog?.behavior.protectiveInstincts ?? null}
              color="var(--brown)"
            />
          </RatingColumn>
        </Section>
        <Section>
          <HeaderSection>
            <Header>Care Requirements</Header>
            <SectionColumn>
              {dog ? (
                <StyledMaintenance $maintenance={maintenance}>
                  {`${maintenance} maintenance`}
                </StyledMaintenance>
              ) : (
                <Skeleton width="30rem" height="6.5rem" />
              )}
              {dog ? (
                <>
                  <Stat
                    category="physical"
                    trait="coatStyle"
                    value={dog.physical.coatStyle}
                    icon={typeIcon}
                  />
                  <Stat
                    category="physical"
                    trait="coatTexture"
                    value={dog.physical.coatTexture}
                    icon={texture}
                  />
                  <Stat
                    category="physical"
                    trait="coatLength"
                    value={
                      dog.physical.coatLength === 1
                        ? "Short"
                        : dog.physical.coatLength === 2
                        ? "Short/Medium"
                        : dog.physical.coatLength === 3
                        ? "Medium"
                        : dog.physical.coatLength === 4
                        ? "Medium/Long"
                        : "Long"
                    }
                    icon={length}
                  />
                  <Stat
                    category="physical"
                    trait="doubleCoat"
                    value={dog.physical.doubleCoat ? "Yes" : "No"}
                    icon={paw}
                  />
                </>
              ) : (
                <>
                  <Skeleton width="20rem" height="3rem" />
                  <Skeleton width="30rem" height="3rem" />
                  <Skeleton width="30rem" height="3rem" />
                  <Skeleton width="20rem" height="3rem" />
                </>
              )}
            </SectionColumn>
            <div />
          </HeaderSection>
          <RatingColumn>
            <Rating
              category="care"
              trait="exerciseNeeds"
              value={dog?.care.exerciseNeeds ?? null}
              color="var(--red)"
            />
            <Rating
              category="care"
              trait="groomingFrequency"
              value={dog?.care.groomingFrequency ?? null}
              color="var(--purple)"
            />
            <Rating
              category="care"
              trait="mentalStimulationNeeds"
              value={dog?.care.mentalStimulationNeeds ?? null}
              color="var(--blue)"
            />
          </RatingColumn>
          <RatingColumn>
            <Rating
              category="care"
              trait="sheddingAmount"
              value={dog?.care.sheddingAmount ?? null}
              color="var(--brown)"
            />
            <Rating
              category="care"
              trait="trainingDifficulty"
              value={dog?.care.trainingDifficulty ?? null}
              color="var(--green)"
            />
            <Rating
              category="physical"
              trait="droolingFrequency"
              value={dog?.physical.droolingFrequency ?? null}
              color="var(--yellow)"
            />
          </RatingColumn>
        </Section>
        <Section>
          <AboutContainer>
            {dog ? (
              <Header>{`About ${dog.general.name}`}</Header>
            ) : (
              <Skeleton width="40rem" height="4rem" />
            )}
            {dog ? (
              dog.general.longDescription
                .split("\n")
                .map((paragraph) => (
                  <AboutBreed key={paragraph}>{paragraph}</AboutBreed>
                ))
            ) : (
              <>
                <Skeleton width="100%" height="3rem" />
                <Skeleton width="100%" height="3rem" />
                <Skeleton width="100%" height="3rem" />
                <Skeleton width="100%" height="3rem" />
              </>
            )}
          </AboutContainer>
        </Section>
      </Sections>
      <YouMayAlsoLike dog={dog ?? null} />
    </StyledBreed>
  );
};

export default BreedPage;
