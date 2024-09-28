import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { DogType } from "./DogContext";
import DogCard from "./DogCard";

const StyledTest = styled.div<{
  $isSelected: boolean;
  $dogCount: number;
  $index: number;
}>`
  height: 1.8rem;
  width: 1.8rem;
  background: ${({ $isSelected }) =>
    $isSelected ? "var(--sub)" : "var(--bg)"};
  border: solid 0.3rem var(--sub);
  border-radius: 50%;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(
    calc(
      -50% + ${({ $dogCount, $index }) => {
          const odd = $dogCount % 2 === 1;
          const middle = Math.floor($dogCount / 2);
          const distance = $index - middle;
          return distance * (1.8 + 1.2) + (odd ? 0 : 1.8);
        }}rem
    ),
    -4.5rem
  );
`;

interface Props {
  dogs: (DogType | null)[];
}

const DogCarousel = ({ dogs }: Props) => {
  return (
    <Carousel
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      showArrows={false}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        return (
          <StyledTest
            onClick={onClickHandler}
            $isSelected={isSelected}
            $dogCount={dogs.length}
            $index={index}
          />
        );
      }}
    >
      {dogs.map((dog, index) => (
        <DogCard padding key={index} dog={dog} />
      ))}
    </Carousel>
  );
};

export default DogCarousel;
