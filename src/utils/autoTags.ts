import { Tponto } from "public/entidades";
import useMyStore from "store";

const LATIN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GREEK_ALPHABET = "𝜶𝜷𝜸𝜹𝜺𝜻𝜼𝜽𝜾𝜿𝝀𝝁𝝂𝝃𝝄𝝅𝝆𝝇𝝈𝝉𝝊𝝋𝝌𝝍𝝎";

export const testFunction = () => console.log("test"); //debugg

export const applyLatinTags = () => {
  console.log("hi");
  applyTags(alphabeticalTag, LATIN_ALPHABET);
};
export const applySmallLatinTags = () =>
  applyTags(alphabeticalTag, LATIN_ALPHABET.toLowerCase());
export const applyGreekTags = () => applyTags(alphabeticalTag, GREEK_ALPHABET);
export const applyNumericalTags = () => applyTags(numericalTag, "P");

function alphabeticalTag(i: number, alphabet: string): string {
  const len = alphabet.length;

  return (
    (i >= len ? alphabeticalTag(Math.floor(i / len) - 1, alphabet) : "") +
    alphabet[i % len]
  );
}

function numericalTag(i: number, alphabet: string = "") {
  return `alphabet${i}`;
}

function applyTags(
  tagFunction: (i: number, alphabet: string) => string,
  alphabet: string,
) {
  const { points, setPoints, tags, setTags, error, setError } = useMyStore();

  let taggedPoints = [] as Tponto[];

  let foundError = false;

  for (let i = 0; i < points.length; i++) {
    let newTag = tagFunction(i, alphabet);
    foundError = tags.find((val) => val == newTag) != undefined ? true : false;
    if (foundError) {
      taggedPoints.push(points[i] as Tponto);
      continue;
    }
    let taggedPoint = points[i] as Tponto;
    taggedPoint.etiqueta = newTag;
    taggedPoints.push(taggedPoint);
  }

  setPoints(taggedPoints);

  if (foundError) {
    setError(
      error +
        "Alguma(s) etiqueta(s) que já estão em uso não foram aplicadas, para evitar duplicatas. Caso deseje, limpe todas as etiquetas, depois selecione todos os objetos que deseja etiquetar e etiquete-os novamente. ",
    );
  }
}
