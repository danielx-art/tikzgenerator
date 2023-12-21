import { Tsegment, Tangle, Tpoint } from "public/entidades";
import { vec } from "import/utils/math/vetores";

export const getSegmentPath = (segment: Tsegment) => {
  return `M${segment.p1.coords.x},${segment.p1.coords.y} L${segment.p2.coords.x},${segment.p2.coords.y}`;
};

export const getAnglePath = (angle: Tangle) => {
  let vectorA = vec().copy(angle.a.coords).sub(angle.b.coords);
  let vectorB = vec().copy(angle.c.coords).sub(angle.b.coords);
  vectorA.setMag(angle.size);
  vectorB.setMag(angle.size);

  let startVector;
  let endVector;
  let startAngle;
  let endAngle;

  let angA = ((vectorA.heading() * 180) / Math.PI + 360) % 360; //in degrees and first positive arc
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
  }

  let start = vec().copy(startVector).add(angle.b.coords);
  let end = vec().copy(endVector).add(angle.b.coords);

  if (Math.abs(endAngle - startAngle) == 90) {
    let d = `M ${angle.b.coords.x + startVector.x} ${
      angle.b.coords.y + startVector.y
    } `;
    d += `l ${endVector.x} ${endVector.y} `;
    d += `l ${-startVector.x} ${-startVector.y} `;

    let circleCenter = vec()
      .copy(angle.b.coords)
      .add(
        vec()
          .copy(startVector)
          .add(vec().copy(endVector))
          .mult(1 / 2),
      );
    let radius = angle.size / 10;
    d += `M ${circleCenter.x + radius} ${circleCenter.y} `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x - radius} ${
      circleCenter.y
    } `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x + radius} ${
      circleCenter.y
    } `;

    return d;
  } else {
    let d = ` M ${angle.b.coords.x} ${angle.b.coords.y} L ${start.x} ${start.y} A ${angle.size} ${angle.size} 0 0 ${sweepFlag} ${end.x} ${end.y} Z `;

    const angleMark = angle.marks

    if(angle.marks.split("-")[1] !== "0") {
      if(angle.marks.includes("marks")){
        let dMarks = ``;
        const numMarks = parseInt(angle.marks.split("-")[1] as `${number}`);
        const markLen = angle.size/2;
        const r = angle.size;
        const ang = angle.valor;
        const numDiv = numMarks + 1;
        for (let i = 0; i < numMarks; i++) {
          const initialPoint = vec()
            .copy(startVector)
            .setMag(r - markLen / 2)
            .rotate((ang * (i + 1)) / numDiv).add(angle.b.coords);
          const finalPoint = vec()
            .copy(startVector)
            .setMag(r + markLen / 2)
            .rotate((ang * (i + 1)) / numDiv).add(angle.b.coords);
          dMarks += ` M ${initialPoint.x} ${initialPoint.y} L ${finalPoint.x} ${finalPoint.y} `;
        }
        d += dMarks;
      } else if (angle.marks.includes("doubles")) {
        let dDoubles = ``;
        const numDoubles = parseInt(angle.marks.split("-")[1] as `${number}`);
        const doubleDist = angle.size/5;
        const r = angle.size;
        const ang = angle.valor;
        for (let i = 0; i < numDoubles; i++) {
          const thisRad = r - doubleDist * (i + 1);
          const initialPoint = vec().copy(startVector).setMag(thisRad).add(angle.b.coords);
          const finalPoint = vec().copy(startVector).setMag(thisRad).rotate(ang).add(angle.b.coords);
          dDoubles += ` M ${initialPoint.x} ${initialPoint.y} A ${r} ${r} 0 0 1 ${finalPoint.x} ${finalPoint.y}  `;
        }
        d += dDoubles;
      }
    }

    return d;
  }
};

export const getPointPath = (point: Tpoint) => {
  const { coords, dotstyle, size } = point;

  if (dotstyle === 0) {
    return "";
  }

  // Calculate the circle path
  const circlePath =
    `M ${coords.x} ${coords.y} ` +
    `m -${size * 0.1}, 0 ` +
    `a ${size * 0.1},${size * 0.1} 0 1,0 ${size * 0.1 * 2},0 ` +
    `a ${size * 0.1},${size * 0.1} 0 1,0 -${size * 0.1 * 2},0`;

  return circlePath;
};
