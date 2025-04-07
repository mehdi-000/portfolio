"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const Navbar = () => {
  const workRef = useRef<HTMLAnchorElement | null>(null);
  const experienceRef = useRef<HTMLAnchorElement | null>(null);
  const contactRef = useRef<HTMLAnchorElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const handleHover = (element: HTMLAnchorElement | null) => {
    if (element) {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.3,
        ease: "power1.out",
        color: isMobile ? "#c23e91" : "#33c4c0",
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
    <div className="flex justify-center w-full">
      <div className="flex items-center justify-around bg-[#070707] text-white font-pPMonumentExtended tracking-wide text-center  leading-[2.75rem] md:text-xl text-sm md:w-3/6">
        <Link
          href={"/#work"}
          className="md:ml-0 ml-3"
          ref={workRef}
          onMouseEnter={() => handleHover(workRef.current)}
          onMouseLeave={() => handleHoverOut(workRef.current)}
        >
          <p>work</p>
        </Link>
        <Link
          href={"/#experience"}
          className="md:ml-0 ml-3"
          ref={experienceRef}
          onMouseEnter={() => handleHover(experienceRef.current)}
          onMouseLeave={() => handleHoverOut(experienceRef.current)}
        >
          <p>experience</p>
        </Link>

        <Link
          href={"/#skills"}
          className="md:ml-0 ml-3"
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
