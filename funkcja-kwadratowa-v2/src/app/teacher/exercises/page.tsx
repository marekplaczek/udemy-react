import Link from "next/link";
import { requireTeacher } from "@/lib/auth";
import { getExerciseBank, getExerciseBankStats, type ExerciseGroup, type ExerciseVerification } from "@/lib/exercises";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  stage?: string;
  group?: string;
  verification?: string;
};

function stageValue(value?: string) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 7 ? n : null;
}

function groupValue(value?: string): ExerciseGroup {
  return value === "chapter" || value === "test" || value === "review" ? value : "all";
}

function verificationValue(value?: string): ExerciseVerification {
  return value === "verified" || value === "review" ? value : "all";
}

function excerpt(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 260 ? `${clean.slice(0, 257)}…` : clean;
}

export default async function ExerciseBankPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const teacher = await requireTeacher();
  const params = await searchParams;
  const filters = {
    q: params.q ?? "",
    stageId: stageValue(params.stage),
    group: groupValue(params.group),
    verification: verificationValue(params.verification),
  };

  const [items, stats] = await Promise.all([
    getExerciseBank(filters),
    getExerciseBankStats(),
  ]);
  const totalForFilter = items[0]?.totalCount ?? 0;

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand"><small>Panel nauczyciela</small><strong>{teacher.display_name}</strong></div>
          <div className="actions" style={{ marginTop: 0 }}>
            <Link className="btn" href="/teacher">Uczniowie</Link>
            <Link className="btn" href="/student">Panel ucznia</Link>
            <Link className="btn" href="/auth/sign-out">Wyloguj</Link>
          </div>
        </div>
      </header>

      <main className="shell">
        <h1 className="section-title">Bank zadań</h1>
        <p className="muted">Zadania ze skanów są indeksowane według źródła, strony, etapu i tematu. Rekordy bez zatwierdzenia wymagają porównania z oryginalnym skanem przed użyciem w automatycznym quizie.</p>

        <div className="grid grid-3" style={{ marginTop: 20 }}>
          <div className="card"><span className="muted">Wszystkie zadania</span><div className="kpi">{stats.total}</div><div className="muted">{stats.chapter} rozdział · {stats.test} test · {stats.review} powtórka</div></div>
          <div className="card"><span className="muted">Do weryfikacji OCR</span><div className="kpi">{stats.needsReview}</div><div className="muted">Zatwierdzone: {stats.verified}</div></div>
          <div className="card"><span className="muted">Z parametrem</span><div className="kpi">{stats.parameters}</div><div className="muted">Automatycznie sklasyfikowane</div></div>
        </div>

        <form className="card exercise-filters" style={{ marginTop: 20 }} method="get">
          <label>
            <span>Wyszukaj</span>
            <input name="q" defaultValue={filters.q} placeholder="np. parametr, Viète, 3.254" />
          </label>
          <label>
            <span>Etap</span>
            <select name="stage" defaultValue={filters.stageId?.toString() ?? ""}>
              <option value="">Wszystkie</option>
              {Array.from({ length: 7 }, (_, i) => i + 1).map((stage) => <option key={stage} value={stage}>Etap {stage}</option>)}
            </select>
          </label>
          <label>
            <span>Zestaw</span>
            <select name="group" defaultValue={filters.group}>
              <option value="all">Wszystkie</option>
              <option value="chapter">Rozdział 3</option>
              <option value="test">Test</option>
              <option value="review">Powtórka</option>
            </select>
          </label>
          <label>
            <span>Weryfikacja</span>
            <select name="verification" defaultValue={filters.verification}>
              <option value="all">Wszystkie</option>
              <option value="review">Do weryfikacji</option>
              <option value="verified">Zatwierdzone</option>
            </select>
          </label>
          <button className="btn btn-primary" type="submit">Filtruj</button>
          <Link className="btn" href="/teacher/exercises">Wyczyść</Link>
        </form>

        <div className="card table-wrap" style={{ marginTop: 20 }}>
          <div className="exercise-bank-summary">
            <strong>Znaleziono: {totalForFilter}</strong>
            {totalForFilter > 100 ? <span className="muted">Pokazuję pierwsze 100 wyników — zawęź filtr lub wyszukiwanie.</span> : null}
          </div>
          <table className="exercise-bank-table">
            <thead><tr><th>Nr</th><th>Etap</th><th>Temat</th><th>Strona</th><th>Stan</th><th>Treść</th><th></th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.exerciseNumber}</strong></td>
                  <td>{item.stageId ?? "—"}</td>
                  <td>{item.topic ?? "—"}{item.hasParameter ? <div className="muted">parametr {item.parameterName ?? ""}</div> : null}</td>
                  <td>{item.pageNumber ?? "—"}</td>
                  <td>{item.verified ? <span className="badge badge-passed">zweryfikowane</span> : <span className="badge badge-review">OCR</span>}</td>
                  <td className="exercise-text-cell">{excerpt(item.text)}</td>
                  <td><Link className="btn" href={`/teacher/exercises/${item.id}`}>Otwórz</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!items.length ? <div className="empty">Brak zadań dla wybranych filtrów.</div> : null}
        </div>
      </main>
    </>
  );
}
