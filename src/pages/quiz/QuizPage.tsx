import styled from "styled-components";
import QuizIntro from "./QuizIntro";
import { useState } from "react";

const StyledQuizPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

const QuizPage = () => {
  const [started, setStarted] = useState(false);

  return (
    <StyledQuizPage>
      {!started && <QuizIntro start={() => setStarted(true)} />}
    </StyledQuizPage>
  );
};

export default QuizPage;
