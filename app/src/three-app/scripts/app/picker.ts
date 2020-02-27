import * as THREE from 'three';

export default class Picker {
  private readonly _camera: any;
  private _scene: any;

  private _raycaster: any;
  private readonly _mouse: any;

  private _lastPickedObject = null;
  private _lastPickedObjectSavedColor = null;

  private _cubeIdDisplay: HTMLElement;
  private _panelColorDisplay: HTMLElement;

  constructor(scene, camera) {
    this._camera = camera;
    this._scene = scene;

    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    this._cubeIdDisplay = document.querySelector('.cube-id');
    this._panelColorDisplay = document.querySelector('.plane-color');

    window.addEventListener( 'mousemove', this._onMouseMove.bind(this), false );
  }



  private _onMouseMove(event) {
    event.preventDefault();

    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this._mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this._raycaster.setFromCamera( this._mouse, this._camera );

    const intersects = this._raycaster.intersectObjects(this._scene.children, true);

    const pick = () => {
      this._lastPickedObject = intersects[0].object;
      this._lastPickedObjectSavedColor = intersects[0].object.material.color.getHex();
      this._lastPickedObject.material.color.offsetHSL(0,1, 0.2);

      this._cubeIdDisplay.innerText = intersects[0].object.parent.cubeId ?? 'None';
      this._panelColorDisplay.innerText = intersects[0].object.material.color.getHexString() ?? 'None';
      this._panelColorDisplay.style.color = `#${intersects[0].object.material.color.getHexString() ?? '#fff'}`;
    };

    const clear = () => {
      this._lastPickedObject.material.color.setHex(this._lastPickedObjectSavedColor);
      this._lastPickedObject = null;
      this._lastPickedObjectSavedColor = null;

      this._cubeIdDisplay.innerText = 'None';
      this._panelColorDisplay.innerText = 'None';
      this._panelColorDisplay.style.color = '#fff';
    };

    if (this._lastPickedObject) {
      if (intersects.length === 0) {
        clear();
      }
      else if (intersects.length > 0) {
        if (intersects[0].object.name !== 'cube_plane') {
          clear();
        } else {
          if (intersects[0].object !== this._lastPickedObject) {
            this._lastPickedObject.material.color.setHex(this._lastPickedObjectSavedColor);
            pick();
          }
        }
      }
    } else {
      if (intersects.length > 0 && intersects[0].object.name === 'cube_plane') {
        pick();
      }
    }
  }

}
