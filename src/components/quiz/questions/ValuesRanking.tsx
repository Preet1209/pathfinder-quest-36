import { useQuiz } from "@/context/QuizContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Star, Award } from "lucide-react";

const values = [
  { id: "impact", label: "Making Impact", emoji: "🌍", desc: "Changing the world for the better" },
  { id: "wealth", label: "Financial Growth", emoji: "💰", desc: "Building wealth and security" },
  { id: "creativity", label: "Creative Freedom", emoji: "🎨", desc: "Expressing ideas freely" },
  { id: "mastery", label: "Skill Mastery", emoji: "🏆", desc: "Becoming the best at something" },
  { id: "balance", label: "Work-Life Balance", emoji: "⚖️", desc: "Time for life beyond work" },
  { id: "autonomy", label: "Autonomy", emoji: "🚀", desc: "Being your own boss" },
];

const rankIcons = [Crown, Star, Award];
const rankLabels = ["1st — Most Important", "2nd — Very Important", "3rd — Important"];
const rankColors = [
  "from-primary to-secondary",
  "from-secondary to-purple-light",
  "from-purple to-primary",
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
      {/* Ranking display */}
      <div className="mb-5 p-4 rounded-2xl border border-border bg-muted/20">
        <p className="text-xs font-display font-semibold text-muted-foreground tracking-wider uppercase mb-3">
          Your Ranking
        </p>
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => {
            const RankIcon = rankIcons[i];
            const picked = selected[i];
            const val = picked ? values.find((v) => v.id === picked) : null;
            return (
              <motion.div
                key={i}
                layout
                className={`flex-1 rounded-xl border-2 border-dashed p-3 text-center transition-all duration-300 ${
                  val
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/50 bg-muted/10"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center ${
                    val ? "bg-gradient-to-br " + rankColors[i] : "bg-muted/30"
                  }`}
                >
                  <RankIcon className={`w-4 h-4 ${val ? "text-primary-foreground" : "text-muted-foreground/50"}`} />
                </div>
                <AnimatePresence mode="wait">
                  {val ? (
                    <motion.div
                      key={val.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <p className="text-lg mb-0.5">{val.emoji}</p>
                      <p className="text-[10px] font-display font-semibold text-foreground leading-tight">{val.label}</p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      className="text-[10px] text-muted-foreground font-display"
                    >
                      {rankLabels[i]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Instruction */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <p className="text-xs font-display font-medium text-muted-foreground px-2">
          Tap to rank your top 3
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Value cards */}
      <div className="grid gap-2.5">
        {values.map((v) => {
          const idx = selected.indexOf(v.id);
          const isSelected = idx >= 0;
          return (
            <motion.button
              key={v.id}
              onClick={() => toggle(v.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 overflow-hidden ${
                isSelected
                  ? "border-primary/40 bg-primary/10 border-glow"
                  : "border-border hover:border-muted-foreground/50 bg-muted/20 hover:bg-muted/40"
              }`}
            >
              {/* Glow effect when selected */}
              {isSelected && (
                <motion.div
                  layoutId={`glow-${v.id}`}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 0% 50%, hsl(340 82% 52% / 0.08), transparent 70%)",
                  }}
                />
              )}

              {/* Rank badge */}
              <div className="relative z-10 shrink-0">
                {isSelected ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-display text-primary-foreground bg-gradient-to-br ${rankColors[idx]}`}
                    style={{ boxShadow: "0 0 20px hsl(340 82% 52% / 0.4)" }}
                  >
                    {idx + 1}
                  </motion.div>
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                    <span className="text-xl">{v.emoji}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <p className="font-display font-semibold text-foreground flex items-center gap-2">
                  {isSelected && <span className="text-lg">{v.emoji}</span>}
                  {v.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{v.desc}</p>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative z-10 shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-primary glow-dot" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Counter */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i < selected.length ? "bg-primary glow-dot scale-110" : "bg-muted-foreground/20"
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1 font-display">{selected.length}/3</span>
      </div>
    </div>
  );
};
