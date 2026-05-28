import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { GameButton } from "@/components/ui/game-button";

interface Props {
  questionNumber: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  canProceed: boolean;
  isLast?: boolean;
}

export const QuestionCard = ({ questionNumber, title, subtitle, children, onNext, onBack, canProceed, isLast }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionNumber}
        initial={{ opacity: 0, x: 50, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="card-glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
          {/* Top glow accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px" style={{ background: "var(--gradient-crimson)" }} />

          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-primary-foreground" style={{ background: "var(--gradient-crimson)" }}>
              {questionNumber}
            </span>
            <span className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase">
              of 15
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>}
          {!subtitle && <div className="mb-6" />}

          <div className="mb-8">{children}</div>

          <div className="flex justify-between items-center">
            {onBack ? (
              <GameButton onClick={onBack} variant="ghost" size="sm">
                ← Back
              </GameButton>
            ) : (
              <div />
            )}
            <GameButton onClick={onNext} disabled={!canProceed} variant="gold" size="md">
              {isLast ? "See My Results →" : "Continue →"}
            </GameButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
