import * as THREE from 'three';

interface CubePosition {
  x: number;
  y: number;
  z: number;
}

export default class Cube {
  private readonly _scene: any;

  private readonly _id: number;

  private readonly _planesGroup: any;

  constructor(scene, id: number, width: number, position: CubePosition) {
    this._scene = scene;
    this._id = id;

    this._planesGroup = new THREE.Group();
    this._scene.add(this._planesGroup);

    this._setPlane('top', position, width, 0xff0000);
    this._setPlane('bottom', position, width, 0xff0000);
    this._setPlane('left', position, width, 0x00ff00);
    this._setPlane('right', position, width, 0x00ff00);
    this._setPlane('front', position, width, 0x0000ff);
    this._setPlane('back', position, width, 0x0000ff);
  }

  private _setPlane(type, cubePosition: CubePosition, cubeWidth: number, color) {
    const planeGeometry = new THREE.PlaneGeometry(cubeWidth, cubeWidth, 1, 1);
    switch (type) {
      case 'top':
        planeGeometry.rotateX(-Math.PI * 0.5);
        planeGeometry.translate(cubePosition.x, cubePosition.y + cubeWidth / 2, cubePosition.z);
        break;
      case 'bottom':
        planeGeometry.rotateX(Math.PI * 0.5);
        planeGeometry.translate(cubePosition.x, cubePosition.y - cubeWidth / 2, cubePosition.z);
        break;
      case 'left':
        planeGeometry.rotateY(-Math.PI * 0.5);
        planeGeometry.translate(cubePosition.x - cubeWidth / 2, cubePosition.y, cubePosition.z);
        break;
      case 'right':
        planeGeometry.rotateY(Math.PI * 0.5);
        planeGeometry.translate(cubePosition.x + cubeWidth / 2, cubePosition.y, cubePosition.z);
        break;
      case 'front':
        planeGeometry.translate(cubePosition.x, cubePosition.y, cubePosition.z + cubeWidth / 2);
        break;
      case 'back':
        planeGeometry.rotateY(Math.PI);
        planeGeometry.translate(cubePosition.x, cubePosition.y, cubePosition.z - cubeWidth / 2);
        break;
      default:
        planeGeometry.translate(cubePosition.x, cubePosition.y, cubePosition.z);
        break;
    }
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({color: color}));
    plane.castShadow = true;
    plane.receiveShadow = true;
    this._planesGroup.add(plane);
  }

}
