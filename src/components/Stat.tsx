import styled from "styled-components";
import Tooltip from "./Tooltip";
import { getItemMetadata } from "../app/item-metadata";

const StyledStat = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 2.2rem;
  margin-right: 1.5rem;
`;

const Label = styled.div`
  font-size: 2.4rem;
  font-weight: 650;
  margin-right: 0.4rem;
  white-space: nowrap;
`;

const Value = styled.div`
  font-size: 2.4rem;
  font-weight: 400;
`;

interface Props {
  category: string;
  trait: string;
  icon: string;
  value: string;
}

const Stat = ({ category, trait, icon, value }: Props) => {
  const metadata = getItemMetadata(category, trait);
  if (!metadata) throw new Error("metadata not found");

  return (
    <StyledStat>
      <Icon src={icon} alt={`${metadata.label} icon`} />
      <Label>{metadata.label}:</Label>
      <Value>{value}</Value>
      <Tooltip>{metadata.tooltip}</Tooltip>
    </StyledStat>
  );
};

export default Stat;
