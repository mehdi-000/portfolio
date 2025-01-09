"use client";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const PixelBackground = ({}) => {
  const container = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });
      tl.current.from(".pixel", {
        opacity: 0,
        stagger: { amount: 1.5, from: "random" },
        borderRadius: "80px",
      });
      tl.current?.play();
    },
    { dependencies: [blocks] }
  );

  useEffect(() => {
    const getBlocks = () => {
      const { innerWidth, innerHeight } =
        typeof window !== "undefined"
          ? window
          : { innerWidth: 1024, innerHeight: 768 };
      const blockSize = innerWidth * 0.05;
      const amountOfBlocks = Math.ceil(innerHeight / blockSize);
      return [...Array(amountOfBlocks)].map((_, i) => (
        <div key={i} className=" pixel h-16 w-full bg-[#d689d4]"></div>
      ));
    };

    setBlocks(getBlocks());
  }, []);

  return (
    <div className="fixed inset-0 flex z-50 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div ref={container} key={i} className="w-16 h-full">
          {blocks}
        </div>
      ))}
    </div>
  );
};
