# Funkcja kwadratowa 2.0

MVP nowej wersji aplikacji: Next.js 16 + Clerk + Neon PostgreSQL.

## Co jest gotowe

- logowanie i rejestracja użytkowników przez Clerk,
- role `STUDENT`, `TEACHER`, `ADMIN`,
- automatyczne utworzenie rekordu użytkownika po pierwszym wejściu,
- serwerowy odczyt aktualnego poziomu i siedmiu etapów,
- endpoint `GET /api/me/progress`,
- model klas i przypisywania uczniów,
- panel nauczyciela z poziomem, liczbą prób i ostatnią aktywnością,
- szczegóły ucznia i historia prób quizów.

## Konfiguracja

1. Utwórz aplikację Clerk i ustaw `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` oraz `CLERK_SECRET_KEY`.
2. Utwórz PostgreSQL (rekomendowany Neon na Vercel Marketplace) i ustaw `DATABASE_URL`.
3. Uruchom `db/schema.sql` na bazie.
4. W `TEACHER_EMAILS` wpisz adresy nauczycieli oddzielone przecinkami. Konto z takim adresem przy logowaniu otrzyma rolę `TEACHER`.
5. Ustaw ścieżki Clerk: `/sign-in` i `/sign-up`.

## Następny krok

Przenieść obecny silnik siedmiu etapów do `src/features/quadratic/`, a generowanie i weryfikację odpowiedzi rozdzielić tak, aby poprawna odpowiedź nie była źródłem prawdy w przeglądarce. Po zaliczeniu serwer zapisze `quiz_attempts` i zaktualizuje `student_progress`.
