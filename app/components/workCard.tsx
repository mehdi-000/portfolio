"use client";
import { useEffect, useState, useRef, Ref, use } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./workCard.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Vector3 } from "three";
import { UiButton2 } from "@/app/components/UiButton2";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs, TbBrandTypescript } from "react-icons/tb";
import { SiSass } from "react-icons/si";

type WorkCardProps = {
  model: any;
  heading: string;
  title: string;
  description: string;
  buttonLink: string;
  time: string;
  type: string;
  autorotate?: boolean;
};

export const WorkCard = ({
  model: Model,
  heading,
  title,
  description,
  buttonLink,
  autorotate,
  time,
  type,
}: WorkCardProps) => {
  const glowCaptureRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<any>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [loadModel, setLoadModel] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) {
      setLoadModel(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadModel(true);
        if (isMobile && modelRef.current) {
          gsap.fromTo(
            modelRef.current?.scale,
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 1, z: 1 }
          );
        }
        observer.disconnect();
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  });
  const CameraController = () => {
    const { camera, pointer } = useThree();

    useFrame(() => {
      camera.position.x += pointer.x * 2 - camera.position.x;
      camera.position.y += -pointer.y * 2 - camera.position.y;
      camera.lookAt(0, 1, 0);
    });

    return null;
  };

  const DynamicModel = dynamic(() => import(`@/public/model/${Model}`));

  const { contextSafe } = useGSAP();

  const hover = contextSafe(() => {
    if (isMobile) return;
    tl.current = gsap
      .timeline()
      .fromTo(
        modelRef.current?.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      );
    /*       .to(modelRef.current?.rotation, { y: 2 * Math.PI }, "<"); */
  });

  const unhover = contextSafe(() => {
    if (isMobile) return;
    tl.current?.reverse();
  });

  useEffect(() => {
    if (!glowCaptureRef.current || isMobile) return;
    const refElement = glowCaptureRef.current;
    const clonedChild = refElement.children[0].cloneNode(true);
    const overlay = refElement.querySelector(".glow-overlay");
    overlay?.appendChild(clonedChild);

    refElement?.addEventListener("mousemove", (event) => {
      const x = event.pageX - refElement.offsetLeft;
      const y = event.pageY - refElement.offsetTop;

      const overlayElement = overlay as HTMLElement;
      overlayElement.style.setProperty("--glow-x", `${x}px`);
      overlayElement.style.setProperty("--glow-y", `${y}px`);
      overlayElement.style.setProperty("--glow-opacity", "1");
    });

    refElement?.addEventListener("mouseleave", () => {
      const overlayElement = overlay as HTMLElement;
      overlayElement.style.setProperty("--glow-opacity", "0");
    });
  });
  return (
    <div className="flex flex-grow my-4 md:my-6 max-w-[443px] max-h-[476px]">
      <div
        ref={glowCaptureRef}
        className="relative h-full w-full glow-capture text-white"
        onMouseEnter={hover}
        onMouseLeave={unhover}
      >
        <div
          className="glow:bg-glow/[.20]"
          style={{ "--glow-color": "#2f4ad4" }}
        >
          <div
            className="relative justify-center [box-shadow:0_-10px_50px_-10px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] flex flex-col items-center bg-gradient-to-br from-purple-800/5 to-cyan-400/5 backdrop-blur-md pt-4 px-4 rounded-2xl shadow-lg border border-gray-800 text-white w-full mx-auto group glow glow:ring-1 glow:border-glow glow:ring-glow overflow-visible"
            style={{ "--glow-color": "#389fd6" }}
          >
            <div className="flex flex-col w-full">
              <h2
                className="text-2xl md:text-3xl font-bold text-center tracking-tight glow:text-glow/[.20] px-2"
                style={{ "--glow-color": "#2f4ad4" }}
              >
                {title}
              </h2>
              <div className="flex flex-col justify-center items-center w-full gap-4 mt-3">
                <div className="group w-full md:w-3/4 rounded-xl p-4 flex flex-col items-center justify-center">
                  <div
                    className="flex justify-center text-opacity-90 glow:text-glow/[.80]"
                    style={{ "--glow-color": "#389fd6" }}
                    ref={ref}
                  >
                    <div className="md:max-w-52 max-w-36 h-40">
                      <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 h-52 z-50">
                        <Canvas
                          fallback={<div>Sorry no WebGL supported!</div>}
                          camera={{
                            position: [
                              -0.04244707683370108, 2.42108826638258,
                              -10.075935083882978,
                            ],
                          }}
                        >
                          <CameraController />
                          <OrbitControls
                            target={
                              new Vector3(
                                0.20275228442863932,
                                1.7126070749008806,
                                0.4683586034171129
                              )
                            }
                          />
                          {loadModel ? (
                            <DynamicModel
                              // @ts-ignore
                              ref={modelRef}
                              disableMobileScaling
                              scale={[0, 0, 0]}
                            />
                          ) : null}
                          <ambientLight intensity={0.5} />
                          <Environment
                            preset="apartment"
                            backgroundBlurriness={0.5}
                          />
                        </Canvas>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                  <p
                    className="text-gray-300 text-xs md:text-sm translate-y-12 transition-transform duration-500 ease-in-out group-hover:translate-y-0 mt-1 glow:text-glow/[.80] font-heebo text-center px-3"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    {description}
                  </p>
                  <div className="flex gap-2 my-2 transform transition-transform duration-500 ease-in-out translate-y-12 group-hover:translate-y-0 flex-wrap justify-center">
                    <span className="flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-full text-xs">
                      <div className="text-white" /> Next.js
                    </span>
                    <span className="flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-full text-xs">
                      <FaReact className="text-blue-400" /> React
                    </span>
                    <span className="flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-full text-xs">
                      <TbBrandTypescript className="text-blue-500" /> TypeScript
                    </span>
                    <span className="flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-full text-xs">
                      <SiSass className="text-pink-400" /> Sass
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex ml-3 m-1 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <div
                  className="flex justify-end"
                  style={{ "--glow-color": "#3d2fd4" }}
                >
                  <UiButton2
                    picture="/pictures/turqouis8Backround.png"
                    animDuration={0.6}
                    camDistance={0.87}
                    to={buttonLink}
                    hovered={hovered}
                  />
                </div>
              </div>
              <div
                className="glow-overlay"
                style={{ "--glow-color": "#2f4ad4" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
