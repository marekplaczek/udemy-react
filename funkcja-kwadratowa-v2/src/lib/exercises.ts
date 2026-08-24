import { sql } from "@/lib/db";

export type ExerciseGroup = "all" | "chapter" | "test" | "review";
export type ExerciseVerification = "all" | "verified" | "review";

export type ExerciseBankFilters = {
  q?: string;
  stageId?: number | null;
  group?: ExerciseGroup;
  verification?: ExerciseVerification;
};

export type ExerciseBankItem = {
  id: number;
  exerciseNumber: string;
  text: string;
  textOriginal: string;
  stageId: number | null;
  topic: string | null;
  difficulty: number | null;
  exerciseType: string;
  hasParameter: boolean;
  parameterName: string | null;
  verified: boolean;
  sourceTitle: string;
  pageNumber: string | null;
  originalFilename: string;
  totalCount: number;
};

export type ExerciseBankStats = {
  total: number;
  chapter: number;
  test: number;
  review: number;
  verified: number;
  needsReview: number;
  parameters: number;
};

function normalizeStage(value: number | null | undefined) {
  return value && value >= 1 && value <= 7 ? value : null;
}

export async function getExerciseBank(filters: ExerciseBankFilters = {}): Promise<ExerciseBankItem[]> {
  const q = (filters.q ?? "").trim();
  const pattern = `%${q}%`;
  const stageId = normalizeStage(filters.stageId);
  const group: ExerciseGroup = filters.group ?? "all";
  const verification: ExerciseVerification = filters.verification ?? "all";

  const rows = await sql`
    select
      e.id,
      e.exercise_number,
      coalesce(nullif(e.text_normalized, ''), e.text_original) as display_text,
      e.text_original,
      e.stage_id,
      e.topic,
      e.difficulty,
      e.exercise_type,
      e.has_parameter,
      e.parameter_name,
      e.verified,
      s.source_title,
      s.page_number,
      s.original_filename,
      count(*) over()::int as total_count
    from exercises e
    join exercise_sources s on s.id = e.source_id
    where e.is_active = true
      and (${stageId}::int is null or e.stage_id = ${stageId})
      and (
        ${group} = 'all'
        or (${group} = 'chapter' and e.exercise_number like '3.%')
        or (${group} = 'test' and e.exercise_number like 'TEST-%')
        or (${group} = 'review' and e.exercise_number like 'POWT-%')
      )
      and (
        ${verification} = 'all'
        or (${verification} = 'verified' and e.verified = true)
        or (${verification} = 'review' and e.verified = false)
      )
      and (
        ${q} = ''
        or e.exercise_number ilike ${pattern}
        or e.text_original ilike ${pattern}
        or coalesce(e.text_normalized, '') ilike ${pattern}
        or coalesce(e.topic, '') ilike ${pattern}
      )
    order by
      case
        when e.exercise_number like '3.%' then 0
        when e.exercise_number like 'TEST-%' then 1
        else 2
      end,
      case
        when e.exercise_number like '3.%' then split_part(e.exercise_number, '.', 2)::int
        else split_part(e.exercise_number, '-', 2)::int
      end
    limit 100
  `;

  return rows.map((row) => ({
    id: Number(row.id),
    exerciseNumber: String(row.exercise_number),
    text: String(row.display_text),
    textOriginal: String(row.text_original),
    stageId: row.stage_id == null ? null : Number(row.stage_id),
    topic: row.topic == null ? null : String(row.topic),
    difficulty: row.difficulty == null ? null : Number(row.difficulty),
    exerciseType: String(row.exercise_type),
    hasParameter: Boolean(row.has_parameter),
    parameterName: row.parameter_name == null ? null : String(row.parameter_name),
    verified: Boolean(row.verified),
    sourceTitle: String(row.source_title),
    pageNumber: row.page_number == null ? null : String(row.page_number),
    originalFilename: String(row.original_filename),
    totalCount: Number(row.total_count),
  }));
}

export async function getExerciseBankStats(): Promise<ExerciseBankStats> {
  const rows = await sql`
    select
      count(*)::int as total,
      count(*) filter (where exercise_number like '3.%')::int as chapter,
      count(*) filter (where exercise_number like 'TEST-%')::int as test,
      count(*) filter (where exercise_number like 'POWT-%')::int as review,
      count(*) filter (where verified)::int as verified,
      count(*) filter (where not verified)::int as needs_review,
      count(*) filter (where has_parameter)::int as parameters
    from exercises
    where is_active = true
  `;
  const row = rows[0];
  return {
    total: Number(row.total),
    chapter: Number(row.chapter),
    test: Number(row.test),
    review: Number(row.review),
    verified: Number(row.verified),
    needsReview: Number(row.needs_review),
    parameters: Number(row.parameters),
  };
}

export async function getExerciseById(id: number) {
  if (!Number.isInteger(id) || id <= 0) return null;

  const rows = await sql`
    select
      e.id,
      e.exercise_number,
      e.text_original,
      e.text_normalized,
      e.latex_text,
      e.stage_id,
      e.topic,
      e.difficulty,
      e.exercise_type,
      e.has_parameter,
      e.parameter_name,
      e.answer,
      e.solution,
      e.verified,
      s.source_title,
      s.page_number,
      s.original_filename,
      s.storage_provider,
      s.storage_key,
      s.import_status
    from exercises e
    join exercise_sources s on s.id = e.source_id
    where e.id = ${id} and e.is_active = true
    limit 1
  `;
  if (!rows.length) return null;
  const row = rows[0];
  return {
    id: Number(row.id),
    exerciseNumber: String(row.exercise_number),
    textOriginal: String(row.text_original),
    textNormalized: row.text_normalized == null ? null : String(row.text_normalized),
    latexText: row.latex_text == null ? null : String(row.latex_text),
    stageId: row.stage_id == null ? null : Number(row.stage_id),
    topic: row.topic == null ? null : String(row.topic),
    difficulty: row.difficulty == null ? null : Number(row.difficulty),
    exerciseType: String(row.exercise_type),
    hasParameter: Boolean(row.has_parameter),
    parameterName: row.parameter_name == null ? null : String(row.parameter_name),
    answer: row.answer == null ? null : String(row.answer),
    solution: row.solution == null ? null : String(row.solution),
    verified: Boolean(row.verified),
    sourceTitle: String(row.source_title),
    pageNumber: row.page_number == null ? null : String(row.page_number),
    originalFilename: String(row.original_filename),
    storageProvider: row.storage_provider == null ? null : String(row.storage_provider),
    storageKey: row.storage_key == null ? null : String(row.storage_key),
    importStatus: String(row.import_status),
  };
}
