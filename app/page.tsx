"use client";
import { Logoanimated } from "@/app/components/3D/logoanimated";
import { Navbar } from "@/app/components/navbar";
import { Work } from "@/app/components/work";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const DynamicSkillGame = dynamic(
  () => import("@/app/components/3D/skillsGame"),
  { ssr: false }
);

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoad(true);
        observer.disconnect();
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between overflow-hidden p-10 bg-black text-white font-mono">
      <Navbar />
      <div className="w-full h-144 md:h-screen">
        <Logoanimated />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-6xl font-pPMonumentExtended text-center z-20">
          Hello World
        </h1>
      </div>
      <Work />
      <div className="spacer w-full p-16"></div>
      <div className="flex w-full md:h-20 justify-evenly mb-6">
        <h1 className="font-pPMonumentExtended text-center text-4xl">
          Experience
        </h1>
      </div>
      <div className="z-10 md:w-[96%] items-center md:flex">
        <div className="bg-zinc-900/50 w-full border-4 border-blue/5 rounded-2xl py-6 px-10 shadow-black/80 flex flex-col items-center justify-center gap-6 cursor-none">
          <p className="opacity-50 self-start text-sm tracking-wide"></p>
          <div className="w-full bg-zinc-950/70 border-4 border-blue/5 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-center gap-8 backdrop-blur-md">
            <div className="flex-1">
              <div className="p-4 w-full md:h-[65vh]" ref={ref}>
                {load ? <DynamicSkillGame /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
