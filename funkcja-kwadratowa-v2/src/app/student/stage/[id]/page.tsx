import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireAppUser } from "@/lib/auth";
import { getStudentProgress } from "@/lib/progress";
import QuizClient from "./QuizClient";

export const dynamic = "force-dynamic";

export default async function StagePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAppUser();
  const { id } = await params;
  const stageId = Number(id);
  if (!Number.isInteger(stageId) || stageId < 1 || stageId > 7) notFound();

  const progress = await getStudentProgress(user.id);
  if (stageId > progress.currentLevel && !progress.passedStages.includes(stageId)) redirect("/student");

  return (
    <>
      <header className="topbar"><div className="topbar-inner"><div className="brand"><small>Quiz serwerowy</small><strong>Etap {stageId}</strong></div><Link className="btn" href="/student">Panel ucznia</Link></div></header>
      <main className="shell">
        {stageId === 1 ? <QuizClient stageId={stageId} /> : <div className="empty">Etap {stageId} będzie przeniesiony do silnika serwerowego w kolejnym kroku.</div>}
      </main>
    </>
  );
}
