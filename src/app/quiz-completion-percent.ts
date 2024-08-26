import {
  CheckboxType,
  LooksType,
  QuestionType,
  RatingType,
  SectionType,
} from "../pages/quiz/quiz-data";
import { TOTAL_ROUNDS } from "../pages/quiz/Tournament";
import { getItemMetadata, ItemType } from "./item-metadata";

const questionCompletion = (question: QuestionType) => {
  const metadata = getItemMetadata(question.category, question.trait);
  if (!metadata) throw new Error("no metadata found");
  const hasImportant = !!question.importance;
  const importantPercent = hasImportant ? 0.5 : 0;
  const isRating = metadata.type === ItemType.RATING;
  const ratingQuestion = question.question as RatingType;
  const isCheckbox =
    metadata.type === ItemType.STRING || metadata.type === ItemType.LIST;
  const checkboxQuestion = question.question as CheckboxType;
  const isLooksImportance = metadata.type === ItemType.IMPORTANCE;
  const isLooks = metadata.type === ItemType.TOURNAMENT;
  if (isLooksImportance) return (!!ratingQuestion.value ? 0.5 : 0) * 2;
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
