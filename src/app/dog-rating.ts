import { DogType } from "../components/DogContext";
import {
  CheckboxType,
  LooksType,
  QuizType,
  RatingType,
} from "../pages/quiz/quiz-data";

const MIN_LOOKS_PERCENT = 0.05;
const MAX_LOOKS_PERCENT = 0.5;

interface DogRatingType {
  dogId: string;
  rating: number;
  elo: number;
  percent: number;
}

const dogRating = (dogs: DogType[], quiz: QuizType): DogRatingType[] => {
  let dogRatings: DogRatingType[] = dogs.map((dog) => {
    return {
      dogId: dog.id,
      rating: 0,
      elo: 1500,
      percent: 0,
    };
  });

  for (const section of quiz.sections) {
    for (const question of section.questions) {
      const isRating = !!(question.question as RatingType).min;
      const ratingQuestion = question.question as RatingType;
      const isCheckbox = !!(question.question as CheckboxType).options;
      const checkboxQuestion = question.question as CheckboxType;
      const isLooks = !!(question.question as LooksType).rankings;
      const looksQuestion = question.question as LooksType;

      for (let i = 0; i < dogs.length; i++) {
        const { category, trait } = question;

        if (isRating) {
          if (question.looks) continue;
          const dogValue = (dogs[i] as any)[category][trait];
          if (ratingQuestion.value) {
            const importance = question.importance || 3;
            const closeness = 4 - Math.abs(dogValue - ratingQuestion.value);
            dogRatings[i].rating += closeness * importance;
          }
        }

        if (isCheckbox) {
          const dogValue = (dogs[i] as any)[category][trait];
          const selected = checkboxQuestion.selected;
          if (selected.length > 0) {
            if (typeof dogValue === "string") {
              if (selected.includes(dogValue)) {
                const importance = question.importance || 3;
                dogRatings[i].rating += importance * 2;
              }
            }

            if (Array.isArray(dogValue)) {
              for (const t of dogValue) {
                if (selected.includes(t)) {
                  const importance = question.importance || 3;
                  dogRatings[i].rating += importance;
                }
              }
            }
          }
        }

        if (isLooks) {
          const dogElo = looksQuestion.rankings.find(
            (ranking) => ranking.breed === dogs[i].id
          );
          dogRatings[i].elo = dogElo?.elo || 1500;
        }
      }
    }
  }

  const maxRating = Math.max(...dogRatings.map((rating) => rating.rating));
  const minRating = Math.min(...dogRatings.map((rating) => rating.rating));
  const maxElo = Math.max(...dogRatings.map((rating) => rating.elo));
  const minElo = Math.min(...dogRatings.map((rating) => rating.elo));
  const importanceQuestion = quiz.sections[0].questions.find(
    (question) => question.looks
  );
  if (!importanceQuestion) throw new Error("Importance question not found");
  const importance = (importanceQuestion.question as RatingType).value || 3;
  const looksPercent =
    (MAX_LOOKS_PERCENT - MIN_LOOKS_PERCENT) * ((importance - 1) / 4) +
    MIN_LOOKS_PERCENT;

  for (let i = 0; i < dogs.length; i++) {
    const ratingDiv = maxRating - minRating;
    if (ratingDiv !== 0) {
      dogRatings[i].rating = (dogRatings[i].rating - minRating) / ratingDiv;
    } else {
      dogRatings[i].rating = dogRatings[i].rating - minRating;
    }
    const eloDiv = maxElo - minElo;
    if (eloDiv !== 0) {
      dogRatings[i].elo = (dogRatings[i].elo - minElo) / eloDiv;
    } else {
      dogRatings[i].elo = dogRatings[i].elo - minElo;
    }
    dogRatings[i].percent =
      dogRatings[i].rating * (1 - looksPercent) +
      dogRatings[i].elo * looksPercent;
  }

  console.log("==== TOP DOGS ====");
  for (const dog of dogRatings
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 20)) {
    const format = (num: number) => `${Math.round(num * 100)}%`;
    console.log(
      dog.dogId,
      `${format(dog.rating)} ${format(dog.elo)} ${format(dog.percent)}`
    );
  }

  return dogRatings;
};

export default dogRating;
