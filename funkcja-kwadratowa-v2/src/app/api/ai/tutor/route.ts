import { getSessionUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { callOpenAI } from "@/lib/openai";
import { getStageContent } from "@/features/quadratic/content";

export const runtime = "nodejs";

function asNumber(value: unknown) {
  const n = Number(value);
  return Number.isInteger(n) ? n : null;
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Brak autoryzacji" }, { status: 401 });

  const body = await request.json().catch(() => null) as {
    stageId?: unknown;
    question?: unknown;
    exerciseNumber?: unknown;
    history?: unknown;
  } | null;

  const stageId = asNumber(body?.stageId);
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  const exerciseNumber = typeof body?.exerciseNumber === "string" ? body.exerciseNumber.trim() : "";
  const history = Array.isArray(body?.history) ? body.history.slice(-6) : [];

  if (!stageId || !question || question.length > 3000) {
    return Response.json({ error: "Nieprawidłowe dane wejściowe" }, { status: 400 });
  }

  const stage = getStageContent(stageId);
  if (!stage) return Response.json({ error: "Nieznany etap" }, { status: 404 });

  let exerciseContext = "Brak wskazanego konkretnego zadania.";
  if (exerciseNumber) {
    const rows = await sql`
      select exercise_number,
             coalesce(nullif(text_normalized, ''), text_original) as text,
             topic,
             difficulty,
             answer,
             solution,
             verified
      from exercises
      where exercise_number = ${exerciseNumber}
        and is_active = true
      limit 1
    `;
    if (rows.length) {
      const row = rows[0];
      exerciseContext = [
        `Numer: ${row.exercise_number}`,
        `Treść: ${row.text}`,
        row.topic ? `Temat: ${row.topic}` : null,
        row.difficulty ? `Trudność: ${row.difficulty}` : null,
        row.verified ? "Treść zweryfikowana: tak" : "Treść zweryfikowana: nie",
        row.answer ? `Zweryfikowana odpowiedź: ${row.answer}` : "Zweryfikowana odpowiedź: brak",
        row.solution ? `Rozwiązanie wzorcowe: ${row.solution}` : "Rozwiązanie wzorcowe: brak",
      ].filter(Boolean).join("\n");
    } else {
      exerciseContext = `Nie znaleziono zadania ${exerciseNumber} w banku.`;
    }
  }

  const safeHistory = history
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = "role" in item && (item.role === "user" || item.role === "assistant") ? item.role : null;
      const text = "text" in item && typeof item.text === "string" ? item.text.slice(0, 2000) : null;
      return role && text ? `${role === "user" ? "Uczeń" : "Tutor"}: ${text}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const moduleContext = stage.modules.map((module) => [
    `${module.title} (${module.sourceRange})`,
    `Wzory: ${module.formulas.join("; ")}`,
    `Umiejętności: ${module.bullets.join("; ")}`,
    `Rozpoznanie zadania: ${module.recognize.join("; ")}`,
    `Pułapki: ${module.pitfalls.join("; ")}`,
  ].join("\n")).join("\n\n");

  const instructions = `Jesteś polskojęzycznym tutorem matematyki dla ucznia szkoły średniej. Pracujesz wyłącznie w kontekście rozdziału o funkcji kwadratowej.

Zasady:
- wyjaśniaj krok po kroku i używaj poprawnej notacji matematycznej;
- jeśli uczeń prosi o pomoc w zadaniu, najpierw naprowadzaj i wskazuj kolejny krok, zamiast od razu podawać całe rozwiązanie, chyba że uczeń wyraźnie poprosi o pełne rozwiązanie;
- nie wymyślaj danych brakujących w treści zadania; jeśli materiał jest niepełny, powiedz to;
- jeżeli w banku jest zweryfikowana odpowiedź lub rozwiązanie, traktuj je jako źródło nadrzędne;
- jeśli zadanie nie jest zweryfikowane, zaznacz to przy odpowiedzi dotyczącej jego dokładnej treści;
- odpowiedzi mają być zwięzłe, dydaktyczne i po polsku.`;

  const context = `AKTUALNY ETAP ${stage.id}: ${stage.title}
${stage.subtitle}

Podsumowanie etapu:
${stage.intro}
Wzory: ${stage.formulas.join("; ")}
Zasady: ${stage.bullets.join("; ")}
${stage.note ? `Uwaga: ${stage.note}` : ""}
${stage.example ? `Przykład: ${stage.example}` : ""}

MODUŁY TEORII POWIĄZANE Z BANKIEM ZADAŃ:
${moduleContext}

Kontekst zadania:
${exerciseContext}

${safeHistory ? `Ostatnia rozmowa:\n${safeHistory}\n\n` : ""}Pytanie ucznia:
${question}`;

  try {
    const answer = await callOpenAI({
      instructions,
      content: [{ type: "input_text", text: context }],
      maxOutputTokens: 1400,
    });
    return Response.json({ answer });
  } catch (error) {
    console.error("AI tutor error", error);
    return Response.json({ error: "Tutor AI jest chwilowo niedostępny" }, { status: 503 });
  }
}
