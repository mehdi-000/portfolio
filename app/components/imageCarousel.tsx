"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type ImageCarouselProps = {
  imagesPath: string[];
  directoryPath: string;
};

export const ImageCarousel = ({
  imagesPath,
  directoryPath,
}: ImageCarouselProps) => {
  return (
    <Carousel opts={{ loop: true }} className="w-full max-w-(--breakpoint-xl)">
      <CarouselContent className="-ml-1">
        <CarouselItem className="pl-1 basis-full sm:basis-1/2 md:basis-1/2">
          <div className="p-3 h-full flex items-center justify-center">
            <Card className="border-2 border-pink/5 bg-inherit h-full">
              <CardContent className="flex items-center justify-center h-56 sm:h-64 md:h-80 w-full text-center p-6">
                <p className=" text-sm sm:text-base md:text-xl leading-relaxed text-white">
                  Unfortunately, Unity currently doesn&apos;t support mobile
                  browser games. Resulting in this screen, the game is only
                  playable on desktop computers for now. However, a mobile
                  version for both the App Store and Google Play is planned.
                </p>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        {imagesPath.map((filename, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-full sm:basis-1/2 md:basis-1/2"
          >
            <div className="p-3">
              <Card className="border-2 border-pink/5 bg-inherit h-full">
                <CardContent className="relative h-56 sm:h-64 md:h-80 w-full">
                  <Image
                    src={`/pictures/${directoryPath}/${filename}`}
                    alt={filename}
                    fill
                    className="rounded-2xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-inherit border-2 border-pink/5 hover:bg-[#38B9D6]" />
      <CarouselNext className="bg-inherit border-2 border-pink/5 hover:bg-[#38B9D6]" />
    </Carousel>
  );
};
