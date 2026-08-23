import type { GeneratedQuestion } from "./stage1";

export type Generator = () => GeneratedQuestion;
export const R = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
export const RNZ = (a: number, b: number) => { let v = 0; while (v === 0) v = R(a, b); return v; };
export const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = <T,>(arr: T[]) => { const b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));
export const M = (n: number) => n < 0 ? "−" + Math.abs(n) : String(n);
export const par = (n: number) => n < 0 ? `(${M(n)})` : String(n);
export function quad(a: number, b: number, c: number, v = "x") { let s = a === 1 ? "" : a === -1 ? "−" : M(a); s += `${v}²`; if (b) s += (b > 0 ? " + " : " − ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + v; if (c) s += (c > 0 ? " + " : " − ") + Math.abs(c); return s; }
export function canon(a: number, p: number, q: number) { let s = a === 1 ? "" : a === -1 ? "−" : M(a); s += p === 0 ? "x²" : `(x ${p > 0 ? "− " : "+ "}${Math.abs(p)})²`; if (q) s += (q > 0 ? " + " : " − ") + Math.abs(q); return s; }
export function factored(a: number, x1: number, x2: number) { const s = a === 1 ? "" : a === -1 ? "−" : M(a); const f = (r: number) => r === 0 ? "x" : `(x ${r > 0 ? "− " : "+ "}${Math.abs(r)})`; return s + f(x1) + f(x2); }
const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : Math.abs(a);
export function fracStr(n: number, d: number) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? M(n) : `${M(n)}/${d}`; }
export function mkPQ() { const a = RNZ(-3, 3), p = R(-5, 5), q = R(-7, 7); return { a, p, q, b: -2 * a * p, c: a * p * p + q }; }
export function mkPQd() { let a: number, p: number, q: number; do { a = RNZ(-3, 3); p = RNZ(-5, 5); q = RNZ(-7, 7); } while (p === q || p === -q); return { a, p, q, b: -2 * a * p, c: a * p * p + q }; }
export function mkRoots() { const a = RNZ(-3, 3); let x1 = R(-6, 6), x2 = R(-6, 6); while (x1 === x2) x2 = R(-6, 6); if (x1 > x2) [x1, x2] = [x2, x1]; return { a, x1, x2, b: -a * (x1 + x2), c: a * x1 * x2 }; }
export function mkRootsD() { let a: number, x1: number, x2: number; do { a = RNZ(-3, 3); x1 = RNZ(-6, 6); x2 = RNZ(-6, 6); } while (x1 === x2 || x1 === -x2); if (x1 > x2) [x1, x2] = [x2, x1]; return { a, x1, x2, b: -a * (x1 + x2), c: a * x1 * x2 }; }
export const ivOpen = (x1: number, x2: number) => `x ∈ (${M(x1)}, ${M(x2)})`;
export const ivClosed = (x1: number, x2: number) => `x ∈ ⟨${M(x1)}, ${M(x2)}⟩`;
export const ivOutOpen = (x1: number, x2: number) => `x ∈ (−∞, ${M(x1)}) ∪ (${M(x2)}, +∞)`;
export const ivOutClosed = (x1: number, x2: number) => `x ∈ (−∞, ${M(x1)}⟩ ∪ ⟨${M(x2)}, +∞)`;
