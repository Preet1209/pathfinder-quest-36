import { useQuiz } from "@/context/QuizContext";

const options = [
  { value: "1-3", label: "1–3 hrs", desc: "Casual pace" },
  { value: "4-7", label: "4–7 hrs", desc: "Steady commitment" },
  { value: "8-15", label: "8–15 hrs", desc: "Serious grind" },
  { value: "16+", label: "16+ hrs", desc: "Full immersion" },
];

export const HoursPerWeek = () => {
  const { answers, updateAnswer } = useQuiz();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => updateAnswer("hoursPerWeek", o.value)}
          className={`p-4 rounded-xl border text-center transition-all duration-200 ${
            answers.hoursPerWeek === o.value
              ? "border-primary bg-primary/10 border-glow"
              : "border-border hover:border-muted-foreground bg-muted/30"
          }`}
        >
          <p className="font-display font-bold text-lg text-foreground">{o.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
        </button>
      ))}
    </div>
  );
};
