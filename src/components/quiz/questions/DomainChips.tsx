import { useQuiz } from "@/context/QuizContext";

const domains = [
  // Tech & Engineering
  "Software Development", "Data & AI", "Cybersecurity", "Cloud Computing", "Robotics",
  // Design & Creative
  "UI/UX Design", "Graphic Design", "Film & Video", "Animation & VFX", "Photography",
  // Business & Finance
  "Business Strategy", "Finance & Banking", "Entrepreneurship", "Consulting", "Real Estate",
  // Science & Health
  "Healthcare", "Biotechnology", "Psychology", "Environmental Science", "Pharmacy",
  // Social & Humanities
  "Education", "Law", "Social Work", "Journalism", "Political Science",
  // Marketing & Media
  "Digital Marketing", "Content Creation", "Public Relations", "E-Commerce", "Social Media",
  // Emerging Fields
  "Blockchain & Web3", "Sustainability & ESG", "Space Technology", "Game Development", "Supply Chain & Logistics",
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
      <p className="text-xs text-muted-foreground mb-3">Select up to 5 domains that excite you</p>
      <div className="flex flex-wrap gap-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => toggle(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              answers.domains.includes(d)
                ? "text-primary-foreground border-glow"
                : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent"
            }`}
            style={answers.domains.includes(d) ? { background: "var(--gradient-crimson)" } : {}}
          >
            {d}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{answers.domains.length}/5 selected</p>
    </div>
  );
};
