import { Navbar } from "@/app/components/navbar";

export default function Wotw() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between overflow-hidden pb-10 px-10 text-white bg-black">
        <div className="md:hidden z-20 flex justify-evenly">
          <div className=" group bg-zinc-900/50 border-4 border-blue/5 rounded-2xl p-10 shadow-lg shadow-black/80  flex-col flex-wrap md:items-start items-center md:justify-between justify-center gap-6">
            <div className="flex-1 md:order-1 order-2 flex-grow">
              <p className="opacity-50">2D Visual Novel</p>
              <h2 className="font-bold text-4xl tracking-tighter mb-3 glow:text-glow/[.80]">
                Way of the Warrior
              </h2>
            </div>
            <div className="md:prose-base prose-lg prose-zinc prose-invert opacity-65 glow:text-glow/[.80]">
              <p>
                The Game is created with Unity sadly there is no way to properly
                support mobile while exporting to Web. <br />
                <br />
                Feel free to check upcoming mobile release of the game in the
                android app store.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block z-20 bg-black">
          <div className="z-10 flex justify-evenly">
            <div className=" group bg-zinc-900/50 border-4 border-blue/5 rounded-2xl p-10 shadow-lg shadow-black/80  flex-col flex-wrap md:items-start items-center md:justify-between justify-center gap-6">
              <div className="flex-1 md:order-1 order-2 flex-grow">
                <p className="opacity-50">2D Visual Novel</p>
                <h2 className="font-bold text-4xl tracking-tighter mb-3 glow:text-glow/[.80]">
                  Way of the Warrior
                </h2>
              </div>
              <iframe
                src="https://i.simmer.io/@Nixx/way--of-the-warrior"
                style={{ width: "960px", height: "600px" }}
              ></iframe>
              <div className="md:prose-base prose-lg prose-zinc prose-invert p-10 ">
                <p className="opacity-50">
                  The Game was created as an University project together with
                  Sophie Kretschmann which got expanded on over time. <br />
                  Goal was to create a fully functional scalable Visual Novel
                  prototype, with emphasis on an interactive story <br />{" "}
                  multiple story paths based on the inventory system, players
                  choices and a mini game to break up the story in inside <br />
                  the game engine Unity. Initially for mobile but support for
                  other devices is planned.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
