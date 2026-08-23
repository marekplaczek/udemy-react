import Link from "next/link";
import { requireAppUser } from "@/lib/auth";
import { getStudentProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

export default async function StudentPage() {
  const user = await requireAppUser();
  const progress = await getStudentProgress(user.id);

  return (
    <>
      <header className="topbar"><div className="topbar-inner"><div className="brand"><small>Panel ucznia</small><strong>{user.display_name}</strong></div><Link className="btn" href="/auth/sign-out">Wyloguj</Link></div></header>
      <main className="shell">
        <div className="grid grid-3">
          <div className="card"><span className="muted">Aktualny poziom</span><div className="kpi">{progress.currentLevel}/7</div></div>
          <div className="card"><span className="muted">Zaliczone etapy</span><div className="kpi">{progress.passedStages.length}</div></div>
          <div className="card"><span className="muted">Status</span><div className="kpi" style={{ fontSize: 20 }}>{progress.completed ? "Program ukończony" : "W trakcie"}</div></div>
        </div>
        <section style={{ marginTop: 24 }} className="card">
          <h1 className="section-title">Twój program</h1>
          <p className="muted">Poziom jest wyliczany na serwerze z zaliczonych etapów.</p>
          <div className="stage-list">
            {progress.stages.map((stage) => (
              <div className="stage" key={stage.stageId}>
                <div><strong>Etap {stage.stageId}</strong><div className="muted">Próby: {stage.attempts} · najlepszy wynik: {stage.bestScore}%</div></div>
                <span className={`badge ${stage.status === "PASSED" ? "badge-passed" : stage.status === "IN_PROGRESS" ? "badge-current" : "badge-locked"}`}>
                  {stage.status === "PASSED" ? "zaliczony" : stage.status === "IN_PROGRESS" ? "aktualny" : "zablokowany"}
                </span>
              </div>
            ))}
          </div>
        </section>
        {user.role === "TEACHER" || user.role === "ADMIN" ? <div className="actions"><Link className="btn" href="/teacher">Przejdź do panelu nauczyciela</Link></div> : null}
      </main>
    </>
  );
}
