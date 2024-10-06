import styled from "styled-components";

const StyledCheckboxFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 1.3rem;
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;

interface Props {
  options: string[];
  selected: string[];
  toggleSelected: (option: string) => void;
}

const CheckboxFilter = ({ options, selected, toggleSelected }: Props) => {
  return (
    <StyledCheckboxFilter>
      {options.map((option: string) => (
        <Row key={option}>
          <Checkbox
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggleSelected(option)}
          />
          <Label>{option}</Label>
        </Row>
      ))}
    </StyledCheckboxFilter>
  );
};

export default CheckboxFilter;
