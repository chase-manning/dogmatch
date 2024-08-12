import styled from "styled-components";
import { DogType } from "./DogContext";
import Skeleton from "./Skeleton";
import { BREEDS_PATH } from "../app/paths";

const StyledDogCard = styled.a`
  width: 47.7rem;
  padding: 3rem 4rem;
  border-radius: 3.5rem;
  border: solid 1px var(--main);
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;
`;

const HeaderItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  font-style: italic;
  font-family: "Jost", sans-serif;
`;

const HeaderValue = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  font-family: "Jost", sans-serif;
`;

const DogImage = styled.img`
  width: 100%;
  border-radius: 2rem;
  margin-bottom: 1.8rem;
  aspect-ratio: 1/1;
  background: rgba(0, 0, 0, 0.1);
`;

const StatsSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8rem;
`;

const StatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StatHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
`;

const StatValueContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

const StatValue = styled.div<{ $highlighted?: boolean; color: string }>`
  height: 0.6rem;
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.$highlighted ? props.color : "var(--bg)"};
  border: solid 1px ${(props) => props.color};
  flex: 1;
`;

const Traits = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-top: 2.2rem;
  width: 100%;
`;

const Trait = styled.div`
  flex: 1;
  height: 3.5rem;
  border-radius: 1rem;
  background: var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--bg);
  font-size: 1.6rem;
  font-weight: 550;
  font-family: "Jost", sans-serif;
`;

interface Props {
  dog: DogType | null;
}

const DogCard = ({ dog }: Props) => {
  interface StatType {
    label: string;
    value: number;
    color: string;
  }

  const stats: StatType[] = [
    {
      label: "Size",
      value: dog?.physicalCharacteristics.size ?? 0,
      color: "var(--blue)",
    },
    {
      label: "Child friendly",
      value: dog?.behavioralTraits.childFriendly ?? 0,
      color: "var(--yellow)",
    },
    {
      label: "Training Ease",
      value: dog?.careRequirements.trainingEase ?? 0,
      color: "var(--green)",
    },
    {
      label: "Activity Level",
      value: dog?.careRequirements.activityLevel ?? 0,
      color: "var(--orange)",
    },
    {
      label: "Popularity",
      value: dog?.generalInformation.popularity ?? 0,
      color: "var(--red)",
    },
    {
      label: "Coat Shedding Level",
      value: dog?.careRequirements.coatSheddingLevel ?? 0,
      color: "var(--purple)",
    },
  ];

  return (
    <div>
      <StyledDogCard href={`/${BREEDS_PATH}/${dog?.id}`}>
        <HeaderContainer>
          <HeaderItem>
            <HeaderLabel>Breed</HeaderLabel>
            {dog ? (
              <HeaderValue>{dog.generalInformation.name}</HeaderValue>
            ) : (
              <Skeleton width="17rem" height="2.6rem" />
            )}
          </HeaderItem>
          <HeaderItem style={{ alignItems: "flex-end" }}>
            <HeaderLabel>Group</HeaderLabel>
            {dog ? (
              <HeaderValue>{dog.generalInformation.group}</HeaderValue>
            ) : (
              <Skeleton width="10rem" height="2.6rem" />
            )}
          </HeaderItem>
        </HeaderContainer>
        {dog ? (
          <DogImage
            src={dog.images.outdoors}
            alt={dog.generalInformation.name}
          />
        ) : (
          <Skeleton width="100%" height="39.5rem" />
        )}
        <StatsSection>
          <StatContainer>
            {/* First 3 items */}
            {stats.slice(0, 3).map((stat, index) => (
              <div key={index}>
                <StatHeader>{stat.label}</StatHeader>
                <StatValueContainer>
                  {[...Array(5)].map((_, i) => (
                    <StatValue
                      key={i}
                      $highlighted={i < stat.value}
                      color={stat.color}
                    />
                  ))}
                </StatValueContainer>
              </div>
            ))}
          </StatContainer>

          <StatContainer>
            {/* Last 3 items */}
            {stats.slice(3).map((stat, index) => (
              <div key={index}>
                <StatHeader>{stat.label}</StatHeader>
                <StatValueContainer>
                  {[...Array(5)].map((_, i) => (
                    <StatValue
                      key={i}
                      $highlighted={i < stat.value}
                      color={stat.color}
                    />
                  ))}
                </StatValueContainer>
              </div>
            ))}
          </StatContainer>
        </StatsSection>
        <Traits>
          {dog ? (
            dog?.generalInformation.personalityTraits.map((trait, index) => (
              <Trait key={index}>{trait.toLowerCase()}</Trait>
            ))
          ) : (
            <>
              <Skeleton width="33%" height="3.5rem" />
              <Skeleton width="33%" height="3.5rem" />
              <Skeleton width="33%" height="3.5rem" />
            </>
          )}
        </Traits>
      </StyledDogCard>
    </div>
  );
};

export default DogCard;
