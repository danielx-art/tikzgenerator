import getHachureLines from "../math/getHachureLines";
import configStore from "../store/configStore";
import type { Action, State } from "../store/store";

export default function getPolygonsTikzCode(store: State & Action) {
  let tikzCode = "";
  const {TIKZ_SCALE} = configStore.getState();
  store.polygons.forEach((polygon) => {
    if (polygon.visible) {
      let vertexPath = polygon.vertices
        .map((vertex) => `(${vertex})`)
        .join(" -- ");

      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      polygon.vertices.forEach((vertex) => {

        const vertexPoint = store.points.get(vertex);

        if(!vertexPoint) return;

        if (vertexPoint.coords.x < minX) minX = vertexPoint.coords.x;
        if (vertexPoint.coords.x > maxX) maxX = vertexPoint.coords.x;
        if (vertexPoint.coords.y < minY) minY = vertexPoint.coords.y;
        if (vertexPoint.coords.y > maxY) maxY = vertexPoint.coords.y;
      });

      tikzCode += `\\begin{scope}\n`;
      tikzCode += `\\clip ${vertexPath} -- cycle;\n`; // Clip to the polygon shape

      if (polygon.fill.style === "solid") {
        tikzCode += `\\fill [fill=${polygon.fill.color}, fill opacity=${polygon.fill.opacity}] ${vertexPath};\n`;
      } else if (polygon.fill.style === "dotted") {
        // Manually create dotted fill within clipped area

        const step = TIKZ_SCALE < 0.5 ? 0.2*TIKZ_SCALE : 0.02*TIKZ_SCALE;
      
        tikzCode += `\\foreach \\x in {${minX},${minX + step},...,${maxX}}{\n`;
        tikzCode += `    \\foreach \\y in {${minY},${minY + step},...,${maxY}}{\n`;
        tikzCode += `        \\fill [${polygon.fill.color}, opacity=${polygon.fill.opacity}] (\\x,\\y) circle (${5*step}pt);\n`;
        tikzCode += `    }\n`;
        tikzCode += `}\n`;
      } else if (polygon.fill.style.startsWith("hachure")) {
        // Extract angle from the fill style and create hatching within clipped area
        const angleOption = polygon.fill.style.split("-")[1];
        if (!angleOption) return "";
        const angle = parseInt(angleOption)*45;
        const HACHURE_DIST = TIKZ_SCALE < 1 ? 0.1 : 0.02*TIKZ_SCALE;

        const pattern = getHachureLines(minX,maxX, minY, maxY, HACHURE_DIST, angle);
        pattern.points.forEach((point)=>{
          tikzCode += `\\draw [thin, ${polygon.fill.color}, opacity=${polygon.fill.opacity}] (${point.x1},${point.y1}) -- (${point.x2},${point.y2});\n`;
        });
      }

      tikzCode += `\\end{scope}\n`;
      // Draw the polygon outline for reference
      tikzCode += `\\draw [${polygon.fill.color}, opacity=${polygon.fill.opacity}] ${vertexPath} -- cycle;\n`;
    }
  });
  return tikzCode;
}
