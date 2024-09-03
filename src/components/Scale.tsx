import styled from "styled-components";

const StyledScale = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  width: calc(100% - 50rem);
  margin-bottom: 4rem;

  @media (max-width: 900px) {
    width: calc(100% - 4rem);
  }
`;

const Line = styled.div<{ $active: boolean }>`
  flex: 1;
  height: 1rem;
  background: var(--main);

  opacity: ${(props) => (props.$active ? 1 : 0.5)};

  @media (max-width: 900px) {
    height: 0.8rem;
  }
`;

const Dot = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: solid 3px var(--main);
  background: var(--bg);
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    width: 3.2rem;
    height: 3.2rem;
    border: solid 2px var(--main);
  }
`;

const SelectionIndicator = styled.div<{ $active: boolean }>`
  height: 1.6rem;
  width: 1.6rem;
  background: var(--main);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;

  display: ${(props) => (props.$active ? "block" : "none")};
`;

const Label = styled.div`
  position: absolute;
  top: calc(100% + 3rem);
  transform: translateY(-50%);
  font-size: 2rem;
  font-weight: 400;
  color: var(--main);

  @media (max-width: 900px) {
    font-size: 1.8rem;
  }
`;

const Min = styled(Label)`
  left: 0;
  transform: translateX(-50%);

  @media (max-width: 900px) {
    transform: translateX(-1.6rem);
  }
`;

const Max = styled(Label)`
  right: 0;
  transform: translateX(50%);

  @media (max-width: 900px) {
    transform: translateX(1.6rem);
  }
`;

interface Props {
  min: string;
  max: string;
  value: number | null;
  setValue: (value: number) => void;
}

const Scale = ({ min, max, value, setValue }: Props) => {
  return (
    <StyledScale>
      {[1, 2, 3, 4].map((id) => (
        <Line key={id} $active={!!value && value >= id + 1} />
      ))}
      {[1, 2, 3, 4, 5].map((id, index) => (
        <Dot
          key={id}
          onClick={() => setValue(id)}
          style={{ left: `${(index / 4) * 100}%` }}
        >
          <SelectionIndicator $active={!!value && value === id} />
        </Dot>
      ))}
      <Min>{min}</Min>
      <Max>{max}</Max>
    </StyledScale>
  );
};

export default Scale;
