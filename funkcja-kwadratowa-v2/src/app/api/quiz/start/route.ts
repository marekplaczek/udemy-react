import { requireAppUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { getStudentProgress } from "@/lib/progress";
import { answerToStorage, buildQuizForStage } from "@/features/quadratic/server";

export async function POST(request: Request) {
  const user = await requireAppUser();
  const body = await request.json().catch(() => ({}));
  const stageId = Number(body.stageId);

  if (!Number.isInteger(stageId) || stageId < 1 || stageId > 7) {
    return Response.json({ error: "Nieprawidłowy etap." }, { status: 400 });
  }

  const progress = await getStudentProgress(user.id);
  const allowed = stageId <= progress.currentLevel || progress.passedStages.includes(stageId);
  if (!allowed) return Response.json({ error: "Etap jest zablokowany." }, { status: 403 });

  await sql`
    update quiz_sessions
    set status = 'EXPIRED'
    where student_user_id = ${user.id} and stage_id = ${stageId} and status = 'ACTIVE'
  `;

  const sessions = await sql`
    insert into quiz_sessions (student_user_id, stage_id)
    values (${user.id}, ${stageId})
    returning id
  `;
  const sessionId = String(sessions[0].id);
  const generated = await buildQuizForStage(stageId, 6);
  const questions = [];

  for (let index = 0; index < generated.length; index++) {
    const question = generated[index];
    const optionsJson = question.options ? JSON.stringify(question.options) : null;
    const rows = await sql`
      insert into quiz_session_questions (
        session_id, ordinal, question_key, question_text, expression,
        question_type, options, correct_answer, solution, skill
      ) values (
        ${sessionId}, ${index + 1}, ${question.key}, ${question.q}, ${question.expr ?? null},
        ${question.type}, ${optionsJson}::jsonb, ${answerToStorage(question.ans)}, ${question.solution}, ${question.skill}
      )
      returning id, ordinal, question_text, expression, question_type, options
    `;
    const row = rows[0];
    questions.push({
      id: String(row.id),
      ordinal: Number(row.ordinal),
      q: String(row.question_text),
      expr: row.expression ? String(row.expression) : null,
      type: String(row.question_type),
      options: row.options ?? null,
      source: question.source,
      exerciseNumber: question.exerciseNumber ?? null,
      module: question.module ?? null,
    });
  }

  return Response.json({ sessionId, stageId, questions });
}
