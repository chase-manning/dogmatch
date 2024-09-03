import styled from "styled-components";
import { Header3, Paragraph } from "../../styles/Headers";

import goldenRetriever from "../../assets/golden-retriever.jpg";
import paw from "../../assets/paw.svg";

const StyledAbout = styled.div`
  width: 100%;
  background: var(--bg-blue);
  padding: 10rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    padding: 4rem 4rem;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 140rem;
  gap: 6rem;
`;

const Image = styled.img`
  height: 34rem;
  border-radius: 4rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const HeaderIcon = styled.img`
  width: 5.2rem;
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
`;

// const LearnMore = styled.a`
//   font-size: 2.4rem;
//   font-weight: 600;
//   text-decoration: underline;
//   color: var(--main);
// `;

const About = () => {
  return (
    <StyledAbout>
      <Content>
        <Image src={goldenRetriever} alt="dog" />
        <TextContainer>
          <HeaderContainer>
            <HeaderIcon src={paw} alt="Paw icon" />
            <Header3>About dogmatch</Header3>
          </HeaderContainer>
          <Paragraph>
            Take our dogmatch quiz to find your perfect dog from over 200
            different breeds in our dog directory, chosen especially for you
            based on your answers.
          </Paragraph>
          <Paragraph>
            Dogmatch is completely free to use. It's made by a dedicated dog
            lover who wants to help everyone find their dream dog (and has been
            described as a golden retriever in human form himself).
          </Paragraph>
          {/* TODO */}
          {/* <LearnMore href="/">Learn more</LearnMore> */}
        </TextContainer>
      </Content>
    </StyledAbout>
  );
};

export default About;
