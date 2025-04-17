import { Navbar } from "@/app/components/navbar";
import { UsedTechList } from "@/app/components/usedTechList";

export default function Wotw() {
  return (
    <>
      <main className="flex flex-col items-center justify-between overflow-hidden p-10 font- bg-[#070707] text-white">
        <Navbar />
        <div className="w-full h-14" />
        <div className="md:hidden block w-full text-center p-6 border-2 border-pink/5  shadow-md rounded-2xl">
          <p className="text-lg md:text-xl leading-relaxed">
            Unfortunately, Unity currently doesn&apos;t support mobile browser
            games. Resulting in this screen, the game is only playable on
            desktop computers for now. However, a mobile version for both the
            App Store and Google Play is planned.
          </p>
        </div>
        <iframe
          className="hidden md:block"
          style={{
            width: "960px",
            height: "600px",
            borderRadius: "12px",
          }}
          src="https://itch.io/embed-upload/13405236?color=333333"
          width="960"
          height="620"
        >
          <a href="https://nixx-studios.itch.io/way-of-the-warrior">
            Play Way of the Warrior on itch.io
          </a>
        </iframe>
        <div className="w-full h-14" />
        <div className="md:w-2/5 font-heebo">
          <div className="bg-[#070707] pb-6 pt-4 px-6 rounded-xl bg-gradient-to-br from-purple-800/5 to-cyan-400/5 border-2 border-pink/5  shadow-md ">
            <div className="flex justify-between text-gray-400 text-sm">
              <p>
                <strong className="text-gray-500">2D Visual Novel</strong>
              </p>
              <p>
                <strong className="text-gray-500">Agency:</strong> Uni Project
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <h1 className="text-white text-2xl font-bold">
                Way of the Warrior
              </h1>
            </div>
            <UsedTechList technologies={["CSharp", "Unity", "Aseprite"]} />
            <p className="text-gray-400 text-sm mt-8 mb-6">
              <em>Way of the Warrior</em> is a weird, choice-driven visual novel
              prototype built in Unity with dynamic story paths, item-based
              progression, and mini-games.
            </p>

            <p className="text-gray-300 text-sm m-4">
              Travel through time in search of your destined partner. Your
              future child might either doom or save the world. As you repair
              your malfunctioning time machine, you’ll smuggle “souvenirs”
              across eras. How will people in the Middle Ages react to
              cybernetic implants? How will the Bible influence Ancient Egypt?
            </p>
          </div>
          <div className="w-full h-4" />
          <h2 className="text-xl font-bold">
            Where did the inspiration come from?
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4 ">
            This started as a university project with{" "}
            <strong className="text-white">Sophie Kretschmann</strong>, but
            quickly turned into something much bigger. Instead of relying on
            existing tools like Ren&apos;Py, we developed our own custom visual
            novel framework tailored to our gameplay needs—with branching
            stories written with{" "}
            <a
              key={1}
              href="https://www.inklestudios.com/ink/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Ink</strong>
            </a>
            , complex item logic, and narrative mini-game. Think{" "}
            <em>Zelda: Breath of the Wild&apos;s</em> &quot;one goal, infinite
            ways to get there&quot; vibe mixed with a dating sim parody.
          </p>

          <h2 className="text-xl font-bold mt-6">
            Why not just use Ren&apos;Py?
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4">
            While Ren&apos;Py is solid for classic visual novels, it fell short
            when we wanted create something breaking out of the visual novel
            norm, like non-linear storytelling, interactive item systems and
            more gameplay focused minigames. Building our own framework in Unity
            gave us total creative control.
          </p>
          <h2 className="text-xl font-bold mt-6">
            How can I turn off the music???
          </h2>
          <p className="leading-relaxed text-gray-200 text-base">
            I&apos;ll be adding an options menu soon where you can toggle music.
            Until then, you can lower or mute your browser tab manually — thanks
            for your patience!
          </p>
          <h2 className="text-xl font-bold mt-6 font-">What’s next?</h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4">
            <em>Way of the Warrior</em> was originally scoped for mobile, but as
            the vision grew, so did the platform. Now gearing up for a full
            release on <strong>Steam</strong>, with revamped UI, expanded,
            mechanics, full custom soundtrack, Artist-drawn backgrounds.
          </p>
          <p className="leading-relaxed text-gray-200 text-base">
            Time travel. Date across dimensions. Break history to fix the future
            and maybe fall in love — one bad decision at a time.
          </p>
        </div>
      </main>
    </>
  );
}
