import { useEffect, useRef, useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { Timer, Circle, Square, Triangle } from "lucide-react";

// Sequence: ○ □ △ ○ □ ? — the rule cycles circle → square → triangle.
const OPTIONS = [
  { value: "circle", label: "Circle", Icon: Circle },
  { value: "square", label: "Square", Icon: Square },
  { value: "triangle", label: "Triangle", Icon: Triangle },
];

export const PatternPuzzle = () => {
  const { answers, updateAnswer } = useQuiz();
  const startRef = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!answers.puzzleAnswer) {
      startRef.current = Date.now();
    }
    const id = setInterval(() => {
      if (!answers.puzzleAnswer) {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePick = (val: string) => {
    const ms = Date.now() - startRef.current;
    updateAnswer("puzzleAnswer", val);
    updateAnswer("puzzleTimeMs", ms);
  };

  const shownTime = answers.puzzleAnswer
    ? Math.round(answers.puzzleTimeMs / 100) / 10
    : elapsed;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-muted/20 border border-border">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Complete the pattern</p>
          <div className="flex items-center gap-3 mt-2 text-foreground">
            <Circle className="w-7 h-7" />
            <Square className="w-7 h-7" />
            <Triangle className="w-7 h-7" />
            <Circle className="w-7 h-7" />
            <Square className="w-7 h-7" />
            <span className="text-2xl font-display font-bold text-primary">?</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Timer className="w-3.5 h-3.5" />
          <span className="font-display font-semibold tabular-nums">{shownTime}s</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map(({ value, label, Icon }) => {
          const selected = answers.puzzleAnswer === value;
          return (
            <button
              key={value}
              onClick={() => handlePick(value)}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300 ${
                selected
                  ? "border-primary bg-primary/10 border-glow"
                  : "border-border hover:border-muted-foreground bg-muted/30"
              }`}
            >
              <Icon className="w-7 h-7 text-foreground" />
              <p className="font-display font-semibold text-sm text-foreground">{label}</p>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground mt-3 text-center">
        Pattern recognition speed contributes to your logical-reasoning signal.
      </p>
    </div>
  );
};