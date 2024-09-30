import { DogType } from "./DogContext";
import DogCard from "./DogCard";
import Carousel from "./Carousel";

interface Props {
  dogs: (DogType | null)[];
}

const DogCarousel = ({ dogs }: Props) => {
  return (
    <Carousel>
      {dogs.map((dog, index) => (
        <DogCard padding key={index} dog={dog} />
      ))}
    </Carousel>
  );
};

export default DogCarousel;
