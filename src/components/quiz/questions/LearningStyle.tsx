import { useQuiz } from "@/context/QuizContext";

const styles = [
  { value: "visual", label: "👁️ Visual", desc: "Videos, diagrams, infographics" },
  { value: "reading", label: "📖 Reading", desc: "Articles, docs, written guides" },
  { value: "hands-on", label: "🛠️ Hands-on", desc: "Projects, experiments, building" },
  { value: "social", label: "👥 Social", desc: "Discussions, mentors, groups" },
];

export const LearningStyle = () => {
  const { answers, updateAnswer } = useQuiz();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {styles.map((s) => (
        <button
          key={s.value}
          onClick={() => updateAnswer("learningStyle", s.value)}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            answers.learningStyle === s.value
              ? "border-accent bg-amber-glow"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <p className="font-display font-semibold text-foreground">{s.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
        </button>
      ))}
    </div>
  );
};
