"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Contact = () => {
  const boxRef = useRef(null);
  const outerBoxRef = useRef(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const { contextSafe } = useGSAP({ scope: outerBoxRef });

  useGSAP(() => {
    gsap.fromTo(
      boxRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );
  });

  const hover = contextSafe(() => {
    tl.current = gsap
      .timeline()
      .fromTo(".contact", { scale: 1, opacity: 1 }, { scale: 0, opacity: 0 })
      .fromTo(
        boxRef.current,
        { width: 80, height: 80 },
        {
          width: 80,
          height: 400,
          duration: 0.5,
          ease: "power2.inOut",
        }
      )
      .fromTo(
        ".icon",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.2,
          ease: "back.out(1.7)",
        }
      );
  });

  const unhover = contextSafe(() => {
    tl.current?.reverse();
  });

  return (
    <div
      ref={outerBoxRef}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      className="fixed right-4 bottom-4 z-20"
    >
      <div className="relative">
        <div
          ref={boxRef}
          className="w-20 h-20 border-2 rounded-xl flex flex-col items-center justify-center relative overflow-hidden z-10 bg-gradient-to-r from-white/20 to-black/20 backdrop-blur-2xl border-pink/5"
        >
          <Image
            src="/pictures/contact_icon.png"
            className="contact"
            alt="contact"
            width={80}
            height={80}
            quality={100}
          />
          <div className="absolute flex flex-col gap-4">
            {[
              {
                src: "/pictures/email_icon.png",
                alt: "Email",
                link: "mailto:mehdipopal@outlook.de",
              },
              {
                src: "/pictures/github_icon.png",
                alt: "Github",
                link: "https://github.com/mehdi-000",
              },
              {
                src: "/pictures/linkedin_icon.png",
                alt: "Linkedin",
                link: "https://www.linkedin.com/in/mehdi-popal-65a2a525a",
              },
              { src: "/pictures/steam_icon.png", alt: "Steam", link: "#" },
            ].map((icon, index) => (
              <a
                key={index}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
                style={{ opacity: 0 }}
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={80}
                  height={80}
                  unoptimized={true}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
