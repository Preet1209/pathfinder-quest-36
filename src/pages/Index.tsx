import { useState } from "react";
import { QuizProvider, useQuiz } from "@/context/QuizContext";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingQuiz } from "@/components/quiz/OnboardingQuiz";
import { Dashboard } from "@/components/Dashboard";
import { AppShell } from "@/components/AppShell";

const IndexContent = () => {
  const [started, setStarted] = useState(false);
  const { isComplete } = useQuiz();

  if (isComplete)
    return (
      <AppShell>
        <Dashboard />
      </AppShell>
    );
  if (started) return <OnboardingQuiz />;
  return <LandingPage onStart={() => setStarted(true)} />;
};

const Index = () => (
  <QuizProvider>
    <IndexContent />
  </QuizProvider>
);

export default Index;
