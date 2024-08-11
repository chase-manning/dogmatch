import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/landing/LandingPage";
import { Outlet, Route, Routes } from "react-router-dom";
import { BREEDS_PATH, QUIZ_PATH } from "./app/paths";

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
          <Route path={BREEDS_PATH} element={<LandingPage />} />

          {/* TODO */}
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </StyledApp>
  );
};

export default App;
