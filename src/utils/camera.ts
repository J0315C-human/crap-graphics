import { Camera, Matrix4 } from '../types';
import { radians } from './number';

export const getCameraTransformMatrix = (camera: Camera): Matrix4 => {
  const { near: n, far: f, FOVAngle } = camera;
  const a = 1 / Math.tan(radians(FOVAngle) / 2);
  const b = f - n;
  const c = (f + n) / b;
  const d = (2 * f * n) / b;
  return [
    [a, 0, 0, 0],
    [0, a, 0, 0],
    [0, 0, c, d],
    [0, 0, -1, 0],
  ];
};
