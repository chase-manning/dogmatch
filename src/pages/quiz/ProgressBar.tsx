import styled from "styled-components";
import { QuizType } from "./quiz-data";
import quizCompletionPercent from "../../app/quiz-completion-percent";
import { useEffect, useRef, useState } from "react";
import drop from "../../assets/drop.svg";
import triggerEvent, { COMPLETE_QUIZ_EVENT } from "../../app/trigger-event";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 16rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProgressBar = styled.div<{ $fixed: boolean }>`
  width: 100%;
  background: var(--bg);
  position: ${({ $fixed }) => ($fixed ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 16rem;
  padding: 0 10rem;

  box-shadow: ${({ $fixed }) =>
    $fixed ? "0 0 1rem rgba(0, 0, 0, 0.1)" : "none"};

  @media (max-width: 900px) {
    padding: 0 2.5rem;
    height: 12rem;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  max-width: 180rem;

  @media (max-width: 900px) {
    transform: translateY(-1.5rem);
  }
`;

const ContentInner = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding: 0 10rem;

  @media (max-width: 900px) {
    padding: 0 2.5rem;
  }
`;

const ContentInnerInner = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const Line = styled.div<{ $percent: number }>`
  flex: 1;
  height: 0.8rem;
  background: linear-gradient(
    to right,
    var(--sub) 0%,
    var(--sub) ${({ $percent }) => $percent * 100}%,
    #cfeafc ${({ $percent }) => $percent * 100}%,
    #cfeafc 100%
  );

  @media (max-width: 900px) {
    height: 0.4rem;
  }
`;

const Dot = styled.div<{ $active?: boolean }>`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: solid 2px var(--sub);
  background: ${({ $active }) => ($active ? "var(--sub)" : "var(--bg)")};
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0;
  color: none;

  @media (max-width: 900px) {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.2rem;
    font-weight: 600;
    color: ${({ $active }) => ($active ? "var(--bg)" : "var(--sub)")};
  }
`;

const DotButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20rem;
  height: 10rem;
  cursor: pointer;
  transform: translate(-50%, -50%);

  @media (max-width: 900px) {
    width: 8rem;
    height: 12rem;
  }
`;

const Label = styled.div`
  position: absolute;
  top: calc(100% + 3rem);
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 500;
  color: var(--sub);
  white-space: nowrap;

  @media (max-width: 900px) {
    font-size: 1.6rem;
    white-space: wrap;
    text-align: center;
  }
`;

const PercentIndicatorContainer = styled.div`
  position: absolute;
  bottom: calc(50% + 0.4rem);
  transform: translateX(-50%);

  @media (max-width: 900px) {
    display: none;
  }
`;

const PercentageIndicatorImage = styled.img`
  width: 4.2rem;
`;

const PercentageIndicator = styled.div`
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--bg);
  font-size: 1.6rem;
  font-weight: 500;
  font-family: "Jost", sans-serif;
`;

interface Props {
  quiz: QuizType | null;
  setQuiz: (quiz: QuizType) => void;
}

const ProgressBar = ({ quiz, setQuiz }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  const setSectionIndex = (i: number) => {
    if (!quiz) return;
    let newQuiz = { ...quiz };
    newQuiz.sectionIndex = i;
    newQuiz.showResults = false;
    setQuiz(newQuiz);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        setIsFixed(false);
        return;
      }
      const { top } = containerRef.current.getBoundingClientRect();
      setIsFixed(top < 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const percentComplete = quiz
    ? quiz.showResults
      ? 1
      : quizCompletionPercent(quiz.sections[quiz.sectionIndex])
    : 0;

  return (
    <Container ref={containerRef}>
      <StyledProgressBar $fixed={isFixed}>
        <Content>
          <ContentInner>
            <ContentInnerInner>
              {quiz?.sections.map((section, index) => {
                const sectionComplete = quiz.showResults
                  ? 1
                  : quiz
                  ? quizCompletionPercent(section)
                  : 0;
                return (
                  <Line
                    key={index}
                    $percent={
                      quiz.showResults
                        ? 1
                        : quiz.sectionIndex > index
                        ? 1
                        : quiz.sectionIndex < index
                        ? 0
                        : sectionComplete
                    }
                  />
                );
              })}
              {quiz?.sections.map((section, index) => {
                return (
                  <Dot
                    key={`dot-${index}`}
                    style={{ left: `${(index / 5) * 100}%` }}
                    $active={quiz.sectionIndex >= index || quiz.showResults}
                  >
                    {index}
                    <Label>{section.label}</Label>
                    <DotButton
                      onClick={() => {
                        setSectionIndex(index);
                      }}
                    />
                  </Dot>
                );
              })}
              {quiz && (
                <PercentIndicatorContainer
                  style={{
                    left: `${
                      quiz.showResults
                        ? 100
                        : ((quiz.sectionIndex || 0) / 5 + percentComplete / 5) *
                          100
                    }%`,
                  }}
                >
                  <PercentageIndicatorImage src={drop} alt="drop" />
                  <PercentageIndicator>
                    {Math.round(
                      quiz.showResults
                        ? 100
                        : ((quiz.sectionIndex || 0) / 5 + percentComplete / 5) *
                            100
                    )}
                    %
                  </PercentageIndicator>
                </PercentIndicatorContainer>
              )}
              <Dot
                style={{ left: `${100}%` }}
                $active={!!quiz && quiz.showResults}
              >
                {quiz ? quiz.sections.length : 0}
                <Label>Results</Label>
                {quiz && (
                  <DotButton
                    onClick={() => {
                      let newQuiz = { ...quiz };
                      newQuiz.showResults = true;
                      triggerEvent(COMPLETE_QUIZ_EVENT);
                      setQuiz(newQuiz);
                    }}
                  />
                )}
              </Dot>
            </ContentInnerInner>
          </ContentInner>
        </Content>
      </StyledProgressBar>
    </Container>
  );
};

export default ProgressBar;
