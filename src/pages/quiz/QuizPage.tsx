import styled from "styled-components";
import QuizIntro from "./QuizIntro";
import { useEffect, useState } from "react";
import getQuizData, { QuizType } from "./quiz-data";
import useDogs from "../../app/use-dogs";

import ProgressBar from "./ProgressBar";
import Results from "./Results";
import dogRating from "../../app/dog-rating";
import QuizContent from "./QuizContent";

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
  const [started, setStarted] = useState(false);
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const dogRatings = quiz ? dogRating(dogs, quiz) : {};

  useEffect(() => {
    setQuiz(getQuizData(dogs));
  }, [dogs]);

  return (
    <StyledQuizPage>
      <ProgressBar quiz={quiz} sectionIndex={sectionIndex} />
      {started && !showResults && (
        <QuizContent
          quiz={quiz}
          setShowResults={setShowResults}
          setQuiz={setQuiz}
          sectionIndex={sectionIndex}
          setSectionIndex={setSectionIndex}
        />
      )}

      {!started && <QuizIntro start={() => setStarted(true)} />}
      {started && quiz && showResults && (
        <Results ratings={dogRatings} show={showResults} />
      )}
    </StyledQuizPage>
  );
};

export default QuizPage;
