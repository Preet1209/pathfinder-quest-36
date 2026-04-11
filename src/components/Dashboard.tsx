import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Target, Brain, Zap, Sparkles, Flame, TrendingUp, ChevronRight } from "lucide-react";

const getCareerDNA = (answers: ReturnType<typeof useQuiz>["answers"]) => {
  const traits: string[] = [];
  if (answers.stabilityVsFlexibility === "stability") traits.push("Structured");
  else traits.push("Adaptive");
  if (answers.independentVsCollaborative === "independent") traits.push("Self-Driven");
  else traits.push("Team-Oriented");
  if (answers.expertVsVersatile === "expert") traits.push("Specialist");
  else traits.push("Generalist");
  return traits;
};

const getArchetype = (answers: ReturnType<typeof useQuiz>["answers"]) => {
  const v = answers.valuesRanking;
  if (v.includes("creativity") && v.includes("autonomy")) return "Creative Maverick";
  if (v.includes("impact") && v.includes("mastery")) return "Purpose-Driven Expert";
  if (v.includes("wealth") && v.includes("mastery")) return "Strategic Achiever";
  if (v.includes("balance") && v.includes("creativity")) return "Mindful Creator";
  if (v.includes("impact") && v.includes("autonomy")) return "Independent Changemaker";
  return "Versatile Explorer";
};

const getBurnoutRisk = (stress: { overwhelm: number; detachment: number; excitement: number }) => {
  const score = (stress.overwhelm + stress.detachment + (100 - stress.excitement)) / 3;
  if (score > 65) return { level: "High", color: "text-destructive", advice: "Consider reducing workload and adding recovery routines." };
  if (score > 40) return { level: "Moderate", color: "text-amber", advice: "Monitor your energy levels and take regular breaks." };
  return { level: "Low", color: "text-sage", advice: "You're in a good place! Keep maintaining your balance." };
};

export const Dashboard = () => {
  const { answers } = useQuiz();
  const dna = getCareerDNA(answers);
  const archetype = getArchetype(answers);
  const burnout = getBurnoutRisk(answers.stressLevels);

  const hybridCareers = [
    { title: "UX Researcher + Data Analyst", match: 92 },
    { title: "Product Manager + Developer", match: 87 },
    { title: "Content Strategist + Growth Marketer", match: 84 },
    { title: "Design Engineer", match: 81 },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-accent font-display font-semibold tracking-widest uppercase text-xs mb-1">Your Results</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            You're a <span className="text-accent">{archetype}</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body">Based on your values, style, and goals — here's your personalized career intelligence.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Career DNA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 col-span-1" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-foreground">Career DNA</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {dna.map((t) => (
                <span key={t} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">{t}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Your top values: {answers.valuesRanking.map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(", ")}
            </p>
          </motion.div>

          {/* Skill Gap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-foreground">Skill Gap Simulator</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Goal: <span className="text-foreground font-medium">{answers.desiredSkill || "Not specified"}</span>
            </p>
            <div className="space-y-2">
              {answers.domains.slice(0, 3).map((d) => (
                <div key={d} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{d}</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${Math.floor(Math.random() * 40 + 40)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Pacing: {answers.hoursPerWeek} hrs/week • {answers.learningStyle} learning
            </p>
          </motion.div>

          {/* Burnout Tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-foreground">Burnout Tracker</h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-2xl font-display font-bold ${burnout.color}`}>{burnout.level}</span>
              <span className="text-xs text-muted-foreground">risk level</span>
            </div>
            <div className="space-y-2 mb-3">
              {(["overwhelm", "detachment", "excitement"] as const).map((k) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">{k}</span>
                  <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${answers.stressLevels[k]}%` }} />
                  </div>
                  <span className="text-xs text-foreground w-8 text-right">{answers.stressLevels[k]}%</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{burnout.advice}</p>
          </motion.div>

          {/* Hybrid Careers */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-6 md:col-span-2" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-foreground">Hybrid Career Suggestions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hybridCareers.map((c) => (
                <div key={c.title} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent font-semibold">{c.match}% match</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Decision Engine */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-foreground">Decision Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Why these recommendations fit you:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span className="text-foreground">Your {dna[0].toLowerCase()} work style aligns with roles that offer {answers.stabilityVsFlexibility === "stability" ? "clear progression" : "variety and change"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span className="text-foreground">As a {dna[2].toLowerCase()}, {answers.expertVsVersatile === "expert" ? "deep domain expertise" : "cross-functional roles"} suit you best</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span className="text-foreground">Your value of {answers.valuesRanking[0]} drives career satisfaction most</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
