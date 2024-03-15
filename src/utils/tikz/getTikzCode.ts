import type { Action, State } from "../store/store";
import getAnglesTikzCode from "./getAnglesTikzCode";
import getCirclesTikzCode from "./getCirclesTikzCode";
import getPointsTikzCode from "./getPointsTikzCode";
import getPolygonsTikzCode from "./getPolygonsTikzCode";
import getSegmentsTikzCode from "./getSegmentsTikzCode";

export default function getTikzCode(store?: State & Action) {
  if (!store) return;

  let tikzCode = "\\begin{tikzpicture}\n";

  tikzCode += getPointsTikzCode(store);
  tikzCode += getSegmentsTikzCode(store);
  tikzCode += getAnglesTikzCode(store);
  tikzCode += getPolygonsTikzCode(store);
  tikzCode += getCirclesTikzCode(store);

  tikzCode += "\\end{tikzpicture}";
  return tikzCode;
}
