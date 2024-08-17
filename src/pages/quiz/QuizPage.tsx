import styled from "styled-components";
import QuizIntro from "./QuizIntro";
import { useEffect, useState } from "react";
import getQuizData, { CheckboxType, QuizType, RatingType } from "./quiz-data";
import useDogs from "../../app/use-dogs";

import paw from "../../assets/stats/paw.svg";
import Scale from "../../components/Scale";
import Checkbox from "../../components/Checkbox";

const StyledQuizPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  width: 100%;
  padding: 5rem;
`;

const QuizContent = styled.div`
  width: 100%;
  max-width: 180rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15rem;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin-bottom: 3rem;
`;

const SubHeaderContainer = styled(HeaderContainer)`
  margin-bottom: 6rem;
  margin-top: 10rem;
`;

const IconContainer = styled.div`
  position: relative;
  width: 12rem;
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

const QuizPage = () => {
  const { dogs } = useDogs();
  const [started, setStarted] = useState(false);
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    setQuiz(getQuizData(dogs));
  }, [dogs]);

  return (
    <StyledQuizPage>
      <QuizContent>
        {quiz &&
          quiz.sections[sectionIndex].questions.map((question, index) => {
            const isRating = !!(question.question as RatingType).min;
            const ratingQuestion = question.question as RatingType;
            const isCheckbox = !!(question.question as CheckboxType).options;
            const checkboxQuestion = question.question as CheckboxType;

            return (
              <QuestionContainer key={index}>
                <HeaderContainer>
                  <IconContainer>
                    <Icon src={paw} alt="paw" />
                    <Number>{index + 1}</Number>
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

                {(isRating || isCheckbox) && (
                  <>
                    <SubHeaderContainer>
                      <IconContainer />
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
      </QuizContent>

      {!started && <QuizIntro start={() => setStarted(true)} />}
    </StyledQuizPage>
  );
};

export default QuizPage;
