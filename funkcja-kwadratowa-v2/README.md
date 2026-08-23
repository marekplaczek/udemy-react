# Funkcja kwadratowa 2.0

MVP nowej wersji aplikacji: Next.js 16 + Neon Auth + Neon PostgreSQL.

## Stan

- Neon Auth jest warstwą logowania i sesji,
- konto aplikacyjne jest wiązane z `neon_auth.user`,
- poziom ucznia i postęp są odczytywane z PostgreSQL po stronie serwera,
- role: `STUDENT`, `TEACHER`, `ADMIN`,
- model klas i przypisywania uczniów,
- panel nauczyciela z poziomem, liczbą prób i ostatnią aktywnością,
- szczegóły ucznia i historia prób,
- tabela odpowiedzi do późniejszej analizy błędów i umiejętności.

## Zmienne środowiskowe

- `DATABASE_URL`
- `NEON_AUTH_BASE_URL`
- `NEON_AUTH_COOKIE_SECRET` — min. 32 znaki
- `TEACHER_EMAILS` — opcjonalna lista adresów nauczycieli oddzielona przecinkami

## Następny krok

Przenieść silnik 7 etapów z wersji 1 do `src/features/quadratic/` i dodać serwerowy endpoint zapisu próby quizu. To endpoint ma wyliczać zaliczenie, aktualizować `student_progress` i zapisywać `quiz_answers`.
