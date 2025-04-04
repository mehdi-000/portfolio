import Image from "next/image";
import { UiButton } from "./UiButton";

export const Footer = () => (
  <>
    <div className="h-14 w-full" />
    <footer className="h-screen w-full bg-black flex flex-col overflow-hidden justify-center">
      <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
        <h2 className="text-5xl font-extrabold tracking-wide bg-gradient-to-br from-purple-800 to-cyan-400 bg-clip-text text-transparent font-heebo text-center mb-4">
          Let&apos;s work together.
        </h2>
        <div className="relative m-4">
          <UiButton
            picture="/pictures/turqouis11Background.png"
            animDuration={0.6}
            camDistance={0.73}
            to={"mailto:mehdipopal@outlook.de"}
            isAnchor
            text="mehdipopal@outlook.de"
            className="w-[17rem] h-20"
          ></UiButton>
        </div>
        <p className="mt-4 text-sm text-zinc-400"></p>
      </div>

      <div className="text-sm w-full flex flex-col justify-center items-center">
        <div className="w-5/6 border-t border-zinc-700 mt-4"></div>

        <div className="w-5/6 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 py-3">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Agreements & Guidelines
            </a>
          </div>
          <p className="text-center sm:text-left mt-2">
            © {new Date().getFullYear()} Mehdi Popal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </>
);
