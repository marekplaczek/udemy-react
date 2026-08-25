import type { PracticeExample, WorkedExample } from "./theoryEnrichment";

export type TheoryEnrichmentAddition = {
  workedExamples: WorkedExample[];
  practice: PracticeExample[];
};

export const THEORY_ENRICHMENT_ADDITIONAL: Record<string, TheoryEnrichmentAddition> = {
  "module:01-general-form": {
    workedExamples: [{
      title: "Jak |a| zmienia szerokość paraboli?",
      task: "Porównaj f(x)=0,5x² oraz g(x)=2x² dla x=2 i wyjaśnij, który wykres jest węższy.",
      steps: [
        "Obliczamy f(2)=0,5·4=2.",
        "Obliczamy g(2)=2·4=8.",
        "Dla tej samej odległości od osi symetrii funkcja g osiąga znacznie większą wartość.",
        "Ponieważ |2|>|0,5|, wykres g jest węższy niż wykres f."
      ],
      answer: "g(x)=2x² jest węższa; f(2)=2, g(2)=8."
    }],
    practice: [{ task: "Która parabola jest szersza: y=0,25x² czy y=3x²?", answer: "y=0,25x², ponieważ 0<|0,25|<1 i |0,25|<|3|." }]
  },

  "module:04-graph-properties": {
    workedExamples: [{
      title: "Znak i monotoniczność dla a < 0",
      task: "Dla f(x)=−x²+4x+5 wyznacz miejsca zerowe, znak funkcji i przedziały monotoniczności.",
      steps: [
        "−x²+4x+5=0 jest równoważne x²−4x−5=0=(x−5)(x+1), więc miejsca zerowe to −1 i 5.",
        "a<0, więc wykres jest nad osią OX pomiędzy miejscami zerowymi: f(x)>0 dla x∈(−1,5).",
        "Poza nimi f(x)<0.",
        "Oś symetrii ma równanie x=−b/(2a)=−4/(−2)=2. Funkcja rośnie do x=2 i potem maleje."
      ],
      answer: "Zera: −1 i 5; f>0 na (−1,5), f<0 poza tym; rośnie do 2, potem maleje."
    }],
    practice: [{ task: "Dla y=−x²+6x−5 podaj oś symetrii i kierunek ramion.", answer: "Oś x=3, ramiona w dół." }]
  },

  "module:02-canonical-vertex-discriminant": {
    workedExamples: [{
      title: "Uzupełnianie do kwadratu",
      task: "Zapisz f(x)=−2x²−8x−3 w postaci kanonicznej i podaj wierzchołek.",
      steps: [
        "Wyłączamy −2: f(x)=−2(x²+4x)−3.",
        "x²+4x=(x+2)²−4.",
        "f(x)=−2[(x+2)²−4]−3=−2(x+2)²+8−3.",
        "Stąd f(x)=−2(x+2)²+5."
      ],
      answer: "f(x)=−2(x+2)²+5, W=(−2,5)."
    }],
    practice: [{ task: "Zapisz x²+6x+11 w postaci kanonicznej.", answer: "(x+3)²+2." }]
  },

  "module:05-reconstruct-function": {
    workedExamples: [{
      title: "Wzór z miejsc zerowych",
      task: "Funkcja ma miejsca zerowe 2 i 6 oraz przechodzi przez punkt A=(0,12). Wyznacz jej wzór.",
      steps: [
        "Z miejsc zerowych zapisujemy f(x)=a(x−2)(x−6).",
        "Podstawiamy A=(0,12): 12=a·(−2)·(−6)=12a.",
        "Stąd a=1."
      ],
      answer: "f(x)=(x−2)(x−6)=x²−8x+12."
    }],
    practice: [{ task: "Miejsca zerowe to −2 i 3, a f(0)=6. Wyznacz a.", answer: "6=a·2·(−3)=−6a, więc a=−1." }]
  },

  "module:03-zeros-product-form": {
    workedExamples: [{
      title: "Przypadek Δ < 0",
      task: "Sprawdź, czy f(x)=2x²+4x+5 ma miejsca zerowe w R.",
      steps: [
        "a=2, b=4, c=5.",
        "Δ=b²−4ac=16−4·2·5=16−40=−24.",
        "Δ<0, więc równanie 2x²+4x+5=0 nie ma rozwiązań rzeczywistych."
      ],
      answer: "Brak miejsc zerowych w R."
    }],
    practice: [{ task: "Ile miejsc zerowych ma x²+2x+1?", answer: "Jedno podwójne, x=−1, ponieważ Δ=0." }]
  },

  "module:08-quadratic-equations": {
    workedExamples: [{
      title: "Rozkład bez delty",
      task: "Rozwiąż 2x²+3x−2=0.",
      steps: [
        "Szukamy rozkładu na czynniki: 2x²+3x−2=(2x−1)(x+2).",
        "Iloczyn jest zerem, gdy 2x−1=0 lub x+2=0.",
        "Stąd x=1/2 lub x=−2."
      ],
      answer: "x∈{−2,1/2}."
    }],
    practice: [{ task: "Rozwiąż 3x²−3x−6=0 przez rozkład na czynniki.", answer: "3(x−2)(x+1)=0, więc x=2 lub x=−1." }]
  },

  "module:14-vieta": {
    workedExamples: [{
      title: "Suma odwrotności pierwiastków",
      task: "Pierwiastki równania x²−6x+2=0 to x₁,x₂. Oblicz 1/x₁+1/x₂ bez wyznaczania pierwiastków.",
      steps: [
        "Z wzorów Viète’a: S=x₁+x₂=6 oraz P=x₁x₂=2.",
        "1/x₁+1/x₂=(x₁+x₂)/(x₁x₂)=S/P.",
        "S/P=6/2=3."
      ],
      answer: "3."
    }],
    practice: [{ task: "Dla x²−8x+3=0 oblicz x₁²+x₂² bez wyznaczania pierwiastków.", answer: "S=8, P=3, więc S²−2P=64−6=58." }]
  },

  "module:10-quadratic-inequalities": {
    workedExamples: [{
      title: "Nierówność dla paraboli skierowanej w dół",
      task: "Rozwiąż −x²+3x+4≥0.",
      steps: [
        "Wyznaczamy miejsca zerowe: −x²+3x+4=0 ⇔ x²−3x−4=0.",
        "x²−3x−4=(x−4)(x+1), więc zera to −1 i 4.",
        "Ponieważ a<0, funkcja jest nieujemna pomiędzy miejscami zerowymi.",
        "Znak ≥0 oznacza, że oba końce włączamy."
      ],
      answer: "x∈[−1,4]."
    }],
    practice: [{ task: "Rozwiąż −x²+9>0.", answer: "x∈(−3,3)." }]
  },

  "module:06-extrema-on-interval": {
    workedExamples: [{
      title: "Wierzchołek i końce przedziału",
      task: "Znajdź najmniejszą i największą wartość f(x)=x²−4x+1 na przedziale [0,5].",
      steps: [
        "Wierzchołek ma x=−b/(2a)=4/2=2 i leży w przedziale.",
        "f(2)=4−8+1=−3.",
        "Sprawdzamy końce: f(0)=1, f(5)=25−20+1=6.",
        "Porównujemy trzy wartości: −3, 1 i 6."
      ],
      answer: "Minimum −3 dla x=2; maksimum 6 dla x=5."
    }],
    practice: [{ task: "Dla f(x)=−x²+2x+3 na [−1,3] znajdź maksimum.", answer: "Wierzchołek x=1, f(1)=4, więc maksimum wynosi 4." }]
  },

  "module:07-optimization": {
    workedExamples: [{
      title: "Największe pole prostokąta",
      task: "Prostokąt ma obwód 20. Jakie wymiary dają największe pole?",
      steps: [
        "Jeśli jeden bok ma długość x, drugi ma 10−x, bo 2x+2y=20.",
        "Pole P(x)=x(10−x)=−x²+10x.",
        "Parabola ma a<0, więc maksimum jest w wierzchołku: x=−10/(2·−1)=5.",
        "Drugi bok również ma 10−5=5."
      ],
      answer: "Kwadrat 5×5; największe pole wynosi 25."
    }],
    practice: [{ task: "P(x)=−2x²+16x opisuje zysk. Dla jakiego x zysk jest największy?", answer: "x=−16/(2·−2)=4." }]
  },

  "module:09-reducible-equations": {
    workedExamples: [{
      title: "Równanie dwukwadratowe",
      task: "Rozwiąż x⁴−5x²+4=0.",
      steps: [
        "Podstawiamy t=x², przy czym t≥0.",
        "Otrzymujemy t²−5t+4=0=(t−1)(t−4).",
        "t=1 lub t=4.",
        "Wracamy do x: x²=1 daje x=±1, a x²=4 daje x=±2."
      ],
      answer: "x∈{−2,−1,1,2}."
    }],
    practice: [{ task: "Rozwiąż x⁴−13x²+36=0.", answer: "t=x²: t=4 lub 9, więc x=±2, ±3." }]
  },

  "module:11-word-and-model-equations": {
    workedExamples: [{
      title: "Kolejne liczby całkowite",
      task: "Iloczyn dwóch kolejnych dodatnich liczb całkowitych wynosi 156. Wyznacz te liczby.",
      steps: [
        "Niech mniejsza liczba będzie x, wtedy większa to x+1.",
        "Układamy równanie x(x+1)=156, czyli x²+x−156=0.",
        "Równanie rozkłada się na (x−12)(x+13)=0.",
        "Dodatnie rozwiązanie to x=12, więc druga liczba to 13."
      ],
      answer: "12 i 13."
    }],
    practice: [{ task: "Pole prostokąta wynosi 80, a jeden bok jest o 2 dłuższy od drugiego. Wyznacz boki.", answer: "x(x+2)=80 ⇒ x=8, więc boki 8 i 10." }]
  },

  "module:12-radicals": {
    workedExamples: [{
      title: "Równanie z pierwiastkiem i kontrolą dziedziny",
      task: "Rozwiąż √(x+5)=x−1.",
      steps: [
        "Prawa strona musi być nieujemna, więc x≥1.",
        "Podnosimy obie strony do kwadratu: x+5=(x−1)²=x²−2x+1.",
        "Otrzymujemy x²−3x−4=0=(x−4)(x+1).",
        "Kandydaci to 4 i −1, ale warunek x≥1 spełnia tylko 4."
      ],
      answer: "x=4."
    }],
    practice: [{ task: "Rozwiąż √(x+6)=x.", answer: "x≥0; x+6=x² ⇒ x=3 lub −2, więc x=3." }]
  },

  "module:13-absolute-value": {
    workedExamples: [{
      title: "Dwa przypadki wartości bezwzględnej",
      task: "Rozwiąż |x²−4|=3.",
      steps: [
        "Z równania |A|=3 mamy A=3 lub A=−3.",
        "x²−4=3 daje x²=7, więc x=±√7.",
        "x²−4=−3 daje x²=1, więc x=±1."
      ],
      answer: "x∈{−√7,−1,1,√7}."
    }],
    practice: [{ task: "Rozwiąż |x²−9|=0.", answer: "x²−9=0, więc x=−3 lub x=3." }]
  },

  "module:15-parameter": {
    workedExamples: [{
      title: "Dwa różne rozwiązania zależne od parametru",
      task: "Dla jakich m równanie x²−2mx+m+3=0 ma dwa różne rozwiązania rzeczywiste?",
      steps: [
        "Warunek na dwa różne rozwiązania to Δ>0.",
        "Δ=(−2m)²−4·1·(m+3)=4m²−4m−12.",
        "Dzielimy przez 4: m²−m−3>0.",
        "Miejsca zerowe trójmianu w m to (1−√13)/2 oraz (1+√13)/2. Ponieważ współczynnik przy m² jest dodatni, nierówność >0 zachodzi na zewnątrz przedziału między nimi."
      ],
      answer: "m∈(−∞,(1−√13)/2)∪((1+√13)/2,+∞)."
    }],
    practice: [{ task: "Dla jakich k równanie x²+kx+1=0 ma dokładnie jedno rozwiązanie rzeczywiste?", answer: "Δ=k²−4=0, więc k=−2 lub k=2." }]
  }
};
