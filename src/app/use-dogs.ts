import { useContext } from "react";
import { DogContext, DogContextType } from "../components/DogContext";

const useDogs = (): DogContextType => {
  return useContext(DogContext);
};

export default useDogs;
