"use client";

import { useEffect, useRef } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import "./workCard.css";

export const Experience = () => {
  const glowCaptureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!glowCaptureRef.current) return;
    const refElement = glowCaptureRef.current;
    const clonedChild = refElement.children[0].cloneNode(true);
    const overlay = refElement.querySelector(".glow-overlay");
    overlay?.appendChild(clonedChild);

    refElement?.addEventListener("mousemove", (event) => {
      const x = event.pageX - refElement.offsetLeft;
      const y = event.pageY - refElement.offsetTop;

      const overlayElement = overlay as HTMLElement;
      overlayElement.style.setProperty("--glow-x", `${x}px`);
      overlayElement.style.setProperty("--glow-y", `${y}px`);
      overlayElement.style.setProperty("--glow-opacity", "1");
    });

    refElement?.addEventListener("mouseleave", () => {
      const overlayElement = overlay as HTMLElement;
      overlayElement.style.setProperty("--glow-opacity", "0");
    });
  });
  return (
    <>
      <div
        ref={glowCaptureRef}
        className=" relative glow-capture"
        style={{ "--glow-color": "#389fd6" }}
      >
        <div className="bg-gradient-to-br backdrop from-purple-800/5 to-cyan-400/5 border border-zinc-700 rounded-3xl p-8 shadow-2xl text-white max-w-2xl mx-auto glow glow:ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15]">
          <div className="text-gray-400 text-sm uppercase font-medium tracking-wider mb-8 text-center">
            3+ Years of Experience
          </div>

          {/* Experience Entries */}
          <div className="space-y-8 glow glow:ring-1 glow:border-glow glow:ring-glow">
            {[
              {
                title: "Web Developer",
                description:
                  "Building scalable, high-performance web applications with modern technologies.",
                company: "Freelance",
                years: "2024 - Present",
              },
              {
                title: "Founder & Game Developer",
                description:
                  "Founded Nixx Studios, developing 'Way of the Warrior'—a Visual Novel built in Unity.",
                company: "Nixx Studios",
                years: "2024 - Present",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="flex gap-6 glow:ring-1 glow:border-glow glow:ring-glow"
              >
                <FaBriefcase className="text-gray-500 text-xl mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-400 text-sm">{job.description}</p>
                  <div className="text-gray-300 text-sm mt-2">
                    <span className="font-medium">{job.company}</span> &bull;{" "}
                    {job.years}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 my-10"></div>
          <div className="flex gap-6">
            <FaGraduationCap className="text-gray-500 text-xl mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Bachelor of IT & Design</h3>
              <p className="text-gray-300 text-sm mt-1">
                Technische Hochschule Lübeck
              </p>
              <p className="text-gray-500 text-sm">2021 - 2025</p>
            </div>
          </div>
          <div className="border-t border-gray-700 my-10"></div>
          <div className="space-y-6">
            {[
              {
                title: "Working Student Software Engineer",
                company: "1Komma5°",
                years: "2023 - 2025",
              },
              {
                title: "Student Intern",
                company: "Autonomo Technologies",
                years: "2022",
              },
            ].map((job, index) => (
              <div key={index} className="flex gap-6 items-start">
                <FaBriefcase className="text-gray-600 text-xl mt-1" />
                <div className="flex-1">
                  <h3 className="text-gray-500 text-lg font-medium line-through">
                    {job.title}
                  </h3>
                  <div className="text-gray-500 text-sm mt-1">
                    <span className="font-medium">{job.company}</span> &bull;{" "}
                    {job.years}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="glow-overlay"
          style={{ "--glow-color": "#2f4ad4" }}
        ></div>
      </div>

      <div
        className="relative glow-capture"
        ref={glowCaptureRef}
        style={{ "--glow-color": "#2f4ad4" }}
      >
        <div className="bg-gradient-to-br backdrop from-purple-800/5 to-cyan-400/5 border border-zinc-700 rounded-3xl p-8 shadow-2xl text-white max-w-2xl mx-auto glow glow:ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15]">
          <div className="text-gray-400 text-sm uppercase font-medium tracking-wider mb-8 text-center glow:text-glow/[.20]">
            3+ Years of Experience
          </div>
          <div className="space-y-8">
            {[
              {
                title: "Web Developer",
                description:
                  "Building scalable, high-performance web applications with modern technologies.",
                company: "Freelance",
                years: "2024 - Present",
              },
              {
                title: "Founder & Game Developer",
                description:
                  "Founded Nixx Studios, developing 'Way of the Warrior'—a Visual Novel built in Unity.",
                company: "Nixx Studios",
                years: "2024 - Present",
              },
            ].map((job, index) => (
              <div key={index} className="flex gap-6">
                <FaBriefcase className="text-gray-500 text-xl mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold glow:text-glow/[.50]">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{job.description}</p>
                  <div className="text-gray-300 text-sm mt-2">
                    <span className="font-medium">{job.company}</span> &bull;{" "}
                    {job.years}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 my-10"></div>
          <div className="flex gap-6">
            <FaGraduationCap className="text-gray-500 text-xl mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold glow:text-glow/[.50]">
                Bachelor of IT & Design
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                Technische Hochschule Lübeck
              </p>
              <p className="text-gray-500 text-sm">2021 - 2025</p>
            </div>
          </div>
          <div className="border-t border-gray-700 my-10"></div>
          <div className="space-y-6">
            {[
              {
                title: "Working Student Software Engineer",
                company: "1Komma5°",
                years: "2023 - 2025",
              },
              {
                title: "Student Intern",
                company: "Autonomo Technologies",
                years: "2022",
              },
            ].map((job, index) => (
              <div key={index} className="flex gap-6 items-start">
                <FaBriefcase className="text-gray-600 text-xl mt-1" />
                <div className="flex-1">
                  <h3 className="text-gray-500 text-lg font-medium line-through">
                    {job.title}
                  </h3>
                  <div className="text-gray-500 text-sm mt-1">
                    <span className="font-medium">{job.company}</span> &bull;{" "}
                    {job.years}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="glow-overlay"
          style={{ "--glow-color": "#7c3aed" }}
        ></div>
      </div>
    </>
  );
};
