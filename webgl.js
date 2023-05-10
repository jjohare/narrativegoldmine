// Helper function to create a colored bar between two points
function createColorCyclingBar(start, end, colorSpeed) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  direction.normalize();

  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const geometry = new THREE.CylinderGeometry(0.05, 0.05, length, 8);
  const material = new THREE.MeshBasicMaterial();

  const bar = new THREE.Mesh(geometry, material);
  bar.position.copy(start).lerp(end, 0.5);
  bar.setRotationFromQuaternion(quaternion);

  bar.userData.colorSpeed = colorSpeed;
  return bar;
}

// Create the pyramid edges using color cycling bars
const pointA = new THREE.Vector3(0, 1, 0);
const pointB = new THREE.Vector3(-1, -1, 1);
const pointC = new THREE.Vector3(1, -1, 1);
const pointD = new THREE.Vector3(1, -1, -1);
const pointE = new THREE.Vector3(-1, -1, -1);

const edges = [
  createColorCyclingBar(pointA, pointB, 0.01),
  createColorCyclingBar(pointA, pointC, 0.02),
  createColorCyclingBar(pointA, pointD, 0.03),
  createColorCyclingBar(pointA, pointE, 0.04),
  createColorCyclingBar(pointB, pointC, 0.05),
  createColorCyclingBar(pointC, pointD, 0.06),
  createColorCyclingBar(pointD, pointE, 0.07),
  createColorCyclingBar(pointE, pointB, 0.08),
];

edges.forEach(edge => scene.add(edge));

// Update colors for the color cycling bars
function updateEdgeColors() {
  const hsl = new THREE.Color();

  edges.forEach(edge => {
    hsl.setHSL((hsl.getHSL().h + edge.userData.colorSpeed) % 1, 1, 0.5);
    edge.material.color.copy(hsl);
  });
}

// Update the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update edge colors
  updateEdgeColors();

  // Rotate the edges
  edges.forEach(edge => {
    edge.rotation.x += 0.01;
    edge.rotation.y += 0.01;
  });

  // Render the scene
  renderer.render(scene, camera);
}
