import styled from "styled-components";
import {
  CheckboxType,
  DogElos,
  LooksType,
  QuizType,
  RatingType,
} from "./quiz-data";

import paw from "../../assets/stats/paw.svg";
import lightPaw from "../../assets/paw.svg";
import Scale from "../../components/Scale";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import Tournament, { TOTAL_ROUNDS } from "./Tournament";
import { getItemMetadata, ItemType } from "../../app/item-metadata";
import Tooltip from "../../components/Tooltip";
import triggerEvent, { COMPLETE_QUIZ_EVENT } from "../../app/trigger-event";

const StyledQuizContent = styled.div`
  padding: 10rem;
  width: 100%;
  max-width: 180rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rem;

  @media (max-width: 900px) {
    padding: 1.5rem 2.5rem;
    gap: 11rem;
  }
`;

const QuestionContainer = styled.div<{ $skipped: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  opacity: ${({ $skipped }) => ($skipped ? "0.3" : "1")};
`;

const HeaderContainer = styled.div<{ $looks?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ $looks }) => ($looks ? "auto" : "100%")};
  margin-bottom: 3rem;
  gap: 2rem;

  @media (max-width: 900px) {
    margin-bottom: 4rem;
    gap: 1rem;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
    gap: 1rem;
  }
`;

const SubHeaderContainer = styled(HeaderContainer)`
  justify-content: flex-start;
  margin-bottom: 6rem;
  margin-top: 10rem;

  @media (max-width: 900px) {
    margin-bottom: 5rem;
    margin-top: 8rem;
  }
`;

const IconContainer = styled.div<{ $small: boolean }>`
  position: relative;
  width: 12rem;
  width: ${({ $small }) => ($small ? "10rem" : "12rem")};

  @media (max-width: 900px) {
    display: none;
  }
`;

const Icon = styled.img`
  width: 100%;
`;

const Number = styled.div`
  font-size: 3.2rem;
  font-weight: 600;
  font-family: "Jost", sans-serif;
  color: var(--bg);
  position: absolute;
  top: 63%;
  left: 52%;
  transform: translate(-50%, -50%);
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Header = styled.div`
  font-size: 3.2rem;
  font-weight: 650;

  @media (max-width: 900px) {
    font-size: 2.8rem;
  }
`;

const LightHeader = styled.div`
  font-size: 2.4rem;
  font-weight: 500;

  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

const SubHeader = styled.div`
  font-size: 3.2rem;
  font-weight: 650;

  @media (max-width: 900px) {
    font-size: 2.8rem;
    font-weight: 500;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6rem;

  @media (min-width: 900px) {
    button {
      width: 46rem;
    }
  }
`;

const ImportanceContainer = styled.div<{ $show: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: ${({ $show }) => ($show ? "29rem" : "0")};
  overflow: hidden;
  padding-bottom: 4rem;
  transition: max-height 0.6s;
`;

const MobileButton = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const DesktopButton = styled.div`
  display: flex;

  @media (max-width: 900px) {
    display: none;
  }
`;

interface Props {
  quiz: QuizType | null;
  setQuiz: (quiz: QuizType) => void;
}

const QuizContent = ({ quiz, setQuiz }: Props) => {
  const looksFinished = quiz
    ? (
        quiz.sections.find(
          (section) => section.label.toLowerCase() === "visual"
        )?.questions[0].question as LooksType
      ).rounds === TOTAL_ROUNDS
    : false;

  const getTotalQuestionNumber = (
    sectionIndex: number,
    questionIndex: number
  ) => {
    if (!quiz) return 0;
    return (
      quiz.sections
        .slice(0, sectionIndex)
        .reduce((total, section) => total + section.questions.length, 0) +
      questionIndex +
      1
    );
  };

  return (
    <StyledQuizContent>
      {quiz &&
        quiz.sections[quiz.sectionIndex].questions.map((question, index) => {
          const metadata = getItemMetadata(question.category, question.trait);
          if (!metadata) throw new Error("Item metadata not found");
          const isRating = metadata.type === ItemType.RATING;
          const ratingQuestion = question.question as RatingType;
          const isCheckbox =
            metadata.type === ItemType.STRING ||
            metadata.type === ItemType.LIST;
          const checkboxQuestion = question.question as CheckboxType;
          const isLooksImportance = metadata.type === ItemType.IMPORTANCE;
          const isLooks = !!(question.question as LooksType).dogElos;
          const looksQuestion = question.question as LooksType;

          return (
            <QuestionContainer key={index} $skipped={!!question.skipped}>
              <HeaderContainer $looks={isLooks}>
                <HeaderSection>
                  <IconContainer $small={isLooks}>
                    <Icon src={isLooks ? lightPaw : paw} alt="paw" />
                    {!isLooks && (
                      <Number>
                        {getTotalQuestionNumber(quiz.sectionIndex, index)}
                      </Number>
                    )}
                  </IconContainer>
                  <HeaderTextContainer>
                    <Header>{metadata.question}</Header>
                    {isCheckbox && (
                      <LightHeader>{" (Pick as many as you like)"}</LightHeader>
                    )}
                  </HeaderTextContainer>
                  <Tooltip>{metadata.tooltip}</Tooltip>
                </HeaderSection>
                <MobileButton>
                  <Button
                    tiny
                    sub
                    action={() => {
                      const newQuiz = { ...quiz };
                      newQuiz.sections[quiz.sectionIndex].questions[
                        index
                      ].skipped = !question.skipped;
                      setQuiz(newQuiz);
                    }}
                  >
                    {question.skipped ? "Undo" : "Skip"}
                  </Button>
                </MobileButton>
                <DesktopButton>
                  <Button
                    tiny
                    sub
                    action={() => {
                      const newQuiz = { ...quiz };
                      newQuiz.sections[quiz.sectionIndex].questions[
                        index
                      ].skipped = !question.skipped;
                      setQuiz(newQuiz);
                    }}
                  >
                    {question.skipped ? "Undo skip" : "Skip question"}
                  </Button>
                </DesktopButton>
              </HeaderContainer>
              {(isRating || isLooksImportance) && (
                <Scale
                  min={metadata.questionMin ?? metadata.min!}
                  max={metadata.questionMax ?? metadata.max!}
                  value={ratingQuestion.value}
                  setValue={(value) => {
                    const newQuiz = { ...quiz };
                    (
                      newQuiz.sections[quiz.sectionIndex].questions[index]
                        .question as RatingType
                    ).value = value;
                    setQuiz(newQuiz);
                  }}
                />
              )}

              {isCheckbox && (
                <Checkbox
                  options={checkboxQuestion.options}
                  selected={checkboxQuestion.selected}
                  toggle={(option) => {
                    const newQuiz = { ...quiz };
                    (
                      newQuiz.sections[quiz.sectionIndex].questions[index]
                        .question as CheckboxType
                    ).selected = checkboxQuestion.selected.includes(option)
                      ? checkboxQuestion.selected.filter(
                          (selectedOption) => selectedOption !== option
                        )
                      : [...checkboxQuestion.selected, option];
                    setQuiz(newQuiz);
                  }}
                />
              )}

              {isLooks && (
                <Tournament
                  quiz={quiz}
                  updateElos={(elos: DogElos) => {
                    const newQuiz = { ...quiz };
                    (
                      newQuiz.sections[quiz.sectionIndex].questions[index]
                        .question as LooksType
                    ).dogElos = elos;
                    (
                      newQuiz.sections[quiz.sectionIndex].questions[index]
                        .question as LooksType
                    ).rounds++;
                    setQuiz(newQuiz);
                  }}
                  question={looksQuestion}
                />
              )}

              {!(
                metadata.type === ItemType.IMPORTANCE ||
                metadata.type === ItemType.TOURNAMENT
              ) && (
                <ImportanceContainer
                  $show={
                    (isRating && ratingQuestion.value !== null) ||
                    (isCheckbox && checkboxQuestion.selected.length > 0)
                  }
                >
                  <SubHeaderContainer>
                    <IconContainer $small={false} />
                    <SubHeader>How important is this to you?</SubHeader>
                  </SubHeaderContainer>
                  <Scale
                    min="Not important"
                    max="Very important"
                    value={question.importance}
                    setValue={(value) => {
                      const newQuiz = { ...quiz };
                      newQuiz.sections[quiz.sectionIndex].questions[
                        index
                      ].importance = value;
                      setQuiz(newQuiz);
                    }}
                  />
                </ImportanceContainer>
              )}
            </QuestionContainer>
          );
        })}
      <ButtonContainer>
        {quiz && quiz.sectionIndex > 0 ? (
          <Button
            sub
            action={() => {
              window.scrollTo(0, 0);
              let newQuiz = { ...quiz };
              newQuiz.sectionIndex = quiz.sectionIndex - 1;
              setQuiz(newQuiz);
            }}
          >
            Previous section
          </Button>
        ) : (
          <div />
        )}
        {quiz ? (
          quiz.sectionIndex === quiz.sections.length - 1 ? (
            looksFinished ? (
              <Button
                primary
                sub
                action={() => {
                  let newQuiz = { ...quiz };
                  newQuiz.showResults = true;
                  setQuiz(newQuiz);
                  triggerEvent(COMPLETE_QUIZ_EVENT);
                }}
              >
                Find your dream dog!
              </Button>
            ) : (
              <Button
                sub
                action={() => {
                  let newQuiz = { ...quiz };
                  newQuiz.showResults = true;
                  setQuiz(newQuiz);
                  triggerEvent(COMPLETE_QUIZ_EVENT);
                }}
              >
                Skip visual section
              </Button>
            )
          ) : (
            <Button
              sub
              primary
              action={() => {
                if (!quiz) return;
                window.scrollTo(0, 0);
                let newQuiz = { ...quiz };
                newQuiz.sectionIndex = quiz.sectionIndex + 1;
                setQuiz(newQuiz);
              }}
            >
              Next section
            </Button>
          )
        ) : null}
      </ButtonContainer>
    </StyledQuizContent>
  );
};

export default QuizContent;
