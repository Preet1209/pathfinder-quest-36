import { useQuiz } from "@/context/QuizContext";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const ageRanges = [
  { value: "under-18", label: "Under 18", emoji: "🎓", desc: "Still in school, exploring options" },
  { value: "18-24", label: "18 – 24", emoji: "🚀", desc: "College / early career" },
  { value: "25-34", label: "25 – 34", emoji: "💼", desc: "Building career momentum" },
  { value: "35-44", label: "35 – 44", emoji: "📈", desc: "Mid-career growth or pivot" },
  { value: "45+", label: "45+", emoji: "🌟", desc: "Senior experience, new directions" },
];

export const AgeRange = () => {
  const { answers, updateAnswer } = useQuiz();

  return (
    <div className="grid gap-3">
      {ageRanges.map((option, i) => (
        <motion.button
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => updateAnswer("ageRange", option.value)}
          className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
            answers.ageRange === option.value
              ? "border-primary/50 border-glow"
              : "border-border bg-muted/20 hover:bg-muted/40 hover:border-border"
          }`}
          style={answers.ageRange === option.value ? { background: "linear-gradient(135deg, hsl(46 65% 52% / 0.1), hsl(258 51% 52% / 0.05))" } : {}}
        >
          <span className="text-2xl">{option.emoji}</span>
          <div>
            <p className="font-display font-semibold text-sm text-foreground">{option.label}</p>
            <p className="text-xs text-muted-foreground">{option.desc}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
