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
    <div className="flex justify-center">
      <div className="flex items-center justify-around overflow-hidden bg-black text-white font-ubuntu text-xl w-3/6">
        <Link
          href={"/#work"}
          className="work"
          ref={workRef}
          onMouseEnter={() => handleHover(workRef.current)}
          onMouseLeave={() => handleHoverOut(workRef.current)}
        >
          <p>work</p>
        </Link>

        <Link
          href={"#experience"}
          className="work"
          ref={experienceRef}
          onMouseEnter={() => handleHover(experienceRef.current)}
          onMouseLeave={() => handleHoverOut(experienceRef.current)}
        >
          <p>experience</p>
        </Link>

        <Link
          href={"#skills"}
          className="contact"
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
