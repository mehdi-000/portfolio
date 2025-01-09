"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";

export const Navbar = () => {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const work = useRef<HTMLParagraphElement | null>(null);
  const experience = useRef<HTMLParagraphElement | null>(null);
  const contact = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    // Initialize timeline
    tl.current = gsap.timeline();

    // Add "plop-in" animation for each element
    tl.current
      .from(work.current, {
        opacity: 0,
        scale: 0.5, // Start smaller
        duration: 0.5,
        ease: "back.out(1.7)", // Smooth "plop" effect
      })
      .from(
        experience.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3" // Overlap slightly for smoother effect
      )
      .from(
        contact.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    tl.current.play();
  });

  return (
    <div className="flex flex-col items-center justify-between overflow-hidden p-10 bg-black text-pink font-mono">
      <div className="z-10 flex justify-evenly">
        <Link href={"/#work"} className="work m-2">
          <p ref={work}>work</p>
        </Link>

        <Link href={"#experience"} className="work m-2">
          <p ref={experience}>experience</p>
        </Link>

        <Link href={"#contact"} className="contact m-2">
          <p ref={contact}>contact</p>
        </Link>
      </div>
    </div>
  );
};
