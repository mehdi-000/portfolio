"use client";
import { UsedTechList, TechName } from "@/app/components/usedTechList";
import Image from "next/image";
import { useTransitionRouter } from "next-transition-router";

interface WorkCardProps {
  src: string;
  title: string;
  description: string;
  usedTechnology: TechName[];
  to: string;
}

export const WorkCard = ({
  src,
  title,
  description,
  usedTechnology,
  to,
}: WorkCardProps) => {
  const router = useTransitionRouter();

  return (
    <div
      onClick={() => router.push(to)}
      className="relative font-ubuntu my-4 md:my-6 max-w-xl max-h-[600px] justify-center flex flex-col items-center bg-linear-to-br from-purple-800/5 to-cyan-400/5 backdrop-blur-md pt-4 px-4 rounded-2xl shadow-lg border-pink/5 border-2 text-white w-full mx-auto group overflow-hidden z-20 cursor-pointer"
    >
      <div className="absolute inset-0 z-10 pointer-events-none [box-shadow:inset_0_-20px_60px_-10px_#ffffff3f] rounded-2xl" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={src}
          fill
          alt={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="relative font-ubuntu z-20 flex flex-col w-full text-center pointer-events-auto group">
        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight h-64 transform transition-transform duration-500 ease-in-out translate-y-0 group-hover:translate-y-1 px-2">
          {title}
        </h2>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <p className="text-gray-300 text-xs md:text-sm translate-y-4 transition-transform duration-500 ease-in-out group-hover:translate-y-2 mt-1 font-heebo text-center px-3">
            {description}
          </p>
          <div className="my-2 w-full flex justify-center">
            <UsedTechList technologies={usedTechnology} />
          </div>
        </div>
      </div>
    </div>
  );
};
