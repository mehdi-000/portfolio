import { useTransitionRouter } from "next-transition-router";
import { useEffect, useState } from "react";
import Slider from "react-infinite-logo-slider";

export const Contact = () => {
  const router = useTransitionRouter();
  const [hovered, setHovered] = useState(false);
  const over = (e: { stopPropagation: () => any }) => (
    e.stopPropagation(), setHovered(true)
  );
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <Slider
      width="250px"
      duration={40}
      pauseOnHover={true}
      blurBorders={false}
      blurBorderColor={"#fff"}
    >
      <Slider.Slide>
        <div
          onClick={() => console.log("lets go")}
          onPointerOver={over}
          onPointerOut={out}
        >
          <img src="/pictures/2.png" alt="any" className="w-36" />
        </div>
      </Slider.Slide>
      <Slider.Slide>
        <div
          onClick={() => console.log("lets go")}
          onPointerOver={over}
          onPointerOut={out}
        >
          <img src="/pictures/4.png" alt="any2" className="w-36" />
        </div>
      </Slider.Slide>
      <Slider.Slide>
        <div
          onClick={() => console.log("lets go")}
          onPointerOver={over}
          onPointerOut={out}
        >
          <img src="/pictures/7.png" alt="any3" className="w-36" />
        </div>
      </Slider.Slide>
      <Slider.Slide>
        <div>Other component...</div>
      </Slider.Slide>
    </Slider>
  );
};
