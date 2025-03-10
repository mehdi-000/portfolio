import { Navbar } from "@/app/components/navbar";

export default function Wotw() {
  return (
    <main className="flex flex-col items-center justify-between overflow-hidden px-10 font- bg-black">
      <Navbar />
      <h1 className="font-bold font-pPMonumentExtended text-white text-center text-3xl md:text-4xl pt-8">
        Way of the Warrior
      </h1>
      <div className={`flex flex-grow my-4 md:m-8 `}>
        <div className="md:hidden z-20 flex justify-evenly">
          <div className=" group bg-zinc-900/50 border-4 border-pink/5 rounded-2xl p-10 shadow-lg shadow-black/80  flex-col flex-wrap md:items-start items-center md:justify-between justify-center gap-6">
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
        <div className="relative h-full w-full glow-capture text-white">
          <div
            className="glow:bg-glow/[.20]"
            style={{ "--glow-color": "#2f4ad4" }}
          >
            <div
              className="bg-zinc-900/50 border-4 border-pink/5 rounded-2xl py-6 px-10 shadow-black/80 flex  flex-col items-center justify-center gap-6 glow glow:ring-1 glow:border-glow glow:ring-glow"
              style={{ "--glow-color": "#389fd6" }}
            >
              <div className="flex flex-col w-full">
                {/* Top Section: "2D" and "Uni project" */}
                <div className="flex justify-between items-start">
                  <p
                    className="opacity-50 glow:text-glow/[.80] font-heebo text-sm tracking-wide"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    <strong>2D Visual Novel</strong>
                  </p>
                  <p
                    className="opacity-50 text-sm glow:text-glow/[.80]  font-heebo tracking-wide"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    <strong>Agency:</strong> Uni Project
                  </p>
                </div>

                {/* Middle Section: Content */}
                {/*           <h2
                    className="font-bold font-pPMonumentExtended text-center text-3xl md:text-4xl tracking-tight m-2 glow:text-glow/[.80]"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    Cyberpunk Cart
                  </h2> */}
                <div className="flex flex-col w-full gap-8 mt-4">
                  {/* Left Column: Title and Canvas */}
                  <div
                    className="group w-full  bg-zinc-950/70 border-4 border-pink/5 rounded-2xl shadow-lg shadow-black/80 flex flex-col items-center justify-center backdrop-blur-md glow glow:ring-1 glow:border-glow glow:ring-glow"
                    style={{ "--glow-color": "#3d2fd4" }}
                  >
                    <div
                      className=" justify-center prose prose-zinc prose-invert prose-lg md:prose-base text-opacity-90 glow:text-glow/[.80] hidden md:block  w-full h-full"
                      style={{ "--glow-color": "#389fd6" }}
                      /*   ref={ref} */
                    >
                      <div className="w-full h-full">
                        <div className="h-full w-full rounded-2xl">
                          <iframe
                            src="https://i.simmer.io/@Nixx/way--of-the-warrior"
                            style={{
                              width: "960px",
                              height: "600px",
                              borderRadius: "12px",
                            }}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description */}
                  <div className="w-full  flex flex-col justify-center items-center">
                    <p
                      className="text-sm leading-relaxed md:text-base glow:text-glow/[.80] font-heebo w-4/5 text-center"
                      style={{ "--glow-color": "#389fd6" }}
                    >
                      The Game was created as an University project together
                      with Sophie Kretschmann <br /> which got expanded on over
                      time. Goal was to create a fully functional scalable
                      Visual <br />
                      Novel prototype, with emphasis on an interactive story{" "}
                      multiple story paths <br />
                      based on the inventory system, players choices and a mini
                      game to break up the story in inside <br />
                      the game engine Unity. Initially for mobile but support
                      for other devices is planned.
                    </p>
                  </div>
                </div>

                {/* Bottom Section: "Time: 8 Weeks" and Button */}
                <div className="flex justify-between items-end  mt-4">
                  <p
                    className="opacity-50 text-sm glow:text-glow/[.80] font-heebo tracking-wide"
                    style={{ "--glow-color": "#2f4ad4" }}
                  >
                    <strong>Time:</strong> 4 Months
                  </p>
                </div>

                {/* Glow Overlay */}
                <div
                  className="glow-overlay"
                  style={{ "--glow-color": "#2f4ad4" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
