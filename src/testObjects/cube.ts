import { Point, Object3D } from '../types';
import { subdivideObjectLineSegments } from '../utils/object3d';

const w = 2;
const btmBackRight: Point = {
  x: w / 2,
  y: -w / 2,
  z: -w / 2,
  w: 1,
};
const btmBackLeft: Point = {
  x: -w / 2,
  y: -w / 2,
  z: -w / 2,
  w: 1,
};
const btmFrontRight: Point = {
  x: w / 2,
  y: -w / 2,
  z: w / 2,
  w: 1,
};
const btmFrontLeft: Point = {
  x: -w / 2,
  y: -w / 2,
  z: w / 2,
  w: 1,
};

const topBackRight: Point = {
  x: w / 2,
  y: w / 2,
  z: -w / 2,
  w: 1,
};
const topBackLeft: Point = {
  x: -w / 2,
  y: w / 2,
  z: -w / 2,
  w: 1,
};
const topFrontRight: Point = {
  x: w / 2,
  y: w / 2,
  z: w / 2,
  w: 1,
};
const topFrontLeft: Point = {
  x: -w / 2,
  y: w / 2,
  z: w / 2,
  w: 1,
};

export const cubePrimitive: Object3D = {
  center: [0, 0, 0],
  faces: [
    // bottom
    [btmBackLeft, btmBackRight, btmFrontRight, btmFrontLeft],
    // back
    [btmBackLeft, btmBackRight, topBackRight, topBackLeft],
    // right
    [btmFrontRight, btmBackRight, topBackRight, topFrontRight],
    // front
    [btmFrontRight, topFrontRight, topFrontLeft, btmFrontLeft],
    // top
    [topFrontRight, topFrontLeft, topBackLeft, topBackRight],
    // LEFT
    [topFrontLeft, topBackLeft, btmBackLeft, btmFrontLeft],
  ],
};

export default subdivideObjectLineSegments(cubePrimitive);
