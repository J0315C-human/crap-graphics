import { Point, Object3D } from '../types';
import { subdivideObjectLineSegments } from '../utils/object3d';

const w = 1;
const heightFactor = 0.8;
const backRight: Point = {
  x: w,
  y: -w * heightFactor,
  z: -w,
  w: 1,
};
const backLeft: Point = {
  x: -w,
  y: -w * heightFactor,
  z: -w,
  w: 1,
};
const frontRight: Point = {
  x: w,
  y: -w * heightFactor,
  z: w,
  w: 1,
};
const frontLeft: Point = {
  x: -w,
  y: -w * heightFactor,
  z: w,
  w: 1,
};

const top: Point = {
  x: 0,
  y: w * heightFactor,
  z: 0,
  w: 1,
};

export const pyramidPrimitive: Object3D = {
  center: [0, 0, 0],
  faces: [
    // bottom
    [backLeft, backRight, frontRight, frontLeft],
    // top left
    [backLeft, top, frontLeft],
    // top back
    [backLeft, top, backRight],
    // top right
    [backRight, top, frontRight],
    // top front
    [frontLeft, top, frontRight],
  ],
};

export default subdivideObjectLineSegments(pyramidPrimitive);
