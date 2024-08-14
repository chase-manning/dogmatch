import styled from "styled-components";
import { DogType } from "../../components/DogContext";
import useDogs from "../../app/use-dogs";
import DogPreview from "../../components/DogPreview";
import { useState } from "react";

interface TraitType {
  category: string;
  trait: string;
  important: number;
}

const similarityData: TraitType[] = [
  {
    category: "generalInformation",
    trait: "popularity",
    important: 1,
  },
  {
    category: "generalInformation",
    trait: "group",
    important: 10,
  },
  {
    category: "physicalCharacteristics",
    trait: "size",
    important: 18,
  },
  {
    category: "physicalCharacteristics",
    trait: "lifespan",
    important: 1,
  },
  {
    category: "physicalCharacteristics",
    trait: "salivationTendency",
    important: 5,
  },
  {
    category: "physicalCharacteristics",
    trait: "coatStyle",
    important: 10,
  },
  {
    category: "physicalCharacteristics",
    trait: "coatTexture",
    important: 5,
  },
  {
    category: "physicalCharacteristics",
    trait: "coatLength",
    important: 8,
  },
  {
    category: "behavioralTraits",
    trait: "familyAffectionLevel",
    important: 4,
  },
  {
    category: "behavioralTraits",
    trait: "childFriendly",
    important: 6,
  },
  {
    category: "behavioralTraits",
    trait: "dogSociability",
    important: 2,
  },
  {
    category: "behavioralTraits",
    trait: "friendlinessToStrangers",
    important: 5,
  },
  {
    category: "behavioralTraits",
    trait: "playfulnessLevel",
    important: 8,
  },
  {
    category: "behavioralTraits",
    trait: "protectiveInstincts",
    important: 6,
  },
  {
    category: "behavioralTraits",
    trait: "adaptabilityRating",
    important: 2,
  },
  {
    category: "behavioralTraits",
    trait: "vocalizationFrequency",
    important: 6,
  },
  {
    category: "careRequirements",
    trait: "coatSheddingLevel",
    important: 8,
  },
  {
    category: "careRequirements",
    trait: "activityLevel",
    important: 8,
  },
  {
    category: "careRequirements",
    trait: "mentalStimulationRequirements",
    important: 8,
  },
  {
    category: "careRequirements",
    trait: "trainingEase",
    important: 4,
  },
];

const StyledYouMayAlsoLike = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 0;
  margin-bottom: 4rem;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 4rem;
  font-weight: 650;
  margin-bottom: 5rem;
  width: 100%;
`;

const Dogs = styled.div`
  display: flex;
  gap: 3rem;
`;

const PageIndicators = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 6rem;
`;

const PageIndicator = styled.button<{ $active: boolean }>`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "var(--sub)" : "var(--bg)")};
  border: solid 2px var(--sub);
  cursor: pointer;
`;

interface Props {
  dog: DogType | null;
}

const YouMayAlsoLike = ({ dog }: Props) => {
  const { dogs } = useDogs();
  const [page, setPage] = useState(0);

  if (!dog || dogs.length === 0) return null;

  const dogDifference = (dog1: any, dog2: any) => {
    let difference = 0;

    similarityData.forEach((trait) => {
      const value1 = dog1[trait.category][trait.trait];
      const value2 = dog2[trait.category][trait.trait];
      if (typeof value1 === "number") {
        difference += Math.abs(value1 - value2) * trait.important;
      } else {
        difference += value1 === value2 ? 0 : trait.important * 2;
      }
    });
    return difference;
  };

  const sortedDogs = dogs
    .map((d) => ({ dog: d, difference: dogDifference(dog, d) }))
    .sort((a, b) => a.difference - b.difference)
    .slice(0 + page * 4, 4 + page * 4)
    .map((d) => d.dog);

  return (
    <StyledYouMayAlsoLike>
      <Header>You may also like</Header>
      <Dogs>
        {sortedDogs.map((d) => (
          <DogPreview key={d.id} dog={d} />
        ))}
      </Dogs>
      <PageIndicators>
        {[0, 1, 2].map((index) => (
          <PageIndicator
            key={index}
            $active={index === page}
            onClick={() => setPage(index)}
          />
        ))}
      </PageIndicators>
    </StyledYouMayAlsoLike>
  );
};

export default YouMayAlsoLike;
