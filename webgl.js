// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7fff7f);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a pyramid using a custom geometry
const geometry = new THREE.Geometry();
geometry.vertices.push(
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(-1, -1, 1),
  new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(1, -1, -1),
  new THREE.Vector3(-1, -1, -1)
);
geometry.faces.push(
  new THREE.Face3(0, 1, 2),
  new THREE.Face3(0, 2, 3),
  new THREE.Face3(0, 3, 4),
  new THREE.Face3(0, 4, 1),
  new THREE.Face3(1, 4, 3),
  new THREE.Face3(1, 3, 2)
);

// Create a dark grey material
const material = new THREE.MeshBasicMaterial({ color: 0x4B4B4B });

// Create the pyramid mesh and add it to the scene
const pyramid = new THREE.Mesh(geometry, material);
scene.add(pyramid);

// Set the camera position
camera.position.z = 5;

// Set up the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the pyramid
  pyramid.rotation.x += 0.01;
  pyramid.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

animate();
