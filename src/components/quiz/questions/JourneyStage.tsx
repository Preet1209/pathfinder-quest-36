import { useQuiz } from "@/context/QuizContext";

const stages = [
  { value: "exploring", label: "🔍 Exploring", desc: "Just starting to figure things out" },
  { value: "pivoting", label: "🔄 Pivoting", desc: "Changing direction from current path" },
  { value: "leveling-up", label: "📈 Leveling Up", desc: "Growing in my current field" },
  { value: "re-entering", label: "🚪 Re-entering", desc: "Coming back after a break" },
];

export const JourneyStage = () => {
  const { answers, updateAnswer } = useQuiz();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {stages.map((s) => (
        <button
          key={s.value}
          onClick={() => updateAnswer("journeyStage", s.value)}
          className={`p-4 rounded-xl border text-left transition-all duration-200 ${
            answers.journeyStage === s.value
              ? "border-primary bg-primary/10 border-glow"
              : "border-border hover:border-muted-foreground bg-muted/30"
          }`}
        >
          <p className="font-display font-semibold text-foreground">{s.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
        </button>
      ))}
    </div>
  );
};
