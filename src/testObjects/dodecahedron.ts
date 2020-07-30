import { Point, Object3D } from '../types';
import { subdivideObjectLineSegments } from '../utils/object3d';
import { vectorAsPoint } from '../utils/point';

const L = 1;
const phi = 1.618;
const scale = 0.5;

const A = L * scale;
const B = phi * scale;
const C = scale / phi;
// the colors in these namings refer to this image https://upload.wikimedia.org/wikipedia/commons/a/a4/Dodecahedron_vertices.png
const pts: Point[] = [
  [A, A, A], // 0    orange tops
  [A, -A, A], //1    // top right front
  [-A, A, A], //2
  [-A, -A, A],

  [A, A, -A], //4    orange bottom
  [A, -A, -A],
  [-A, A, -A],
  [-A, -A, -A],
  //
  [0, B, C], //8   green
  [0, B, -C],
  [0, -B, C],
  [0, -B, -C],
  //
  [C, 0, B], //12   blue
  [C, 0, -B],
  [-C, 0, B],
  [-C, 0, -B],
  //
  [B, C, 0], //16  pink
  [B, -C, 0],
  [-B, C, 0],
  [-B, -C, 0],
].map(vectorAsPoint);

const [
  orangeBackRightTop,
  orangeFrontRightTop,
  orangeBackLeftTop,
  orangeFrontLeftTop,
  //
  orangeBackRightBottom,
  orangeFrontRightBottom,
  orangeBackLeftBottom,
  orangeFrontLeftBottom,
  //
  greenBackTop,
  greenBackBottom,
  greenFrontTop,
  greenFrontBottom,
  //
  blueRightTop,
  blueRightBottom,
  blueLeftTop,
  blueLeftBottom,
  //
  pinkRightBack,
  pinkRightFront,
  pinkLeftBack,
  pinkLeftFront,
] = pts;
export const cubePrimitive: Object3D = {
  center: [0, 0, 0],
  faces: [
    [greenFrontTop, orangeFrontRightTop, pinkRightFront, orangeFrontRightBottom, greenFrontBottom],
    [greenFrontTop, greenFrontBottom, orangeFrontLeftBottom, pinkLeftFront, orangeFrontLeftTop],
    [greenFrontTop, orangeFrontRightTop, blueRightTop, blueLeftTop, orangeFrontLeftTop],
    [orangeFrontRightTop, blueRightTop, orangeBackRightTop, pinkRightBack, pinkRightFront],
    [pinkRightBack, pinkRightFront, orangeFrontRightBottom, blueRightBottom, orangeBackRightBottom],
    [orangeFrontLeftBottom, greenFrontBottom, orangeFrontRightBottom, blueRightBottom, blueLeftBottom],
    [orangeFrontLeftBottom, blueLeftBottom, orangeBackLeftBottom, pinkLeftBack, pinkLeftFront],
    [pinkLeftFront, pinkLeftBack, orangeBackLeftTop, blueLeftTop, orangeFrontLeftTop],
    [blueLeftTop, blueRightTop, orangeBackRightTop, greenBackTop, orangeBackLeftTop],
    [greenBackTop, orangeBackLeftTop, pinkLeftBack, orangeBackLeftBottom, greenBackBottom],
    [orangeBackLeftBottom, greenBackBottom, orangeBackRightBottom, blueRightBottom, blueLeftBottom],
    [orangeBackRightBottom, pinkRightBack, orangeBackRightTop, greenBackTop, greenBackBottom],
  ],
};

export default subdivideObjectLineSegments(cubePrimitive);
