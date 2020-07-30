import { Object3D } from '../types';
import { interpolatePointList } from './point';

export const subdivideObjectLineSegments = (obj: Object3D): Object3D => {
  return {
    ...obj,
    faces: obj.faces.map(interpolatePointList),
  };
};
