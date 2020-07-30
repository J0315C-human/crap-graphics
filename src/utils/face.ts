import { Face, Matrix } from '../types';
import { multiplyPointByMatrix } from './point';

export const multiplyFaceByMatrix = (face: Face, m: Matrix): Face => face.map((p) => multiplyPointByMatrix(p, m));
