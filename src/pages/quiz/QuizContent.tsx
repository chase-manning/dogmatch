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
import Tournament from "./Tournament";

const StyledQuizContent = styled.div`
  padding: 10rem;
  width: 100%;
  max-width: 180rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rem;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeaderContainer = styled.div<{ $looks?: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: ${({ $looks }) => ($looks ? "auto" : "100%")};
  margin-bottom: 3rem;
`;

const SubHeaderContainer = styled(HeaderContainer)`
  margin-bottom: 6rem;
  margin-top: 10rem;
`;

const IconContainer = styled.div<{ $small: boolean }>`
  position: relative;
  width: 12rem;
  width: ${({ $small }) => ($small ? "10rem" : "12rem")};
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

const Header = styled.div`
  font-size: 3.2rem;
  font-weight: 650;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6rem;

  button {
    width: 46rem;
  }
`;

interface Props {
  quiz: QuizType | null;
  setShowResults: (showResults: boolean) => void;
  setQuiz: (quiz: QuizType) => void;
  sectionIndex: number;
  setSectionIndex: (sectionIndex: number) => void;
}

const QuizContent = ({
  quiz,
  setShowResults,
  setQuiz,
  sectionIndex,
  setSectionIndex,
}: Props) => {
  return (
    <StyledQuizContent>
      {quiz &&
        quiz.sections[sectionIndex].questions.map((question, index) => {
          const isRating = !!(question.question as RatingType).min;
          const ratingQuestion = question.question as RatingType;
          const isCheckbox = !!(question.question as CheckboxType).options;
          const checkboxQuestion = question.question as CheckboxType;
          const isLooks = !!(question.question as LooksType).dogElos;
          const looksQuestion = question.question as LooksType;

          return (
            <QuestionContainer key={index}>
              <HeaderContainer $looks={isLooks}>
                <IconContainer $small={isLooks}>
                  <Icon src={isLooks ? lightPaw : paw} alt="paw" />
                  {!isLooks && <Number>{index + 1}</Number>}
                </IconContainer>
                <Header>{question.label}</Header>
              </HeaderContainer>
              {isRating && (
                <Scale
                  min={ratingQuestion.min}
                  max={ratingQuestion.max}
                  value={ratingQuestion.value}
                  setValue={(value) => {
                    const newQuiz = { ...quiz };
                    (
                      newQuiz.sections[sectionIndex].questions[index]
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
                      newQuiz.sections[sectionIndex].questions[index]
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
                      newQuiz.sections[sectionIndex].questions[index]
                        .question as LooksType
                    ).dogElos = elos;
                    (
                      newQuiz.sections[sectionIndex].questions[index]
                        .question as LooksType
                    ).rounds++;
                    setQuiz(newQuiz);
                  }}
                  question={looksQuestion}
                />
              )}

              {!question.looks && (
                <>
                  <SubHeaderContainer>
                    <IconContainer $small={false} />
                    <Header>How important is this to you?</Header>
                  </SubHeaderContainer>
                  <Scale
                    min="Not important"
                    max="Very important"
                    value={question.importance}
                    setValue={(value) => {
                      const newQuiz = { ...quiz };
                      newQuiz.sections[sectionIndex].questions[
                        index
                      ].importance = value;
                      setQuiz(newQuiz);
                    }}
                  />
                </>
              )}
            </QuestionContainer>
          );
        })}
      <ButtonContainer>
        {sectionIndex > 0 ? (
          <Button
            action={() => {
              window.scrollTo(0, 0);
              setSectionIndex(sectionIndex - 1);
            }}
          >
            {`Previous section: ${quiz?.sections[sectionIndex - 1].label}`}
          </Button>
        ) : (
          <div />
        )}
        {quiz && sectionIndex === quiz.sections.length - 1 ? (
          <Button primary action={() => setShowResults(true)}>
            Find my dream dog!
          </Button>
        ) : (
          <Button
            primary
            action={() => {
              window.scrollTo(0, 0);
              setSectionIndex(sectionIndex + 1);
            }}
          >{`Next section: ${quiz?.sections[sectionIndex + 1].label}`}</Button>
        )}
      </ButtonContainer>
    </StyledQuizContent>
  );
};

export default QuizContent;
