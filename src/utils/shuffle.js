// Cryptographically/unbiased Fisher-Yates shuffle helpers & Hogwarts grading scale

export function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles an array and avoids repeating the same first item as lastFirstKey (when length > 1).
 */
export function shuffleFresh(items, getKey = (x) => x, lastFirstKey = null) {
  const shuffled = shuffleArray(items);
  if (shuffled.length > 1 && lastFirstKey !== null && getKey(shuffled[0]) === lastFirstKey) {
    const swapIdx = 1 + Math.floor(Math.random() * (shuffled.length - 1));
    [shuffled[0], shuffled[swapIdx]] = [shuffled[swapIdx], shuffled[0]];
  }
  return shuffled;
}

/**
 * Prepares quiz questions with BOTH question order AND option order freshly shuffled.
 */
export function prepareShuffledQuestions(pool, lastFirstQuestion = null) {
  return shuffleFresh(pool, (q) => q.question, lastFirstQuestion).map((q) => ({
    ...q,
    options: shuffleArray(q.options.map((o) => (typeof o === "string" ? o.trim() : o))),
    answer: typeof q.answer === "string" ? q.answer.trim() : q.answer,
  }));
}

/**
 * Normalizes text for accent-insensitive & punctuation-insensitive Perfil guess matching.
 */
export function normalizeGuess(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['"`´.,\-–—!?()[\]:;/]/g, " ")
    .replace(/\b(o|a|os|as|do|da|dos|das|de|the|professor|prof|professora|sr|sra|lord|lorde|sir)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesPerfilAnswer(guess, card) {
  const cleanGuess = normalizeGuess(guess);
  if (!cleanGuess || cleanGuess.length < 2) return false;

  const candidates = [card.name, ...(card.aliases || [])]
    .map((c) => normalizeGuess(c))
    .filter(Boolean);

  for (const cand of candidates) {
    if (cleanGuess === cand) return true;
    // Allow matching full surname or distinctive multi-char token when exact
    if (cand.length >= 5 && cleanGuess.includes(cand)) return true;
    if (cleanGuess.length >= 5 && cand.includes(cleanGuess) && cleanGuess.length >= cand.length * 0.72) {
      return true;
    }
  }
  return false;
}

/**
 * Official Hogwarts Exam Grading Scale (N.O.M.s / N.I.E.M.s)
 */
export function getHogwartsGrade(score, total) {
  const ratio = total > 0 ? score / total : 0;
  if (ratio >= 0.95) {
    return { code: "Ó", label: "Ótimo", passed: true, tone: "gold" };
  }
  if (ratio >= 0.8) {
    return { code: "E", label: "Excede Expectativas", passed: true, tone: "emerald" };
  }
  if (ratio >= 0.65) {
    return { code: "A", label: "Aceitável", passed: true, tone: "amber" };
  }
  if (ratio >= 0.45) {
    return { code: "P", label: "Péssimo", passed: false, tone: "copper" };
  }
  if (ratio >= 0.25) {
    return { code: "D", label: "Deplorável", passed: false, tone: "crimson" };
  }
  return { code: "T", label: "Trasgo", passed: false, tone: "crimson" };
}
