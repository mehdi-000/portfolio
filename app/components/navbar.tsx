"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";

export const Navbar = () => {
  const workRef = useRef<HTMLAnchorElement | null>(null);
  const experienceRef = useRef<HTMLAnchorElement | null>(null);
  const contactRef = useRef<HTMLAnchorElement | null>(null);

  const handleHover = (element: HTMLAnchorElement | null) => {
    if (element) {
      gsap.to(element, {
        scale: 1.01,
        duration: 0.3,
        ease: "power1.out",
        color: "#389fd6",
      });
    }
  };

  const handleHoverOut = (element: HTMLAnchorElement | null) => {
    if (element) {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
        color: "#ffffff",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between overflow-hidden bg-black text-white font-pPMonumentExtended">
      <div className="z-10 flex justify-evenly">
        <Link
          href={"/#work"}
          className="work m-2"
          ref={workRef}
          onMouseEnter={() => handleHover(workRef.current)}
          onMouseLeave={() => handleHoverOut(workRef.current)}
        >
          <p>work</p>
        </Link>

        <Link
          href={"#experience"}
          className="work m-2"
          ref={experienceRef}
          onMouseEnter={() => handleHover(experienceRef.current)}
          onMouseLeave={() => handleHoverOut(experienceRef.current)}
        >
          <p>experience</p>
        </Link>

        <Link
          href={"#skills"}
          className="contact m-2"
          ref={contactRef}
          onMouseEnter={() => handleHover(contactRef.current)}
          onMouseLeave={() => handleHoverOut(contactRef.current)}
        >
          <p>skills</p>
        </Link>
      </div>
    </div>
  );
};
