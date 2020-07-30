export const isWithinErrorMargin = (a: number, b: number, margin = 0.0000001) => {
  if (a === Infinity && b === Infinity) return true;
  if (isNaN(a) || isNaN(b)) return true;
  return Math.abs(a - b) < margin;
};

export const radians = (degrees: number) => (degrees / 180) * Math.PI;
