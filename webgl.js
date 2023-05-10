// A helper function to create a WebGL context
function createContext(canvas) {
  const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!context) {
    throw new Error('WebGL not supported');
  }
  return context;
}

// A helper function to create a WebGL shader
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
  }

  return shader;
}

// A helper function to create a WebGL program
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
  }

  return program;
}

const canvas = document.getElementById('webgl-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = createContext(canvas);
gl.clearColor(0.5, 1.0, 0.5, 1.0);
gl.enable(gl.DEPTH_TEST);

const vertexShaderSource = `
  attribute vec4 coordinates;
  uniform mat4 u_transform;
  void main() {
    gl_Position = u_transform * coordinates;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
  }
`;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);

const vertices = new Float32Array([
  0.0, -0.5, -0.5,
  0.0,  0.5,  0.0,
  0.5, -0.5,  0.5,
  -0.5, -0.5,  0.5
]);

const indices = new Uint16Array([
  2, 1, 3,
  3, 1, 0,
  0, 1, 2,
  0, 2, 3
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

constindexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

const coordinates = gl.getAttribLocation(program, 'coordinates');
gl.vertexAttribPointer(coordinates, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coordinates);

const transformUniformLocation = gl.getUniformLocation(program, 'u_transform');
let rotationAngle = 0;

function animate() {
  rotationAngle += 0.01;
  const transform = new Float32Array([
    Math.cos(rotationAngle), 0, Math.sin(rotationAngle), 0,
    0, 1, 0, 0,
    -Math.sin(rotationAngle), 0, Math.cos(rotationAngle), 0,
    0, 0, 0, 1
  ]);

  gl.uniformMatrix4fv(transformUniformLocation, false, transform);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  requestAnimationFrame(animate);
}

animate();

