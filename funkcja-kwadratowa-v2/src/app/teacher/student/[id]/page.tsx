import { notFound } from "next/navigation";
import Link from "next/link";
import { requireTeacher } from "@/lib/auth";
import { getTeacherStudentDetail } from "@/lib/progress";
import { STAGES } from "@/features/quadratic/content";

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function skillLabel(value: string) {
  return value.replaceAll("-", " ").replace(/^./, (c) => c.toUpperCase());
}

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

      <section className="card" style={{ marginTop: 20 }}>
        <h2 className="section-title" style={{ fontSize: 21 }}>Etapy</h2>
        <div className="stage-list">{detail.progress.stages.map((stage) => (
          <div className="stage" key={stage.stageId}>
            <div><strong>Etap {stage.stageId}. {STAGES[stage.stageId - 1].title}</strong><div className="muted">{STAGES[stage.stageId - 1].subtitle}</div></div>
            <span>{stage.status} · prób: {stage.attempts} · wynik: {stage.bestScore}%</span>
          </div>
        ))}</div>
      </section>

      <section className="card" style={{ marginTop: 20 }}>
        <h2 className="section-title" style={{ fontSize: 21 }}>Umiejętności</h2>
        {detail.skills.length === 0 ? <p className="muted">Brak danych — uczeń nie zakończył jeszcze quizu.</p> : (
          <div className="skill-grid">{detail.skills.map((skill) => (
            <div className="skill-row" key={skill.skill}>
              <strong>{skillLabel(skill.skill)}</strong>
              <div className="skill-bar" aria-label={`${skill.accuracy}% poprawnych`}><span style={{ width: `${skill.accuracy}%` }} /></div>
              <span>{skill.accuracy}% <span className="muted">({skill.correct}/{skill.total})</span></span>
            </div>
          ))}</div>
        )}
      </section>

      <section className="card table-wrap" style={{ marginTop: 20 }}>
        <h2 className="section-title" style={{ fontSize: 21 }}>Ostatnie próby</h2>
        {detail.attempts.length === 0 ? <p className="muted">Brak prób quizów.</p> : <table><thead><tr><th>Etap</th><th>Wynik</th><th>Data</th></tr></thead><tbody>{detail.attempts.map((attempt) => <tr key={attempt.id}><td>{attempt.stageId}</td><td>{attempt.score}/{attempt.maxScore}</td><td>{dateLabel(attempt.createdAt)}</td></tr>)}</tbody></table>}
      </section>

      <section className="card table-wrap" style={{ marginTop: 20 }}>
        <h2 className="section-title" style={{ fontSize: 21 }}>Ostatnie błędne odpowiedzi</h2>
        {detail.recentWrongAnswers.length === 0 ? <p className="muted">Brak błędnych odpowiedzi w zapisanej historii.</p> : (
          <table>
            <thead><tr><th>Etap</th><th>Umiejętność</th><th>Zadanie</th><th>Odpowiedź ucznia</th><th>Poprawna</th><th>Data</th></tr></thead>
            <tbody>{detail.recentWrongAnswers.map((row, index) => (
              <tr key={`${row.createdAt}-${index}`}>
                <td>{row.stageId}</td><td>{row.skill ? skillLabel(row.skill) : "—"}</td><td style={{ whiteSpace: "normal", minWidth: 260 }}>{row.questionText}</td><td>{row.studentAnswer}</td><td>{row.correctAnswer}</td><td>{dateLabel(row.createdAt)}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </section>
    </main>
  );
}
