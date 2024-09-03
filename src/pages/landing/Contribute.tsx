import styled from "styled-components";
import { Header3, Paragraph } from "../../styles/Headers";

import Button from "../../components/Button";
import { DONATE, OPEN_DOG_REGISTRY } from "../../app/links";

const StyledContribute = styled.div`
  width: 100%;
  padding: 10rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    padding: 4rem 3rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 95rem;
  gap: 3rem;
  align-items: center;
`;

const MobileParagraphs = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    width: 100%;
  }
`;

const DesktopParagraphs = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 900px) {
    margin-top: 1rem;
    gap: 2rem;
  }
`;

const Contribute = () => {
  return (
    <StyledContribute>
      <Content>
        <Header3>Contribute</Header3>
        <DesktopParagraphs>
          <Paragraph style={{ textAlign: "center" }}>
            If you found your perfect dog on dogmatch and want to help keep us
            going, consider donating today. We also created a free API for our
            dog directory in case you want to make your own dog-related website!
          </Paragraph>
        </DesktopParagraphs>
        <MobileParagraphs>
          <Paragraph style={{ textAlign: "center" }}>
            If you found your perfect dog on dogmatch and want to help keep us
            going, consider donating today.
          </Paragraph>
          <Paragraph style={{ textAlign: "center" }}>
            We also created a free API for our dog directory in case you want to
            make your own dog-related website!
          </Paragraph>
          <Paragraph style={{ textAlign: "center" }}></Paragraph>
        </MobileParagraphs>
        <ButtonContainer>
          <Button primary link={DONATE}>
            Donate to us
          </Button>
          <Button link={OPEN_DOG_REGISTRY}>View API</Button>
        </ButtonContainer>
      </Content>
    </StyledContribute>
  );
};

export default Contribute;
