import { getSessionUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { callOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Brak autoryzacji" }, { status: 401 });

  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: "Nieprawidłowe dane" }, { status: 400 });

  const exerciseNumber = String(form.get("exerciseNumber") || "").trim();
  const image = form.get("image");

  if (!exerciseNumber) {
    return Response.json({ error: "Podaj numer zadania" }, { status: 400 });
  }
  if (!(image instanceof File)) {
    return Response.json({ error: "Dodaj zdjęcie rozwiązania" }, { status: 400 });
  }
  if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
    return Response.json({ error: "Obsługiwane są zdjęcia JPEG, PNG i WebP" }, { status: 400 });
  }
  if (image.size <= 0 || image.size > MAX_IMAGE_BYTES) {
    return Response.json({ error: "Zdjęcie może mieć maksymalnie 8 MB" }, { status: 400 });
  }

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

  if (!rows.length) {
    return Response.json({ error: `Nie znaleziono zadania ${exerciseNumber}` }, { status: 404 });
  }

  const exercise = rows[0];
  const bytes = Buffer.from(await image.arrayBuffer());
  const imageUrl = `data:${image.type};base64,${bytes.toString("base64")}`;

  const reference = [
    `Numer zadania: ${exercise.exercise_number}`,
    `Treść zadania: ${exercise.text}`,
    exercise.topic ? `Temat: ${exercise.topic}` : null,
    exercise.difficulty ? `Trudność: ${exercise.difficulty}` : null,
    `Treść zweryfikowana: ${exercise.verified ? "tak" : "nie"}`,
    exercise.answer ? `Zweryfikowana odpowiedź: ${exercise.answer}` : "Zweryfikowana odpowiedź: brak",
    exercise.solution ? `Rozwiązanie wzorcowe: ${exercise.solution}` : "Rozwiązanie wzorcowe: brak",
  ].filter(Boolean).join("\n");

  const instructions = `Jesteś polskojęzycznym nauczycielem matematyki. Oceniasz rozwiązanie ucznia zapisane odręcznie na zdjęciu.

Zasady:
- najpierw dokładnie odczytaj zapis ze zdjęcia; jeśli fragment jest nieczytelny, nie zgaduj;
- porównaj tok rozumowania z treścią zadania i, jeśli istnieją, ze zweryfikowaną odpowiedzią oraz rozwiązaniem wzorcowym;
- gdy brak rozwiązania wzorcowego, samodzielnie sprawdź matematykę, ale zaznacz, że ocena nie korzystała ze zweryfikowanego klucza;
- wskaż pierwszy istotny błąd, a nie tylko końcowy zły wynik;
- nie oceniaj charakteru pisma ani estetyki;
- odpowiedz po polsku i zwięźle.

Użyj dokładnie sekcji:
Ocena: POPRAWNE | CZĘŚCIOWO POPRAWNE | BŁĘDNE | NIECZYTELNE
Odczyt rozwiązania:
Co jest dobrze:
Pierwszy błąd lub problem:
Jak poprawić / następny krok:`;

  try {
    const review = await callOpenAI({
      instructions,
      content: [
        { type: "input_text", text: reference },
        { type: "input_image", image_url: imageUrl, detail: "high" },
      ],
      maxOutputTokens: 1800,
    });

    return Response.json({ review, verifiedExercise: Boolean(exercise.verified) });
  } catch (error) {
    console.error("AI solution review error", error);
    return Response.json({ error: "Sprawdzanie rozwiązania jest chwilowo niedostępne" }, { status: 503 });
  }
}
