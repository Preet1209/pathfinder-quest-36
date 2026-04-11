import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

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
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="bg-card rounded-2xl p-8 md:p-10" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <p className="text-xs font-display font-semibold text-accent uppercase tracking-widest mb-2">
            Question {questionNumber} of 10
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>}
          {!subtitle && <div className="mb-6" />}

          <div className="mb-8">{children}</div>

          <div className="flex justify-between">
            {onBack ? (
              <button
                onClick={onBack}
                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={onNext}
              disabled={!canProceed}
              className="px-7 py-2.5 rounded-lg text-sm font-display font-semibold bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {isLast ? "See My Results →" : "Continue →"}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
