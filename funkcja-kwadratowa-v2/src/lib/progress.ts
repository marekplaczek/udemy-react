import { sql } from "@/lib/db";

export const STAGE_COUNT = 7;

export type StageProgress = {
  stageId: number;
  status: "LOCKED" | "IN_PROGRESS" | "PASSED";
  bestScore: number;
  attempts: number;
  passedAt: string | null;
  lastActivity: string | null;
};

export async function getStudentProgress(studentUserId: number) {
  const rows = await sql`
    select stage_id, status, best_score, attempts, passed_at, last_activity
    from student_progress
    where student_user_id = ${studentUserId}
    order by stage_id
  `;

  const byStage = new Map<number, (typeof rows)[number]>();
  for (const row of rows) byStage.set(Number(row.stage_id), row);

  const passedStages = rows
    .filter((row) => row.status === "PASSED")
    .map((row) => Number(row.stage_id));

  let firstNotPassed = 1;
  while (firstNotPassed <= STAGE_COUNT && passedStages.includes(firstNotPassed)) firstNotPassed++;
  const completed = firstNotPassed > STAGE_COUNT;
  const currentLevel = completed ? STAGE_COUNT : firstNotPassed;

  const stages: StageProgress[] = Array.from({ length: STAGE_COUNT }, (_, index) => {
    const stageId = index + 1;
    const row = byStage.get(stageId);
    const computedStatus: StageProgress["status"] = row?.status === "PASSED"
      ? "PASSED"
      : stageId === currentLevel && !completed
        ? "IN_PROGRESS"
        : "LOCKED";

    return {
      stageId,
      status: computedStatus,
      bestScore: Number(row?.best_score ?? 0),
      attempts: Number(row?.attempts ?? 0),
      passedAt: row?.passed_at ? String(row.passed_at) : null,
      lastActivity: row?.last_activity ? String(row.last_activity) : null,
    };
  });

  return { currentLevel, completed, passedStages, stages };
}

export async function getTeacherClasses(teacherUserId: number) {
  const rows = await sql`
    select c.id, c.name, count(cs.student_user_id)::int as student_count
    from classes c
    left join class_students cs on cs.class_id = c.id
    where c.teacher_user_id = ${teacherUserId}
    group by c.id, c.name
    order by c.name
  `;
  return rows.map((row) => ({ id: String(row.id), name: String(row.name), studentCount: Number(row.student_count ?? 0) }));
}

export async function getTeacherStudents(teacherUserId: number) {
  const rows = await sql`
    select
      u.id,
      u.display_name,
      u.email,
      c.id as class_id,
      c.name as class_name,
      count(*) filter (where sp.status = 'PASSED') as passed_count,
      coalesce(sum(sp.attempts), 0) as attempts,
      max(sp.last_activity) as last_activity
    from classes c
    join class_students cs on cs.class_id = c.id
    join app_users u on u.id = cs.student_user_id
    left join student_progress sp on sp.student_user_id = u.id
    where c.teacher_user_id = ${teacherUserId}
    group by u.id, u.display_name, u.email, c.id, c.name
    order by c.name, u.display_name
  `;

  return rows.map((row) => {
    const passed = Number(row.passed_count ?? 0);
    return {
      id: Number(row.id),
      displayName: String(row.display_name),
      email: row.email ? String(row.email) : null,
      classId: String(row.class_id),
      className: String(row.class_name),
      passedStages: passed,
      currentLevel: passed >= STAGE_COUNT ? STAGE_COUNT : passed + 1,
      attempts: Number(row.attempts ?? 0),
      lastActivity: row.last_activity ? String(row.last_activity) : null,
    };
  });
}

export async function getTeacherStudentDetail(teacherUserId: number, studentUserId: number) {
  const access = await sql`
    select u.id, u.display_name, u.email, c.name as class_name
    from classes c
    join class_students cs on cs.class_id = c.id
    join app_users u on u.id = cs.student_user_id
    where c.teacher_user_id = ${teacherUserId}
      and u.id = ${studentUserId}
    limit 1
  `;
  if (!access.length) return null;

  const progress = await getStudentProgress(studentUserId);
  const attempts = await sql`
    select id, stage_id, score, max_score, created_at
    from quiz_attempts
    where student_user_id = ${studentUserId}
    order by created_at desc
    limit 20
  `;
  const skillRows = await sql`
    select qa.skill,
           count(*)::int as total,
           count(*) filter (where qa.is_correct = true)::int as correct
    from quiz_answers qa
    join quiz_attempts a on a.id = qa.attempt_id
    where a.student_user_id = ${studentUserId}
      and qa.skill is not null
    group by qa.skill
    order by (count(*) filter (where qa.is_correct = true))::numeric / nullif(count(*), 0), count(*) desc
  `;
  const wrongRows = await sql`
    select a.stage_id, a.created_at, qa.question_text, qa.skill, qa.student_answer, qa.correct_answer
    from quiz_answers qa
    join quiz_attempts a on a.id = qa.attempt_id
    where a.student_user_id = ${studentUserId}
      and qa.is_correct = false
    order by a.created_at desc, qa.id desc
    limit 20
  `;

  return {
    student: {
      id: Number(access[0].id),
      displayName: String(access[0].display_name),
      email: access[0].email ? String(access[0].email) : null,
      className: String(access[0].class_name),
    },
    progress,
    attempts: attempts.map((row) => ({
      id: Number(row.id),
      stageId: Number(row.stage_id),
      score: Number(row.score),
      maxScore: Number(row.max_score),
      createdAt: String(row.created_at),
    })),
    skills: skillRows.map((row) => {
      const total = Number(row.total);
      const correct = Number(row.correct);
      return { skill: String(row.skill), total, correct, accuracy: total ? Math.round((correct * 100) / total) : 0 };
    }),
    recentWrongAnswers: wrongRows.map((row) => ({
      stageId: Number(row.stage_id),
      createdAt: String(row.created_at),
      questionText: String(row.question_text),
      skill: row.skill ? String(row.skill) : null,
      studentAnswer: row.student_answer ? String(row.student_answer) : "—",
      correctAnswer: String(row.correct_answer),
    })),
  };
}
