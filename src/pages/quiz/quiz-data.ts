import { DogType } from "../../components/DogContext";

export interface EloType {
  breed: string;
  elo: number;
}

export interface LooksType {
  rankings: EloType[];
}

export interface RatingType {
  min: string;
  max: string;
  value: number | null;
}

export interface CheckboxType {
  options: string[];
  selected: string[];
}

export interface QuestionType {
  category: string;
  trait: string;
  label: string;
  question: RatingType | CheckboxType | LooksType;
  importance: number | null;
}

export interface SectionType {
  label: string;
  questions: QuestionType[];
}

export interface QuizType {
  sections: SectionType[];
}

const getQuizData = (dogs: DogType[]): QuizType => {
  const allGroups: string[] = [];
  const allPersonalityTraits: string[] = [];
  const allCoatStyles: string[] = [];
  const allCoatTextures: string[] = [];
  const dogRatings: EloType[] = [];
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
    dogRatings.push({ breed: dog.id, elo: 1500 });
  }

  const quizData: QuizType = {
    sections: [
      {
        label: "General",
        questions: [
          {
            category: "generalInformation",
            trait: "personalityTraits",
            label:
              "Which personality traits are most important to you in a dog?",
            question: {
              options: allPersonalityTraits,
              selected: [],
            },
            importance: null,
          },
          {
            category: "generalInformation",
            trait: "popularity",
            label: "What level of popularity do you prefer for your dog breed?",
            question: {
              min: "Rare breed",
              max: "Very popular",
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
            trait: "size",
            label: "What size of dog are you looking for?",
            question: {
              min: "Small",
              max: "Large",
              value: null,
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "lifespan",
            label: "What lifespan do you consider ideal for a dog?",
            question: {
              min: "Short",
              max: "Long",
              value: null,
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "coatStyle",
            label: "What type of coat style do you prefer in a dog? ",
            question: {
              options: allCoatStyles,
              selected: [],
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "coatTexture",
            label: "What texture do you prefer for your dog's coat?",
            question: {
              options: allCoatTextures,
              selected: [],
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "coatLength",
            label: "What length of coat do you prefer on a dog?",
            question: {
              min: "Short",
              max: "Long",
              value: null,
            },
            importance: null,
          },
          {
            category: "physicalCharacteristics",
            trait: "salivationTendency",
            label: "How do you feel about a dog that drools?",
            question: {
              min: "Prefer dry",
              max: "Don't mind drool",
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
            label:
              "How affectionate would you like your dog to be with family members?",
            question: {
              min: "Reserved",
              max: "Very Affectionate",
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "childFriendly",
            label: "How child-friendly do you prefer your dog to be?",
            question: {
              min: "Not child-friendly",
              max: "Very child-friendly",
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "dogSociability",
            label: "How sociable should your dog be with other dogs?",
            question: {
              min: "Not Sociable",
              max: "Very Sociable",
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "playfulnessLevel",
            label: "How playful would you like your dog to be?",
            question: {
              min: "Relaxed",
              max: "Very playful",
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "protectiveInstincts",
            label: "How protective do you want your dog to be?",
            question: {
              min: "Less alert",
              max: "Highly vigilant",
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "adaptabilityRating",
            label: "How adaptable should your dog be to changes?",
            question: {
              min: "Poorly adaptable",
              max: "Highly adaptable",
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "friendlinessToStrangers",
            label: "How would you like your dog to react to strangers?",
            question: {
              min: "Prefer reserved or cautious",
              max: "Prefer very friendly and welcoming",
              value: null,
            },
            importance: null,
          },
          {
            category: "behavioralTraits",
            trait: "vocalizationFrequency",
            label: "How do you feel about a vocal dog?",
            question: {
              min: "Prefer quiet",
              max: "It's fine if they're noisy",
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
            label: "What level of activity do you expect from your dog?",
            question: {
              min: "Couch potato",
              max: "Energetic explorer",
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "coatSheddingLevel",
            label: "How much shedding can you handle?",
            question: {
              min: "Low shedding",
              max: "High shedding",
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "coatGroomingFrequency",
            label: "How frequently are you willing to groom your dog?",
            question: {
              min: "Rarely",
              max: "Frequent grooming",
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "trainingEase",
            label: "How easy do you want training to be?",
            question: {
              min: "Challenging to train",
              max: "Easy to train",
              value: null,
            },
            importance: null,
          },
          {
            category: "careRequirements",
            trait: "mentalStimulationRequirements",
            label: "How much mental stimulation should your dog need?",
            question: {
              min: "Low",
              max: "High",
              value: null,
            },
            importance: null,
          },
        ],
      },
      // {
      //   label: "Visual",
      //   questions: [
      //     {
      //       category: "",
      //       trait: "",
      //       label: "Which dog do you like the look of the most?",
      //       question: {
      //         rankings: dogRatings,
      //       },
      //       importance: null,
      //     },
      //   ],
      // },
    ],
  };

  return quizData;
};

export default getQuizData;
