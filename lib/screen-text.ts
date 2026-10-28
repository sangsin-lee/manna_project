const sentences = new Intl.Segmenter("ko", { granularity: "sentence" });

// Only oversized sentences need word-level breaks. Distribute their text over
// similarly sized screens instead of leaving the final word on its own.
function splitLongSentence(text: string, limit: number): string[] {
  const parts: string[] = [];
  let rest = text;
  while (rest.length > limit) {
    const target = Math.ceil(rest.length / Math.ceil(rest.length / limit));
    const boundaries = Array.from(rest.slice(0, limit + 1).matchAll(/\s+/g), (match) => match.index)
      .filter((index) => index >= target / 2 && index <= limit);
    let cut = boundaries.length
      ? boundaries.reduce((best, index) => Math.abs(index - target) < Math.abs(best - target) ? index : best)
      : target;
    // Preserve surrogate pairs when a long unspaced token must be divided.
    if (/[\uD800-\uDBFF]/.test(rest[cut - 1])) cut--;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

// Shared by filming pages and editable video scenes. Prefer complete sentences
// without discarding safety text, punctuation, decimal temperatures or names.
export function splitScreenText(text: string, limit = 145): string[] {
  if (!Number.isInteger(limit) || limit < 2) throw new RangeError("Screen text limit must be an integer of at least 2");
  const value = text.trim();
  if (!value) return [];
  if (value.length <= limit) return [value];

  const parts: string[] = [];
  let current = "";
  for (const { segment } of sentences.segment(value)) {
    const sentence = segment.trim();
    if (!sentence) continue;
    if (sentence.length > limit) {
      if (current) parts.push(current);
      current = "";
      parts.push(...splitLongSentence(sentence, limit));
    } else if (current && `${current} ${sentence}`.length > limit) {
      parts.push(current);
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) parts.push(current);
  return parts;
}
