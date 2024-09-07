import styled from "styled-components";
import { DogType } from "../../components/DogContext";
import { useState } from "react";

import paw from "../../assets/paw.svg";
import arrow from "../../assets/arrow.svg";
import Skeleton from "../../components/Skeleton";

const StyledBreedHeader = styled.div`
  width: 100%;
  margin: 16rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-blue);
  padding: 0 5rem;
  height: 33.5rem;

  @media (max-width: 900px) {
    margin: 0 0;
    height: auto;
    background: none;
    padding: 0;
  }
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7rem;
  max-width: 150rem;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    gap: 4rem;
    margin-bottom: 5rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 48rem;
  width: 48rem;

  @media (max-width: 900px) {
    height: auto;
    width: calc(100%-6rem);
  }
`;

const Image = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 2rem;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
  background: var(--bg-image);

  @media (max-width: 900px) {
    height: auto;
    width: 100%;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 900px) {
    width: 100%;
    padding: 2rem;
    background: var(--bg-blue);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
    gap: 1rem;
    margin: auto;
  }
`;

const Paw = styled.img`
  width: 10rem;
  opacity: 0.5;

  @media (max-width: 900px) {
    width: 8rem;
  }
`;

const BreedName = styled.h1`
  font-size: 9.6rem;
  font-weight: 600;
  font-family: "Jost", sans-serif;
  line-height: 1;

  @media (max-width: 900px) {
    font-size: 6rem;
    line-height: 1.1;
  }
`;

const Text = styled.p`
  font-size: 2.4rem;
  font-weight: 500;

  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileText = styled.div`
  display: none;

  @media (max-width: 900px) {
    font-size: 2.2rem;
    padding: 0 3rem;
    text-align: center;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    line-height: 1.5;
  }
`;

const Button = styled.button<{ direction: "left" | "right" }>`
  background: rgba(255, 255, 255, 0.33);
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.direction === "left" ? "0" : "auto")};
  right: ${(props) => (props.direction === "right" ? "0" : "auto")};
  height: 5.7rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled.img<{ direction: "left" | "right" }>`
  height: 3.6rem;
  opacity: 0.5;
  transform: rotate(
    ${(props) => (props.direction === "right" ? "180deg" : "0")}
  );
`;

interface Props {
  dog: DogType | null;
}

const BreedHeader = ({ dog }: Props) => {
  type ImageType = "outdoors" | "indoors" | "studio";
  const imageTypes: ImageType[] = ["outdoors", "indoors", "studio"];
  const [imageTypeIndes, setImageTypeIndex] = useState<number>(0);
  const imageStyle = imageTypes[imageTypeIndes];

  const nextImage = () => {
    setImageTypeIndex((prev) => (prev + 1) % imageTypes.length);
  };

  const previousImage = () => {
    setImageTypeIndex(
      (prev) => (prev - 1 + imageTypes.length) % imageTypes.length
    );
  };

  return (
    <StyledBreedHeader>
      <Content>
        <MobileText>
          {dog ? (
            <>{dog.generalInformation.shortDescription}</>
          ) : (
            <>
              <Skeleton width="40rem" height="2.2rem" />
              <Skeleton width="30rem" height="2.2rem" />
            </>
          )}
        </MobileText>
        <ImageContainer>
          {dog ? (
            <>
              <Image src={dog.images.large[imageStyle]} />
              <Button
                onClick={previousImage}
                direction="left"
                aria-label="Previous image"
              >
                <ButtonIcon src={arrow} direction="left" />
              </Button>
              <Button
                onClick={nextImage}
                direction="right"
                aria-label="Next image"
              >
                <ButtonIcon src={arrow} direction="right" />
              </Button>
            </>
          ) : (
            <Skeleton width="48rem" height="48rem" />
          )}
        </ImageContainer>
        <TextContainer>
          <HeaderContainer>
            <Paw src={paw} />
            {dog ? (
              <BreedName>{dog.generalInformation.name}</BreedName>
            ) : (
              <Skeleton height="9.6rem" width="40rem" />
            )}
          </HeaderContainer>
          {dog ? (
            <Text>{dog.generalInformation.shortDescription}</Text>
          ) : (
            <>
              <Skeleton hideMobile height="2.6rem" width="100rem" />
              <Skeleton hideMobile height="2.6rem" width="50rem" />
            </>
          )}
        </TextContainer>
      </Content>
    </StyledBreedHeader>
  );
};

export default BreedHeader;
