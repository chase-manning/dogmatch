import styled from "styled-components";
import ITEM_METADATA, { ItemType } from "../app/item-metadata";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-bottom: 0.7rem;
`;

const Header = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0.6rem;
  border-radius: 0.3rem;
  background: #c6e6fb;
`;

const Slider = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;

  -moz-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -moz-appearance: none;
    appearance: none;
    width: 1.3rem;
    height: 1.3rem;
    background: var(--bg);
    cursor: pointer;
    border-radius: 50%;
    border: 0.3rem solid var(--sub);
    transform: translateY(-0.2rem);
    z-index: 1;
  }

  &::-moz-range-thumb {
    width: 1.3rem;
    height: 1.3rem;
    background: var(--bg);
    cursor: pointer;
    border-radius: 50%;
    border: 0.3rem solid var(--sub);
    z-index: 1;
  }

  &::-ms-thumb {
    width: 1.3rem;
    height: 1.3rem;
    background: var(--bg);
    cursor: pointer;
    border-radius: 50%;
    border: 0.3rem solid var(--sub);
    z-index: 1;
  }
`;

const Active = styled.div<{ $start: number; $end: number }>`
  position: absolute;
  top: 0;
  left: ${({ $start }) => $start}%;
  width: ${({ $end, $start }) => $end - $start}%;
  height: 0.6rem;
  border-radius: 0.3rem;
  background: #c6e6fb;
  background: var(--bg);
  border: 1px solid var(--sub);
`;

const HoverHandler = styled.div<{ $stage: number }>`
  position: absolute;
  top: 0.3rem;
  left: calc(${({ $stage }) => (($stage - 1) / 4) * 93.7}% + 0.65rem);
  transform: translate(-50%, -50%);
  height: 2rem;
  width: 2rem;
`;

interface Props {
  category: string;
  trait: string;
  min: number;
  max: number;
  setMin: (min: number) => void;
  setMax: (max: number) => void;
}

const SliderFilter = ({ category, trait, min, max, setMin, setMax }: Props) => {
  const [left, setLeft] = useState(true);

  const metadata = ITEM_METADATA[category][trait];

  if (!metadata) return null;
  if (metadata.type !== ItemType.RATING) return null;

  return (
    <Container>
      <Header>{metadata.label}</Header>
      <SliderContainer>
        <Active $start={((min - 1) / 4) * 100} $end={((max - 1) / 4) * 100} />
        <Slider
          value={min}
          type="range"
          min={1}
          max={5}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > max) return;
            setMin(value);
          }}
          style={{
            zIndex: left ? 10 : 0,
          }}
        />
        <Slider
          type="range"
          value={max}
          min={1}
          max={5}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value < min) return;
            setMax(value);
          }}
          style={{
            zIndex: left ? 0 : 10,
          }}
        />
        {min !== max && (
          <>
            <HoverHandler
              $stage={min}
              onMouseMove={() => setLeft(true)}
              style={{
                zIndex: left ? 0 : 11,
              }}
            />
            <HoverHandler
              $stage={max}
              onMouseMove={() => setLeft(false)}
              style={{
                zIndex: left ? 11 : 0,
              }}
            />
          </>
        )}
      </SliderContainer>
    </Container>
  );
};

export default SliderFilter;
