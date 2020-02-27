import * as THREE from 'three';

export default class Picker {
  private _camera: any;
  private _scene: any;

  private _raycaster: any;
  private _mouse: any;

  private _lastPickedObject = null;
  private _lastPickedObjectSavedColor = null;

  constructor(scene, camera) {
    this._camera = camera;
    this._scene = scene;

    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    window.addEventListener( 'mousemove', this._onMouseMove.bind(this), false );
  }



  private _onMouseMove(event) {
    event.preventDefault();

    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this._mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this._raycaster.setFromCamera( this._mouse, this._camera );

    const intersects = this._raycaster.intersectObjects(this._scene.children, true);
    // TODO: refactor this pasta-style
    if (this._lastPickedObject) {
      if (intersects.length === 0) {
        this._lastPickedObject.material.color.setHex(this._lastPickedObjectSavedColor);
        this._lastPickedObject = null;
        this._lastPickedObjectSavedColor = null;
      }
      else if (intersects.length > 0) {
        if (intersects[0].object.name !== 'cube_plane') {
          this._lastPickedObject.material.color.setHex(this._lastPickedObjectSavedColor);
          this._lastPickedObject = null;
          this._lastPickedObjectSavedColor = null;
        } else {
          if (intersects[0].object !== this._lastPickedObject) {
            this._lastPickedObject.material.color.setHex(this._lastPickedObjectSavedColor);
            this._lastPickedObject = intersects[0].object;
            this._lastPickedObjectSavedColor = intersects[0].object.material.color.getHex();
            this._lastPickedObject.material.color.setHex(0xff0000);
          }
        }
      }
    } else {
      if (intersects.length > 0 && intersects[0].object.name === 'cube_plane') {
        this._lastPickedObject = intersects[0].object;
        this._lastPickedObjectSavedColor = intersects[0].object.material.color.getHex();
        this._lastPickedObject.material.color.setHex(0xff0000);
      }
    }

    // else if(intersects.length > 0 && intersects[0].object !== this._lastPickedObject) {
    //   this._lastPickedObject.color.setHex(this._lastPickedObjectSavedColor);
    //   this._lastPickedObject = null;
    // } else if (intersects.length > 0 && !this._lastPickedObject) {
    //   this._lastPickedObject = intersects[0].object;
    //   this._lastPickedObjectSavedColor = intersects[0].object.material.color.getHex();
    //   this._lastPickedObject.material.color.setHex(0xff0000);
    // }
  }

}
