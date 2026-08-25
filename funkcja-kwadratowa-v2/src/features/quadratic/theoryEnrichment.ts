export type TheoryGraphExample = {
  a: number;
  b: number;
  c: number;
  title: string;
  caption: string;
};

export type WorkedExample = {
  title: string;
  task: string;
  steps: string[];
  answer: string;
};

export type PracticeExample = {
  task: string;
  answer: string;
};

export type TheoryEnrichment = {
  graphs?: TheoryGraphExample[];
  workedExamples: WorkedExample[];
  practice: PracticeExample[];
};

export const THEORY_ENRICHMENT: Record<string, TheoryEnrichment> = {
  "module:01-general-form": {
    graphs: [
      {
        a: 1,
        b: 0,
        c: 0,
        title: "Przypadek a > 0",
        caption: "Dla f(x)=x² współczynnik a jest dodatni, więc ramiona paraboli są skierowane w górę. Wierzchołek jest minimum funkcji."
      },
      {
        a: -1,
        b: 0,
        c: 4,
        title: "Przypadek a < 0",
        caption: "Dla f(x)=−x²+4 współczynnik a jest ujemny, więc ramiona paraboli są skierowane w dół. Wierzchołek W=(0,4) jest maksimum funkcji."
      },
      {
        a: -2,
        b: 4,
        c: 0,
        title: "a < 0 i przesunięty wierzchołek",
        caption: "Dla f(x)=−2x²+4x oś symetrii ma równanie x=1. Sam znak a nie mówi, gdzie leży wierzchołek — mówi tylko o kierunku ramion."
      }
    ],
    workedExamples: [
      {
        title: "Odczyt współczynników i podstawianie",
        task: "Dana jest funkcja f(x)=−2x²+4x+6. Określ a, b, c, kierunek ramion oraz oblicz f(−1).",
        steps: [
          "Porównujemy wzór z f(x)=ax²+bx+c: a=−2, b=4, c=6.",
          "Ponieważ a<0, ramiona paraboli są skierowane w dół.",
          "Podstawiamy x=−1: f(−1)=−2·(−1)²+4·(−1)+6.",
          "f(−1)=−2−4+6=0."
        ],
        answer: "a=−2, b=4, c=6; ramiona w dół; f(−1)=0."
      },
      {
        title: "Czy punkt należy do wykresu?",
        task: "Sprawdź, czy punkt P=(2,3) należy do wykresu f(x)=x²−3x+5.",
        steps: [
          "Obliczamy wartość funkcji dla x=2.",
          "f(2)=2²−3·2+5=4−6+5=3.",
          "Otrzymaliśmy dokładnie współrzędną y punktu P."
        ],
        answer: "Tak, punkt P=(2,3) należy do wykresu."
      }
    ],
    practice: [
      { task: "Dla f(x)=3x²−5x−2 podaj a, b, c i oblicz f(0).", answer: "a=3, b=−5, c=−2, f(0)=−2." },
      { task: "Dla g(x)=−x²+6 określ kierunek ramion i sprawdź, czy A=(2,2) leży na wykresie.", answer: "Ramiona w dół; g(2)=2, więc A leży na wykresie." }
    ]
  },

  "module:04-graph-properties": {
    graphs: [
      {
        a: 1,
        b: 0,
        c: -4,
        title: "Parabola z minimum",
        caption: "f(x)=x²−4 ma wierzchołek W=(0,−4), dwa miejsca zerowe −2 i 2 oraz wartości ujemne pomiędzy miejscami zerowymi."
      },
      {
        a: -1,
        b: 0,
        c: 4,
        title: "Parabola z maksimum",
        caption: "g(x)=−x²+4 ma maksimum równe 4. Jest dodatnia pomiędzy miejscami zerowymi −2 i 2, a poza nimi ujemna."
      }
    ],
    workedExamples: [
      {
        title: "Odczyt własności z wykresu",
        task: "Dla f(x)=−x²+4 podaj miejsca zerowe, zbiór wartości i przedziały monotoniczności.",
        steps: [
          "Miejsca zerowe spełniają −x²+4=0, więc x=−2 lub x=2.",
          "Wierzchołek W=(0,4), a ramiona są skierowane w dół.",
          "Największa wartość funkcji to 4, więc zbiór wartości to (−∞,4].",
          "Funkcja rośnie na (−∞,0], a maleje na [0,+∞)."
        ],
        answer: "x₁=−2, x₂=2; Wf=(−∞,4]; rośnie do x=0 i potem maleje."
      }
    ],
    practice: [
      { task: "Jak przesunąć wykres y=x², aby otrzymać y=(x−3)²+2?", answer: "O 3 jednostki w prawo i 2 jednostki w górę." },
      { task: "Co otrzymamy z y=f(x) po zamianie na y=−f(x)?", answer: "Odbicie wykresu względem osi OX." }
    ]
  },

  "module:02-canonical-vertex-discriminant": {
    graphs: [
      {
        a: 2,
        b: -8,
        c: 9,
        title: "Minimum przy a > 0",
        caption: "f(x)=2x²−8x+9=2(x−2)²+1. Wierzchołek W=(2,1) jest minimum."
      },
      {
        a: -1,
        b: 6,
        c: -5,
        title: "Maksimum przy a < 0",
        caption: "g(x)=−x²+6x−5=−(x−3)²+4. Wierzchołek W=(3,4) jest maksimum."
      }
    ],
    workedExamples: [
      {
        title: "Postać kanoniczna dla a < 0",
        task: "Zapisz f(x)=−x²+6x−5 w postaci kanonicznej i podaj zbiór wartości.",
        steps: [
          "Wyłączamy minus z części kwadratowej: −(x²−6x)−5.",
          "Uzupełniamy do kwadratu: x²−6x=(x−3)²−9.",
          "f(x)=−[(x−3)²−9]−5=−(x−3)²+4.",
          "Ponieważ a<0, q=4 jest największą wartością funkcji."
        ],
        answer: "f(x)=−(x−3)²+4, W=(3,4), Wf=(−∞,4]."
      }
    ],
    practice: [
      { task: "Wyznacz wierzchołek funkcji f(x)=x²−8x+19.", answer: "f(x)=(x−4)²+3, więc W=(4,3)." },
      { task: "Jaki jest zbiór wartości g(x)=−2(x+1)²+5?", answer: "(−∞,5]." }
    ]
  },

  "module:05-reconstruct-function": {
    graphs: [
      {
        a: -2,
        b: 4,
        c: 1,
        title: "Wzór z wierzchołka i punktu",
        caption: "Ta parabola ma wierzchołek W=(1,3), więc najwygodniej zaczynać od postaci f(x)=a(x−1)²+3."
      }
    ],
    workedExamples: [
      {
        title: "Wyznaczanie wzoru z wierzchołka",
        task: "Wierzchołek paraboli to W=(1,3), a wykres przechodzi przez punkt A=(0,1). Wyznacz wzór funkcji.",
        steps: [
          "Z wierzchołka zapisujemy f(x)=a(x−1)²+3.",
          "Podstawiamy A=(0,1): 1=a·(−1)²+3.",
          "a=−2.",
          "Otrzymujemy f(x)=−2(x−1)²+3."
        ],
        answer: "f(x)=−2(x−1)²+3=−2x²+4x+1."
      }
    ],
    practice: [
      { task: "Wierzchołek W=(−2,1), a punkt A=(0,9). Wyznacz f.", answer: "f(x)=2(x+2)²+1." },
      { task: "Miejsca zerowe to −1 i 4, a f(0)=4. Wyznacz f.", answer: "f(x)=−(x+1)(x−4)." }
    ]
  },

  "module:03-zeros-product-form": {
    graphs: [
      {
        a: 1,
        b: -1,
        c: -6,
        title: "Dwa miejsca zerowe",
        caption: "f(x)=x²−x−6=(x+2)(x−3). Wykres przecina oś OX dla x=−2 i x=3."
      },
      {
        a: -1,
        b: 4,
        c: -4,
        title: "Jedno podwójne miejsce zerowe",
        caption: "g(x)=−x²+4x−4=−(x−2)² ma Δ=0. Parabola tylko dotyka osi OX w x=2."
      }
    ],
    workedExamples: [
      {
        title: "Od delty do postaci iloczynowej",
        task: "Zapisz f(x)=2x²−2x−12 w postaci iloczynowej.",
        steps: [
          "Można najpierw wyłączyć 2: 2(x²−x−6).",
          "Szukamy liczb o iloczynie −6 i sumie −1: −3 i 2.",
          "x²−x−6=(x−3)(x+2)."
        ],
        answer: "f(x)=2(x−3)(x+2)."
      }
    ],
    practice: [
      { task: "Wyznacz miejsca zerowe x²−7x+12.", answer: "x=3 i x=4." },
      { task: "Ile miejsc zerowych ma −x²+6x−9?", answer: "Jedno podwójne: x=3." }
    ]
  },

  "module:08-quadratic-equations": {
    workedExamples: [
      {
        title: "Najpierw uprość, potem wybierz metodę",
        task: "Rozwiąż (x−2)²=9.",
        steps: [
          "Nie trzeba rozwijać nawiasu ani liczyć delty.",
          "Z równania (x−2)²=9 mamy x−2=3 lub x−2=−3.",
          "Stąd x=5 lub x=−1."
        ],
        answer: "x∈{−1,5}."
      }
    ],
    practice: [
      { task: "Rozwiąż x²−5x=0.", answer: "x(x−5)=0, więc x=0 lub x=5." },
      { task: "Rozwiąż x²+4x+5=0 w R.", answer: "Δ=−4<0, więc brak rozwiązań rzeczywistych." }
    ]
  },

  "module:14-vieta": {
    graphs: [
      {
        a: 1,
        b: -5,
        c: 6,
        title: "Viète na wykresie",
        caption: "Dla x²−5x+6 miejsca zerowe to 2 i 3. Ich suma 5 odpowiada −b/a, a iloczyn 6 odpowiada c/a."
      }
    ],
    workedExamples: [
      {
        title: "Wyrażenie bez liczenia pierwiastków",
        task: "Pierwiastki równania x²−7x+10=0 to x₁,x₂. Oblicz x₁²+x₂² bez wyznaczania x₁ i x₂.",
        steps: [
          "Z Viète'a: S=x₁+x₂=7 i P=x₁x₂=10.",
          "Korzystamy z x₁²+x₂²=S²−2P.",
          "49−20=29."
        ],
        answer: "x₁²+x₂²=29."
      }
    ],
    practice: [
      { task: "Dla 2x²−6x−8=0 podaj x₁+x₂ i x₁x₂.", answer: "x₁+x₂=3, x₁x₂=−4." },
      { task: "Jeśli x₁+x₂=4 i x₁x₂=−5, zapisz równanie jednostkowe o tych pierwiastkach.", answer: "x²−4x−5=0." }
    ]
  },

  "module:10-quadratic-inequalities": {
    graphs: [
      {
        a: 1,
        b: 0,
        c: -4,
        title: "Nierówność dla a > 0",
        caption: "Dla x²−4<0 szukamy fragmentu wykresu poniżej osi OX. Jest to przedział (−2,2)."
      },
      {
        a: -1,
        b: 0,
        c: 4,
        title: "Nierówność dla a < 0",
        caption: "Dla −x²+4>0 szukamy fragmentu nad osią OX. Ponownie otrzymujemy (−2,2), ale znak funkcji poza pierwiastkami jest przeciwny niż dla a>0."
      }
    ],
    workedExamples: [
      {
        title: "Rozwiązanie nierówności z wykresu znaków",
        task: "Rozwiąż x²−5x+6≤0.",
        steps: [
          "Rozkład: x²−5x+6=(x−2)(x−3).",
          "Miejsca zerowe: 2 i 3.",
          "Ponieważ a>0, parabola jest poniżej lub na osi OX pomiędzy pierwiastkami.",
          "Znak ≤ oznacza, że miejsca zerowe włączamy."
        ],
        answer: "x∈[2,3]."
      }
    ],
    practice: [
      { task: "Rozwiąż x²−9>0.", answer: "x∈(−∞,−3)∪(3,+∞)." },
      { task: "Rozwiąż −x²+4x≥0.", answer: "x∈[0,4]." }
    ]
  },

  "module:06-extrema-on-interval": {
    graphs: [
      {
        a: -1,
        b: 4,
        c: 1,
        title: "Ekstremum wewnątrz przedziału",
        caption: "Dla f(x)=−x²+4x+1 wierzchołek ma x=2. Jeśli badany przedział zawiera 2, maksimum występuje w wierzchołku."
      }
    ],
    workedExamples: [
      {
        title: "Minimum i maksimum na przedziale",
        task: "Wyznacz najmniejszą i największą wartość f(x)=x²−4x+5 na [0,5].",
        steps: [
          "Wierzchołek: x=2, f(2)=1. Punkt x=2 należy do przedziału.",
          "Sprawdzamy także końce: f(0)=5, f(5)=10.",
          "Porównujemy trzy wartości: 1, 5 i 10."
        ],
        answer: "min=1 dla x=2, max=10 dla x=5."
      }
    ],
    practice: [
      { task: "Dla f(x)=−x²+4x na [0,3] znajdź maksimum.", answer: "Maksimum 4 dla x=2." },
      { task: "Dla f(x)=x²+2x+3 na [0,2] znajdź minimum.", answer: "Funkcja rośnie na tym przedziale; minimum f(0)=3." }
    ]
  },

  "module:07-optimization": {
    graphs: [
      {
        a: -2,
        b: 20,
        c: 0,
        title: "Model z maksimum",
        caption: "Funkcja −2x²+20x opisuje wielkość, która najpierw rośnie, a potem maleje. Maksimum występuje w wierzchołku x=5."
      }
    ],
    workedExamples: [
      {
        title: "Prosty model optymalizacyjny",
        task: "Prostokąt ma obwód 20. Jakie boki dają największe pole?",
        steps: [
          "Niech jeden bok ma długość x. Drugi ma 10−x.",
          "Pole P(x)=x(10−x)=−x²+10x.",
          "Parabola ma a<0, więc maksimum jest w wierzchołku.",
          "x=−b/(2a)=5, więc drugi bok też ma 5."
        ],
        answer: "Kwadrat 5×5, największe pole 25."
      }
    ],
    practice: [
      { task: "Dla Z(x)=−3x²+24x−20 znajdź x dające największą wartość.", answer: "x=4." },
      { task: "Suma dwóch dodatnich liczb wynosi 12. Kiedy ich iloczyn jest największy?", answer: "Dla 6 i 6; iloczyn 36." }
    ]
  },

  "module:09-reducible-equations": {
    workedExamples: [
      {
        title: "Równanie dwukwadratowe",
        task: "Rozwiąż x⁴−5x²+4=0.",
        steps: [
          "Podstawiamy t=x², przy czym t≥0.",
          "Otrzymujemy t²−5t+4=0, czyli (t−1)(t−4)=0.",
          "t=1 lub t=4.",
          "Z x²=1 mamy x=±1, a z x²=4 mamy x=±2."
        ],
        answer: "x∈{−2,−1,1,2}."
      }
    ],
    practice: [
      { task: "Rozwiąż x⁴−10x²+9=0.", answer: "Po t=x²: t=1 lub 9, więc x=±1, ±3." },
      { task: "Dlaczego przy t=x² trzeba dopisać t≥0?", answer: "Bo żadna rzeczywista wartość x² nie jest ujemna." }
    ]
  },

  "module:11-word-and-model-equations": {
    workedExamples: [
      {
        title: "Od treści do równania",
        task: "Iloczyn dwóch kolejnych dodatnich liczb całkowitych wynosi 72. Wyznacz te liczby.",
        steps: [
          "Pierwszą liczbę oznaczamy x, drugą x+1.",
          "x(x+1)=72, więc x²+x−72=0.",
          "Rozkład: (x−8)(x+9)=0.",
          "Z dodatniości wybieramy x=8."
        ],
        answer: "8 i 9."
      }
    ],
    practice: [
      { task: "Prostokąt ma pole 48 i jeden bok jest o 2 dłuższy od drugiego. Wyznacz boki.", answer: "x(x+2)=48 ⇒ x=6, więc boki 6 i 8." },
      { task: "Liczba uścisków dłoni wynosi n(n−1)/2. Ile uścisków jest przy 12 osobach?", answer: "66." }
    ]
  },

  "module:12-radicals": {
    workedExamples: [
      {
        title: "Najpierw dziedzina",
        task: "Rozwiąż √(x+1)=x−1.",
        steps: [
          "Warunki: x+1≥0 oraz prawa strona musi być nieujemna, więc x≥1.",
          "Podnosimy do kwadratu: x+1=(x−1)²=x²−2x+1.",
          "x²−3x=0, czyli x=0 lub x=3.",
          "Warunek x≥1 odrzuca x=0. Sprawdzenie potwierdza x=3."
        ],
        answer: "x=3."
      }
    ],
    practice: [
      { task: "Rozwiąż √(2x+3)=3.", answer: "2x+3=9, więc x=3." },
      { task: "Dlaczego po potęgowaniu trzeba sprawdzić rozwiązania?", answer: "Potęgowanie może wprowadzić rozwiązania obce, zwłaszcza gdy znika informacja o znaku." }
    ]
  },

  "module:13-absolute-value": {
    graphs: [
      {
        a: 1,
        b: 0,
        c: -4,
        title: "Funkcja przed zastosowaniem modułu",
        caption: "Dla h(x)=x²−4 część wykresu pomiędzy −2 i 2 leży pod osią OX. W wykresie |h(x)| właśnie ten fragment odbijamy nad oś OX."
      }
    ],
    workedExamples: [
      {
        title: "Równanie z wartością bezwzględną",
        task: "Rozwiąż |x²−4|=3.",
        steps: [
          "Rozpatrujemy dwa równania: x²−4=3 lub x²−4=−3.",
          "Pierwsze daje x²=7, więc x=±√7.",
          "Drugie daje x²=1, więc x=±1."
        ],
        answer: "x∈{−√7,−1,1,√7}."
      }
    ],
    practice: [
      { task: "Rozwiąż |x²−1|=0.", answer: "x=−1 lub x=1." },
      { task: "Co dzieje się z częścią wykresu y=f(x) poniżej OX przy przejściu do y=|f(x)|?", answer: "Jest odbijana symetrycznie względem osi OX." }
    ]
  },

  "module:15-parameter": {
    graphs: [
      {
        a: 1,
        b: -2,
        c: 1,
        title: "Granica między 0, 1 i 2 pierwiastkami",
        caption: "Dla (x−1)² mamy Δ=0: parabola dotyka osi OX. W zadaniach z parametrem często szukamy właśnie wartości parametru, dla których Δ przechodzi przez zero."
      }
    ],
    workedExamples: [
      {
        title: "Parametr i liczba rozwiązań",
        task: "Dla jakich m równanie x²−2x+m=0 ma dwa różne rozwiązania rzeczywiste?",
        steps: [
          "Dwa różne rozwiązania wymagają Δ>0.",
          "Δ=(−2)²−4·1·m=4−4m.",
          "4−4m>0, czyli m<1."
        ],
        answer: "m<1."
      },
      {
        title: "Parametr i znaki pierwiastków",
        task: "Dla jakich m równanie x²−(m+1)x+m=0 ma dwa dodatnie pierwiastki?",
        steps: [
          "Zauważamy rozkład: x²−(m+1)x+m=(x−1)(x−m).",
          "Pierwiastki to 1 i m.",
          "Oba są dodatnie, gdy m>0; jeśli wymagamy dwóch różnych, dodatkowo m≠1."
        ],
        answer: "Dodatnie: m>0; dodatnie i różne: m>0 oraz m≠1."
      }
    ],
    practice: [
      { task: "Dla jakich k równanie x²+kx+1=0 nie ma rozwiązań rzeczywistych?", answer: "Δ=k²−4<0, więc −2<k<2." },
      { task: "Dla jakich p funkcja x²−2px+p²+1 ma wartości zawsze dodatnie?", answer: "To (x−p)²+1>0 dla każdego p∈R." }
    ]
  }
};
