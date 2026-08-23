import Link from "next/link";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { user } = await auth.getSession();

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand"><small>Matematyka · poziom rozszerzony</small><strong>Funkcja kwadratowa 2.0</strong></div>
          {user ? <Link className="btn" href="/auth/sign-out">Wyloguj</Link> : null}
        </div>
      </header>
      <main className="shell">
        <section className="hero">
          <h1>Nauka z postępem zapisanym na serwerze</h1>
          <p>Nowa wersja zachowuje siedem etapów nauki, ale dodaje konta uczniów, serwerowy poziom oraz panel nauczyciela do kontroli wyników.</p>
          <div className="actions">
            {!user ? (
              <>
                <Link className="btn btn-primary" href="/auth/sign-in">Zaloguj się</Link>
                <Link className="btn" href="/auth/sign-up">Utwórz konto</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-primary" href="/student">Panel ucznia</Link>
                <Link className="btn" href="/teacher">Panel nauczyciela</Link>
              </>
            )}
          </div>
        </section>
        <section className="grid grid-3">
          <div className="card"><strong>7 etapów</strong><p className="muted">Obecny program funkcji kwadratowej zostanie przeniesiony bez zmiany logiki dydaktycznej.</p></div>
          <div className="card"><strong>Poziom z serwera</strong><p className="muted">Odblokowanie etapów jest wyliczane z danych PostgreSQL, a nie z localStorage.</p></div>
          <div className="card"><strong>Panel nauczyciela</strong><p className="muted">Klasy, poziom ucznia, liczba prób, wyniki i ostatnia aktywność.</p></div>
        </section>
      </main>
    </>
  );
}
