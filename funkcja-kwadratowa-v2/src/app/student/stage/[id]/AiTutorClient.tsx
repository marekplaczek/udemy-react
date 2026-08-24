"use client";

import { FormEvent, useState } from "react";

 type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function AiTutorClient({ stageId }: { stageId: number }) {
  const [exerciseNumber, setExerciseNumber] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatBusy, setChatBusy] = useState(false);
  const [chatError, setChatError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [review, setReview] = useState("");
  const [reviewBusy, setReviewBusy] = useState(false);
  const [reviewError, setReviewError] = useState("");

  async function askTutor(event: FormEvent) {
    event.preventDefault();
    const text = question.trim();
    if (!text || chatBusy) return;

    const history = messages.slice(-6);
    setChatBusy(true);
    setChatError("");
    setMessages((current) => [...current, { role: "user", text }]);
    setQuestion("");

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stageId,
          question: text,
          exerciseNumber: exerciseNumber.trim() || undefined,
          history,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Nie udało się uzyskać odpowiedzi");
      setMessages((current) => [...current, { role: "assistant", text: data.answer }]);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "Tutor AI jest niedostępny");
    } finally {
      setChatBusy(false);
    }
  }

  async function checkSolution(event: FormEvent) {
    event.preventDefault();
    const number = exerciseNumber.trim();
    if (!number) {
      setReviewError("Najpierw podaj numer zadania, np. 3.147.");
      return;
    }
    if (!image) {
      setReviewError("Dodaj zdjęcie rozwiązania.");
      return;
    }

    setReviewBusy(true);
    setReviewError("");
    setReview("");

    try {
      const form = new FormData();
      form.append("exerciseNumber", number);
      form.append("image", image);
      const response = await fetch("/api/ai/check-solution", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Nie udało się sprawdzić rozwiązania");
      setReview(data.review);
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : "Sprawdzanie jest niedostępne");
    } finally {
      setReviewBusy(false);
    }
  }

  return (
    <section className="ai-grid">
      <div className="card ai-panel">
        <div className="ai-heading-row">
          <div>
            <span className="badge badge-current">Tutor AI</span>
            <h2 className="theory-heading">Zapytaj o funkcję kwadratową</h2>
          </div>
        </div>
        <p className="muted ai-description">
          Tutor zna teorię tego etapu. Jeśli podasz numer zadania, dołączy również jego treść z banku.
        </p>

        <label className="ai-field">
          <span>Numer zadania — opcjonalnie</span>
          <input
            value={exerciseNumber}
            onChange={(event) => setExerciseNumber(event.target.value)}
            placeholder="np. 3.147"
            autoComplete="off"
          />
        </label>

        <div className="ai-chat" aria-live="polite">
          {messages.length === 0 ? (
            <div className="empty ai-empty">
              Możesz zapytać np. „Dlaczego w nierówności wybieramy przedziały poza miejscami zerowymi?”
            </div>
          ) : messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`ai-message ai-message-${message.role}`}>
              <strong>{message.role === "user" ? "Ty" : "Tutor"}</strong>
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        <form onSubmit={askTutor} className="ai-form">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Wpisz pytanie..."
            rows={4}
            maxLength={3000}
          />
          {chatError ? <div className="note ai-error">{chatError}</div> : null}
          <button className="btn btn-primary" disabled={chatBusy || !question.trim()}>
            {chatBusy ? "Tutor odpowiada…" : "Zapytaj AI"}
          </button>
        </form>
      </div>

      <div className="card ai-panel">
        <span className="badge badge-current">Sprawdź zdjęcie</span>
        <h2 className="theory-heading">Sprawdź moje rozwiązanie</h2>
        <p className="muted ai-description">
          Wpisz numer zadania i zrób zdjęcie kartki. AI wskaże poprawne kroki oraz pierwszy istotny błąd.
        </p>

        <form onSubmit={checkSolution} className="ai-form">
          <label className="ai-field">
            <span>Numer zadania</span>
            <input
              value={exerciseNumber}
              onChange={(event) => setExerciseNumber(event.target.value)}
              placeholder="np. 3.147"
              autoComplete="off"
              required
            />
          </label>
          <label className="ai-field">
            <span>Zdjęcie rozwiązania</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              required
            />
          </label>
          <div className="muted ai-file-note">JPEG, PNG lub WebP, maksymalnie 8 MB. Zdjęcie nie jest zapisywane w banku zadań.</div>
          {reviewError ? <div className="note ai-error">{reviewError}</div> : null}
          <button className="btn btn-primary" disabled={reviewBusy || !image || !exerciseNumber.trim()}>
            {reviewBusy ? "Analizuję zdjęcie…" : "Sprawdź rozwiązanie"}
          </button>
        </form>

        {review ? (
          <div className="ai-review" aria-live="polite">
            <h3>Ocena rozwiązania</h3>
            <div>{review}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
