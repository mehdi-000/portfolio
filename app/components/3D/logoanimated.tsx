"use client";
import { Canvas } from "@react-three/fiber";
import { CustomGeometryParticles } from "@/app/components/3D/customGeometryParticles";
import { Suspense, useEffect, useState } from "react";
import { useDeviceOrientation } from "../hooks/useDeviceOrientation";
import { Toggle } from "../toogle";

export const Logoanimated = ({}) => {
  const handleLogoTouch = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  const { orientation, requestAccess, revokeAccess, error } =
    useDeviceOrientation();

  const onChange = (toggleState: boolean): void => {
    const result = toggleState ? requestAccess() : revokeAccess();
  };

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
              picture="/pictures/desktopLogo.png"
              animDuration={5}
            />
          </Suspense>

          <directionalLight />
          <pointLight position={[-30, 0, -30]} power={10.0} />
        </Canvas>
      </div>
      <Toggle onChange={onChange} />
      <div className="h-5/6 block md:hidden" onTouchStart={handleLogoTouch}>
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
          shadows
          camera={{
            fov: 90,
          }}
        >
          <Suspense fallback={null}>
            <CustomGeometryParticles
              orientation={orientation}
              shape="square"
              picture="/pictures/mobileLogo.png"
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
