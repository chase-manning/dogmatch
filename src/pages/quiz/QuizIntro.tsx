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

const NameInputContainer = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
    max-width: 40rem;
  }
`;

const NameInput = styled.input`
  width: 100%;
  height: 6.7rem;
  border-radius: 1rem;
  border: solid 2px var(--main);
  background: var(--bg);
  font-family: "Jost", sans-serif;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 0 2rem;
  color: var(--main);
  text-align: center;

  &::placeholder {
    color: var(--sub);
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-color: var(--sub);
  }
`;

const BackLink = styled.button`
  font-family: "Jost", sans-serif;
  font-size: 2rem;
  font-weight: 500;
  color: var(--sub);
  cursor: pointer;
  text-decoration: underline;
  background: none;
  border: none;
`;

interface Props {
  quiz: QuizType | null;
  start: () => void;
  startNewQuiz: () => void;
  startCoupleQuiz: (names: [string, string]) => void;
}

const QuizIntro = ({ quiz, start, startNewQuiz, startCoupleQuiz }: Props) => {
  const [startingNewQuiz, setStartingNewQuiz] = useState(false);
  const [starting, setStarting] = useState(false);
  const { loading, error } = useDogs();
  const hasOngoing = quiz && quiz.started;

  const [showNameEntry, setShowNameEntry] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [startingCouple, setStartingCouple] = useState(false);

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
    if (startingCouple && name1.trim() && name2.trim()) {
      startCoupleQuiz([name1.trim(), name2.trim()]);
      return;
    }
  }, [
    loading,
    starting,
    startingNewQuiz,
    startingCouple,
    startNewQuiz,
    start,
    startCoupleQuiz,
    error,
    name1,
    name2,
  ]);

  const handleStartCouple = () => {
    if (!name1.trim() || !name2.trim()) return;
    if (loading) {
      setStartingCouple(true);
    } else {
      startCoupleQuiz([name1.trim(), name2.trim()]);
    }
  };

  if (showNameEntry) {
    return (
      <StyledQuizIntro>
        <PawPrints src={paws} alt="paw print assets" />
        <Header>Who's taking the quiz?</Header>
        <NameInputContainer>
          <NameInput
            placeholder="First person's name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            autoFocus
          />
          <NameInput
            placeholder="Second person's name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
          <div style={{ marginTop: "1rem", width: "100%" }}>
            <Button
              primary
              wide
              disabled={
                !name1.trim() || !name2.trim() || error !== null
              }
              loading={startingCouple && loading}
              action={handleStartCouple}
              event={START_QUIZ_EVENT}
            >
              {error ? "Error, please refresh page" : "Start quiz together"}
            </Button>
          </div>
          <BackLink onClick={() => { setStartingCouple(false); setShowNameEntry(false); }}>Go back</BackLink>
        </NameInputContainer>
        <div />
      </StyledQuizIntro>
    );
  }

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
          <>
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
              {error ? "Error, please refresh page" : "Just me"}
            </Button>
            <Button
              wide
              disabled={error !== null}
              action={() => setShowNameEntry(true)}
            >
              {error ? "Error, please refresh page" : "With a partner"}
            </Button>
          </>
        )}
      </ButtonContainer>
      <div />
      <div />
    </StyledQuizIntro>
  );
};

export default QuizIntro;
