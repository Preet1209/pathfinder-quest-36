import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Target, Brain, Zap, Sparkles, Flame, TrendingUp, ChevronRight, Shield } from "lucide-react";

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
  if (score > 65) return { level: "High", color: "text-destructive", bar: "bg-destructive", advice: "Consider reducing workload and adding recovery routines." };
  if (score > 40) return { level: "Moderate", color: "text-secondary", bar: "bg-secondary", advice: "Monitor your energy levels and take regular breaks." };
  return { level: "Low", color: "text-sage", bar: "bg-sage", advice: "You're in a good place! Keep maintaining your balance." };
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
    <div className="min-h-screen bg-background px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]" style={{ background: "hsl(340 82% 52%)" }} />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(265 60% 50%)" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border mb-4" style={{ background: "hsl(230 22% 11% / 0.8)" }}>
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase">Analysis Complete</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2">
            You're a <span className="text-gradient">{archetype}</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">Here's your personalized career intelligence powered by your unique profile.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Career DNA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(265 60% 50% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(265 60% 50% / 0.2)" }}>
                <Brain className="w-4 h-4 text-purple" />
              </div>
              <h3 className="font-display font-bold text-foreground">Career DNA</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {dna.map((t) => (
                <span key={t} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground border border-border">{t}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Top values: <span className="text-foreground">{answers.valuesRanking.map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(", ")}</span>
            </p>
          </motion.div>

          {/* Skill Gap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(340 82% 52% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(340 82% 52% / 0.2)" }}>
                <Target className="w-4 h-4 text-crimson" />
              </div>
              <h3 className="font-display font-bold text-foreground">Skill Gap Simulator</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Goal: <span className="text-foreground font-medium">{answers.desiredSkill || "Not specified"}</span>
            </p>
            <div className="space-y-3">
              {answers.domains.slice(0, 3).map((d, i) => {
                const pct = [72, 55, 45][i] || 50;
                return (
                  <div key={d}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground">{d}</span>
                      <span className="text-xs text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-crimson)" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">
              {answers.hoursPerWeek} hrs/week • {answers.learningStyle} learner
            </p>
          </motion.div>

          {/* Burnout Tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(340 82% 52% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(340 82% 52% / 0.2)" }}>
                <Flame className="w-4 h-4 text-crimson" />
              </div>
              <h3 className="font-display font-bold text-foreground">Burnout Tracker</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className={`text-3xl font-display font-bold ${burnout.color}`}>{burnout.level}</span>
              <span className="text-xs text-muted-foreground">risk</span>
            </div>
            <div className="space-y-2.5 mb-3">
              {(["overwhelm", "detachment", "excitement"] as const).map((k) => (
                <div key={k}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground capitalize">{k}</span>
                    <span className="text-xs text-foreground font-medium">{answers.stressLevels[k]}%</span>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${answers.stressLevels[k]}%` }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{burnout.advice}</p>
          </motion.div>

          {/* Hybrid Careers */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="card-glass rounded-2xl p-6 md:col-span-2 relative overflow-hidden hover:border-primary/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(265 60% 50% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(265 60% 50% / 0.2)" }}>
                <Sparkles className="w-4 h-4 text-purple" />
              </div>
              <h3 className="font-display font-bold text-foreground">Hybrid Career Suggestions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hybridCareers.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 hover:bg-muted/70 transition-all cursor-pointer group border border-transparent hover:border-border"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary font-bold">{c.match}% match</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decision Engine */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="card-glass rounded-2xl p-6 relative overflow-hidden hover:border-primary/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(340 82% 52% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(340 82% 52% / 0.2)" }}>
                <Zap className="w-4 h-4 text-crimson" />
              </div>
              <h3 className="font-display font-bold text-foreground">Decision Engine</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-display">Why these fit you</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 glow-dot" />
                <span className="text-foreground/80">Your {dna[0].toLowerCase()} style aligns with {answers.stabilityVsFlexibility === "stability" ? "clear progression paths" : "dynamic, varied roles"}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" style={{ boxShadow: "0 0 8px hsl(265 60% 50% / 0.6)" }} />
                <span className="text-foreground/80">As a {dna[2].toLowerCase()}, {answers.expertVsVersatile === "expert" ? "deep domain expertise" : "cross-functional roles"} suit you</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 glow-dot" />
                <span className="text-foreground/80">Your core value of <span className="text-primary font-medium">{answers.valuesRanking[0]}</span> drives satisfaction most</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
