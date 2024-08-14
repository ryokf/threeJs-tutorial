import * as THREE from "three";
import "./style.css";

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000088)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate() {
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
