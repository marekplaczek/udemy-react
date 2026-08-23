"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireTeacher } from "@/lib/auth";
import { sql } from "@/lib/db";

function teacherRedirect(message: string) {
  redirect(`/teacher?notice=${encodeURIComponent(message)}`);
}

export async function createClass(formData: FormData) {
  const teacher = await requireTeacher();
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2 || name.length > 80) teacherRedirect("Nazwa klasy musi mieć od 2 do 80 znaków.");

  const rows = await sql`
    insert into classes (name, teacher_user_id)
    values (${name}, ${teacher.id})
    on conflict do nothing
    returning id
  `;
  if (!rows.length) teacherRedirect("Klasa o tej nazwie już istnieje.");
  revalidatePath("/teacher");
  teacherRedirect(`Utworzono klasę: ${name}.`);
}

export async function assignStudent(formData: FormData) {
  const teacher = await requireTeacher();
  const classId = String(formData.get("classId") ?? "");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!classId || !email.includes("@")) teacherRedirect("Podaj klasę i poprawny adres e-mail ucznia.");

  const classRows = await sql`
    select id from classes where id = ${classId} and teacher_user_id = ${teacher.id} limit 1
  `;
  if (!classRows.length) teacherRedirect("Nie znaleziono tej klasy.");

  const studentRows = await sql`
    select id from app_users
    where lower(email) = ${email}
      and role = 'STUDENT'
    limit 1
  `;
  if (!studentRows.length) teacherRedirect("Uczeń z tym adresem nie ma jeszcze konta ucznia.");

  await sql`
    insert into class_students (class_id, student_user_id)
    values (${classId}, ${Number(studentRows[0].id)})
    on conflict do nothing
  `;
  revalidatePath("/teacher");
  teacherRedirect(`Uczeń ${email} został przypisany do klasy.`);
}
