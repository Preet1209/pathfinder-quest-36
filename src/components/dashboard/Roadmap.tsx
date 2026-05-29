import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Circle, Rocket, BookOpen, Users, Trophy, Briefcase, ArrowRight, ExternalLink } from "lucide-react";

interface Resource {
  title: string;
  url: string;
  type: "course" | "article" | "tool" | "community";
}

const typeColors: Record<string, string> = {
  course: "bg-primary/20 text-primary",
  article: "bg-secondary/20 text-secondary",
  tool: "bg-sage/20 text-sage",
  community: "bg-crimson/20 text-crimson",
};

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
      phase: "Phase 1", title: "Foundation",
      duration: isIntense ? "Weeks 1–2" : "Weeks 1–4",
      status: "current" as const, icon: BookOpen,
      tasks: [
        { text: `Audit current skills in ${answers.domains[0] || "your domain"}`, resources: [
          { title: "SkillScan Self-Assessment", url: "https://www.skillscan.com", type: "tool" as const },
          { title: "LinkedIn Skills Assessment", url: "https://www.linkedin.com/skill-assessments", type: "tool" as const },
        ]},
        { text: `Begin learning ${skill} fundamentals via ${methodHint}`, resources: [
          { title: "Coursera – Top Rated Courses", url: "https://www.coursera.org", type: "course" as const },
          { title: "freeCodeCamp", url: "https://www.freecodecamp.org", type: "course" as const },
          { title: "Khan Academy", url: "https://www.khanacademy.org", type: "course" as const },
        ]},
        { text: "Set up a personal portfolio or project tracker", resources: [
          { title: "Notion Templates", url: "https://www.notion.so/templates", type: "tool" as const },
          { title: "How to Build a Portfolio (Guide)", url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/", type: "article" as const },
        ]},
      ],
    },
    {
      phase: "Phase 2", title: "Skill Building",
      duration: isIntense ? "Weeks 3–6" : "Weeks 5–12",
      status: "upcoming" as const, icon: Rocket,
      tasks: [
        { text: `Complete 2–3 guided projects in ${skill}`, resources: [
          { title: "Frontend Mentor", url: "https://www.frontendmentor.io", type: "course" as const },
          { title: "Kaggle Competitions", url: "https://www.kaggle.com/competitions", type: "course" as const },
        ]},
        { text: `Bridge gap between ${answers.domains[0] || "domain A"} and ${answers.domains[1] || "domain B"}`, resources: [
          { title: "Interdisciplinary Skills (HBR)", url: "https://hbr.org/topic/career-planning", type: "article" as const },
          { title: "Udemy – Cross-Skill Courses", url: "https://www.udemy.com", type: "course" as const },
        ]},
        { text: "Publish work samples or open-source contributions", resources: [
          { title: "GitHub – Getting Started", url: "https://docs.github.com/en/get-started", type: "tool" as const },
          { title: "Dev.to Community", url: "https://dev.to", type: "community" as const },
        ]},
      ],
    },
    {
      phase: "Phase 3", title: "Network & Apply",
      duration: isIntense ? "Weeks 7–10" : "Weeks 13–20",
      status: "upcoming" as const, icon: Users,
      tasks: [
        { text: "Join communities in your hybrid career space", resources: [
          { title: "Discord Career Communities", url: "https://discord.com", type: "community" as const },
          { title: "Reddit Career Subreddits", url: "https://www.reddit.com/r/careerguidance", type: "community" as const },
          { title: "Meetup.com", url: "https://www.meetup.com", type: "community" as const },
        ]},
        { text: "Seek mentorship or informational interviews", resources: [
          { title: "ADPList – Free Mentorship", url: "https://adplist.org", type: "community" as const },
          { title: "How to Ask for Informational Interviews", url: "https://hbr.org/2016/02/how-to-get-the-most-out-of-an-informational-interview", type: "article" as const },
        ]},
        { text: `Tailor resume for ${answers.expertVsVersatile === "expert" ? "specialist" : "cross-functional"} roles`, resources: [
          { title: "Resume Worded", url: "https://resumeworded.com", type: "tool" as const },
          { title: "Harvard Resume Guide (PDF)", url: "https://hwpi.harvard.edu/files/ocs/files/hes-resume-cover-letter-guide.pdf", type: "article" as const },
        ]},
      ],
    },
    {
      phase: "Phase 4", title: "Launch & Iterate",
      duration: isIntense ? "Weeks 11–14" : "Weeks 21–30",
      status: "upcoming" as const, icon: Trophy,
      tasks: [
        { text: "Apply to target roles or freelance gigs", resources: [
          { title: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs", type: "tool" as const },
          { title: "Wellfound (AngelList)", url: "https://wellfound.com", type: "tool" as const },
          { title: "Toptal Freelancing", url: "https://www.toptal.com", type: "tool" as const },
        ]},
        { text: "Negotiate offers aligned with your core values", resources: [
          { title: "Salary Negotiation Guide (Glassdoor)", url: "https://www.glassdoor.com/blog/guide/how-to-negotiate-your-salary/", type: "article" as const },
          { title: "Levels.fyi – Compensation Data", url: "https://www.levels.fyi", type: "tool" as const },
        ]},
        { text: "Set up quarterly career check-ins using your burnout tracker", resources: [
          { title: "Quarterly Review Template", url: "https://www.notion.so/templates/categories/personal", type: "tool" as const },
          { title: "Burnout Prevention (WHO)", url: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases", type: "article" as const },
        ]},
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
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(46 65% 52% / 0.6), hsl(258 51% 52% / 0.6), transparent)" }} />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(46 65% 52% / 0.2), hsl(258 51% 52% / 0.2))" }}>
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-lg">Your Career Roadmap</h3>
          <p className="text-xs text-muted-foreground">
            Personalized path based on {answers.hoursPerWeek} hrs/week • {answers.learningStyle} learner
          </p>
        </div>
      </div>

      <div className="relative">
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
                  isCurrent ? "bg-primary/5 border border-primary/20" : "bg-muted/10 border border-transparent hover:border-border hover:bg-muted/20"
                }`}
              >
                <div className="shrink-0 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCurrent ? "bg-gradient-to-br from-primary to-secondary" : "bg-muted/40 border border-border"
                  }`} style={isCurrent ? { boxShadow: "0 0 20px hsl(46 65% 52% / 0.3)" } : {}}>
                    <StepIcon className={`w-5 h-5 ${isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-display font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                      isCurrent ? "bg-primary/20 text-primary" : "bg-muted/40 text-muted-foreground"
                    }`}>{step.phase}</span>
                    <h4 className="font-display font-semibold text-foreground text-sm">{step.title}</h4>
                    <span className="text-[10px] text-muted-foreground ml-auto">{step.duration}</span>
                  </div>

                  <ul className="space-y-3 mt-2">
                    {step.tasks.map((task, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + i * 0.15 + j * 0.05 }}
                      >
                        <div className="flex items-start gap-2 text-xs mb-1.5">
                          {isCurrent ? (
                            <ArrowRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          ) : (
                            <Circle className="w-3 h-3 text-muted-foreground/40 mt-0.5 shrink-0" />
                          )}
                          <span className={isCurrent ? "text-foreground/90" : "text-muted-foreground"}>{task.text}</span>
                        </div>
                        {/* Resources */}
                        <div className="ml-5 flex flex-wrap gap-1.5">
                          {task.resources.map((r) => (
                            <a
                              key={r.title}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all hover:scale-105 hover:brightness-125 ${typeColors[r.type]}`}
                            >
                              <ExternalLink className="w-2.5 h-2.5" />
                              {r.title}
                            </a>
                          ))}
                        </div>
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
