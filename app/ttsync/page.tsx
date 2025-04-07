import { Navbar } from "@/app/components/navbar";
import { UsedTechList } from "@/app/components/usedTechList";

export default function Ttsync() {
  return (
    <>
      <main className="flex flex-col items-center justify-between overflow-hidden p-10 font- bg-[#070707] text-white">
        <Navbar />
        <div className="w-full h-14" />
        <iframe
          src="https://i.simmer.io/@Nixx/way--of-the-warrior"
          style={{
            width: "960px",
            height: "600px",
            borderRadius: "12px",
          }}
        ></iframe>
        <div className="w-full h-14" />
        <div className="md:w-2/5 font-heebo">
          <div className="bg-[#070707] pb-6 pt-4 px-6 rounded-xl bg-gradient-to-br from-purple-800/5 to-cyan-400/5 border-2 border-pink/5  shadow-md ">
            <div className="flex justify-between text-gray-400 text-sm">
              <p>
                <strong className="text-gray-500">2D Endless Runner</strong>
              </p>
              <p>
                <strong className="text-gray-500">Agency:</strong> Uni Project
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <h1 className="text-white text-2xl font-bold">
                Time Travel Sync
              </h1>
            </div>
            <UsedTechList technologies={["CSharp", "Unity", "Aseprite"]} />
            <p className="text-gray-400 text-sm mt-9 mb-2">
              <em>Time Travel Sync</em> initially developed while working on a
              minigame in <em>Way of the Warrior</em> The minigame expanded in
              complexity and depth. is procedurally generated endless runner
              emphasizing on fluid gameplay which has a stronger learning curve
              then expected.
            </p>
          </div>
          <div className="w-full h-4" />
          <h2 className="text-xl font-bold">
            Where did the inspiration come from?
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4 ">
            It obviously started as a pac man parody. But perfecting the
            movement really grew on me. Now I feel like depending on the enemy
            count it might be too difficult as a simple minigame in a visual
            novel
          </p>
          <h2 className="text-xl font-bold mt-6">Controls</h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4">
            <kbd className="text-white">WASD</kbd> to move,{" "}
            <kbd className="text-white">Space</kbd> to jump and{" "}
            <kbd className="text-white">Shift</kbd> to dash.
          </p>
          <h2 className="text-xl font-bold mt-6">
            The platforms are too high?
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4">
            That&apos;s intentional! You&apos;re meant to use momentum and jump
            between walls to reach higher areas.{" "}
            <strong>Try not to panic.</strong> It&apos;s all about flow and
            timing.
          </p>
          <h2 className="text-xl font-bold mt-6">Dash</h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4">
            Use dash to burst through enemies or shift your movement mid-air.
            You can even cancel it with <kbd>Space</kbd> to chain moves or
            adjust direction, depending on your input at the moment.
          </p>
          <h2 className="text-xl font-bold mt-6">What&apos;s next?</h2>
          <p className="text-gray-300 text-sm leading-relaxed my-4">
            Right now, the game might feel a bit too intense for a visual novel
            setting. I plan to rework it with full enemy animations, improved
            AI, better UX, I think enemy behavior phases — like idle, alert, and
            attack — would really help with the stress factor
          </p>
          <h2 className="text-xl font-bold mt-6">
            How can I turn off the music???
          </h2>
          <p className="leading-relaxed text-gray-200 text-base">
            I&apos;ll be adding an options menu soon where you can toggle music.
            Until then, you can lower or mute your browser tab manually — thanks
            for your patience!
          </p>
        </div>
      </main>
    </>
  );
}
