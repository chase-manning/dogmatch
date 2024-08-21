import styled from "styled-components";
import Button from "../../components/Button";

import paws from "../../assets/paws.svg";

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
`;

const PawPrints = styled.img`
  height: 13.1rem;
`;

const Header = styled.h1`
  font-size: 9.6rem;
  font-weight: 650;
  width: 100%;
  max-width: 105rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 40rem;
`;

interface Props {
  start: () => void;
}

const QuizIntro = ({ start }: Props) => {
  return (
    <StyledQuizIntro>
      <PawPrints src={paws} alt="paw print assets" />
      <Header>Which dog is your perfect match?</Header>
      <ButtonContainer>
        <Button wide primary action={start}>
          Start the dogmatch quiz now
        </Button>
      </ButtonContainer>
      <div />
      <div />
    </StyledQuizIntro>
  );
};

export default QuizIntro;
