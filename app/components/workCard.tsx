"use client";
import { useEffect, useState, useRef, Ref, use } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./workCard.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Vector3 } from "three";
import { UiButton } from "@/app/components/UiButton";
import dynamic from "next/dynamic";
import * as THREE from "three";

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
  }, []);
  return (
    <div className={`flex flex-grow my-6 md:m-8 `}>
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
            className="bg-zinc-900/50 border-4 border-pink/5 rounded-2xl md:py-5 md:px-8 py-6 px-6 shadow-black/80 flex md:flex-row flex-col items-center justify-center md:gap-2 gap-6 glow glow:ring-1 glow:border-glow glow:ring-glow"
            style={{ "--glow-color": "#389fd6" }}
          >
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-start">
                <p
                  className="opacity-50 glow:text-glow/[.80] font-heebo md:text-sm text-xs tracking-wide"
                  style={{ "--glow-color": "#2f4ad4" }}
                >
                  <strong>{heading}</strong>
                </p>
                <p
                  className="opacity-50 md:text-sm text-xs glow:text-glow/[.80]  font-heebo tracking-wide"
                  style={{ "--glow-color": "#2f4ad4" }}
                >
                  <strong>Agency:</strong> {type}
                </p>
              </div>
              <h2
                className="md:font-bold  font-pPMonumentExtended overflow-clip whitespace-normal text-center text-xl md:text-4xl tracking-tight mt-2 md:m-2 glow:text-glow/[.80]"
                style={{ "--glow-color": "#2f4ad4" }}
              >
                {title}
              </h2>
              <div className="flex flex-col md:flex-row w-full gap-8 mt-4">
                <div
                  className="group w-full md:w-1/2 bg-zinc-950/70 border-4 border-pink/5 rounded-2xl p-6 shadow-lg shadow-black/80 flex flex-col items-center justify-center backdrop-blur-md glow glow:ring-1 glow:border-glow glow:ring-glow"
                  style={{ "--glow-color": "#3d2fd4" }}
                >
                  <div
                    className="flex justify-center prose prose-zinc prose-invert prose-lg md:prose-base text-opacity-90 glow:text-glow/[.80]"
                    style={{ "--glow-color": "#389fd6" }}
                    ref={ref}
                  >
                    <div className="md:h-64 md:max-w-64 max-w-40">
                      <div className="pt-4 h-full">
                        <Canvas
                          fallback={<div>Sorry no WebGL supported!</div>}
                          camera={{
                            position: [
                              -0.04244707683370108, 2.42108826638258,
                              -10.075935083882978,
                            ],
                          }}
                        >
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

                <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                  <p
                    className="text-xs leading-relaxed md:text-base glow:text-glow/[.80] font-heebo text-center"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    {description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-end mt-4">
                <p
                  className="opacity-50 md:text-sm text-xs glow:text-glow/[.80] font-heebo tracking-wide md:mb-0 mb-4"
                  style={{ "--glow-color": "#2f4ad4" }}
                >
                  <strong>Time:</strong>{" "}
                  <span className="block md:inline">{time}</span>
                </p>
                <div
                  className="flex justify-end"
                  style={{ "--glow-color": "#3d2fd4" }}
                >
                  <UiButton
                    picture="/pictures/turqouis8Backround.png"
                    animDuration={0.6}
                    camDistance={0.87}
                    to={buttonLink}
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
