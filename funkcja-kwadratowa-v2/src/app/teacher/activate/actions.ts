"use server";

import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { requireAppUser } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function activateTeacher(formData: FormData) {
  const user = await requireAppUser();
  if (user.role === "TEACHER" || user.role === "ADMIN") redirect("/teacher");

  const code = String(formData.get("code") ?? "").trim();
  if (!code) redirect("/teacher/activate?error=Podaj%20kod%20aktywacyjny.");
  const codeHash = createHash("sha256").update(code).digest("hex");

  const rows = await sql`
    with claimed_code as (
      update teacher_activation_codes
      set active = false, used_by = ${user.id}, used_at = now()
      where code_hash = ${codeHash}
        and active = true
        and used_by is null
      returning id
    )
    update app_users
    set role = 'TEACHER', updated_at = now()
    where id = ${user.id}
      and exists (select 1 from claimed_code)
    returning id
  `;

  if (!rows.length) {
    redirect("/teacher/activate?error=Kod%20jest%20nieprawidłowy%20lub%20został%20już%20wykorzystany.");
  }

  redirect("/teacher?notice=Konto%20nauczyciela%20zostało%20aktywowane.");
}
