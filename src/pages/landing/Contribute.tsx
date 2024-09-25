import styled from "styled-components";
import { Header3, Paragraph } from "../../styles/Headers";

import Button from "../../components/Button";
import { DONATE } from "../../app/links";
import { SAY_HI_PATH } from "../../app/paths";
import { DONATE_EVENT } from "../../app/trigger-event";

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
        {/* <Header3>Contribute</Header3> */}
        <Header3>Get in touch</Header3>
        {/* <DesktopParagraphs>
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
        </MobileParagraphs> */}
        <DesktopParagraphs>
          <Paragraph style={{ textAlign: "center" }}>
            We'd love to hear from you! If you used dogmatch and have any
            feedback or improvements for us, please get in touch using the
            button below. As a free to use website, we'd really appreciate any
            donations to keep us going too.
          </Paragraph>
        </DesktopParagraphs>
        <MobileParagraphs>
          <Paragraph style={{ textAlign: "center" }}>
            We'd love to hear from you! If you used dogmatch and have any
            feedback or improvements for us, please get in touch using the
            button below.
          </Paragraph>
          <Paragraph style={{ textAlign: "center" }}>
            As a free to use website, we'd really appreciate any donations to
            keep us going too.
          </Paragraph>
        </MobileParagraphs>
        <ButtonContainer>
          <Button primary link={SAY_HI_PATH}>
            Say hi 👋
          </Button>
          <Button link={DONATE} event={DONATE_EVENT}>
            Donate to us
          </Button>
        </ButtonContainer>
      </Content>
    </StyledContribute>
  );
};

export default Contribute;
