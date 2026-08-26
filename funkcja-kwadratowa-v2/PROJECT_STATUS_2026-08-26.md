# Funkcja kwadratowa V2 — stan projektu

Stan na: **2026-08-26 18:15 CEST**

## Punkt zamknięcia

Bieżący etap prac jest zakończony. Dalszą pracę zaczynać od stabilnego Preview i quizu per moduł. **Nie modyfikować V1.**

Repo: `marekplaczek/udemy-react`  
Katalog: `funkcja-kwadratowa-v2/`  
Branch: `main`  
HEAD przed tym snapshotem: `bffca87ea5d8d811ef4435da4e87e6222f438f88`

Ostatni GitHub Actions CI dla tego stanu: **success** (lint, typecheck, test parsera odpowiedzi, Next build).

## Neon

Projekt: `cool-bonus-84650565`  
Branch: `br-jolly-mud-afnxxo0b`  
DB: `neondb`

Stan `exercises` potwierdzony 2026-08-26:

```text
total:         336
verified:      336
with answer:   336
with solution: 336
```

Bank jest więc kompletny treściowo i posiada odpowiedzi oraz rozwiązania wzorcowe dla wszystkich rekordów.

## Moduły

Aplikacja ma 7 etapów i 15 modułów:

```text
01  3.1–3.4     postać ogólna
02  3.5–3.27    postać kanoniczna / wierzchołek / delta
03  3.28–3.48   miejsca zerowe / postać iloczynowa
04  3.49–3.58   wykres i własności
05  3.59–3.78   wyznaczanie wzoru funkcji
06  3.79–3.92   ekstrema w przedziale
07  3.93–3.120  optymalizacja
08  3.121–3.137 równania kwadratowe
09  3.138–3.146 równania sprowadzalne
10  3.147–3.166 nierówności
11  3.167–3.190 zadania tekstowe / modelowanie
12  3.191–3.200 pierwiastki
13  3.201–3.220 wartość bezwzględna
14  3.221–3.241 Viète
15  3.242–3.288 parametr
```

## Korekta POWT

Po smoke teście poprawiono błędne przypisania m.in.:

- `POWT-13` -> moduł 09
- `POWT-18` -> moduł 03
- `POWT-20–23` -> moduł 11
- `POWT-28` -> moduł 07
- `POWT-35–38` -> moduł 14

`POWT-22` (uściski dłoni) nie należy już do etapu 1.

Pozostaje pełny audyt semantyczny wszystkich `TEST-*` i `POWT-*`.

## Teoria

Teoria została rozszerzona poza podstawowe definicje. Istnieją:

- `TheoryEnrichmentBlock.tsx`
- `theoryEnrichment.ts`
- `theoryEnrichmentAdditional.ts`
- `QuadraticCoefficientComparison.tsx`
- `Parabola.tsx`

Dodano:

- wykresy,
- przykłady krok po kroku,
- zadania `Spróbuj sam`,
- rozwijane odpowiedzi,
- drugi przykład rozwiązany dla każdego modułu,
- przykłady `a>0` i `a<0` w module bazowym.

Istotne commity teorii:

```text
16010c1 render theory graphs and worked examples
e98a52d style richer theory sections
0c98e97 add second worked example to every theory module
6ab30a7 merge additional theory examples into modules
```

Nadal warto zrobić pełny audyt pedagogiczny 15 modułów: minimum 2–3 worked examples, 3 zadania treningowe, przypadki graniczne i wykresy tam, gdzie pomagają.

## Quiz

Quiz działa hybrydowo: bank zadań + fallback generatora.

Parser autooceny obsługuje m.in.:

- liczby i ułamki,
- przedziały,
- sumy przedziałów,
- zbiory,
- `R\\{...}`,
- `x∈`, `m∈`, `p∈`, `k∈`,
- `∪` i `U`,
- odpowiedzi wieloczęściowe.

Najważniejszy kolejny krok: **quiz per moduł**. Generator/API powinien przyjąć `moduleId` i filtrować po `exercise_tags.tag = module:*`. Przy teorii dodać `Ćwicz ten moduł`.

## AI

Istnieją:

- `src/lib/openai.ts`
- `/api/ai/tutor`
- `/api/ai/check-solution`
- UI Tutora AI

Przed dalszym testem AI zweryfikować aktualny model OpenAI w oficjalnej dokumentacji. Nie polegać na wpisie `gpt-5.6-terra` z `.env.example` bez weryfikacji. Nie commitować `OPENAI_API_KEY`.

## Vercel

V2 project id: `prj_gKj7ZY6ltQj1rTuR4PZQTp2rYeCj`  
Production: `https://funkcja-kwadratowa-v2.vercel.app`

Ostatni ręczny Preview:

```text
dpl_Eb2hCaRHDgoerTjJyRw6sPTiTfhz
funkcja-kwadratowa-v2-ae1klu8fi-marekplaczeks-projects.vercel.app
READY
```

Ostatni production deployment:

```text
dpl_tYXRehokooCRBJGqXViP4JsVJeHq
READY
```

Preview i produkcja są starsze od najnowszych commitów teorii. Nie promować aktualnego `main` bez nowego Preview i smoke testu.

## INVALID_ORIGIN

Neon Auth ma obecnie trusted origins dla produkcji oraz ostatniego Preview. Losowe hosty Preview powodują powracający `INVALID_ORIGIN`.

Docelowo utworzyć **stały alias/hostname Preview** i dodać ten jeden adres jako trwały trusted origin.

## Kolejność wznowienia

1. `git pull`
2. `npm install`
3. `npm run lint`
4. `npm run typecheck`
5. `npm run test:answers`
6. `npm run build`
7. stały Preview + trusted origin
8. quiz per moduł
9. audyt TEST/POWT
10. smoke test: login -> teoria -> quiz -> postęp -> Tutor AI -> zdjęcie
11. dopiero potem produkcja

## V1

Nie dotykać:

```text
project id: prj_QWc8NXGMIOlXvQoTZVBv2LljKGyY
https://funkcja-kwadratowa.vercel.app
```
