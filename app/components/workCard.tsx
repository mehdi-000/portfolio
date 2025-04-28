"use client";
import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import "./workCard.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { FaReact, FaNodeJs, FaVuejs } from "react-icons/fa";
import { FaUnity } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { PiFileCSharp } from "react-icons/pi";
import { SiBlender, SiCinema4D, SiPrisma, SiAseprite } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { TbBrandNextjs, TbBrandTypescript } from "react-icons/tb";
import { useTransitionRouter } from "next-transition-router";
import { UsedTechList } from "@/app/components/usedTechList";

const techIcons = {
  NextJs: <TbBrandNextjs />,
  React: <FaReact />,
  TypeScript: <TbBrandTypescript />,
  NodeJs: <FaNodeJs />,
  VueJs: <FaVuejs />,
  Unity: <FaUnity />,
  TailwindCSS: <RiTailwindCssFill />,
  CSharp: <PiFileCSharp />,
  Blender: <SiBlender />,
  Cinema4D: <SiCinema4D />,
  Prisma: <SiPrisma />,
  Aseprite: <SiAseprite />,
  MySQL: <GrMysql />,
} as const;

type TechName = keyof typeof techIcons;

interface WorkCardProps {
  model: any;
  title: string;
  description: string;
  usedTechnology: TechName[];
  to: string;
}

export const WorkCard = ({
  model: Model,
  title,
  description,
  usedTechnology,
  to,
}: WorkCardProps) => {
  const modelRef = useRef<any>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [loadModel, setLoadModel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const DynamicModel = dynamic(() => import(`@/public/model/${Model}`));
  const { contextSafe } = useGSAP();
  const tl = useRef<gsap.core.Timeline>(null);
  const tl2 = useRef<gsap.core.Timeline>(null);
  const router = useTransitionRouter();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const CameraController = () => {
    const { camera, pointer } = useThree();

    useFrame(() => {
      camera.position.x += pointer.x * 2 - camera.position.x;
      camera.position.y += -pointer.y * 2 - camera.position.y;
      camera.lookAt(0, 1, 0);
    });

    return null;
  };

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadModel(true);
        if (isMobile && modelRef.current) {
          gsap.fromTo(
            modelRef.current?.scale,
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 1, z: 1 }
          );
        }
        observer.disconnect();
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  });

  const hover = contextSafe(() => {
    if (isMobile) return;
    if (tl2.current) tl2.current.play();
    tl.current = gsap
      .timeline()
      .fromTo(
        modelRef.current?.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      );
  });

  const unhover = contextSafe(() => {
    if (isMobile) return;
    if (tl2.current) tl2.current.reverse(0.3);
    tl.current?.reverse();
  });

  return (
    <div
      onPointerEnter={hover}
      onPointerLeave={unhover}
      className="relative font-ubuntu my-4 md:my-6 max-w-xl max-h-[600px] justify-center [box-shadow:0_-10px_50px_-10px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] flex flex-col items-center bg-gradient-to-br from-purple-800/5 to-cyan-400/5 backdrop-blur-md pt-4 px-4 rounded-2xl shadow-lg border-pink/5 border-2 text-white w-full mx-auto group overflow-hidden hover:cursor-pointer"
    >
      <div className="absolute inset-0 z-50">
        <Canvas
          onClick={() => router.push(to)}
          fallback={<div>Sorry no WebGL supported!</div>}
          camera={{
            position: [
              -0.04244707683370108, 2.42108826638258, -10.075935083882978,
            ],
          }}
        >
          {isMobile ? (
            <DynamicModel
              // @ts-ignore
              ref={modelRef}
              disableMobileScaling
              scale={[0, 0, 0]}
            />
          ) : loadModel ? (
            <DynamicModel
              // @ts-ignore
              ref={modelRef}
              disableMobileScaling
              scale={[0, 0, 0]}
            />
          ) : null}
          {isMobile ? null : <CameraController />}
          <ambientLight intensity={0.5} />
          <Environment preset="apartment" backgroundBlurriness={0.5} />
        </Canvas>
      </div>
      <div
        className="relative font-ubuntu z-10 flex flex-col w-full text-center pointer-events-auto group"
        ref={ref}
      >
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
