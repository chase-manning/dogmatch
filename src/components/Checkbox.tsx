import styled from "styled-components";
import useIsMobile from "../app/use-is-mobile";

const MAX_PER_ROW = 5;
const MOBILE_MAX_PER_ROW = 2;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 3rem;

  @media (max-width: 900px) {
    gap: 2rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 900px) {
    gap: 2rem;
  }
`;

const StyledCheckbox = styled.button<{ $selected: boolean; $hasImage: boolean }>`
  height: ${(props) => (props.$hasImage ? "auto" : "6.1rem")};
  padding: ${(props) => (props.$hasImage ? "1.5rem" : "0")};
  border-radius: 1rem;
  font-size: 3rem;
  font-weight: 600;
  display: flex;
  flex-direction: ${(props) => (props.$hasImage ? "column" : "row")};
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.$hasImage ? "1rem" : "0")};
  cursor: pointer;
  width: 25.5rem;
  font-family: "Jost", sans-serif;

  background: ${(props) => (props.$selected ? "var(--main)" : "var(--bg)")};
  color: ${(props) => (props.$selected ? "var(--bg)" : "var(--main)")};
  box-shadow: ${(props) =>
    props.$selected ? "4px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
  border: solid 1px var(--main);

  @media (max-width: 900px) {
    font-size: 2.8rem;
    height: ${(props) => (props.$hasImage ? "auto" : "5.5rem")};
    width: 23rem;
    padding: ${(props) => (props.$hasImage ? "1rem" : "0")};
  }
`;

const OptionImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.6rem;
  display: block;
`;

interface Props {
  options: string[];
  selected: string[];
  toggle: (option: string) => void;
  images?: Record<string, string>;
}

const Checkbox = ({ options, selected, toggle, images }: Props) => {
  const isMobile = useIsMobile();

  const rows: { option: string; selected: boolean }[][] = [];

  const maxPerRow = isMobile ? MOBILE_MAX_PER_ROW : MAX_PER_ROW;

  const targetRows = Math.ceil(options.length / maxPerRow);
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
          {row.map(({ option, selected }) => {
            const image = images?.[option];
            return (
              <StyledCheckbox
                key={option}
                $selected={selected}
                $hasImage={!!image}
                onClick={() => toggle(option)}
              >
                {image && <OptionImage src={image} alt={option} />}
                {option.toLowerCase()}
              </StyledCheckbox>
            );
          })}
        </Row>
      ))}
    </Container>
  );
};

export default Checkbox;
