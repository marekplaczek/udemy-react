"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  ordinal: number;
  q: string;
  expr: string | null;
  type: "input" | "choice";
  options: string[] | null;
  source?: "bank" | "generated";
  exerciseNumber?: string | null;
  module?: string | null;
};

type StartResponse = { sessionId: string; stageId: number; questions: Question[]; error?: string };
type AnswerResponse = {
  correct: boolean;
  solution: string;
  completed: boolean;
  score?: number;
  maxScore?: number;
  passed?: boolean;
  currentLevel?: number | null;
  error?: string;
};

export default function QuizClient({ stageId }: { stageId: number }) {
  const [sessionId, setSessionId] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<AnswerResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/quiz/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stageId }),
        });
        const data = await response.json() as StartResponse;
        if (!response.ok) throw new Error(data.error || "Nie udało się rozpocząć quizu.");
        if (!cancelled) {
          setSessionId(data.sessionId);
          setQuestions(data.questions);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Błąd uruchamiania quizu.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [stageId]);

  if (loading) return <div className="card">Losuję zestaw zadań z modułów etapu…</div>;
  if (error) return <div className="card"><strong>Nie udało się uruchomić quizu.</strong><p className="muted">{error}</p><Link className="btn" href="/student">Wróć</Link></div>;
  const question = questions[index];
  if (!question) return <div className="card">Brak pytania.</div>;

  async function submit(answer: string) {
    if (feedback || !answer.trim()) return;
    setError("");
    try {
      const response = await fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, questionId: question.id, answer }),
      });
      const data = await response.json() as AnswerResponse;
      if (!response.ok) throw new Error(data.error || "Nie udało się sprawdzić odpowiedzi.");
      setValue(answer);
      setFeedback(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Błąd sprawdzania odpowiedzi.");
    }
  }

  function next() {
    setIndex((current) => current + 1);
    setValue("");
    setFeedback(null);
    setError("");
  }

  if (feedback?.completed) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <div className="kpi">{feedback.score}/{feedback.maxScore}</div>
        <h2 className="section-title">{feedback.passed ? "Etap zaliczony" : "Potrzebne jest 100%"}</h2>
        <p className="muted">{feedback.passed ? `Serwer odblokował poziom ${feedback.currentLevel ?? 1}.` : "Spróbuj ponownie — nowy zestaw zostanie wylosowany z modułów etapu."}</p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/student">Panel ucznia</Link>
          {!feedback.passed ? <button className="btn" onClick={() => window.location.reload()}>Nowy zestaw</button> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="muted">Zadanie {index + 1}/{questions.length}</div>
      <div className={`quiz-source ${question.source === "bank" ? "quiz-source-bank" : ""}`}>
        {question.source === "bank" ? `Z banku zadań${question.exerciseNumber ? ` • ${question.exerciseNumber}` : ""}` : "Zadanie generowane"}
      </div>
      <h2 style={{ fontFamily: "Georgia, serif", lineHeight: 1.4 }}>{question.q}</h2>
      {question.expr ? <div style={{ padding: 16, background: "#f5f3ff", borderRadius: 12, fontFamily: "Georgia, serif", fontSize: 20, textAlign: "center", marginBottom: 16 }}>{question.expr}</div> : null}

      {question.type === "choice" ? (
        <div className="stage-list">
          {(question.options ?? []).map((option) => <button key={option} className="btn" disabled={Boolean(feedback)} onClick={() => submit(option)}>{option}</button>)}
        </div>
      ) : (
        <div className="actions">
          <input value={value} disabled={Boolean(feedback)} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(value); }} placeholder="Twoja odpowiedź" style={{ flex: 1, minWidth: 180, padding: "11px 14px", border: "1px solid #cbd5e1", borderRadius: 10 }} />
          {!feedback ? <button className="btn btn-primary" onClick={() => submit(value)}>Sprawdź</button> : null}
        </div>
      )}

      {error ? <p style={{ color: "#b91c1c" }}>{error}</p> : null}
      {feedback ? (
        <div style={{ marginTop: 18, padding: 16, borderRadius: 12, background: feedback.correct ? "#ecfdf5" : "#fff1f2" }}>
          <strong>{feedback.correct ? "Dobrze" : "Niepoprawna odpowiedź"}</strong>
          <p style={{ lineHeight: 1.6 }}>{feedback.solution}</p>
          <button className="btn btn-primary" onClick={next}>Następne zadanie</button>
        </div>
      ) : null}
    </div>
  );
}
