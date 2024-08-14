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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 95rem;
  gap: 3rem;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4rem;
  margin-top: 3rem;
`;

const Contribute = () => {
  return (
    <StyledContribute>
      <Content>
        <Header3>Contribute</Header3>
        <Paragraph style={{ textAlign: "center" }}>
          If you found your perfect dog on dogmatch and want to help keep us
          going, consider donating today. We also created a free API for our dog
          directory in case you want to make your own dog-related website!
        </Paragraph>
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
