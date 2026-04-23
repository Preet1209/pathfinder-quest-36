export interface QuizAnswers {
  ageRange: string;
  qualification: string;
  journeyStage: string;
  hoursPerWeek: string;
  domains: string[];
  valuesRanking: string[];
  stabilityVsFlexibility: string;
  independentVsCollaborative: string;
  expertVsVersatile: string;
  stressLevels: { overwhelm: number; detachment: number; excitement: number };
  learningStyle: string;
  desiredSkill: string;
  linkedinUrl: string;
  githubUrl: string;
  // Cognition — logical reasoning probes
  sequenceAnswer: string;        // user's pick for 2,3,5,9,17,? (correct: "33")
  sequenceTimeMs: number;        // time to answer in ms (0 if unanswered)
  puzzleAnswer: string;          // user's pick for shape pattern (correct: "triangle")
  puzzleTimeMs: number;          // time to answer in ms (0 if unanswered)
}

export const defaultAnswers: QuizAnswers = {
  ageRange: "",
  qualification: "",
  journeyStage: "",
  hoursPerWeek: "",
  domains: [],
  valuesRanking: [],
  stabilityVsFlexibility: "",
  independentVsCollaborative: "",
  expertVsVersatile: "",
  stressLevels: { overwhelm: 50, detachment: 50, excitement: 50 },
  learningStyle: "",
  desiredSkill: "",
  linkedinUrl: "",
  githubUrl: "",
  sequenceAnswer: "",
  sequenceTimeMs: 0,
  puzzleAnswer: "",
  puzzleTimeMs: 0,
};
