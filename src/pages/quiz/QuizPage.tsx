import styled from "styled-components";
import QuizIntro from "./QuizIntro";
import { useEffect, useState } from "react";
import getQuizData, { QuizType } from "./quiz-data";
import useDogs from "../../app/use-dogs";

import ProgressBar from "./ProgressBar";
import Results from "./Results";
import dogRating from "../../app/dog-rating";
import QuizContent from "./QuizContent";
import { writeQuizDataCache } from "../../app/quiz-data-cache";

const StyledQuizPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  width: 100%;
`;

const QuizPage = () => {
  const { dogs } = useDogs();
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [started, setStarted] = useState(false);

  const dogRatings = quiz ? dogRating(dogs, quiz) : {};

  const startNewQuiz = () => {
    writeQuizDataCache(null);
    setQuiz(getQuizData(dogs));
    setStarted(true);
  };

  useEffect(() => {
    setQuiz(getQuizData(dogs));
  }, [dogs]);

  useEffect(() => {
    if (!quiz) return;
    writeQuizDataCache(quiz);
  }, [quiz]);

  return (
    <StyledQuizPage>
      <ProgressBar quiz={quiz} />
      {quiz && started && !quiz.showResults && (
        <QuizContent quiz={quiz} setQuiz={setQuiz} />
      )}

      {(!quiz || !started) && (
        <QuizIntro
          quiz={quiz}
          start={() => {
            if (!quiz) return;
            let newQuiz = { ...quiz };
            newQuiz.started = true;
            setQuiz(newQuiz);
            setStarted(true);
          }}
          startNewQuiz={startNewQuiz}
        />
      )}
      {quiz && started && quiz.showResults && (
        <Results ratings={dogRatings} show={quiz.showResults} quiz={quiz} />
      )}
    </StyledQuizPage>
  );
};

export default QuizPage;
