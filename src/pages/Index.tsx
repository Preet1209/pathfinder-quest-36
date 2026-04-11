import { useState } from "react";
import { QuizProvider, useQuiz } from "@/context/QuizContext";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingQuiz } from "@/components/quiz/OnboardingQuiz";
import { Dashboard } from "@/components/Dashboard";

const IndexContent = () => {
  const [started, setStarted] = useState(false);
  const { isComplete } = useQuiz();

  if (isComplete) return <Dashboard />;
  if (started) return <OnboardingQuiz />;
  return <LandingPage onStart={() => setStarted(true)} />;
};

const Index = () => (
  <QuizProvider>
    <IndexContent />
  </QuizProvider>
);

export default Index;
