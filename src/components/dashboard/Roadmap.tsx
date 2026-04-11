import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { CheckCircle2, Circle, Rocket, BookOpen, Users, Trophy, Briefcase, ArrowRight } from "lucide-react";

const getRoadmapSteps = (answers: ReturnType<typeof useQuiz>["answers"]) => {
  const skill = answers.desiredSkill || "your target skill";
  const style = answers.learningStyle;
  const hours = answers.hoursPerWeek;
  const isIntense = hours === "20+" || hours === "10-20";

  const methodHint =
    style === "visual" ? "video courses & diagrams" :
    style === "reading" ? "articles & documentation" :
    style === "hands-on" ? "projects & labs" :
    "group workshops & mentorship";

  return [
    {
      phase: "Phase 1",
      title: "Foundation",
      duration: isIntense ? "Weeks 1–2" : "Weeks 1–4",
      status: "current" as const,
      icon: BookOpen,
      tasks: [
        `Audit current skills in ${answers.domains[0] || "your domain"}`,
        `Begin learning ${skill} fundamentals via ${methodHint}`,
        "Set up a personal portfolio or project tracker",
      ],
    },
    {
      phase: "Phase 2",
      title: "Skill Building",
      duration: isIntense ? "Weeks 3–6" : "Weeks 5–12",
      status: "upcoming" as const,
      icon: Rocket,
      tasks: [
        `Complete 2–3 guided projects in ${skill}`,
        `Bridge gap between ${answers.domains[0] || "domain A"} and ${answers.domains[1] || "domain B"}`,
        "Publish work samples or open-source contributions",
      ],
    },
    {
      phase: "Phase 3",
      title: "Network & Apply",
      duration: isIntense ? "Weeks 7–10" : "Weeks 13–20",
      status: "upcoming" as const,
      icon: Users,
      tasks: [
        "Join communities in your hybrid career space",
        "Seek mentorship or informational interviews",
        `Tailor resume for ${answers.expertVsVersatile === "expert" ? "specialist" : "cross-functional"} roles`,
      ],
    },
    {
      phase: "Phase 4",
      title: "Launch & Iterate",
      duration: isIntense ? "Weeks 11–14" : "Weeks 21–30",
      status: "upcoming" as const,
      icon: Trophy,
      tasks: [
        "Apply to target roles or freelance gigs",
        "Negotiate offers aligned with your core values",
        "Set up quarterly career check-ins using your burnout tracker",
      ],
    },
  ];
};

export const Roadmap = () => {
  const { answers } = useQuiz();
  const steps = getRoadmapSteps(answers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="card-glass rounded-2xl p-6 md:col-span-2 lg:col-span-3 relative overflow-hidden hover:border-primary/30 transition-colors"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(340 82% 52% / 0.6), hsl(265 60% 50% / 0.6), transparent)" }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(340 82% 52% / 0.2), hsl(265 60% 50% / 0.2))" }}
        >
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-lg">Your Career Roadmap</h3>
          <p className="text-xs text-muted-foreground">
            Personalized path based on {answers.hoursPerWeek} hrs/week • {answers.learningStyle} learner
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-primary via-secondary to-muted hidden md:block" />

        <div className="grid gap-4">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            const isCurrent = step.status === "current";

            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className={`relative flex gap-4 p-4 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? "bg-primary/5 border border-primary/20"
                    : "bg-muted/10 border border-transparent hover:border-border hover:bg-muted/20"
                }`}
              >
                {/* Icon */}
                <div className="shrink-0 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCurrent
                        ? "bg-gradient-to-br from-primary to-secondary"
                        : "bg-muted/40 border border-border"
                    }`}
                    style={isCurrent ? { boxShadow: "0 0 20px hsl(340 82% 52% / 0.3)" } : {}}
                  >
                    <StepIcon className={`w-5 h-5 ${isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[10px] font-display font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? "bg-primary/20 text-primary"
                          : "bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      {step.phase}
                    </span>
                    <h4 className="font-display font-semibold text-foreground text-sm">{step.title}</h4>
                    <span className="text-[10px] text-muted-foreground ml-auto">{step.duration}</span>
                  </div>

                  <ul className="space-y-1.5 mt-2">
                    {step.tasks.map((task, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + i * 0.15 + j * 0.05 }}
                        className="flex items-start gap-2 text-xs"
                      >
                        {isCurrent ? (
                          <ArrowRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="w-3 h-3 text-muted-foreground/40 mt-0.5 shrink-0" />
                        )}
                        <span className={isCurrent ? "text-foreground/90" : "text-muted-foreground"}>{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
