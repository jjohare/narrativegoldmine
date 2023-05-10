const canvas = document.getElementById('webgl-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

gl.clearColor(0.5, 1.0, 0.5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.viewport(0, 0, canvas.width, canvas.height);

const vertexShaderSource = `
  attribute vec4 coordinates;
  void main() {
    gl_Position = coordinates;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

gl.useProgram(shaderProgram);

const vertices = [
  0.0, -0.25, -0.50,
  0.0,  0.25,  0.00,
  0.5, -0.25,  0.25,
  -0.5, -0.25,  0.25
];

const indices = [
  2, 1, 3,
  3, 1, 0,
  0, 1, 2,
  0, 2, 3
];

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

const coordinates = gl.getAttribLocation(shaderProgram, 'coordinates');
gl.vertexAttribPointer(coordinates, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coordinates);

function animate() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  requestAnimationFrame(animate);
}

animate();
