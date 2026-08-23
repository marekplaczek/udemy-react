import { answerToStorage, buildStage1Quiz, isAnswerCorrect } from "./stage1";
import { buildStage2Quiz } from "./stage2";
import { buildStage3Quiz } from "./stage3";
import { buildStage4Quiz } from "./stage4";
import { buildStage5Quiz } from "./stage5";
import { buildStage6Quiz } from "./stage6";
import { buildStage7Quiz } from "./stage7";

export { answerToStorage, isAnswerCorrect };

const builders: Record<number, (count?: number) => ReturnType<typeof buildStage1Quiz>> = {
  1: buildStage1Quiz,
  2: buildStage2Quiz,
  3: buildStage3Quiz,
  4: buildStage4Quiz,
  5: buildStage5Quiz,
  6: buildStage6Quiz,
  7: buildStage7Quiz,
};

export function buildQuizForStage(stageId: number, count = 6) {
  const builder = builders[stageId];
  if (!builder) throw new Error(`Nieobsługiwany etap: ${stageId}`);
  return builder(count);
}
