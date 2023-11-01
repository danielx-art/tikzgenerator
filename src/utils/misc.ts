import { DECIMAL_POINTS } from "public/generalConfigs";

export const instanceOf = <T>(value: any, fieldName: string): value is T =>
  fieldName in value;

export const roundToDecimalPlaces = (value: number) => {
  const multiplier = 10 ** DECIMAL_POINTS;
  return (Math.round(value * multiplier) / multiplier).toFixed(DECIMAL_POINTS);
};
