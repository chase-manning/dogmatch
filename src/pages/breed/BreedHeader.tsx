import styled from "styled-components";
import { DogType } from "../../components/DogContext";
import { useEffect, useState } from "react";

import paw from "../../assets/paw.svg";
import arrow from "../../assets/arrow.svg";
import Skeleton from "../../components/Skeleton";
import getImageAlt from "../../app/image-alt";

const IMAGE_SCROLL_INTERVAL = 8000;

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
  overflow: hidden;
  border-radius: 2rem;

  @media (max-width: 900px) {
    height: auto;
    width: calc(100% - 6rem);
    aspect-ratio: 1/1;
  }
`;

const Image = styled.img<{ $left: boolean; $right: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
  background: var(--bg-image);

  transition: transform 0.5s ease-in-out;
  transform: ${(props) =>
    props.$left
      ? "translateX(-100%)"
      : props.$right
      ? "translateX(100%)"
      : "translateX(0)"};

  @media (max-width: 900px) {
    height: auto;
    width: 100%;
    aspect-ratio: 1/1;
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
    display: none;
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
    text-align: center;
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
  z-index: 4;
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
  const [indexes, setIndexes] = useState<{
    movingRight: boolean;
    current: number;
  }>({ movingRight: true, current: 0 });
  const [loopInterval, setLoopInterval] = useState<NodeJS.Timeout | null>(null);

  const nextImage = () => {
    setIndexes((prev) => ({
      movingRight: true,
      current: (prev.current + 1) % imageTypes.length,
    }));
    loopInterval && clearInterval(loopInterval);
  };

  const previousImage = () => {
    setIndexes((prev) => ({
      movingRight: false,
      current: (prev.current - 1 + imageTypes.length) % imageTypes.length,
    }));
    loopInterval && clearInterval(loopInterval);
  };

  useEffect(() => {
    const interval_ = setInterval(() => {
      setIndexes((prev) => ({
        movingRight: true,
        current: (prev.current + 1) % imageTypes.length,
      }));
    }, IMAGE_SCROLL_INTERVAL);
    setLoopInterval(interval_);

    return () => {
      if (interval_) clearInterval(interval_);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {imageTypes.map((imageType, index) => {
                const { movingRight, current } = indexes;
                const isLeft = index === current - 1 || index === current + 2;
                const isRight = index === current + 1 || index === current - 2;
                const isCenter = index === current;
                return (
                  <Image
                    key={imageType}
                    src={dog.images.large[imageType]}
                    alt={getImageAlt(dog, imageType)}
                    $left={isLeft}
                    $right={isRight}
                    style={{
                      zIndex: isCenter
                        ? 3
                        : movingRight
                        ? isLeft
                          ? 2
                          : 1
                        : isRight
                        ? 2
                        : 1,
                    }}
                  />
                );
              })}
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
            <Skeleton width="100%" height="100%" />
          )}
        </ImageContainer>
        <TextContainer>
          <HeaderContainer>
            <Paw src={paw} alt="paw print" />
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
              <Skeleton hideMobile height="2.6rem" width="80rem" />
              <Skeleton hideMobile height="2.6rem" width="50rem" />
            </>
          )}
        </TextContainer>
      </Content>
    </StyledBreedHeader>
  );
};

export default BreedHeader;
