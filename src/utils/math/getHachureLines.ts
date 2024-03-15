export default function getHachureLines(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  HACHURE_DIST: number,
  angleDegrees: number,
) {
  let angD = angleDegrees;
  angD = angD % 360;
  if (angD < 0) angD = angD + 360;
  if (angD > 180) angD = 180 - angD;
  let angR = (angD * Math.PI) / 180;
  const Lx = Math.abs(maxX - minX);
  const Ly = Math.abs(maxY - minY);

  let arr = [] as Array<{ x1: number; y1: number; x2: number; y2: number }>;

  if (angD == 0) {
    const dy = HACHURE_DIST / Ly;
    const number = Math.floor(Ly / dy) + 1;
    for (let i = 0; i < number; i++) {
      const x1 = minX;
      const y1 = minY + i * dy;
      const x2 = maxX;
      const y2 = y1;
      arr.push({ x1, x2, y1, y2 });
    }
  } else if (angD > 0 && angD <= 45) {
    const dy = HACHURE_DIST / Math.cos(angR);
    const b = Lx * Math.tan(angR);
    const number = Math.floor((Ly + b) / dy) + 1;
    for (let i = 0; i < number; i++) {
      const x1 = minX;
      const y1 = minY - b + i * dy;
      const x2 = maxX;
      const y2 = minY + i * dy;
      arr.push({ x1, x2, y1, y2 });
    }
  } else if (angD > 45 && angD < 90) {
    const dx = HACHURE_DIST / Math.sin(angR);
    const b = Ly / Math.tan(angR);
    const number = Math.floor((Lx + b) / dx) + 1;
    for (let i = 0; i < number; i++) {
      const x1 = minX - b + dx * i;
      const y1 = minY;
      const x2 = minX + dx * i;
      const y2 = maxY;
      arr.push({ x1, x2, y1, y2 });
    }
  } else if (angD == 90) {
    const dx = HACHURE_DIST / Lx;
    const number = Math.floor(Lx / dx) + 1;
    for (let i = 0; i < number; i++) {
      const x1 = minX + i * dx;
      const y1 = minY;
      const x2 = x1;
      const y2 = maxY;
      arr.push({ x1, x2, y1, y2 });
    }
  } else if (angD > 90 && angD <= 135) {
    const dx = HACHURE_DIST / Math.sin(angR - Math.PI / 2);
    const b = Ly * Math.tan(angR - Math.PI / 2);
    const number = Math.floor((Lx + b) / dx) + 1;
    for (let i = 0; i < number; i++) {
      const x1 = minX + dx * i;
      const y1 = minY;
      const x2 = minX - b + dx * i;
      const y2 = maxY;
      arr.push({ x1, x2, y1, y2 });
    }
  } else if (angD > 135 && angD < 180) {
    const dy = HACHURE_DIST / Math.sin(angR - Math.PI / 2);
    const b = Lx / Math.tan(angR - Math.PI / 2);
    const number = Math.floor((Ly + b) / dy) + 1;
    for (let i = 0; i < number; i++) {
      const x1 = minX;
      const y1 = minY + i * dy;
      const x2 = maxX;
      const y2 = maxY - b + i * dy;
      arr.push({ x1, x2, y1, y2 });
    }
  } else {
    //something went wrong with the angle, just return a 45 degree hachure pattern?
    //assume angR = Math.PI/4:
    const dx = HACHURE_DIST / Math.sin(Math.PI / 4);
    const b = Ly / Math.tan(Math.PI / 4);
    const number = Math.floor((Lx + b) / dx) + 1;
    for (let i = 0; i < number; i++) {
      const x1 = minX - b + dx * i;
      const y1 = minY;
      const x2 = minX + dx * i;
      const y2 = maxY;
      arr.push({ x1, x2, y1, y2 });
    }
  }

  return { number: arr.length, points: arr };
}
