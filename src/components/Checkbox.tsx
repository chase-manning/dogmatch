import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3rem;
`;

const StyledCheckbox = styled.button<{ $selected: boolean }>`
  height: 6.1rem;
  border-radius: 1rem;
  font-size: 3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 21rem;
  font-family: "Jost", sans-serif;

  background: ${(props) => (props.$selected ? "var(--main)" : "var(--bg)")};
  color: ${(props) => (props.$selected ? "var(--bg)" : "var(--main)")};
  box-shadow: ${(props) =>
    props.$selected ? "4px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
  border: solid 1px var(--main);
`;

interface Props {
  options: string[];
  selected: string[];
  toggle: (option: string) => void;
}

const Checkbox = ({ options, selected, toggle }: Props) => {
  return (
    <Container>
      {options.map((option) => (
        <StyledCheckbox
          key={option}
          $selected={selected.includes(option)}
          onClick={() => toggle(option)}
        >
          {option.toLowerCase()}
        </StyledCheckbox>
      ))}
    </Container>
  );
};

export default Checkbox;
