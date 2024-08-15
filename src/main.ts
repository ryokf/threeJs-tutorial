import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.GridHelper());

const sceneBg = {
  color: 0x222222,
  image: "https://sbcode.net/img/grid.png",
  skyBox: {
    path: "https://sbcode.net/img/",
    images: ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
  },
};

scene.background = new THREE.CubeTextureLoader()
  .setPath(sceneBg.skyBox.path)
  .load(sceneBg.skyBox.images);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 4); // x, y, z = 5;
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5;
scene.add(cube);

// orbit control
// new OrbitControls(camera, renderer.domElement);

// stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// dat gui
const gui = new GUI();

const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
// cubeFolder.open();

const cameraFolder = gui.addFolder("Camera position");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);
cameraFolder.open();

const cameraRotationFolder = gui.addFolder("Camera rotation");
cameraRotationFolder.add(camera.rotation, "x", -10, 10);
cameraRotationFolder.add(camera.rotation, "y", -10, 10);
cameraRotationFolder.add(camera.rotation, "z", -10, 10);
cameraRotationFolder.open();

function animate() {
  // cube.rotation.y += 0.01;
  camera.lookAt(0, 1, 0);
  renderer.render(scene, camera);

  stats.update();
}

renderer.setAnimationLoop(animate);
