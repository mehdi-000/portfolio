"use client";
import {
  CameraControls,
  Environment,
  Loader,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Suspense,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { button, buttonGroup, Leva, useControls } from "leva";
import { DEG2RAD } from "three/src/math/MathUtils.js";
import { Vector3, Group, Euler } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Model } from "@/public/3D models/Butterfly";
import { WotwTitle } from "../../public/model/WotW_title_3D1";
import { UiButton } from "../components/UiButton copy 2";
import { LegacyLines } from "../../public/model/LegacyLines4";

function Foo() {
  const { camera } = useThree();
  camera.lookAt(0.20275228442863932, 1.7126070749008806, 0.4683586034171129);
  return null;
}

function CameraLogger({
  cameraControlsRef,
}: {
  cameraControlsRef: React.RefObject<CameraControls>;
}) {
  useFrame(() => {
    if (cameraControlsRef.current) {
      const position = new Vector3();
      const target = new Vector3();

      cameraControlsRef.current.getPosition(position);
      cameraControlsRef.current.getTarget(target);

      console.log("Camera Position:", position);
      console.log("Camera Target:", target);
    }
  });
  return null;
}

function LegacyLinsses() {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const legacyLinesRef = useRef<Group>(null!);
  /*   useGSAP(() => {
    gsap.to(legacyLinesRef.current.rotation, {
      y: "+=6.28319", // Approx. 2 * PI, a full 360-degree rotation
      duration: 2,
      ease: "linear",
      repeat: -1,
    });
  });
 */
  return (
    <>
      <LegacyLines ref={legacyLinesRef} />
      <CameraControls
        ref={cameraControlsRef}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
          wheel: 0,
        }}
      />
    </>
  );
}

export default function LegacyLine() {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const titleRef = useRef<Group>(null!);
  const [legacyLinesRef, setLegacyLinesRef] = useState<Group>(null!);
  const legacyLinesRef2 = useRef<Group>(null!);
  const [cameraRef, setCameraRef] = useState<CameraControls>(null!);
  useGSAP(() => {
    gsap.to(legacyLinesRef2?.current?.rotation, {
      y: "+=6.28319",
      duration: 2,
      ease: "linear",
      repeat: -1,
    });
  });

  const resetCamera = () => {
    if (!cameraRef) return;
    cameraRef.setTarget(
      0.20275228442863932,
      1.7126070749008806,
      0.4683586034171129,
      true
    );
  };

  const resetLegacyLines = () => {
    if (!legacyLinesRef) return;
    gsap.to(legacyLinesRef.rotation, {
      transformOrigin: "57% 63%",
      z: 0,
      y: "+=6.28319",
      duration: 2,
      ease: "linear",
      repeat: -1,
    });
    cameraControlsRef.current?.fitToBox(legacyLinesRef, false);
  };

  /*   useEffect(resetCamera, [cameraRef]); */

  useLayoutEffect(resetLegacyLines, [legacyLinesRef]);

  /*   const rotateCamera = () => {
    cameraControlsRef.current?.rotate(DEG2RAD * 0.1, 0, true);
  };
  useGSAP(() => {
    gsap.timeline({ repeat: -1, onRepeat: rotateCamera });
  }); */

  const {} = useControls({
    label: "Camera Controls",
    thetaGrp: buttonGroup({
      label: "Rotation         dasd a d as   ",
      opts: {
        "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
        "-90º": () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
      },
    }),
    lookAtLegacyLines: button(() =>
      cameraControlsRef.current?.fitToBox(legacyLinesRef, true)
    ),
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
    <>
      <div className=" flex md:h-128">
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
          camera={{
            position: [
              -0.04244707683370108, 2.42108826638258, -5.075935083882978,
            ],
          }}
        >
          <Environment preset="night" background backgroundBlurriness={0.5} />
          <CameraLogger cameraControlsRef={cameraControlsRef} />
          <CameraControls ref={cameraControlsRef} />
          <Suspense fallback={null}>
            <LegacyLines
              rotation={new Euler(0, 0)}
              ref={(ref) => setLegacyLinesRef(ref!)}
            />
          </Suspense>
        </Canvas>
        <div className="max-w-45">
          <Leva titleBar={{ drag: false }} fill />
        </div>
      </div>
      <div className=" flex md:h-128">
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
          camera={{ position: [4, 3, 8] }}
        >
          <OrbitControls />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <directionalLight />
          <ambientLight intensity={0.5} />
          <pointLight position={[-30, 0, -30]} power={10.0} />
        </Canvas>
      </div>
      <div className=" flex md:h-128">
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
          camera={{
            position: [
              -0.04244707683370108, 2.42108826638258, -7.075935083882978,
            ],
          }}
        >
          <Environment preset="night" background backgroundBlurriness={0.5} />
          <OrbitControls autoRotate autoRotateSpeed={9} />
          <Suspense fallback={null}>
            <WotwTitle ref={titleRef} />
          </Suspense>
        </Canvas>
      </div>
      <div className=" flex md:h-128">
        <UiButton picture="/pictures/buttonBackground.png" />
      </div>
    </>
  );
}
