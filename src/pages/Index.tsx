import { useState } from "react";
import { QuizProvider, useQuiz } from "@/context/QuizContext";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingQuiz } from "@/components/quiz/OnboardingQuiz";
import { Dashboard } from "@/components/Dashboard";
import { PuzzleGate } from "@/components/quiz/PuzzleGate";
import { PuzzleFlow } from "@/components/quiz/PuzzleFlow";

const IndexContent = () => {
  const [started, setStarted] = useState(false);
  const { isComplete, puzzlesPrompted, setPuzzlesPrompted, puzzlesDone, setPuzzlesDone } = useQuiz();

  if (isComplete) {
    if (!puzzlesPrompted) {
      return (
        <PuzzleGate
          onAccept={() => setPuzzlesPrompted(true)}
          onSkip={() => { setPuzzlesPrompted(true); setPuzzlesDone(true); }}
        />
      );
    }
    if (!puzzlesDone) {
      return <PuzzleFlow onDone={() => setPuzzlesDone(true)} />;
    }
    return <Dashboard />;
  }
  if (started) return <OnboardingQuiz />;
  return <LandingPage onStart={() => setStarted(true)} />;
};

const Index = () => (
  <QuizProvider>
    <IndexContent />
  </QuizProvider>
);

export default Index;
