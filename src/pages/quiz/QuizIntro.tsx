import styled from "styled-components";
import Button from "../../components/Button";

import paws from "../../assets/paws.svg";
import { QuizType } from "./quiz-data";
import { START_QUIZ_EVENT } from "../../app/trigger-event";
import useDogs from "../../app/use-dogs";
import { useEffect, useState } from "react";

const StyledQuizIntro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100dvh - 10rem);
  background: var(--bg);
  padding: 5rem 5rem;
  z-index: 2;

  @media (max-width: 900px) {
    padding: 3rem 3rem;
    height: calc(100dvh - 8rem);
  }
`;

const PawPrints = styled.img`
  height: 13.1rem;

  @media (max-width: 900px) {
    height: 11rem;
  }
`;

const Header = styled.h1`
  font-size: 9.6rem;
  font-weight: 650;
  width: 100%;
  max-width: 105rem;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 7rem;
    font-weight: 600;
    line-height: 1.3;
  }

  @media (max-width: 326px) {
    font-size: 6rem;
  }
`;

const ButtonContainer = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 900px) {
    margin-top: 3rem;
  }
`;

interface Props {
  quiz: QuizType | null;
  start: () => void;
  startNewQuiz: () => void;
}

const QuizIntro = ({ quiz, start, startNewQuiz }: Props) => {
  const [startingNewQuiz, setStartingNewQuiz] = useState(false);
  const [starting, setStarting] = useState(false);
  const { loading, error } = useDogs();
  const hasOngoing = quiz && quiz.started;

  useEffect(() => {
    if (loading) return;
    if (error !== null) return;
    if (starting) {
      start();
      return;
    }
    if (startingNewQuiz) {
      startNewQuiz();
      return;
    }
  }, [loading, starting, startingNewQuiz, startNewQuiz, start, error]);

  return (
    <StyledQuizIntro>
      <PawPrints src={paws} alt="paw print assets" />
      <Header>Which dog is your perfect match?</Header>
      <ButtonContainer>
        {hasOngoing && (
          <>
            <Button
              wide
              disabled={error !== null}
              loading={starting && loading}
              action={() => {
                if (loading) {
                  setStarting(true);
                } else {
                  start();
                }
              }}
            >
              {error
                ? "Error, please refresh page"
                : "Continue where you left off"}
            </Button>
            <Button
              primary
              wide
              disabled={error !== null}
              loading={starting && loading}
              action={() => {
                if (loading) {
                  setStartingNewQuiz(true);
                } else {
                  startNewQuiz();
                }
              }}
              event={START_QUIZ_EVENT}
            >
              {error ? "Error, please refresh page" : "Start a new quiz"}
            </Button>
          </>
        )}
        {!hasOngoing && (
          <Button
            wide
            primary
            disabled={error !== null}
            loading={starting && loading}
            action={() => {
              if (loading) {
                setStarting(true);
              } else {
                start();
              }
            }}
          >
            {error
              ? "Error, please refresh page"
              : "Start the dogmatch quiz now"}
          </Button>
        )}
      </ButtonContainer>
      <div />
      <div />
    </StyledQuizIntro>
  );
};

export default QuizIntro;
