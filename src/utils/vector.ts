import { Vector, Matrix, Point, Vector3, Vector4 } from '../types';
import { isWithinErrorMargin } from './number';

/** if vector lengths differ, ignores the remaining members of the longer one */
export const dotProduct = (a: Vector, b: Vector) => {
  let total = 0;
  a.forEach((aVal, idx) => {
    if (b[idx] === undefined) return;
    const bVal = b[idx];
    total += aVal * bVal;
  });
  return total;
};

export const multiplyVectorByMatrix = <T extends Vector>(v: T, m: Matrix): T => {
  const result: Vector = [];
  for (let i = 0; i < v.length; i++) {
    const matrixRow = m[i];
    if (matrixRow === undefined) throw new Error('unmatched matrix size and vector size in multiplyVectorByMatrix');
    result.push(dotProduct(matrixRow, v));
  }
  return result as T;
};

export const multiplyVectorByNumber = <T extends Vector>(v: T, n: number): T => v.map((val) => val * n) as T;

export const vectorFromBetweenPoints = (src: Point, dest: Point): Vector3 => {
  return [dest.x - src.x, dest.y - src.y, dest.z - src.z];
};

export const magnitude = (v: Vector3 | Vector4): number => {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
};

export const vector3FromPoint = (p: Point) => [p.x, p.y, p.z];
export const vector4FromPoint = (p: Point) => [p.x, p.y, p.z, p.w];

export const crossProduct = (v: Vector3 | Vector4, w: Vector3 | Vector4): Vector3 => {
  const [v1, v2, v3] = v;
  const [w1, w2, w3] = w;
  return [v2 * w3 - v3 * w2, v3 * w1 - v1 * w3, v1 * w2 - v2 * w1];
};

export const unitVector = <T extends Vector3 | Vector4>(v: T): T => {
  const mag = magnitude(v);
  return v.map((n) => n / mag) as T;
};

export const areVectorsParallel = (v: Vector3 | Vector4, w: Vector3 | Vector4) => {
  const [v1, v2, v3] = v;
  const [w1, w2, w3] = w;
  const ratio1 = v1 / w1;
  const ratio2 = v2 / w2;
  const ratio3 = v3 / w3;
  return (
    isWithinErrorMargin(ratio1, ratio2) && isWithinErrorMargin(ratio2, ratio3) && isWithinErrorMargin(ratio3, ratio1)
  );
};

export const areVectorsPerpendicular = (v: Vector3 | Vector4, w: Vector3 | Vector4) => {
  const dot = dotProduct(v, w);
  return isWithinErrorMargin(dot, 0);
};
