"use client";
import { WorkCard2 } from "@/app/components/workCard2";

export const Work2 = () => {
  return (
    <>
      <div className="z-10 w-full items-center justify-around lg:flex">
        <WorkCard2
          model="WotwTitle"
          title="Way of the Warrior"
          description="Scalable Visual Novel prototype"
          usedTechnology={["Unity", "CSharp", "Aseprite"]}
          to={"/wotw"}
        />
        <WorkCard2
          model="PlayerModel"
          title="Time Travel Sync"
          description="Procedurally generated endless runner emphasizing on fluid gameplay"
          usedTechnology={["CSharp", "Unity", "Aseprite"]}
          to={"/ttsync"}
        />
      </div>
      <div className="z-10 w-full items-center justify-around lg:flex">
        <WorkCard2
          model="Cart"
          title="Cyberpunk Cart"
          description="Low-poly modeled & rigged Cyberpunk cart"
          usedTechnology={["Blender", "Cinema4D"]}
          to={"/cyberpunk-cart"}
        />
        <WorkCard2
          model="LegacyLines"
          title="Legacy Lines"
          description="Fullstack visual database for Family trees"
          usedTechnology={["VueJs", "Prisma", "NodeJs", "MySQL"]}
          to={"legacy-lines"}
        />
      </div>
    </>
  );
};
