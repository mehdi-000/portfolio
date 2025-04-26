"use client";

import * as THREE from "three";
import { OrbitControls, shaderMaterial, useGLTF } from "@react-three/drei";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { fragment } from "@/app/utils/fragment";
import { vertex } from "@/app/utils/vertex";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import { randFloat } from "three/src/math/MathUtils.js";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

function useButterflyGLTF() {
  if (typeof window === "undefined") {
    return { nodes: null, materials: null };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { nodes, materials } = useGLTF("/butterfly-transformed.glb");
  return { nodes, materials };
}

type sceneProps = {
  isMobile: boolean;
  rows: number;
  columns: number;
  vertices: Float32Array;
  initPosition: Float32Array;
  texture: THREE.Texture | null;
  shaderRef: any;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const firstLayer = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const rows = isMobile ? 8 * 24 : 16 * 24;
  const columns = isMobile ? 13 * 24 : 9 * 24;
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const butterflybox = useButterflyGLTF();

  const { vertices, initPosition } = useMemo(() => {
    if (typeof window === "undefined" || !butterflybox.nodes) {
      return {
        vertices: new Float32Array(0),
        initPosition: new Float32Array(0),
      };
    }

    const original = butterflybox.nodes.Curve033_2 as THREE.Mesh;
    const geometry = original.geometry.clone();
    const transform = new THREE.Matrix4()
      .makeRotationX(Math.PI / 2)
      .multiply(new THREE.Matrix4().makeScale(6, 6, 6));
    geometry.applyMatrix4(transform);
    const sampler = new MeshSurfaceSampler(new THREE.Mesh(geometry)).build();
    const count = 10000;

    const verts = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    const temp = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(temp);
      verts.set([temp.x, temp.y, temp.z], i * 3);

      const rand = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(randFloat(1, 500));
      init.set([rand.x, rand.y, rand.z], i * 3);
    }

    return { vertices: verts, initPosition: init };
  }, [butterflybox]);

  useEffect(() => {
    const tex = isMobile
      ? new THREE.TextureLoader().load("/pictures/mobileTransitionTexture.png")
      : new THREE.TextureLoader().load(
          "/pictures/desktopTransitionTexture.png"
        );
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
            { value: 1, duration: 3, ease: "slow(0.3,0.7,false)" }
          )
          .to({}, { duration: 1 });
        return () => {
          tl.kill();
        };
      }}
      enter={(next) => {
        if (!shader.current) return;
        const tl = gsap
          .timeline({ onComplete: next })
          .to({}, { duration: 1 })
          .fromTo(
            shader.current.uniforms.uProgress,
            {
              value: 1,
            },
            {
              value: 0,
              duration: 4,
              ease: "power4.in",
            }
          )
          .fromTo(
            firstLayer.current,
            { y: 0 },
            {
              y: "-100%",
              duration: 1,
              ease: "circ.inOut",
            },
            "-=2"
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
    <>
      <points>
        <OrbitControls
          distance={cameraDistance}
          autoRotate
          autoRotateSpeed={3}
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
    </>
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
