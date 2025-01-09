import { Navbar } from "../components/navbar";
import { CartComponent } from "./CartComponent";
import { PixelBackground } from "../components/pixel-background/pixelBackground";
import { TransitionLink } from "../utils/TransitionLink";

export default function CyberpunkCar() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between overflow-hidden pb-10 px-10 bg-black">
        <div className="z-10 flex justify-evenly text-white">
          <div className="group bg-zinc-900/50 border-4 border-pink/5 rounded-2xl p-10 shadow-lg shadow-black/80  flex-col flex-wrap md:items-start items-center md:justify-between justify-center gap-6">
            <div className="flex-1 md:order-1 order-2 flex-grow">
              <TransitionLink href="/">
                <p>contact</p>
              </TransitionLink>
              <p className="opacity-50">3D modeling</p>
              <h2 className="font-bold text-4xl tracking-tighter mb-3 glow:text-glow/[.80] ">
                Cyberpunk Cart
              </h2>
            </div>
            <CartComponent />
            <div className="md:prose-base prose-lg prose-zinc prose-invert p-10 ">
              <p className="opacity-50">
                The Cart is low poli Cyberpunk cart modeled in Cinema4D. The
                concept is that the cart is hold together by magnetic fields.
                That is why the body and steeringwheel are in the air. The
                magnetic animation is done in the engine like unreal for
                performance reasons.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
