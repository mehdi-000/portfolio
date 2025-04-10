"use client";
import { WorkCard } from "@/app/components/workCard";

export const Work = () => {
  return (
    <>
      <div className="flex w-full mb-4 md:h-20 justify-evenly">
        <h2 id="work" className=" font-pPMonumentExtended text-4xl">
          Work
        </h2>
      </div>
      <div className="z-10 w-full items-center justify-around lg:flex">
        <WorkCard
          heading="2D Game"
          model="PlayerModel"
          title="Time Travel Sync"
          description="Procedurally generated endless runner emphasizing on fluid gameplay"
          time="2 Months"
          type="Uni Project"
          buttonLink="/wotw"
        />
        <WorkCard
          heading="2D Game"
          model="WotwTitle"
          title="Way of the Warrior"
          description="Scalable Visual Novel prototype"
          time="4 Months"
          type="Uni Project"
          buttonLink="/wotw"
        />
      </div>
      <div className="z-10 w-full items-center justify-around lg:flex">
        <WorkCard
          heading="3D Model"
          model="Cart"
          title="Cyberpunk Cart"
          description="Low-poly modeled & rigged Cyberpunk cart "
          time="3 Weeks"
          type="Uni Project"
          buttonLink="/cyberpunk-cart"
        />
        <WorkCard
          heading="Website"
          model="LegacyLines"
          title="Legacy Lines"
          description="Fullstack visual database for Family trees"
          time="2 Months"
          type="Uni Project"
          buttonLink="/legacy-lines"
        />
      </div>
    </>
  );
};
