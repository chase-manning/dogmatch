export enum ItemType {
  RATING,
  STRING,
  LIST,
  NUMBER,
  BOOLEAN,
  IMPORTANCE,
  TOURNAMENT,
}

interface Metadata {
  type: ItemType;
  label: string;
  question?: string;
  min?: string;
  max?: string;
  tooltip: string;
}

const ITEM_METADATA: Record<string, Record<string, Metadata>> = {
  custom: {
    looksImportance: {
      type: ItemType.IMPORTANCE,
      label: "Looks Importance",
      question: "How important to you is how the dog looks?",
      min: "Looks don't matter",
      max: "Looks are very important",
      tooltip:
        "How important the look of the dog is to you, relative to other characteristics (e.g. behavioral traits, care requirements etc).",
    },
    looks: {
      type: ItemType.TOURNAMENT,
      label: "Dog Looks",
      question: "Which dog do you like the look of the most?",
      tooltip:
        "Starting with your favorite, click the dog you like the look of the most. Keep clicking your next favorite until all the dogs have gone, then a new round will start.",
    },
  },
  generalInformation: {
    name: {
      type: ItemType.STRING,
      label: "Breed",
      tooltip:
        "Breed of the dog, which refers to the specific genetic lineage or type of dog (e.g. Labrador Retriever, German Shepherd, Beagle, etc).",
    },
    group: {
      type: ItemType.STRING,
      label: "Group",
      tooltip:
        "Category of dog based on its purpose or characteristics (e.g. Terrier, Working, Companion, etc).",
    },
    personalityTraits: {
      type: ItemType.LIST,
      label: "Key Personality Traits",
      question: "Which personality traits are most important to you in a dog?",
      tooltip: `Three key words that highlight the core personality traits of the dog, such as "Faithful," "Sociable," or "Playful." These traits help to give an overview of the dog's temperament and behavior.`,
    },
    shortDescription: {
      type: ItemType.STRING,
      label: "Short Description",
      tooltip: "This section provides a general overview about the dog.",
    },
    longDescription: {
      type: ItemType.STRING,
      label: "Long Description",
      tooltip:
        "This section provides general information about the dog, including its background, personality traits, and any other relevant details.",
    },
    popularity: {
      type: ItemType.RATING,
      label: "Popularity",
      min: "Rare",
      max: "Very popular",
      question:
        "How well-known and commonplace do you want your dog breed to be?",
      tooltip:
        "Popularity of the breed, reflecting how well-known it is, how common it is as a pet, and how easy it is to find.",
    },
    height: {
      type: ItemType.NUMBER,
      label: "Height",
      tooltip: "Average height of the dog in inches.",
    },
    weight: {
      type: ItemType.NUMBER,
      label: "Weight",
      tooltip:
        "Average weight of the dog in pounds. Also indicates size and build, giving an idea of how heavy this breed is.",
    },
    lifeExpectancy: {
      type: ItemType.NUMBER,
      label: "Lifespan",
      tooltip: "Average number of years a dog will live.",
    },
  },
  physicalCharacteristics: {
    size: {
      type: ItemType.RATING,
      label: "Size",
      question: "What size of dog are you looking for?",
      min: "Small",
      max: "Big",
      tooltip: "A dog's relative size compared to other breeds.",
    },
    lifespan: {
      type: ItemType.RATING,
      label: "Lifespan",
      question: "What lifespan do you want for your dog?",
      min: "Short (7 yrs)",
      max: "Long (17 yrs)",
      tooltip: "How long a dog is likely to live compared to other dogs.",
    },
    salivationTendency: {
      type: ItemType.RATING,
      label: "Salivation Tendency",
      question: "Do you mind a dog that drools?",
      min: "Prefer dry",
      max: "Don't mind drool",
      tooltip:
        "How likely a breed is to drool. Breeds with high salivation may leave drool on clothes and furniture.",
    },
    coatStyle: {
      type: ItemType.STRING,
      label: "Coat Style",
      question: "What type of coat style do you prefer?",
      tooltip:
        "Texture and appearance of a dog's coat (wavy, wiry, curly, hairless or straight).",
    },
    coatTexture: {
      type: ItemType.STRING,
      label: "Coat Texture",
      question: "What texture do you prefer for your dog's coat?",
      tooltip: "Texture of a dog's coat (rough, silky or smooth).",
    },
    coatLength: {
      type: ItemType.RATING,
      label: "Coat Length",
      question: "How long would you prefer the dog's coat to be?",
      min: "Short",
      max: "Long",
      tooltip:
        "Length of a dog's fur from skin to tip. It affects the dog's overall appearance and can influence grooming needs and seasonal care.",
    },
    doubleCoat: {
      type: ItemType.BOOLEAN,
      label: "Double Coat",
      tooltip:
        "Double-coated dogs have two layers of fur: a harsh topcoat and a soft undercoat. The soft undercoat is shorter, grows faster, and sheds twice a year. The topcoat is longer and more protective.",
    },
  },
  behavioralTraits: {
    familyAffectionLevel: {
      type: ItemType.RATING,
      label: "Family Affection",
      question:
        "How affectionate would you like your dog to be with family members?",
      min: "Reserved",
      max: "Very Affectionate",
      tooltip:
        "How affectionate a breed is with family members or other familiar people. Some breeds may show affection primarily to their owner, while others are friendly and affectionate with everyone they know well.",
    },
    childFriendly: {
      type: ItemType.RATING,
      label: "Child-Friendly",
      question: "How child-friendly do you prefer your dog to be?",
      min: "Not child-friendly",
      max: "Very child-friendly",
      tooltip:
        "How tolerant and patient a dog is with young children and its overall family-friendly nature.",
    },
    dogSociability: {
      type: ItemType.RATING,
      label: "Dog Sociability",
      question: "How sociable do you want your dog to be with other dogs?",
      min: "Not Sociable",
      max: "Very Sociable",
      tooltip:
        "How friendly and social a breed is with other dogs. Some breeds naturally tend to get along well with other dogs.",
    },
    friendlinessToStrangers: {
      type: ItemType.RATING,
      label: "Friendliness to Strangers",
      question: "How would you like your dog to react to strangers?",
      min: "Reserved or cautious",
      max: "Very friendly",
      tooltip:
        "How welcoming a breed is towards strangers. Some breeds may be reserved or cautious around new people, while others will be eager and happy to meet someone new.",
    },
    playfulnessLevel: {
      type: ItemType.RATING,
      label: "Playfulness",
      question: "How playful would you like your dog to be?",
      min: "Relaxed",
      max: "Very playful",
      tooltip:
        "How enthusiastic a breed is about playing. Some breeds are eager to play tug-of-war or fetch well beyond puppyhood, while others prefer to relax more often.",
    },
    protectiveInstincts: {
      type: ItemType.RATING,
      label: "Protective Instincts",
      question: "How protective do you want your dog to be?",
      min: "Less alert",
      max: "Highly vigilant",
      tooltip:
        "How likely a breed is to warn you of strangers or potential threats. Strongly protective breeds are more likely to react to unfamiliar people or animals. They are usually more friendly towards strangers who are welcomed by their family.",
    },
    adaptabilityRating: {
      type: ItemType.RATING,
      label: "Adaptability",
      question: "How adaptable should your dog be to changes?",
      min: "Not very adaptable",
      max: "Very adaptable",
      tooltip:
        "How easily a breed adapts to changes in their environment (e.g. living conditions, noise levels, weather, daily schedules, etc).",
    },
    vocalizationFrequency: {
      type: ItemType.RATING,
      label: "Barking Frequency",
      question: "How do you feel about a vocal dog?",
      min: "Prefer quiet",
      max: "Don't mind noisy",
      tooltip:
        "How frequently a breed may bark or howl. While some breeds bark at almost anything, others might only bark in specific situations (but even barkless breeds may use other sounds to express themselves.",
    },
  },
  careRequirements: {
    coatSheddingLevel: {
      type: ItemType.RATING,
      label: "Coat Shedding Level",
      question: "How much shedding can you handle?",
      min: "Low shedding",
      max: "High shedding",
      tooltip:
        "Indicates how much fur and hair the breed sheds. Higher shedding means more brushing is needed, higher chances of triggering allergies, and more frequent vacuuming.",
    },
    coatGroomingFrequency: {
      type: ItemType.RATING,
      label: "Coat Grooming Frequency",
      question: "How often are you willing to groom your dog?",
      min: "Rarely",
      max: "Very often",
      tooltip:
        "How often a breed needs bathing, brushing, trimming or other coat maintenance, depending on your time, patience, and budget for grooming. (Note that all breeds need regular nail trimming.)",
    },
    activityLevel: {
      type: ItemType.RATING,
      label: "Activity Level",
      question: "How active do you want your dog to be?",
      min: "Couch potato",
      max: "Energetic explorer",
      tooltip:
        "How much physical exercise a dog needs. Very active dogs are lively, always ready for their next adventure, and need plenty of playtime. Inactive dogs are more laid-back and happy with minimal activity.",
    },
    mentalStimulationRequirements: {
      type: ItemType.RATING,
      label: "Mental Stimulation Requirements",
      question: "How much mental stimulation should your dog need?",
      min: "Low",
      max: "High",
      tooltip:
        "How much mental stimulation a breed needs to stay happy and healthy. Breeds with high mental stimulation needs may need activities that involve decision-making, problem-solving and concentration. (Otherwise, these dogs might create their own less desirable activities!)",
    },
    trainingEase: {
      type: ItemType.RATING,
      label: "Training Ease",
      question: "How easy do you want training to be?",
      min: "Challenging to train",
      max: "Easy to train",
      tooltip:
        "How easy it is to train your dog and their willingness to learn new commands and behaviors. Some breeds are eager to please and quick to learn, while others may be more independent and stubborn.",
    },
  },
};

export default ITEM_METADATA;

export const getItemMetadata = (
  category: string,
  trait: string
): Metadata | null => {
  const categoryData = ITEM_METADATA[category];
  if (!categoryData) return null;
  const metadata = categoryData[trait];
  if (!metadata) return null;
  return metadata;
};
