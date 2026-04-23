import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Zap, CheckCircle2, XCircle, ArrowRight, Scale, Lightbulb } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { computeLogicProfile } from "@/lib/logic";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  dna: string[];
  archetype: string;
}

export const DecisionEngineDetail = ({ open, onOpenChange, dna, archetype }: Props) => {
  const { answers } = useQuiz();
  const logic = computeLogicProfile(answers);

  const ageLabel = { "under-18": "Under 18", "18-24": "18–24", "25-34": "25–34", "35-44": "35–44", "45+": "45+" }[answers.ageRange] || answers.ageRange;
  const qualLabel = { "high-school": "High School", "diploma": "Diploma", "bachelors": "Bachelor's", "masters": "Master's", "phd": "PhD", "self-taught": "Self-Taught" }[answers.qualification] || answers.qualification;

  const hasLinkedin = !!answers.linkedinUrl?.trim();
  const hasGithub = !!answers.githubUrl?.trim();
  const profileSignal = hasLinkedin && hasGithub
    ? "Strong external signal — both LinkedIn and GitHub linked"
    : hasLinkedin
    ? "LinkedIn linked — professional history weighted in"
    : hasGithub
    ? "GitHub linked — technical/builder signal weighted in"
    : "No external profiles linked — using quiz-only signals";

  const factors = [
    {
      factor: "Age & Career Stage",
      signal: `${ageLabel} • ${answers.journeyStage || "Exploring"}`,
      impact: answers.ageRange === "under-18" || answers.ageRange === "18-24"
        ? "You have maximum time flexibility. Explore broadly now, specialize later. Internships and side projects are your best investment."
        : answers.ageRange === "25-34"
        ? "Prime career-building years. Strategic pivots are still low-risk, and your experience adds credibility to new directions."
        : answers.ageRange === "35-44"
        ? "Your experience is a major asset. Focus on leveraging existing expertise while branching into adjacent areas."
        : "Deep experience commands premium value. Advisory, consulting, and mentorship roles maximize your knowledge capital.",
      weight: 80,
      positive: true,
    },
    {
      factor: "Education & Qualification",
      signal: qualLabel,
      impact: answers.qualification === "phd" || answers.qualification === "masters"
        ? "Your advanced education opens doors to research, leadership, and specialized roles that require deep academic credentials."
        : answers.qualification === "bachelors"
        ? "A solid academic foundation. Supplement with certifications and projects to stand out in competitive fields."
        : answers.qualification === "self-taught"
        ? "Your non-traditional path shows initiative. Portfolio and demonstrated skills matter more than credentials for you."
        : "Practical skills and certifications can accelerate your career. Consider targeted courses to fill specific gaps.",
      weight: 75,
      positive: true,
    },
    {
      factor: "Work Style Alignment",
      signal: answers.stabilityVsFlexibility === "stability" ? "Prefers structure" : "Prefers flexibility",
      impact: answers.stabilityVsFlexibility === "stability"
        ? "Careers with defined progression (corporate, government, academia) will feel safer and more motivating."
        : "Careers with fluid roles (startups, freelancing, consulting) will keep you energized.",
      weight: 85,
      positive: true,
    },
    {
      factor: "Collaboration Preference",
      signal: answers.independentVsCollaborative === "independent" ? "Independent worker" : "Collaborative worker",
      impact: answers.independentVsCollaborative === "independent"
        ? "Solo contributor roles, remote work, and research positions align with your natural energy."
        : "Team-based environments, management tracks, and client-facing roles suit you best.",
      weight: 78,
      positive: true,
    },
    {
      factor: "Depth vs Breadth",
      signal: answers.expertVsVersatile === "expert" ? "Deep specialist" : "Versatile generalist",
      impact: answers.expertVsVersatile === "expert"
        ? "Specializing in one area builds authority and commands premium compensation."
        : "Cross-functional roles like product management or consulting leverage your breadth.",
      weight: 72,
      positive: true,
    },
    {
      factor: "Value Alignment",
      signal: `Top value: ${answers.valuesRanking[0]?.charAt(0).toUpperCase()}${answers.valuesRanking[0]?.slice(1) || "N/A"}`,
      impact: `Your primary value of "${answers.valuesRanking[0]}" means you'll feel most fulfilled in roles where this is central to the mission, not just a perk.`,
      weight: 95,
      positive: true,
    },
    {
      factor: "Burnout Risk Check",
      signal: `Overwhelm: ${answers.stressLevels.overwhelm}%`,
      impact: answers.stressLevels.overwhelm > 60
        ? "High stress suggests avoiding high-pressure environments initially. Build resilience before taking on demanding roles."
        : "Your manageable stress levels mean you can handle challenging transitions.",
      weight: 65,
      positive: answers.stressLevels.overwhelm <= 60,
    },
    {
      factor: "Learning Capacity",
      signal: `${answers.hoursPerWeek} hrs/week available`,
      impact: answers.hoursPerWeek === "20+" || answers.hoursPerWeek === "10-20"
        ? "Your significant time investment enables aggressive upskilling. You can target roles requiring substantial skill pivots."
        : "With limited hours, focus on adjacent skills that build on existing strengths rather than complete pivots.",
      weight: 70,
      positive: true,
    },
    {
      factor: "Profile Signals (LinkedIn / GitHub)",
      signal: profileSignal,
      impact: hasLinkedin && hasGithub
        ? "Dual signals confirm both your professional trajectory and hands-on building. Recommendations lean toward hybrid technical-leadership roles where both matter."
        : hasLinkedin
        ? "Your LinkedIn anchors recommendations to industries adjacent to your stated experience — pivots stay realistic and credible."
        : hasGithub
        ? "Your GitHub activity boosts confidence in technical recommendations — engineering, open-source, and builder-led careers rank higher."
        : "Without profile data, we rely fully on your self-reported answers. Add profiles later to refine the analysis.",
      weight: hasLinkedin || hasGithub ? 60 : 25,
      positive: hasLinkedin || hasGithub,
    },
    {
      factor: "Logical Reasoning (Cognition)",
      signal: `${logic.band} • ${logic.score}/100 • ${Math.round(logic.accuracy * 100)}% accuracy, ${Math.round(logic.speed * 100)}% speed`,
      impact: logic.band === "Sharp"
        ? "High-speed accurate reasoning lifts the priority of analytical, technical, and quantitative roles in your recommendations."
        : logic.band === "Solid"
        ? "Reliable reasoning broadens your fit — analytical and judgment-heavy roles both score well."
        : logic.band === "Developing"
        ? "We've reduced the weight of pure-analysis roles and favor recommendations where domain knowledge or interpersonal strengths dominate."
        : "Cognition section incomplete — recommendations rely on self-reported signals only.",
      weight: logic.band === "Untested" ? 20 : 70,
      positive: logic.band !== "Developing",
    },
  ];

  const whyThisArchetype = [
    `Your combination of ${dna.join(" + ")} traits creates the "${archetype}" profile.`,
    `This archetype emerges when ${answers.valuesRanking[0]} and ${answers.valuesRanking[1] || "growth"} are prioritized together.`,
    `As a ${answers.learningStyle} learner with ${answers.hoursPerWeek} hrs/week, you'll progress fastest in roles that match this archetype.`,
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto card-glass border-border bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <Zap className="w-5 h-5 text-crimson" />
            Decision Engine
          </DialogTitle>
          <DialogDescription>Understanding why these careers were recommended for you</DialogDescription>
        </DialogHeader>

        {/* Why this archetype */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-border relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(340 82% 52% / 0.08), hsl(230 22% 13%))" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <p className="text-sm font-display font-semibold text-foreground">Why "{archetype}"?</p>
          </div>
          <ul className="space-y-2">
            {whyThisArchetype.map((reason, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm text-foreground/80 flex items-start gap-2"
              >
                <ArrowRight className="w-3 h-3 text-primary mt-1 shrink-0" />
                {reason}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Decision Factors */}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <Scale className="w-4 h-4 text-secondary" /> Decision Factors Analyzed
          </h3>
          <div className="space-y-3">
            {factors.map((f, i) => (
              <motion.div
                key={f.factor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl bg-muted/15 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {f.positive ? (
                      <CheckCircle2 className="w-4 h-4 text-sage" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <span className="font-display font-semibold text-sm text-foreground">{f.factor}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted/30 text-muted-foreground font-display">
                    Weight: {f.weight}%
                  </span>
                </div>
                <p className="text-xs text-primary font-medium mb-1.5">Signal: {f.signal}</p>
                <p className="text-xs text-foreground/70">{f.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl border border-primary/20 bg-primary/5"
        >
          <p className="text-xs uppercase tracking-wider text-primary font-display mb-2">Bottom Line</p>
          <p className="text-sm text-foreground/80">
            Based on {factors.length} analyzed factors, your profile strongly aligns with{" "}
            <span className="text-primary font-semibold">{archetype}</span> career paths.
            Your strongest signal is <span className="text-primary font-semibold">Value Alignment</span> (95% weight),
            driven by your prioritization of {answers.valuesRanking[0]}.
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
