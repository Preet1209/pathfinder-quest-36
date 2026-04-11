import { useQuiz } from "@/context/QuizContext";
import { useState } from "react";

const values = [
  { id: "impact", label: "🌍 Making Impact", desc: "Changing the world for the better" },
  { id: "wealth", label: "💰 Financial Growth", desc: "Building wealth and security" },
  { id: "creativity", label: "🎨 Creative Freedom", desc: "Expressing ideas freely" },
  { id: "mastery", label: "🏆 Skill Mastery", desc: "Becoming the best at something" },
  { id: "balance", label: "⚖️ Work-Life Balance", desc: "Time for life beyond work" },
  { id: "autonomy", label: "🚀 Autonomy", desc: "Being your own boss" },
];

export const ValuesRanking = () => {
  const { answers, updateAnswer } = useQuiz();
  const [selected, setSelected] = useState<string[]>(answers.valuesRanking);

  const toggle = (id: string) => {
    let next: string[];
    if (selected.includes(id)) {
      next = selected.filter((v) => v !== id);
    } else if (selected.length < 3) {
      next = [...selected, id];
    } else {
      return;
    }
    setSelected(next);
    updateAnswer("valuesRanking", next);
  };

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3">Pick your top 3 values (in order of importance)</p>
      <div className="grid gap-2">
        {values.map((v) => {
          const idx = selected.indexOf(v.id);
          return (
            <button
              key={v.id}
              onClick={() => toggle(v.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                idx >= 0
                  ? "border-accent bg-amber-glow"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              {idx >= 0 && (
                <span className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold font-display">
                  {idx + 1}
                </span>
              )}
              <div>
                <p className="font-display font-semibold text-foreground">{v.label}</p>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{selected.length}/3 selected</p>
    </div>
  );
};
