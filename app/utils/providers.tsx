"use client";

import * as THREE from "three";

import { CameraControls } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { fragment } from "@/app/utils/fragment";
import { vertex } from "@/app/utils/vertex";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

export function Providers({ children }: { children: React.ReactNode }) {
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const tl = useRef<gsap.core.Timeline>(null);
  const isMobile = true;
  const firstLayer = useRef<HTMLDivElement | null>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const { contextSafe } = useGSAP();
  const cameraControlsRef = useRef<CameraControls>(null);
  const points = useRef<THREE.Points>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const rows = isMobile ? 8 * 24 : 16 * 24;
  const columns = isMobile ? 13 * 24 : 9 * 24;

  useEffect(() => {
    const loadedTexture = new THREE.TextureLoader().load(
      "/pictures/turqouis8Backround.png"
    );
    setTexture(loadedTexture);
  }, []);

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
  const transition = contextSafe((next: any) => {
    if (!shader.current) return;
    tl.current = gsap
      .timeline({ onComplete: next })
      .fromTo(
        firstLayer.current,
        { y: "100%" },
        {
          y: 0,
          duration: 0.1,
        }
      )
      .fromTo(
        shader.current.uniforms.uProgress,
        { value: 0 },
        { value: 1, duration: 1, ease: "slow(0.3,0.7,false)" },
        ">"
      );
  });

  const detransition = contextSafe((next: any) => {
    if (!shader.current) return;
    gsap
      .timeline({ onComplete: next })
      .fromTo(
        shader.current.uniforms.uProgress,
        { value: 1 },
        { value: -300, duration: 2.5 }
      )
      .fromTo(
        firstLayer.current,
        { y: 0 },
        {
          y: "-100%",
          duration: 0.01,
        },
        ">"
      );
  });

  return (
    <TransitionRouter
      auto={true}
      leave={(next, from, to) => {
        /*         if (to === "/#work") {
          next();
        } else { */
        transition(next);
        /*   } */
      }}
      enter={(next) => {
        detransition(next);
      }}
    >
      <main>{children}</main>

      <div
        ref={firstLayer}
        className="fixed inset-0 translate-y-full z-50 overflow-hidden"
      >
        <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
          return (
          <points ref={points}>
            <CameraControls
              distance={0.9}
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
        </Canvas>
      </div>
    </TransitionRouter>
  );
}
