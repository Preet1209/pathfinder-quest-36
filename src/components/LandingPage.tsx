import { motion } from "framer-motion";
import { ArrowRight, Zap, Brain, Target, Flame, Sparkles } from "lucide-react";

interface Props {
  onStart: () => void;
}

const features = [
  { icon: Target, label: "Skill Gap Simulator", desc: "Find exactly what skills to build next" },
  { icon: Brain, label: "Career DNA Profiling", desc: "Discover your unique career personality" },
  { icon: Zap, label: "Decision Engine", desc: "Understand why careers fit you" },
  { icon: Sparkles, label: "Hybrid Career Paths", desc: "Explore interdisciplinary opportunities" },
  { icon: Flame, label: "Burnout Tracker", desc: "Stay productive without burning out" },
];

export const LandingPage = ({ onStart }: Props) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: "var(--gradient-hero)" }} />
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-display font-semibold tracking-widest uppercase text-sm mb-4">
              Career Intelligence Platform
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6">
              Your career path,
              <br />
              <span className="text-accent">decoded.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-body">
              Answer 10 questions in under 5 minutes. Get a personalized career roadmap powered by your values, skills, and goals.
            </p>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-lg bg-primary text-primary-foreground hover:opacity-90 transition-all animate-pulse-glow"
            >
              Start Your Assessment <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features preview */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-card rounded-xl p-5 text-center"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <f.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="font-display font-semibold text-foreground text-sm">{f.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
