import { useQuiz } from "@/context/QuizContext";
import { Slider } from "@/components/ui/slider";

const sliders = [
  { key: "overwhelm" as const, label: "😰 Overwhelm", low: "Calm", high: "Stressed" },
  { key: "detachment" as const, label: "😶 Detachment", low: "Engaged", high: "Disconnected" },
  { key: "excitement" as const, label: "✨ Excitement", low: "Low energy", high: "Fired up" },
];

export const StressSliders = () => {
  const { answers, updateAnswer } = useQuiz();

  const handleChange = (key: "overwhelm" | "detachment" | "excitement", value: number[]) => {
    updateAnswer("stressLevels", { ...answers.stressLevels, [key]: value[0] });
  };

  return (
    <div className="space-y-6">
      {sliders.map((s) => (
        <div key={s.key}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-display font-semibold text-foreground">{s.label}</span>
            <span className="text-sm text-muted-foreground">{answers.stressLevels[s.key]}%</span>
          </div>
          <Slider
            value={[answers.stressLevels[s.key]]}
            onValueChange={(v) => handleChange(s.key, v)}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">{s.low}</span>
            <span className="text-xs text-muted-foreground">{s.high}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
