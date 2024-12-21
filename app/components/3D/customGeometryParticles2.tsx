import * as THREE from "three";
import { useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  useGSAP(() => {
    tl.fromTo(
      shader?.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: animDuration, ease: "Power4.easeOut" }
    );
  });

  return (
    <points ref={points}>
      <CameraControls
        distance={camDistance ?? null}
        ref={cameraControlsRef}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
          wheel: 0,
        }}
      />

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

export const CustomGeometryParticles2 = ({
  picture,
  isMobile,
  animDuration,
  camDistance,
  to,
}: any) => {
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const tl = gsap.timeline({ paused: true });
  const router = useRouter();
  const container = document.body;

  const generateParticlePositions = () => {
    const buttonWidth = 3;
    const buttonHeight = 1;
    const borderRadius = 0.2;
    const spacing = 0.009;

    for (let x = -buttonWidth / 2; x <= buttonWidth / 2; x += spacing) {
      for (let y = -buttonHeight / 2; y <= buttonHeight / 2; y += spacing) {
        const isWithinRoundedCorner =
          Math.abs(x) > buttonWidth / 2 - borderRadius &&
          Math.abs(y) > buttonHeight / 2 - borderRadius &&
          Math.hypot(
            Math.abs(x) - (buttonWidth / 2 - borderRadius),
            Math.abs(y) - (buttonHeight / 2 - borderRadius)
          ) > borderRadius;

        if (!isWithinRoundedCorner) {
          vertices.push(x, y, 0);
          const initPositionpoints = [x, y, randFloat(0, 200)];
          initPosition.push(...initPositionpoints);
        }
      }
    }
  };

  generateParticlePositions();

  const handlePointerEnter = () => {
    tl.play();
    container.style.cursor = "pointer";
  };

  const handlePointerLeave = () => {
    tl.reverse(0.3);
    container.style.cursor = "auto";
  };

  return (
    <div className="relative self-start w-[9.5rem] h-[4.2rem]">
      <div className="absolute inset-0 z-10">
        <Canvas
          onPointerEnter={() => handlePointerEnter()}
          onPointerLeave={() => handlePointerLeave()}
          onClick={() => router.push(to)}
        >
          <Particles
            picture={picture}
            isMobile={isMobile}
            animDuration={animDuration}
            camDistance={camDistance}
            vertices={vertices}
            initPosition={initPosition}
            tl={tl}
          />
        </Canvas>
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
        <button
          className={
            "font-semibold px-[4.5rem] bg-zinc-950/50 backdrop-blur-md py-6 rounded-xl text-white/90 border-2 border-white/10 glow:ring-1 glow:border-glow glow:ring-glow glow:text-glow/[.80]"
          }
        ></button>
        <Link className="absolute z-10 pointer-events-none" href="/wotw">
          Learn more
        </Link>
      </div>
    </div>
  );
};
