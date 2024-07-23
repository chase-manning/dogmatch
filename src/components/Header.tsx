import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px red;
`;

const Header = () => {
  return <StyledHeader>meow</StyledHeader>;
};

export default Header;
