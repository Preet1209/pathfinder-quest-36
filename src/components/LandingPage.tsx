import { motion } from "framer-motion";
import { ArrowRight, Zap, Brain, Target, Flame, Sparkles, ChevronDown } from "lucide-react";

interface Props {
  onStart: () => void;
}

const features = [
  { icon: Target, label: "Skill Gap Simulator", desc: "Find exactly what skills to build next", delay: 0.3 },
  { icon: Brain, label: "Career DNA Profiling", desc: "Discover your unique career personality", delay: 0.4 },
  { icon: Zap, label: "Decision Engine", desc: "Understand why careers fit you", delay: 0.5 },
  { icon: Sparkles, label: "Hybrid Career Paths", desc: "Explore interdisciplinary opportunities", delay: 0.6 },
  { icon: Flame, label: "Burnout Tracker", desc: "Stay productive without burning out", delay: 0.7 },
];

export const LandingPage = ({ onStart }: Props) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(340 82% 52%)" }} />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: "hsl(265 60% 50%)" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(230 40% 30%)" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(hsl(220 20% 92%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 20% 92%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border mb-8"
            style={{ background: "linear-gradient(135deg, hsl(230 22% 11% / 0.8), hsl(340 82% 52% / 0.1))" }}
          >
            <span className="w-2 h-2 rounded-full bg-primary glow-dot" />
            <span className="text-xs font-display font-medium text-muted-foreground tracking-wider uppercase">Career Intelligence Platform</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
            <span className="text-foreground">Your career path,</span>
            <br />
            <span className="text-gradient">decoded.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-12 font-body leading-relaxed">
            Answer 10 questions in under 5 minutes. Get a personalized career roadmap powered by your values, skills, and ambitions.
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-display font-bold text-lg text-primary-foreground overflow-hidden animate-pulse-glow"
            style={{ background: "var(--gradient-crimson)" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Your Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground mx-auto animate-float" />
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs font-display font-semibold text-muted-foreground tracking-widest uppercase mb-8"
        >
          What you'll unlock
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: f.delay, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-glass rounded-2xl p-5 text-center group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: i % 2 === 0 ? "hsl(340 82% 52% / 0.15)" : "hsl(265 60% 50% / 0.15)" }}>
                <f.icon className={`w-6 h-6 ${i % 2 === 0 ? "text-crimson" : "text-purple"}`} />
              </div>
              <p className="font-display font-semibold text-foreground text-sm mb-1">{f.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
