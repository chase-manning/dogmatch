import styled from "styled-components";

import pawIcon from "../assets/paw.svg";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";

interface NavItemType {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItemType[] = [
  {
    label: "dogmatch quiz",
    path: "quiz",
  },
  {
    label: "all dogs",
    path: "breeds",
  },
];

const StyledHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
`;

const HeaderBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: calc(100% - 8rem);
  transform: translateX(-50%);
  border-bottom: solid 1px var(--sub);
`;

const LogoContainer = styled(Link)`
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

const NavItems = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 10rem;
`;

const NavItem = styled(Link)`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--main);
`;

const Header = () => {
  const [searchValue, setSearchValue] = useState(""); // TODO

  return (
    <StyledHeader>
      <LogoContainer to="/">
        <Paw src={pawIcon} alt="paw" />
        <DogMatch>dogmatch</DogMatch>
      </LogoContainer>

      <NavItems>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} to={item.path}>
            {item.label}
          </NavItem>
        ))}
      </NavItems>

      <Search
        value={searchValue}
        setValue={setSearchValue}
        placeholder="search"
        width="27.5rem"
      />
      <HeaderBorder />
    </StyledHeader>
  );
};

export default Header;
