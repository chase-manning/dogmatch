import { QuizType } from "../pages/quiz/quiz-data";

export const QUIZ_VERSION = 1;

const ID = `dogmatch-quiz-data-${QUIZ_VERSION}`;

export const getQuizDataCache = (): QuizType | null => {
  const quizData_ = localStorage.getItem(ID);
  if (!quizData_) return null;
  return JSON.parse(quizData_);
};

export const writeQuizDataCache = (quiz: QuizType | null) => {
  localStorage.setItem(ID, JSON.stringify(quiz));
};
