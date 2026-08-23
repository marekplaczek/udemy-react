import { requireAppUser } from "@/lib/auth";
import { getStudentProgress } from "@/lib/progress";

export async function GET() {
  const user = await requireAppUser();
  const progress = await getStudentProgress(user.id);
  return Response.json({ user: { id: user.id, role: user.role, displayName: user.display_name }, ...progress });
}
