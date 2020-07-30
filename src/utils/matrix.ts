import { Matrix, Matrix4, Point } from '../types';
import { dotProduct } from './vector';
import { radians } from './number';

export const getIdentityMatrix = (width: number): Matrix => {
  const result = [];
  for (let row = 0; row < width; row++) {
    const resultRow = [];
    for (let col = 0; col < width; col++) {
      resultRow.push(row === col ? 1 : 0);
    }
    result.push(resultRow);
  }
  return result;
};

export const getMatrixColumn = (m: Matrix, colIndex: number) => m.map((row) => row[colIndex]);

export const multiplyMatrices = <T extends Matrix>(a: T, b: T) => {
  const size = a[0] ? a[0].length : 0;
  const result: Matrix = [];

  for (let bCol = 0; bCol < size; bCol++) {
    const bColumnVector = getMatrixColumn(b, bCol);
    for (let aRow = 0; aRow < size; aRow++) {
      const aRowVector = a[aRow];
      const value = dotProduct(aRowVector, bColumnVector);
      if (result[aRow] === undefined) {
        result.push([]);
      }
      result[aRow].push(value);
    }
  }
  return result as T;
};

export const xRotationMatrix = (degrees: number): Matrix4 => {
  const rads = radians(degrees);
  const sin = Math.sin(rads);
  const cos = Math.cos(rads);
  return [
    [1, 0, 0, 0],
    [0, cos, -sin, 0],
    [0, sin, cos, 0],
    [0, 0, 0, 1],
  ];
};

export const yRotationMatrix = (degrees: number): Matrix4 => {
  const rads = radians(degrees);
  const sin = Math.sin(rads);
  const cos = Math.cos(rads);
  return [
    [cos, 0, sin, 0],
    [0, 1, 0, 0],
    [-sin, 0, cos, 0],
    [0, 0, 0, 1],
  ];
};

export const zRotationMatrix = (degrees: number): Matrix4 => {
  const rads = radians(degrees);
  const sin = Math.sin(rads);
  const cos = Math.cos(rads);
  return [
    [cos, -sin, 0, 0],
    [sin, cos, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};

const _getTranslationMatrix = (x: number, y: number, z: number): Matrix4 => {
  return [
    [1, 0, 0, x],
    [0, 1, 0, y],
    [0, 0, 1, z],
    [0, 0, 0, 1],
  ];
};

export function translationMatrix(x: number, y: number, z: number): Matrix4;
export function translationMatrix(x: Point, y?: undefined, z?: undefined): Matrix4;
export function translationMatrix(x: number[], y?: undefined, z?: undefined): Matrix4;
export function translationMatrix(x, y, z): Matrix4 {
  const defaultValue = 0;
  if (typeof x === 'number') {
    return _getTranslationMatrix(x, y || defaultValue, z || defaultValue);
  }
  if (Array.isArray(x)) {
    return _getTranslationMatrix(x[0] || defaultValue, x[1] || defaultValue, x[2] || defaultValue);
  }
  return _getTranslationMatrix(x.x, x.y, x.z);
}

const _getScalingMatrix = (x: number, y: number, z: number): Matrix4 => {
  return [
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1],
  ];
};

export function scalingMatrix(x: number, y: number, z: number): Matrix4;
export function scalingMatrix(x: Point, y?: undefined, z?: undefined): Matrix4;
export function scalingMatrix(x: number[], y?: undefined, z?: undefined): Matrix4;
export function scalingMatrix(x, y, z): Matrix4 {
  const defaultValue = 1;
  if (typeof x === 'number') {
    return _getScalingMatrix(x, y || defaultValue, z || defaultValue);
  }
  if (Array.isArray(x)) {
    return _getScalingMatrix(x[0] || defaultValue, x[1] || defaultValue, x[2] || defaultValue);
  }
  return _getScalingMatrix(x.x, x.y, x.z);
}

export const composeMatrices = (matrices: Matrix[]) => {
  if (!matrices.length) throw new Error('no matrices passed to composeMatrices');
  const lastMatrix = matrices[matrices.length - 1];
  if (matrices.length === 1) return lastMatrix;
  return matrices.slice(0, matrices.length - 1).reduceRight((prev, cur) => multiplyMatrices(prev, cur), lastMatrix);
};
