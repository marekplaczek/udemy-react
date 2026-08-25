import { sql } from "@/lib/db";
import type { GeneratedQuestion } from "./stage1";
import { isAutoCheckableAnswer } from "./answer";

export type QuizQuestion = GeneratedQuestion & {
  source: "bank" | "generated";
  exerciseNumber?: string;
  module?: string;
};

type BankRow = {
  id: string | number;
  exercise_number: string;
  text: string;
  answer: string;
  solution: string | null;
  exercise_type: string;
  topic: string | null;
  module_tag: string | null;
};

function parseChoice(text: string, answer: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const optionStart = lines.findIndex((line) => /^[A-D]\.\s+/.test(line));
  if (optionStart < 1) return null;
  const options = lines.slice(optionStart).filter((line) => /^[A-D]\.\s+/.test(line));
  if (options.length < 2 || !options.includes(answer.trim())) return null;
  return { q: lines.slice(0, optionStart).join(" "), options };
}

function fromBankRow(row: BankRow): QuizQuestion | null {
  const moduleTag = row.module_tag ?? undefined;
  const skill = moduleTag ?? row.topic ?? "bank-zadan";
  const solution = row.solution?.trim() || `Prawidłowa odpowiedź: ${row.answer}`;

  if (row.exercise_type === "CHOICE") {
    const parsed = parseChoice(row.text, row.answer);
    if (!parsed) return null;
    return {
      key: `bank:${row.id}`,
      q: parsed.q,
      type: "choice",
      options: parsed.options,
      ans: row.answer.trim(),
      solution,
      skill,
      source: "bank",
      exerciseNumber: row.exercise_number,
      module: moduleTag,
    };
  }

  if ((row.exercise_type === "OPEN" || row.exercise_type === "MULTIPART") && isAutoCheckableAnswer(row.answer)) {
    return {
      key: `bank:${row.id}`,
      q: row.text.trim(),
      type: "input",
      ans: row.answer.trim(),
      solution,
      skill,
      source: "bank",
      exerciseNumber: row.exercise_number,
      module: moduleTag,
    };
  }

  return null;
}

export async function buildBankQuizForStage(stageId: number, count: number) {
  const candidateLimit = Math.max(32, count * 10);
  const rows = await sql`
    select
      e.id,
      e.exercise_number,
      coalesce(nullif(e.text_normalized, ''), e.text_original) as text,
      e.answer,
      e.solution,
      e.exercise_type,
      e.topic,
      (
        select et.tag
        from exercise_tags et
        where et.exercise_id = e.id and et.tag like 'module:%'
        order by et.tag
        limit 1
      ) as module_tag
    from exercises e
    where e.stage_id = ${stageId}
      and e.verified = true
      and e.is_active = true
      and e.answer is not null
      and btrim(e.answer) <> ''
      and e.exercise_type in ('CHOICE', 'OPEN', 'MULTIPART')
    order by random()
    limit ${candidateLimit}
  ` as BankRow[];

  const candidates = rows.map(fromBankRow).filter((item): item is QuizQuestion => item !== null);
  const groups = new Map<string, QuizQuestion[]>();
  for (const question of candidates) {
    const key = question.module ?? "module:other";
    const group = groups.get(key) ?? [];
    group.push(question);
    groups.set(key, group);
  }

  const selected: QuizQuestion[] = [];
  const groupList = Array.from(groups.values());
  while (selected.length < count && groupList.some((group) => group.length > 0)) {
    for (const group of groupList) {
      const question = group.shift();
      if (question) selected.push(question);
      if (selected.length >= count) break;
    }
  }

  return selected;
}
