import styled from "styled-components";

const MAX_PER_ROW = 5;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 3rem;
`;

const Row = styled.div`
  display: flex;
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
  width: 25.5rem;
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
  const rows: { option: string; selected: boolean }[][] = [];

  const targetRows = Math.ceil(options.length / MAX_PER_ROW);
  const itemsPerRow = Math.ceil(options.length / targetRows);

  for (let i = 0; i < targetRows; i++) {
    const row = options
      .slice(i * itemsPerRow, (i + 1) * itemsPerRow)
      .map((option) => ({
        option,
        selected: selected.includes(option),
      }));

    rows.push(row);
  }

  return (
    <Container>
      {rows.map((row, index) => (
        <Row key={index}>
          {row.map(({ option, selected }) => (
            <StyledCheckbox
              key={option}
              $selected={selected}
              onClick={() => toggle(option)}
            >
              {option.toLowerCase()}
            </StyledCheckbox>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Checkbox;
