import { useQuiz } from "@/context/QuizContext";

export const DesiredSkill = () => {
  const { answers, updateAnswer } = useQuiz();

  return (
    <div>
      <textarea
        value={answers.desiredSkill}
        onChange={(e) => updateAnswer("desiredSkill", e.target.value)}
        placeholder="e.g., I want to learn machine learning to build AI products, or I'd love to get better at public speaking..."
        className="w-full h-32 p-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none resize-none font-body text-sm transition-colors"
        maxLength={500}
      />
      <p className="text-xs text-muted-foreground mt-1 text-right">{answers.desiredSkill.length}/500</p>
    </div>
  );
};
