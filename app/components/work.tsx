"use client";
import { Model } from "../../public/model/Cart";
import { WotwTitle } from "../../public/WotW";
import { PlayerModel } from "../../public/model/PlayerModel";
import { LegacyLines } from "../../public/model/LegacyLines4";
import { WorkCard } from "../components/workCard";
import { WorkCard2 } from "../components/workCard copy";

export const Work = () => {
  return (
    <>
      <div className="flex w-full md:h-20 justify-evenly">
        <h2 id="work" className="text-4xl">
          Work
        </h2>
      </div>

      <div className="z-10 w-full items-center md:flex">
        <WorkCard
          heading="2D Game"
          model={PlayerModel}
          title="Way of the Warrior"
          description="Explore an epic 2D game experience."
          buttonLink="/wotw"
        />
        <WorkCard
          heading="3D Model"
          model={Model}
          title="Cyberpunk Cart"
          description="Explore an epic 2D game experience."
          buttonLink="/cyberpunk-cart"
        />
        <div className="text-center md:ml-auto overflow-hidden">
          <h3>WADADADWADSDwJsbjabddnawdjadjabwdjbadjabwdjabs dnaw</h3>
        </div>
      </div>
      <div className="z-10 w-full items-center md:flex overflow-clip">
        <div className="text-center m-4">
          <h3>WADADADWADSDwJsbjabddnawdjadjabwdjbad</h3>
        </div>
        <WorkCard
          heading="2D Game"
          model={WotwTitle}
          title="Way of the Warrior"
          description="Explore an epic 2D game experience."
          buttonLink="/wotw"
        />
      </div>
      <WorkCard2
        heading="Website"
        model={LegacyLines}
        title="LegacyLines"
        description="Explore your ancestral history with LegacyLines."
        buttonLink="/legacy-lines"
      />
    </>
  );
};
