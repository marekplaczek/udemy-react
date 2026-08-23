import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";

export type AppRole = "STUDENT" | "TEACHER" | "ADMIN";

export type AppUser = {
  id: number;
  clerk_user_id: string;
  email: string | null;
  display_name: string;
  role: AppRole;
};

function isTeacherEmail(email: string | null) {
  if (!email) return false;
  const configured = (process.env.TEACHER_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return configured.includes(email.toLowerCase());
}

export async function requireAppUser(): Promise<AppUser> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress ?? null;
  const displayName =
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
    email?.split("@")[0] ||
    "Użytkownik";
  const initialRole: AppRole = isTeacherEmail(email) ? "TEACHER" : "STUDENT";

  const rows = await sql`
    insert into app_users (clerk_user_id, email, display_name, role)
    values (${userId}, ${email}, ${displayName}, ${initialRole})
    on conflict (clerk_user_id) do update
      set email = excluded.email,
          display_name = excluded.display_name,
          role = case
            when excluded.role = 'TEACHER' then 'TEACHER'
            else app_users.role
          end
    returning id, clerk_user_id, email, display_name, role
  `;

  return rows[0] as AppUser;
}

export async function requireTeacher(): Promise<AppUser> {
  const user = await requireAppUser();
  if (user.role !== "TEACHER" && user.role !== "ADMIN") redirect("/student");
  return user;
}
