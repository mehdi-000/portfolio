"use client";

import * as THREE from "three";
import {
  CameraControls,
  OrbitControls,
  shaderMaterial,
} from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { fragment } from "@/app/utils/fragment";
import { vertex } from "@/app/utils/vertex";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import { randFloat } from "three/src/math/MathUtils.js";

type sceneProps = {
  isMobile: boolean;
  rows: number;
  columns: number;
  vertices: number[];
  initPosition: number[];
  texture: THREE.Texture | null;
  shaderRef: any;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const firstLayer = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const { contextSafe } = useGSAP();
  const [isMobile, setIsMobile] = useState(false);

  const rows = isMobile ? 8 * 24 : 16 * 24;
  const columns = isMobile ? 13 * 24 : 9 * 24;
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const generateParticlePositions = () => {
    const width = 3.2;
    const height = 1.68;
    const depth = 1.5; // add depth to make it 3D
    const spacing = 0.1; // adjust spacing as needed

    for (let x = -width / 2; x <= width / 2; x += spacing) {
      for (let y = -height / 2; y <= height / 2; y += spacing) {
        for (let z = -depth / 2; z <= depth / 2; z += spacing) {
          vertices.push(x, y, z);
          const initPositionpoints = [
            x + randFloat(0, 100),
            y + randFloat(0, 100),
            z + randFloat(0, 100),
          ];
          initPosition.push(...initPositionpoints);
        }
      }
    }
  };

  generateParticlePositions();

  useEffect(() => {
    const tex = isMobile
      ? new THREE.TextureLoader().load("/pictures/mobileTransitionTexture.png")
      : new THREE.TextureLoader().load("/pictures/turqouis8Backround.png");
    setTexture(tex);
  }, [isMobile]);

  return (
    <TransitionRouter
      leave={(next, from, to) => {
        console.log({ from, to });
        if (!shader.current) return;
        const tl = gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            firstLayer.current,
            { y: "100%" },
            {
              y: 0,
              duration: 1,
              ease: "circ.inOut",
            }
          )
          .fromTo(
            shader.current.uniforms.uProgress,
            { value: 0 },
            { value: 1, duration: 2, ease: "slow(0.3,0.7,false)" }
          );
        return () => {
          tl.kill();
        };
      }}
      enter={(next) => {
        if (!shader.current) return;
        const tl = gsap
          .timeline({ onComplete: next })
          .fromTo(
            shader.current.uniforms.uProgress,
            {
              value: 1,
            },
            { value: 0, duration: 4, ease: "power4.in" }
          )
          .fromTo(
            firstLayer.current,
            { y: 0 },
            {
              y: "-100%",
              duration: 1,
              ease: "circ.inOut",
            }
          );
        return () => {
          tl.kill();
        };
      }}
    >
      <main>{children}</main>
      <div
        ref={firstLayer}
        className="fixed inset-0 translate-y-full z-50 overflow-hidden bg-black/70 backdrop-blur-3xl"
      >
        <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
          <Scene
            isMobile={isMobile}
            rows={rows}
            columns={columns}
            vertices={vertices}
            initPosition={initPosition}
            texture={texture}
            shaderRef={shader}
          />
        </Canvas>
      </div>
    </TransitionRouter>
  );
}

const Scene = ({
  isMobile,
  rows,
  columns,
  vertices,
  initPosition,
  texture,
  shaderRef,
}: sceneProps) => {
  const { viewport } = useThree();

  const cameraDistance = isMobile
    ? Math.max(1.2, viewport.width / 10)
    : Math.max(0.9, viewport.width / 3.5);

  return (
    <points>
      <OrbitControls
        distance={cameraDistance}
        autoRotate
        autoRotateSpeed={10}
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
      <transitionMaterial
        ref={shaderRef}
        uPointSize={3}
        uTexture={texture ?? undefined}
        uNbLines={rows}
        uNbColumns={columns}
        uProgress={0}
        depthTest={false}
        depthWrite={false}
        transparent
      />
    </points>
  );
};

const TransitionMaterial = shaderMaterial(
  {
    uPointSize: 3,
    uTexture: new THREE.Texture(),
    uNbLines: 384,
    uNbColumns: 216,
    uProgress: 0,
  },
  vertex,
  fragment
);

extend({ TransitionMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    transitionMaterial: any;
  }
}
