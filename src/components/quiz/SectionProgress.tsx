import { motion } from "framer-motion";

const sections = [
  { label: "Quick Setup", time: "2:00", questions: 5 },
  { label: "Values & Personality", time: "1:45", questions: 4 },
  { label: "Burnout & Learning", time: "1:55", questions: 3 },
];

interface Props {
  currentSection: number;
  currentQuestion: number;
  totalAnswered: number;
}

export const SectionProgress = ({ currentSection, totalAnswered }: Props) => {
  const progress = (totalAnswered / 12) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        {sections.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-bold transition-all duration-300 ${
                i < currentSection
                  ? "bg-primary text-primary-foreground glow-dot"
                  : i === currentSection
                  ? "border-2 border-primary text-primary"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {i < currentSection ? "✓" : i + 1}
            </div>
            <div className="hidden sm:block">
              <p className={`text-xs font-semibold ${i <= currentSection ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{s.time}</p>
            </div>
            {i < 2 && (
              <div className={`hidden sm:block w-8 h-px mx-1 ${i < currentSection ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-crimson)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
