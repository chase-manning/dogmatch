import styled from "styled-components";

const StyledLandingPage = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px blue;
`;

const LandingPage = () => {
  return <StyledLandingPage>meow</StyledLandingPage>;
};

export default LandingPage;
