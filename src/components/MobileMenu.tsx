import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavItemType } from "./Header";
import {
  PRIVACY_POLICY_PATH,
  SAY_HI_PATH,
  TERMS_AND_CONDITIONS_PATH,
} from "../app/paths";

const MOBILE_NAV_ITEMS: NavItemType[] = [
  {
    label: "say hi",
    path: SAY_HI_PATH,
  },
  {
    label: "privacy policy",
    path: PRIVACY_POLICY_PATH,
  },
  {
    label: "terms and conditions",
    path: TERMS_AND_CONDITIONS_PATH,
  },
];

const StyledMobileMenu = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
`;

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem;
  gap: 0.7rem;
`;

const HamburgerLine = styled.div`
  width: 4.2rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--sub);
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  background: var(--light);
  z-index: 3;
  padding: 1.8rem 3.2rem;
  border-radius: 3rem;
  border-top-right-radius: 0;
`;

const NavItem = styled(Link)`
  font-size: 2.1rem;
  font-weight: 550;
  color: var(--main);
  height: 6rem;
  display: flex;
  align-items: center;
`;

const DropShadow = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  backdrop-filter: blur(4px);
  cursor: pointer;
  z-index: 3;
`;

interface Props {
  headerNavItems: NavItemType[];
}

const MobileMenu = ({ headerNavItems }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledMobileMenu>
      <HamburgerButton onClick={() => setIsOpen(!isOpen)}>
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </HamburgerButton>
      {isOpen && (
        <>
          <DropShadow onClick={() => setIsOpen(false)} />
          <MenuContainer>
            {[...headerNavItems, ...MOBILE_NAV_ITEMS].map((item) => (
              <NavItem
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavItem>
            ))}
          </MenuContainer>
        </>
      )}
    </StyledMobileMenu>
  );
};

export default MobileMenu;
