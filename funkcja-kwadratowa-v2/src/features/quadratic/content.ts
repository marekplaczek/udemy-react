export type StageContent = {
  id: number;
  title: string;
  subtitle: string;
  intro: string;
  formulas: string[];
  bullets: string[];
  note?: string;
  example?: string;
};

export const STAGES: StageContent[] = [
  {
    id: 1,
    title: "Postać ogólna i wykres",
    subtitle: "współczynniki, parabola, wyróżnik",
    intro: "Funkcja kwadratowa ma postać f(x) = ax² + bx + c, gdzie a ≠ 0. Jej wykresem jest parabola.",
    formulas: ["f(x) = ax² + bx + c,  a ≠ 0", "Δ = b² − 4ac"],
    bullets: ["a > 0 — ramiona w górę; a < 0 — ramiona w dół.", "c = f(0), więc określa przecięcie z osią OY.", "Δ > 0 — dwa miejsca zerowe; Δ = 0 — jedno podwójne; Δ < 0 — brak miejsc zerowych."],
    note: "W zadaniu z parametrem najpierw sprawdź, czy współczynnik przy x² jest różny od zera.",
    example: "Dla f(x)=2x²−4x−6 mamy a=2>0, c=−6 i Δ=64, więc parabola ma dwa miejsca zerowe."
  },
  {
    id: 2,
    title: "Postać kanoniczna",
    subtitle: "wierzchołek, przesunięcia, wartość ekstremalna",
    intro: "Postać kanoniczna pozwala bezpośrednio odczytać wierzchołek, oś symetrii i wartość ekstremalną.",
    formulas: ["f(x) = a(x − p)² + q", "p = −b/(2a),  q = f(p) = −Δ/(4a)"],
    bullets: ["Wierzchołek paraboli to W=(p,q).", "Oś symetrii ma równanie x=p.", "Dla a>0 wartość najmniejsza wynosi q, a dla a<0 wartość największa wynosi q.", "Wektor przesunięcia wykresu y=ax² to [p,q]."],
    note: "Znak w nawiasie jest odwrotny: (x+5)² oznacza p=−5.",
    example: "x²−4x+7 = (x−2)²+3, więc W=(2,3), a wartość najmniejsza wynosi 3."
  },
  {
    id: 3,
    title: "Miejsca zerowe i postać iloczynowa",
    subtitle: "pierwiastki, rozkład na czynniki",
    intro: "Miejsca zerowe to rozwiązania równania ax²+bx+c=0. Gdy istnieją, pozwalają zapisać trójmian w postaci iloczynowej.",
    formulas: ["x₁,₂ = (−b ± √Δ)/(2a)", "f(x) = a(x − x₁)(x − x₂)"],
    bullets: ["Dla Δ=0 mamy pierwiastek podwójny x₀=−b/(2a).", "Wierzchołek leży w połowie między pierwiastkami: p=(x₁+x₂)/2.", "ax²+bx=0 rozwiązuj przez wyłączenie x przed nawias.", "ax²+c=0 sprowadź do x²=−c/a."],
    example: "x²−x−6=0 ma pierwiastki −2 i 3, więc f(x)=(x+2)(x−3)."
  },
  {
    id: 4,
    title: "Wzory Viète'a",
    subtitle: "suma i iloczyn pierwiastków",
    intro: "Wzory Viète'a pozwalają operować na pierwiastkach bez ich bezpośredniego obliczania.",
    formulas: ["x₁ + x₂ = −b/a", "x₁x₂ = c/a", "x₁²+x₂² = (x₁+x₂)² − 2x₁x₂"],
    bullets: ["Różne znaki ⇔ x₁x₂<0.", "Oba dodatnie: Δ>0, iloczyn dodatni i suma dodatnia.", "Oba ujemne: Δ>0, iloczyn dodatni i suma ujemna.", "1/x₁+1/x₂ = (x₁+x₂)/(x₁x₂)."],
    note: "W zadaniach z parametrem pamiętaj o warunku istnienia rzeczywistych pierwiastków.",
    example: "Dla x²−5x+6=0: x₁+x₂=5, x₁x₂=6, zatem x₁²+x₂²=25−12=13."
  },
  {
    id: 5,
    title: "Nierówności kwadratowe",
    subtitle: "zbiory rozwiązań i dziedziny",
    intro: "Nierówność kwadratową rozwiązujemy na podstawie miejsc zerowych i położenia paraboli względem osi OX.",
    formulas: ["ax² + bx + c ≷ 0"],
    bullets: ["Najpierw sprowadź nierówność do zera po jednej stronie.", "Wyznacz miejsca zerowe i kierunek ramion.", "Nierówność ostra wyklucza miejsca zerowe, nieostra je zawiera.", "Dla √(ax²+bx+c) wymagamy ax²+bx+c ≥ 0."],
    note: "Mnożąc nierówność przez liczbę ujemną, odwróć znak nierówności.",
    example: "x²−2x−8>0 ma miejsca zerowe −2 i 4. Dla a>0 rozwiązaniem są przedziały (−∞,−2)∪(4,+∞)."
  },
  {
    id: 6,
    title: "Zbiór wartości i optymalizacja",
    subtitle: "ekstrema, monotoniczność, zadania tekstowe",
    intro: "Funkcja kwadratowa jest podstawowym narzędziem do szukania wartości największej i najmniejszej.",
    formulas: ["p = −b/(2a)", "q = f(p)"],
    bullets: ["Jeśli p należy do badanego przedziału, porównaj f(lewy koniec), f(p) i f(prawy koniec).", "Jeśli p nie należy do przedziału, wystarczą wartości na końcach.", "W zadaniu tekstowym najpierw zbuduj funkcję celu i ustal jej dziedzinę.", "Dla a<0 wierzchołek daje maksimum, dla a>0 minimum."],
    note: "Dziedzina wynikająca z treści zadania jest częścią rozwiązania — np. długości boków muszą być dodatnie.",
    example: "Prostokąt o obwodzie 20 ma P(a)=a(10−a). Maksimum jest dla a=5, czyli Pmax=25."
  },
  {
    id: 7,
    title: "Parametr i równania sprowadzalne",
    subtitle: "warunki na Δ i równania dwukwadratowe",
    intro: "Ten etap łączy wyróżnik, wzory Viète'a i analizę warunków na parametr.",
    formulas: ["Dwa różne pierwiastki: Δ > 0", "Jeden pierwiastek podwójny: Δ = 0", "ax⁴ + bx² + c = 0,  t = x² ≥ 0"],
    bullets: ["Funkcja zawsze dodatnia: a>0 i Δ<0.", "Pierwiastki różnych znaków: c/a<0.", "W równaniu dwukwadratowym każde t>0 daje dwa rozwiązania x=±√t.", "t<0 odrzucamy, a t=0 daje jedno rozwiązanie x=0."],
    note: "Po wyznaczeniu parametru zawsze wróć do warunków początkowych i odrzuć wartości, które ich nie spełniają.",
    example: "x⁴−3x²−4=0: po t=x² mamy t=4 lub t=−1. Zostaje x=−2 lub x=2."
  }
];

export function getStageContent(stageId: number) {
  return STAGES.find((stage) => stage.id === stageId) ?? null;
}
