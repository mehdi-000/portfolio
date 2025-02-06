"use client";
import { Cart } from "@/public/model/Cart";
import { WotwTitle } from "@/public/WotW";
import { PlayerModel } from "@/public/PlayerModel";
import { LegacyLines } from "@/public/model/LegacyLines";
import { Suspense, useEffect, useRef } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

type WorkCardProps = {
  model: any;
  heading: string;
  title: string;
  description: string;
  buttonLink: string;
  autorotate?: boolean;
};

const WorkCard = ({
  model: modelPath,
  heading,
  title,
  description,
  buttonLink,
  autorotate = true,
}: WorkCardProps) => {
  const glowCaptureRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<any>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  /*  const { viewport } = useThree(); */
  /* const isMobile = viewport.width < 10; */

  const DynamicModel = dynamic(() => import(`@/public/model/${modelPath}`));

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
    <div className="flex flex-grow my-4 md:m-8">
      <div
        ref={glowCaptureRef}
        className="relative h-full w-full glow-capture text-white"
      >
        <div
          className="glow:bg-glow/[.20]"
          style={{ "--glow-color": "#2f4ad4" }}
        >
          <div
            className="bg-zinc-900/50 border-4 border-pink/5 rounded-2xl py-6 px-10 shadow-black/80 flex flex-col items-center justify-center gap-6 glow glow:ring-1 glow:border-glow glow:ring-glow"
            style={{ "--glow-color": "#389fd6" }}
          >
            <p
              className="opacity-50 self-start text-sm tracking-wide"
              style={{ "--glow-color": "#2f4ad4" }}
            >
              {heading}
            </p>
            <div
              className="group w-full bg-zinc-950/70 border-4 border-pink/5 rounded-2xl p-6 shadow-lg shadow-black/80 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 backdrop-blur-md glow glow:ring-1 glow:border-glow glow:ring-glow"
              style={{ "--glow-color": "#3d2fd4" }}
            >
              <div className="flex-1 order-2 md:order-1">
                <h2
                  className="font-bold text-3xl md:text-4xl tracking-tight mb-4 glow:text-glow/[.80]"
                  style={{ "--glow-color": "#2f4ad4" }}
                >
                  {title}
                </h2>
                <div
                  className="flex justify-center prose prose-zinc prose-invert prose-lg md:prose-base text-opacity-90 glow:text-glow/[.80]"
                  style={{ "--glow-color": "#389fd6" }}
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
                          <DynamicModel
                          /*      ref={modelRef} */
                          /*  scale={[0, 0, 0]} */
                          />
                        </Suspense>
                        {/*          <directionalLight /> */}
                        <ambientLight intensity={0.5} />
                        {/*      <pointLight position={[-30, 0, -30]} power={10.0} /> */}
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
              style={{ "--glow-color": "#2f4ad4" }}
            ></div>
            <p
              className="self-start text-sm leading-relaxed md:text-base glow:text-glow/[.80]"
              style={{ "--glow-color": "#389fd6" }}
            >
              {description}
            </p>
            {/*         <UiButton
              picture="/pictures/turqouis8Backround.png"
              animDuration={0.6}
              camDistance={0.87}
              to={buttonLink}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Work = () => {
  return (
    <>
      <div className="flex w-full md:h-20 justify-evenly">
        <h2 id="work" className="text-4xl">
          Work
        </h2>
      </div>
      <div className="z-10 w-full items-center md:flex">
        <WorkCard
          heading="2D Game"
          model="PlayerModel"
          title="Way of the Warrior"
          description="Explore an epic 2D game experience."
          buttonLink="/wotw"
        />
        <WorkCard
          heading="3D Model"
          model="Cart"
          title="Cyberpunk Cart"
          description="Explore an epic 2D game experience."
          buttonLink="/cyberpunk-cart"
        />
        <div className="text-center md:ml-auto overflow-hidden">
          <h3>WADADADWADSDwJsbjabddnawdjadjabwdjbadjabwdjabs dnaw</h3>
        </div>
      </div>
      <div className="z-10 w-full items-center md:flex overflow-clip">
        <div className="text-center m-4">
          <h3>WADADADWADSDwJsbjabddnawdjadjabwdjbad</h3>
        </div>
        <WorkCard
          heading="2D Game"
          model="WotwTitle"
          title="Way of the Warrior"
          description="Explore an epic 2D game experience."
          buttonLink="/wotw"
        />
      </div>
      <WorkCard
        heading="Website"
        model="LegacyLines"
        title="LegacyLines"
        description="Explore your ancestral history with LegacyLines."
        buttonLink="/legacy-lines"
      />
    </>
  );
};
