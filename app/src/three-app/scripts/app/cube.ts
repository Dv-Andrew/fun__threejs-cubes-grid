import * as THREE from 'three';

interface CubePosition {
  x: number;
  y: number;
  z: number;
}

export default class Cube {
  private readonly _scene: any;

  private readonly _id: number;

  private _planesGroup: any;

  constructor(scene, id, width, position: CubePosition) {
    this._scene = scene;
    this._id = id;

    this._planesGroup = new THREE.Group();
    this._planesGroup.scale.set(width, width, width);
    this._scene.add(this._planesGroup);

    this._setPlane("x",  -Math.PI * 0.5, 0xff0000); // top
    this._setPlane("x",  Math.PI * 0.5, 0xff0000); // bottom
    this._setPlane("y",  -Math.PI * 0.5, 0x00ff00); // left-side
    this._setPlane("y",  Math.PI * 0.5, 0x00ff00); // right-side
    this._setPlane("y",  0, 0x0000ff); // front
    this._setPlane("y",  Math.PI, 0x0000ff); // back
  }

  private _setPlane(axis, angle, color) {
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    planeGeometry.translate(0, 0, 0.5);
    if (axis === 'y') {
      planeGeometry.rotateY(angle);
    } else {
      planeGeometry.rotateX(angle);
    }
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
    plane.castShadow = true;
    plane.receiveShadow = true;
    this._planesGroup.add(plane);
  }

}
