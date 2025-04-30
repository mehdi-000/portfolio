"use client";
import { Logoanimated } from "@/app/components/3D/logoanimated";
import { Navbar } from "@/app/components/navbar";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Experience } from "@/app/components/experience";
import Image from "next/image";
import { Work } from "@/app/components/work";
import { MobileSkills } from "@/app/components/mobileSkills";

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
    <main className="flex flex-col items-center justify-between overflow-hidden p-10 bg-[#070707] text-white font-mono">
      <div className="w-screen h-screen relative">
        <Navbar />
        <Logoanimated />
        <div className="absolute md:top-1/2 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 backdrop-blur-2xl border-pink/5 bg-gradient-to-br from-purple-800/5 to-cyan-400/5 p-6 rounded-xl shadow-lg flex flex-col">
          <div className="flex items-center justify-between font-ubuntu">
            <h1 className="text-xl font-bold">Mehdi Popal</h1>
            <div className="flex gap-3 md:ml-0 ml-4">
              <button className="button">
                <a
                  key="1"
                  href="mailto:mehdipopal@outlook.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-pink/5 hover:bg-sky-950"
                >
                  <Image
                    src="/pictures/email_icon.png"
                    alt="Email"
                    width={32}
                    height={32}
                  />
                </a>
              </button>
              <button className="">
                <a
                  key="2"
                  href="https://github.com/mehdi-000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-pink/5 hover:bg-sky-950"
                >
                  <Image
                    src="/pictures/github_icon.png"
                    alt="Github"
                    width={32}
                    height={32}
                  />
                </a>
              </button>
              <button className="">
                <a
                  key="3"
                  href="https://www.linkedin.com/in/mehdi-popal-65a2a525a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-pink/5 shadow-lg hover:bg-sky-950"
                >
                  <Image
                    src="/pictures/linkedin_icon.png"
                    alt="Linkedin"
                    width={32}
                    height={32}
                  />
                </a>
              </button>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-400 gap-1">
            <div className="h-4 w-4">
              <svg
                style={{ margin: 0 }}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3.5C6 2.67157 6.67157 2 7.5 2S9 2.67157 9 3.5 8.32843 5 7.5 5C6.67157 5 6 4.32843 6 3.5zM8 5.94999C9.14112 5.71836 10 4.70948 10 3.5 10 2.11929 8.88071 1 7.5 1 6.11929 1 5 2.11929 5 3.5c0 1.20948.85888 2.21836 2 2.44999V13.5c0 .2761.22386.5.5.5s.5-.2239.5-.5V5.94999z"
                  fill="currentcolor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="font-heebo">Hamburg, Germany </p>
          </div>
          <p className="text-gray-300 text-base mt-4 hidden md:block font-heebo">
            I am a Software Engineer with 3 years of experience, skilled in both
            <br className="hidden md:block" />
            front-end and back-end development, with a specialization in web
          </p>
          <p className="text-gray-300 text-sm mt-4 md:hidden font-heebo">
            I am a fullstack Software Engineer with 3 years of experience
          </p>
        </div>
      </div>
      <div className="hidden md:block spacer w-full m-16"></div>
      <div className="flex w-full md:h-20 justify-evenly mb-6">
        <h1
          id="experience"
          className="font-pPMonumentExtended tracking-wide text-center text-4xl leading-[2.75rem]"
        >
          Experience
        </h1>
      </div>
      <div className="">
        <Experience />
      </div>
      <div className="spacer w-full m-16"></div>
      <div className="md:block spacer w-full m-16"></div>
      <div className="flex w-full mb-4 md:h-20 justify-evenly">
        <h2
          id="work"
          className="font-pPMonumentExtended tracking-wide text-4xl leading-[2.75rem]"
        >
          Work
        </h2>
      </div>
      <div className="spacer w-full m-32"></div>
      <div className="flex w-full md:h-20 justify-evenly mb-6">
        <h1
          id="skills"
          className="font-pPMonumentExtended tracking-wide text-center text-4xl leading-[2.75rem]"
        >
          Skills
        </h1>
      </div>
      <div className="pt-10 block md:hidden">
        <MobileSkills />
      </div>
      <div className="z-10 md:w-[96%] items-center md:flex">
        <div className=" hidden bg-gradient-to-br from-purple-800/5 to-cyan-400/5 w-full border-2 border-pink/5 rounded-2xl md:py-6 md:px-10 py-4 px-4 shadow-black/80 md:flex flex-col items-center justify-center gap-6 cursor-none">
          <div className="w-full bg-gradient-to-br from-purple-800/5 to-cyan-400/5 border-2 border-pink/5 rounded-2xl md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:h-[65vh]" ref={ref}>
              {load ? <DynamicSkillGame /> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
