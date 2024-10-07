import styled from "styled-components";

import arrowDown from "../assets/ui/arrow.svg";
import { useState } from "react";

const Container = styled.div`
  position: relative;
`;

const StyledDropdown = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: solid 1px var(--sub);
  border-radius: 1rem;
  padding: 0 2.85rem;
  height: 6rem;
  width: 40rem;
`;

const Label = styled.div`
  font-size: 2.4rem;
  font-weight: 400;
  color: var(--sub);
  flex: 1;
  text-align: left;
`;

interface ArrowProps {
  $rotate: boolean;
}

const Arrow = styled.img<ArrowProps>`
  height: 1.5rem;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $rotate }) => ($rotate ? "rotate(180deg)" : "rotate(0deg)")};
`;

const Options = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  width: 100%;
  background-color: var(--white);
  border: solid 1px var(--sub);
  border-radius: 1rem;
  background: var(--bg);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Option = styled.button`
  padding: 0 2.85rem;
  cursor: pointer;
  width: 100%;
  height: 6rem;

  &:hover {
    background: var(--light);
  }
`;

interface Props {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const Dropdown = ({ options, selectedOption, setSelectedOption }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <StyledDropdown onClick={() => setIsOpen(!isOpen)}>
        <Label>{selectedOption}</Label>
        <Arrow src={arrowDown} $rotate={isOpen} />
      </StyledDropdown>
      {isOpen && (
        <Options>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              <Label>{option}</Label>
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default Dropdown;
