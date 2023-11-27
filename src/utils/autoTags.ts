import { Tentity, Tsegment, type Tpoint, Tangle } from "public/entidades";
import { roundAndDisplayNicely, roundToDecimalPlaces } from "./misc";

const LATIN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GREEK_ALPHABET = "𝜶𝜷𝜸𝜹𝜺𝜻𝜼𝜽𝜾𝜿𝝀𝝁𝝂𝝃𝝄𝝅𝝆𝝇𝝈𝝉𝝊𝝋𝝌𝝍𝝎";

function alphabeticalTag(i: number, alphabet: string): string {
  const len = alphabet.length;

  return (
    (i >= len ? alphabeticalTag(Math.floor(i / len) - 1, alphabet) : "") +
    alphabet[i % len]
  );
}

export const alphabeticalLatinTags = (i: number, entity: Tentity) =>
  alphabeticalTag(i, LATIN_ALPHABET);
export const alphabeticalSmallLatinTags = (i: number, entity: Tentity) =>
  alphabeticalTag(i, LATIN_ALPHABET.toLowerCase());
export const alphabeticalGreekTags = (i: number, entity: Tentity) =>
  alphabeticalTag(i, GREEK_ALPHABET);
export const numericalTags = (i: number, entity: Tentity) => {
  return `P${i}`;
};
export const coordTags = (i: number, entity: Tpoint) =>
  `(${entity.coords.x};${entity.coords.y})`;
export const lengthTags = (i: number, entity: Tsegment) =>
  `${roundAndDisplayNicely(entity.comprimento)}`;
export const arcTags = (i: number, entity: Tangle) =>
  `${roundAndDisplayNicely(entity.valor)}`;
