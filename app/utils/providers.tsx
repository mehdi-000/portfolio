"use client";

import * as THREE from "three";

import { CameraControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { fragment } from "@/app/utils/fragment";
import { vertex } from "@/app/utils/vertex";
import { useRef } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

const Particles = ({
  picture,
  isMobile,
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
      { value: 1, duration: 1, ease: "slow(0.3,0.7,false)" }
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

export function Providers({ children }: { children: React.ReactNode }) {
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const tl = gsap.timeline({ paused: true });
  const isMobile = true;
  const firstLayer = useRef<HTMLDivElement | null>(null);

  const generateParticlePositions = () => {
    const buttonWidth = 3.2;
    const buttonHeight = 1.68;
    const spacing = 0.002;

    for (let x = -buttonWidth / 2; x <= buttonWidth / 2; x += spacing) {
      for (let y = -buttonHeight / 2; y <= buttonHeight / 2; y += spacing) {
        vertices.push(x, y, 0);
        const initPositionpoints = [x, y, randFloat(0, 200)];
        initPosition.push(...initPositionpoints);
      }
    }
  };
  generateParticlePositions();

  return (
    <TransitionRouter
      auto={true}
      leave={(next, from, to) => {
        console.log({ from, to });

        const tl2 = gsap.timeline({}).fromTo(
          firstLayer.current,
          { display: "none" },
          {
            display: "block",
            duration: 0.1,
          }
        );
        tl.play();
        tl.eventCallback("onComplete", next);
        return () => {
          tl2.kill();
        };
      }}
      enter={(next) => {
        const tl2 = gsap.timeline().fromTo(
          firstLayer.current,
          { display: "block" },
          {
            display: "none",
            duration: 2.3,
          }
        );

        tl.reverse();
        tl.call(next);
        return () => {
          tl2.kill();
        };
      }}
    >
      <main>{children}</main>

      <div
        ref={firstLayer}
        className="fixed inset-0 z-50 hidden overflow-hidden"
      >
        <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
          <Particles
            picture={"/pictures/buttonBackground.png"}
            isMobile={isMobile}
            camDistance={0.9}
            vertices={vertices}
            initPosition={initPosition}
            tl={tl}
          />
        </Canvas>
      </div>
    </TransitionRouter>
  );
}
