import * as THREE from "three";
import { useRef } from "react";
import { CameraControls, Environment, OrbitControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonGroup, Leva, useControls } from "leva";

const fragment = `
  uniform sampler2D uTexture;
  varying vec2 vTextureCoords;
  uniform float uNbLines;
  uniform float uNbColumns;
  uniform float uProgress;

  float circle(vec2 uv, float border) {
    float radius = 0.5;
    float dist = radius -distance(uv, vec2(0.5));
    return smoothstep(0.0, border, dist);
  }
    void main() {
        vec2 uv = gl_PointCoord;
        uv.y = -1.;
        uv /= vec2(uNbLines, uNbColumns);
        float textOffsetU = vTextureCoords.x / uNbLines;
        float textOffsetV = vTextureCoords.y / uNbColumns;
        uv += vec2(textOffsetU, textOffsetV);
        vec4 textureColor = texture2D(uTexture, uv);

        textureColor.a *= uProgress;
        gl_FragColor = textureColor;
    /*     if (gl_FragColor.r < 0.03) discard; */

        gl_FragColor.a*= circle(gl_PointCoord, 0.2);
    }
    `;
const vertex = `
    uniform float uPointSize;
    
    varying vec2 vTextureCoords;

    attribute vec3 initPosition;

    uniform float uProgress;
    
    void main() {
        #include <begin_vertex>

        transformed = initPosition + ((position - initPosition) * uProgress);

        #include <project_vertex>
    
        gl_PointSize = uPointSize;

        vTextureCoords = position.xy;
    }
    `;

const Particles = ({
  picture,
  isMobile,
  animDuration,
  camDistance,
  vertices,
  initPosition,
  tl,
}: any) => {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const points = useRef<THREE.Points>(null!);
  const shader = useRef<THREE.ShaderMaterial>(null!);

  const texture = useTexture(picture ?? "/pictures/2.png");
  const rows = isMobile ? 8 * 24 : 16 * 24;
  const columns = isMobile ? 13 * 24 : 9 * 24;

  // Leva control for progress
  const { progress } = useControls("Particle Controls", {
    progress: { value: 0, min: 0, max: 1, step: 0.01 },
  });

  // Update shader uniform with Leva value
  if (shader.current) {
    shader.current.uniforms.uProgress.value = progress;
  }

  useGSAP(() => {
    tl.fromTo(
      shader?.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 4, ease: "Power4.easeOut" }
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-initPosition"
          count={initPosition.length / 3}
          array={new Float32Array(initPosition)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#5786F5"
        sizeAttenuation
        depthWrite={false}
      />
      <shaderMaterial
        ref={shader}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={{
          uPointSize: { value: 3 },
          uTexture: { value: texture },
          uNbLines: { value: rows },
          uNbColumns: { value: columns },
          uProgress: { value: 0 },
        }}
        depthTest={false}
        depthWrite={false}
        transparent
      />
    </points>
  );
};

export const UiButton = ({
  picture,
  isMobile,
  animDuration,
  camDistance,
  to,
}: any) => {
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const tl = gsap.timeline();

  const generateParticlePositions = () => {
    const buttonWidth = 3;
    const buttonHeight = 1;
    const borderRadius = 0.2;
    const spacing = 0.009;
    const count = 1000000;

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 2;
      let y = (Math.random() - 0.5) * 2;
      let z = (Math.random() - 0.5) * 2;

      vertices.push(x, y, z);
      const initPositionpoints = [
        randFloat(0, 200),
        randFloat(0, 200),
        randFloat(0, 200),
      ];
      initPosition.push(...initPositionpoints);
    }
    const positions = new Float32Array(vertices);
    const initPositions = new Float32Array(initPosition);

    return { positions, initPositions };
  };

  const { positions, initPositions } = generateParticlePositions();

  return (
    <div className="relative w-full">
      <Canvas>
        <OrbitControls />
        <Environment preset="apartment" backgroundBlurriness={0.5} />
        <Particles
          picture={picture}
          isMobile={isMobile}
          animDuration={animDuration}
          camDistance={camDistance}
          vertices={initPositions}
          initPosition={positions}
          tl={tl}
        />
      </Canvas>
      <Leva fill />
    </div>
  );
};
