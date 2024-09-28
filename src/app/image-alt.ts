import { DogType } from "../components/DogContext";

const getImageAlt = (dog: DogType, image: string) => {
  const location = (image: string) => {
    if (image === "indoors") return "inside";
    if (image === "outdoors") return "outdoors";
    if (image === "studio") return "in a white studio";
    throw new Error("Image type not found");
  };
  return `A high resolution full body photograph of a ${
    dog.general.name
  } standing ${location(image)}`;
};

export default getImageAlt;
