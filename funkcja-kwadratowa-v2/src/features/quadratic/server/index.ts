import { buildStage1Quiz } from "./stage1";
import { buildStage2Quiz } from "./stage2";
import { buildStage3Quiz } from "./stage3";
import { buildStage4Quiz } from "./stage4";
import { buildStage5Quiz } from "./stage5";
import { buildStage6Quiz } from "./stage6";
import { buildStage7Quiz } from "./stage7";
import { buildBankQuizForStage, type QuizQuestion } from "./bank";
import { answerToStorage, isAnswerCorrect } from "./answer";

export { answerToStorage, isAnswerCorrect };
export type { QuizQuestion };

const builders: Record<number, (count?: number) => ReturnType<typeof buildStage1Quiz>> = {
  1: buildStage1Quiz,
  2: buildStage2Quiz,
  3: buildStage3Quiz,
  4: buildStage4Quiz,
  5: buildStage5Quiz,
  6: buildStage6Quiz,
  7: buildStage7Quiz,
};

function shuffle<T>(items: T[]) {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function buildQuizForStage(stageId: number, count = 6): Promise<QuizQuestion[]> {
  const builder = builders[stageId];
  if (!builder) throw new Error(`Nieobsługiwany etap: ${stageId}`);

  const bankQuestions = await buildBankQuizForStage(stageId, count);
  const fallbackCount = Math.max(0, count - bankQuestions.length);
  const generatedQuestions: QuizQuestion[] = builder(fallbackCount).map((question) => ({
    ...question,
    source: "generated",
  }));

  return shuffle([...bankQuestions, ...generatedQuestions]).slice(0, count);
}
