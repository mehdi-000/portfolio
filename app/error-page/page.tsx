"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text3D,
  useGLTF,
  Text,
  RoundedBox,
  Outlines,
  Edges,
} from "@react-three/drei";
import { Float } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { useTransitionRouter } from "next-transition-router";

export default function ErrorPage() {
  const [cursorStyle, setCursorStyle] = useState<React.CSSProperties>({
    cursor: "default",
  });

  return (
    <>
      <div className="w-screen h-screen">
        <Canvas
          style={cursorStyle}
          fallback={<div>Sorry no WebGL supported!</div>}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight />
          <Model setCursorStyle={setCursorStyle} />
        </Canvas>
      </div>
    </>
  );
}

function Model({
  setCursorStyle,
}: {
  setCursorStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}) {
  const { viewport } = useThree();
  const { nodes } = useGLTF("/404_broken_glass_separated.glb");
  const ref = useRef<THREE.Mesh>(null);
  const isMobile = viewport.width < 10;
  const mesh = useRef<THREE.Mesh | null>(null);
  const router = useTransitionRouter();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.geometry.computeBoundingBox();
    const boundingBox = ref.current.geometry.boundingBox;
    const center = new THREE.Vector3();
    if (boundingBox) boundingBox.getCenter(center);
    ref.current.geometry.translate(-center.x, -center.y, -center.z);
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  const curveGeometries = [
    "Curve",
    isMobile ? "Curve001" : null,
    "Curve002",
    "Curve003",
    "Curve004",
    "Curve005",
    "Curve006",
    "Curve007",
    "Curve008",
    "Curve009",
    "Curve010",
    "Curve012",
    "Curve013",
  ].filter((curve): curve is string => curve !== null);

  return (
    <>
      <RoundedBox
        ref={mesh}
        args={isMobile ? [11, 24, 1] : [24, 11, 1]}
        radius={0.4}
        position={[0, -1, -15]}
        scale={viewport.width * (isMobile ? 0.2 : 0.12)}
      >
        <meshBasicMaterial color="#18181b" />
        <Edges linewidth={2} threshold={15} color={"white"} />
        <Outlines thickness={0.1} color={"#242129"} />
        <Text
          font="/Inter-Regular.woff"
          fontSize={0.4}
          fontWeight={400}
          position={isMobile ? [-4, 10, 1] : [-10, 4, 1]}
          color={"gray"}
        >
          Lost
        </Text>
        <Text
          font="/Inter_24pt-Bold.woff"
          fontSize={0.8}
          position={isMobile ? [-1.6, 9.3, 1] : [-7.6, 3.4, 1]}
          color={"white"}
        >
          Page not found
        </Text>
        <Text
          font="/CodeSaver-Regular.woff"
          fontSize={0.38}
          onPointerEnter={() => setCursorStyle({ cursor: "pointer" })}
          onPointerLeave={() => setCursorStyle({ cursor: "default" })}
          onClick={() => router.push("/")}
          color="#d487d2"
          position={isMobile ? [-2, 14, 1] : [-2, 6, 1]}
        >
          work
        </Text>
        <Text
          font="/CodeSaver-Regular.woff"
          fontSize={0.38}
          onPointerEnter={() => setCursorStyle({ cursor: "pointer" })}
          onPointerLeave={() => setCursorStyle({ cursor: "default" })}
          onClick={() => router.push("/")}
          color="#d487d2"
          position={isMobile ? [-0.2, 14, 1] : [-0.2, 6, 1]}
        >
          experience
        </Text>
        <Text
          font="/CodeSaver-Regular.woff"
          fontSize={0.38}
          onPointerEnter={() => setCursorStyle({ cursor: "pointer" })}
          onPointerLeave={() => setCursorStyle({ cursor: "default" })}
          onClick={() => router.push("/")}
          color="#d487d2"
          position={isMobile ? [2, 14, 1] : [2, 6, 1]}
        >
          contact
        </Text>
      </RoundedBox>
      <group
        scale={viewport.width * (isMobile ? 7.5 : 10)}
        position={[0, 0, 0]}
        dispose={null}
      >
        {curveGeometries.map((curve, index) => (
          <Float
            key={index}
            speed={0.5}
            rotationIntensity={0.015}
            floatIntensity={0.015}
          >
            <mesh
              geometry={(nodes[curve] as THREE.Mesh).geometry}
              position={[0, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={isMobile ? [1, 1, 5] : [1, 1, 1]}
            >
              <MeshTransmissionMaterial
                background={new THREE.Color("#e3bce2")}
                samples={10}
                resolution={2048}
                thickness={3}
                ior={1.6}
                chromaticAberration={0.4}
                anisotropy={0.5}
                distortionScale={0.5}
                temporalDistortion={0.5}
                clearcoat={0.8}
                attenuationColor={3}
                color={"#e3bce2"}
              />
            </mesh>
          </Float>
        ))}
      </group>
      <Text3D
        scale={viewport.width * 0.2}
        ref={ref}
        position={isMobile ? [0, 0, -6] : [0, -1, -6]}
        letterSpacing={-0.06}
        size={1}
        font="/Inter_Regular.json"
      >
        404
      </Text3D>
    </>
  );
}

useGLTF.preload("/404_broken_glass_separated.glb");
