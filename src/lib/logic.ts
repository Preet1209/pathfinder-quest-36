import { QuizAnswers } from "@/types/quiz";

const SEQUENCE_CORRECT = "33";
const PUZZLE_CORRECT = "triangle";

// Tunable benchmarks (in seconds)
const SEQ_FAST = 8;   // <=8s = full speed credit
const SEQ_SLOW = 45;  // >=45s = no speed credit
const PUZ_FAST = 4;
const PUZ_SLOW = 25;

const speedScore = (seconds: number, fast: number, slow: number) => {
  if (seconds <= 0) return 0;
  if (seconds <= fast) return 1;
  if (seconds >= slow) return 0;
  return 1 - (seconds - fast) / (slow - fast);
};

export interface LogicProfile {
  sequenceCorrect: boolean;
  puzzleCorrect: boolean;
  sequenceSeconds: number;
  puzzleSeconds: number;
  accuracy: number;       // 0..1
  speed: number;          // 0..1 (avg of two normalized speeds, 0 if both unanswered)
  score: number;          // 0..100 composite
  band: "Sharp" | "Solid" | "Developing" | "Untested";
  insight: string;
}

export const computeLogicProfile = (a: QuizAnswers): LogicProfile => {
  const sequenceCorrect = a.sequenceAnswer === SEQUENCE_CORRECT;
  const puzzleCorrect = a.puzzleAnswer === PUZZLE_CORRECT;
  const sequenceSeconds = a.sequenceTimeMs / 1000;
  const puzzleSeconds = a.puzzleTimeMs / 1000;

  const answered = (a.sequenceAnswer ? 1 : 0) + (a.puzzleAnswer ? 1 : 0);
  const accuracy = answered === 0 ? 0 : ((sequenceCorrect ? 1 : 0) + (puzzleCorrect ? 1 : 0)) / 2;

  const seqSpeed = a.sequenceAnswer ? speedScore(sequenceSeconds, SEQ_FAST, SEQ_SLOW) : 0;
  const puzSpeed = a.puzzleAnswer ? speedScore(puzzleSeconds, PUZ_FAST, PUZ_SLOW) : 0;
  const speed = answered === 0 ? 0 : (seqSpeed + puzSpeed) / 2;

  // 70% accuracy, 30% speed
  const score = Math.round((accuracy * 0.7 + speed * 0.3) * 100);

  let band: LogicProfile["band"] = "Untested";
  if (answered === 0) band = "Untested";
  else if (score >= 80) band = "Sharp";
  else if (score >= 55) band = "Solid";
  else band = "Developing";

  let insight = "Complete the cognition section to unlock this signal.";
  if (band === "Sharp") {
    insight = "Fast and accurate — you process structured problems quickly. Great fit for analytical, technical, and strategy-heavy roles.";
  } else if (band === "Solid") {
    insight = "Reliable reasoning. You'll do well in roles that mix analysis with judgment, like product, ops, or applied research.";
  } else if (band === "Developing") {
    insight = "Pattern recognition is a learnable skill — daily 10-min practice on aptitude puzzles measurably lifts this signal.";
  }

  return {
    sequenceCorrect,
    puzzleCorrect,
    sequenceSeconds,
    puzzleSeconds,
    accuracy,
    speed,
    score,
    band,
    insight,
  };
};