"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoscroll from "embla-carousel-auto-scroll";
import { techIcons } from "@/app/components/usedTechList";

export const MobileSkills = () => {
  const iconsArray = Object.entries(techIcons);
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoscroll({ stopOnMouseEnter: true, stopOnInteraction: false }),
      ]}
      className="w-full max-w-screen-xl"
    >
      <CarouselContent className="-ml-1">
        {iconsArray.map(([name, Icon], index) => (
          <CarouselItem
            key={index}
            className="pl-1 sm:basis-1/4 basis-1/3 md:basis-1/6"
          >
            <div className="p-3">
              <Card className="border-2 border-pink/5 bg-inherit h-full">
                <CardContent className="flex flex-col items-center justify-center h-full py-6 px-2 gap-2">
                  <div className="text-4xl text-white">{Icon}</div>
                  <div className="text-sm text-white font-heebo text-center">
                    {name}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
