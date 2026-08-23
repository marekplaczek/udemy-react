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
  };
}
