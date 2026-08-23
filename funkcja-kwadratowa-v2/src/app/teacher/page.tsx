import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { requireTeacher } from "@/lib/auth";
import { getTeacherStudents } from "@/lib/progress";

function dateLabel(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default async function TeacherPage() {
  const teacher = await requireTeacher();
  const students = await getTeacherStudents(teacher.id);

  return (
    <>
      <header className="topbar"><div className="topbar-inner"><div className="brand"><small>Panel nauczyciela</small><strong>{teacher.display_name}</strong></div><UserButton /></div></header>
      <main className="shell">
        <h1 className="section-title">Postępy uczniów</h1>
        <p className="muted">Widzisz wyłącznie uczniów przypisanych do Twoich klas.</p>
        {students.length === 0 ? (
          <div className="empty" style={{ marginTop: 20 }}>Brak przypisanych uczniów. Utwórz klasę i przypisz uczniów w bazie — w następnym kroku dodamy obsługę tego bezpośrednio z panelu.</div>
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
