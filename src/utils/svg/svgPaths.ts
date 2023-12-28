import { Tsegment, Tangle, Tpoint } from "public/entidades";
import { vec } from "import/utils/math/vetores";
import { RES_FACTOR } from "public/generalConfigs";

export const getSegmentPath = (segment: Tsegment) => {

  let d = `
  M${segment.p1.coords.x*RES_FACTOR},${segment.p1.coords.y*RES_FACTOR} 
  L${segment.p2.coords.x*RES_FACTOR},${segment.p2.coords.y*RES_FACTOR} 
  `

  if(segment.marks > 0) {
    const markLength = 0.12*segment.width;
    const markSep = 1.2*segment.width;
    const midPoint = vec().copy(segment.p1.coords).add(vec().copy(segment.p2.coords)).mult(RES_FACTOR/2);
    const normal = vec().copy(segment.p2.coords).sub(vec().copy(segment.p1.coords)).cross(vec(0, 0, 1)).setMag(markLength*RES_FACTOR);
    const unitTangent = vec().copy(segment.p2.coords).sub(vec().copy(segment.p1.coords)).setMag(1);
    const start = vec().copy(midPoint).add(vec().copy(unitTangent).mult(-(segment.marks-1)*markSep/2));
    for(let i=0; i<segment.marks; i++) {
      const thisMidPoint = vec().copy(start).add(vec().copy(unitTangent).mult(i*markSep))
      const point1 = vec().copy(thisMidPoint).add(vec().copy(normal));
      const point2 = vec().copy(thisMidPoint).add(vec().copy(normal).mult(-1));
      d+=` M${point1.x},${point1.y} L${point2.x},${point2.y} `
    }    
  }


  return d;
};

export const getAnglePath = (angle: Tangle) => {
  const angleA = vec().copy(angle.a.coords).mult(RES_FACTOR);
  const angleB = vec().copy(angle.b.coords).mult(RES_FACTOR);
  const angleC = vec().copy(angle.c.coords).mult(RES_FACTOR);

  let vectorA = vec().copy(angleA).sub(angleB);
  let vectorB = vec().copy(angleC).sub(angleB);
  vectorA.setMag(angle.size*RES_FACTOR);
  vectorB.setMag(angle.size*RES_FACTOR);

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

  let start = vec().copy(startVector).add(angleB);
  let end = vec().copy(endVector).add(angleB);

  if (Math.abs(endAngle - startAngle) == 90) {
    let d = `M ${angleB.x + startVector.x} ${
      angleB.y + startVector.y
    } `;
    d += `l ${endVector.x} ${endVector.y} `;
    d += `l ${-startVector.x} ${-startVector.y} `;

    let circleCenter = vec()
      .copy(angleB)
      .add(
        vec()
          .copy(startVector)
          .add(vec().copy(endVector))
          .mult(1 / 2),
      );
    let radius = angle.size * RES_FACTOR / 12;
    d += `M ${circleCenter.x + radius} ${circleCenter.y} `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x - radius} ${
      circleCenter.y
    } `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x + radius} ${
      circleCenter.y
    } `;

    return d;
  } else {
    let d = ` M ${angleB.x} ${angleB.y} L ${start.x} ${start.y} A ${angle.size*RES_FACTOR} ${angle.size*RES_FACTOR} 0 0 ${sweepFlag} ${end.x} ${end.y} Z `;

    const angleMark = angle.marks;

    if (angle.marks.split("-")[1] !== "0") {
      if (angle.marks.includes("marks")) {
        let dMarks = ``;
        const numMarks = parseInt(angle.marks.split("-")[1] as `${number}`);
        const markLen = angle.size * RES_FACTOR / 2;
        const r = angle.size * RES_FACTOR;
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
          dMarks += ` M ${initialPoint.x} ${initialPoint.y} L ${finalPoint.x} ${finalPoint.y} `;
        }
        d += dMarks;
      } else if (angle.marks.includes("doubles")) {
        let dDoubles = ``;
        const numDoubles = parseInt(angle.marks.split("-")[1] as `${number}`);
        const doubleDist = angle.size * RES_FACTOR/ 5;
        const r = angle.size * RES_FACTOR;
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
          dDoubles += ` M ${initialPoint.x} ${initialPoint.y} A ${thisRad} ${thisRad} 0 0 ${sweepFlag} ${finalPoint.x} ${finalPoint.y}  `;
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
    `M ${coords.x*RES_FACTOR} ${coords.y*RES_FACTOR} ` +
    `m -${size * 0.1*RES_FACTOR}, 0 ` +
    `a ${size * 0.1*RES_FACTOR},${size * 0.1*RES_FACTOR} 0 1,0 ${size * 0.1 * 2*RES_FACTOR},0 ` +
    `a ${size * 0.1*RES_FACTOR},${size * 0.1*RES_FACTOR} 0 1,0 -${size * 0.1 * 2*RES_FACTOR},0`;

  return circlePath;
};
