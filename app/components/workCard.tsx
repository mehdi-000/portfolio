"use client";
import { useEffect, useState, useRef, Ref, use } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import "./workCard.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Euler, Vector3 } from "three";
import { UiButton } from "./UiButton";

type WorkCardProps = {
  model: any;
  heading: string;
  title: string;
  description: string;
  buttonLink: string;
  autorotate?: boolean;
};

export const WorkCard = ({
  model: Model,
  heading,
  title,
  description,
  buttonLink,
  autorotate = true,
}: WorkCardProps) => {
  const glowCaptureRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<any>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP((context, contextSafe) => {
    if (contextSafe) {
      const onHover = contextSafe(
        (action: "play" | "reverse" | "pause" | "restart" | "rotation") => {
          if (!tl.current) {
            tl.current = gsap.timeline({ paused: true });
            tl.current
              .addLabel("start")
              .fromTo(
                modelRef.current?.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1 }
              )
              .to(modelRef.current?.rotation, { y: 2 * Math.PI }, "<");

            tl.current.addLabel("rotation");
            tl.current.to(modelRef.current?.rotation, {
              y: 4 * Math.PI,
              repeat: -1,
              duration: 6,
              ease: "none",
            });
          }
          if (action === "play") {
            tl.current.play();
          } else if (action === "reverse") {
            tl.current.reverse("rotation");
          } else if (action === "pause") {
            tl.current.pause();
          } else if (action === "restart") {
            tl.current.restart();
          } else if (action === "rotation") {
            tl.current.play("rotation");
          }
        }
      );

      if (glowCaptureRef.current) {
        glowCaptureRef.current.addEventListener("mouseenter", () => {
          onHover("play");
        });
        glowCaptureRef.current.addEventListener("mouseleave", () => {
          onHover("reverse");
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!glowCaptureRef.current) return;

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
    <div className={"flex flex-grow m-8"}>
      <div
        ref={glowCaptureRef}
        className="relative h-full glow-capture text-white"
      >
        <div className="bg-zinc-900/50 border-4 border-pink/5 rounded-2xl py-6 px-10 shadow-black/80 flex flex-col items-center justify-center gap-6 glow glow:bg-glow/[.15]">
          <p className="opacity-50 self-start text-sm tracking-wide">
            {heading}
          </p>
          <div className="group bg-zinc-950/70 border-4 border-pink/5 rounded-2xl p-6 shadow-lg shadow-black/80 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 backdrop-blur-md glow glow:ring-1 glow:border-glow glow:ring-glow">
            <div className="flex-1 order-2 md:order-1">
              <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-4 glow:text-glow/[.80]">
                {title}
              </h2>
              <div className="prose prose-zinc prose-invert prose-lg md:prose-base text-opacity-90 glow:text-glow/[.80]">
                <div className="h-64">
                  <div className="pt-4 h-full">
                    <Canvas
                      camera={{
                        position: [
                          -0.04244707683370108, 2.42108826638258,
                          -10.075935083882978,
                        ],
                      }}
                    >
                      <OrbitControls
                        autoRotate={autorotate}
                        target={
                          new Vector3(
                            0.20275228442863932,
                            1.7126070749008806,
                            0.4683586034171129
                          )
                        }
                      />
                      <Suspense fallback={null}>
                        <Model ref={modelRef} scale={[0, 0, 0]} />
                      </Suspense>
                      <directionalLight />
                      <ambientLight intensity={0.5} />
                      <pointLight position={[-30, 0, -30]} power={10.0} />
                      <Environment
                        preset="apartment"
                        backgroundBlurriness={0.5}
                      />
                    </Canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="glow-overlay"
            style={{ "--glow-color": "#c977c7" }}
          ></div>
          <p className="self-start text-sm leading-relaxed md:text-base">
            {description}
          </p>
          <UiButton
            picture="/pictures/buttonBackground.png"
            animDuration={0.6}
            camDistance={0.87}
            to={buttonLink}
          />
        </div>
      </div>
    </div>
  );
};
