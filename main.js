import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x040d21);

/* Creating a sphere with a radius of 15, 64 width segments, and 32 height segments. */
const geometry = new THREE.SphereGeometry(4, 64, 32);
const material = new THREE.MeshStandardMaterial({
  color: "#89F3FF",
  // roughness: 0.2,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Lights
const pointLight = new THREE.PointLight(0x8566cc, 1, 100);
const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.1);
// pointLight.position.set(0, 10, 10);
pointLight.position.set(10, 10, 10);
pointLight.intensity = 1.25;
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

// Rendering
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableGravity = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resizing
window.addEventListener("resize", () => {
  // Update Size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

function animate() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
  controls.update();
}

animate();
