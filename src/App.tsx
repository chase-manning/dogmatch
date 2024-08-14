import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/landing/LandingPage";
import { Outlet, Route, Routes } from "react-router-dom";
import { BREEDS_PATH, QUIZ_PATH, SAY_HI_PATH } from "./app/paths";
import SayHiPage from "./pages/say-hi/SayHiPage";
import BreedPage from "./pages/breed/BreedPage";
import ScrollToTop from "./components/ScrollToTop";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100dvh;
`;

const Layout = () => {
  return (
    <StyledApp>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </StyledApp>
  );
};

const App = () => {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />

          {/* TODO */}
          <Route path={QUIZ_PATH} element={<LandingPage />} />

          {/* TODO */}
          <Route path={BREEDS_PATH}>
            <Route index element={<LandingPage />} />
            {/* Sub paths for specific dogs */}
            <Route path=":breed" element={<BreedPage />} />
          </Route>

          <Route path={SAY_HI_PATH} element={<SayHiPage />} />

          {/* TODO */}
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </StyledApp>
  );
};

export default App;
