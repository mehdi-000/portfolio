"use client";
import { Canvas } from "@react-three/fiber";
import { CustomGeometryParticles } from "@/app/components/3D/customGeometryParticles";
import { Suspense, useEffect } from "react";
import { Toggle } from "@/app/components/toogle";
import { useDeviceOrientationContext } from "@/app/components/hooks/DeviceOrientationContext";
import { useDeviceOrientation } from "@/app/components/hooks/useDeviceOrientation";

export const Logoanimated = ({}) => {
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
              picture="/pictures/nobackground.png"
              animDuration={5}
            />
          </Suspense>

          <directionalLight />
          <pointLight position={[-30, 0, -30]} power={10.0} />
        </Canvas>
      </div>
      <div className="h-5/6 block md:hidden">
        <Toggle onChange={onChange} />
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
