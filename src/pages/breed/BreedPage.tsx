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

type Maintenance = "low" | "medium" | "high";

const StyledBreed = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
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
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
`;

const Header = styled.h2`
  font-size: 3.2rem;
  font-weight: 600;
  text-decoration: underline;
  font-family: "Jost", sans-serif;
  margin-bottom: 3rem;
`;

const SectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

const RatingColumn = styled(SectionColumn)`
  gap: 4rem;
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
          dog.behavioralTraits.vocalizationFrequency +
          (6 - dog.behavioralTraits.playfulnessLevel) +
          (6 - dog.careRequirements.activityLevel) +
          (6 - dog.careRequirements.coatSheddingLevel) +
          (6 - dog.careRequirements.coatGroomingFrequency) +
          dog.careRequirements.trainingEase +
          (6 - dog.careRequirements.mentalStimulationRequirements) +
          (6 - dog.physicalCharacteristics.salivationTendency)) /
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
      <BreedHeader dog={dog ?? null} />
      <Section>
        <HeaderSection>
          <Header>Key stats</Header>
          <SectionColumn>
            {dog ? (
              <>
                <Stat
                  label="Group"
                  value={dog.generalInformation.group}
                  icon={paw}
                  tooltip="The category or classification of a dog based on its purpose or characteristics, such as Terrier, Working, or Companion."
                />
                <Stat
                  label="Height"
                  value={`${dog.generalInformation.height.toLocaleString()} inches (${Math.round(
                    inchesToCentimeters(dog.generalInformation.height)
                  ).toLocaleString()} cm)`}
                  icon={height}
                  tooltip="This is the typical height of the dog breed measured in inches, representing how tall a dog of this breed usually stands."
                />
                <Stat
                  label="Weight"
                  value={`${dog.generalInformation.weight.toLocaleString()} pounds (${Math.round(
                    poundsToKilograms(dog.generalInformation.weight)
                  ).toLocaleString()} kg)`}
                  icon={weight}
                  tooltip="The weight of the dog breed in pounds. This value helps indicate the general size and build of the breed, providing an idea of how heavy an average dog of this breed might be."
                />
                <Stat
                  label="Life Expectancy"
                  value={`${dog.generalInformation.lifeExpectancy.toLocaleString()} years`}
                  icon={lifespan}
                  tooltip="The typical number of years a dog is expected to live, on average."
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
            label="Popularity"
            tooltip="How popular the breed is. How many people know about that breed. How common it is to have that breed as a pet. How easy it is to get this breed."
            value={dog?.generalInformation.popularity ?? null}
            color="var(--red)"
          />
          <Rating
            label="Lifespan"
            tooltip="How long the breed lives relative to other dogs. A high value is a long living dog, a low value is a short living dog."
            value={dog?.physicalCharacteristics.lifespan ?? null}
            color="var(--green)"
          />
          <Rating
            label="Adaptability Rating"
            tooltip="This rating indicates how easily a breed adapts to changes in their environment, including living conditions, noise levels, weather, daily schedules, and other day-to-day variations."
            value={dog?.behavioralTraits.adaptabilityRating ?? null}
            color="var(--orange)"
          />
        </RatingColumn>
        <RatingColumn>
          <Rating
            label="Size"
            tooltip="A breeds relative size to other breeds. A high value is a very large dog, a low value is a small dog."
            value={dog?.physicalCharacteristics.size ?? null}
            color="var(--brown)"
          />
          <Rating
            label="Coat Length"
            tooltip="This label describes the length of a dog’s fur from the skin to the tip. It affects the dog's overall appearance and can influence grooming needs and seasonal care."
            value={dog?.physicalCharacteristics.coatLength ?? null}
            color="var(--teal)"
          />
          <Rating
            label="Vocalization Frequency"
            tooltip="This measures how frequently a breed vocalizes, including barking and howling. While some breeds are highly vocal and bark at almost anything, others are more reserved and only bark in specific situations. Note that even barkless breeds may use other sounds to express themselves."
            value={dog?.behavioralTraits.vocalizationFrequency ?? null}
            color="var(--yellow)"
          />
        </RatingColumn>
      </Section>
      <Section>
        <HeaderSection>
          <Header>Behavioral Traits</Header>
          <SectionColumn>
            {dog ? (
              <>
                {dog.generalInformation.personalityTraits.map((trait) => (
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
          </SectionColumn>
          <div />
        </HeaderSection>
        <RatingColumn>
          <Rating
            label="Family Affection Level"
            tooltip="Indicates how affectionate a breed is likely to be with family members or other familiar people. Some breeds may show affection primarily to their owner, while others are friendly and affectionate with everyone they know well."
            value={dog?.behavioralTraits.familyAffectionLevel ?? null}
            color="var(--red)"
          />
          <Rating
            label="Dog Sociability"
            tooltip="Indicates how friendly and social a breed typically is with other dogs. While supervision is always recommended during interactions and introductions, some breeds naturally tend to get along well with other dogs, whether at home or in public settings."
            value={dog?.behavioralTraits.dogSociability ?? null}
            color="var(--teal)"
          />
          <Rating
            label="Friendliness to Strangers"
            tooltip="This metric indicates how welcoming a breed is likely to be towards strangers. Some breeds may be reserved or cautious around new people, while others will be eager and happy to meet someone new, regardless of the location."
            value={dog?.behavioralTraits.friendlinessToStrangers ?? null}
            color="var(--yellow)"
          />
        </RatingColumn>
        <RatingColumn>
          <Rating
            label="Child-Friendly"
            tooltip="This rating indicates a breed's tolerance and patience with young children's behavior and its overall family-friendly nature. Always supervise interactions between dogs and young children, or any children who are not familiar with dogs."
            value={dog?.behavioralTraits.childFriendly ?? null}
            color="var(--green)"
          />
          <Rating
            label="Playfulness Level"
            tooltip="Indicates how enthusiastic a breed is about play, even beyond puppyhood. Some breeds remain eager to engage in activities like tug-of-war or fetch well into their adult years, while others may prefer to relax more often."
            value={dog?.behavioralTraits.playfulnessLevel ?? null}
            color="var(--orange)"
          />
          <Rating
            label="Protective Instincts"
            tooltip="This measures a breed's tendency to alert you to the presence of strangers or potential threats. Breeds with strong protective instincts are more likely to react to unfamiliar people or animals, whether it's the mailman or a squirrel outside. They typically become friendly towards strangers who are welcomed by their family."
            value={dog?.behavioralTraits.protectiveInstincts ?? null}
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
                  label="Coat Style"
                  value={dog.physicalCharacteristics.coatStyle}
                  icon={typeIcon}
                  tooltip="The typical texture and appearance of a dog's coat, such as wavy, wiry, curly, hairless, or straight."
                />
                <Stat
                  label="Coat Texture"
                  value={dog.physicalCharacteristics.coatTexture}
                  icon={texture}
                  tooltip="Describes the typical texture of a dog's coat, such as rough, silky, or smooth."
                />
                <Stat
                  label="Coat Length"
                  value={
                    dog.physicalCharacteristics.coatLength === 1
                      ? "Short"
                      : dog.physicalCharacteristics.coatLength === 2
                      ? "Short/Medium"
                      : dog.physicalCharacteristics.coatLength === 3
                      ? "Medium"
                      : dog.physicalCharacteristics.coatLength === 4
                      ? "Medium/Long"
                      : "Long"
                  }
                  icon={length}
                  tooltip="The length of a dog’s fur from the skin to the tip. It affects the dog's overall appearance and can influence grooming needs and seasonal care."
                />
                <Stat
                  label="Double Coat"
                  value={dog.physicalCharacteristics.doubleCoat ? "Yes" : "No"}
                  icon={paw}
                  tooltip="Double-coated dogs have two layers of fur: a harsh topcoat and a soft undercoat. The soft undercoat is shorter, grows faster, and sheds twice a year, while the topcoat is longer and more protective."
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
            label="Activity Level"
            tooltip="Indicates the required amount of physical exercise and mental stimulation for a dog breed. High activity level dogs are lively, always ready for their next adventure, and need plenty of playtime. Low activity level dogs are more laid-back and content with minimal activity."
            value={dog?.careRequirements.activityLevel ?? null}
            color="var(--red)"
          />
          <Rating
            label="Coat Grooming Frequency"
            tooltip="This indicates how often a breed needs bathing, brushing, trimming, or other types of coat maintenance. Consider your available time, patience, and budget for grooming when evaluating this aspect. Note that all breeds need regular nail trimming."
            value={dog?.careRequirements.coatGroomingFrequency ?? null}
            color="var(--purple)"
          />
          <Rating
            label="Mental Stimulation Requirements"
            tooltip="Indicates how much mental stimulation a breed needs to stay happy and healthy. Breeds with high mental stimulation needs may require activities that involve decision-making, problem-solving, and concentration. Without sufficient mental engagement, these dogs might create their own activities, which may be undesirable."
            value={dog?.careRequirements.mentalStimulationRequirements ?? null}
            color="var(--blue)"
          />
        </RatingColumn>
        <RatingColumn>
          <Rating
            label="Coat Shedding Level"
            tooltip="Indicates the amount of fur and hair the breed typically sheds. Higher shedding levels mean more frequent brushing is needed, higher chances of triggering allergies, and more frequent cleaning tasks like vacuuming and lint-rolling."
            value={dog?.careRequirements.coatSheddingLevel ?? null}
            color="var(--brown)"
          />
          <Rating
            label="Training Ease"
            tooltip="Indicates how easy it is to train your dog and their willingness to learn new commands and behaviors. Some breeds are eager to please and quick to learn, while others may be more independent and stubborn."
            value={dog?.careRequirements.trainingEase ?? null}
            color="var(--green)"
          />
          <Rating
            label="Salivation Tendency"
            tooltip="This indicates how likely a breed is to drool. For those who prefer a tidier environment, breeds with high salivation tendencies may not be ideal as they can leave drool on your clothes and furniture."
            value={dog?.physicalCharacteristics.salivationTendency ?? null}
            color="var(--yellow)"
          />
        </RatingColumn>
      </Section>
      <Section>
        <AboutContainer>
          <Header>{`About ${dog?.generalInformation.name}`}</Header>
          {dog ? (
            dog.generalInformation.longDescription
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
      <YouMayAlsoLike dog={dog ?? null} />
    </StyledBreed>
  );
};

export default BreedPage;
