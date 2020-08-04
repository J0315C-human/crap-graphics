import { Point, Matrix, Vector3, Vector4 } from '../types';
import { multiplyVectorByMatrix, vector4FromPoint, magnitude, vectorFromBetweenPoints } from './vector';

export const multiplyPointByMatrix = (p: Point, m: Matrix): Point => {
  const [x, y, z, w] = multiplyVectorByMatrix(vector4FromPoint(p), m);
  return { x, y, z, w };
};

export const vectorAsPoint = (v: Vector3 | Vector4): Point => ({
  x: v[0],
  y: v[1],
  z: v[2],
  w: v[3] === undefined ? 1 : v[3],
});

const getHalfwayPoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
  z: (a.z + b.z) / 2,
  w: (a.w + b.w) / 2,
});

const MAX_SEGMENT = 0.4;

export const interpolatePointList = (points: Point[]): Point[] => {
  const result: Point[] = [];
  points.forEach((pt) => {
    // previous point is either last one added, or the last point (for the first point)
    const prev = result[result.length - 1] || points[points.length - 1];

    // if the line segment is too long, add a point in between
    if (magnitude(vectorFromBetweenPoints(prev, pt)) > MAX_SEGMENT) {
      const halfway = getHalfwayPoint(prev, pt);
      result.push(halfway);
    }
    result.push(pt);
  });
  if (points.length === result.length) return result;
  else return interpolatePointList(result);
};

export const getAveragePoint = (points: Point[]): Point => {
  const totals = points.reduce(
    (prev, cur) => ({
      x: prev.x + cur.x,
      y: prev.y + cur.y,
      z: prev.z + cur.z,
      w: prev.w + cur.w,
    }),
    { x: 0, y: 0, z: 0, w: 0 },
  );
  if (!points.length) return totals;
  return {
    x: totals.x / points.length,
    y: totals.y / points.length,
    z: totals.z / points.length,
    w: totals.w / points.length,
  };
};
