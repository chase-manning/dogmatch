import { createContext, useEffect, useState } from "react";

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
  general: {
    name: string;
    group: string;
    personalityTraits: string[];
    shortDescription: string;
    longDescription: string;
    popularity: number;
    height: number;
    weight: number;
    lifespan: number;
  };
  physical: {
    size: number;
    lifespan: number;
    droolingFrequency: number;
    coatStyle: string;
    coatTexture: string;
    coatLength: number;
    doubleCoat: boolean;
  };
  behavior: {
    familyAffection: number;
    childFriendly: number;
    dogSociability: number;
    friendlinessToStrangers: number;
    playfulness: number;
    protectiveInstincts: number;
    adaptability: number;
    barkingFrequency: number;
  };
  care: {
    sheddingAmount: number;
    groomingFrequency: number;
    exerciseNeeds: number;
    mentalStimulationNeeds: number;
    trainingDifficulty: number;
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
        const response = await fetch(OPEN_DOG_REGISTRY);
        const data: Response = await response.json();
        setDogs(data.data);
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
