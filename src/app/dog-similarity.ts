interface TraitType {
  category: string;
  trait: string;
  important: number;
  looks: boolean;
}

const similarityData: TraitType[] = [
  {
    category: "generalInformation",
    trait: "popularity",
    important: 1,
    looks: false,
  },
  {
    category: "generalInformation",
    trait: "group",
    important: 10,
    looks: true,
  },
  {
    category: "physicalCharacteristics",
    trait: "size",
    important: 18,
    looks: true,
  },
  {
    category: "physicalCharacteristics",
    trait: "lifespan",
    important: 1,
    looks: false,
  },
  {
    category: "physicalCharacteristics",
    trait: "salivationTendency",
    important: 5,
    looks: true,
  },
  {
    category: "physicalCharacteristics",
    trait: "coatStyle",
    important: 10,
    looks: true,
  },
  {
    category: "physicalCharacteristics",
    trait: "coatTexture",
    important: 5,
    looks: true,
  },
  {
    category: "physicalCharacteristics",
    trait: "coatLength",
    important: 8,
    looks: true,
  },
  {
    category: "behavioralTraits",
    trait: "familyAffectionLevel",
    important: 4,
    looks: false,
  },
  {
    category: "behavioralTraits",
    trait: "childFriendly",
    important: 6,
    looks: false,
  },
  {
    category: "behavioralTraits",
    trait: "dogSociability",
    important: 2,
    looks: false,
  },
  {
    category: "behavioralTraits",
    trait: "friendlinessToStrangers",
    important: 5,
    looks: false,
  },
  {
    category: "behavioralTraits",
    trait: "playfulnessLevel",
    important: 8,
    looks: false,
  },
  {
    category: "behavioralTraits",
    trait: "protectiveInstincts",
    important: 6,
    looks: false,
  },
  {
    category: "behavioralTraits",
    trait: "adaptabilityRating",
    important: 2,
    looks: false,
  },
  {
    category: "behavioralTraits",
    trait: "vocalizationFrequency",
    important: 6,
    looks: false,
  },
  {
    category: "careRequirements",
    trait: "coatSheddingLevel",
    important: 8,
    looks: false,
  },
  {
    category: "careRequirements",
    trait: "activityLevel",
    important: 8,
    looks: false,
  },
  {
    category: "careRequirements",
    trait: "mentalStimulationRequirements",
    important: 8,
    looks: false,
  },
  {
    category: "careRequirements",
    trait: "trainingEase",
    important: 4,
    looks: false,
  },
];

const dogSimilarity = (dog1: any, dog2: any, looks: boolean = false) => {
  let difference = 0;

  similarityData.forEach((trait) => {
    if (looks && !trait.looks) {
      return;
    }
    const value1 = dog1[trait.category][trait.trait];
    const value2 = dog2[trait.category][trait.trait];
    if (typeof value1 === "number") {
      difference += Math.abs(value1 - value2) * trait.important;
    } else {
      difference += value1 === value2 ? 0 : trait.important * 2;
    }
  });

  const maxDifference = similarityData.reduce((acc, trait) => {
    const value1 = dog1[trait.category][trait.trait];
    if (value1 === "number") {
      return acc + trait.important * 4;
    }
    return acc + trait.important * 2;
  }, 0);

  return 1 - difference / maxDifference;
};

export default dogSimilarity;
