export type AnswerQuestionType = "input" | "choice";

export function answerToStorage(answer: number | string) {
  return typeof answer === "number" ? String(answer) : answer;
}

export function parseNumericAnswer(raw: string) {
  const normalized = raw
    .trim()
    .replace(/[−–—]/g, "-")
    .replace(/\s/g, "")
    .replace(/,/g, ".");
  if (!normalized) return Number.NaN;
  if (normalized.includes("/")) {
    const parts = normalized.split("/");
    if (parts.length !== 2) return Number.NaN;
    const numerator = Number(parts[0]);
    const denominator = Number(parts[1]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return Number.NaN;
    }
    return numerator / denominator;
  }
  const value = Number(normalized);
  return Number.isFinite(value) ? value : Number.NaN;
}

function normalizeCommon(raw: string) {
  return raw
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[⟨〈]/g, "[")
    .replace(/[⟩〉]/g, "]")
    .replace(/\\cup/g, "∪")
    .replace(/\b(?:union|lub)\b/g, "∪")
    .replace(/\binfinity\b|\binf\b/g, "∞")
    .replace(/\b(?:mathbb\{r\}|realne|rzeczywiste)\b/g, "r")
    .replace(/ℝ/g, "r")
    .replace(/\s+/g, "");
}

function canonicalAtom(raw: string) {
  const numeric = parseNumericAnswer(raw);
  if (Number.isFinite(numeric)) return `#${numeric}`;
  return normalizeCommon(raw)
    .replace(/\+∞/g, "∞")
    .replace(/^\+/, "");
}

function parseMultipart(raw: string) {
  const normalized = raw.replace(/\r/g, "\n");
  const regex = /(?:^|[;\n])\s*([a-z])\)\s*/gi;
  const markers = [...normalized.matchAll(regex)];
  if (!markers.length) return null;

  const result = new Map<string, string>();
  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    const label = marker[1].toLowerCase();
    const start = (marker.index ?? 0) + marker[0].length;
    const end = i + 1 < markers.length ? (markers[i + 1].index ?? normalized.length) : normalized.length;
    result.set(label, normalized.slice(start, end).trim().replace(/[;\n]+$/, ""));
  }
  return result;
}

function parseFiniteSet(raw: string) {
  const normalized = normalizeCommon(raw)
    .replace(/^[a-z]\d*∈/, "")
    .replace(/^x∈/, "");
  if (normalized === "∅" || normalized === "pusty") return ["∅"];
  if (normalized === "r") return ["r"];
  const match = normalized.match(/^\{(.*)\}$/);
  if (!match) return null;
  if (!match[1]) return [];
  return match[1]
    .split(/[;,]/)
    .map(canonicalAtom)
    .sort();
}

function parseIntervalUnion(raw: string) {
  let normalized = normalizeCommon(raw)
    .replace(/^x∈/, "")
    .replace(/^x=/, "")
    .replace(/\+∞/g, "∞");

  if (!/[\[\(].*[\]\)]/.test(normalized)) return null;
  const pieces = normalized.split("∪").filter(Boolean);
  const intervals: string[] = [];
  for (const piece of pieces) {
    const match = piece.match(/^([\[(])(.+?)[;,]([^;,]+)([\])])$/);
    if (!match) return null;
    const [, leftBracket, left, right, rightBracket] = match;
    intervals.push(`${leftBracket}${canonicalAtom(left)};${canonicalAtom(right)}${rightBracket}`);
  }
  return intervals.sort();
}

function compareStructured(submitted: string, correct: string): boolean {
  const submittedParts = parseMultipart(submitted);
  const correctParts = parseMultipart(correct);
  if (submittedParts || correctParts) {
    if (!submittedParts || !correctParts || submittedParts.size !== correctParts.size) return false;
    for (const [label, expected] of correctParts) {
      const actual = submittedParts.get(label);
      if (actual == null || !compareStructured(actual, expected)) return false;
    }
    return true;
  }

  const actualNumeric = parseNumericAnswer(submitted);
  const expectedNumeric = parseNumericAnswer(correct);
  if (Number.isFinite(actualNumeric) || Number.isFinite(expectedNumeric)) {
    return Number.isFinite(actualNumeric) && Number.isFinite(expectedNumeric)
      && Math.abs(actualNumeric - expectedNumeric) < 1e-6;
  }

  const actualIntervals = parseIntervalUnion(submitted);
  const expectedIntervals = parseIntervalUnion(correct);
  if (actualIntervals || expectedIntervals) {
    return Boolean(actualIntervals && expectedIntervals)
      && actualIntervals!.length === expectedIntervals!.length
      && actualIntervals!.every((value, index) => value === expectedIntervals![index]);
  }

  const actualSet = parseFiniteSet(submitted);
  const expectedSet = parseFiniteSet(correct);
  if (actualSet || expectedSet) {
    return Boolean(actualSet && expectedSet)
      && actualSet!.length === expectedSet!.length
      && actualSet!.every((value, index) => value === expectedSet![index]);
  }

  return normalizeCommon(submitted) === normalizeCommon(correct);
}

export function isAnswerCorrect(type: AnswerQuestionType, submitted: string, correct: string) {
  if (type === "choice") return normalizeCommon(submitted) === normalizeCommon(correct);
  return compareStructured(submitted, correct);
}

export function isAutoCheckableAnswer(answer: string) {
  const value = answer.trim();
  if (!value) return false;
  if (Number.isFinite(parseNumericAnswer(value))) return true;

  const parts = parseMultipart(value);
  if (parts) return [...parts.values()].every(isAutoCheckableAnswer);

  if (parseIntervalUnion(value) || parseFiniteSet(value)) return true;

  // Krótkie odpowiedzi symboliczne (np. „a=2”, „x=−3”) można porównać
  // po normalizacji. Długie opisy i dowody pozostają poza autooceną.
  return value.length <= 48 && !/[.!?]\s/.test(value);
}
