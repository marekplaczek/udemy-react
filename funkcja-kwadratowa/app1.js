const { useState, useEffect, useRef } = React;
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const RNZ = (a, b) => { let v = 0; while (v === 0)
    v = R(a, b); return v; };
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
    const b = arr.slice();
    for (let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
};
const M = (n) => (n < 0 ? "−" + Math.abs(n) : "" + n);
const par = (n) => (n < 0 ? "(" + M(n) + ")" : "" + n);
function quad(a, b, c, v = "x") {
    let s = a === 1 ? "" : a === -1 ? "−" : M(a);
    s += v + "²";
    if (b)
        s += (b > 0 ? " + " : " − ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + v;
    if (c)
        s += (c > 0 ? " + " : " − ") + Math.abs(c);
    return s;
}
function canon(a, p, q) {
    let s = a === 1 ? "" : a === -1 ? "−" : M(a);
    if (p === 0)
        s += "x²";
    else
        s += "(x " + (p > 0 ? "− " : "+ ") + Math.abs(p) + ")²";
    if (q)
        s += (q > 0 ? " + " : " − ") + Math.abs(q);
    return s;
}
function factored(a, x1, x2) {
    let s = a === 1 ? "" : a === -1 ? "−" : M(a);
    const f = (r) => (r === 0 ? "x" : "(x " + (r > 0 ? "− " : "+ ") + Math.abs(r) + ")");
    return s + f(x1) + f(x2);
}
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
function fracStr(n, d) {
    if (d < 0) {
        n = -n;
        d = -d;
    }
    const g = gcd(n, d) || 1;
    n /= g;
    d /= g;
    return d === 1 ? M(n) : M(n) + "/" + d;
}
function parseNum(raw) {
    if (raw == null)
        return NaN;
    let s = String(raw).trim().replace(/−/g, "-").replace(/\s/g, "").replace(/,/g, ".");
    if (s === "")
        return NaN;
    if (s.includes("/")) {
        const parts = s.split("/");
        if (parts.length !== 2)
            return NaN;
        const na = Number(parts[0]), nb = Number(parts[1]);
        if (!isFinite(na) || !isFinite(nb) || nb === 0)
            return NaN;
        return na / nb;
    }
    const n = Number(s);
    return isFinite(n) ? n : NaN;
}
const G1 = [
    () => {
        const a = RNZ(-4, 4), b = R(-6, 6), c = R(-9, 9), k = RNZ(-3, 3);
        const v = a * k * k + b * k + c;
        return { q: `Oblicz f(${M(k)}).`, expr: `f(x) = ${quad(a, b, c)}`, type: "input", ans: v,
            sol: `f(${M(k)}) = ${par(a)}·${par(k)}² + ${par(b)}·${par(k)} + ${par(c)} = ${M(a * k * k)} + ${M(b * k)} + ${M(c)} = ${M(v)}` };
    },
    () => {
        const a = RNZ(-5, 5), b = R(-7, 7), c = R(-9, 9);
        return { q: "W którą stronę skierowane są ramiona paraboli?", expr: `f(x) = ${quad(a, b, c)}`, type: "choice",
            options: ["w górę", "w dół"], ans: a > 0 ? "w górę" : "w dół",
            sol: `O zwrocie ramion decyduje wyłącznie znak a. Tutaj a = ${M(a)}, więc ramiona są skierowane ${a > 0 ? "w górę" : "w dół"}.` };
    },
    () => {
        const a = RNZ(-4, 4), b = RNZ(-6, 6), c = RNZ(-9, 9);
        return { q: "Podaj rzędną (współrzędną y) punktu przecięcia wykresu z osią OY.", expr: `f(x) = ${quad(a, b, c)}`, type: "input", ans: c,
            sol: `Wystarczy policzyć f(0) = ${M(c)}. Punkt przecięcia z OY to zawsze (0, c).` };
    },
    () => {
        const a = RNZ(-4, 4), b = R(-8, 8), c = R(-8, 8);
        const d = b * b - 4 * a * c;
        return { q: "Oblicz wyróżnik Δ tego trójmianu.", expr: `f(x) = ${quad(a, b, c)}`, type: "input", ans: d,
            sol: `Δ = b² − 4ac = ${par(b)}² − 4·${par(a)}·${par(c)} = ${b * b} − ${M(4 * a * c)} = ${M(d)}` };
    },
    () => {
        const a = RNZ(-3, 3), b = R(-7, 7), c = R(-7, 7);
        const d = b * b - 4 * a * c;
        const ans = d > 0 ? "dwa miejsca zerowe" : d === 0 ? "jedno miejsce zerowe" : "brak miejsc zerowych";
        return { q: "Ile miejsc zerowych ma ta funkcja?", expr: `f(x) = ${quad(a, b, c)}`, type: "choice",
            options: ["dwa miejsca zerowe", "jedno miejsce zerowe", "brak miejsc zerowych"], ans,
            sol: `Δ = ${par(b)}² − 4·${par(a)}·${par(c)} = ${M(d)}. Ponieważ Δ ${d > 0 ? "> 0" : d === 0 ? "= 0" : "< 0"}, funkcja ma ${ans}.` };
    },
    () => {
        const k = RNZ(-5, 5), b = RNZ(-5, 5), c = R(-6, 6);
        return { q: "Dla jakich wartości parametru m funkcja jest funkcją kwadratową?",
            expr: `f(x) = (m ${k > 0 ? "− " + k : "+ " + Math.abs(k)})x² ${b > 0 ? "+ " + b : "− " + Math.abs(b)}x ${c >= 0 ? "+ " + c : "− " + Math.abs(c)}`,
            type: "choice", options: [`m ≠ ${M(k)}`, `m = ${M(k)}`, `m > ${M(k)}`, "dla każdego m ∈ ℝ"], ans: `m ≠ ${M(k)}`,
            sol: `Funkcja jest kwadratowa, gdy współczynnik przy x² jest różny od zera: m ${k > 0 ? "− " + k : "+ " + Math.abs(k)} ≠ 0, czyli m ≠ ${M(k)}.` };
    },
    () => {
        const a = RNZ(-3, 3), b = R(-6, 6), c = R(-6, 6), k = R(-3, 3);
        const v = a * k * k + b * k + c;
        const shift = Math.random() < 0.5 ? 0 : RNZ(1, 4);
        const yA = v + shift;
        return { q: `Czy punkt A = (${M(k)}, ${M(yA)}) należy do wykresu funkcji? Wpisz 1, jeśli tak, albo 0, jeśli nie.`, expr: `f(x) = ${quad(a, b, c)}`,
            type: "input", ans: shift === 0 ? 1 : 0,
            sol: `f(${M(k)}) = ${M(v)}. Rzędna punktu A wynosi ${M(yA)}, więc punkt ${shift === 0 ? "należy" : "nie należy"} do wykresu.` };
    },
];
function mkPQ() {
    const a = RNZ(-3, 3), p = R(-5, 5), q = R(-7, 7);
    return { a, p, q, b: -2 * a * p, c: a * p * p + q };
}
function mkPQd() {
    let a, p, q;
    do {
        a = RNZ(-3, 3);
        p = RNZ(-5, 5);
        q = RNZ(-7, 7);
    } while (p === q || p === -q);
    return { a, p, q, b: -2 * a * p, c: a * p * p + q };
}
const uniq = (arr) => Array.from(new Set(arr));
const G2 = [
    () => { const { a, p, q, b, c } = mkPQ(); return { q: "Podaj pierwszą współrzędną wierzchołka paraboli (liczbę p).", expr: `f(x) = ${quad(a, b, c)}`, type: "input", ans: p, sol: `p = −b/(2a) = −${par(b)} / (2·${par(a)}) = ${M(p)}` }; },
    () => { const { a, p, q, b, c } = mkPQ(); return { q: "Podaj drugą współrzędną wierzchołka paraboli (liczbę q).", expr: `f(x) = ${quad(a, b, c)}`, type: "input", ans: q, sol: `p = −b/(2a) = ${M(p)}, więc q = f(p) = ${par(a)}·${par(p)}² + ${par(b)}·${par(p)} + ${par(c)} = ${M(q)}.\nMożna też: q = −Δ/(4a).` }; },
    () => { const { a, p, q, b, c } = mkPQd(); const good = canon(a, p, q); const opts = shuffle(uniq([good, canon(a, -p, q), canon(a, p, -q), canon(-a, p, q)])); return { q: "Wskaż postać kanoniczną tej funkcji.", expr: `f(x) = ${quad(a, b, c)}`, type: "choice", options: opts, ans: good, sol: `Wierzchołek: p = −b/(2a) = ${M(p)}, q = f(p) = ${M(q)}. Stąd f(x) = ${good}.` }; },
    () => { const { a, p, q, b, c } = mkPQ(); return { q: `Podaj ${a > 0 ? "najmniejszą" : "największą"} wartość funkcji.`, expr: `f(x) = ${quad(a, b, c)}`, type: "input", ans: q, sol: `a = ${M(a)} ${a > 0 ? "> 0, więc funkcja ma wartość najmniejszą" : "< 0, więc funkcja ma wartość największą"} równą q = ${M(q)} (przyjmowaną dla x = ${M(p)}).` }; },
    () => { const { a, p, q, b, c } = mkPQ(); return { q: "Podaj równanie osi symetrii paraboli w postaci x = ... (wpisz samą liczbę).", expr: `f(x) = ${quad(a, b, c)}`, type: "input", ans: p, sol: `Oś symetrii przechodzi przez wierzchołek: x = p = −b/(2a) = ${M(p)}.` }; },
    () => { let a, p, q; do {
        a = RNZ(-3, 3);
        p = RNZ(-4, 4);
        q = RNZ(-5, 5);
    } while (p === q || p === -q); const good = `[${M(p)}, ${M(q)}]`; const opts = shuffle(uniq([good, `[${M(-p)}, ${M(-q)}]`, `[${M(q)}, ${M(p)}]`, `[${M(-p)}, ${M(q)}]`])); return { q: `Wykres funkcji g powstał przez przesunięcie wykresu funkcji y = ${a === 1 ? "" : a === -1 ? "−" : M(a)}x² o pewien wektor. Podaj ten wektor.`, expr: `g(x) = ${canon(a, p, q)}`, type: "choice", options: opts, ans: good, sol: `Postać kanoniczna a(x − p)² + q oznacza przesunięcie o wektor [p, q] = [${M(p)}, ${M(q)}].` }; },
    () => { const a = RNZ(-3, 3), p = R(-4, 4), q = R(-6, 6); const c = a * p * p + q; return { q: "Zamień postać kanoniczną na ogólną i podaj wyraz wolny c.", expr: `f(x) = ${canon(a, p, q)}`, type: "input", ans: c, sol: `f(x) = ${par(a)}(x² − ${M(2 * p)}x + ${p * p}) ${q >= 0 ? "+ " + q : "− " + Math.abs(q)} = ${quad(a, -2 * a * p, c)}, więc c = ${M(c)}.\nSzybciej: c = f(0) = ${par(a)}·${par(-p)}² ${q >= 0 ? "+ " + q : "− " + Math.abs(q)} = ${M(c)}.` }; },
];
