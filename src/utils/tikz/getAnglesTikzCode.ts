import { vec } from "../math/vetores";
import { ConfigState } from "../store/configStore";
import type { Action, State } from "../store/store";

export default function getAnglesTikzCode(store: State & Action, configs: ConfigState) {

  const {DEFAULT_STROKE_WIDTH, TIKZ_SCALE} = configs;

  let tikzCode = "";
  store.angles.forEach((angle) => {
    if (angle.visible) {
      const angleA = vec().copy(angle.a.coords);
      const angleB = vec().copy(angle.b.coords);
      const angleC = vec().copy(angle.c.coords);

      let vectorA = vec().copy(angleA).sub(angleB);
      let vectorB = vec().copy(angleC).sub(angleB);
      vectorA.setMag(angle.size);
      vectorB.setMag(angle.size);

      let startVector;
      let endVector;
      let startAngle;
      let endAngle;

      let angA = ((vectorA.heading() * 180) / Math.PI + 360) % 360;
      let angB = ((vectorB.heading() * 180) / Math.PI + 360) % 360;
      let angleDifference = angB - angA;
      let sweepFlag = 1;

      if (angleDifference >= 0) {
        startVector = vectorA;
        startAngle = angA;
        endVector = vectorB;
        endAngle = angB;
      } else {
        startVector = vectorB;
        startAngle = angB;
        endVector = vectorA;
        endAngle = angA;
      }

      if (Math.abs(angleDifference) > 180) {
        sweepFlag = 0;
        if(startAngle < endAngle) startAngle += 360;
      }

      if ((angle.valor * 180) / Math.PI === 90) {
        //right
        tikzCode += `\\draw [${angle.color}, opacity=${angle.opacity}] (${
          angleB.x + startVector.x
        }, ${angleB.y + startVector.y}) -- (${
          angleB.x + startVector.x + endVector.x
        }, ${angleB.y + startVector.y + endVector.y}) -- (${
          angleB.x + endVector.x
        }, ${angleB.y + endVector.y});\n`;

        let circleCenter = vec()
          .copy(angleB)
          .add(
            vec()
              .copy(startVector)
              .add(vec().copy(endVector))
              .mult(1 / 2),
          );
        let radius = angle.size / 12;

        tikzCode += `\\filldraw [${angle.color}, line width=${DEFAULT_STROKE_WIDTH*TIKZ_SCALE} , opacity=${angle.opacity}] (${circleCenter.x}, ${circleCenter.y}) circle (${radius});\n`;
      } else {
        //not right angle

        if (angle.dotstyle === 0) {
          // Stroke only
          tikzCode += `\\draw [${angle.color}, line width=${DEFAULT_STROKE_WIDTH*TIKZ_SCALE}, opacity=${angle.opacity}] (${angle.b.id}) ++(${startAngle}:${angle.size}) arc (${startAngle}:${endAngle}:${angle.size});\n`;
        } else if (angle.dotstyle === 1) {
          // Stroke and fill (as a 'circle sector')
          tikzCode += `\\filldraw [${angle.color}, line width=${DEFAULT_STROKE_WIDTH*TIKZ_SCALE}, opacity=${angle.opacity}] (${angle.b.id}) -- (${angle.b.id}) ++(${startAngle}:${angle.size}) arc (${startAngle}:${endAngle}:${angle.size}) -- (${angle.b.id});\n`;
        }

        //------MARKS PATH
        if (angle.marks.split("-")[1] !== "0") {
          if (angle.marks.includes("marks")) {
            const numMarks = parseInt(angle.marks.split("-")[1] as `${number}`);
            const markLen = angle.size / 2;
            const r = angle.size;
            const ang = angle.valor;
            const numDiv = numMarks + 1;
            for (let i = 0; i < numMarks; i++) {
              const rotateWise = sweepFlag === 0 ? -1 : 1;
              const toRotate = (rotateWise * ang * (i + 1)) / numDiv;

              const initialPoint = vec()
                .copy(startVector)
                .rotate(toRotate)
                .setMag(r - markLen / 2)
                .add(angleB);
              const finalPoint = vec()
                .copy(startVector)
                .setMag(r + markLen / 2)
                .rotate(toRotate)
                .add(angleB);
              tikzCode += `\\draw [${angle.color}, line width=${DEFAULT_STROKE_WIDTH*TIKZ_SCALE}, opacity=${angle.opacity}] (${initialPoint.x}, ${initialPoint.y}) -- (${finalPoint.x}, ${finalPoint.y});\n`;
            }
          } else if (angle.marks.includes("doubles")) {
            const numDoubles = parseInt(
              angle.marks.split("-")[1] as `${number}`,
            );
            const doubleDist = angle.size / 5;
            const r = angle.size;
            const ang = angle.valor;
            const rotateWise = sweepFlag === 0 ? -1 : 1;
            const toRotate = rotateWise * ang;
            for (let i = 0; i < numDoubles; i++) {
              const thisRad = r - doubleDist * (i + 1);
              const initialPoint = vec()
                .copy(startVector)
                .setMag(thisRad)
                .add(angleB);
              const finalPoint = vec()
                .copy(startVector)
                .setMag(thisRad)
                .rotate(toRotate)
                .add(angleB);

              tikzCode += `\\draw [${angle.color}, line width=${DEFAULT_STROKE_WIDTH*TIKZ_SCALE}, opacity=${angle.opacity}] (${initialPoint.x}, ${initialPoint.y}) arc (${startAngle}:${endAngle}:${thisRad});\n`;
            }
          }
        }
      }
    }
  });
  return tikzCode;
}
