export type TheoryGraphExample = {
  title: string;
  caption: string;
  a: number;
  b: number;
  c: number;
};

export type WorkedTheoryExample = {
  title: string;
  problem: string;
  steps: string[];
  answer: string;
};

export type TheoryPractice = {
  question: string;
  hint: string;
  answer: string;
};

export type TheoryExtra = {
  explanation?: string[];
  graphs?: TheoryGraphExample[];
  workedExamples?: WorkedTheoryExample[];
  practice?: TheoryPractice[];
};

export const THEORY_EXTRAS: Record<string, TheoryExtra> = {
  "module:01-general-form": {
    explanation: [
      "Współczynnik a wpływa na kształt paraboli. Gdy a>0, ramiona są skierowane w górę i wierzchołek daje najmniejszą wartość funkcji. Gdy a<0, ramiona są skierowane w dół i wierzchołek daje największą wartość funkcji.",
      "Im większa wartość |a|, tym parabola jest węższa. Dla 0<|a|<1 parabola jest szersza. Zmiana znaku a odbija wykres względem osi OX, jeśli pozostałe współczynniki są takie same.",
      "Współczynnik c można odczytać bez żadnych obliczeń: wykres przecina oś OY w punkcie (0,c)."
    ],
    graphs: [
      {
        title: "a > 0 — ramiona w górę",
        caption: "f(x)=x²−4. Wierzchołek jest minimum funkcji, a ramiona paraboli są skierowane w górę.",
        a: 1,
        b: 0,
        c: -4
      },
      {
        title: "a < 0 — ramiona w dół",
        caption: "f(x)=−x²+4. Wierzchołek jest maksimum funkcji, a ramiona paraboli są skierowane w dół.",
        a: -1,
        b: 0,
        c: 4
      },
      {
        title: "Duże |a| — węższa parabola",
        caption: "f(x)=3x²−3. Wartość |a|=3 powoduje szybszy wzrost wartości funkcji przy oddalaniu się od osi symetrii.",
        a: 3,
        b: 0,
        c: -3
      }
    ],
    workedExamples: [
      {
        title: "Odczytywanie współczynników i wartości funkcji",
        problem: "Dana jest funkcja f(x)=−2x²+4x+6. Określ kierunek ramion, punkt przecięcia z OY i oblicz f(−1).",
        steps: [
          "a=−2<0, więc ramiona paraboli są skierowane w dół.",
          "c=6, więc wykres przecina oś OY w punkcie (0,6).",
          "f(−1)=−2·(−1)²+4·(−1)+6=−2−4+6=0."
        ],
        answer: "Ramiona w dół, przecięcie z OY: (0,6), f(−1)=0."
      },
      {
        title: "Czy punkt należy do wykresu?",
        problem: "Sprawdź, czy punkt P=(2,3) należy do wykresu f(x)=x²−2x+3.",
        steps: [
          "Podstawiamy współrzędną x=2 do wzoru funkcji.",
          "f(2)=2²−2·2+3=4−4+3=3.",
          "Otrzymaliśmy dokładnie rzędną punktu P, czyli y=3."
        ],
        answer: "Tak, punkt P=(2,3) należy do wykresu."
      }
    ],
    practice: [
      {
        question: "Dla f(x)=−3x²+2x−5 podaj znak a, kierunek ramion i punkt przecięcia z osią OY.",
        hint: "Spójrz tylko na współczynniki a i c.",
        answer: "a=−3<0, ramiona w dół, przecięcie z OY: (0,−5)."
      },
      {
        question: "Oblicz f(−2) dla f(x)=2x²+3x−1.",
        hint: "Pamiętaj, że (−2)²=4.",
        answer: "f(−2)=2·4+3·(−2)−1=8−6−1=1."
      }
    ]
  },

  "module:04-graph-properties": {
    explanation: [
      "Wierzchołek dzieli wykres na dwie części o przeciwnej monotoniczności. Dla a>0 funkcja maleje do wierzchołka, a potem rośnie; dla a<0 jest odwrotnie.",
      "Przesunięcia poziome działają przeciwnie do znaku wewnątrz argumentu: f(x−2) przesuwa wykres o 2 w prawo, natomiast f(x+2) o 2 w lewo.",
      "Znak funkcji odczytujemy względem osi OX: punkty wykresu nad osią oznaczają f(x)>0, a pod osią — f(x)<0."
    ],
    graphs: [
      {
        title: "Parabola z minimum",
        caption: "f(x)=x²−4x+3 ma wierzchołek W=(2,−1). Funkcja maleje do x=2 i rośnie od x=2.",
        a: 1,
        b: -4,
        c: 3
      },
      {
        title: "Parabola z maksimum",
        caption: "g(x)=−x²+4x+1 ma wierzchołek W=(2,5). Funkcja rośnie do x=2 i maleje od x=2.",
        a: -1,
        b: 4,
        c: 1
      }
    ],
    workedExamples: [
      {
        title: "Monotoniczność z wierzchołka",
        problem: "Dla f(x)=x²−6x+5 podaj przedziały monotoniczności.",
        steps: [
          "Liczymy pierwszą współrzędną wierzchołka: p=−b/(2a)=6/2=3.",
          "a=1>0, więc parabola ma minimum.",
          "Do x=3 funkcja maleje, a od x=3 rośnie."
        ],
        answer: "Maleje na (−∞,3⟩ i rośnie na ⟨3,+∞)."
      },
      {
        title: "Przesunięcie wykresu",
        problem: "Jak otrzymać wykres y=f(x−3)+2 z wykresu y=f(x)?",
        steps: [
          "Zmiana x na x−3 oznacza przesunięcie o 3 jednostki w prawo.",
          "Dodanie +2 poza funkcją oznacza przesunięcie o 2 jednostki w górę."
        ],
        answer: "Przesuń wykres o wektor [3,2]."
      }
    ],
    practice: [
      {
        question: "Wierzchołek paraboli ma pierwszą współrzędną −2, a a<0. Gdzie funkcja rośnie, a gdzie maleje?",
        hint: "Dla a<0 wierzchołek jest maksimum.",
        answer: "Rośnie na (−∞,−2⟩, maleje na ⟨−2,+∞)."
      },
      {
        question: "O jaki wektor przesuwamy wykres f, aby otrzymać y=f(x+4)−1?",
        hint: "Znak przy x działa przeciwnie.",
        answer: "O wektor [−4,−1], czyli 4 w lewo i 1 w dół."
      }
    ]
  },

  "module:02-canonical-vertex-discriminant": {
    explanation: [
      "Postać kanoniczna f(x)=a(x−p)²+q pokazuje wierzchołek bez dodatkowych obliczeń: W=(p,q).",
      "Dla a>0 liczba q jest najmniejszą wartością funkcji, a dla a<0 — największą. Dlatego sam znak a zmienia również postać zbioru wartości.",
      "Współczynnik a nadal steruje kierunkiem i szerokością paraboli; p przesuwa ją poziomo, a q pionowo."
    ],
    graphs: [
      {
        title: "Minimum dla a>0",
        caption: "f(x)=x²−4x+7=(x−2)²+3. Wierzchołek W=(2,3), więc wartość minimalna to 3.",
        a: 1,
        b: -4,
        c: 7
      },
      {
        title: "Maksimum dla a<0",
        caption: "g(x)=−x²+4x+1=−(x−2)²+5. Wierzchołek W=(2,5), więc wartość maksymalna to 5.",
        a: -1,
        b: 4,
        c: 1
      }
    ],
    workedExamples: [
      {
        title: "Z postaci ogólnej do kanonicznej",
        problem: "Zapisz f(x)=2x²−8x+9 w postaci kanonicznej.",
        steps: [
          "p=−b/(2a)=8/4=2.",
          "q=f(2)=2·4−8·2+9=1.",
          "Wstawiamy p i q do f(x)=a(x−p)²+q."
        ],
        answer: "f(x)=2(x−2)²+1."
      },
      {
        title: "Postać kanoniczna dla a<0",
        problem: "Wyznacz wierzchołek i zbiór wartości funkcji f(x)=−2(x+1)²+6.",
        steps: [
          "x+1=x−(−1), więc p=−1.",
          "q=6, zatem W=(−1,6).",
          "a=−2<0, więc 6 jest maksimum."
        ],
        answer: "W=(−1,6), zbiór wartości: (−∞,6⟩."
      }
    ],
    practice: [
      {
        question: "Podaj wierzchołek funkcji f(x)=3(x−4)²−7.",
        hint: "Porównaj z a(x−p)²+q.",
        answer: "W=(4,−7)."
      },
      {
        question: "Jaki jest zbiór wartości funkcji f(x)=−(x−3)²+2?",
        hint: "a<0, więc wierzchołek daje maksimum.",
        answer: "(−∞,2⟩."
      }
    ]
  },

  "module:05-reconstruct-function": {
    explanation: [
      "Najważniejsza decyzja w tych zadaniach to wybór postaci funkcji. Jeżeli podany jest wierzchołek — zaczynaj od postaci kanonicznej; jeżeli miejsca zerowe — od iloczynowej.",
      "Po wybraniu właściwej postaci zwykle zostaje tylko jedna niewiadoma a. Wyznaczamy ją z dodatkowego punktu należącego do wykresu.",
      "Informacja o maksimum/minimum pozwala również ustalić znak a: minimum oznacza a>0, maksimum oznacza a<0."
    ],
    workedExamples: [
      {
        title: "Wierzchołek i punkt",
        problem: "Wierzchołek paraboli to W=(2,−3), a wykres przechodzi przez A=(0,5). Wyznacz wzór funkcji.",
        steps: [
          "Z wierzchołka zapisujemy f(x)=a(x−2)²−3.",
          "Podstawiamy punkt A: 5=a(0−2)²−3.",
          "5=4a−3, więc 4a=8 i a=2."
        ],
        answer: "f(x)=2(x−2)²−3."
      },
      {
        title: "Miejsca zerowe i punkt",
        problem: "Miejsca zerowe to −1 i 3, a f(0)=6. Wyznacz wzór funkcji.",
        steps: [
          "Z miejsc zerowych: f(x)=a(x+1)(x−3).",
          "Podstawiamy x=0: 6=a·1·(−3)=−3a.",
          "a=−2."
        ],
        answer: "f(x)=−2(x+1)(x−3)."
      }
    ],
    practice: [
      {
        question: "Wierzchołek W=(−2,1), a punkt A=(0,9) leży na wykresie. Wyznacz a.",
        hint: "Zacznij od f(x)=a(x+2)²+1.",
        answer: "9=4a+1, więc a=2."
      },
      {
        question: "Miejsca zerowe to 1 i 5, a wykres przechodzi przez (0,10). Wyznacz a.",
        hint: "f(x)=a(x−1)(x−5).",
        answer: "10=5a, więc a=2."
      }
    ]
  },

  "module:03-zeros-product-form": {
    explanation: [
      "Wyróżnik Δ określa liczbę przecięć paraboli z osią OX. Δ>0 oznacza dwa różne miejsca zerowe, Δ=0 jedno miejsce zerowe (styczność), a Δ<0 brak miejsc zerowych w R.",
      "W postaci iloczynowej f(x)=a(x−x₁)(x−x₂) miejsca zerowe widać bez obliczeń: x=x₁ oraz x=x₂.",
      "Jeśli c=0, przed liczeniem delty sprawdź, czy można wyłączyć x przed nawias."
    ],
    graphs: [
      {
        title: "Δ > 0 — dwa miejsca zerowe",
        caption: "f(x)=x²−1 przecina oś OX w dwóch punktach: x=−1 i x=1.",
        a: 1,
        b: 0,
        c: -1
      },
      {
        title: "Δ = 0 — jedno miejsce zerowe",
        caption: "f(x)=x²−4x+4=(x−2)² dotyka osi OX w punkcie x=2.",
        a: 1,
        b: -4,
        c: 4
      },
      {
        title: "Δ < 0 — brak miejsc zerowych",
        caption: "f(x)=x²+2 nie przecina osi OX, ponieważ wszystkie wartości funkcji są dodatnie.",
        a: 1,
        b: 0,
        c: 2
      }
    ],
    workedExamples: [
      {
        title: "Równanie przez wyłączenie x",
        problem: "Wyznacz miejsca zerowe f(x)=2x²−6x.",
        steps: [
          "Wyłączamy wspólny czynnik: 2x²−6x=2x(x−3).",
          "Iloczyn jest równy zero, gdy x=0 lub x−3=0."
        ],
        answer: "x₁=0, x₂=3."
      },
      {
        title: "Równanie z deltą",
        problem: "Rozwiąż x²−5x+6=0.",
        steps: [
          "Δ=(−5)²−4·1·6=25−24=1.",
          "x₁=(5−1)/2=2.",
          "x₂=(5+1)/2=3."
        ],
        answer: "x=2 lub x=3."
      }
    ],
    practice: [
      {
        question: "Ile miejsc zerowych ma funkcja f(x)=2x²+2x+5?",
        hint: "Policz znak delty.",
        answer: "Δ=4−40=−36<0, więc brak miejsc zerowych w R."
      },
      {
        question: "Zapisz w postaci iloczynowej funkcję o miejscach zerowych −2 i 4 oraz a=3.",
        hint: "Użyj a(x−x₁)(x−x₂).",
        answer: "f(x)=3(x+2)(x−4)."
      }
    ]
  },

  "module:08-quadratic-equations": {
    explanation: [
      "Przed użyciem delty zawsze uprość równanie. Często po przeniesieniu wyrazów można zastosować wzór skróconego mnożenia albo wyłączyć wspólny czynnik.",
      "Nie dziel równania przez wyrażenie zawierające x bez sprawdzenia, czy może być ono równe zero — w ten sposób można zgubić rozwiązanie.",
      "Po otrzymaniu rozwiązań warto wykonać szybkie podstawienie, szczególnie gdy równanie było wcześniej przekształcane."
    ],
    workedExamples: [
      {
        title: "Kwadrat równy liczbie",
        problem: "Rozwiąż (x−3)²=25.",
        steps: [
          "Jeśli u²=25, to u=5 lub u=−5.",
          "x−3=5 daje x=8.",
          "x−3=−5 daje x=−2."
        ],
        answer: "x∈{−2,8}."
      },
      {
        title: "Najpierw uprość",
        problem: "Rozwiąż x(x−4)=5x.",
        steps: [
          "Przenosimy wszystko na jedną stronę: x²−4x−5x=0.",
          "x²−9x=0.",
          "x(x−9)=0."
        ],
        answer: "x=0 lub x=9."
      }
    ],
    practice: [
      {
        question: "Rozwiąż (x+1)²=16.",
        hint: "x+1=±4.",
        answer: "x=3 lub x=−5."
      },
      {
        question: "Rozwiąż 3x²−12x=0 bez liczenia delty.",
        hint: "Wyłącz wspólny czynnik 3x.",
        answer: "3x(x−4)=0, więc x=0 lub x=4."
      }
    ]
  }
};
