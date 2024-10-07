import { getQuizDataCache, QUIZ_VERSION } from "../../app/quiz-data-cache";
import { DogType } from "../../components/DogContext";

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
  skipped?: boolean;
}

export interface SectionType {
  label: string;
  questions: QuestionType[];
}

export interface QuizType {
  version: number;
  sectionIndex: number;
  showResults: boolean;
  started: boolean;
  sections: SectionType[];
}

const getQuizData = (dogs: DogType[]): QuizType => {
  const cache = getQuizDataCache();
  if (cache) return cache;

  const allGroups: string[] = [];
  const allPersonalityTraits: string[] = [];
  const allCoatStyles: string[] = [];
  const allCoatTextures: string[] = [];
  const dogElos: DogElos = {};
  for (const dog of dogs) {
    const { group, personalityTraits } = dog.general;
    const { coatStyle, coatTexture } = dog.physical;
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
    showResults: false,
    started: false,
    sections: [
      {
        label: "General",
        questions: [
          {
            category: "physical",
            trait: "size",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavior",
            trait: "barkingFrequency",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "general",
            trait: "personalityTraits",
            question: {
              options: allPersonalityTraits,
              selected: [],
            },
            importance: null,
          },
          {
            category: "general",
            trait: "popularity",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavior",
            trait: "adaptability",
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
            category: "physical",
            trait: "lifespan",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "physical",
            trait: "coatStyle",
            question: {
              options: allCoatStyles,
              selected: [],
            },
            importance: null,
          },
          {
            category: "physical",
            trait: "coatTexture",
            question: {
              options: allCoatTextures,
              selected: [],
            },
            importance: null,
          },
          {
            category: "physical",
            trait: "coatLength",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "physical",
            trait: "droolingFrequency",
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
            category: "behavior",
            trait: "familyAffection",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavior",
            trait: "childFriendly",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavior",
            trait: "dogSociability",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavior",
            trait: "playfulness",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavior",
            trait: "protectiveInstincts",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "behavior",
            trait: "friendlinessToStrangers",
            question: {
              value: null,
            },
            importance: null,
          },
        ],
      },
      {
        label: "Care",
        questions: [
          {
            category: "care",
            trait: "exerciseNeeds",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "care",
            trait: "sheddingAmount",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "care",
            trait: "groomingFrequency",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "care",
            trait: "trainingDifficulty",
            question: {
              value: null,
            },
            importance: null,
          },
          {
            category: "care",
            trait: "mentalStimulationNeeds",
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
