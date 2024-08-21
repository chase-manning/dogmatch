import {
  CheckboxType,
  LooksType,
  QuestionType,
  RatingType,
  SectionType,
} from "../pages/quiz/quiz-data";
import { TOTAL_ROUNDS } from "../pages/quiz/Tournament";

const questionCompletion = (question: QuestionType) => {
  const hasImportant = !!question.importance;
  const importantPercent = hasImportant ? 0.5 : 0;
  const isRating = !!(question.question as RatingType).min;
  const ratingQuestion = question.question as RatingType;
  const isCheckbox = !!(question.question as CheckboxType).options;
  const checkboxQuestion = question.question as CheckboxType;
  const isLooks = !!(question.question as LooksType).rankings;
  if (question.looks && isRating) return (!!ratingQuestion.value ? 0.5 : 0) * 2;
  if (isRating) return (!!ratingQuestion.value ? 0.5 : 0) + importantPercent;
  if (isCheckbox)
    return (checkboxQuestion.selected.length > 0 ? 0.5 : 0) + importantPercent;
  if (isLooks) return (question.question as LooksType).rounds / TOTAL_ROUNDS;
  throw new Error("Invalid question type");
};

const quizCompletionPercent = (section: SectionType) => {
  let total = 0;
  let complete = 0;
  for (const question of section.questions) {
    total++;
    complete += questionCompletion(question);
  }

  return complete / total;
};

export default quizCompletionPercent;
