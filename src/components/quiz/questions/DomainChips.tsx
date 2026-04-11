import { useQuiz } from "@/context/QuizContext";

const domains = [
  "Technology", "Design", "Business", "Healthcare", "Education",
  "Science", "Arts", "Finance", "Marketing", "Engineering",
  "Law", "Media", "Social Impact", "Data & AI", "Sustainability",
];

export const DomainChips = () => {
  const { answers, updateAnswer } = useQuiz();

  const toggle = (d: string) => {
    const current = answers.domains;
    if (current.includes(d)) {
      updateAnswer("domains", current.filter((x) => x !== d));
    } else if (current.length < 5) {
      updateAnswer("domains", [...current, d]);
    }
  };

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3">Select up to 5 domains</p>
      <div className="flex flex-wrap gap-2">
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => toggle(d)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              answers.domains.includes(d)
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{answers.domains.length}/5 selected</p>
    </div>
  );
};
