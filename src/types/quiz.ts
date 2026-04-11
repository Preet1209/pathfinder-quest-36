export interface QuizAnswers {
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
}

export const defaultAnswers: QuizAnswers = {
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
};
