import { useQuiz } from "@/context/QuizContext";
import { SectionProgress } from "./SectionProgress";
import { QuestionCard } from "./QuestionCard";
import { AgeRange } from "./questions/AgeRange";
import { Qualification } from "./questions/Qualification";
import { JourneyStage } from "./questions/JourneyStage";
import { HoursPerWeek } from "./questions/HoursPerWeek";
import { DomainChips } from "./questions/DomainChips";
import { ValuesRanking } from "./questions/ValuesRanking";
import { ABChoice } from "./questions/ABChoice";
import { StressSliders } from "./questions/StressSliders";
import { LearningStyle } from "./questions/LearningStyle";
import { DesiredSkill } from "./questions/DesiredSkill";
import { Profiles } from "./questions/Profiles";

const questions = [
  // Section 0 — Quick Setup
  { section: 0, title: "What's your age range?", subtitle: "This helps us calibrate career timelines and recommendations.", field: "ageRange" },
  { section: 0, title: "What's your highest qualification?", subtitle: "We'll factor your education into career path suggestions.", field: "qualification" },
  { section: 0, title: "Where are you on your career journey?", subtitle: "This helps us tailor your roadmap and recommendations.", field: "journeyStage" },
  { section: 0, title: "How many hours per week can you dedicate?", subtitle: "We'll pace your skill roadmap accordingly.", field: "hoursPerWeek" },
  { section: 0, title: "Which domains interest you?", subtitle: "Select fields that excite you — we'll use these to suggest careers.", field: "domains" },
  // Section 1 — Values & Personality
  { section: 1, title: "Rank your core values", subtitle: "This is the most important question — it powers your Career DNA and recommendations.", field: "valuesRanking" },
  { section: 1, title: "Stability or Flexibility?", subtitle: "Your work style preference.", field: "stabilityVsFlexibility" },
  { section: 1, title: "Independent or Collaborative?", subtitle: "Your leadership and teamwork style.", field: "independentVsCollaborative" },
  { section: 1, title: "Deep Expert or Versatile Builder?", subtitle: "Your long-term career archetype.", field: "expertVsVersatile" },
  // Section 2 — Burnout & Learning
  { section: 2, title: "How are you feeling right now?", subtitle: "These baselines help us track and predict burnout.", field: "stressLevels" },
  { section: 2, title: "How do you learn best?", subtitle: "We'll customize your skill roadmap format.", field: "learningStyle" },
  { section: 2, title: "What skill do you most want to develop?", subtitle: "Tell us in your own words — be as specific or broad as you like.", field: "desiredSkill" },
  // Section 3 — Profiles (Optional)
  { section: 3, title: "Share your profiles (optional)", subtitle: "LinkedIn & GitHub help us calibrate your career fit and skill gaps with real signals.", field: "profiles" },
];

const TOTAL = questions.length;

export const OnboardingQuiz = () => {
  const { answers, currentQuestion, setCurrentQuestion, setCurrentSection, setIsComplete } = useQuiz();

  const q = questions[currentQuestion];
  const section = q.section;

  const canProceed = (): boolean => {
    switch (currentQuestion) {
      case 0: return !!answers.ageRange;
      case 1: return !!answers.qualification;
      case 2: return !!answers.journeyStage;
      case 3: return !!answers.hoursPerWeek;
      case 4: return answers.domains.length >= 1;
      case 5: return answers.valuesRanking.length === 3;
      case 6: return !!answers.stabilityVsFlexibility;
      case 7: return !!answers.independentVsCollaborative;
      case 8: return !!answers.expertVsVersatile;
      case 9: return true;
      case 10: return !!answers.learningStyle;
      case 11: return answers.desiredSkill.trim().length >= 3;
      case 12: {
        const validUrl = (url: string, host: string) => {
          if (!url.trim()) return true;
          try {
            const u = new URL(url.startsWith("http") ? url : `https://${url}`);
            return u.hostname.includes(host);
          } catch { return false; }
        };
        return validUrl(answers.linkedinUrl, "linkedin.com") && validUrl(answers.githubUrl, "github.com");
      }
      default: return false;
    }
  };

  const goNext = () => {
    if (currentQuestion === TOTAL - 1) {
      setIsComplete(true);
      return;
    }
    const next = currentQuestion + 1;
    setCurrentQuestion(next);
    setCurrentSection(questions[next].section);
  };

  const goBack = () => {
    if (currentQuestion === 0) return;
    const prev = currentQuestion - 1;
    setCurrentQuestion(prev);
    setCurrentSection(questions[prev].section);
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 0: return <AgeRange />;
      case 1: return <Qualification />;
      case 2: return <JourneyStage />;
      case 3: return <HoursPerWeek />;
      case 4: return <DomainChips />;
      case 5: return <ValuesRanking />;
      case 6:
        return (
          <ABChoice field="stabilityVsFlexibility"
            optionA={{ value: "stability", label: "Stability", emoji: "🏠", desc: "Predictable income, clear career path, job security" }}
            optionB={{ value: "flexibility", label: "Flexibility", emoji: "🌊", desc: "Varied work, adaptable schedule, new experiences" }}
          />
        );
      case 7:
        return (
          <ABChoice field="independentVsCollaborative"
            optionA={{ value: "independent", label: "Independent", emoji: "🐺", desc: "Solo focus, self-directed, deep work" }}
            optionB={{ value: "collaborative", label: "Collaborative", emoji: "🐝", desc: "Team synergy, brainstorming, shared wins" }}
          />
        );
      case 8:
        return (
          <ABChoice field="expertVsVersatile"
            optionA={{ value: "expert", label: "Deep Expert", emoji: "🔬", desc: "Master one domain, become the go-to person" }}
            optionB={{ value: "versatile", label: "Versatile Builder", emoji: "🧩", desc: "Connect dots across fields, wear many hats" }}
          />
        );
      case 9: return <StressSliders />;
      case 10: return <LearningStyle />;
      case 11: return <DesiredSkill />;
      case 12: return <Profiles />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]" style={{ background: "hsl(340 82% 52%)" }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(265 60% 50%)" }} />
      </div>

      <div className="relative z-10 w-full">
        <SectionProgress currentSection={section} currentQuestion={currentQuestion} totalAnswered={currentQuestion} />
        <QuestionCard
          questionNumber={currentQuestion + 1}
          title={q.title}
          subtitle={q.subtitle}
          onNext={goNext}
          onBack={currentQuestion > 0 ? goBack : undefined}
          canProceed={canProceed()}
          isLast={currentQuestion === TOTAL - 1}
        >
          {renderQuestion()}
        </QuestionCard>
      </div>
    </div>
  );
};
