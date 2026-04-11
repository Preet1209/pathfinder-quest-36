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
          className={`p-6 rounded-xl border-2 text-center transition-all ${
            current === opt.value
              ? "border-accent bg-amber-glow"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <span className="text-4xl block mb-3">{opt.emoji}</span>
          <p className="font-display font-bold text-lg text-foreground">{opt.label}</p>
          <p className="text-xs text-muted-foreground mt-2">{opt.desc}</p>
        </button>
      ))}
    </div>
  );
};
