import { DogType } from "../components/DogContext";
import {
  CheckboxType,
  LooksType,
  QuizType,
  RatingType,
} from "../pages/quiz/quiz-data";
import { getItemMetadata, ItemType } from "./item-metadata";

const MIN_LOOKS_PERCENT = 0.05;
const MAX_LOOKS_PERCENT = 0.5;

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
            const importance = question.importance || 3;
            const closeness = 4 - Math.abs(dogValue - ratingQuestion.value);
            dogRating.rating += closeness * importance;
          }
        }

        if (isCheckbox) {
          const dogValue = (dogs[i] as any)[category][trait];
          const selected = checkboxQuestion.selected;
          if (selected.length > 0) {
            if (typeof dogValue === "string") {
              if (selected.includes(dogValue)) {
                const importance = question.importance || 3;
                dogRating.rating += importance * 2;
              }
            }

            if (Array.isArray(dogValue)) {
              for (const t of dogValue) {
                if (selected.includes(t)) {
                  const importance = question.importance || 3;
                  dogRating.rating += importance;
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

  console.log("==== TOP DOGS ====");
  for (const dog of dogs
    .sort((a, b) => dogRatings[b.id].percent - dogRatings[a.id].percent)
    .map((dog) => {
      return { dog: dog.id, rating: dogRatings[dog.id] };
    })
    .slice(0, 20)) {
    const format = (num: number) => `${Math.round(num * 100)}%`;
    console.log(
      dog.dog,
      `${format(dog.rating.rating)} ${format(dog.rating.elo)} ${format(
        dog.rating.percent
      )}`
    );
  }

  return dogRatings;
};

export default dogRating;
