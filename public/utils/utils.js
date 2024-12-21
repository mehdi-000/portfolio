const MIN_RADIUS = 7.5;
const MAX_RADIUS = 10;
const DEPTH = 10;
const LEFT_COLOR = "F7F7F7";
const RIGHT_COLOR = "FDFFFC";
const NUM_POINTS = 3300;

const randomFloat = (min, max) => Math.random() * (max - min) + min;

/**
 * --- Credit ---
 * https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
 */
const getGradientStop = (ratio) => {
  // For outer ring numbers potentially past max radius,
  // just clamp to 0
  ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

  const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * (1 - ratio)
  );
  const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * ratio
  );
  const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
  const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

  return `#${color}`;
};

loader.load("/../../public/Cart", function (gltf) {
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      sampler = new MeshSurfaceSampler(obj).build();
    }
  });

  transformMesh();
});

///// TRANSFORM MESH INTO POINTS
let sampler;
let uniforms = { mousePos: { value: new THREE.Vector3() } };
let pointsGeometry = new THREE.BufferGeometry();
const cursor = { x: 0, y: 0 };
const vertices = [];
const tempPosition = new THREE.Vector3();

function transformMesh() {
  // Loop to sample a coordinate for each points
  for (let i = 0; i < 99000; i++) {
    // Sample a random position in the model
    sampler.sample(tempPosition);
    // Push the coordinates of the sampled coordinates into the array
    vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  }

  // Define all points positions from the previously created array
  pointsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  // Define the matrial of the points
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x5c0b17,
    size: 0.1,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    sizeAttenuation: true,
    alphaMap: new THREE.TextureLoader().load("particle-texture.jpg"),
  });
  // Create the custom vertex shader injection
  pointsMaterial.onBeforeCompile = function (shader) {
    shader.uniforms.mousePos = uniforms.mousePos;

    shader.vertexShader = `
        uniform vec3 mousePos;
        varying float vNormal;
        
        ${shader.vertexShader}`.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>   
          vec3 seg = position - mousePos;
          vec3 dir = normalize(seg);
          float dist = length(seg);
          if (dist < 1.5){
            float force = clamp(1.0 / (dist * dist), -0., .5);
            transformed += dir * force;
            vNormal = force /0.5;
          }
        `
    );
  };

  // Create an instance of points based on the geometry & material
  const points = new THREE.Points(pointsGeometry, pointsMaterial);

  // Add them into the main group
  scene.add(points);
}

const calculateColor = (idx) => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = idx + MAX_RADIUS;

  const ratio = distance / maxDiff;

  const stop = getGradientStop(ratio);
  return stop;
};

export const pointsInner = Array.from(
  { length: NUM_POINTS },
  (v, k) => k + 1
).map((num) => {
  const randomRadius = randomFloat(MIN_RADIUS, MAX_RADIUS);
  const randomAngle = Math.random() * Math.PI * 2;

  const x = Math.cos(randomAngle) * randomRadius;
  const y = Math.sin(randomAngle) * randomRadius;
  const z = randomFloat(-DEPTH, DEPTH);

  const color = calculateColor(num);

  return {
    idx: num,
    position: [x, y, z],
    color,
  };
});
