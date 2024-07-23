import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/landing/LandingPage";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100dvh;
  border: solid 1px green;
`;

const App = () => {
  return (
    <StyledApp>
      <Header />
      <LandingPage />
      <Footer />
    </StyledApp>
  );
};

export default App;
