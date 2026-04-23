import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Puzzle, Sparkles, ArrowRight } from "lucide-react";

interface Props {
  onAccept: () => void;
  onSkip: () => void;
}

export const PuzzleGate = ({ onAccept, onSkip }: Props) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]" style={{ background: "hsl(340 82% 52%)" }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(265 60% 50%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl card-glass rounded-2xl p-8 md:p-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-5">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-primary font-display font-semibold">Recommended</span>
        </div>

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
             style={{ background: "linear-gradient(135deg, hsl(340 82% 52% / 0.25), hsl(265 60% 50% / 0.25))" }}>
          <Puzzle className="w-7 h-7 text-primary" />
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
          Want sharper accuracy?
        </h2>
        <p className="text-muted-foreground text-sm mb-1">
          Answer a few short trade-off puzzles before we generate your dashboard.
        </p>
        <p className="text-muted-foreground text-sm mb-7">
          They reveal what you'd actually pick under constraint — much more accurate than self-rated values.
        </p>

        <div className="grid grid-cols-3 gap-2 mb-8 text-left">
          {[
            { n: "01", label: "Trade-off pick", desc: "Choose 2 of 4 priorities" },
            { n: "02", label: "Quick", desc: "~30 seconds total" },
            { n: "03", label: "Optional", desc: "Skip if you'd rather" },
          ].map((s) => (
            <div key={s.n} className="p-3 rounded-xl border border-border bg-muted/15">
              <p className="text-[10px] text-muted-foreground font-display tracking-wider">{s.n}</p>
              <p className="text-xs font-semibold text-foreground mt-1">{s.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={onAccept}
            className="px-7 py-3 rounded-xl text-sm font-display font-semibold text-primary-foreground inline-flex items-center justify-center gap-2"
            style={{ background: "var(--gradient-crimson)" }}
          >
            Yes, let's do the puzzles <ArrowRight className="w-4 h-4" />
          </motion.button>
          <button
            onClick={onSkip}
            className="px-7 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          >
            Skip — show my results
          </button>
        </div>
      </motion.div>
    </div>
  );
};