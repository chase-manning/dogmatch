import { useState } from "react";
import styled from "styled-components";

import arrow from "../assets/ui/arrow-dark.svg";

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--light);
  padding: 1.7rem 2.1rem;
  border-radius: 1rem;
`;

const AccordionTitle = styled.div`
  font-family: "Jost", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  font-style: italic;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AccordionIcon = styled.img<{ $isOpen: boolean }>`
  height: 1rem;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface Props {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion = ({ title, children, defaultOpen = false }: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon src={arrow} alt="arrow" $isOpen={isOpen} />
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionContainer>
  );
};

export default Accordion;
