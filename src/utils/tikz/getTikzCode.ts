import type { Action, State } from "../store/store";
import getAnglesTikzCode from "./getAnglesTikzCode";
import getCirclesTikzCode from "./getCirclesTikzCode";
import getCoordinatesTikzCode from "./getCoordinatesTikzCode";
import getPointsTikzCode from "./getPointsTikzCode";
import getPolygonsTikzCode from "./getPolygonsTikzCode";
import getSegmentsTikzCode from "./getSegmentsTikzCode";
import getTagsTikzCode from "./getTagsTikzCode";

export default function getTikzCode(store?: State & Action) {
  if (!store) return;

  let tikzCode = `\\begin{tikzpicture}[scale=${store.configs.TIKZ_SCALE}]\n`;

  tikzCode += getCoordinatesTikzCode(store);
  tikzCode += getPolygonsTikzCode(store);
  tikzCode += getCirclesTikzCode(store);
  tikzCode += getSegmentsTikzCode(store);
  tikzCode += getAnglesTikzCode(store);
  tikzCode += getPointsTikzCode(store);
  tikzCode += getTagsTikzCode(store);

  tikzCode += "\\end{tikzpicture}";
  return tikzCode;
}
