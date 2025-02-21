"use client";
import { Canvas } from "@react-three/fiber";
import { CustomGeometryParticles } from "@/app/components/3D/customGeometryParticles";
import { Suspense } from "react";

export const Logoanimated = ({}) => {
  return (
    <>
      <div className="h-[95%] hidden md:block">
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
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
          fallback={<div>Sorry no WebGL supported!</div>}
          shadows
          camera={{
            fov: 90,
          }}
        >
          <Suspense fallback={null}>
            <CustomGeometryParticles
              shape="square"
              picture="/pictures/7.png"
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
