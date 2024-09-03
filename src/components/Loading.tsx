import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

import paws from "../assets/paws.svg";
import paw from "../assets/paw.svg";
import dog from "../assets/dog.svg";
import randBetween from "../app/rand-between";

const PAWS = 9;
const STARTING_OPACITY = 0.4;
const MAX_OPACITY = 0.7;
const MIN_HEIGHT = 0.3;
const MAX_HEIGHT = 0.75;
const MIN_ROTATION = -25;
const MAX_ROTATION = 35;

const StyledLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100dvh - 10rem);
  background: var(--bg);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 3;
  padding: 5rem;

  @media (max-width: 900px) {
    height: calc(100dvh - 8rem);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PawsContainer = styled.div`
  position: relative;
  height: 15rem;
  width: 101rem;
`;

const plop = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`;

const DogIcon = styled.img`
  width: 12.3rem;
  margin-left: 8rem;

  opacity: 0;
  animation: ${plop} 1ms 2500ms forwards;
`;

const PawContainer = styled.div<{
  top: number;
  left: number;
  height: number;
  rotation: number;
  opacity: number;
}>`
  position: absolute;
  top: ${({ top }) => top * 100}%;
  left: ${({ left }) => left * 100}%;
  height: ${({ height }) => height * 100}%;
  transform: rotate(${({ rotation }) => rotation}deg) translateY(-50%);
  opacity: ${({ opacity }) => opacity};
`;

const Paw = styled.img<{
  delay: number;
}>`
  height: 100%;
  opacity: 0;
  animation: ${plop} 1ms ${(props) => props.delay}ms forwards;
`;

const Text = styled.div`
  font-size: 9.6rem;
  font-weight: 700;
  line-height: 1.4;
  margin-top: 3rem;
  width: 100%;
  max-width: 95rem;
  text-align: center;
`;

const Paws = styled.img`
  width: 30rem;
`;

interface Props {
  children: ReactNode;
}

const Loading = ({ children }: Props) => {
  return (
    <StyledLoading>
      <HeaderContainer>
        <PawsContainer>
          {Array.from({ length: PAWS }).map((_, i) => {
            const even = i % 2 === 0;
            return (
              <PawContainer
                key={i}
                top={even ? randBetween(0.1, 0.4) : randBetween(0.6, 0.9)}
                left={i / PAWS}
                height={(MAX_HEIGHT - MIN_HEIGHT) * (i / PAWS) + MIN_HEIGHT}
                rotation={randBetween(MIN_ROTATION, MAX_ROTATION)}
                opacity={
                  STARTING_OPACITY +
                  (MAX_OPACITY - STARTING_OPACITY) * (i / PAWS)
                }
              >
                <Paw
                  src={paw}
                  alt="paw print assets"
                  delay={((3000 - 500) / PAWS) * i}
                />
              </PawContainer>
            );
          })}
        </PawsContainer>
        <DogIcon src={dog} alt="dog icon" />
      </HeaderContainer>
      <Text>{children}</Text>
      <Paws src={paws} alt="paw print assets" />
    </StyledLoading>
  );
};

export default Loading;
