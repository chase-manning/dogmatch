import styled from "styled-components";

import pawIcon from "../assets/paw.svg";
import { Link } from "react-router-dom";

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
`;

const Paw = styled.img`
  width: 3.6rem;
  color: pink;
  fill: red;
  margin-right: 0.7rem;
`;

const DogMatch = styled.div`
  font-size: 4rem;
  font-weight: 500;
  color: var(--sub);
  font-family: "Jost", sans-serif;
`;

const Logo = () => {
  return (
    <StyledLogo to="/">
      <Paw src={pawIcon} alt="paw" />
      <DogMatch>dogmatch</DogMatch>
    </StyledLogo>
  );
};

export default Logo;
