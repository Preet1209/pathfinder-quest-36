import { useQuiz } from "@/context/QuizContext";
import { Input } from "@/components/ui/input";
import { Linkedin, Github, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Profiles = () => {
  const { answers, updateAnswer } = useQuiz();

  const isValid = (url: string, host: string) => {
    if (!url.trim()) return true;
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname.includes(host);
    } catch {
      return false;
    }
  };

  const linkedinOk = isValid(answers.linkedinUrl, "linkedin.com");
  const githubOk = isValid(answers.githubUrl, "github.com");

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2 p-3 rounded-xl border border-border bg-muted/15"
      >
        <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          <span className="text-foreground font-medium">Optional —</span> share your profiles
          and we'll use them to enrich your Career DNA, sharpen skill-gap signals,
          and tailor Decision Engine weighting. Skip anytime.
        </p>
      </motion.div>

      <div className="space-y-2">
        <label className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
          <Linkedin className="w-4 h-4 text-secondary" /> LinkedIn URL
          <span className="text-[10px] text-muted-foreground font-normal uppercase tracking-wider">Optional</span>
        </label>
        <Input
          type="url"
          placeholder="https://linkedin.com/in/your-handle"
          value={answers.linkedinUrl}
          onChange={(e) => updateAnswer("linkedinUrl", e.target.value.slice(0, 200))}
          className="bg-muted/20 border-border"
        />
        {!linkedinOk && (
          <p className="text-xs text-destructive">Enter a valid linkedin.com URL or leave blank.</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
          <Github className="w-4 h-4 text-foreground" /> GitHub URL
          <span className="text-[10px] text-muted-foreground font-normal uppercase tracking-wider">Optional</span>
        </label>
        <Input
          type="url"
          placeholder="https://github.com/your-handle"
          value={answers.githubUrl}
          onChange={(e) => updateAnswer("githubUrl", e.target.value.slice(0, 200))}
          className="bg-muted/20 border-border"
        />
        {!githubOk && (
          <p className="text-xs text-destructive">Enter a valid github.com URL or leave blank.</p>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground">
        We don't store these on a server — they only live in your session and feed your local insights.
      </p>
    </div>
  );
};