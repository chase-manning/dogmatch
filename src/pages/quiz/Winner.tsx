import styled, { keyframes } from "styled-components";
import { DogType } from "../../components/DogContext";
import DogCard from "../../components/DogCard";

import first from "../../assets/first.svg";
import second from "../../assets/second.svg";
import third from "../../assets/third.svg";
import { DogRatingType } from "../../app/dog-rating";
import { useState } from "react";
import { BREEDS_PATH } from "../../app/paths";

const turnCardAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateY(90deg);
    opacity: 1;
  }
  50.1% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateY(180deg);
    opacity: 0;
  }
`;

const revealCardAnimation = keyframes`
  0% {
    transform: rotateY(180deg);
    opacity: 0;
  }
  50% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  50.1% {
    transform: rotateY(90deg);
    opacity: 1;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1;
  }
`;

const StyledWinner = styled.div`
  display: flex;
  position: relative;
`;

const CardBack = styled.button<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: var(--main);
  border-radius: 3.5rem;
  padding: 2.5rem;
  cursor: pointer;

  transform: rotateY(0deg);
  opacity: 1;

  animation: ${({ $show }) => ($show ? turnCardAnimation : "none")} 0.5s
    forwards;
`;

const WhiteBorder = styled.div`
  width: 100%;
  height: 100%;
  background: var(--bg);
  border-radius: 3rem;
  padding: 1rem;
`;

const GradientBg = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--sub)-50%, #daf0ff);
  border-radius: 2.8rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Icon = styled.img`
  width: 25.42rem;
`;

const ClickToReveal = styled.div`
  font-size: 4.28rem;
  font-weight: 500;
  font-family: "Jost", sans-serif;
  color: var(--sub);
`;

const Match = styled.div`
  font-size: 3.8rem;
  font-weight: 600;
  font-family: "Jost", sans-serif;
  color: var(--main);
`;

const DogCardContainer = styled.div<{ $show: boolean }>`
  position: relative;
  animation: ${({ $show }) => ($show ? revealCardAnimation : "none")} 0.5s
    forwards;
  opacity: 0;
`;

const Rosette = styled.img`
  position: absolute;
  top: -3.8rem;
  right: -3.8rem;
  width: 14rem;
`;

export enum Placement {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
}

interface Props {
  dog: DogType;
  placement: Placement;
  rating: DogRatingType;
}

const Winner = ({ dog, placement, rating }: Props) => {
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);

  const icon =
    placement === Placement.FIRST
      ? first
      : placement === Placement.SECOND
      ? second
      : third;

  return (
    <StyledWinner
      onClick={(e) => {
        if (showing) {
          window.open(`${BREEDS_PATH}/${dog.id}`, "_blank")?.focus();
        } else {
          setShow(true);
          setTimeout(() => {
            setShowing(true);
          }, 500);
        }
      }}
    >
      <DogCardContainer $show={show}>
        <DogCard dog={dog} />
        <Rosette src={icon} alt="rosette" />
      </DogCardContainer>
      <CardBack $show={show}>
        <WhiteBorder>
          <GradientBg>
            <Icon src={icon} alt="placement icon" />
            <ClickToReveal>click to reveal</ClickToReveal>
            <Match>{`${Math.round(rating.percent * 100)}% match`}</Match>
          </GradientBg>
        </WhiteBorder>
      </CardBack>
    </StyledWinner>
  );
};

export default Winner;
