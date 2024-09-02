import styled from "styled-components";

import paws from "../../assets/paws.svg";
import { Link } from "react-router-dom";
import { QUIZ_PATH } from "../../app/paths";

const StyledBreedsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  width: 100%;
  padding: 3rem;
`;

const Paws = styled.img`
  width: 43rem;
  margin-bottom: 1rem;
`;

const Header = styled.h1`
  font-family: "Jost", sans-serif;
  font-size: 9.6rem;
  font-weight: 600;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  text-align: center;
  max-width: 125rem;
  margin-top: 3rem;
  line-height: 1.4;
`;

const StyledLink = styled(Link)`
  font-size: 2.4rem;
  font-weight: 600;
  text-decoration: underline;
  color: var(--main);
`;

const BreedsPage = () => {
  return (
    <StyledBreedsPage>
      <Paws src={paws} />
      <Header>Dog directory</Header>
      <Paragraph>
        Explore our full directory of dog breeds here. Whether you're looking
        for an affectionate companion or a faithful guardian for your home, use
        our filters to find the key characteristics that you're looking for.
      </Paragraph>
      <Paragraph>
        Alternatively, take the{" "}
        <StyledLink to={`/${QUIZ_PATH}`}>dogmatch quiz</StyledLink> to find your
        perfect dog, personalised just for you based on your answers.
      </Paragraph>
    </StyledBreedsPage>
  );
};

export default BreedsPage;
