enum ItemType {
  RATING,
  STRING,
  LIST,
  NUMBER,
  BOOLEAN,
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
  generalInformation: {
    name: {
      type: ItemType.STRING,
      label: "Breed",
      tooltip:
        "The breed of the dog, which refers to the specific genetic lineage or type of dog, such as Labrador Retriever, German Shepherd, or Beagle.",
    },
    group: {
      type: ItemType.STRING,
      label: "Group",
      tooltip:
        "The category or classification of a dog based on its purpose or characteristics, such as Terrier, Working, or Companion.",
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
      tooltip:
        "This section provides general information about the dog, including its background, personality traits, and any other relevant details that give an overview of the dog.",
    },
    longDescription: {
      type: ItemType.STRING,
      label: "Long Description",
      tooltip:
        "This section provides general information about the dog, including its background, personality traits, and any other relevant details that give an overview of the dog.",
    },
    popularity: {
      type: ItemType.RATING,
      label: "Popularity",
      min: "Rare breed",
      max: "Very popular",
      question: "What level of popularity do you prefer for your dog breed?",
      tooltip:
        "Indicates the popularity of the breed, reflecting how well-known the breed is, how common it is as a pet, and how easily it can be acquired.",
    },
    height: {
      type: ItemType.NUMBER,
      label: "Height",
      tooltip:
        "This is the typical height of the dog breed measured in inches, representing how tall a dog of this breed usually stands.",
    },
    weight: {
      type: ItemType.NUMBER,
      label: "Weight",
      tooltip:
        "The weight of the dog breed in pounds. This value helps indicate the general size and build of the breed, providing an idea of how heavy an average dog of this breed might be.",
    },
    lifeExpectancy: {
      type: ItemType.NUMBER,
      label: "Life Expectancy",
      tooltip:
        "The typical number of years a dog is expected to live, on average.",
    },
  },
  physicalCharacteristics: {
    size: {
      type: ItemType.RATING,
      label: "Size",
      question: "What size of dog are you looking for?",
      min: "Small",
      max: "Large",
      tooltip:
        "The relative size of a dog breed compared to other breeds. It helps users understand whether a breed is generally small, medium, or large.",
    },
    lifespan: {
      type: ItemType.RATING,
      label: "Lifespan",
      question: "What lifespan do you consider ideal for a dog?",
      min: "Short",
      max: "Long",
      tooltip:
        "The average length of life for the breed compared to other dogs.",
    },
    salivationTendency: {
      type: ItemType.RATING,
      label: "Salivation Tendency",
      question: "How do you feel about a dog that drools?",
      min: "Prefer dry",
      max: "Don't mind drool",
      tooltip:
        "This indicates how likely a breed is to drool. For those who prefer a tidier environment, breeds with high salivation tendencies may not be ideal as they can leave drool on your clothes and furniture.",
    },
    coatStyle: {
      type: ItemType.STRING,
      label: "Coat Style",
      question: "What type of coat style do you prefer in a dog?",
      tooltip:
        "The typical texture and appearance of a dog's coat, such as wavy, wiry, curly, hairless, or straight.",
    },
    coatTexture: {
      type: ItemType.STRING,
      label: "Coat Texture",
      question: "What texture do you prefer for your dog's coat?",
      tooltip:
        "Describes the typical texture of a dog's coat, such as rough, silky, or smooth.",
    },
    coatLength: {
      type: ItemType.RATING,
      label: "Coat Length",
      question: "What length of coat do you prefer on a dog?",
      min: "Short",
      max: "Long",
      tooltip:
        "The length of a dog's fur from the skin to the tip. It affects the dog's overall appearance and can influence grooming needs and seasonal care.",
    },
    doubleCoat: {
      type: ItemType.BOOLEAN,
      label: "Double Coat",
      tooltip:
        "Double-coated dogs have two layers of fur: a harsh topcoat and a soft undercoat. The soft undercoat is shorter, grows faster, and sheds twice a year, while the topcoat is longer and more protective.",
    },
  },
  behavioralTraits: {
    familyAffectionLevel: {
      type: ItemType.RATING,
      label: "Family Affection Level",
      question:
        "How affectionate would you like your dog to be with family members?",
      min: "Reserved",
      max: "Very Affectionate",
      tooltip:
        "Indicates how affectionate a breed is likely to be with family members or other familiar people. Some breeds may show affection primarily to their owner, while others are friendly and affectionate with everyone they know well.",
    },
    childFriendly: {
      type: ItemType.RATING,
      label: "Child-Friendly",
      question: "How child-friendly do you prefer your dog to be?",
      min: "Not child-friendly",
      max: "Very child-friendly",
      tooltip:
        "This rating indicates a breed's tolerance and patience with young children's behavior and its overall family-friendly nature. Always supervise interactions between dogs and young children, or any children who are not familiar with dogs.",
    },
    dogSociability: {
      type: ItemType.RATING,
      label: "Dog Sociability",
      question: "How sociable should your dog be with other dogs?",
      min: "Not Sociable",
      max: "Very Sociable",
      tooltip:
        "Indicates how friendly and social a breed typically is with other dogs. While supervision is always recommended during interactions and introductions, some breeds naturally tend to get along well with other dogs, whether at home or in public settings.",
    },
    friendlinessToStrangers: {
      type: ItemType.RATING,
      label: "Friendliness to Strangers",
      question: "How would you like your dog to react to strangers?",
      min: "Prefer reserved or cautious",
      max: "Prefer very friendly and welcoming",
      tooltip:
        "This metric indicates how welcoming a breed is likely to be towards strangers. Some breeds may be reserved or cautious around new people, while others will be eager and happy to meet someone new, regardless of the location.",
    },
    playfulnessLevel: {
      type: ItemType.RATING,
      label: "Playfulness Level",
      question: "How playful would you like your dog to be?",
      min: "Relaxed",
      max: "Very playful",
      tooltip:
        "Indicates how enthusiastic a breed is about play, even beyond puppyhood. Some breeds remain eager to engage in activities like tug-of-war or fetch well into their adult years, while others may prefer to relax more often.",
    },
    protectiveInstincts: {
      type: ItemType.RATING,
      label: "Protective Instincts",
      question: "How protective do you want your dog to be?",
      min: "Less alert",
      max: "Highly vigilant",
      tooltip:
        "This measures a breed's tendency to alert you to the presence of strangers or potential threats. Breeds with strong protective instincts are more likely to react to unfamiliar people or animals, whether it's the mailman or a squirrel outside. They typically become friendly towards strangers who are welcomed by their family.",
    },
    adaptabilityRating: {
      type: ItemType.RATING,
      label: "Adaptability Rating",
      question: "How adaptable should your dog be to changes?",
      min: "Poorly adaptable",
      max: "Highly adaptable",
      tooltip:
        "This rating indicates how easily a breed adapts to changes in their environment, including living conditions, noise levels, weather, daily schedules, and other day-to-day variations.",
    },
    vocalizationFrequency: {
      type: ItemType.RATING,
      label: "Vocalization Frequency",
      question: "How do you feel about a vocal dog?",
      min: "Prefer quiet",
      max: "It's fine if they're noisy",
      tooltip:
        "This measures how frequently a breed vocalizes, including barking and howling. While some breeds are highly vocal and bark at almost anything, others are more reserved and only bark in specific situations. Note that even barkless breeds may use other sounds to express themselves.",
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
        "Indicates the amount of fur and hair the breed typically sheds. Higher shedding levels mean more frequent brushing is needed, higher chances of triggering allergies, and more frequent cleaning tasks like vacuuming and lint-rolling.",
    },
    coatGroomingFrequency: {
      type: ItemType.RATING,
      label: "Coat Grooming Frequency",
      question: "How frequently are you willing to groom your dog?",
      min: "Rarely",
      max: "Frequent grooming",
      tooltip:
        "This indicates how often a breed needs bathing, brushing, trimming, or other types of coat maintenance. Consider your available time, patience, and budget for grooming when evaluating this aspect. Note that all breeds need regular nail trimming.",
    },
    activityLevel: {
      type: ItemType.RATING,
      label: "Activity Level",
      question: "What level of activity do you expect from your dog?",
      min: "Couch potato",
      max: "Energetic explorer",
      tooltip:
        "Indicates the required amount of physical exercise and mental stimulation for a dog breed. High activity level dogs are lively, always ready for their next adventure, and need plenty of playtime. Low activity level dogs are more laid-back and content with minimal activity.",
    },
    mentalStimulationRequirements: {
      type: ItemType.RATING,
      label: "Mental Stimulation Requirements",
      question: "How much mental stimulation should your dog need?",
      min: "Low",
      max: "High",
      tooltip:
        "Indicates how much mental stimulation a breed needs to stay happy and healthy. Breeds with high mental stimulation needs may require activities that involve decision-making, problem-solving, and concentration. Without sufficient mental engagement, these dogs might create their own activities, which may be undesirable.",
    },
    trainingEase: {
      type: ItemType.RATING,
      label: "Training Ease",
      question: "How easy do you want training to be?",
      min: "Challenging to train",
      max: "Easy to train",
      tooltip:
        "Indicates how easy it is to train your dog and their willingness to learn new commands and behaviors. Some breeds are eager to please and quick to learn, while others may be more independent and stubborn.",
    },
  },
};

export default ITEM_METADATA;
