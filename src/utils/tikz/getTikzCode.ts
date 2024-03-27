import { ConfigState } from "../store/configStore";
import type { Action, State } from "../store/store";
import getAnglesTikzCode from "./getAnglesTikzCode";
import getCirclesTikzCode from "./getCirclesTikzCode";
import getCoordinatesTikzCode from "./getCoordinatesTikzCode";
import getPointsTikzCode from "./getPointsTikzCode";
import getPolygonsTikzCode from "./getPolygonsTikzCode";
import getSegmentsTikzCode from "./getSegmentsTikzCode";
import getTagsTikzCode from "./getTagsTikzCode";

export default function getTikzCode(store?: State & Action, configs?: ConfigState) {
  if (!store || !configs) return;

  let tikzCode = `\\begin{tikzpicture}[scale=${configs.TIKZ_SCALE}]\n`;

  tikzCode += getCoordinatesTikzCode(store);
  tikzCode += getPolygonsTikzCode(store, configs);
  tikzCode += getCirclesTikzCode(store, configs);
  tikzCode += getSegmentsTikzCode(store, configs);
  tikzCode += getAnglesTikzCode(store, configs);
  tikzCode += getPointsTikzCode(store);
  tikzCode += getTagsTikzCode(store);

  tikzCode += "\\end{tikzpicture}";
  return tikzCode;
}
