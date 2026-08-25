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
    .replace(/\s+u\s+/g, "∪")
    .replace(/\b(?:infinity|inf|oo)\b/g, "∞")
    .replace(/\b(?:mathbb\{r\}|realne|rzeczywiste)\b/g, "r")
    .replace(/ℝ/g, "r")
    .replace(/\s+/g, "");
}

function stripVariablePrefix(raw: string) {
  return raw.replace(/^[a-z][a-z0-9_]*∈/, "").replace(/^[a-z][a-z0-9_]*=/, "");
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

function parseFiniteSetPiece(raw: string) {
  const match = raw.match(/^\{(.*)\}$/);
  if (!match) return null;
  if (!match[1]) return [];
  return match[1]
    .split(/[;,]/)
    .map(canonicalAtom)
    .sort();
}

function parseIntervalPiece(raw: string) {
  const match = raw.match(/^([\[(])(.+?)[;,]([^;,]+)([\])])$/);
  if (!match) return null;
  const [, leftBracket, left, right, rightBracket] = match;
  return `${leftBracket}${canonicalAtom(left)};${canonicalAtom(right)}${rightBracket}`;
}

function parseSetExpression(raw: string) {
  const normalized = stripVariablePrefix(normalizeCommon(raw)).replace(/\+∞/g, "∞");
  if (normalized === "∅" || normalized === "pusty") return ["∅"];
  if (normalized === "r") return ["r"];

  const complement = normalized.match(/^r\\\{(.*)\}$/);
  if (complement) {
    const items = complement[1]
      .split(/[;,]/)
      .filter(Boolean)
      .map(canonicalAtom)
      .sort();
    return [`r\\{${items.join(",")}}`];
  }

  const pieces = normalized.split("∪").filter(Boolean);
  if (!pieces.length) return null;

  const result: string[] = [];
  for (const piece of pieces) {
    const interval = parseIntervalPiece(piece);
    if (interval) {
      result.push(`i:${interval}`);
      continue;
    }
    const finite = parseFiniteSetPiece(piece);
    if (finite) {
      result.push(`s:{${finite.join(",")}}`);
      continue;
    }
    return null;
  }
  return result.sort();
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

  const actualSet = parseSetExpression(submitted);
  const expectedSet = parseSetExpression(correct);
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

  if (parseSetExpression(value)) return true;

  // Krótkie odpowiedzi symboliczne (np. „a=2”, „x=−3”) można porównać
  // po normalizacji. Długie opisy, wzory funkcji i dowody pozostają poza autooceną.
  return value.length <= 48 && !/[.!?]\s/.test(value);
}
