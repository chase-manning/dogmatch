import styled from "styled-components";
import { DogType } from "./DogContext";
import { BREEDS_PATH } from "../app/paths";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";
import getImageAlt from "../app/image-alt";

const StyledDogPreview = styled(Link)`
  padding: 2rem 3rem;
  border-radius: 3.5rem;
  border: solid 1px var(--main);
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);

  @media (max-width: 900px) {
    box-shadow: none;
    background: none;
    border: none;
    padding: 0;
  }
`;

const Header = styled.div`
  font-size: 2.4rem;
  font-weight: 650;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    white-space: nowrap;
  }
`;

const Image = styled.img`
  width: 30rem;
  height: 30rem;
  border-radius: 2rem;
  background: rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    width: 24rem;
    height: 24rem;
  }
`;

interface Props {
  dog: DogType | null;
}

const DogPreview = ({ dog }: Props) => {
  return (
    <StyledDogPreview to={`/${BREEDS_PATH}/${dog?.id}`}>
      {dog ? (
        <Header>{dog.generalInformation.name}</Header>
      ) : (
        <Header>
          <Skeleton height="2.4rem" width="15rem" />
        </Header>
      )}
      {dog ? (
        <Image
          src={dog.images.small.outdoors}
          alt={getImageAlt(dog, "outdoors")}
        />
      ) : (
        <Skeleton width="30rem" height="30rem" />
      )}
    </StyledDogPreview>
  );
};

export default DogPreview;
