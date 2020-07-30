import './assets/styles.css';
import { Camera, Object3D, Vector3 } from './types';
import * as dat from 'dat.gui';
import pyramid from './testObjects/pyramid';
import cube from './testObjects/cube';
import dodecahedron from './testObjects/dodecahedron';
import { draw } from './utils/draw';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const camera: Camera = {
  near: 0.5,
  far: 30,
  position: {
    x: 0,
    y: 0,
    z: 10,
    w: 1,
  },
  focus: {
    x: 0,
    y: 1,
    z: -1,
    w: 1,
  },
  upDirection: [0, 1, 0],
  FOVAngle: 60,
};

// ------ GUI controls --------

const ctrl = {
  objectToDraw: pyramid,
  translate: [0, 0.1, -5] as Vector3,
  rotate: [0, 0, 0] as Vector3,
  scale: [1, 1, 1] as Vector3,
};

const gui = new dat.GUI();
gui.add({ shape: 'pyramid' }, 'shape', ['pyramid', 'cube', 'dodecahedron']).onChange((val) => {
  switch (val) {
    case 'cube':
      ctrl.objectToDraw = cube;
      break;
    case 'pyramid':
      ctrl.objectToDraw = pyramid;
      break;
    case 'dodecahedron':
      ctrl.objectToDraw = dodecahedron;
      break;
  }
});

const C = gui.addFolder('camera');
C.add(camera, 'FOVAngle', 1, 120, 1);
C.add(camera, 'near', 0.5, 30, 0.01);
C.add(camera, 'far', 0.5, 30, 0.01);

const T = gui.addFolder('translate');
T.add(ctrl.translate, '0', -3, 3, 0.01).name('X');
T.add(ctrl.translate, '1', -3, 3, 0.01).name('Y');
T.add(ctrl.translate, '2', -30, 0, 0.01).name('Z');

const R = gui.addFolder('rotate');
R.add(ctrl.rotate, '0', -180, 180, 1).name('X');
R.add(ctrl.rotate, '1', -180, 180, 1).name('Y');
R.add(ctrl.rotate, '2', -180, 180, 1).name('Z');
const S = gui.addFolder('scale');
S.add(ctrl.scale, '0', 0, 3, 0.1).name('X');
S.add(ctrl.scale, '1', 0, 3, 0.1).name('Y');
S.add(ctrl.scale, '2', 0, 3, 0.1).name('Z');

[C, T, R, S].forEach((ctrl) => ctrl.open());

// ------ canvas update/callback --------

const updateCanvas = () => {
  const { translate, rotate, scale, objectToDraw } = ctrl;
  const myObject: Object3D = {
    faces: [],
    ...objectToDraw,
    translate,
    scale,
    rotate,
  };

  draw({
    objects: [myObject],
    camera,
    canvas,
  });
};

const onFrame = () => {
  updateCanvas();
  requestAnimationFrame(onFrame);
};

onFrame();
