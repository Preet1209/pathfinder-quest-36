import { motion } from "framer-motion";

const sections = [
  { label: "Quick Setup", time: "1 min 20 sec", questions: 3 },
  { label: "Values & Personality", time: "1 min 45 sec", questions: 4 },
  { label: "Burnout & Learning", time: "1 min 55 sec", questions: 3 },
];

interface Props {
  currentSection: number;
  currentQuestion: number;
  totalAnswered: number;
}

export const SectionProgress = ({ currentSection, totalAnswered }: Props) => {
  const progress = (totalAnswered / 10) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-3">
        {sections.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-semibold transition-colors ${
                i < currentSection
                  ? "bg-accent text-accent-foreground"
                  : i === currentSection
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <div className="hidden sm:block">
              <p className={`text-xs font-medium ${i <= currentSection ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </p>
              <p className="text-xs text-muted-foreground">{s.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
