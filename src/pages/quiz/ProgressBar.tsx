import styled from "styled-components";
import { QuizType } from "./quiz-data";
import quizCompletionPercent from "../../app/quiz-completion-percent";
import { useEffect, useRef, useState } from "react";
import drop from "../../assets/drop.svg";

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
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  max-width: 180rem;
`;
const ContentInner = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding: 0 10rem;
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
`;

const Dot = styled.button<{ $active?: boolean }>`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: solid 2px var(--sub);
  background: ${({ $active }) => ($active ? "var(--sub)" : "var(--bg)")};
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
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
`;

const PercentIndicatorContainer = styled.div`
  position: absolute;
  bottom: calc(50% + 0.4rem);
  transform: translateX(-50%);
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
  sectionIndex: number;
}

const ProgressBar = ({ quiz, sectionIndex }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

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
    ? quizCompletionPercent(quiz.sections[sectionIndex])
    : 0;

  return (
    <Container ref={containerRef}>
      <StyledProgressBar $fixed={isFixed}>
        <Content>
          <ContentInner>
            <ContentInnerInner>
              {quiz?.sections.map((section, index) => {
                const sectionComplete = quiz
                  ? quizCompletionPercent(section)
                  : 0;
                return (
                  <Line
                    key={index}
                    $percent={sectionIndex > index ? 1 : sectionComplete}
                  />
                );
              })}
              {quiz?.sections.map((section, index) => {
                return (
                  <Dot
                    key={`dot-${index}`}
                    style={{ left: `${(index / 5) * 100}%` }}
                    $active={sectionIndex >= index}
                  >
                    <Label>{section.label}</Label>
                  </Dot>
                );
              })}
              <PercentIndicatorContainer
                style={{
                  left: `${((sectionIndex + percentComplete) / 5) * 100}%`,
                }}
              >
                <PercentageIndicatorImage src={drop} alt="drop" />
                <PercentageIndicator>
                  {Math.round(((percentComplete + sectionIndex) / 5) * 100)}%
                </PercentageIndicator>
              </PercentIndicatorContainer>
              <Dot style={{ left: `${100}%` }}>
                <Label>Your dream dog!</Label>
              </Dot>
            </ContentInnerInner>
          </ContentInner>
        </Content>
      </StyledProgressBar>
    </Container>
  );
};

export default ProgressBar;
