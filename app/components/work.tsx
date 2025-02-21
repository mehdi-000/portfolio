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
          description="A short procedural generated endless runner with focus on movement and replayable gameplay"
          time="2 Months"
          type="Uni Project"
          buttonLink="/wotw"
        />
        <WorkCard
          heading="3D Model"
          model="Cart"
          title="Cyberpunk Cart"
          description="Low poli Cyberpunk cart modeled in Cinema4D. The
                concept is that the cart is hold together by magnetic fields."
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
          description="Fully functional scalable Visual Novel prototype, with emphasis on an interactive story"
          time="4 Months"
          type="Uni Project"
          buttonLink="/wotw"
        />
        <WorkCard
          heading="Website"
          model="LegacyLines"
          title="LegacyLines"
          description="Website as interactive visual database <br /> in which Familietrees can be added & edited"
          time="2 Weeks"
          type="Uni Project"
          buttonLink="/legacy-lines"
        />
      </div>
    </>
  );
};
