"use client";
import { WorkCard } from "@/app/components/workCard";

export const Work = () => {
  return (
    <>
      <div className="flex w-full md:h-20 justify-evenly">
        <h2 id="work" className=" font-pPMonumentExtended text-4xl">
          Work
        </h2>
      </div>
      <div className="z-10 w-full items-center md:flex">
        <WorkCard
          heading="2D Game"
          model="PlayerModel"
          title="Time Travel Sync"
          description="Short  procedurally generated endless runner emphasizing on movement, fluid gameplay, and replayability through dynamic levels"
          time="2 Months"
          type="Uni Project"
          buttonLink="/wotw"
        />
        <WorkCard
          heading="3D Model"
          model="Cart"
          title="Cyberpunk Cart"
          description="Low-poly Cyberpunk cart modeled & rigged in Cinema4D designed to be held together by magnetic fields for a futuristic aesthetic"
          time="2 Weeks"
          type="Uni Project"
          buttonLink="/cyberpunk-cart"
        />
      </div>
      <div className="z-10 w-full items-center md:flex">
        <WorkCard
          heading="2D Game"
          model="WotwTitle"
          title="Way of the Warrior"
          description="Fully functional scalable Visual Novel prototype focused on an interactive story with dynamic choices and complex item mechanic"
          time="4 Months"
          type="Uni Project"
          buttonLink="/wotw"
        />
        <WorkCard
          heading="Website"
          model="LegacyLines"
          title="Legacy Lines"
          description="Fullstack Website build in Vue is working as an interactive visual database in which family trees can be added, edited, and explored"
          time="2 Weeks"
          type="Uni Project"
          buttonLink="/legacy-lines"
        />
      </div>
    </>
  );
};
