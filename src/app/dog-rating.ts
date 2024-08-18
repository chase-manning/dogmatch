import { DogType } from "../components/DogContext";
import { CheckboxType, QuizType, RatingType } from "../pages/quiz/quiz-data";

interface DogRatingType {
  dogId: string;
  rating: number;
}

const dogRating = (dogs: DogType[], quiz: QuizType): DogRatingType[] => {
  let dogRatings: DogRatingType[] = dogs.map((dog) => {
    return {
      dogId: dog.id,
      rating: 0,
    };
  });

  for (const section of quiz.sections) {
    for (const question of section.questions) {
      const isRating = !!(question.question as RatingType).min;
      const ratingQuestion = question.question as RatingType;
      const isCheckbox = !!(question.question as CheckboxType).options;
      const checkboxQuestion = question.question as CheckboxType;

      for (let i = 0; i < dogs.length; i++) {
        const { category, trait } = question;
        const dogValue = (dogs[i] as any)[category][trait];

        if (isRating) {
          if (ratingQuestion.value) {
            const closeness = 4 - Math.abs(dogValue - ratingQuestion.value);
            dogRatings[i].rating += closeness * (question.importance || 2);
          }
        }

        if (isCheckbox) {
          const selected = checkboxQuestion.selected;
          if (selected.length > 0) {
            if (typeof dogValue === "string") {
              if (selected.includes(dogValue)) {
                dogRatings[i].rating += (question.importance || 2) * 2;
              }
            }

            if (Array.isArray(dogValue)) {
              for (const t of dogValue) {
                if (selected.includes(t)) {
                  dogRatings[i].rating += question.importance || 2;
                }
              }
            }
          }
        }
      }
    }
  }

  return dogRatings;
};

export default dogRating;
