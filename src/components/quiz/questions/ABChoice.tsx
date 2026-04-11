import { useQuiz } from "@/context/QuizContext";
import { QuizAnswers } from "@/types/quiz";

interface Props {
  field: keyof QuizAnswers;
  optionA: { value: string; label: string; emoji: string; desc: string };
  optionB: { value: string; label: string; emoji: string; desc: string };
}

export const ABChoice = ({ field, optionA, optionB }: Props) => {
  const { answers, updateAnswer } = useQuiz();
  const current = answers[field] as string;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[optionA, optionB].map((opt) => (
        <button
          key={opt.value}
          onClick={() => updateAnswer(field, opt.value as never)}
          className={`p-6 rounded-2xl border text-center transition-all duration-300 group ${
            current === opt.value
              ? "border-primary bg-primary/10 border-glow"
              : "border-border hover:border-muted-foreground bg-muted/30"
          }`}
        >
          <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">{opt.emoji}</span>
          <p className="font-display font-bold text-lg text-foreground">{opt.label}</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{opt.desc}</p>
        </button>
      ))}
    </div>
  );
};
