export type TheoryModule = {
  id: string;
  title: string;
  sourceRange: string;
  intro: string;
  formulas: string[];
  bullets: string[];
  recognize: string[];
  pitfalls: string[];
  example?: string;
};

export type StageContent = {
  id: number;
  title: string;
  subtitle: string;
  demo: { a: number; b: number; c: number };
  intro: string;
  formulas: string[];
  bullets: string[];
  note?: string;
  example?: string;
  modules: TheoryModule[];
};

const m = (module: TheoryModule) => module;

export const STAGES: StageContent[] = [
  {
    id: 1,
    title: "Funkcja kwadratowa — postać ogólna i wykres",
    subtitle: "współczynniki, wartości funkcji, parabola i przekształcenia wykresu",
    demo: { a: 1, b: -2, c: -3 },
    intro: "Etap obejmuje podstawowe informacje o funkcji f(x)=ax²+bx+c oraz odczytywanie i przekształcanie jej wykresu.",
    formulas: ["f(x)=ax²+bx+c, a≠0", "f(0)=c", "oś symetrii: x=−b/(2a)"],
    bullets: ["Znak a decyduje o kierunku ramion paraboli.", "Współczynnik c jest rzędną punktu przecięcia z osią OY.", "Własności funkcji odczytuj z położenia wierzchołka, osi symetrii i miejsc zerowych."],
    note: "Przy przesunięciach wykresu rozróżniaj zmianę argumentu f(x−p) od zmiany wartości f(x)+q.",
    example: "Dla f(x)=2x²−4x−6 mamy f(0)=−6, ramiona w górę i oś symetrii x=1.",
    modules: [
      m({
        id: "module:01-general-form",
        title: "Postać ogólna i współczynniki",
        sourceRange: "zadania 3.1–3.4",
        intro: "Rozpoznawaj współczynniki a, b, c, obliczaj wartości funkcji i sprawdzaj, czy punkt należy do wykresu.",
        formulas: ["f(x)=ax²+bx+c", "f(x₀)=a·x₀²+b·x₀+c", "f(0)=c"],
        bullets: ["a musi być różne od zera, aby funkcja była kwadratowa.", "Punkt A(x₀,y₀) należy do wykresu wtedy i tylko wtedy, gdy y₀=f(x₀).", "Znak a: a>0 — ramiona w górę, a<0 — w dół."],
        recognize: ["w treści występują współczynniki a, b, c", "trzeba obliczyć f(x₀)", "trzeba sprawdzić punkt lub przecięcie z OY"],
        pitfalls: ["pominięcie kwadratu przy podstawianiu liczby ujemnej", "traktowanie a=0 jako funkcji kwadratowej"],
        example: "Jeśli f(x)=−2x²+3x+5, to f(−1)=−2−3+5=0."
      }),
      m({
        id: "module:04-graph-properties",
        title: "Wykres i własności funkcji",
        sourceRange: "zadania 3.49–3.58",
        intro: "Odczytuj z wykresu dziedzinę, zbiór wartości, monotoniczność, znaki funkcji, miejsca zerowe i symetrię oraz stosuj przesunięcia i odbicia wykresu.",
        formulas: ["f(x−p) — przesunięcie o p w prawo", "f(x)+q — przesunięcie o q w górę", "−f(x) — odbicie względem OX", "f(−x) — odbicie względem OY"],
        bullets: ["Parabola jest symetryczna względem pionowej prostej przechodzącej przez wierzchołek.", "Monotoniczność zmienia się w pierwszej współrzędnej wierzchołka.", "Znak funkcji odczytuj względem osi OX."],
        recognize: ["zadanie odwołuje się do wykresu", "trzeba przesunąć lub odbić parabolę", "trzeba odczytać przedziały monotoniczności lub znaku"],
        pitfalls: ["mylenie przesunięcia w prawo z f(x+p)", "nieuwzględnienie końców przedziałów przy miejscach zerowych"],
        example: "Wykres y=f(x−2)+3 powstaje z wykresu y=f(x) przez przesunięcie o 2 w prawo i 3 w górę."
      })
    ]
  },
  {
    id: 2,
    title: "Postać kanoniczna i wyznaczanie wzoru",
    subtitle: "wierzchołek, wyróżnik, oś symetrii i odtwarzanie funkcji z danych",
    demo: { a: 1, b: -4, c: 7 },
    intro: "Etap łączy postać kanoniczną z informacjami geometrycznymi o paraboli i wyznaczaniem wzoru funkcji na podstawie podanych własności.",
    formulas: ["f(x)=a(x−p)²+q", "p=−b/(2a)", "q=f(p)=−Δ/(4a)", "Δ=b²−4ac"],
    bullets: ["Wierzchołek ma współrzędne W=(p,q).", "Oś symetrii ma równanie x=p.", "Zbiór wartości zależy od q i znaku a."],
    note: "W postaci a(x−p)²+q znak p jest przeciwny do znaku widocznego w nawiasie.",
    example: "x²−4x+7=(x−2)²+3, więc W=(2,3).",
    modules: [
      m({
        id: "module:02-canonical-vertex-discriminant",
        title: "Postać kanoniczna, wierzchołek i wyróżnik",
        sourceRange: "zadania 3.5–3.27",
        intro: "Przechodź między postacią ogólną i kanoniczną, obliczaj wierzchołek, wyróżnik, oś symetrii, zbiór wartości i monotoniczność.",
        formulas: ["p=−b/(2a)", "q=−Δ/(4a)", "Δ=b²−4ac", "f(x)=a(x−p)²+q"],
        bullets: ["Dla a>0 q jest minimum, a dla a<0 maksimum.", "Jeżeli znasz W=(p,q) i dodatkowy punkt, podstaw go do postaci kanonicznej i wyznacz a.", "Wyróżnik można powiązać z q wzorem q=−Δ/(4a)."],
        recognize: ["polecenie: doprowadź do postaci kanonicznej", "podany jest wierzchołek albo oś symetrii", "trzeba obliczyć Δ bez rozwiązywania równania"],
        pitfalls: ["błąd znaku w p=−b/(2a)", "niepoprawne rozwinięcie (x−p)²", "mylenie q z miejscem zerowym"],
        example: "Dla f(x)=2x²−8x+9: p=2, q=1, więc f(x)=2(x−2)²+1."
      }),
      m({
        id: "module:05-reconstruct-function",
        title: "Wyznaczanie wzoru funkcji z własności",
        sourceRange: "zadania 3.59–3.78",
        intro: "Dobieraj najwygodniejszą postać funkcji do danych: kanoniczną dla wierzchołka, iloczynową dla miejsc zerowych, ogólną dla współczynników i punktu OY.",
        formulas: ["W=(p,q) ⇒ f(x)=a(x−p)²+q", "x₁,x₂ ⇒ f(x)=a(x−x₁)(x−x₂)", "A(x₀,y₀) ⇒ y₀=f(x₀)"],
        bullets: ["Najpierw wybierz postać zawierającą jak najwięcej danych z treści.", "Jedno dodatkowe równanie zwykle pozwala wyznaczyć współczynnik a.", "Informacja o rośnięciu/maleniu często wyznacza oś symetrii."],
        recognize: ["polecenie: wyznacz wzór funkcji", "podane są miejsca zerowe, wierzchołek, zbiór wartości lub punkt", "trzeba połączyć kilka własności w jeden wzór"],
        pitfalls: ["przechodzenie od razu do postaci ogólnej i tworzenie zbyt wielu niewiadomych", "nieuwzględnienie znaku a wynikającego ze zbioru wartości"],
        example: "Jeśli zbiorem wartości jest ⟨−2,+∞), a minimum występuje dla x=3, to f(x)=a(x−3)²−2 z a>0."
      })
    ]
  },
  {
    id: 3,
    title: "Miejsca zerowe i równania kwadratowe",
    subtitle: "postać iloczynowa, delta, rozkład na czynniki i równania",
    demo: { a: 1, b: -1, c: -6 },
    intro: "Etap obejmuje miejsca zerowe, postać iloczynową oraz różne techniki rozwiązywania równań kwadratowych.",
    formulas: ["x₁,₂=(−b±√Δ)/(2a)", "f(x)=a(x−x₁)(x−x₂)"],
    bullets: ["Nie każde równanie wymaga liczenia delty.", "Najpierw szukaj wyłączenia wspólnego czynnika lub wzoru skróconego mnożenia.", "Po przekształceniach zawsze sprowadź równanie do postaci równej zero."],
    example: "x²−x−6=0 ⇔ (x+2)(x−3)=0, więc x=−2 lub x=3.",
    modules: [
      m({
        id: "module:03-zeros-product-form",
        title: "Miejsca zerowe i postać iloczynowa",
        sourceRange: "zadania 3.28–3.48",
        intro: "Wyznaczaj liczbę i wartości miejsc zerowych oraz zapisuj funkcję w postaci iloczynowej.",
        formulas: ["Δ=b²−4ac", "x₁,₂=(−b±√Δ)/(2a)", "f(x)=a(x−x₁)(x−x₂)"],
        bullets: ["Δ>0 — dwa różne miejsca zerowe, Δ=0 — jedno podwójne, Δ<0 — brak rzeczywistych.", "Dla ax²+bx=0 wyłącz x przed nawias.", "Dla a(x−p)²+q=0 często szybciej rozwiązać równanie bez rozwijania nawiasu."],
        recognize: ["pytanie o liczbę lub wartości miejsc zerowych", "polecenie: zapisz w postaci iloczynowej", "trzeba odczytać przecięcia z osią OX"],
        pitfalls: ["pominięcie współczynnika a w postaci iloczynowej", "użycie wzoru na pierwiastki przy Δ<0 w zbiorze R"],
        example: "Dla 2x²−6x=0 mamy 2x(x−3)=0, więc x=0 lub x=3."
      }),
      m({
        id: "module:08-quadratic-equations",
        title: "Równania kwadratowe",
        sourceRange: "zadania 3.121–3.137",
        intro: "Rozwiązuj równania przez rozkład na czynniki, wzory skróconego mnożenia, wyłączanie wspólnego czynnika lub wzór z deltą.",
        formulas: ["ax²+bx+c=0", "(u−v)(u+v)=u²−v²", "x₁,₂=(−b±√Δ)/(2a)"],
        bullets: ["Przenieś wszystko na jedną stronę.", "Uprość wyrażenie przed obliczaniem delty.", "Równanie iloczynowe rozwiązuj zasadą: iloczyn jest zerem, gdy któryś czynnik jest zerem."],
        recognize: ["polecenie: rozwiąż równanie", "w równaniu po uproszczeniu najwyższa potęga x to 2", "występują iloczyny lub kwadraty dwumianów"],
        pitfalls: ["dzielenie przez wyrażenie zawierające x i utrata rozwiązania", "liczenie delty przed uproszczeniem równania"],
        example: "(x−3)²=25 daje x−3=±5, czyli x=8 lub x=−2."
      })
    ]
  },
  {
    id: 4,
    title: "Wzory Viète’a",
    subtitle: "suma, iloczyn i zależności między pierwiastkami",
    demo: { a: 1, b: -5, c: 6 },
    intro: "Wzory Viète’a pozwalają pracować z pierwiastkami bez ich bezpośredniego wyznaczania i są podstawą wielu późniejszych zadań z parametrem.",
    formulas: ["x₁+x₂=−b/a", "x₁x₂=c/a", "x₁²+x₂²=(x₁+x₂)²−2x₁x₂"],
    bullets: ["Najpierw upewnij się, że pierwiastki rzeczywiste istnieją, jeśli wymaga tego treść.", "Wyrażenia symetryczne w x₁,x₂ sprowadzaj do sumy i iloczynu."],
    note: "Przy odwrotnościach wymagaj x₁x₂≠0.",
    example: "Dla x²−5x+6=0 mamy x₁+x₂=5 i x₁x₂=6.",
    modules: [
      m({
        id: "module:14-vieta",
        title: "Wzory Viète’a i ich zastosowania",
        sourceRange: "zadania 3.221–3.241",
        intro: "Ustalaj znaki pierwiastków, obliczaj wyrażenia z x₁,x₂, wyznaczaj współczynniki i buduj równania na podstawie sumy i iloczynu pierwiastków.",
        formulas: ["S=x₁+x₂=−b/a", "P=x₁x₂=c/a", "x₁²+x₂²=S²−2P", "1/x₁+1/x₂=S/P"],
        bullets: ["Różne znaki: P<0.", "Oba dodatnie: S>0, P>0 i pierwiastki rzeczywiste.", "Oba ujemne: S<0, P>0 i pierwiastki rzeczywiste.", "Równanie o pierwiastkach x₁,x₂ można zapisać jako x²−Sx+P=0 po normalizacji a=1."],
        recognize: ["treść mówi: bez obliczania miejsc zerowych", "pojawiają się x₁+x₂, x₁x₂, odwrotności lub kwadraty pierwiastków", "trzeba zbudować równanie z zadanych pierwiastków"],
        pitfalls: ["zapomnienie o warunku P≠0 przy odwrotnościach", "stosowanie warunków znaków bez sprawdzenia istnienia dwóch rzeczywistych pierwiastków"],
        example: "Jeśli S=−2 i P=−3, to równanie moniczne ma postać x²+2x−3=0."
      })
    ]
  },
  {
    id: 5,
    title: "Nierówności kwadratowe",
    subtitle: "znak trójmianu, przedziały rozwiązań i dziedziny",
    demo: { a: 1, b: -2, c: -8 },
    intro: "Nierówności rozwiązuj przez analizę znaku funkcji kwadratowej oraz położenie paraboli względem osi OX.",
    formulas: ["ax²+bx+c ≷ 0", "Δ=b²−4ac"],
    bullets: ["Sprowadź nierówność do zera po jednej stronie.", "Wyznacz miejsca zerowe i znak a.", "Ostra nierówność wyklucza miejsca zerowe, nieostra je zawiera."],
    note: "Przy pierwiastku kwadratowym wyrażenie pod pierwiastkiem musi być nieujemne.",
    example: "x²−2x−8>0 ⇒ x∈(−∞,−2)∪(4,+∞).",
    modules: [
      m({
        id: "module:10-quadratic-inequalities",
        title: "Nierówności kwadratowe i dziedzina",
        sourceRange: "zadania 3.147–3.166",
        intro: "Rozwiązuj nierówności w różnych postaciach, również po przekształceniu iloczynów i kwadratów dwumianów, oraz wykorzystuj nierówności do wyznaczania dziedziny.",
        formulas: ["a(x−x₁)(x−x₂) ≷ 0", "√g(x) istnieje ⇔ g(x)≥0"],
        bullets: ["Dla a>0 funkcja jest dodatnia na zewnątrz przedziału między dwoma pierwiastkami i ujemna wewnątrz; dla a<0 odwrotnie.", "Gdy Δ<0, znak trójmianu jest stały i zgodny ze znakiem a.", "Gdy Δ=0, funkcja ma znak a poza miejscem zerowym i wartość 0 w tym punkcie."],
        recognize: ["znak >, ≥, < lub ≤ przy wyrażeniu kwadratowym", "pytanie o dziedzinę funkcji z pierwiastkiem", "trzeba opisać rozwiązanie jako przedział lub sumę przedziałów"],
        pitfalls: ["brak zmiany znaku nierówności po mnożeniu przez liczbę ujemną", "niepoprawne domknięcie końców przedziału"],
        example: "−(x−1)(x+3)≥0 daje x∈⟨−3,1⟩."
      })
    ]
  },
  {
    id: 6,
    title: "Ekstrema i optymalizacja",
    subtitle: "wartości największe i najmniejsze, monotoniczność i modele tekstowe",
    demo: { a: -1, b: 6, c: -5 },
    intro: "Wartość funkcji w wierzchołku oraz położenie wierzchołka względem dziedziny rozwiązują większość zadań optymalizacyjnych.",
    formulas: ["p=−b/(2a)", "q=f(p)"],
    bullets: ["Na przedziale domkniętym sprawdź wierzchołek, jeśli należy do przedziału, oraz końce przedziału.", "W zadaniu tekstowym najpierw zbuduj funkcję celu i ustal jej dziedzinę."],
    note: "Dziedzina wynikająca z treści jest częścią modelu i może wykluczyć wierzchołek.",
    example: "P(a)=a(10−a) ma maksimum w a=5.",
    modules: [
      m({
        id: "module:06-extrema-on-interval",
        title: "Wartości ekstremalne w przedziale",
        sourceRange: "zadania 3.79–3.92",
        intro: "Wyznaczaj minimum i maksimum funkcji kwadratowej na zadanym przedziale oraz wykorzystuj monotoniczność.",
        formulas: ["p=−b/(2a)", "q=f(p)"],
        bullets: ["Jeśli p leży w przedziale, porównaj f(p) z wartościami na końcach.", "Jeśli p jest poza przedziałem, funkcja jest na całym przedziale monotoniczna.", "Dla przedziałów otwartych wartość na końcu może nie być osiągana."],
        recognize: ["polecenie: najmniejsza/największa wartość w przedziale", "trzeba określić monotoniczność na ograniczonym zakresie", "pojawia się przedział jako dziedzina"],
        pitfalls: ["automatyczne przyjmowanie wartości z wierzchołka bez sprawdzenia, czy p należy do przedziału", "mylenie kresu z wartością osiąganą na przedziale otwartym"],
        example: "Dla f(x)=(x−2)²+1 na ⟨0,5⟩ minimum to 1, a maksimum to f(5)=10."
      }),
      m({
        id: "module:07-optimization",
        title: "Optymalizacja i zadania zastosowaniowe",
        sourceRange: "zadania 3.93–3.120",
        intro: "Tłumacz warunki geometryczne, ekonomiczne lub ruchowe na funkcję jednej zmiennej, a następnie wykorzystuj wierzchołek do optymalizacji.",
        formulas: ["funkcja celu: F(x)=ax²+bx+c", "xoptymalne=−b/(2a)"],
        bullets: ["Wybierz zmienną i zapisz pozostałe wielkości przez tę zmienną.", "Ustal ograniczenia: długości i liczby sztuk nie mogą przyjmować dowolnych wartości.", "Po znalezieniu ekstremum odpowiedz w jednostkach i języku zadania."],
        recognize: ["największy zysk, pole, wydajność albo najmniejszy koszt/odległość", "treść opisuje geometrię, ruch, produkcję lub zależność praktyczną", "trzeba najpierw zbudować wzór"],
        pitfalls: ["brak dziedziny modelu", "podanie x z wierzchołka bez interpretacji wyniku", "zaokrąglenie przed zakończeniem obliczeń"],
        example: "Jeśli zysk ma postać Z(x)=−2x²+40x−50, maksimum występuje dla x=10."
      })
    ]
  },
  {
    id: 7,
    title: "Równania zaawansowane i parametr",
    subtitle: "równania sprowadzalne, modele, pierwiastki, wartość bezwzględna i analiza parametru",
    demo: { a: 1, b: 0, c: -4 },
    intro: "Ostatni etap łączy wszystkie wcześniejsze umiejętności. Kluczowe jest rozpoznanie struktury zadania przed rozpoczęciem rachunków.",
    formulas: ["ax⁴+bx²+c=0 ⇒ t=x²≥0", "Dwa różne pierwiastki: Δ>0", "S=−b/a, P=c/a"],
    bullets: ["Przy parametrze zapisuj wszystkie warunki równocześnie.", "Po podstawieniu pomocniczym wracaj do ograniczeń zmiennej pomocniczej.", "Wartość bezwzględną analizuj przez przypadki lub wykres."],
    note: "Warunek a≠0 i warunki dziedziny sprawdzaj przed zastosowaniem wzorów dla funkcji kwadratowej.",
    example: "x⁴−3x²−4=0: t=x² daje t=4 lub t=−1, więc x=±2.",
    modules: [
      m({
        id: "module:09-reducible-equations",
        title: "Równania sprowadzalne do kwadratowych",
        sourceRange: "zadania 3.138–3.146",
        intro: "Rozpoznawaj równania, w których odpowiednie podstawienie zamienia problem na równanie kwadratowe.",
        formulas: ["ax⁴+bx²+c=0, t=x²≥0", "a·u(x)²+b·u(x)+c=0, t=u(x)"],
        bullets: ["Rozwiąż równanie w t.", "Odrzuć wartości t sprzeczne z definicją podstawienia.", "Dla t=x²: t>0 daje dwa x, t=0 jedno, t<0 żadnego w R."],
        recognize: ["potęgi x⁴ i x²", "to samo wyrażenie występuje jako u i u²", "pojawiają się symetryczne konstrukcje prowadzące do podstawienia"],
        pitfalls: ["pozostawienie odpowiedzi w zmiennej t", "przyjęcie ujemnego t=x²"],
        example: "x⁴−5x²+4=0 ⇒ t²−5t+4=0 ⇒ t=1 lub 4 ⇒ x=±1,±2."
      }),
      m({
        id: "module:11-word-and-model-equations",
        title: "Równania i zadania prowadzące do równania kwadratowego",
        sourceRange: "zadania 3.167–3.190",
        intro: "Buduj równanie kwadratowe z warunków liczbowych, geometrycznych lub tekstowych, a następnie interpretuj jego rozwiązania.",
        formulas: ["model → równanie ax²+bx+c=0"],
        bullets: ["Zdefiniuj niewiadomą i zapisz zależności z treści.", "Po rozwiązaniu równania sprawdź warunki praktyczne i dziedzinę.", "Odrzuć rozwiązania matematycznie poprawne, ale niemożliwe w kontekście."],
        recognize: ["wiek, liczby, wymiary, liczba zdarzeń lub inne dane tekstowe", "brak gotowego równania w treści", "trzeba sformułować model"],
        pitfalls: ["brak sprawdzenia odpowiedzi w treści", "wybranie złej zmiennej i niepotrzebne zwiększenie liczby niewiadomych"],
        example: "Jeśli iloczyn dwóch kolejnych liczb wynosi 72, zapisz x(x+1)=72 i rozwiąż równanie."
      }),
      m({
        id: "module:12-radicals",
        title: "Równania i nierówności z pierwiastkami",
        sourceRange: "zadania 3.191–3.200",
        intro: "Ustal dziedzinę, izoluj pierwiastek, podnoś obie strony do kwadratu tylko przy spełnionych warunkach i zawsze sprawdzaj otrzymane rozwiązania.",
        formulas: ["√A=B ⇒ A=B² oraz B≥0", "√A istnieje ⇔ A≥0"],
        bullets: ["Dziedzinę ustal przed przekształceniami.", "Podniesienie do kwadratu może wprowadzić rozwiązania obce.", "W nierównościach z pierwiastkiem kontroluj znaki obu stron przed potęgowaniem."],
        recognize: ["niewiadoma znajduje się pod znakiem √", "po podniesieniu do kwadratu powstaje równanie kwadratowe", "zadanie wymaga jednocześnie dziedziny i równania"],
        pitfalls: ["brak sprawdzenia rozwiązań w równaniu wyjściowym", "potęgowanie nierówności bez analizy znaków"],
        example: "√(x+5)=x−1 wymaga x≥1; dopiero potem można podnieść równanie do kwadratu."
      }),
      m({
        id: "module:13-absolute-value",
        title: "Wartość bezwzględna — wykresy, równania i nierówności",
        sourceRange: "zadania 3.201–3.220",
        intro: "Rozbijaj wartość bezwzględną na przypadki albo korzystaj z symetrii i interpretacji geometrycznej wykresu.",
        formulas: ["|u|={u dla u≥0; −u dla u<0}", "|u|=a: a<0 — brak; a=0 — u=0; a>0 — u=±a"],
        bullets: ["Punkty zmiany wzoru wyznacza równanie u(x)=0.", "Dla |f(x)| część wykresu pod osią OX odbij względem OX.", "Dla f(|x|) prawa część wykresu jest kopiowana symetrycznie na lewą stronę."],
        recognize: ["symbol | | obejmuje x lub wyrażenie kwadratowe", "trzeba naszkicować wykres z wartością bezwzględną", "liczba rozwiązań zależy od przecięć wykresów"],
        pitfalls: ["rozpatrywanie złych przedziałów przypadków", "mylenie |f(x)| z f(|x|)"],
        example: "|x−2|=3 daje x−2=3 lub x−2=−3, więc x=5 lub x=−1."
      }),
      m({
        id: "module:15-parameter",
        title: "Równania i nierówności kwadratowe z parametrem",
        sourceRange: "zadania 3.242–3.288",
        intro: "Analizuj liczbę rozwiązań, znaki i położenie pierwiastków, relacje Viète’a, warunki dla każdego x oraz równania z parametrem i wartością bezwzględną.",
        formulas: ["2 różne pierwiastki: a≠0 i Δ>0", "1 podwójny: a≠0 i Δ=0", "S=−b/a, P=c/a", "zawsze dodatnia: a>0 i Δ<0", "zawsze nieujemna: a>0 i Δ≤0"],
        bullets: ["Najpierw rozdziel przypadek, w którym współczynnik przy x² znika.", "Warunki na znaki pierwiastków zapisuj przez S i P oraz istnienie pierwiastków.", "Położenie obu pierwiastków względem liczby r można badać przez znak f(r), oś symetrii i liczbę pierwiastków.", "W zadaniach z liczbą rozwiązań równania z |x| wygodnie wprowadzić t=|x|≥0."],
        recognize: ["współczynniki zależą od m, k, p, a lub innego parametru", "polecenie zaczyna się od: dla jakich wartości parametru", "warunek dotyczy liczby, znaków, sumy, iloczynu lub położenia rozwiązań"],
        pitfalls: ["liczenie Δ jak dla równania kwadratowego bez sprawdzenia a≠0", "zgubienie warunków dodatkowych po zastosowaniu Viète’a", "nieuwzględnienie t≥0 przy t=|x| lub t=x²"],
        example: "Aby równanie x²+mx−2=0 miało pierwiastki przeciwnych znaków, wystarczy P=−2<0; rzeczywiste dwa pierwiastki wtedy istnieją automatycznie."
      })
    ]
  }
];

export function getStageContent(stageId: number) {
  return STAGES.find((stage) => stage.id === stageId) ?? null;
}
