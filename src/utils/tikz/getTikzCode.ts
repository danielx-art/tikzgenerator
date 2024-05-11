import configStore from "../store/configStore";
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

  const {TIKZ_SCALE} = configStore.getState();

  let tikzCode = `\\begin{tikzpicture}[scale=${TIKZ_SCALE}]\n`;

  tikzCode += getCoordinatesTikzCode(store);
  tikzCode += getPolygonsTikzCode(store);
  tikzCode += getCirclesTikzCode(store);
  tikzCode += getAnglesTikzCode(store);
  tikzCode += getSegmentsTikzCode(store);
  tikzCode += getPointsTikzCode(store);
  tikzCode += getTagsTikzCode(store);

  tikzCode += " \n % https://geosimples.vercel.app/, by https://github.com/danielx-art \n \\end{tikzpicture} ";
  return tikzCode;
}
