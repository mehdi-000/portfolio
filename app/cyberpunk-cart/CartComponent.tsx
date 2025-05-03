"use client";
import { Model } from "@/public/model/Cart_portfolio";
import { CameraControls, Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { button, buttonGroup, Leva, useControls } from "leva";
import { DEG2RAD } from "three/src/math/MathUtils.js";
import { Group, Object3DEventMap } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const CartComponent = ({}) => {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const carRef = useRef<Group<Object3DEventMap>>(null!);

  const rotateCamera = () => {
    cameraControlsRef.current?.rotate(DEG2RAD * 0.1, 0, true);
  };
  useGSAP(() => {
    gsap.timeline({ repeat: -1, onRepeat: rotateCamera });
  });

  const {} = useControls({
    label: "Camera Controls",
    thetaGrp: buttonGroup({
      label: "Rotation         dasd a d as   ",
      opts: {
        "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
        "-90º": () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
      },
    }),
    lookAtMotor: button(() =>
      cameraControlsRef.current?.setLookAt(
        0.0579922388379204,
        2.1150204071489074,
        5.505339191410302,
        0,
        0,
        0,
        true
      )
    ),
    lookAtBack: button(() =>
      cameraControlsRef.current?.setLookAt(
        0.2044339892201191,
        4.5409846797824835,
        9.58638195698657,
        0,
        0,
        0,
        true
      )
    ),
    lookAtFrontFar: button(() =>
      cameraControlsRef.current?.setLookAt(
        8.067032997772627,
        6.368051718744217,
        -16.081155073706547,
        0,
        0,
        0,
        true
      )
    ),
    lookAtFrontClose: button(() =>
      cameraControlsRef.current?.setLookAt(
        -0.035388982419012616,
        3.5940952123596013,
        -6.536212373813296,
        0,
        0,
        0,
        true
      )
    ),
    lookAtSteeringWheel: button(() =>
      cameraControlsRef.current?.setLookAt(
        0.10127984009380323,
        4.419742668356005,
        -4.9446771394733755,
        0,
        0,
        0,
        true
      )
    ),
    lookAtBackleft: button(() =>
      cameraControlsRef.current?.setLookAt(
        -2.6943185646935865,
        0.8278881406833074,
        8.004120549471846,
        0,
        0,
        0,
        true
      )
    ),

    lookAtRightMiddle: button(() =>
      cameraControlsRef.current?.setLookAt(
        6.54559743461848,
        3.3205228194221283,
        -1.488184186509365,
        0,
        0,
        0,
        true
      )
    ),
  });
  return (
    <div className="flex md:flex-row flex-col md:h-128 rounded-xl overflow-hidden h-full w-full">
      <Canvas
        fallback={<div>Sorry no WebGL supported!</div>}
        camera={{ position: [4, 3, 8] }}
      >
        <CameraControls
          ref={cameraControlsRef}
          mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
          touches={{ one: 0, three: 0, two: 0 }}
        />
        <Environment preset="apartment" background backgroundBlurriness={0.5} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model ref={carRef} />
        </Suspense>
        <gridHelper position={-0.5} args={[50, 50, 0xc977c7, "teal"]} />
      </Canvas>
      <div className="md:max-w-45 md:pt-0 md:pl-2 pt-2">
        <Leva titleBar={{ drag: false }} fill />
      </div>
    </div>
  );
};
export default CartComponent;
