const QUIZ_LEN = 6;
function buildQuiz(gens) {
    let pool = shuffle(gens), out = [];
    while (out.length < QUIZ_LEN) {
        if (pool.length === 0) pool = shuffle(gens);
        const item = pool.pop()();
        out.push({ ...item, key: Math.random().toString(36).slice(2) });
    }
    return out;
}
function Parabola({ a, b, c, w = 320, h = 240 }) {
    const p = -b / (2 * a), q = a * p * p + b * p + c;
    const xmin = p - 4.5, xmax = p + 4.5, samples = [];
    for (let i = 0; i <= 120; i++) { const x = xmin + ((xmax - xmin) * i) / 120; samples.push([x, a * x * x + b * x + c]); }
    let ylo = Math.min(...samples.map(s => s[1])), yhi = Math.max(...samples.map(s => s[1]));
    const padY = (yhi - ylo) * 0.12 + 1; ylo -= padY; yhi += padY;
    const X = x => ((x - xmin) / (xmax - xmin)) * w, Y = y => h - ((y - ylo) / (yhi - ylo)) * h;
    const d = samples.map((s, i) => `${i ? "L" : "M"}${X(s[0]).toFixed(1)},${Y(s[1]).toFixed(1)}`).join(" ");
    const D = b * b - 4 * a * c, roots = D >= 0 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)] : [];
    const gx = []; for (let k = Math.ceil(xmin); k <= Math.floor(xmax); k++) gx.push(k);
    return React.createElement("svg", { viewBox: `0 0 ${w} ${h}`, className: "w-full h-auto", role: "img", "aria-label": "Wykres paraboli" },
        React.createElement("rect", { x: "0", y: "0", width: w, height: h, fill: "#F7F8FB" }),
        gx.map(k => React.createElement("line", { key: 'g' + k, x1: X(k), y1: "0", x2: X(k), y2: h, stroke: "#E2E6F0", strokeWidth: "1" })),
        ylo < 0 && yhi > 0 && React.createElement("line", { x1: "0", y1: Y(0), x2: w, y2: Y(0), stroke: "#94A3B8", strokeWidth: "1.5" }),
        xmin < 0 && xmax > 0 && React.createElement("line", { x1: X(0), y1: "0", x2: X(0), y2: h, stroke: "#94A3B8", strokeWidth: "1.5" }),
        React.createElement("path", { d, fill: "none", stroke: "#4C1D95", strokeWidth: "2.5", strokeLinecap: "round" }),
        roots.map((r, i) => r >= xmin && r <= xmax ? React.createElement("circle", { key: 'r' + i, cx: X(r), cy: Y(0), r: "4", fill: "#fff", stroke: "#4C1D95", strokeWidth: "2" }) : null),
        React.createElement("circle", { cx: X(p), cy: Y(q), r: "5", fill: "#D97706" }),
        React.createElement("text", { x: X(p) + 9, y: Y(q) + (a > 0 ? 16 : -8), fontSize: "11", fill: "#92400E" }, "W(", Number(p.toFixed(2)), ", ", Number(q.toFixed(2)), ")"));
}
function Formula({ children, big }) { return React.createElement("div", { className: `font-serif text-violet-950 ${big ? "text-xl" : "text-lg"} bg-violet-50 border border-violet-100 rounded-lg px-4 py-3 my-2 text-center` }, children); }
function Theory({ stage }) {
    return React.createElement("div", { className: "space-y-3" },
        React.createElement("div", { className: "rounded-xl border border-slate-200 overflow-hidden bg-white" }, React.createElement(Parabola, { ...stage.demo }), React.createElement("div", { className: "px-4 py-2 text-xs text-slate-500 border-t border-slate-100" }, "Wykres poglądowy: f(x) = ", quad(stage.demo.a, stage.demo.b, stage.demo.c), " — pomarańczowy punkt to wierzchołek.")),
        stage.theory.map((blk, i) => {
            if (blk.t === 'p') return React.createElement("p", { key: i, className: "text-slate-700 leading-relaxed" }, blk.v);
            if (blk.t === 'h') return React.createElement("h3", { key: i, className: "font-serif text-lg text-slate-900 pt-2" }, blk.v);
            if (blk.t === 'f') return React.createElement(Formula, { key: i, big: true }, blk.v);
            if (blk.t === 'l') return React.createElement("ul", { key: i, className: "space-y-2" }, blk.v.map((li, j) => React.createElement("li", { key: j, className: "flex gap-3 text-slate-700 leading-relaxed" }, React.createElement("span", { className: "mt-2 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" }), React.createElement("span", null, li))));
            if (blk.t === 'n') return React.createElement("div", { key: i, className: "rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-950 leading-relaxed" }, blk.v);
            if (blk.t === 'e') return React.createElement("div", { key: i, className: "rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-800 leading-relaxed" }, React.createElement("span", { className: "font-semibold text-slate-900" }, blk.q, ". "), blk.v);
            return null;
        }));
}
function fmtAns(n) {
    if (Number.isInteger(n)) return M(n);
    for (let d = 2; d <= 12; d++) if (Math.abs(n * d - Math.round(n * d)) < 1e-9) return fracStr(Math.round(n * d), d);
    return String(n);
}
function Quiz({ stage, onPass }) {
    const [items, setItems] = useState(() => buildQuiz(stage.gens)), [idx, setIdx] = useState(0), [val, setVal] = useState(""), [checked, setChecked] = useState(false), [correct, setCorrect] = useState(false), [score, setScore] = useState(0), [done, setDone] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => { setItems(buildQuiz(stage.gens)); setIdx(0); setVal(""); setChecked(false); setScore(0); setDone(false); }, [stage.id]);
    useEffect(() => { if (!checked && inputRef.current) inputRef.current.focus(); }, [idx, checked]);
    const item = items[idx];
    const restart = () => { setItems(buildQuiz(stage.gens)); setIdx(0); setVal(""); setChecked(false); setScore(0); setDone(false); };
    const check = answer => { if (checked) return; const n = item.type === 'input' ? parseNum(answer) : NaN; const ok = item.type === 'input' ? (isFinite(n) && Math.abs(n - item.ans) < 1e-6) : answer === item.ans; setVal(answer); setCorrect(ok); setChecked(true); if (ok) setScore(s => s + 1); };
    const next = () => { if (idx + 1 >= items.length) { setDone(true); if (score === items.length) onPass(); } else { setIdx(i => i + 1); setVal(""); setChecked(false); } };
    if (done) { const perfect = score === items.length; return React.createElement("div", { className: "text-center py-6" }, React.createElement("div", { className: `inline-flex items-center justify-center h-20 w-20 rounded-full ${perfect ? 'bg-emerald-100' : 'bg-rose-100'}` }, React.createElement("span", { className: `font-serif text-2xl ${perfect ? 'text-emerald-700' : 'text-rose-700'}` }, score, "/", items.length)), React.createElement("h3", { className: "font-serif text-xl text-slate-900 mt-4" }, perfect ? 'Etap zaliczony' : 'Jeszcze nie 100%'), React.createElement("p", { className: "text-slate-600 mt-2 px-4 leading-relaxed" }, perfect ? 'Kolejny etap jest już odblokowany. Możesz też powtórzyć ten quiz — przykłady wylosują się od nowa.' : 'Do przejścia dalej potrzebny jest komplet poprawnych odpowiedzi. Wróć do teorii albo spróbuj od razu — dostaniesz nowy zestaw zadań.'), React.createElement("button", { onClick: restart, className: "mt-5 px-6 py-3 rounded-lg bg-violet-900 text-white font-medium hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2" }, "Losuj nowy zestaw")); }
    return React.createElement("div", null,
        React.createElement("div", { className: "flex items-center gap-2 mb-4" }, items.map((_, i) => React.createElement("div", { key: i, className: `h-1.5 flex-1 rounded-full ${i < idx ? 'bg-violet-700' : i === idx ? 'bg-violet-400' : 'bg-slate-200'}` })), React.createElement("span", { className: "text-xs text-slate-500 tabular-nums ml-1" }, idx + 1, "/", items.length)),
        React.createElement("p", { className: "text-slate-800 leading-relaxed" }, item.q), item.expr && React.createElement(Formula, null, item.expr),
        item.type === 'choice' ? React.createElement("div", { className: "space-y-2 mt-3" }, item.options.map(o => { const isAns = o === item.ans, isPicked = o === val; let cls = 'border-slate-200 bg-white hover:border-violet-400'; if (checked && isAns) cls = 'border-emerald-500 bg-emerald-50'; else if (checked && isPicked) cls = 'border-rose-400 bg-rose-50'; else if (checked) cls = 'border-slate-200 bg-white opacity-60'; return React.createElement("button", { key: o, disabled: checked, onClick: () => check(o), className: `w-full text-left px-4 py-3 rounded-lg border font-serif text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400 ${cls}` }, o); })) : React.createElement("div", { className: "flex gap-2 mt-3" }, React.createElement("input", { ref: inputRef, value: val, disabled: checked, onChange: e => setVal(e.target.value), onKeyDown: e => { if (e.key === 'Enter' && !checked) check(val); }, inputMode: "text", placeholder: "Twoja odpowiedź", className: "flex-1 min-w-0 px-4 py-3 rounded-lg border border-slate-300 font-serif text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-slate-50" }), !checked && React.createElement("button", { onClick: () => check(val), className: "px-5 py-3 rounded-lg bg-violet-900 text-white font-medium hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400" }, "Sprawdź")),
        checked && React.createElement("div", { className: "mt-4" }, React.createElement("div", { className: `rounded-lg px-4 py-3 ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}` }, React.createElement("p", { className: `font-medium ${correct ? 'text-emerald-800' : 'text-rose-800'}` }, correct ? 'Dobrze' : `Źle — poprawna odpowiedź: ${item.type === 'input' ? fmtAns(item.ans) : item.ans}`), React.createElement("p", { className: "text-sm text-slate-700 mt-2 whitespace-pre-line font-serif leading-relaxed" }, item.sol)), React.createElement("button", { onClick: next, className: "w-full mt-3 px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2" }, idx + 1 >= items.length ? 'Zakończ quiz' : 'Następne zadanie')));
}
