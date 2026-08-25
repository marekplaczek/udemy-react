import test from "node:test";
import assert from "node:assert/strict";
import { isAnswerCorrect } from "./answer.ts";

const ok = (submitted: string, correct: string) =>
  assert.equal(isAnswerCorrect("input", submitted, correct), true, `${submitted} ≠ ${correct}`);

const bad = (submitted: string, correct: string) =>
  assert.equal(isAnswerCorrect("input", submitted, correct), false, `${submitted} unexpectedly matched ${correct}`);

test("accepts equivalent numeric formats", () => {
  ok("0,5", "1/2");
  ok("-2.5", "-5/2");
  bad("2", "3");
});

test("accepts finite sets regardless of order", () => {
  ok("{3; -2}", "{-2,3}");
  bad("{-2,4}", "{-2,3}");
});

test("accepts intervals and unions", () => {
  ok("x∈[-5,-1) ∪ (3,4]", "[-5;-1)∪(3;4]");
  ok("(-∞,-3] U {0} U [5,+∞)", "(-∞;-3]∪{0}∪[5;∞)");
  bad("[-5,-1]∪(3,4]", "[-5,-1)∪(3,4]");
});

test("accepts complements of finite sets", () => {
  ok("R\\{5,-1}", "ℝ\\{-1,5}");
});

test("accepts variable prefixes", () => {
  ok("m∈(-∞,-2]∪[3,+∞)", "(-∞;-2]∪[3;∞)");
  ok("k={-64}", "{-64}");
});

test("accepts multipart answers", () => {
  ok("a) {-2,2}; b) x∈[-1,3]", "a) {2,-2}; b) [-1;3]");
  bad("a) {-2,2}; b) [-1,2]", "a) {-2,2}; b) [-1,3]");
});

test("choice comparison ignores case and spacing", () => {
  assert.equal(isAnswerCorrect("choice", " A. 2 ", "a. 2"), true);
});
