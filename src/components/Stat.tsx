import styled from "styled-components";

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
`;

const Value = styled.div`
  font-size: 2.4rem;
  font-weight: 400;
`;

interface Props {
  icon: string;
  label: string;
  value: string;
}

const Stat = ({ icon, label, value }: Props) => {
  return (
    <StyledStat>
      <Icon src={icon} alt={`${label} icon`} />
      <Label>{label}:</Label>
      <Value>{value}</Value>
    </StyledStat>
  );
};

export default Stat;
