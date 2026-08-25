export type TheoryGraphExample = {
  title: string;
  caption: string;
  a: number;
  b: number;
  c: number;
};

export type SolvedTheoryExample = {
  title: string;
  problem: string;
  steps: string[];
  answer: string;
};

export type PracticeTheoryExample = {
  problem: string;
  hint: string;
  answer: string;
};

export type TheoryEnrichment = {
  graphIntro?: string;
  graphs?: TheoryGraphExample[];
  solvedExamples?: SolvedTheoryExample[];
  practice?: PracticeTheoryExample[];
};

export const THEORY_ENRICHMENT: Record<string, TheoryEnrichment> = {
  "module:01-general-form": {
    graphIntro:
      "Najpierw zobacz, co robi sam współczynnik a. Znak a decyduje o kierunku ramion, a wartość |a| o tym, czy parabola jest węższa czy szersza.",
    graphs: [
      {
        title: "a > 0 — ramiona w górę",
        caption: "f(x)=x². Wierzchołek jest minimum funkcji.",
        a: 1,
        b: 0,
        c: 0,
      },
      {
        title: "a < 0 — ramiona w dół",
        caption: "f(x)=−x². Wierzchołek jest maksimum funkcji.",
        a: -1,
        b: 0,
        c: 0,
      },
      {
        title: "|a| > 1 — parabola węższa",
        caption: "f(x)=2x². Dla tego samego |x| wartości rosną szybciej niż dla x².",
        a: 2,
        b: 0,
        c: 0,
      },
      {
        title: "0 < |a| < 1 — parabola szersza",
        caption: "f(x)=0,5x². Wykres jest bardziej rozłożysty niż y=x².",
        a: 0.5,
        b: 0,
        c: 0,
      },
    ],
    solvedExamples: [
      {
        title: "Przykład 1 — odczyt współczynników i kształtu wykresu",
        problem: "Dana jest funkcja f(x)=−2x²+4x−3. Określ a, b, c, kierunek ramion i punkt przecięcia z osią OY.",
        steps: [
          "Porównujemy wzór z postacią f(x)=ax²+bx+c.",
          "Otrzymujemy a=−2, b=4, c=−3.",
          "Ponieważ a<0, ramiona paraboli są skierowane w dół.",
          "f(0)=c=−3, więc wykres przecina oś OY w punkcie (0,−3).",
        ],
        answer: "a=−2, b=4, c=−3; ramiona w dół; przecięcie z OY: (0,−3).",
      },
      {
        title: "Przykład 2 — sprawdzanie punktu",
        problem: "Czy punkt P(−1,0) należy do wykresu f(x)=−2x²+3x+5?",
        steps: [
          "Podstawiamy x=−1.",
          "f(−1)=−2·(−1)²+3·(−1)+5.",
          "f(−1)=−2−3+5=0.",
          "Otrzymana wartość jest równa współrzędnej y punktu P.",
        ],
        answer: "Tak, punkt P(−1,0) należy do wykresu.",
      },
    ],
    practice: [
      {
        problem: "Dla g(x)=−3x²+6 określ kierunek ramion i oblicz g(0).",
        hint: "Sprawdź znak współczynnika przy x² oraz skorzystaj z g(0)=c.",
        answer: "Ramiona są skierowane w dół, a g(0)=6.",
      },
      {
        problem: "Czy punkt A(2,0) należy do wykresu h(x)=0,5x²−2?",
        hint: "Oblicz h(2) i porównaj wynik z drugą współrzędną punktu.",
        answer: "Tak. h(2)=0,5·4−2=0.",
      },
      {
        problem: "Która parabola jest szersza: y=3x² czy y=0,25x²?",
        hint: "Im mniejsze dodatnie |a|, tym parabola jest szersza.",
        answer: "y=0,25x² jest szersza.",
      },
    ],
  },

  "module:04-graph-properties": {
    graphIntro:
      "Własności paraboli najlepiej łączyć bezpośrednio z obrazem. Porównaj kierunek ramion, położenie wierzchołka i efekt przesunięcia.",
    graphs: [
      {
        title: "Minimum: y=x²",
        caption: "Dla a>0 funkcja maleje do wierzchołka, a potem rośnie.",
        a: 1,
        b: 0,
        c: 0,
      },
      {
        title: "Maksimum: y=−x²",
        caption: "Dla a<0 funkcja rośnie do wierzchołka, a potem maleje.",
        a: -1,
        b: 0,
        c: 0,
      },
      {
        title: "Przesunięcie w prawo i w górę",
        caption: "y=(x−2)²+1 ma wierzchołek W=(2,1).",
        a: 1,
        b: -4,
        c: 5,
      },
      {
        title: "Parabola w dół z przesunięciem",
        caption: "y=−0,5(x+1)²+2 ma wierzchołek W=(−1,2).",
        a: -0.5,
        b: -1,
        c: 1.5,
      },
    ],
    solvedExamples: [
      {
        title: "Przykład 1 — monotoniczność z wierzchołka",
        problem: "Dla f(x)=−(x−2)²+4 podaj wierzchołek i przedziały monotoniczności.",
        steps: [
          "Wzór jest w postaci kanonicznej a(x−p)²+q, więc W=(2,4).",
          "a=−1<0, dlatego ramiona są skierowane w dół.",
          "Do x=2 funkcja rośnie, po x=2 funkcja maleje.",
        ],
        answer: "W=(2,4); rośnie na (−∞,2⟩ i maleje na ⟨2,+∞).",
      },
      {
        title: "Przykład 2 — przesunięcie wykresu",
        problem: "Jak otrzymać wykres y=f(x−3)+2 z wykresu y=f(x)?",
        steps: [
          "Zmiana argumentu x→x−3 przesuwa wykres poziomo.",
          "Znak w nawiasie działa przeciwnie do intuicyjnego odczytu: x−3 oznacza 3 jednostki w prawo.",
          "Dodanie +2 na zewnątrz przesuwa wszystkie wartości o 2 w górę.",
        ],
        answer: "Przesuń wykres o 3 jednostki w prawo i 2 jednostki w górę.",
      },
    ],
    practice: [
      {
        problem: "Podaj wierzchołek funkcji y=(x+4)²−3.",
        hint: "W postaci a(x−p)²+q znak p jest przeciwny do znaku w nawiasie.",
        answer: "W=(−4,−3).",
      },
      {
        problem: "Jak zmienia się wykres y=f(x), gdy przechodzimy do y=−f(x)?",
        hint: "Każda wartość y zmienia znak.",
        answer: "Wykres odbija się symetrycznie względem osi OX.",
      },
      {
        problem: "Dla y=−(x+1)²+5 podaj największą wartość funkcji.",
        hint: "a<0, więc wierzchołek daje maksimum.",
        answer: "Największa wartość to 5.",
      },
    ],
  },
};
