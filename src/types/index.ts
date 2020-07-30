export interface Point {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type Vector = number[];

export type Vector3 = [number, number, number];
export type Vector4 = [number, number, number, number];

export type Matrix = number[][];

export type Matrix3 = [Vector3, Vector3, Vector3];

export type Matrix4 = [Vector4, Vector4, Vector4, Vector4];

export type Face = Point[];

export interface Object3D {
  center: Vector3;
  translate?: Vector3;
  rotate?: Vector3;
  scale?: Vector3;
  faces: Face[];
}

/** specifies an observer's viewpoint */
export interface Camera {
  /** vantage point */
  position: Point;
  /** what the camera is looking towards */
  focus: Point;
  upDirection: Vector3;
  /** a distance in the direction of the focus */
  near: number;
  /** a distance in the direction of the focus */
  far: number;
  /** how wide the field of view goes. */
  FOVAngle: number;
}
