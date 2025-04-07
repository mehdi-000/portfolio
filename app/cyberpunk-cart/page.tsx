"use client";
import { Navbar } from "../components/navbar";
import { CartComponent } from "./CartComponent";
import "../components/workCard.css";
import { useEffect, useRef } from "react";
import { UsedTechList } from "@/app/components/usedTechList";

export default function CyberpunkCar() {
  return (
    <main className="flex flex-col items-center justify-between overflow-hidden p-10 font- bg-[#070707] text-white">
      <Navbar />
      <div className="w-full h-14" />
      <div className="h-full w-3/5">
        <CartComponent />
      </div>
      <div className="w-full h-14" />
      <div className="md:w-2/5 font-heebo">
        <div className="bg-[#070707] pb-6 pt-4 px-6 rounded-xl bg-gradient-to-br from-purple-800/5 to-cyan-400/5 border-2 border-pink/5  shadow-md ">
          <div className="flex justify-between text-gray-400 text-sm">
            <p>
              <strong className="text-gray-500">3D Model</strong>
            </p>
            <p>
              <strong className="text-gray-500">Agency:</strong> Uni Project
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <h1 className="text-white text-2xl font-bold">Cyberpunk Cart</h1>
          </div>
          <UsedTechList technologies={["Cinema4D", "Blender"]} />
          <p className="text-gray-400 text-sm mt-8 mb-6">
            This low-poly 3D cart was modeled in Cinema4D and textured in
            Blender. It&apos;s designed for a cyberpunk future which is a blend
            between our and future tech.
          </p>
        </div>
        <div className="w-full h-4" />
        <h2 className="text-xl font-bold mt-6">Focus</h2>
        <p className="text-gray-300 text-sm leading-relaxed my-4">
          I put special focus on the exposed internal components from the engine
          parts to the suspension and seating making them not differ too much
          from our reality to make it feel grounded, even in a sci-fi world.
        </p>

        <h2 className="text-xl font-bold">Why are some parts floating?</h2>
        <p className="text-gray-300 text-sm leading-relaxed my-4">
          The cart is held together by magnetic fields that&apos;s why the body,
          engine, and steering wheel appear to float. The thing above the seat
          is supposed to be a floating HUD display giving the driver extra
          information.
        </p>

        <h2 className="text-xl font-bold">What&apos;s that on the engine?</h2>
        <p className="text-gray-300 text-sm leading-relaxed my-4">
          That&apos;s the logo of the fictional manufacturer a nod to the
          worldbuilding in{" "}
          <a key={1} href="/wotw" target="_blank" rel="noopener noreferrer">
            <strong>Way of a Warrior</strong>
          </a>
        </p>
      </div>
    </main>
  );
}
