import Link from "next/link";
import { requireAppUser } from "@/lib/auth";
import { activateTeacher } from "./actions";

export const dynamic = "force-dynamic";

export default async function ActivateTeacherPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const user = await requireAppUser();
  const { error } = await searchParams;

  return (
    <main className="shell" style={{ maxWidth: 620 }}>
      <div className="actions"><Link className="btn" href="/student">← Panel ucznia</Link></div>
      <section className="card" style={{ marginTop: 22 }}>
        <h1 className="section-title">Aktywacja konta nauczyciela</h1>
        <p className="muted">Zalogowano jako {user.display_name}. Rola nauczyciela wymaga jednorazowego kodu wydanego administratorowi systemu.</p>
        {error ? <div className="note" style={{ borderLeftColor: "#ef4444", background: "#fff1f2", color: "#991b1b" }}>{error}</div> : null}
        <form action={activateTeacher} style={{ marginTop: 20 }}>
          <label htmlFor="code"><strong>Kod aktywacyjny</strong></label>
          <input id="code" name="code" autoComplete="off" required placeholder="TEACH-..." style={{ width: "100%", marginTop: 8, padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 10 }} />
          <button className="btn btn-primary full-btn" type="submit">Aktywuj rolę nauczyciela</button>
        </form>
      </section>
    </main>
  );
}
