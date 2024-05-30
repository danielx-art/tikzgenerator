import getHachureLines from "../math/getHachureLines";
import configStore from "../store/configStore";
import type { Action, State } from "../store/store";

export default function getCirclesTikzCode(store: State & Action) {
  let tikzCode = "";

  const {TIKZ_SCALE} = configStore.getState();

  store.circles.forEach((circle) => {
    if (circle.visible) {

      const strokeStyle = circle.stroke.style.includes('dashed') ? "dashed" : circle.stroke.style;

      let strokeSettings = `line width=${circle.stroke.width}pt, ${strokeStyle}, draw=${circle.stroke.color}, draw opacity=${circle.stroke.opacity}`;

      // Start defining the TikZ code for this circle
      let circleCommands = "";

      // Fill settings depend on the style
      if (circle.fill.style === "solid") {
        circleCommands += `\\fill [fill=${circle.fill.color}, fill opacity=${circle.fill.opacity}] (${circle.center.x}, ${circle.center.y}) circle (${circle.radius});\n`;
      } else {
        // Clipping for the special fill pattern (used for both dotted and hachure)
        circleCommands += `\\begin{scope}\n\\clip (${circle.center.x}, ${circle.center.y}) circle (${circle.radius});\n`;

        // Dotted or hachure pattern, similar logic as with polygons but now within a circle
        if (circle.fill.style === "dotted") {

          const step = TIKZ_SCALE < 0.5 ? 0.2*TIKZ_SCALE : 0.02*TIKZ_SCALE;

          circleCommands += `\\foreach \\x in {${
            circle.center.x - circle.radius
          },${circle.center.x - circle.radius + step},...,${
            circle.center.x + circle.radius
          }}{\n`;
          circleCommands += `\\foreach \\y in {${
            circle.center.y - circle.radius
          },${circle.center.y - circle.radius + step},...,${
            circle.center.y + circle.radius
          }}{\n`;
          circleCommands += `\\fill [fill=${circle.fill.color}, fill opacity=${circle.fill.opacity}] (\\x,\\y) circle (${5*step});\n`;
          circleCommands += `}\n}\n`;
        } else if (circle.fill.style.startsWith("hachure")) {
          // Extract angle from the fill style
          const angleOption = circle.fill.style.split("-")[1];
          if (!angleOption) return "";
          const angle = parseInt(angleOption)*45;
          const minX = circle.center.x - circle.radius;
          const maxX = circle.center.x + circle.radius;
          const minY = circle.center.y - circle.radius;
          const maxY = circle.center.y + circle.radius;
          const HACHURE_DIST = TIKZ_SCALE < 1 ? 0.1 : 0.02*TIKZ_SCALE;
          const pattern = getHachureLines(minX,maxX, minY, maxY, HACHURE_DIST, angle);
          pattern.points.forEach((point)=>{
            circleCommands += `\\draw [thin, ${circle.fill.color}, opacity=${circle.fill.opacity}] (${point.x1},${point.y1}) -- (${point.x2},${point.y2});\n`;
          });
        }

        circleCommands += `\\end{scope}\n`;
      }

      // Draw the circle outline (stroke)

      const circleCenter = `(${circle.center.x}, ${circle.center.y})`;
      const arcAngleSize = circle.arcEnd - circle.arcStart;
      const startAngle = circle.arcStart+circle.arcOffset;
      const endAngle = circle.arcEnd+circle.arcOffset;

      if(arcAngleSize == 0) {
        circleCommands += `\\draw [${strokeSettings}] ${circleCenter} circle (${circle.radius});\n`;
      } else {

        if(circle.showRadius) {
          circleCommands += `\\draw [${strokeSettings}] ${circleCenter} -- ${circleCenter} ++(${startAngle}:${circle.radius}) arc (${startAngle}:${endAngle}:${circle.radius}) -- ${circleCenter};\n`
        } else {
          circleCommands += `\\draw [${strokeSettings}] ${circleCenter} -- ${circleCenter} ++(${startAngle}:${circle.radius}) arc (${startAngle}:${endAngle}:${circle.radius}) -- ${circleCenter};\n`
          circleCommands += `\\draw [${strokeSettings}] ${circleCenter} -- ${circleCenter} ++(${startAngle}:${circle.radius}) arc (${startAngle}:${endAngle}:${circle.radius}) -- ${circleCenter};\n`
        }
      }


      // Append the generated commands for this circle to the main TikZ code
      tikzCode += circleCommands;
    }
  });
  return tikzCode;
}
