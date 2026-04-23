import { useEffect, useRef, useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { Timer } from "lucide-react";

const OPTIONS = [
  { value: "25", label: "A) 25" },
  { value: "33", label: "B) 33" },
  { value: "34", label: "C) 34" },
  { value: "31", label: "D) 31" },
];

export const LogicSequence = () => {
  const { answers, updateAnswer } = useQuiz();
  const startRef = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    // reset timer on mount unless already answered
    if (!answers.sequenceAnswer) {
      startRef.current = Date.now();
    }
    const id = setInterval(() => {
      if (!answers.sequenceAnswer) {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePick = (val: string) => {
    const ms = Date.now() - startRef.current;
    updateAnswer("sequenceAnswer", val);
    updateAnswer("sequenceTimeMs", ms);
  };

  const shownTime = answers.sequenceAnswer
    ? Math.round(answers.sequenceTimeMs / 100) / 10
    : elapsed;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-muted/20 border border-border">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Find the next number</p>
          <p className="font-display font-bold text-2xl text-foreground tracking-wider mt-1">
            2, 3, 5, 9, 17, <span className="text-primary">?</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Timer className="w-3.5 h-3.5" />
          <span className="font-display font-semibold tabular-nums">{shownTime}s</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => {
          const selected = answers.sequenceAnswer === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handlePick(opt.value)}
              className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                selected
                  ? "border-primary bg-primary/10 border-glow"
                  : "border-border hover:border-muted-foreground bg-muted/30"
              }`}
            >
              <p className="font-display font-bold text-foreground">{opt.label}</p>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground mt-3 text-center">
        Both your answer and how quickly you answered are factored into your logical-reasoning signal.
      </p>
    </div>
  );
};