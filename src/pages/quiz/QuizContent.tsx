import styled from "styled-components";
import {
  CheckboxType,
  DogElos,
  LooksType,
  QuizType,
  RatingType,
  SectionType,
} from "./quiz-data";

import paw from "../../assets/stats/paw.svg";
import lightPaw from "../../assets/paw.svg";
import paws from "../../assets/paws.svg";
import Scale from "../../components/Scale";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import Tournament, { TOTAL_ROUNDS } from "./Tournament";
import { getItemMetadata, ItemType } from "../../app/item-metadata";
import Tooltip from "../../components/Tooltip";
import triggerEvent, { COMPLETE_QUIZ_EVENT } from "../../app/trigger-event";
import useIsMobile from "../../app/use-is-mobile";

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

const Header = styled.div<{ $center: boolean }>`
  font-size: 3.2rem;
  font-weight: 650;

  @media (max-width: 900px) {
    font-size: 2.8rem;
    text-align: ${({ $center }) => ($center ? "center" : "left")};
    max-width: ${({ $center }) => ($center ? "35rem" : "none")};
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

const PersonBanner = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--sub);
  padding: 2rem 0;
  font-family: "Jost", sans-serif;

  @media (max-width: 900px) {
    font-size: 2.2rem;
    padding: 1rem 0;
  }
`;

const HandoffScreen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 4rem;
  padding: 5rem;
`;

const HandoffPaws = styled.img`
  height: 10rem;

  @media (max-width: 900px) {
    height: 8rem;
  }
`;

const HandoffTitle = styled.div`
  font-size: 4.6rem;
  font-weight: 650;
  text-align: center;
  max-width: 60rem;

  @media (max-width: 900px) {
    font-size: 3.6rem;
  }
`;

const HandoffSubtitle = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  color: var(--sub);
  text-align: center;

  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

interface Props {
  quiz: QuizType | null;
  setQuiz: (quiz: QuizType) => void;
}

const QuizContent = ({ quiz, setQuiz }: Props) => {
  const isMobile = useIsMobile();

  const isCouple = quiz?.mode === "couple";
  const couplePhase = quiz?.couplePhase;
  const visualSectionIndex = quiz ? quiz.sections.length - 1 : 4;

  const activeQuestions: SectionType | null = (() => {
    if (!quiz) return null;
    if (!isCouple) return quiz.sections[quiz.sectionIndex];
    if (couplePhase === "person1") return quiz.sections[quiz.sectionIndex];
    if (couplePhase === "person2" && quiz.person2Sections)
      return quiz.person2Sections[quiz.sectionIndex];
    if (couplePhase === "visual")
      return quiz.sections[visualSectionIndex];
    return quiz.sections[quiz.sectionIndex];
  })();

  const getActiveSections = (): SectionType[] => {
    if (!quiz) return [];
    if (!isCouple) return quiz.sections;
    if (couplePhase === "person2" && quiz.person2Sections)
      return quiz.person2Sections;
    return quiz.sections;
  };

  const setQuestionValue = (
    questionIndex: number,
    field: "question" | "importance" | "skipped",
    value: any
  ) => {
    if (!quiz) return;
    const newQuiz = { ...quiz };
    if (!isCouple || couplePhase === "person1") {
      (newQuiz.sections[quiz.sectionIndex].questions[questionIndex] as any)[
        field
      ] = value;
    } else if (couplePhase === "person2" && newQuiz.person2Sections) {
      (newQuiz.person2Sections[quiz.sectionIndex].questions[questionIndex] as any)[
        field
      ] = value;
    } else if (couplePhase === "visual") {
      (newQuiz.sections[visualSectionIndex].questions[questionIndex] as any)[
        field
      ] = value;
    }
    setQuiz(newQuiz);
  };

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
    const sections = getActiveSections();
    return (
      sections
        .slice(0, sectionIndex)
        .reduce((total, section) => total + section.questions.length, 0) +
      questionIndex +
      1
    );
  };

  const nonVisualSectionCount = quiz ? quiz.sections.length - 1 : 4;
  const isLastNonVisualSection =
    quiz !== null && quiz.sectionIndex === nonVisualSectionCount - 1;

  const isOnVisualSection =
    isCouple && couplePhase === "visual";

  const isOnLastSection =
    !isCouple
      ? quiz !== null && quiz.sectionIndex === quiz.sections.length - 1
      : isOnVisualSection;

  const handleNext = () => {
    if (!quiz) return;
    window.scrollTo(0, 0);

    if (isCouple) {
      if (couplePhase === "person1" && isLastNonVisualSection) {
        const newQuiz = { ...quiz };
        newQuiz.couplePhase = "handoff";
        setQuiz(newQuiz);
        return;
      }
      if (couplePhase === "person2" && isLastNonVisualSection) {
        const newQuiz = { ...quiz };
        newQuiz.couplePhase = "visual";
        newQuiz.sectionIndex = visualSectionIndex;
        setQuiz(newQuiz);
        return;
      }
    }

    const newQuiz = { ...quiz };
    newQuiz.sectionIndex = quiz.sectionIndex + 1;
    setQuiz(newQuiz);
  };

  const handlePrev = () => {
    if (!quiz) return;
    window.scrollTo(0, 0);

    if (isCouple) {
      if (couplePhase === "person2" && quiz.sectionIndex === 0) {
        return;
      }
      if (couplePhase === "visual") {
        const newQuiz = { ...quiz };
        newQuiz.couplePhase = "person2";
        newQuiz.sectionIndex = nonVisualSectionCount - 1;
        setQuiz(newQuiz);
        return;
      }
    }

    const newQuiz = { ...quiz };
    newQuiz.sectionIndex = quiz.sectionIndex - 1;
    setQuiz(newQuiz);
  };

  const handleFinish = () => {
    if (!quiz) return;
    const newQuiz = { ...quiz };
    newQuiz.showResults = true;
    setQuiz(newQuiz);
    triggerEvent(COMPLETE_QUIZ_EVENT);
  };

  const canGoPrev = (() => {
    if (!quiz) return false;
    if (!isCouple) return quiz.sectionIndex > 0;
    if (couplePhase === "person1") return quiz.sectionIndex > 0;
    if (couplePhase === "person2") return quiz.sectionIndex > 0;
    if (couplePhase === "visual") return true;
    return false;
  })();

  if (couplePhase === "handoff" && quiz && isCouple) {
    const name1 = quiz.coupleNames?.[0] || "Person 1";
    const name2 = quiz.coupleNames?.[1] || "Person 2";
    return (
      <HandoffScreen>
        <HandoffPaws src={paws} alt="paw prints" />
        <HandoffTitle>Great job, {name1}!</HandoffTitle>
        <HandoffSubtitle>
          Now pass the device to {name2}
        </HandoffSubtitle>
        <Button
          primary
          wide
          action={() => {
            const newQuiz = { ...quiz };
            newQuiz.couplePhase = "person2";
            newQuiz.sectionIndex = 0;
            setQuiz(newQuiz);
            window.scrollTo(0, 0);
          }}
        >
          {name2} is ready
        </Button>
      </HandoffScreen>
    );
  }

  const personBannerText = (() => {
    if (!isCouple || !quiz?.coupleNames) return null;
    const [n1, n2] = quiz.coupleNames;
    if (couplePhase === "person1") return `${n1}'s turn`;
    if (couplePhase === "person2") return `${n2}'s turn`;
    if (couplePhase === "visual") return `${n1} & ${n2} together`;
    return null;
  })();

  return (
    <StyledQuizContent>
      {personBannerText && <PersonBanner>{personBannerText}</PersonBanner>}
      {quiz &&
        activeQuestions &&
        activeQuestions.questions.map((question, index) => {
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
                    <Header $center={isLooks}>
                      {isMobile
                        ? metadata.mobileQuestion || metadata.question
                        : metadata.question}
                      <Tooltip span>{metadata.tooltip}</Tooltip>
                    </Header>
                    {isCheckbox && (
                      <LightHeader>{" (Pick as many as you like)"}</LightHeader>
                    )}
                  </HeaderTextContainer>
                </HeaderSection>
                {!(metadata.type === ItemType.TOURNAMENT) && (
                  <Button
                    tiny
                    sub
                    action={() => {
                      setQuestionValue(index, "skipped", !question.skipped);
                    }}
                  >
                    {isMobile
                      ? question.skipped
                        ? "(Undo)"
                        : "(Skip)"
                      : question.skipped
                      ? "Undo skip"
                      : "Skip question"}
                  </Button>
                )}
              </HeaderContainer>
              {(isRating || isLooksImportance) && (
                <Scale
                  min={metadata.questionMin ?? metadata.min!}
                  max={metadata.questionMax ?? metadata.max!}
                  value={ratingQuestion.value}
                  setValue={(value) => {
                    const newQuiz = { ...quiz };
                    if (!isCouple || couplePhase === "person1") {
                      (
                        newQuiz.sections[quiz.sectionIndex].questions[index]
                          .question as RatingType
                      ).value = value;
                    } else if (
                      couplePhase === "person2" &&
                      newQuiz.person2Sections
                    ) {
                      (
                        newQuiz.person2Sections[quiz.sectionIndex].questions[
                          index
                        ].question as RatingType
                      ).value = value;
                    } else if (couplePhase === "visual") {
                      (
                        newQuiz.sections[visualSectionIndex].questions[index]
                          .question as RatingType
                      ).value = value;
                    }
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
                    const newSelected = checkboxQuestion.selected.includes(
                      option
                    )
                      ? checkboxQuestion.selected.filter(
                          (selectedOption) => selectedOption !== option
                        )
                      : [...checkboxQuestion.selected, option];

                    if (!isCouple || couplePhase === "person1") {
                      (
                        newQuiz.sections[quiz.sectionIndex].questions[index]
                          .question as CheckboxType
                      ).selected = newSelected;
                    } else if (
                      couplePhase === "person2" &&
                      newQuiz.person2Sections
                    ) {
                      (
                        newQuiz.person2Sections[quiz.sectionIndex].questions[
                          index
                        ].question as CheckboxType
                      ).selected = newSelected;
                    }
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
                      newQuiz.sections[visualSectionIndex].questions[index]
                        .question as LooksType
                    ).dogElos = elos;
                    (
                      newQuiz.sections[visualSectionIndex].questions[index]
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
                      if (!isCouple || couplePhase === "person1") {
                        newQuiz.sections[quiz.sectionIndex].questions[
                          index
                        ].importance = value;
                      } else if (
                        couplePhase === "person2" &&
                        newQuiz.person2Sections
                      ) {
                        newQuiz.person2Sections[quiz.sectionIndex].questions[
                          index
                        ].importance = value;
                      }
                      setQuiz(newQuiz);
                    }}
                  />
                </ImportanceContainer>
              )}
            </QuestionContainer>
          );
        })}
      <ButtonContainer>
        {canGoPrev ? (
          <Button sub action={handlePrev}>
            Previous section
          </Button>
        ) : (
          <div />
        )}
        {quiz ? (
          isOnLastSection ? (
            looksFinished ? (
              <Button primary sub action={handleFinish}>
                Find your dream dog!
              </Button>
            ) : (
              <Button sub action={handleFinish}>
                Skip visual section
              </Button>
            )
          ) : (
            <Button sub primary action={handleNext}>
              Next section
            </Button>
          )
        ) : null}
      </ButtonContainer>
    </StyledQuizContent>
  );
};

export default QuizContent;
