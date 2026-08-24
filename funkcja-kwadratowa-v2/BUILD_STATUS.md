# Build verification

V2 pozostaje niezależnym projektem od V1.

## Stan implementacji

- Produkcyjna wersja V2 działa na Vercelu.
- Bank zadań i panel nauczyciela są obecne w repozytorium.
- Dodano serwerowy helper OpenAI Responses API (`src/lib/openai.ts`).
- Dodano endpoint Tutora AI (`/api/ai/tutor`) z kontekstem aktualnego etapu i opcjonalnego numeru zadania.
- Dodano endpoint sprawdzania rozwiązania ze zdjęcia (`/api/ai/check-solution`). Zdjęcia nie są zapisywane w banku; wywołanie OpenAI używa `store: false`.
- Dodano zakładkę `Tutor AI` w widoku etapu ucznia z czatem i formularzem przesłania zdjęcia rozwiązania.
- Domyślny model: `gpt-5.6-terra`, z możliwością nadpisania przez `OPENAI_MODEL`.

## Przed wdrożeniem AI

1. Ustawić `OPENAI_API_KEY` w środowisku Vercel (najpierw Preview).
2. Uruchomić `npm run lint` i `npm run build`.
3. Wykonać test rozmowy Tutora AI po zalogowaniu.
4. Wykonać test sprawdzania rozwiązania JPEG/PNG/WebP dla zweryfikowanego zadania.
5. Po testach podmienić klucz testowy na produkcyjny i wdrożyć Production.

## Kolejny etap funkcjonalny

Po domknięciu banku zadań należy wykonać mapowanie: zadanie → umiejętność → teoria → poziom trudności → quiz. Następnie Tutor AI powinien automatycznie otrzymywać numer bieżącego zadania bez ręcznego wpisywania go przez ucznia.
