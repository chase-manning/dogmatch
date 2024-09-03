import { DogType } from "../../components/DogContext";

export const QUIZ_VERSION = 1;

export interface EloType {
  elo: number;
  rounds: number;
}

export type DogElos = Record<string, EloType>;

export interface LooksType {
  dogElos: DogElos;
  rounds: number;
}

export interface RatingType {
  value: number | null;
}

export interface CheckboxType {
  options: string[];
  selected: string[];
}

export interface QuestionType {
  category: string;
  trait: string;
  question: RatingType | CheckboxType | LooksType;
  importance: number | null;
}

export interface SectionType {
  label: string;
  questions: QuestionType[];
}

export interface QuizType {
  version: number;
  sectionIndex: number;
  sections: SectionType[];
}

const getQuizData = (dogs: DogType[]): QuizType => {
  const allGroups: string[] = [];
  const allPersonalityTraits: string[] = [];
  const allCoatStyles: string[] = [];
  const allCoatTextures: string[] = [];
  const dogElos: DogElos = {};
  for (const dog of dogs) {
    const { group, personalityTraits } = dog.generalInformation;
    const { coatStyle, coatTexture } = dog.physicalCharacteristics;
    if (!allGroups.includes(group)) {
      allGroups.push(group);
    }
    if (!allCoatStyles.includes(coatStyle)) {
      allCoatStyles.push(coatStyle);
    }
    if (!allCoatTextures.includes(coatTexture)) {
      allCoatTextures.push(coatTexture);
    }
    for (const trait of personalityTraits) {
      if (!allPersonalityTraits.includes(trait)) {
        allPersonalityTraits.push(trait);
      }
    }
    dogElos[dog.id] = { elo: 1500, rounds: 0 };
  }

  const quizData: QuizType = {
    version: QUIZ_VERSION,
    sectionIndex: 0,
    sections: [
      {
        label: "General",
        questions: [
          {
            category: "generalInformation",
            trait: "personalityTraits",
            question: {
              options: allPersonalityTraits,
              selected: [],
            },
            importance: null,
          },
          {
            category: "generalInformation",
            trait: "popularity",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "size",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "adaptabilityRating",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "vocalizationFrequency",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "custom",
            trait: "looksImportance",
            question: {
              value: null,
            },
            importance: null,
          },
        ],
      },
      {
        label: "Physical",
        questions: [
          {
            category: "physicalCharacteristics",
            trait: "lifespan",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "coatStyle",
            question: {
              options: allCoatStyles,
              selected: [],
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "coatTexture",
            question: {
              options: allCoatTextures,
              selected: [],
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "coatLength",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "salivationTendency",
            question: {
              value: null,
            },
            importance: null,
          },
        ],
      },
      {
        label: "Behavioral",
        questions: [
          {
            category: "behavioralTraits",
            trait: "familyAffectionLevel",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "childFriendly",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "dogSociability",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "playfulnessLevel",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "protectiveInstincts",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "friendlinessToStrangers",
            question: {
              value: null,
            },
            importance: null,
          },
        ],
      },
      {
        label: "Care Requirements",
        questions: [
          {
            category: "careRequirements",
            trait: "activityLevel",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "coatSheddingLevel",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "coatGroomingFrequency",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "trainingEase",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "mentalStimulationRequirements",
            question: {
              value: null,
            },
            importance: null,
          },
        ],
      },
      {
        label: "Visual",
        questions: [
          {
            category: "custom",
            trait: "looks",
            question: {
              dogElos,
              rounds: 0,
            },
            importance: null,
          },
        ],
      },
    ],
  };

  return quizData;
};

export default getQuizData;
