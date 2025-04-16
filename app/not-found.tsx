"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { Text3D, useGLTF, Text, Center } from "@react-three/drei";
import { Float } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function useBreakpoints() {
  const { width } = useThree((state) => state.viewport);
  return {
    isMobile: width < 6,
    isTablet: width >= 6 && width < 10,
    isDesktop: width >= 10,
    width,
  };
}

export default function NotFound() {
  const [cursorStyle, setCursorStyle] = useState<React.CSSProperties>({
    cursor: "default",
  });

  return (
    <div className="w-screen h-screen">
      <Canvas
        style={cursorStyle}
        fallback={<div>Sorry no WebGL supported!</div>}
      >
        <color attach="background" args={["#000000"]} />
        <Model setCursorStyle={setCursorStyle} />
      </Canvas>
    </div>
  );
}

function Model({
  setCursorStyle,
}: {
  setCursorStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}) {
  const { nodes } = useGLTF("/404_broken_glass_separated.glb");
  const ref = useRef<THREE.Mesh>(null);
  const mesh = useRef<THREE.Mesh | null>(null);
  const router = useRouter();
  const workRef = useRef<HTMLAnchorElement | null>(null);
  const experienceRef = useRef<HTMLAnchorElement | null>(null);
  const skillsRef = useRef<HTMLAnchorElement | null>(null);
  const { contextSafe } = useGSAP();
  const { isMobile, isTablet, width } = useBreakpoints();

  const curveGeometries = [
    "Curve",
    isMobile ? "Curve001" : null,
    "Curve002",
    "Curve003",
    isMobile ? null : "Curve004",
    "Curve004",
    "Curve005",
    "Curve006",
    "Curve007",
    "Curve008",
    "Curve009",
    isMobile ? "Curve010" : "Curve010",
    isMobile ? null : "Curve012",
    "Curve013",
  ].filter((curve): curve is string => curve !== null);

  const handleHover = contextSafe((element: HTMLAnchorElement | null) => {
    setCursorStyle({ cursor: "pointer" });
    if (element) {
      gsap.to(element, {
        fontSize: isMobile ? 0.28 : 0.37,
        duration: 0.3,
        ease: "power1.out",
        color: isMobile ? "#c23e91" : "#33c4c0",
      });
    }
  });

  const handleHoverOut = contextSafe((element: HTMLAnchorElement | null) => {
    setCursorStyle({ cursor: "default" });
    if (element) {
      gsap.to(element, {
        fontSize: isMobile ? 0.27 : 0.36,
        duration: 0.3,
        ease: "power1.out",
        color: "#ffffff",
      });
    }
  });

  return (
    <>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
      </mesh>
      <Text
        ref={workRef}
        font="/PPMonumentExtendedBlack.woff"
        fontSize={isMobile ? 0.27 : 0.36}
        color={"white"}
        position={isMobile ? [-2, 6.7, -5] : [-4.6, 6.7, -5]}
        onPointerEnter={() => {
          handleHover(workRef.current);
        }}
        onPointerLeave={() => {
          handleHoverOut(workRef.current);
        }}
        onClick={() => router.push("/#work")}
      >
        work
      </Text>
      <Text
        ref={experienceRef}
        font="/PPMonumentExtendedBlack.woff"
        fontSize={isMobile ? 0.27 : 0.36}
        color={"white"}
        position={isMobile ? [0.2, 6.7, -5] : [0, 6.7, -5]}
        onPointerEnter={() => {
          handleHover(experienceRef.current);
        }}
        onPointerLeave={() => {
          handleHoverOut(experienceRef.current);
        }}
        onClick={() => router.push("/#experience")}
      >
        experience
      </Text>
      <Text
        ref={skillsRef}
        font="/PPMonumentExtendedBlack.woff"
        fontSize={isMobile ? 0.27 : 0.36}
        color={"white"}
        position={isMobile ? [2.4, 6.7, -5] : [4.6, 6.7, -5]}
        onPointerEnter={() => handleHover(skillsRef.current)}
        onPointerLeave={() => handleHoverOut(skillsRef.current)}
        onClick={() => router.push("/#contact")}
      >
        skills
      </Text>

      <group
        scale={width * (isMobile ? 6 : isTablet ? 8 : 10)}
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
                background={
                  isMobile
                    ? new THREE.Color("#f22e8d")
                    : new THREE.Color("#ab2668")
                }
                samples={32}
                resolution={1024}
                thickness={1.8}
                ior={1.45}
                chromaticAberration={0.1}
                anisotropy={0.3}
                distortion={0.1}
                distortionScale={0.1}
                temporalDistortion={0.05}
                clearcoat={1}
                attenuationDistance={1}
                attenuationColor={new THREE.Color("#00ffff")}
                color={isMobile ? "#f22e8d" : "#26abab"}
                roughness={0.1}
              />
            </mesh>
          </Float>
        ))}
      </group>
      <Center disableZ position={[0, 0, -4]}>
        <Float speed={0.8} rotationIntensity={1} floatIntensity={1}>
          <Text3D
            scale={width * (isMobile ? 0.3 : isTablet ? 0.25 : 0.2)}
            ref={ref}
            letterSpacing={-0.06}
            size={1}
            font="/Heebo_SemiBold.json"
          >
            404
          </Text3D>
        </Float>
      </Center>
    </>
  );
}

useGLTF.preload("/404_broken_glass_separated.glb");
