import styled from "styled-components";

import paw from "../../assets/paw.svg";
import Button from "../../components/Button";
import notFound from "../../assets/not-found.jpg";
import Seo from "../../components/Seo";

const StyledNotFound = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 3rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const Image = styled.img`
  width: 30rem;
  border-radius: 50%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 900px) {
    margin: 0 auto;
    gap: 2rem;
  }
`;

const Header = styled.div`
  font-size: 9.6rem;
  font-weight: 650;

  @media (max-width: 900px) {
    font-size: 6.4rem;
  }
`;

const Paw = styled.img`
  width: 9rem;

  @media (max-width: 900px) {
    width: 7.5rem;
  }
`;

const Subheader = styled.div`
  font-size: 4.8rem;
  font-weight: 660;
  line-height: 1.4;
  max-width: 77.5rem;

  @media (max-width: 900px) {
    font-size: 3.2rem;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  width: 48rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const NotFoundPage = () => {
  return (
    <StyledNotFound>
      <Seo title="404 Not Found" description="Page not found" />
      <Content>
        <Image src={notFound} alt="Paw" />
        <TextSection>
          <HeaderContainer>
            <Header>Whoops!</Header>
            <Paw src={paw} alt="Paw" />
          </HeaderContainer>
          <Subheader>
            Looks like the doggos have been chewing the cables again.
          </Subheader>
          <ButtonContainer>
            <Button wide primary link="/">
              Back to dogmatch home
            </Button>
          </ButtonContainer>
        </TextSection>
      </Content>
    </StyledNotFound>
  );
};

export default NotFoundPage;
