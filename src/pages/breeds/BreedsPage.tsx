import styled from "styled-components";

import paws from "../../assets/paws.svg";

const StyledBreedsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  width: 100%;
`;

const Paws = styled.img`
  width: 43rem;
`;

const BreedsPage = () => {
  return (
    <StyledBreedsPage>
      <Paws src={paws} />
    </StyledBreedsPage>
  );
};

export default BreedsPage;
