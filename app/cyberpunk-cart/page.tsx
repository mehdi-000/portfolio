"use client";
import { Navbar } from "../components/navbar";
import { CartComponent } from "./CartComponent";
import "../components/workCard.css";
import { useEffect, useRef } from "react";

export default function CyberpunkCar() {
  return (
    <main className="flex flex-col items-center justify-between overflow-hidden px-10 font- bg-black">
      <Navbar />
      <h1 className="font-bold font-pPMonumentExtended text-white text-center text-3xl md:text-4xl pt-8">
        Cyberpunk Cart
      </h1>
      <div className={`flex flex-grow my-4 md:m-8 `}>
        <div className="relative h-full w-full glow-capture text-white">
          <div
            className="glow:bg-glow/[.20]"
            style={{ "--glow-color": "#2f4ad4" }}
          >
            <div
              className="bg-zinc-900/50 border-4 border-pink/5 rounded-2xl py-6 px-10 shadow-black/80 flex  flex-col items-center justify-center gap-6 glow glow:ring-1 glow:border-glow glow:ring-glow"
              style={{ "--glow-color": "#389fd6" }}
            >
              <div className="flex flex-col w-full">
                {/* Top Section: "2D" and "Uni project" */}
                <div className="flex justify-between items-start">
                  <p
                    className="opacity-50 glow:text-glow/[.80] font-heebo text-sm tracking-wide"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    <strong>3D Model</strong>
                  </p>
                  <p
                    className="opacity-50 text-sm glow:text-glow/[.80]  font-heebo tracking-wide"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    <strong>Agency:</strong> Uni Project
                  </p>
                </div>

                {/* Middle Section: Content */}
                {/*           <h2
                    className="font-bold font-pPMonumentExtended text-center text-3xl md:text-4xl tracking-tight m-2 glow:text-glow/[.80]"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    Cyberpunk Cart
                  </h2> */}
                <div className="flex flex-col w-full gap-8 mt-4">
                  {/* Left Column: Title and Canvas */}
                  <div
                    className="group w-full  bg-zinc-950/70 border-4 border-pink/5 rounded-2xl shadow-lg shadow-black/80 flex flex-col items-center justify-center backdrop-blur-md glow glow:ring-1 glow:border-glow glow:ring-glow"
                    style={{ "--glow-color": "#3d2fd4" }}
                  >
                    <div
                      className="flex justify-center prose prose-zinc prose-invert prose-lg md:prose-base text-opacity-90 glow:text-glow/[.80]  w-full h-full"
                      style={{ "--glow-color": "#389fd6" }}
                      /*   ref={ref} */
                    >
                      <div className="w-full h-full">
                        <div className="h-full w-full">
                          <CartComponent />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description */}
                  <div className="w-full  flex flex-col justify-center items-center">
                    <p
                      className="text-sm leading-relaxed md:text-base glow:text-glow/[.80] font-heebo w-4/5 text-center"
                      style={{ "--glow-color": "#389fd6" }}
                    >
                      The Cart is low poli Cyberpunk cart modeled in Cinema4D.
                      The concept is that the cart is hold together by magnetic
                      fields. That is why the body and steeringwheel are in the
                      air. The magnetic animation is done in the engine like
                      unreal for performance reasons.
                    </p>
                  </div>
                </div>

                {/* Bottom Section: "Time: 8 Weeks" and Button */}
                <div className="flex justify-between items-end  mt-4">
                  <p
                    className="opacity-50 text-sm glow:text-glow/[.80] font-heebo tracking-wide"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    <strong>Time:</strong> 2 Weeks
                  </p>
                </div>

                {/* Glow Overlay */}
                <div
                  className="glow-overlay"
                  style={{ "--glow-color": "#2f4ad4" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
