import type { Action, State } from "../store/store";

export default function getPolygonsTikzCode(store: State & Action) {
  let tikzCode = "";
  store.polygons.forEach((polygon) => {
    if (polygon.visible) {
      let vertexPath = polygon.vertices
        .map((vertex) => `(${vertex.id})`)
        .join(" -- ");

      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      polygon.vertices.forEach((vertex) => {
        if (vertex.coords.x < minX) minX = vertex.coords.x;
        if (vertex.coords.x > maxX) maxX = vertex.coords.x;
        if (vertex.coords.y < minY) minY = vertex.coords.y;
        if (vertex.coords.y > maxY) maxY = vertex.coords.y;
      });

      tikzCode += `\\begin{scope}\n`;
      tikzCode += `\\clip ${vertexPath} -- cycle;\n`; // Clip to the polygon shape

      if (polygon.fill.style === "solid") {
        tikzCode += `\\fill [fill=${polygon.fill.color}, fill opacity=${polygon.fill.opacity}] ${vertexPath};\n`;
      } else if (polygon.fill.style === "dotted") {
        // Manually create dotted fill within clipped area
        tikzCode += `\\foreach \\x in {${minX},${minX + 0.2},...,${maxX}}{\n`;
        tikzCode += `    \\foreach \\y in {${minY},${
          minY + 0.2
        },...,${maxY}}{\n`;
        tikzCode += `        \\fill [${polygon.fill.color}, opacity=${polygon.fill.opacity}] (\\x,\\y) circle (0.5pt);\n`;
        tikzCode += `    }\n`;
        tikzCode += `}\n`;
      } else if (polygon.fill.style.startsWith("hachure")) {
        // Extract angle from the fill style and create hatching within clipped area
        const angleOption = polygon.fill.style.split("-")[1];
        if (!angleOption) return "";
        const angleRadians = (parseFloat(angleOption) * Math.PI) / 180;
        const polygonLenX = maxX - minX;
        const polygonLenY = maxY - minY;
        tikzCode += `\\foreach \\x in {${minX},${minX + 0.2},...,${maxX}}{\n`;
        tikzCode += `    \\draw [${polygon.fill.color}, opacity=${
          polygon.fill.opacity
        }, thin] (\\x,${minY}) -- (\\x+${polygonLenX},${
          minY + polygonLenX * Math.tan(angleRadians)
        });`;
        tikzCode += `}\n`;
        tikzCode += `\\foreach \\y in {${minY},${minY + 0.2},...,${maxY}}{\n`;
        tikzCode += `    \\draw [${polygon.fill.color}, opacity=${
          polygon.fill.opacity
        }, thin] (${minX}, \\y) -- (${maxX}, \\y+${
          polygonLenX * Math.tan(angleRadians)
        });`;
        tikzCode += `}\n`;
      }

      tikzCode += `\\end{scope}\n`;
      // Draw the polygon outline for reference
      tikzCode += `\\draw [${polygon.fill.color}, opacity=${polygon.fill.opacity}] ${vertexPath} -- cycle;\n`;
    }
  });
}