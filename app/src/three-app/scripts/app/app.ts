import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class App {
  private _previousTime: number;
  private _fps: number;

  private readonly _scene: any;
  private readonly _camera: any;
  private _renderer: any;

  private _controls: any;

  constructor(container) {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this._renderer = new THREE.WebGLRenderer();

    container.appendChild(this._renderer.domElement);

    this._init();

    window.requestAnimationFrame(this._frame.bind(this));
  }

  private _frame(timestamp: number) {
    if (!this._previousTime) {
      this._previousTime = timestamp;
    }
    let elapsedTime = timestamp - this._previousTime;
    this._previousTime = timestamp;
    this._fps = 1000 / elapsedTime;

    this._update();
    window.requestAnimationFrame(this._frame.bind(this));
  }

  private _init() {
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._camera.position.set(0, 50, 40);
    this._controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this._scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0x252525, 0.5);
    this._scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(25, 80, 50);
    pointLight.castShadow = true;
    this._scene.add(pointLight);

    const planeGeometry = new THREE.PlaneGeometry( 200, 200, 32 );
    const planeMaterial = new THREE.MeshPhongMaterial( {color: 0x7f7f7f, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    this._scene.add( plane );

    const width = 5;
    for(let i = 0; i < 5; i++) {
      const y = (width / 2) + i * (width * 1.5);
      for(let j = 0; j < 5; j++) {
        const x = (j * (width * 1.5)) - ((width * 2.5) + width / 2);
        const cubeGeometry = new THREE.BoxGeometry(width, width, width);
        const cubeMaterial = new THREE.MeshPhongMaterial({color: `hsl(${Math.floor(Math.random() * (360))}, 50%, 50%)`});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.y = y;
        cube.position.x = x;
        cube.castShadow = true;
        cube.receiveShadow = true;
        this._scene.add(cube);
      }
    }
  }

  private _update() {
    this._controls.update();
    this._renderer.render(this._scene, this._camera);
  }

}
