import { useState } from "react";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Target, Brain, Zap, Sparkles, Flame, TrendingUp, ChevronRight, Shield, Linkedin, Github, Puzzle } from "lucide-react";
import { Roadmap } from "./dashboard/Roadmap";
import { CareerDNADetail } from "./dashboard/CareerDNADetail";
import { BurnoutDetail } from "./dashboard/BurnoutDetail";
import { DecisionEngineDetail } from "./dashboard/DecisionEngineDetail";
import { computeLogicProfile } from "@/lib/logic";

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
  if (score > 65) return { level: "High", color: "text-destructive" };
  if (score > 40) return { level: "Moderate", color: "text-secondary" };
  return { level: "Low", color: "text-sage" };
};

export const Dashboard = () => {
  const { answers } = useQuiz();
  const dna = getCareerDNA(answers);
  const archetype = getArchetype(answers);
  const burnout = getBurnoutRisk(answers.stressLevels);
  const logic = computeLogicProfile(answers);

  const [dnaOpen, setDnaOpen] = useState(false);
  const [burnoutOpen, setBurnoutOpen] = useState(false);
  const [decisionOpen, setDecisionOpen] = useState(false);

  const hybridCareers = [
    { title: "UX Researcher + Data Analyst", match: 92 },
    { title: "Product Manager + Developer", match: 87 },
    { title: "Content Strategist + Growth Marketer", match: 84 },
    { title: "Design Engineer", match: 81 },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[140px]" style={{ background: "hsl(340 82% 52%)" }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "hsl(265 60% 50%)" }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "hsl(230 60% 40%)" }} />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "linear-gradient(hsl(220 20% 92%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 20% 92%) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border mb-4"
            style={{ background: "linear-gradient(135deg, hsl(230 22% 11% / 0.8), hsl(340 82% 52% / 0.08))" }}>
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase">Analysis Complete</span>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2">
            You're a <span className="text-gradient">{archetype}</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            Click any card below to explore your personalized insights in detail.
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
            {answers.ageRange && (
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted/20 text-muted-foreground">
                Age: {{ "under-18": "<18", "18-24": "18–24", "25-34": "25–34", "35-44": "35–44", "45+": "45+" }[answers.ageRange] || answers.ageRange}
              </span>
            )}
            {answers.qualification && (
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted/20 text-muted-foreground">
                {{ "high-school": "High School", "diploma": "Diploma", "bachelors": "Bachelor's", "masters": "Master's", "phd": "PhD", "self-taught": "Self-Taught" }[answers.qualification] || answers.qualification}
              </span>
            )}
            {answers.journeyStage && (
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted/20 text-muted-foreground">
                {answers.journeyStage}
              </span>
            )}
            {answers.linkedinUrl && (
              <a href={answers.linkedinUrl.startsWith("http") ? answers.linkedinUrl : `https://${answers.linkedinUrl}`}
                 target="_blank" rel="noreferrer noopener"
                 className="px-3 py-1 rounded-full text-xs font-medium border border-secondary/40 bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors inline-flex items-center gap-1.5">
                <Linkedin className="w-3 h-3" /> LinkedIn linked
              </a>
            )}
            {answers.githubUrl && (
              <a href={answers.githubUrl.startsWith("http") ? answers.githubUrl : `https://${answers.githubUrl}`}
                 target="_blank" rel="noreferrer noopener"
                 className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition-colors inline-flex items-center gap-1.5">
                <Github className="w-3 h-3" /> GitHub linked
              </a>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Career DNA — clickable */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            onClick={() => setDnaOpen(true)}
            className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(265_60%_50%/0.1)] cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(265 60% 50% / 0.5), transparent)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(265 60% 50% / 0.05), transparent 70%)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(265 60% 50% / 0.2)" }}>
                <Brain className="w-4 h-4 text-purple" />
              </div>
              <h3 className="font-display font-bold text-foreground">Career DNA</h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {dna.map((t, i) => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium text-foreground border border-border"
                  style={{ background: "linear-gradient(135deg, hsl(230 22% 13%), hsl(265 30% 18%))" }}>{t}</span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Tap to explore your full profile, traits & ideal environments →
            </p>
          </motion.div>

          {/* Skill Gap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(340_82%_52%/0.1)]">
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
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: "var(--gradient-crimson)" }}
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: "easeOut" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">{answers.hoursPerWeek} hrs/week • {answers.learningStyle} learner</p>
          </motion.div>

          {/* Burnout Tracker — clickable */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            onClick={() => setBurnoutOpen(true)}
            className="card-glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(340_82%_52%/0.1)] cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(340 82% 52% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(340 82% 52% / 0.2)" }}>
                <Flame className="w-4 h-4 text-crimson" />
              </div>
              <h3 className="font-display font-bold text-foreground">Burnout Tracker</h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                className={`text-3xl font-display font-bold ${burnout.color}`}>{burnout.level}</motion.span>
              <span className="text-xs text-muted-foreground">risk</span>
            </div>
            <div className="space-y-2 mb-2">
              {(["overwhelm", "detachment", "excitement"] as const).map((k) => (
                <div key={k}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs text-muted-foreground capitalize">{k}</span>
                    <span className="text-xs text-foreground font-medium">{answers.stressLevels[k]}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ background: k === "excitement" ? "var(--gradient-crimson)" : "hsl(var(--primary))" }}
                      initial={{ width: 0 }} animate={{ width: `${answers.stressLevels[k]}%` }}
                      transition={{ delay: 0.6, duration: 0.6 }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Tap for detailed analysis & recovery plan →</p>
          </motion.div>

          {/* Hybrid Careers */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="card-glass rounded-2xl p-6 md:col-span-2 relative overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(265_60%_50%/0.1)]">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(265 60% 50% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(265 60% 50% / 0.2)" }}>
                <Sparkles className="w-4 h-4 text-purple" />
              </div>
              <h3 className="font-display font-bold text-foreground">Hybrid Career Suggestions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hybridCareers.map((c, i) => (
                <motion.div key={c.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }} whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group/card border border-transparent hover:border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-xs font-bold" style={{ background: "var(--gradient-crimson)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{c.match}% match</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/card:text-foreground group-hover/card:translate-x-0.5 transition-all" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decision Engine — clickable */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            onClick={() => setDecisionOpen(true)}
            className="card-glass rounded-2xl p-6 relative overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_hsl(340_82%_52%/0.1)] cursor-pointer group">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(340 82% 52% / 0.5), transparent)" }} />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(340 82% 52% / 0.2)" }}>
                <Zap className="w-4 h-4 text-crimson" />
              </div>
              <h3 className="font-display font-bold text-foreground">Decision Engine</h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-display">Why these fit you</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 glow-dot" />
                <span className="text-foreground/80">Your {dna[0].toLowerCase()} style aligns with {answers.stabilityVsFlexibility === "stability" ? "clear progression paths" : "dynamic, varied roles"}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" style={{ boxShadow: "0 0 8px hsl(265 60% 50% / 0.6)" }} />
                <span className="text-foreground/80">Core value: <span className="text-primary font-medium">{answers.valuesRanking[0]}</span></span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">Tap for full decision breakdown →</p>
          </motion.div>

          {/* Roadmap */}
          <Roadmap />
        </div>
      </div>

      {/* Detail Modals */}
      <CareerDNADetail open={dnaOpen} onOpenChange={setDnaOpen} dna={dna} archetype={archetype} />
      <BurnoutDetail open={burnoutOpen} onOpenChange={setBurnoutOpen} />
      <DecisionEngineDetail open={decisionOpen} onOpenChange={setDecisionOpen} dna={dna} archetype={archetype} />
    </div>
  );
};
