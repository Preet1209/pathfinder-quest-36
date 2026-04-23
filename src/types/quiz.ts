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
  puzzleTradeoff: string[];
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
  puzzleTradeoff: [],
};
