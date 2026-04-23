import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { DollarSign, Scale, Rocket, Shield, Check, Puzzle } from "lucide-react";

interface Props {
  onDone: () => void;
}

const OPTIONS = [
  { id: "salary", label: "High Salary", desc: "Maximize earnings & compensation", Icon: DollarSign, color: "hsl(340 82% 52%)" },
  { id: "balance", label: "Work-Life Balance", desc: "Time, flexibility, mental space", Icon: Scale, color: "hsl(170 60% 45%)" },
  { id: "growth", label: "Fast Career Growth", desc: "Rapid promotions & big wins", Icon: Rocket, color: "hsl(265 60% 55%)" },
  { id: "security", label: "Job Security", desc: "Stable role, low layoff risk", Icon: Shield, color: "hsl(220 60% 55%)" },
];

export const PuzzleFlow = ({ onDone }: Props) => {
  const { answers, updateAnswer } = useQuiz();
  const selected = answers.puzzleTradeoff;

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      updateAnswer("puzzleTradeoff", selected.filter((x) => x !== id));
    } else if (selected.length < 2) {
      updateAnswer("puzzleTradeoff", [...selected, id]);
    }
  };

  const canSubmit = selected.length === 2;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]" style={{ background: "hsl(340 82% 52%)" }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(265 60% 50%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl card-glass rounded-2xl p-8 md:p-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-crimson)" }}>
            <Puzzle className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase">Puzzle 1 of 1</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Choose only <span className="text-gradient">2</span> for your ideal career
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Real careers force trade-offs. Pick the two you'd refuse to give up — the rest become flexible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {OPTIONS.map(({ id, label, desc, Icon, color }) => {
            const isSelected = selected.includes(id);
            const isDisabled = !isSelected && selected.length >= 2;
            return (
              <motion.button
                key={id}
                whileHover={!isDisabled ? { scale: 1.02 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                onClick={() => toggle(id)}
                disabled={isDisabled}
                className={`relative text-left p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_0_30px_hsl(340_82%_52%/0.2)]"
                    : isDisabled
                    ? "border-border bg-muted/10 opacity-40 cursor-not-allowed"
                    : "border-border bg-muted/15 hover:border-primary/40 hover:bg-muted/30"
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "var(--gradient-crimson)" }}
                  >
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </motion.div>
                )}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                     style={{ background: `${color} / 0.2`, backgroundColor: `color-mix(in hsl, ${color} 18%, transparent)` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <p className="text-sm font-display font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/15 border border-border mb-6">
          <span className="text-xs text-muted-foreground">
            Selected: <span className="text-foreground font-semibold">{selected.length}</span> / 2
          </span>
          <div className="flex gap-1.5">
            {[0, 1].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${selected[i] ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            onClick={onDone}
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.02 } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
            className="px-7 py-2.5 rounded-xl text-sm font-display font-semibold text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            style={{ background: canSubmit ? "var(--gradient-crimson)" : "hsl(var(--muted))" }}
          >
            See My Results →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};