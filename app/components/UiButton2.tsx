"use client";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { CameraControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { useTransitionRouter } from "next-transition-router";
import Link from "next/link";
import { cn } from "@/app/utils/tailwind";

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
    tl.current = gsap
      .timeline({ paused: true })
      .fromTo(
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
        touches={{ one: 0, three: 0, two: 0 }}
      />

      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
          args={[new Float32Array(vertices), 3]}
        />
        <bufferAttribute
          attach="attributes-initPosition"
          count={initPosition.length / 3}
          array={new Float32Array(initPosition)}
          itemSize={3}
          args={[new Float32Array(initPosition), 3]}
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

export const UiButton2 = ({
  picture,
  isMobile,
  animDuration,
  camDistance,
  to,
  className,
  hovered,
}: any) => {
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const tl = useRef<gsap.core.Timeline>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const router = useTransitionRouter();

  useEffect(() => {
    if (hovered) {
      if (tl.current) tl.current.play();
    } else {
      if (tl.current) tl.current.reverse(0.3);
    }
  }, [hovered]);

  useEffect(() => {
    setContainer(document.body);
  }, []);

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

  return (
    <div
      className={cn(
        "relative self-end w-100 h-8 rounded-lg overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 z-10">
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
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
          className={"font-light px-[4.5rem] rounded-xl text-white/90"}
        ></button>
        <Link
          className="absolute z-10 pointer-events-none text-xs"
          href="/wotw"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};
