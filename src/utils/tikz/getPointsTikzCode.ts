import type { Action, State } from "../store/store";

export default function getPointsTikzCode(store: State & Action) {
  let tikzCode = "";
  store.points.forEach((point) => {
    const radius = point.size / 10;
    const { x, y } = point.coords;

    if (point.visible) {
      switch (point.dotstyle) {
        case 1:
          tikzCode += `\\draw [${point.color}] (${point.id}) circle (${radius});\n`;
          break;
        case 2:
          tikzCode += `\\filldraw [${point.color}] (${point.id}) circle (${radius});\n`;
          break;
      }
    }
  });
  return tikzCode;
}
