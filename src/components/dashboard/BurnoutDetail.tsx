import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Flame, AlertTriangle, TrendingDown, Zap, Heart, Coffee, Moon, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const getDetailedBurnout = (stress: { overwhelm: number; detachment: number; excitement: number }) => {
  const score = (stress.overwhelm + stress.detachment + (100 - stress.excitement)) / 3;

  const dimensions = [
    {
      key: "overwhelm" as const,
      label: "Overwhelm",
      value: stress.overwhelm,
      icon: AlertTriangle,
      desc: stress.overwhelm > 60
        ? "You're carrying a heavy cognitive load. Your brain is processing more than it can sustainably handle."
        : stress.overwhelm > 35
        ? "Your workload is manageable but approaching the upper limit. Stay vigilant."
        : "Your cognitive load is well-managed. You have capacity for new challenges.",
      tips: stress.overwhelm > 50
        ? ["Break tasks into 25-min focus blocks (Pomodoro)", "Practice brain dumps — write everything down", "Say no to one commitment this week"]
        : ["Maintain your current pacing", "Use buffer time between tasks", "Keep a priority journal"],
    },
    {
      key: "detachment" as const,
      label: "Detachment",
      value: stress.detachment,
      icon: TrendingDown,
      desc: stress.detachment > 60
        ? "You're emotionally disconnecting from your work. This is a significant burnout warning sign."
        : stress.detachment > 35
        ? "You sometimes feel disconnected. Reconnecting with your 'why' can help."
        : "You feel engaged and connected to your work. This is a strong protective factor.",
      tips: stress.detachment > 50
        ? ["Revisit your core values and career purpose", "Connect with a mentor or peer group", "Take a meaningful project outside of work"]
        : ["Schedule regular reflection time", "Celebrate small wins weekly", "Share progress with someone you trust"],
    },
    {
      key: "excitement" as const,
      label: "Excitement",
      value: stress.excitement,
      icon: Zap,
      desc: stress.excitement > 60
        ? "You still feel energized about your path. This is your strongest burnout shield."
        : stress.excitement > 35
        ? "Your enthusiasm is wavering. Injecting novelty can reignite your spark."
        : "Low excitement is a critical signal. You may need a significant change in direction or environment.",
      tips: stress.excitement < 50
        ? ["Try a completely new skill for 1 week", "Attend an inspiring talk or conference", "Revisit what first excited you about this field"]
        : ["Feed your curiosity with side projects", "Set stretch goals that challenge you", "Document what energizes you most"],
    },
  ];

  const overallRisk =
    score > 65 ? { level: "High", color: "text-destructive", bg: "bg-destructive/20", percentage: Math.round(score) } :
    score > 40 ? { level: "Moderate", color: "text-secondary", bg: "bg-secondary/20", percentage: Math.round(score) } :
    { level: "Low", color: "text-sage", bg: "bg-sage/20", percentage: Math.round(score) };

  const weeklyPlan = score > 50
    ? [
        { day: "Mon", action: "10-min morning meditation", icon: Moon },
        { day: "Wed", action: "30-min nature walk (no phone)", icon: Heart },
        { day: "Fri", action: "Reflect & journal wins of the week", icon: Coffee },
        { day: "Sun", action: "Plan next week with energy mapping", icon: Activity },
      ]
    : [
        { day: "Mon", action: "Set 3 priority intentions", icon: Activity },
        { day: "Wed", action: "Midweek check-in with yourself", icon: Heart },
        { day: "Fri", action: "Celebrate progress & disconnect", icon: Coffee },
        { day: "Sun", action: "Light planning for the week ahead", icon: Moon },
      ];

  return { dimensions, overallRisk, weeklyPlan };
};

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const BurnoutDetail = ({ open, onOpenChange }: Props) => {
  const { answers } = useQuiz();
  const { dimensions, overallRisk, weeklyPlan } = getDetailedBurnout(answers.stressLevels);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto card-glass border-border bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <Flame className="w-5 h-5 text-crimson" />
            Burnout Tracker & Predictor
          </DialogTitle>
          <DialogDescription>Deep analysis of your stress patterns and recovery strategies</DialogDescription>
        </DialogHeader>

        {/* Overall Risk Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-border text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(46 65% 52% / 0.05), hsl(210 22% 14%))" }}
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-display mb-3">Overall Burnout Risk</p>
          <div className="relative w-32 h-32 mx-auto mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(220 15% 20%)" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none"
                stroke={overallRisk.level === "High" ? "hsl(46 65% 52%)" : overallRisk.level === "Moderate" ? "hsl(258 51% 52%)" : "hsl(150 60% 40%)"}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${overallRisk.percentage * 3.27} 327`}
                initial={{ strokeDasharray: "0 327" }}
                animate={{ strokeDasharray: `${overallRisk.percentage * 3.27} 327` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-display font-bold ${overallRisk.color}`}>{overallRisk.percentage}%</span>
              <span className="text-[10px] text-muted-foreground uppercase">{overallRisk.level} risk</span>
            </div>
          </div>
        </motion.div>

        {/* Three Dimensions */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground text-sm">Stress Dimensions</h3>
          {dimensions.map((dim, i) => {
            const Icon = dim.icon;
            return (
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-muted/15 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-display font-semibold text-sm text-foreground">{dim.label}</span>
                  </div>
                  <span className="text-lg font-display font-bold text-foreground">{dim.value}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: dim.key === "excitement"
                        ? `linear-gradient(90deg, hsl(0 70% 50%), hsl(150 60% 40%))`
                        : `linear-gradient(90deg, hsl(150 60% 40%), hsl(46 65% 52%))`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.value}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                </div>
                <p className="text-xs text-foreground/70 mb-3">{dim.desc}</p>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-display">Recommendations</p>
                  <ul className="space-y-1">
                    {dim.tips.map(tip => (
                      <li key={tip} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />{tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Weekly Recovery Plan */}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Suggested Weekly Recovery Plan</h3>
          <div className="grid grid-cols-2 gap-2">
            {weeklyPlan.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="p-3 rounded-lg bg-muted/10 border border-border"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-primary font-display">{item.day}</span>
                  </div>
                  <p className="text-xs text-foreground/70">{item.action}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
