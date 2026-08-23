export type GeneratedQuestion = {
  key: string;
  q: string;
  expr?: string;
  type: "input" | "choice";
  options?: string[];
  ans: number | string;
  solution: string;
  skill: string;
};

const R = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const RNZ = (a: number, b: number) => { let v = 0; while (v === 0) v = R(a, b); return v; };
const shuffle = <T,>(arr: T[]) => {
  const b = arr.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const M = (n: number) => (n < 0 ? "−" + Math.abs(n) : String(n));
const par = (n: number) => (n < 0 ? `(${M(n)})` : String(n));

function quad(a: number, b: number, c: number, v = "x") {
  let s = a === 1 ? "" : a === -1 ? "−" : M(a);
  s += `${v}²`;
  if (b) s += (b > 0 ? " + " : " − ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + v;
  if (c) s += (c > 0 ? " + " : " − ") + Math.abs(c);
  return s;
}

const generators: Array<() => GeneratedQuestion> = [
  () => {
    const a = RNZ(-4, 4), b = R(-6, 6), c = R(-9, 9), k = RNZ(-3, 3);
    const value = a * k * k + b * k + c;
    return {
      key: "stage1.value",
      q: `Oblicz f(${M(k)}).`,
      expr: `f(x) = ${quad(a, b, c)}`,
      type: "input",
      ans: value,
      skill: "wartosc-funkcji",
      solution: `f(${M(k)}) = ${par(a)}·${par(k)}² + ${par(b)}·${par(k)} + ${par(c)} = ${M(value)}`,
    };
  },
  () => {
    const a = RNZ(-5, 5), b = R(-7, 7), c = R(-9, 9);
    const ans = a > 0 ? "w górę" : "w dół";
    return {
      key: "stage1.arms",
      q: "W którą stronę skierowane są ramiona paraboli?",
      expr: `f(x) = ${quad(a, b, c)}`,
      type: "choice",
      options: ["w górę", "w dół"],
      ans,
      skill: "wykres-ramiona",
      solution: `O zwrocie ramion decyduje znak a. Tutaj a = ${M(a)}, więc ramiona są skierowane ${ans}.`,
    };
  },
  () => {
    const a = RNZ(-4, 4), b = RNZ(-6, 6), c = RNZ(-9, 9);
    return {
      key: "stage1.oy",
      q: "Podaj rzędną punktu przecięcia wykresu z osią OY.",
      expr: `f(x) = ${quad(a, b, c)}`,
      type: "input",
      ans: c,
      skill: "wspolczynniki",
      solution: `f(0) = ${M(c)}, więc wykres przecina oś OY w punkcie (0, ${M(c)}).`,
    };
  },
  () => {
    const a = RNZ(-4, 4), b = R(-8, 8), c = R(-8, 8);
    const d = b * b - 4 * a * c;
    return {
      key: "stage1.delta",
      q: "Oblicz wyróżnik Δ tego trójmianu.",
      expr: `f(x) = ${quad(a, b, c)}`,
      type: "input",
      ans: d,
      skill: "delta",
      solution: `Δ = b² − 4ac = ${par(b)}² − 4·${par(a)}·${par(c)} = ${M(d)}.`,
    };
  },
  () => {
    const a = RNZ(-3, 3), b = R(-7, 7), c = R(-7, 7);
    const d = b * b - 4 * a * c;
    const ans = d > 0 ? "dwa miejsca zerowe" : d === 0 ? "jedno miejsce zerowe" : "brak miejsc zerowych";
    return {
      key: "stage1.roots-count",
      q: "Ile miejsc zerowych ma ta funkcja?",
      expr: `f(x) = ${quad(a, b, c)}`,
      type: "choice",
      options: ["dwa miejsca zerowe", "jedno miejsce zerowe", "brak miejsc zerowych"],
      ans,
      skill: "delta-interpretacja",
      solution: `Δ = ${M(d)}. Ponieważ Δ ${d > 0 ? "> 0" : d === 0 ? "= 0" : "< 0"}, funkcja ma ${ans}.`,
    };
  },
  () => {
    const k = RNZ(-5, 5), b = RNZ(-5, 5), c = R(-6, 6);
    const ans = `m ≠ ${M(k)}`;
    return {
      key: "stage1.parameter-quadratic",
      q: "Dla jakich wartości parametru m funkcja jest funkcją kwadratową?",
      expr: `f(x) = (m ${k > 0 ? "− " + k : "+ " + Math.abs(k)})x² ${b > 0 ? "+ " + b : "− " + Math.abs(b)}x ${c >= 0 ? "+ " + c : "− " + Math.abs(c)}`,
      type: "choice",
      options: [ans, `m = ${M(k)}`, `m > ${M(k)}`, "dla każdego m ∈ ℝ"],
      ans,
      skill: "parametr-a-nie-zero",
      solution: `Współczynnik przy x² musi być różny od zera, stąd ${ans}.`,
    };
  },
  () => {
    const a = RNZ(-3, 3), b = R(-6, 6), c = R(-6, 6), k = R(-3, 3);
    const value = a * k * k + b * k + c;
    const shift = Math.random() < 0.5 ? 0 : RNZ(1, 4);
    const yA = value + shift;
    return {
      key: "stage1.point",
      q: `Czy punkt A = (${M(k)}, ${M(yA)}) należy do wykresu? Wpisz 1, jeśli tak, albo 0, jeśli nie.`,
      expr: `f(x) = ${quad(a, b, c)}`,
      type: "input",
      ans: shift === 0 ? 1 : 0,
      skill: "punkt-na-wykresie",
      solution: `f(${M(k)}) = ${M(value)}. Punkt ${shift === 0 ? "należy" : "nie należy"} do wykresu.`,
    };
  },
];

export function buildStage1Quiz(count = 6) {
  return shuffle(generators).slice(0, Math.min(count, generators.length)).map((generator) => generator());
}

export function answerToStorage(answer: number | string) {
  return typeof answer === "number" ? String(answer) : answer;
}

export function parseNumericAnswer(raw: string) {
  const normalized = raw.trim().replace(/−/g, "-").replace(/\s/g, "").replace(/,/g, ".");
  if (!normalized) return Number.NaN;
  if (normalized.includes("/")) {
    const parts = normalized.split("/");
    if (parts.length !== 2) return Number.NaN;
    const numerator = Number(parts[0]);
    const denominator = Number(parts[1]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return Number.NaN;
    return numerator / denominator;
  }
  const value = Number(normalized);
  return Number.isFinite(value) ? value : Number.NaN;
}

export function isAnswerCorrect(type: "input" | "choice", submitted: string, correct: string) {
  if (type === "choice") return submitted === correct;
  const actual = parseNumericAnswer(submitted);
  const expected = parseNumericAnswer(correct);
  return Number.isFinite(actual) && Number.isFinite(expected) && Math.abs(actual - expected) < 1e-6;
}
