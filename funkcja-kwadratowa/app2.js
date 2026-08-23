function mkRoots() {
    const a = RNZ(-3, 3);
    let x1 = R(-6, 6), x2 = R(-6, 6);
    while (x1 === x2)
        x2 = R(-6, 6);
    if (x1 > x2)
        [x1, x2] = [x2, x1];
    return { a, x1, x2, b: -a * (x1 + x2), c: a * x1 * x2 };
}
function mkRootsD() {
    let a, x1, x2;
    do {
        a = RNZ(-3, 3);
        x1 = RNZ(-6, 6);
        x2 = RNZ(-6, 6);
    } while (x1 === x2 || x1 === -x2);
    if (x1 > x2)
        [x1, x2] = [x2, x1];
    return { a, x1, x2, b: -a * (x1 + x2), c: a * x1 * x2 };
}
const G3 = [
    () => { const { a, x1, x2, b, c } = mkRoots(); const d = b * b - 4 * a * c; return { q: "Rozwiąż równanie i podaj mniejszy pierwiastek.", expr: `${quad(a, b, c)} = 0`, type: "input", ans: x1, sol: `Δ = ${par(b)}² − 4·${par(a)}·${par(c)} = ${d}, √Δ = ${Math.sqrt(d)}\nx = (−b ± √Δ)/(2a) ⇒ x₁ = ${M(x1)}, x₂ = ${M(x2)}. Mniejszy: ${M(x1)}.` }; },
    () => { const { a, x1, x2, b, c } = mkRootsD(); const good = factored(a, x1, x2); const opts = shuffle(uniq([good, factored(a, -x1, -x2), factored(a, x1, -x2), factored(-a, x1, x2)])); return { q: "Wskaż postać iloczynową tego trójmianu.", expr: `f(x) = ${quad(a, b, c)}`, type: "choice", options: opts, ans: good, sol: `Miejsca zerowe: x₁ = ${M(x1)}, x₂ = ${M(x2)}. Postać iloczynowa: a(x − x₁)(x − x₂) = ${good}.` }; },
    () => { const a = RNZ(-3, 3), r = RNZ(-5, 5); const b = -2 * a * r, c = a * r * r; return { q: "Rozwiąż równanie i podaj jego jedyne rozwiązanie.", expr: `${quad(a, b, c)} = 0`, type: "input", ans: r, sol: `Δ = ${par(b)}² − 4·${par(a)}·${par(c)} = 0, więc równanie ma jeden pierwiastek podwójny x₀ = −b/(2a) = ${M(r)}.` }; },
    () => { let a, b, c, d; do {
        a = RNZ(-3, 3);
        b = R(-5, 5);
        c = R(-6, 6);
        d = b * b - 4 * a * c;
    } while (d >= 0); return { q: "Podaj zbiór rozwiązań równania.", expr: `${quad(a, b, c)} = 0`, type: "choice", options: ["∅ (brak rozwiązań)", "ℝ (każda liczba)", "jedno rozwiązanie", "dwa rozwiązania"], ans: "∅ (brak rozwiązań)", sol: `Δ = ${par(b)}² − 4·${par(a)}·${par(c)} = ${M(d)} < 0, więc równanie nie ma rozwiązań rzeczywistych.` }; },
    () => { const a = RNZ(-3, 3); let x1 = R(-5, 5), x2 = R(-5, 5); while (x1 === x2 || (x1 + x2) % 2 !== 0) {
        x1 = R(-5, 5);
        x2 = R(-5, 5);
    } const p = (x1 + x2) / 2; return { q: "Odczytaj z postaci iloczynowej pierwszą współrzędną wierzchołka.", expr: `f(x) = ${factored(a, Math.min(x1, x2), Math.max(x1, x2))}`, type: "input", ans: p, sol: `Wierzchołek leży dokładnie między miejscami zerowymi: p = (x₁ + x₂)/2 = (${M(x1)} + ${M(x2)})/2 = ${M(p)}.` }; },
    () => { const a = RNZ(-4, 4), b = RNZ(-8, 8); const r = -b / a; return { q: "Rozwiąż równanie niezupełne i podaj niezerowe rozwiązanie (ułamek zapisz np. jako 3/2).", expr: `${quad(a, b, 0)} = 0`, type: "input", ans: r, sol: `x(${a === 1 ? "" : M(a)}x ${b > 0 ? "+ " + b : "− " + Math.abs(b)}) = 0 ⇒ x = 0 lub x = −b/a = ${fracStr(-b, a)}.` }; },
    () => { const a = pick([1, 2, 3, 4]), k = pick([1, 4, 9, 16, 25]); const c = -a * k; const r = Math.sqrt(k); return { q: "Rozwiąż równanie i podaj większy pierwiastek.", expr: `${quad(a, 0, c)} = 0`, type: "input", ans: r, sol: `${a}x² = ${a * k} ⇒ x² = ${k} ⇒ x = −${r} lub x = ${r}. Większy: ${r}.` }; },
];
const G4 = [
    () => { const { a, b, c } = mkRoots(); return { q: "Nie rozwiązując równania, oblicz sumę jego pierwiastków (ułamek zapisz np. jako 3/2).", expr: `${quad(a, b, c)} = 0`, type: "input", ans: -b / a, sol: `x₁ + x₂ = −b/a = −${par(b)}/${par(a)} = ${fracStr(-b, a)}` }; },
    () => { const { a, b, c } = mkRoots(); return { q: "Nie rozwiązując równania, oblicz iloczyn jego pierwiastków (ułamek zapisz np. jako 3/2).", expr: `${quad(a, b, c)} = 0`, type: "input", ans: c / a, sol: `x₁ · x₂ = c/a = ${par(c)}/${par(a)} = ${fracStr(c, a)}` }; },
    () => { let x1 = RNZ(-5, 5), x2 = RNZ(-5, 5); while (x1 === x2)
        x2 = RNZ(-5, 5); const b = -(x1 + x2), c = x1 * x2, S = -b, P = c; return { q: "Oblicz wartość wyrażenia x₁² + x₂², gdzie x₁, x₂ są pierwiastkami równania.", expr: `${quad(1, b, c)} = 0`, type: "input", ans: S * S - 2 * P, sol: `x₁ + x₂ = ${M(S)}, x₁x₂ = ${M(P)}\nx₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = ${par(S)}² − 2·${par(P)} = ${M(S * S - 2 * P)}` }; },
    () => { let x1 = RNZ(-5, 5), x2 = RNZ(-5, 5); while (x1 === x2 || x1 * x2 === 0)
        x2 = RNZ(-5, 5); const b = -(x1 + x2), c = x1 * x2; return { q: "Oblicz 1/x₁ + 1/x₂, gdzie x₁, x₂ są pierwiastkami równania (ułamek zapisz np. jako 3/2).", expr: `${quad(1, b, c)} = 0`, type: "input", ans: (-b) / c, sol: `1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁x₂) = ${M(-b)}/${par(c)} = ${fracStr(-b, c)}` }; },
    () => { const k = pick([2, 3, 4]); const t = RNZ(-4, 4); const target = -(k * t + 1); return { q: `Dla jakiej wartości parametru m suma pierwiastków równania jest równa ${M(target)}?`, expr: `x² + (${k}m + 1)x − 7 = 0`, type: "input", ans: t, sol: `x₁ + x₂ = −b/a = −(${k}m + 1). Warunek: −(${k}m + 1) = ${M(target)} ⇒ ${k}m + 1 = ${M(-target)} ⇒ m = ${M(t)}.` }; },
    () => { let x1 = RNZ(-5, 5), x2 = RNZ(-5, 5); while (x1 === x2)
        x2 = RNZ(-5, 5); const b = -(x1 + x2), c = x1 * x2; const ans = c < 0 ? "różne znaki" : x1 > 0 ? "oba dodatnie" : "oba ujemne"; return { q: "Bez rozwiązywania równania określ znaki jego pierwiastków.", expr: `${quad(1, b, c)} = 0`, type: "choice", options: ["oba dodatnie", "oba ujemne", "różne znaki"], ans, sol: `x₁x₂ = ${M(c)}, x₁ + x₂ = ${M(-b)}.\n${c < 0 ? "Iloczyn ujemny ⇒ pierwiastki mają różne znaki." : `Iloczyn dodatni ⇒ te same znaki; suma ${-b > 0 ? "dodatnia ⇒ oba dodatnie" : "ujemna ⇒ oba ujemne"}.`}` }; },
    () => { let x1 = RNZ(-4, 4), x2 = RNZ(-4, 4); while (x1 === x2)
        x2 = RNZ(-4, 4); const b = -(x1 + x2), c = x1 * x2, val = Math.abs(x1 - x2); return { q: "Oblicz |x₁ − x₂| dla pierwiastków tego równania.", expr: `${quad(1, b, c)} = 0`, type: "input", ans: val, sol: `(x₁ − x₂)² = (x₁ + x₂)² − 4x₁x₂ = ${par(-b)}² − 4·${par(c)} = ${val * val}\n|x₁ − x₂| = √${val * val} = ${val} (to jest √Δ/|a|).` }; },
];
