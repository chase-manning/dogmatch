import { DogType } from "../components/DogContext";
import {
  CheckboxType,
  LooksType,
  QuizType,
  RatingType,
} from "../pages/quiz/quiz-data";
import { getItemMetadata, ItemType } from "./item-metadata";

const MIN_LOOKS_PERCENT = 0.05; // 5%
const MAX_LOOKS_PERCENT = 0.5; // 50%

// Geometrically-spaced weights so each step is a consistent ~50% increase.
// Preserves the 5:1 max/min ratio (r^4 = 5, r ≈ 1.495).
const IMPORTANCE_WEIGHTS = [1.0, 1.5, 2.24, 3.34, 5.0];
const getImportanceWeight = (importance: number | null): number => {
  const clamped = Math.max(1, Math.min(5, Math.round(importance || 3)));
  return IMPORTANCE_WEIGHTS[clamped - 1];
};

export interface DogRatingType {
  rating: number;
  elo: number;
  percent: number;
}

export type DogRatings = Record<string, DogRatingType>;

const dogRating = (dogs: DogType[], quiz: QuizType): DogRatings => {
  let dogRatings: DogRatings = {};
  dogs.map((dog) => {
    return {
      dogId: dog.id,
      rating: 0,
      elo: 1500,
      percent: 0,
    };
  });

  for (let i = 0; i < dogs.length; i++) {
    let dogRating: DogRatingType = {
      rating: 0,
      elo: 1500,
      percent: 0,
    };

    for (const section of quiz.sections) {
      for (const question of section.questions) {
        const metadata = getItemMetadata(question.category, question.trait);
        if (!metadata) throw new Error("metadata not found");
        const isRating = metadata.type === ItemType.RATING;
        const ratingQuestion = question.question as RatingType;
        const isCheckbox =
          metadata.type === ItemType.STRING || metadata.type === ItemType.LIST;
        const checkboxQuestion = question.question as CheckboxType;
        const isLooks = metadata.type === ItemType.TOURNAMENT;
        const looksQuestion = question.question as LooksType;

        const { category, trait } = question;

        if (isRating) {
          const dogValue = (dogs[i] as any)[category][trait];
          if (ratingQuestion.value) {
            const weight = getImportanceWeight(question.importance);
            const closeness = 4 - Math.abs(dogValue - ratingQuestion.value);
            dogRating.rating += closeness * weight;
          }
        }

        if (isCheckbox) {
          const dogValue = (dogs[i] as any)[category][trait];
          const selected = checkboxQuestion.selected;
          if (selected.length > 0) {
            if (typeof dogValue === "string") {
              if (selected.includes(dogValue)) {
                const weight = getImportanceWeight(question.importance);
                dogRating.rating += weight * 2;
              }
            }

            if (Array.isArray(dogValue)) {
              for (const t of dogValue) {
                if (selected.includes(t)) {
                  const weight = getImportanceWeight(question.importance);
                  dogRating.rating += weight;
                }
              }
            }
          }
        }

        if (isLooks) {
          const dogElo = looksQuestion.dogElos[dogs[i].id];
          dogRating.elo = dogElo?.elo || 1500;
        }
      }
    }

    dogRatings[dogs[i].id] = dogRating;
  }

  const maxRating = Math.max(...dogs.map((dog) => dogRatings[dog.id].rating));
  const minRating = Math.min(...dogs.map((dog) => dogRatings[dog.id].rating));
  const maxElo = Math.max(...dogs.map((dog) => dogRatings[dog.id].elo));
  const minElo = Math.min(...dogs.map((dog) => dogRatings[dog.id].elo));
  const importanceQuestion = quiz.sections[0].questions.find(
    (question) =>
      getItemMetadata(question.category, question.trait)?.type ===
      ItemType.IMPORTANCE
  );
  if (!importanceQuestion) throw new Error("Importance question not found");
  const importance = (importanceQuestion.question as RatingType).value || 3;
  const looksPercent =
    (MAX_LOOKS_PERCENT - MIN_LOOKS_PERCENT) * ((importance - 1) / 4) +
    MIN_LOOKS_PERCENT;

  for (let i = 0; i < dogs.length; i++) {
    const dogId = dogs[i].id;
    const ratingDiv = maxRating - minRating;
    if (ratingDiv !== 0) {
      dogRatings[dogId].rating =
        (dogRatings[dogId].rating - minRating) / ratingDiv;
    } else {
      dogRatings[dogId].rating = dogRatings[dogId].rating - minRating;
    }
    const eloDiv = maxElo - minElo;
    if (eloDiv !== 0) {
      dogRatings[dogId].elo = (dogRatings[dogId].elo - minElo) / eloDiv;
    } else {
      dogRatings[dogId].elo = dogRatings[dogId].elo - minElo;
    }
    dogRatings[dogId].percent =
      dogRatings[dogId].rating * (1 - looksPercent) +
      dogRatings[dogId].elo * looksPercent;
  }

  return dogRatings;
};

export interface CoupleRatings {
  combined: DogRatings;
  person1: DogRatings;
  person2: DogRatings;
}

export const coupleDogRating = (
  dogs: DogType[],
  quiz: QuizType
): CoupleRatings => {
  if (!quiz.person2Sections) {
    throw new Error(
      "coupleDogRating requires quiz.person2Sections for couple-mode quizzes"
    );
  }
  if (!quiz.person2VisualSection) {
    throw new Error(
      "coupleDogRating requires quiz.person2VisualSection for couple-mode quizzes"
    );
  }

  const person1NonVisual = quiz.sections.slice(0, -1);
  const person1VisualSection = quiz.sections[quiz.sections.length - 1];
  const person2NonVisual = quiz.person2Sections;
  const person2VisualSection = quiz.person2VisualSection;

  // Person 1's synthetic quiz: combined non-visual (P1 first so P1's "General"
  // section is sections[0], meaning P1's looksImportance weights their own ELO)
  // plus ONLY P1's visual section.
  const quiz1: QuizType = {
    ...quiz,
    mode: "solo",
    sections: [...person1NonVisual, ...person2NonVisual, person1VisualSection],
    person2Sections: undefined,
    person2VisualSection: undefined,
    couplePhase: undefined,
  };
  // Person 2's synthetic quiz: same combined non-visual but with P2's "General"
  // section first (so P2's looksImportance drives the blend) plus ONLY P2's
  // visual section.
  const quiz2: QuizType = {
    ...quiz,
    mode: "solo",
    sections: [...person2NonVisual, ...person1NonVisual, person2VisualSection],
    person2Sections: undefined,
    person2VisualSection: undefined,
    couplePhase: undefined,
  };

  const ratings1 = dogRating(dogs, quiz1);
  const ratings2 = dogRating(dogs, quiz2);

  const combined: DogRatings = {};
  for (const dog of dogs) {
    combined[dog.id] = {
      rating: (ratings1[dog.id].rating + ratings2[dog.id].rating) / 2,
      elo: (ratings1[dog.id].elo + ratings2[dog.id].elo) / 2,
      percent: (ratings1[dog.id].percent + ratings2[dog.id].percent) / 2,
    };
  }

  return { combined, person1: ratings1, person2: ratings2 };
};

export default dogRating;
