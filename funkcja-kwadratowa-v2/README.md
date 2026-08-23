# Funkcja kwadratowa 2.0

Aplikacja Next.js 16 + Neon Auth + Neon PostgreSQL do nauki funkcji kwadratowej z kontami uczniów i panelem nauczyciela.

## Gotowe funkcje

- logowanie i rejestracja przez Neon Auth,
- role `STUDENT`, `TEACHER`, `ADMIN`,
- jednorazowa aktywacja konta nauczyciela,
- siedem etapów teorii i quizów,
- 6 losowanych pytań w każdym quizie,
- poprawne odpowiedzi przechowywane i sprawdzane po stronie serwera,
- wymagane 100% do odblokowania kolejnego etapu,
- zapis prób, odpowiedzi, najlepszych wyników i ostatniej aktywności,
- klasy i przypisywanie uczniów przez nauczyciela,
- panel nauczyciela: poziom, historia prób, skuteczność według umiejętności i ostatnie błędne odpowiedzi.

## Zmienne środowiskowe

- `DATABASE_URL` — połączenie z Neon PostgreSQL,
- `NEON_AUTH_BASE_URL` — URL usługi Neon Auth,
- `NEON_AUTH_COOKIE_SECRET` — sekret o długości co najmniej 32 znaków,
- `TEACHER_EMAILS` — opcjonalna lista adresów, które automatycznie otrzymują rolę nauczyciela.

## Baza

Schemat odtwarzający warstwę aplikacyjną znajduje się w `db/schema.sql`. Neon Auth musi zostać wcześniej provisionowany dla tej samej bazy.

## Bezpieczeństwo quizu

Klient otrzymuje treść zadania i warianty odpowiedzi, ale nie poprawną odpowiedź. Odpowiedzi są oceniane przez endpoint serwerowy. Dopiero serwer zapisuje zaliczenie etapu i wylicza aktualny poziom.
