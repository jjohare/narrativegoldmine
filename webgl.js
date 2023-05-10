const canvas = document.getElementById('webglCanvas');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

function setCanvasSize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const scene = new THREE.Scene();

const geometry = new THREE.ConeGeometry(1, 2, 4);
const material = new THREE.MeshBasicMaterial({color: 0x333333}); // Dark grey color
const pyramid = new THREE.Mesh(geometry, material);
scene.add(pyramid);

const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize
