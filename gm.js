// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xB8860B); // Set background color to deep gold
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geodesic dome using THREE.IcosahedronGeometry
const radius = 2;
const detail = 2; // Increase this value for more subdivisions
const geometry = new THREE.IcosahedronGeometry(radius, detail);

// Create a dark grey material
const material = new THREE.MeshBasicMaterial({ color: 0x4B4B4B, wireframe: true });

// Create the geodesic dome mesh and add it to the scene
const dome = new THREE.Mesh(geometry, material);
scene.add(dome);

// Set the camera position
camera.position.z = 5;

// Add email button to the HTML body
function addEmailButton() {
  const button = document.createElement('button');
  button.style.position = 'absolute';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.fontFamily = 'Arial, sans-serif';
  button.style.fontSize = '16px';
  button.textContent = 'Email';
  button.onclick = function() {
    window.location.href = 'mailto:narrativegoldmine@pm.me';
  };
  document.body.appendChild(button);
}

addEmailButton();

// Set up the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the dome
  dome.rotation.x += 0.01;
  dome.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

animate();
