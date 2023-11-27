import { DECIMAL_POINTS } from "public/generalConfigs";

export const instanceOf = <T>(value: any, fieldName: string): value is T =>
  fieldName in value;

export const roundToDecimalPlaces = (value: number, decimalPoints: number = DECIMAL_POINTS) => {
  const multiplier = 10 ** decimalPoints;
  return (Math.round(value * multiplier) / multiplier).toFixed(decimalPoints);
};

export const roundAndDisplayNicely = (value: number, decimalPoints: number = DECIMAL_POINTS) => {
  const roundedValue = roundToDecimalPlaces(value, decimalPoints);
  const isRounded = Number(roundedValue) !== value;
  
  if (isRounded) {
      return `~${roundedValue}`;
  } else {
      return roundedValue.toString().replace(/\.0+$/, '');
  }
}

export const lerp = (
  value: number,
  fromMin: number,
  toA: number,
  fromMax: number,
  toB: number,
) => {
  return ((toB - toA) / (fromMax - fromMin)) * (value - fromMin) + toA;
};

export const clamp = (value: number, min: number, max: number) => {
  return value < min ? min : value > max ? max : value;
};

export const lerpAndClamp = (
  value: number,
  fromA: number,
  fromB: number,
  toA: number,
  toB: number,
) => {
  return clamp(lerp(value, fromA, toA, fromB, toB), fromA, fromB);
};

export const Hyperb_Linear_Hyperb = (
  x: number,
  stepFromA: number,
  toA: number,
  stepFromB: number,
  toB: number,
  topAssymptote: number,
  bottomAssymptote: number,
) => {
  const m = (toB - toA) / (stepFromB - stepFromA);

  if (x > stepFromB) {
    const K = (topAssymptote - toB) ** 2 / m;
    const x0 = (m * stepFromB - topAssymptote + toB) / m;
    const topHyperbola = -K / (x - x0) + topAssymptote;
    return topHyperbola;
  }

  if (x < stepFromA) {
    const K = (bottomAssymptote - toA) ** 2 / m;
    const x0 = (m * stepFromA - bottomAssymptote + toA) / m;
    const bottomHyperbola = -K / (x - x0) + bottomAssymptote;
    return bottomHyperbola;
  }

  return ((toB - toA) / (stepFromB - stepFromA)) * (x - stepFromA) + toA;
};

export const capped_inverse_Hyperb_Linear_Hyperb = (
  x: number,
  stepFromA: number,
  toA: number,
  stepFromB: number,
  toB: number,
  leftAssymptote: number,
  bottomAssymptote: number,
  rightAssymptote: number,
  topAssymptote: number,
) => {
  const m = (toB - toA) / (stepFromB - stepFromA);
  let x0, K, t;

  if (x <= leftAssymptote) return bottomAssymptote;
  if (x >= rightAssymptote) return topAssymptote;

  if (x > toB) {
    K = (rightAssymptote - toB) ** 2 / m;
    x0 = (m * stepFromB - rightAssymptote + toB) / m;
    const result = x0 - K / (x - rightAssymptote);
    return result > topAssymptote ? topAssymptote : result;
  } else if (x < toA) {
    K = (leftAssymptote - toA) ** 2 / m;
    x0 = (m * stepFromA - leftAssymptote + toA) / m;
    const result = x0 - K / (x - leftAssymptote);
    return result < bottomAssymptote ? bottomAssymptote : result;
  } else {
    return ((x - toA) * (stepFromB - stepFromA)) / (toB - toA) + stepFromA;
  }
};

export const inverse_Hyperb_Linear_Hyperb = (
  x: number,
  stepFromA: number,
  toA: number,
  stepFromB: number,
  toB: number,
  leftAssymptote: number,
  rightAssymptote: number,
) => {
  const m = (toB - toA) / (stepFromB - stepFromA);
  let x0, K, t;

  if (x <= leftAssymptote) {
    return -Infinity;
  } else if (x >= rightAssymptote) {
    return Infinity;
  }

  if (x > toB) {
    K = (rightAssymptote - toB) ** 2 / m;
    x0 = (m * stepFromB - rightAssymptote + toB) / m;
    const result = x0 - K / (x - rightAssymptote);
    return result;
  } else if (x < toA) {
    K = (leftAssymptote - toA) ** 2 / m;
    x0 = (m * stepFromA - leftAssymptote + toA) / m;
    const result = x0 - K / (x - leftAssymptote);
    return result;
  } else {
    return ((x - toA) * (stepFromB - stepFromA)) / (toB - toA) + stepFromA;
  }
};

export const Exp_Linear_Exp = (
  x: number,
  stepFromA: number,
  toA: number,
  stepFromB: number,
  toB: number,
  topAssymptote: number,
  bottomAssymptote: number,
) => {
  const m = (toB - toA) / (stepFromB - stepFromA);

  if (x > stepFromB) {
    const a = -1;
    const b = m / (toB - topAssymptote);
    const x0 =
      stepFromB -
      ((toB - topAssymptote) / m) * Math.log(a * (toB - topAssymptote));
    const topExp = a * Math.exp(b * (x - x0)) + topAssymptote;
    return topExp;
  }

  if (x < stepFromA) {
    const a = 1;
    const b = m / (toA - bottomAssymptote);
    const x0 =
      stepFromA -
      ((toA - bottomAssymptote) / m) * Math.log(a * (toA - bottomAssymptote));
    const bottomExp = a * Math.exp(b * (x - x0)) + bottomAssymptote;
    return bottomExp;
  }

  return lerp(x, stepFromA, toA, stepFromB, toB);
};

export const inverseExp_Linear_Exp = (
  x: number,
  stepFromA: number,
  toA: number,
  stepFromB: number,
  toB: number,
  topAssymptote: number,
  bottomAssymptote: number,
) => {
  if (x < bottomAssymptote || x > topAssymptote) return undefined;

  const m = (toB - toA) / (stepFromB - stepFromA);
  let x0, a, b;

  if (x > toB) {
    a = -1;
    b = m / (toB - topAssymptote);
    x0 =
      stepFromB -
      ((toB - topAssymptote) / m) * Math.log(-1 * (toB - topAssymptote));
    return x0 + ((toB - topAssymptote) / m) * Math.log((x - topAssymptote) / a);
  }

  if (x < toA) {
    a = 1;
    b = m / (toA - bottomAssymptote);
    x0 =
      stepFromA -
      ((toA - bottomAssymptote) / m) * Math.log(toA - bottomAssymptote);
    return (
      x0 + ((toA - bottomAssymptote) / m) * Math.log((x - bottomAssymptote) / a)
    );
  }

  return ((x - toA) * (stepFromB - stepFromA)) / (toB - toA) + stepFromA;
};