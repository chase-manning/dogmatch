import { createContext, useEffect, useState } from "react";

import meow from "../app/v1.json";

const OPEN_DOG_REGISTRY = "https://registry.dog/api/v1";

export interface DogContextType {
  dogs: DogType[];
  loading: boolean;
  error: string | null;
}

export const DogContext = createContext<DogContextType>({
  dogs: [],
  loading: true,
  error: null,
});

export interface DogType {
  id: string;
  generalInformation: {
    name: string;
    group: string;
    personalityTraits: string[];
    shortDescription: string;
    longDescription: string;
    popularity: number;
    height: number;
    weight: number;
    lifeExpectancy: number;
  };
  physicalCharacteristics: {
    size: number;
    lifespan: number;
    salivationTendency: number;
    coatStyle: string;
    coatTexture: string;
    coatLength: number;
    doubleCoat: boolean;
  };
  behavioralTraits: {
    familyAffectionLevel: number;
    childFriendly: number;
    dogSociability: number;
    friendlinessToStrangers: number;
    playfulnessLevel: number;
    protectiveInstincts: number;
    adaptabilityRating: number;
    vocalizationFrequency: number;
  };
  careRequirements: {
    coatSheddingLevel: number;
    coatGroomingFrequency: number;
    activityLevel: number;
    mentalStimulationRequirements: number;
    trainingEase: number;
  };
  images: {
    small: {
      indoors: string;
      outdoors: string;
      studio: string;
    };
    large: {
      indoors: string;
      outdoors: string;
      studio: string;
    };
  };
}

interface Response {
  status: "success" | "error";
  data: DogType[];
}

interface Props {
  children: React.ReactNode;
}

const DogContextProvider = ({ children }: Props) => {
  const [dogs, setDogs] = useState<DogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        // const response = await fetch(OPEN_DOG_REGISTRY);
        // const data: Response = await response.json();
        setDogs(meow);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  return (
    <DogContext.Provider value={{ dogs, loading, error }}>
      {children}
    </DogContext.Provider>
  );
};

export default DogContextProvider;
