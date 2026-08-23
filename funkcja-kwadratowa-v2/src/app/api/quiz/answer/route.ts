import { requireAppUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { getStudentProgress } from "@/lib/progress";
import { isAnswerCorrect } from "@/features/quadratic/server/stage1";

export async function POST(request: Request) {
  const user = await requireAppUser();
  const body = await request.json().catch(() => ({}));
  const sessionId = String(body.sessionId ?? "");
  const questionId = String(body.questionId ?? "");
  const answer = String(body.answer ?? "");

  if (!sessionId || !questionId) return Response.json({ error: "Brak identyfikatora sesji lub pytania." }, { status: 400 });

  const rows = await sql`
    select q.id, q.question_type, q.correct_answer, q.solution, q.answered_at
    from quiz_session_questions q
    join quiz_sessions s on s.id = q.session_id
    where q.id = ${questionId}
      and q.session_id = ${sessionId}
      and s.student_user_id = ${user.id}
      and s.status = 'ACTIVE'
    limit 1
  `;
  if (!rows.length) return Response.json({ error: "Nie znaleziono aktywnego pytania." }, { status: 404 });
  const question = rows[0];
  if (question.answered_at) return Response.json({ error: "Na to pytanie już udzielono odpowiedzi." }, { status: 409 });

  const type = String(question.question_type) as "input" | "choice";
  const correct = isAnswerCorrect(type, answer, String(question.correct_answer));

  await sql`
    update quiz_session_questions
    set student_answer = ${answer}, is_correct = ${correct}, answered_at = now()
    where id = ${questionId} and answered_at is null
  `;

  const summaryRows = await sql`
    select
      count(*)::int as total,
      count(*) filter (where answered_at is not null)::int as answered,
      count(*) filter (where is_correct = true)::int as correct
    from quiz_session_questions
    where session_id = ${sessionId}
  `;
  const summary = summaryRows[0];
  const total = Number(summary.total);
  const answered = Number(summary.answered);
  const score = Number(summary.correct);
  const completed = answered === total;

  let passed = false;
  let currentLevel: number | null = null;

  if (completed) {
    const claimed = await sql`
      update quiz_sessions
      set status = 'COMPLETED', completed_at = now()
      where id = ${sessionId} and student_user_id = ${user.id} and status = 'ACTIVE'
      returning stage_id
    `;

    if (claimed.length) {
      const stageId = Number(claimed[0].stage_id);
      const attemptRows = await sql`
        insert into quiz_attempts (student_user_id, stage_id, score, max_score)
        values (${user.id}, ${stageId}, ${score}, ${total})
        returning id
      `;
      const attemptId = Number(attemptRows[0].id);

      await sql`
        insert into quiz_answers (
          attempt_id, question_key, question_text, skill,
          student_answer, correct_answer, is_correct
        )
        select ${attemptId}, question_key, question_text, skill,
               student_answer, correct_answer, coalesce(is_correct, false)
        from quiz_session_questions
        where session_id = ${sessionId}
        order by ordinal
      `;

      passed = score === total;
      const percent = Math.round((score * 100) / total);
      await sql`
        insert into student_progress (
          student_user_id, stage_id, status, best_score, attempts, passed_at, last_activity
        ) values (
          ${user.id}, ${stageId}, ${passed ? "PASSED" : "IN_PROGRESS"}, ${percent}, 1,
          ${passed ? new Date().toISOString() : null}, now()
        )
        on conflict (student_user_id, stage_id) do update
        set attempts = student_progress.attempts + 1,
            best_score = greatest(student_progress.best_score, excluded.best_score),
            status = case when excluded.status = 'PASSED' then 'PASSED' else student_progress.status end,
            passed_at = case when excluded.status = 'PASSED' then coalesce(student_progress.passed_at, excluded.passed_at) else student_progress.passed_at end,
            last_activity = now()
      `;
    }

    const progress = await getStudentProgress(user.id);
    passed = progress.passedStages.includes(1);
    currentLevel = progress.currentLevel;
  }

  return Response.json({
    correct,
    solution: String(question.solution),
    completed,
    score: completed ? score : undefined,
    maxScore: completed ? total : undefined,
    passed: completed ? passed : undefined,
    currentLevel,
  });
}
