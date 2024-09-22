import styled from "styled-components";
import { DogType } from "./DogContext";
import Skeleton from "./Skeleton";
import { BREEDS_PATH } from "../app/paths";
import { Link } from "react-router-dom";
import getImageAlt from "../app/image-alt";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDogCard = styled(Link)`
  width: 47.7rem;
  padding: 3rem 4rem;
  border-radius: 3.5rem;
  border: solid 1px var(--main);
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
`;

const HeaderContainer = styled.div`
  margin-bottom: 1.8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  line-height: 1;
  font-size: 2.9rem;
  white-space: nowrap;
  font-weight: 650;
  text-align: center;
`;

const DogImage = styled.img`
  width: 100%;
  border-radius: 2rem;
  aspect-ratio: 1/1;
  background: rgba(0, 0, 0, 0.1);
`;

const StatsSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8rem;
  margin-top: 1.8rem;
`;

const StatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StatHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 650;
  margin-bottom: 0.5rem;

  @media (max-width: 900px) {
    font-size: 1.4rem;
  }
`;

const StatValueContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.3rem;
  margin-bottom: 1.2rem;
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
    <Container>
      <StyledDogCard to={`/${BREEDS_PATH}/${dog?.id}`}>
        <HeaderContainer>
          {dog ? (
            <Header>{dog.generalInformation.name}</Header>
          ) : (
            <Skeleton width="80%" height="2.9rem" />
          )}
        </HeaderContainer>
        {dog ? (
          <DogImage
            src={dog.images.small.outdoors}
            alt={getImageAlt(dog, "outdoors")}
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
    </Container>
  );
};

export default DogCard;
