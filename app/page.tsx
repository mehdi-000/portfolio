import { Logoanimated } from "../app/components/3D/logoanimated";
import { Work } from "./components/work";
import { SkillsGame } from "@/app/components/3D/skillsGame";
import { Link } from "next-transition-router";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between overflow-hidden p-10 bg-black text-pink font-mono">
        <div className="z-10 flex justify-evenly">
          <Link href={"/cyberpunk-cart"} className="work m-2">
            <p>work</p>
          </Link>

          <Link href={"/wotw"} className="work m-2">
            <p>experience</p>
          </Link>

          <Link href={"#contact"} className="contact m-2">
            <p>contact</p>
          </Link>
        </div>

        <div className="w-full h-144 md:h-screen">
          <Logoanimated />
          <h1 className="md:text-6xl text-5xl absolute top-28 right-10 md:top-[39%] md:left-[38%] z-20">
            Hello World
          </h1>
          <div className="absolute bottom-44 right-3 md:bottom-0 md:right-0 p-5">
            <p className="border-b bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl border p-4 lg:bg-zinc-800/30 text-zinc-50">
              Mehdi Popal&nbsp;
              <code className="font-mono font-bold">Front-End-Developer</code>
            </p>
          </div>
        </div>
        <Work />
        <div className="bg-zinc-900/50 w-full border-4 border-pink/5 rounded-2xl py-6 px-10 shadow-black/80 flex flex-col items-center justify-center gap-6 cursor-none">
          <p className="opacity-50 self-start text-sm tracking-wide">Skills</p>
          <div className=" w-full group bg-zinc-950/70 border-4 border-pink/5 rounded-2xl p-6 shadow-lg shadow-black/80 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 backdrop-blur-md glow glow:ring-1 glow:border-glow glow:ring-glow">
            <div className="flex-1 order-2 md:order-1">
              <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-4 glow:text-glow/[.80]">
                Experience
              </h2>
              <div className="prose prose-zinc prose-invert prose-lg md:prose-base text-opacity-90 glow:text-glow/[.80]">
                <div className="pt-4 h-full w-full">
                  <SkillsGame />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
