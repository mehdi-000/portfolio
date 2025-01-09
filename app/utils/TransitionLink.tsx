"use client";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);
  const router = useRouter();

  useEffect(() => {
    const createBlocks = () => {
      const { innerWidth, innerHeight } =
        typeof window !== "undefined"
          ? window
          : { innerWidth: 1024, innerHeight: 768 };
      const blockSize = innerWidth * 0.05;
      const cols = Math.ceil(innerWidth / blockSize);
      const rows = Math.ceil(innerHeight / blockSize);

      const totalBlocks = cols * rows;
      const blocksArray: JSX.Element[] = [];

      for (let i = 0; i < totalBlocks; i++) {
        const randomX = Math.random() * innerWidth * 2 - innerWidth;
        const randomY = Math.random() * innerHeight * 2 - innerHeight;

        const gridX = (i % cols) * blockSize;
        const gridY = Math.floor(i / cols) * blockSize;

        blocksArray.push(
          <div
            key={i}
            className="pixel absolute w-16 h-16 bg-[#d689d4] opacity-0"
            style={{
              transform: `translate(${randomX}px, ${randomY}px)`,
            }}
            data-grid-x={gridX}
            data-grid-y={gridY}
          ></div>
        );
      }
      return blocksArray;
    };

    setBlocks(createBlocks());
  }, []);

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.body;

    gsap.to(".pixel", {
      opacity: 1,
      duration: 1.3,
      transform: (index, target) => {
        const gridX = target.getAttribute("data-grid-x");
        const gridY = target.getAttribute("data-grid-y");
        return `translate(${gridX}px, ${gridY}px)`;
      },
      ease: "Power4.easeOut",
      stagger: { amount: 1.1, from: "random" },
    });

    // Fly in Animation
    /*     gsap.to(".pixel", {
      top: "0%",
      left: "0%",
      opacity: 1,
      duration: 1.5,
      stagger: { amount: 1, from: "random" },
    }); */

    await sleep(2000);
    body?.classList.add("page-transition");
    router.push(href);
    await sleep(500);
    body?.classList.remove("page-transition");
    gsap.fromTo(
      ".pixel",
      {
        opacity: 1,
        duration: 1.2,
        transform: (index, target) => {
          const gridX = target.getAttribute("data-grid-x");
          const gridY = target.getAttribute("data-grid-y");
          return `translate(${gridX}px, ${gridY}px)`;
        },
        stagger: { amount: 1.2, from: "random" },
      },
      {
        opacity: 0,
        transform: (index, target) => {
          const { innerWidth, innerHeight } = window;
          const randomX = Math.random() * innerWidth * 2 - innerWidth;
          const randomY = Math.random() * innerHeight * 2 - innerHeight;
          return `translate(${randomX}px, ${randomY}px)`;
        },
        ease: "Power4.out",
        /*  ease: "circ", */
        duration: 1.4,
        stagger: { amount: 1.3, from: "random" },
      }
    );
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div ref={container} className="relative w-full h-full">
          {blocks}
        </div>
      </div>
      <Link onClick={handleTransition} href={href} {...props}>
        {children}
      </Link>
    </>
  );
};
