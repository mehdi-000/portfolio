"use client";
import * as THREE from "three";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { use, useEffect, useRef, useState } from "react";
import { CustomGeometryParticles } from "./customGeometryParticles";
import { Orbit } from "next/font/google";
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";

import { Sphere } from "@react-three/drei";

import { Suspense } from "react";

import { useTexture } from "@react-three/drei";
import { randFloat } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const Logoanimated = ({}) => {
  return (
    <>
      <div className="h-[95%] hidden md:block">
        <Canvas
          shadows
          camera={{
            fov: 90,
          }}
        >
          <Suspense fallback={null}>
            <CustomGeometryParticles
              fitToBox
              shape="square"
              picture="/pictures/2.png"
              animDuration={5}
            />
          </Suspense>

          <directionalLight />
          <pointLight position={[-30, 0, -30]} power={10.0} />
        </Canvas>
      </div>
      <div className="h-5/6  block md:hidden">
        <Canvas
          shadows
          camera={{
            fov: 90,
          }}
        >
          <Suspense fallback={null}>
            <CustomGeometryParticles
              shape="square"
              picture="/pictures/7cropped.png"
              isMobile
              fitToBox
            />
          </Suspense>

          <directionalLight />
          <pointLight position={[-30, 0, -30]} power={10.0} />
        </Canvas>
      </div>
    </>
  );
};
