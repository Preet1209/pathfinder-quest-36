import { useQuiz } from "@/context/QuizContext";
import { motion } from "framer-motion";

const qualifications = [
  { value: "high-school", label: "High School / Secondary", emoji: "📚", desc: "Completed or currently in high school" },
  { value: "diploma", label: "Diploma / Certificate", emoji: "📜", desc: "Vocational or technical certification" },
  { value: "bachelors", label: "Bachelor's Degree", emoji: "🎓", desc: "Undergraduate degree (BA, BS, BEng, etc.)" },
  { value: "masters", label: "Master's Degree", emoji: "🏅", desc: "Postgraduate degree (MA, MS, MBA, etc.)" },
  { value: "phd", label: "PhD / Doctorate", emoji: "🔬", desc: "Doctoral research degree" },
  { value: "self-taught", label: "Self-Taught / Bootcamp", emoji: "💻", desc: "Non-traditional education path" },
];

export const Qualification = () => {
  const { answers, updateAnswer } = useQuiz();

  return (
    <div className="grid gap-3">
      {qualifications.map((option, i) => (
        <motion.button
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => updateAnswer("qualification", option.value)}
          className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
            answers.qualification === option.value
              ? "border-primary/50 border-glow"
              : "border-border bg-muted/20 hover:bg-muted/40 hover:border-border"
          }`}
          style={answers.qualification === option.value ? { background: "linear-gradient(135deg, hsl(340 82% 52% / 0.1), hsl(265 60% 50% / 0.05))" } : {}}
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
