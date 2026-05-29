import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { Brain, Dna, Compass, Heart, Shield, Lightbulb, Linkedin, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const getTraitDetail = (trait: string) => {
  const map: Record<string, { desc: string; strengths: string[]; blindSpots: string[] }> = {
    Structured: {
      desc: "You thrive in environments with clear expectations, defined processes, and measurable outcomes.",
      strengths: ["Reliable execution", "Long-term planning", "Risk management"],
      blindSpots: ["May resist sudden pivots", "Can over-plan before acting"],
    },
    Adaptive: {
      desc: "You excel when navigating ambiguity and can pivot quickly when circumstances change.",
      strengths: ["Thrives in startups", "Quick decision-making", "Comfortable with uncertainty"],
      blindSpots: ["May struggle with routine tasks", "Can lose focus on long-term goals"],
    },
    "Self-Driven": {
      desc: "You perform best with autonomy, setting your own pace and direction.",
      strengths: ["Deep focus work", "Self-motivation", "Independent problem-solving"],
      blindSpots: ["May under-communicate progress", "Can feel isolated without effort"],
    },
    "Team-Oriented": {
      desc: "You draw energy from collaboration and build strong interpersonal connections at work.",
      strengths: ["Conflict resolution", "Consensus building", "Cross-team alignment"],
      blindSpots: ["May over-rely on group validation", "Can struggle with solo projects"],
    },
    Specialist: {
      desc: "You find deep satisfaction in mastering a single domain and becoming the go-to expert.",
      strengths: ["Deep expertise", "Authority in your field", "High demand for niche skills"],
      blindSpots: ["Industry shifts can be risky", "May miss adjacent opportunities"],
    },
    Generalist: {
      desc: "You connect dots across disciplines, making you ideal for cross-functional and leadership roles.",
      strengths: ["Versatile problem-solving", "Broad perspective", "Adaptable to new roles"],
      blindSpots: ["May feel 'jack of all trades'", "Depth can lag behind specialists"],
    },
  };
  return map[trait] || { desc: "", strengths: [], blindSpots: [] };
};

const getArchetypeDetail = (archetype: string) => {
  const map: Record<string, { tagline: string; description: string; idealEnv: string[]; famousExamples: string[] }> = {
    "Creative Maverick": {
      tagline: "You break rules to build something new.",
      description: "Creative Mavericks combine artistic thinking with independence. You're driven by originality and resist cookie-cutter paths. You need freedom to experiment and create on your own terms.",
      idealEnv: ["Startups & indie studios", "Freelance / contract work", "R&D departments", "Creative agencies"],
      famousExamples: ["Steve Jobs", "Virgil Abloh", "Hayao Miyazaki"],
    },
    "Purpose-Driven Expert": {
      tagline: "You master skills to make a meaningful impact.",
      description: "You combine deep expertise with a desire to change the world. You're not satisfied with surface-level work — you want to be the best at something that matters.",
      idealEnv: ["Non-profits & social enterprises", "Research institutions", "Healthcare & education", "Policy & advocacy"],
      famousExamples: ["Marie Curie", "Malala Yousafzai", "Dr. Atul Gawande"],
    },
    "Strategic Achiever": {
      tagline: "You build systems that win.",
      description: "Strategic Achievers combine mastery with ambition. You think in frameworks, optimize for outcomes, and measure success quantitatively.",
      idealEnv: ["Management consulting", "Finance & investment", "Tech leadership", "Entrepreneurship"],
      famousExamples: ["Elon Musk", "Indra Nooyi", "Ray Dalio"],
    },
    "Mindful Creator": {
      tagline: "You create with intention and balance.",
      description: "You value both creative expression and personal well-being. You reject hustle culture and seek sustainable, meaningful work.",
      idealEnv: ["Design studios", "Education & coaching", "Content creation", "Wellness industry"],
      famousExamples: ["Arianna Huffington", "Bob Ross", "Marie Kondo"],
    },
    "Independent Changemaker": {
      tagline: "You forge your own path to change the world.",
      description: "You combine autonomy with a drive for social impact. You're an entrepreneur at heart who measures success by influence, not just income.",
      idealEnv: ["Social entrepreneurship", "Activism & advocacy", "Independent consulting", "Open-source communities"],
      famousExamples: ["Muhammad Yunus", "Greta Thunberg", "Aaron Swartz"],
    },
    "Versatile Explorer": {
      tagline: "You thrive at the intersection of disciplines.",
      description: "You're endlessly curious and resist being boxed in. Your superpower is connecting ideas across fields that others see as separate.",
      idealEnv: ["Product management", "Journalism & media", "Innovation labs", "Cross-functional teams"],
      famousExamples: ["Leonardo da Vinci", "Tim Ferriss", "Hedy Lamarr"],
    },
  };
  return map[archetype] || map["Versatile Explorer"];
};

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  dna: string[];
  archetype: string;
}

export const CareerDNADetail = ({ open, onOpenChange, dna, archetype }: Props) => {
  const { answers } = useQuiz();
  const archetypeInfo = getArchetypeDetail(archetype);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto card-glass border-border bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <Dna className="w-5 h-5 text-purple" />
            Career DNA Profile
          </DialogTitle>
          <DialogDescription>Your unique career personality breakdown</DialogDescription>
        </DialogHeader>

        {/* Archetype Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-border relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(258 51% 52% / 0.1), hsl(46 65% 52% / 0.05))" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20" style={{ background: "hsl(258 51% 52%)" }} />
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-display mb-1">Your Archetype</p>
          <h2 className="text-2xl font-display font-bold text-gradient mb-1">{archetype}</h2>
          <p className="text-sm text-primary italic mb-3">"{archetypeInfo.tagline}"</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{archetypeInfo.description}</p>
        </motion.div>

        {/* DNA Traits */}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple" /> Core Traits
          </h3>
          <div className="space-y-3">
            {dna.map((trait, i) => {
              const detail = getTraitDetail(trait);
              return (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-muted/20 border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">{trait}</span>
                  </div>
                  <p className="text-xs text-foreground/70 mb-3">{detail.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Strengths
                      </p>
                      {detail.strengths.map(s => (
                        <p key={s} className="text-xs text-foreground/80 flex items-center gap-1.5 mb-1">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0" />{s}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Blind Spots
                      </p>
                      {detail.blindSpots.map(s => (
                        <p key={s} className="text-xs text-foreground/80 flex items-center gap-1.5 mb-1">
                          <span className="w-1 h-1 rounded-full bg-destructive shrink-0" />{s}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ideal Environments */}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" /> Ideal Work Environments
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {archetypeInfo.idealEnv.map((env, i) => (
              <motion.div
                key={env}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="p-3 rounded-lg bg-muted/15 border border-border text-sm text-foreground/80 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />{env}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" /> Your Core Values
          </h3>
          <div className="flex gap-2 flex-wrap">
            {answers.valuesRanking.map((v, i) => (
              <span key={v} className="px-3 py-1.5 rounded-full text-xs font-medium border border-border"
                style={{ background: `linear-gradient(135deg, hsl(${340 - i * 30} 60% 20%), hsl(${265 + i * 20} 40% 15%))` }}>
                #{i + 1} {v.charAt(0).toUpperCase() + v.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Famous Examples */}
        <div className="p-4 rounded-xl bg-muted/10 border border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-display">Others like you</p>
          <p className="text-sm text-foreground/80">{archetypeInfo.famousExamples.join(" • ")}</p>
        </div>

        {/* Profile Signals */}
        {(answers.linkedinUrl || answers.githubUrl) && (
          <div className="p-4 rounded-xl border border-secondary/30"
               style={{ background: "linear-gradient(135deg, hsl(258 51% 52% / 0.08), hsl(210 22% 14%))" }}>
            <p className="text-xs uppercase tracking-wider text-secondary mb-2 font-display">Linked Profiles Enriching This Profile</p>
            <div className="flex flex-wrap gap-2">
              {answers.linkedinUrl && (
                <a href={answers.linkedinUrl.startsWith("http") ? answers.linkedinUrl : `https://${answers.linkedinUrl}`}
                   target="_blank" rel="noreferrer noopener"
                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/15 text-secondary border border-secondary/30 hover:bg-secondary/25 transition">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
              )}
              {answers.githubUrl && (
                <a href={answers.githubUrl.startsWith("http") ? answers.githubUrl : `https://${answers.githubUrl}`}
                   target="_blank" rel="noreferrer noopener"
                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/30 text-foreground border border-border hover:bg-muted/50 transition">
                  <Github className="w-3 h-3" /> GitHub
                </a>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              These profiles add real-world weight to your archetype — your professional trajectory and builder activity are factored into recommendations.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
