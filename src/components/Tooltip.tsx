import styled from "styled-components";

import tooltip from "../assets/tooltip.svg";
import { useRef, useState } from "react";

const TooltipContent = styled.div<{ $top: number }>`
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40rem;
  padding: 1rem;
  background: var(--bg);
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1;
  font-size: 1.6rem;
  font-weight: 500;
  border: solid 1px var(--sub);

  @media (max-width: 900px) {
    position: fixed;
    top: calc(${({ $top }) => `${$top}px`} + 2.5rem);
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StyledTooltip = styled.div`
  position: relative;
  margin-left: 0.8rem;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${TooltipContent} {
      display: block;
    }
  }
`;

const Icon = styled.img`
  height: 2rem;
`;

interface Props {
  children: React.ReactNode;
}

const Tooltip = ({ children }: Props) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipTop, setTooltipTop] = useState(0);

  return (
    <StyledTooltip
      ref={tooltipRef}
      onClick={() => {
        const offsetTop = tooltipRef?.current?.offsetTop || 0;
        const pixelsFromTop = offsetTop - window.scrollY;
        setTooltipTop(pixelsFromTop);
      }}
    >
      <Icon src={tooltip} alt="tooltip" />
      <TooltipContent $top={tooltipTop}>{children}</TooltipContent>
    </StyledTooltip>
  );
};

export default Tooltip;
