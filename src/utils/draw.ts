import { Object3D, Camera, Point } from '../types';
import {
  composeMatrices,
  translationMatrix,
  xRotationMatrix,
  yRotationMatrix,
  zRotationMatrix,
  scalingMatrix,
} from './matrix';
import { getCameraTransformMatrix } from './camera';
import { multiplyFaceByMatrix } from './face';
import * as Color from 'color';
import { getAveragePoint } from './point';
import { magnitude, vectorFromBetweenPoints } from './vector';

interface DrawProps {
  objects: Object3D[];
  camera: Camera;
  canvas: HTMLCanvasElement;
}

export const draw = (params: DrawProps) => {
  const { objects, camera, canvas } = params;

  const ctx = canvas.getContext('2d');
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const toCanvasSpace = (point: Point): { x: number; y: number } => {
    const halfHeight = HEIGHT / 2;
    const halfWidth = WIDTH / 2;
    return {
      x: (point.x / point.w) * halfWidth + halfWidth,
      y: (-point.y / point.w) * halfHeight + halfHeight,
    };
  };

  const drawFace = (pts: Point[], color: Color) => {
    if (pts.length < 2) return;
    ctx.strokeStyle = 'none';
    ctx.fillStyle = color.toString();
    const { x: firstX, y: firstY } = toCanvasSpace(pts[0]);
    ctx.moveTo(firstX, firstY);
    pts.slice(1).forEach((pt) => {
      const { x, y } = toCanvasSpace(pt);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(firstX, firstY);
    ctx.fill();
  };

  const drawLines = (pts: Point[]) => {
    if (pts.length < 2) return;
    ctx.strokeStyle = '#FFF';
    const { x: firstX, y: firstY } = toCanvasSpace(pts[0]);
    ctx.moveTo(firstX, firstY);
    pts.slice(1).forEach((pt) => {
      const { x, y } = toCanvasSpace(pt);
      ctx.lineTo(x, y);
      ctx.stroke();
    });
    ctx.lineTo(firstX, firstY);
    ctx.stroke();
  };

  const isPointInsideFieldOfView = (p: Point) => {
    const val = p.z / p.w;
    return val > -1 && val < 1;
  };

  // clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.beginPath();

  const cameraTransform = getCameraTransformMatrix(camera);

  objects.forEach((obj) => {
    const [xRot, yRot, zRot] = obj.rotate || [0, 0, 0];
    const [xScale, yScale, zScale] = obj.scale || [1, 1, 1];
    const rotateX = xRotationMatrix(xRot);
    const rotateY = yRotationMatrix(yRot);
    const rotateZ = zRotationMatrix(zRot);
    const scale = scalingMatrix(xScale, yScale, zScale);
    const translate = translationMatrix(...(obj.translate || [0, 0, 0]));
    const color = obj.color ? new Color(obj.color) : undefined;
    const transform = composeMatrices([scale, rotateX, rotateY, rotateZ, translate, cameraTransform]);
    obj.faces.forEach((face) => {
      const transformed = multiplyFaceByMatrix(face, transform);
      const drawablePoints = transformed.filter(isPointInsideFieldOfView);
      if (color) {
        const faceCenter = getAveragePoint(transformed);
        const dist = magnitude(vectorFromBetweenPoints(camera.position, faceCenter));
        const faceColor = color.darken(dist / 10);
        drawFace(drawablePoints, faceColor);
      } else drawLines(drawablePoints);
    });
  });
};
