import Link from "next/link";
import { notFound } from "next/navigation";
import { requireTeacher } from "@/lib/auth";
import { getExerciseById } from "@/lib/exercises";
import { reviewExercise } from "../exercises/actions";

export const dynamic = "force-dynamic";

type SearchParams = { id?: string; saved?: string };

export default async function ExerciseReviewPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const teacher = await requireTeacher();
  const params = await searchParams;
  const id = Number(params.id);
  const exercise = await getExerciseById(id);
  if (!exercise) notFound();

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand"><small>Bank zadań</small><strong>{exercise.exerciseNumber}</strong></div>
          <div className="actions" style={{ marginTop: 0 }}>
            <Link className="btn" href="/teacher/exercises">Lista zadań</Link>
            <Link className="btn" href="/teacher">Panel nauczyciela</Link>
            <Link className="btn" href="/auth/sign-out">Wyloguj</Link>
          </div>
        </div>
      </header>

      <main className="shell">
        {params.saved ? <div className="note success-note">Zmiany zostały zapisane.</div> : null}
        <div className="grid grid-2 exercise-review-grid">
          <section className="card">
            <h1 className="section-title">Zadanie {exercise.exerciseNumber}</h1>
            <p className="muted">Źródło: {exercise.sourceTitle} · strona {exercise.pageNumber ?? "—"}</p>
            <div className="note"><strong>Treść źródłowa z OCR.</strong> Wzory matematyczne i znaki należy porównać ze skanem przed oznaczeniem rekordu jako zweryfikowany.</div>
            <h2 className="theory-heading">Oryginalny odczyt</h2>
            <pre className="ocr-source">{exercise.textOriginal}</pre>
            <div className="muted" style={{ marginTop: 16 }}>
              Plik: {exercise.originalFilename}<br />
              Import: {exercise.importStatus} · źródło pliku: {exercise.storageProvider ?? "—"}
            </div>
          </section>

          <section className="card">
            <h2 className="section-title" style={{ fontSize: 23 }}>Weryfikacja zadania</h2>
            <p className="muted">Edytuje: {teacher.display_name}</p>
            <form action={reviewExercise} className="exercise-review-form">
              <input type="hidden" name="id" value={exercise.id} />
              <label>
                <span>Poprawiona treść</span>
                <textarea name="textNormalized" required rows={14} defaultValue={exercise.textNormalized ?? exercise.textOriginal} />
              </label>
              <div className="grid grid-2">
                <label>
                  <span>Etap</span>
                  <select name="stageId" defaultValue={exercise.stageId?.toString() ?? "1"} required>
                    {Array.from({ length: 7 }, (_, i) => i + 1).map((stage) => <option key={stage} value={stage}>Etap {stage}</option>)}
                  </select>
                </label>
                <label>
                  <span>Trudność</span>
                  <select name="difficulty" defaultValue={exercise.difficulty?.toString() ?? ""}>
                    <option value="">Nieustalona</option>
                    {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value}/5</option>)}
                  </select>
                </label>
              </div>
              <label>
                <span>Temat</span>
                <input name="topic" required maxLength={160} defaultValue={exercise.topic ?? "funkcja kwadratowa"} />
              </label>
              <label className="checkbox-row">
                <input type="checkbox" name="verified" defaultChecked={exercise.verified} />
                <span>Treść porównana ze skanem — zadanie zweryfikowane</span>
              </label>
              <button className="btn btn-primary full-btn" type="submit">Zapisz weryfikację</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
