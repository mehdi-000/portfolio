"use client";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CameraControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { fragment } from "@/app/utils/fragment";
import { vertex } from "@/app/utils/vertex";

export const CustomGeometryParticles = (props: any) => {
  const { shape, picture, isMobile, animDuration, camDistance, orientation } =
    props;

  const cameraControlsRef = useRef<CameraControls>(null!);
  const points = useRef<THREE.Points>(null!);
  const shader = useRef<THREE.ShaderMaterial>(null!);
  const vertices: number[] = [];
  const initPosition: number[] = [];
  const [cameraTarget, setCameraTarget] = useState<THREE.Vector3>(
    new THREE.Vector3()
  );

  useLayoutEffect(() => {
    cameraControlsRef?.current?.fitToBox(points.current, true);
  });
  useEffect(() => {
    if (cameraControlsRef.current) {
      const position = new THREE.Vector3();
      cameraControlsRef.current.getTarget(position);
      setCameraTarget(position);
    }
  }, []);

  useEffect(() => {
    if (isMobile && orientation && cameraControlsRef.current) {
      const { alpha, beta, gamma } = orientation;

      const xOffset = -(gamma || 0) * 0.3;
      const yOffset = -(beta || 0) * 0.3;

      const newPosition = new THREE.Vector3(
        cameraTarget.x + xOffset,
        cameraTarget.y + yOffset
      );

      cameraControlsRef.current.setTarget(
        newPosition.x,
        newPosition.y,
        newPosition.z,
        true
      );
    }
  }, [orientation, isMobile, cameraTarget]);

  const texture = useTexture(picture ?? "/pictures/2.png");
  const rows = isMobile ? 8 * 24 : 16 * 24;
  const columns = isMobile ? 13 * 24 : 9 * 24;

  const generateParticlePositions = () => {
    if (shape === "square") {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const x = i;
          const y = j;
          const z = 0;
          const initPositionpoints = [i, y, randFloat(0, 500)];
          vertices.push(x, y, z);
          initPosition.push(...initPositionpoints);
        }
      }
    }
    const positions = new Float32Array(vertices);
    const initPositions = new Float32Array(initPosition);

    return { positions, initPositions };
  };

  const { positions, initPositions } = generateParticlePositions();

  useGSAP(() => {
    gsap.fromTo(
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
        mouseButtons={
          isMobile
            ? { left: 0, middle: 0, right: 0, wheel: 0 }
            : { left: 4, middle: 0, right: 0, wheel: 0 }
        }
        touches={{ one: 0, three: 0, two: 0 }}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[new Float32Array(vertices), 3]}
        />
        <bufferAttribute
          attach="attributes-initPosition"
          count={initPosition.length / 3}
          array={initPositions}
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
