const LATIN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GREEK_ALPHABET = "𝜶𝜷𝜸𝜹𝜺𝜻𝜼𝜽𝜾𝜿𝝀𝝁𝝂𝝃𝝄𝝅𝝆𝝇𝝈𝝉𝝊𝝋𝝌𝝍𝝎";

export const alphabeticalLatinTags = (i: number) => alphabeticalTag(i, LATIN_ALPHABET);
export const alphabeticalSmallLatinTags = (i: number) => alphabeticalTag(i, LATIN_ALPHABET.toLowerCase());
export const alphabeticalGreekTags = (i: number) => alphabeticalTag(i, GREEK_ALPHABET);
export const numericalTags = (i: number) => {
  return `P${i}`;
}


function alphabeticalTag(i: number, alphabet: string): string {
  const len = alphabet.length;

  return (
    (i >= len ? alphabeticalTag(Math.floor(i / len) - 1, alphabet) : "") +
    alphabet[i % len]
  );
}


