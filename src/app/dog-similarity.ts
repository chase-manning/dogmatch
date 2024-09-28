interface TraitType {
  category: string;
  trait: string;
  important: number;
  looks: boolean;
}

const similarityData: TraitType[] = [
  {
    category: "general",
    trait: "popularity",
    important: 1,
    looks: false,
  },
  {
    category: "general",
    trait: "group",
    important: 10,
    looks: true,
  },
  {
    category: "physical",
    trait: "size",
    important: 18,
    looks: true,
  },
  {
    category: "physical",
    trait: "lifespan",
    important: 1,
    looks: false,
  },
  {
    category: "physical",
    trait: "droolingFrequency",
    important: 5,
    looks: true,
  },
  {
    category: "physical",
    trait: "coatStyle",
    important: 10,
    looks: true,
  },
  {
    category: "physical",
    trait: "coatTexture",
    important: 5,
    looks: true,
  },
  {
    category: "physical",
    trait: "coatLength",
    important: 8,
    looks: true,
  },
  {
    category: "behavior",
    trait: "familyAffection",
    important: 4,
    looks: false,
  },
  {
    category: "behavior",
    trait: "childFriendly",
    important: 6,
    looks: false,
  },
  {
    category: "behavior",
    trait: "dogSociability",
    important: 2,
    looks: false,
  },
  {
    category: "behavior",
    trait: "friendlinessToStrangers",
    important: 5,
    looks: false,
  },
  {
    category: "behavior",
    trait: "playfulness",
    important: 8,
    looks: false,
  },
  {
    category: "behavior",
    trait: "protectiveInstincts",
    important: 6,
    looks: false,
  },
  {
    category: "behavior",
    trait: "adaptability",
    important: 2,
    looks: false,
  },
  {
    category: "behavior",
    trait: "barkingFrequency",
    important: 6,
    looks: false,
  },
  {
    category: "care",
    trait: "sheddingAmount",
    important: 8,
    looks: false,
  },
  {
    category: "care",
    trait: "exerciseNeeds",
    important: 8,
    looks: false,
  },
  {
    category: "care",
    trait: "mentalStimulationNeeds",
    important: 8,
    looks: false,
  },
  {
    category: "care",
    trait: "trainingDifficulty",
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
