import styled from "styled-components";
import QuizIntro from "./QuizIntro";
import { useEffect, useMemo, useState } from "react";
import getQuizData, {
  QuizType,
  buildNonVisualSections,
  buildVisualSection,
} from "./quiz-data";
import useDogs from "../../app/use-dogs";

import ProgressBar from "./ProgressBar";
import Results from "./Results";
import dogRating, { coupleDogRating } from "../../app/dog-rating";
import QuizContent from "./QuizContent";
import { writeQuizDataCache } from "../../app/quiz-data-cache";
import Seo from "../../components/Seo";

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

  const isCouple = quiz?.mode === "couple";

  const coupleResult = useMemo(
    () =>
      quiz && isCouple && quiz.person2Sections && quiz.person2VisualSection
        ? coupleDogRating(dogs, quiz)
        : null,
    [dogs, quiz, isCouple]
  );

  const dogRatings = quiz
    ? coupleResult
      ? coupleResult.combined
      : dogRating(dogs, quiz)
    : {};

  const startNewQuiz = () => {
    writeQuizDataCache(null);
    setQuiz(getQuizData(dogs));
    setStarted(true);
  };

  const startCoupleQuiz = (names: [string, string]) => {
    writeQuizDataCache(null);
    const baseQuiz = getQuizData(dogs);
    const coupleQuiz: QuizType = {
      ...baseQuiz,
      mode: "couple",
      coupleNames: names,
      couplePhase: "person1",
      person2Sections: buildNonVisualSections(dogs),
      person2VisualSection: buildVisualSection(dogs),
      started: true,
    };
    setQuiz(coupleQuiz);
    setStarted(true);
  };

  useEffect(() => {
    setQuiz(getQuizData(dogs));
  }, [dogs]);

  useEffect(() => {
    if (!quiz) return;
    if (!quiz.started) return;
    writeQuizDataCache(quiz);
  }, [quiz]);

  return (
    <StyledQuizPage>
      <Seo title="dogmatch Quiz" description="Find your perfect dog match!" />
      <ProgressBar quiz={quiz} setQuiz={setQuiz} />
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
          startCoupleQuiz={startCoupleQuiz}
        />
      )}
      {quiz && started && quiz.showResults && (
        <Results
          ratings={dogRatings}
          show={quiz.showResults}
          quiz={quiz}
          coupleRatings={coupleResult}
        />
      )}
    </StyledQuizPage>
  );
};

export default QuizPage;
