"use client";
import { WorkCard2 } from "@/app/components/workCard2";

export const Work2 = () => {
  return (
    <>
      <div className="flex w-full mb-4 md:h-20 justify-evenly">
        <h2 id="work" className=" font-pPMonumentExtended text-4xl">
          Work
        </h2>
      </div>
      <div className="z-10 w-full items-center justify-around lg:flex">
        <WorkCard2
          model="PlayerModel"
          title="Time Travel Sync"
          description="Procedurally generated endless runner emphasizing on fluid gameplay"
          usedTechnology={["CSharp", "Unity", "Aseprite"]}
        />
        <WorkCard2
          model="WotwTitle"
          title="Way of the Warrior"
          description="Scalable Visual Novel prototype"
          usedTechnology={["Unity", "CSharp", "Aseprite"]}
        />
      </div>
      <div className="z-10 w-full items-center justify-around lg:flex">
        <WorkCard2
          model="Cart"
          title="Cyberpunk Cart"
          description="Low-poly modeled & rigged Cyberpunk cart "
          usedTechnology={["Blender", "Cinema4D"]}
        />
        <WorkCard2
          model="LegacyLines"
          title="Legacy Lines"
          description="Fullstack visual database for Family trees"
          usedTechnology={["VueJs", "Prisma", "NodeJs", "MySQL"]}
        />
      </div>
    </>
  );
};
