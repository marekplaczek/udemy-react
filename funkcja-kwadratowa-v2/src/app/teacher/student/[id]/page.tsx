import { notFound } from "next/navigation";
import Link from "next/link";
import { requireTeacher } from "@/lib/auth";
import { getTeacherStudentDetail } from "@/lib/progress";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const teacher = await requireTeacher();
  const { id } = await params;
  const studentId = Number(id);
  if (!Number.isInteger(studentId)) notFound();

  const detail = await getTeacherStudentDetail(teacher.id, studentId);
  if (!detail) notFound();

  return (
    <main className="shell">
      <div className="actions"><Link className="btn" href="/teacher">← Lista uczniów</Link></div>
      <h1 className="section-title" style={{ marginTop: 22 }}>{detail.student.displayName}</h1>
      <p className="muted">{detail.student.className} · {detail.student.email ?? "brak adresu e-mail"}</p>
      <div className="grid grid-2" style={{ marginTop: 20 }}>
        <section className="card"><span className="muted">Aktualny poziom</span><div className="kpi">{detail.progress.currentLevel}/7</div></section>
        <section className="card"><span className="muted">Zaliczone</span><div className="kpi">{detail.progress.passedStages.length}/7</div></section>
      </div>
      <section className="card" style={{ marginTop: 20 }}><h2 className="section-title" style={{ fontSize: 21 }}>Etapy</h2><div className="stage-list">{detail.progress.stages.map((stage) => <div className="stage" key={stage.stageId}><strong>Etap {stage.stageId}</strong><span>{stage.status} · prób: {stage.attempts} · wynik: {stage.bestScore}%</span></div>)}</div></section>
      <section className="card table-wrap" style={{ marginTop: 20 }}><h2 className="section-title" style={{ fontSize: 21 }}>Ostatnie próby</h2>{detail.attempts.length === 0 ? <p className="muted">Brak prób quizów.</p> : <table><thead><tr><th>Etap</th><th>Wynik</th><th>Data</th></tr></thead><tbody>{detail.attempts.map((attempt) => <tr key={attempt.id}><td>{attempt.stageId}</td><td>{attempt.score}/{attempt.maxScore}</td><td>{new Intl.DateTimeFormat("pl-PL", { dateStyle: "short", timeStyle: "short" }).format(new Date(attempt.createdAt))}</td></tr>)}</tbody></table>}</section>
    </main>
  );
}
