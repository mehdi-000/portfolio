"use client";
import { Model } from "@/public/model/Cart";
import { CameraControls, Environment, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { button, buttonGroup, Leva, useControls } from "leva";
import { DEG2RAD } from "three/src/math/MathUtils.js";
import { Vector3 } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const CartComponent = ({}) => {
  const cameraControlsRef = useRef<CameraControls>(null!);

  const rotateCamera = () => {
    cameraControlsRef.current?.rotate(DEG2RAD * 0.1, 0, true);
  };
  useGSAP(() => {
    gsap.timeline({ repeat: -1, onRepeat: rotateCamera });
  });

  const logCameraState = () => {
    if (cameraControlsRef.current) {
      const position = new Vector3();
      const target = new Vector3();

      cameraControlsRef.current.getPosition(position);
      cameraControlsRef.current.getTarget(target);

      console.log("Camera Position:", position);
      console.log("Camera Target:", target);
    }
  };

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
    lookAtFrontmiddle: button(() =>
      cameraControlsRef.current?.setLookAt(
        -0.7132135467136171,
        8.49572518014102,
        -14.673315379064977,
        0,
        0,
        0,
        true
      )
    ),
    lookAtTop: button(() =>
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
        6.004120549471846,
        0,
        0,
        0,
        true
      )
    ),

    lookAtRightMiddle: button(() =>
      cameraControlsRef.current?.setLookAt(
        5.54559743461848,
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
    <div className=" flex md:h-128">
      <Canvas camera={{ position: [4, 3, 8] }}>
        <CameraControls
          ref={cameraControlsRef}
          mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
        />
        <Environment preset="night" background backgroundBlurriness={0.5} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <gridHelper position={-0.5} args={[50, 50, 0xc977c7, "teal"]} />
      </Canvas>
      <div className="max-w-45">
        <Leva titleBar={{ drag: false }} fill />
      </div>
    </div>
  );
};
