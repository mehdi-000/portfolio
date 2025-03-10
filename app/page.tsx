"use client";
import { Logoanimated } from "@/app/components/3D/logoanimated";
import { Navbar } from "@/app/components/navbar";
import { Work } from "@/app/components/work";
import { useEffect, useRef, useState } from "react";
import { Contact } from "@/app/components/contact";
import dynamic from "next/dynamic";
import { Experience } from "@/app/components/experience";
import { Gyro } from "./components/gyrosensor";

const DynamicSkillGame = dynamic(
  () => import("@/app/components/3D/skillsGame"),
  { ssr: false }
);

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between overflow-hidden p-10 bg-black text-white font-mono">
      {isVisible ? <Contact /> : null}
      <div className="w-screen h-screen relative">
        <Navbar />
        <Logoanimated />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-6xl font-pPMonumentExtended text-center z-20">
          Hello World
        </h1>
        <div className="absolute bottom-8 right-4 p-4">
          <p className="border-2 bg-gradient-to-b pb-4 pt-6 px-5 backdrop-blur-2xl border-pink/5 bg-zinc-800/30 dark:from-inherit static w-auto rounded-2xl p-4 lg:bg-zinc-800/30 text-zinc-50">
            Mehdi Popal&nbsp;
          </p>
        </div>
      </div>
      <div className="spacer w-full m-16"></div>
      <Work />
      <div className="spacer w-full m-16"></div>
      <div className="flex w-full md:h-20 justify-evenly mb-6">
        <h1
          id="experience"
          className="font-pPMonumentExtended text-center text-4xl"
        >
          Experience
        </h1>
      </div>
      <div className="md:w-[96%]">
        <Experience />
      </div>
      <div className="spacer w-full m-16"></div>
      <div className="flex w-full md:h-20 justify-evenly mb-6">
        <h1
          id="skills"
          className="font-pPMonumentExtended text-center text-4xl"
        >
          Skills
        </h1>
      </div>
      <div className="z-10 md:w-[96%] items-center md:flex">
        <div className="bg-zinc-900/50 w-full border-4 border-pink/5 rounded-2xl md:py-6 md:px-10 py-4 px-4 shadow-black/80 flex flex-col items-center justify-center gap-6 cursor-none">
          <div className="w-full bg-zinc-950/70 border-4 border-pink/5 rounded-2xl md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-center gap-8 backdrop-blur-md">
            <div className="w-full md:h-[65vh]" ref={ref}>
              {load ? <DynamicSkillGame /> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
