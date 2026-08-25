# Funkcja kwadratowa V2 — handoff do Codexa

Stan na: 2026-08-25

## 1. Cel projektu

Aplikacja edukacyjna do nauki funkcji kwadratowej. V2 ma:
- 7 etapów nauki,
- 15 modułów tematycznych,
- teorię z wykresami i przykładami,
- bank 336 rzeczywistych zadań z zeskanowanego podręcznika,
- quizy budowane z banku + fallback generatora,
- zapis postępu ucznia,
- panel nauczyciela,
- Tutor AI,
- sprawdzanie rozwiązania ze zdjęcia.

WAŻNE: istnieje osobna wersja V1. Nie modyfikować jej ani jej projektu Vercel.

## 2. Repozytorium i katalog

Repo: `marekplaczek/udemy-react`

Pracuj wyłącznie w:

```text
funkcja-kwadratowa-v2/
```

Branch: `main`

Stan referencyjny przy przygotowaniu handoffu:

```text
6ab30a7f57a0fcc6f98cb2fcafb4e84da3bf9395
feat(v2): merge additional theory examples into modules
```

Po uruchomieniu na PC wykonaj:

```bash
git pull
cd funkcja-kwadratowa-v2
npm install
npm run lint
npm run typecheck
npm run test:answers
npm run build
```

Ostatni GitHub Actions CI dla commita `6ab30a7...` zakończył się `success`.

## 3. Stack

- Next.js 16.3.2
- React 19.2
- TypeScript 5.9
- Neon Postgres
- Neon Auth
- Vercel
- OpenAI Responses API po stronie serwera

Skrypty z `package.json`:

```text
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test:answers
```

## 4. Neon — stan bazy

Projekt Neon:

```text
project: funkcja-kwadratowa-v2
project id: cool-bonus-84650565
branch id: br-jolly-mud-afnxxo0b
database: neondb
role: neondb_owner
```

Nie zapisuj connection stringów ani haseł w repozytorium.

Aktualny stan tabeli `exercises`:

```text
total:         336
verified:      336
with answer:   336
with solution: 336
```

Każde zadanie ma więc zweryfikowaną treść, odpowiedź i rozwiązanie wzorcowe.

Główne tabele banku:
- `exercise_sources`
- `exercises`
- `exercise_scan_regions`
- `exercise_tags`

Główne tabele aplikacji:
- `app_users`
- `classes`
- `class_students`
- `student_progress`
- `quiz_attempts`
- `quiz_answers`
- `quiz_sessions`
- `quiz_session_questions`
- `teacher_activation_codes`

### Moduły banku

```text
module:01-general-form                  3.1–3.4
module:02-canonical-vertex-discriminant 3.5–3.27
module:03-zeros-product-form            3.28–3.48
module:04-graph-properties              3.49–3.58
module:05-reconstruct-function          3.59–3.78
module:06-extrema-on-interval           3.79–3.92
module:07-optimization                  3.93–3.120
module:08-quadratic-equations           3.121–3.137
module:09-reducible-equations           3.138–3.146
module:10-quadratic-inequalities        3.147–3.166
module:11-word-and-model-equations      3.167–3.190
module:12-radicals                      3.191–3.200
module:13-absolute-value                3.201–3.220
module:14-vieta                         3.221–3.241
module:15-parameter                     3.242–3.288
```

### Ostatnia korekta klasyfikacji POWT

W trakcie smoke testu zadanie POWT-22 o uściskach dłoni pojawiło się w etapie 1. Przyczyna: zbyt zgrubne przypisanie części zadań powtórzeniowych.

Poprawiono:

```text
POWT-13  -> stage 7, module:09-reducible-equations
POWT-18  -> stage 3, module:03-zeros-product-form
POWT-20  -> stage 7, module:11-word-and-model-equations
POWT-21  -> stage 7, module:11-word-and-model-equations
POWT-22  -> stage 7, module:11-word-and-model-equations
POWT-23  -> stage 7, module:11-word-and-model-equations
POWT-28  -> stage 6, module:07-optimization
POWT-35  -> stage 4, module:14-vieta
POWT-36  -> stage 4, module:14-vieta
POWT-37  -> stage 4, module:14-vieta
POWT-38  -> stage 4, module:14-vieta
```

Należy jeszcze zrobić pełny audyt semantyczny wszystkich `TEST-*` i `POWT-*`, a nie zakładać, że reszta klasyfikacji jest idealna.

## 5. Teoria — aktualny stan

Podstawowa mapa teorii jest w:

```text
THEORY_COVERAGE.md
src/features/quadratic/content.ts
```

Teoria została już rozbudowana o system dodatkowych materiałów:

```text
src/features/quadratic/TheoryEnrichmentBlock.tsx
src/features/quadratic/theoryEnrichment.ts
src/features/quadratic/theoryEnrichmentAdditional.ts
src/features/quadratic/theoryEnrichment.module.css
src/features/quadratic/QuadraticCoefficientComparison.tsx
src/features/quadratic/QuadraticCoefficientComparison.module.css
src/features/quadratic/Parabola.tsx
```

`TheoryEnrichmentBlock` łączy bazowe i dodatkowe przykłady.

W module 01 są już m.in. wykresy:
- `f(x)=x²` — `a>0`, ramiona w górę,
- `f(x)=-x²+4` — `a<0`, ramiona w dół,
- `f(x)=-2x²+4x` — `a<0` z przesuniętym wierzchołkiem.

Są też:
- przykłady rozwiązane krok po kroku,
- krótkie zadania `Spróbuj sam`,
- odpowiedzi rozwijane przez `<details>`.

Ostatnie commity dotyczące teorii:

```text
baa7938 feat(v2): add richer theory examples for stages 1-3
16010c1 feat(v2): render theory graphs and worked examples
e98a52d style(v2): style richer theory sections
0c98e97 feat(v2): add second worked example to every theory module
6ab30a7 feat(v2): merge additional theory examples into modules
```

### Następny cel teorii

Nie wracać do prostych jednoliniowych opisów. Każdy z 15 modułów powinien docelowo zawierać:
1. krótkie wyjaśnienie idei,
2. wzory,
3. minimum 2–3 przykłady rozwiązane krok po kroku,
4. minimum 3 krótkie zadania `Spróbuj sam`,
5. wykresy tam, gdzie mają sens,
6. przypadki graniczne / kontrprzykłady,
7. typowe błędy ucznia,
8. link/przycisk `Ćwicz ten moduł`.

Szczególnie dopracować wizualnie:
- wpływ `a>0` i `a<0`,
- wpływ `|a|` na szerokość paraboli,
- przesunięcia wierzchołka,
- `Δ>0`, `Δ=0`, `Δ<0`,
- znak funkcji dla `a>0` i `a<0`,
- nierówności na wykresie,
- ekstrema w przedziale,
- wartość bezwzględną,
- zadania z parametrem.

## 6. Quiz — aktualna architektura

Kluczowe pliki:

```text
src/features/quadratic/server/bank.ts
src/features/quadratic/server/answer.ts
src/features/quadratic/server/answer.test.ts
```

Quiz działa hybrydowo:
- najpierw wybiera prawdziwe zadania z banku,
- tylko `verified=true`, aktywne i z odpowiedzią,
- grupuje kandydatów po `module:*`,
- brakujące pytania uzupełnia stary generator.

Parser odpowiedzi obsługuje m.in.:
- liczby,
- ułamki,
- przedziały,
- sumy przedziałów,
- zbiory `{...}`,
- `R\\{...}`,
- prefiksy typu `x∈`, `m∈`, `p∈`,
- zapis unii `∪` i potoczne `U`,
- odpowiedzi wieloczęściowe `a) ...; b) ...`.

Testy parsera są w CI (`npm run test:answers`).

### Ważny następny krok quizu

Obecny widok nadal jest przede wszystkim etapowy. Należy doprowadzić do jawnego quizu modułowego:

```text
Ćwicz ten moduł
```

API/generator powinien przyjąć `moduleId` i wtedy filtrować bezpośrednio po odpowiednim `exercise_tags.tag = module:*`.

To zmniejszy ryzyko, że poprawnie przypisane zadanie z innego modułu tego samego etapu pojawi się w złym miejscu.

## 7. Tutor AI / zdjęcie rozwiązania

Istnieją już:

```text
src/lib/openai.ts
src/app/api/ai/tutor/route.ts
src/app/api/ai/check-solution/route.ts
```

UI ma zakładkę Tutor AI.

Założenia:
- AI ma dostawać etap/moduł/teorię/konkretne zadanie,
- hints-first, nie od razu pełna odpowiedź,
- analiza zdjęcia: poprawne / częściowo poprawne / niepoprawne, pierwszy błąd, wyjaśnienie, kolejny krok,
- zdjęcie nie powinno być trwale zapisywane domyślnie,
- wywołania OpenAI po stronie serwera,
- klucz nigdy do klienta/browsera.

### UWAGA — model OpenAI

W `.env.example` nadal znajduje się:

```text
OPENAI_MODEL=gpt-5.6-terra
```

Nie zakładać, że ta nazwa modelu jest poprawna. Przed testem/deployem AI sprawdzić aktualną oficjalną dokumentację OpenAI i ustawić istniejący model multimodalny obsługujący Responses API i obrazy.

Nie commitować `OPENAI_API_KEY`.

## 8. Vercel

V2:

```text
project id: prj_gKj7ZY6ltQj1rTuR4PZQTp2rYeCj
team id:    team_PneglPVq8TlYQTYgWd9EIG2J
production: https://funkcja-kwadratowa-v2.vercel.app
```

V1 — NIE DOTYKAĆ:

```text
project id: prj_QWc8NXGMIOlXvQoTZVBv2LljKGyY
production: https://funkcja-kwadratowa.vercel.app
```

Aktualny ostatni ręczny Preview V2:

```text
deployment: dpl_Eb2hCaRHDgoerTjJyRw6sPTiTfhz
host: funkcja-kwadratowa-v2-ae1klu8fi-marekplaczeks-projects.vercel.app
state: READY
```

Ten Preview został zbudowany przed najnowszymi commitami rozbudowującymi teorię. Nie traktować go jako reprezentacji aktualnego `main`.

Produkcja V2 również jest starsza od aktualnego `main`.

### Problem INVALID_ORIGIN

Neon Auth ma ścisłą listę `trusted_origins`. Ręczne Preview Vercela dostają losowy hostname, więc nowe Preview może ponownie powodować `INVALID_ORIGIN`.

Aktualnie do trusted origins dodano host ostatniego Preview:

```text
https://funkcja-kwadratowa-v2-ae1klu8fi-marekplaczeks-projects.vercel.app
```

Do zrobienia: wdrożyć trwałe rozwiązanie — najlepiej stały hostname/alias dla środowiska testowego i dodać tylko ten origin do Neon Auth. Nie dopisywać losowego URL po każdym deploymentcie jako docelowego procesu.

## 9. Zmienne środowiskowe

Lokalnie wymagane są co najmniej:

```text
DATABASE_URL
NEON_AUTH_BASE_URL
NEON_AUTH_COOKIE_SECRET
TEACHER_EMAILS
OPENAI_API_KEY
OPENAI_MODEL
```

Nie wpisywać sekretów do GitHub.

Przy lokalnym developmencie użyć `.env.local`.

## 10. Kolejność prac dla Codexa

### Priorytet A — dokończenie teorii

1. Otwórz `TheoryEnrichmentBlock.tsx`, `theoryEnrichment.ts`, `theoryEnrichmentAdditional.ts`.
2. Zrób audyt wszystkich 15 modułów.
3. Zapewnij dla każdego minimum 2–3 worked examples i 3 practice tasks.
4. Dodaj/ulepsz wykresy tam, gdzie pomagają w rozumieniu.
5. Nie duplikuj danych między plikami bez potrzeby; po ustabilizowaniu można scalić `theoryEnrichmentAdditional.ts` z bazowym źródłem.
6. Uruchom lint/typecheck/test/build.

### Priorytet B — quiz per moduł

1. Dodać `moduleId` do API/generatora quizu.
2. Filtrować bank przez `exercise_tags` po konkretnym `module:*`.
3. Dodać `Ćwicz ten moduł` przy każdym module teorii.
4. Dodać test, że zadania z innych modułów nie przeciekają do wybranego modułu.
5. Zachować możliwość quizu całego etapu.

### Priorytet C — audyt klasyfikacji TEST/POWT

Przejrzeć wszystkie `TEST-*` i `POWT-*` semantycznie i potwierdzić:
- `stage_id`,
- `topic`,
- `module:*`,
- `skill:*`.

Nie opierać klasyfikacji wyłącznie na numerze zadania ani poprzednim `stage_id`.

### Priorytet D — stabilny Preview

1. Utworzyć stały alias/hostname dla Preview V2.
2. Ustawić go jako jedyny trwały testowy `trusted_origin` w Neon Auth.
3. Zbudować aktualny `main`.
4. Smoke test: login -> theory -> module quiz -> progress -> Tutor AI -> photo review.
5. Dopiero potem produkcja.

### Priorytet E — AI

1. Zweryfikować aktualny model OpenAI w oficjalnej dokumentacji.
2. Poprawić `.env.example` i domyślny model w kodzie, jeśli potrzeba.
3. Test tekstowego Tutora AI.
4. Test obrazu rozwiązania.
5. Dodać sensowną obsługę błędów/limitów.

## 11. Definition of Done dla najbliższego etapu

Przed promocją V2 do produkcji powinno być spełnione:

- [ ] wszystkie 15 modułów ma bogatą teorię i przykłady,
- [ ] `Ćwicz ten moduł` losuje tylko zadania przypisane do danego modułu,
- [ ] pełny audyt `TEST-*` i `POWT-*` zakończony,
- [ ] `npm run lint` przechodzi,
- [ ] `npm run typecheck` przechodzi,
- [ ] `npm run test:answers` przechodzi,
- [ ] `npm run build` przechodzi,
- [ ] stały Preview działa bez `INVALID_ORIGIN`,
- [ ] logowanie działa,
- [ ] zapis postępu działa,
- [ ] Tutor AI działa na poprawnym modelu,
- [ ] analiza zdjęcia działa,
- [ ] V1 nie została zmieniona.

## 12. Instrukcja dla Codexa na start

Po otwarciu katalogu możesz wkleić Codexowi:

```text
Przeczytaj najpierw CODEX_HANDOFF.md, THEORY_COVERAGE.md i BUILD_STATUS.md.
Pracujemy wyłącznie w funkcja-kwadratowa-v2. Nie modyfikuj V1.
Najpierw uruchom npm run lint, npm run typecheck, npm run test:answers i npm run build.
Następnie kontynuuj zgodnie z sekcją "Kolejność prac dla Codexa" w CODEX_HANDOFF.md.
Nie zmieniaj schematu Neon bez osobnego uzasadnienia i migracji. Nie zapisuj sekretów w repo.
Po każdym logicznym etapie uruchom testy i zrób mały, opisowy commit.
```
