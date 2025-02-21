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
        <h1 className="md:text-6xl font-pPMonumentExtended text-5xl absolute top-28 right-10 md:top-[39%] md:left-[38%] z-20">
          Hello World
        </h1>
      </div>
      <Work />
      <h1 className="font-pPMonumentExtended text-center m-8  text-4xl">
        Experience
      </h1>
      <div className="bg-zinc-900/50 w-full border-4 border-blue/5 rounded-2xl py-6 px-10 shadow-black/80 flex flex-col items-center justify-center gap-6 cursor-none">
        <p className="opacity-50 self-start text-sm tracking-wide">Skills</p>
        <div className="w-full bg-zinc-950/70 border-4 border-blue/5 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-center gap-8 backdrop-blur-md">
          <div className="flex-1">
            <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-4">
              Experience
            </h2>
            <div className="pt-4 w-full h-screen" ref={ref}>
              {load ? <DynamicSkillGame /> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
