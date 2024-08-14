import styled from "styled-components";
import Tooltip from "./Tooltip";

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
  icon: string;
  label: string;
  value: string;
  tooltip: string;
}

const Stat = ({ icon, label, value, tooltip }: Props) => {
  return (
    <StyledStat>
      <Icon src={icon} alt={`${label} icon`} />
      <Label>{label}:</Label>
      <Value>{value}</Value>
      <Tooltip>{tooltip}</Tooltip>
    </StyledStat>
  );
};

export default Stat;
