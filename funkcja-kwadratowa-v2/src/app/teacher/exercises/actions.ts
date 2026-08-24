"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireTeacher } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function reviewExercise(formData: FormData) {
  await requireTeacher();

  const id = Number(formData.get("id"));
  const stageId = Number(formData.get("stageId"));
  const difficultyRaw = String(formData.get("difficulty") ?? "").trim();
  const difficulty = difficultyRaw ? Number(difficultyRaw) : null;
  const textNormalized = String(formData.get("textNormalized") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const verified = formData.get("verified") === "on";

  if (!Number.isInteger(id) || id <= 0) throw new Error("Nieprawidłowy identyfikator zadania");
  if (!Number.isInteger(stageId) || stageId < 1 || stageId > 7) throw new Error("Etap musi być z zakresu 1–7");
  if (difficulty != null && (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5)) throw new Error("Trudność musi być z zakresu 1–5");
  if (!textNormalized) throw new Error("Treść po weryfikacji nie może być pusta");
  if (!topic) throw new Error("Temat nie może być pusty");

  await sql`
    update exercises
    set text_normalized = ${textNormalized},
        stage_id = ${stageId},
        topic = ${topic},
        difficulty = ${difficulty},
        verified = ${verified},
        updated_at = now()
    where id = ${id} and is_active = true
  `;

  revalidatePath("/teacher/exercises");
  revalidatePath(`/teacher/exercises/${id}`);
  redirect(`/teacher/exercises/${id}?saved=1`);
}
