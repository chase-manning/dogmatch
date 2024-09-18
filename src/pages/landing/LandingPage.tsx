import styled from "styled-components";
import Hero from "./Hero";
import WeeklyDogs from "./WeeklyDogs";
import About from "./About";
import Contribute from "./Contribute";
import Seo from "../../components/Seo";

const StyledLandingPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = () => {
  return (
    <StyledLandingPage>
      <Seo
        title="dogmatch"
        description="The best way to find your dream dog!"
      />
      <Hero />
      <WeeklyDogs />
      <About />
      <Contribute />
    </StyledLandingPage>
  );
};

export default LandingPage;
