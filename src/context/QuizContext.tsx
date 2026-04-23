import { createContext, useContext, useState, ReactNode } from "react";
import { QuizAnswers, defaultAnswers } from "@/types/quiz";

interface QuizContextType {
  answers: QuizAnswers;
  updateAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  currentSection: number;
  setCurrentSection: (s: number) => void;
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  isComplete: boolean;
  setIsComplete: (v: boolean) => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be inside QuizProvider");
  return ctx;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const updateAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <QuizContext.Provider
      value={{ answers, updateAnswer, currentSection, setCurrentSection, currentQuestion, setCurrentQuestion, isComplete, setIsComplete }}
    >
      {children}
    </QuizContext.Provider>
  );
};
