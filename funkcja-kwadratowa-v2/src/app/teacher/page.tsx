import Link from "next/link";
import { requireTeacher } from "@/lib/auth";
import { getTeacherClasses, getTeacherStudents } from "@/lib/progress";
import { assignStudent, createClass } from "./actions";

export const dynamic = "force-dynamic";

function dateLabel(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default async function TeacherPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const teacher = await requireTeacher();
  const [students, classes, params] = await Promise.all([
    getTeacherStudents(teacher.id),
    getTeacherClasses(teacher.id),
    searchParams,
  ]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand"><small>Panel nauczyciela</small><strong>{teacher.display_name}</strong></div>
          <div className="actions" style={{ marginTop: 0 }}><Link className="btn" href="/teacher/exercises">Bank zadań</Link><Link className="btn" href="/student">Panel ucznia</Link><Link className="btn" href="/auth/sign-out">Wyloguj</Link></div>
        </div>
      </header>
      <main className="shell">
        <h1 className="section-title">Postępy uczniów</h1>
        <p className="muted">Widzisz wyłącznie uczniów przypisanych do Twoich klas.</p>
        {params.notice ? <div className="note" style={{ borderLeftColor: "#22c55e", background: "#f0fdf4", color: "#166534" }}>{params.notice}</div> : null}

        <div className="grid grid-2" style={{ marginTop: 20 }}>
          <section className="card">
            <h2 className="section-title" style={{ fontSize: 21 }}>Utwórz klasę</h2>
            <form action={createClass}>
              <input name="name" required minLength={2} maxLength={80} placeholder="np. 2A — matematyka rozszerzona" style={{ width: "100%", padding: "11px 13px", border: "1px solid #cbd5e1", borderRadius: 10 }} />
              <button className="btn btn-primary full-btn" type="submit">Utwórz klasę</button>
            </form>
            {classes.length ? <p className="muted">Klasy: {classes.map((c) => `${c.name} (${c.studentCount})`).join(", ")}</p> : <p className="muted">Nie masz jeszcze klas.</p>}
          </section>
          <section className="card">
            <h2 className="section-title" style={{ fontSize: 21 }}>Przypisz ucznia</h2>
            {classes.length ? (
              <form action={assignStudent}>
                <select name="classId" required style={{ width: "100%", padding: "11px 13px", border: "1px solid #cbd5e1", borderRadius: 10, background: "white" }}>
                  {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input name="email" type="email" required placeholder="email ucznia" style={{ width: "100%", marginTop: 10, padding: "11px 13px", border: "1px solid #cbd5e1", borderRadius: 10 }} />
                <button className="btn btn-primary full-btn" type="submit">Przypisz do klasy</button>
              </form>
            ) : <p className="muted">Najpierw utwórz klasę.</p>}
          </section>
        </div>

        {students.length === 0 ? (
          <div className="empty" style={{ marginTop: 20 }}>Brak przypisanych uczniów. Uczeń musi najpierw utworzyć konto, a następnie możesz przypisać go do klasy po adresie e-mail.</div>
        ) : (
          <div className="card table-wrap" style={{ marginTop: 20 }}>
            <table>
              <thead><tr><th>Uczeń</th><th>Klasa</th><th>Poziom</th><th>Zaliczone</th><th>Próby</th><th>Ostatnia aktywność</th><th></th></tr></thead>
              <tbody>{students.map((student) => (
                <tr key={`${student.classId}-${student.id}`}>
                  <td><strong>{student.displayName}</strong><div className="muted">{student.email ?? ""}</div></td>
                  <td>{student.className}</td><td>{student.currentLevel}/7</td><td>{student.passedStages}/7</td><td>{student.attempts}</td><td>{dateLabel(student.lastActivity)}</td>
                  <td><Link className="btn" href={`/teacher/student/${student.id}`}>Szczegóły</Link></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
