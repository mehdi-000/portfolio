"use client";
import { Navbar } from "@/app/components/navbar";
import { UsedTechList } from "@/app/components/usedTechList";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function LegacyLines() {
  return (
    <main className="flex flex-col items-center justify-between overflow-hidden p-10 font- bg-[#070707] text-white">
      <Navbar />
      <div className="w-full h-14" />
      <div className="w-10/12 ">
        <Carousel
          opts={{ loop: true }}
          className="w-full max-w-(--breakpoint-xl)"
        >
          <CarouselContent className="-ml-1">
            {[
              "add_family_dark.png",
              "add_familytree_dark.png",
              "choose_familytree_dark.png",
              "choose_familytree_light.png",
              "familytree_dark.png",
              "familytree_light.png",
              "map_light.png",
            ].map((filename, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-full sm:basis-1/2 md:basis-1/2"
              >
                <div className="p-3">
                  <Card className="border-2 border-pink/5 bg-inherit h-full">
                    <CardContent className="relative h-56 sm:h-64 md:h-80 w-full">
                      <Image
                        src={`/pictures/legacy-lines/${filename}`}
                        alt={filename}
                        fill
                        className="rounded-2xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      </div>
      {/*
    <div className="h-full w-3/5">
        <iframe
          src="https://legacylines.up.railway.app/"
          className=" hidden md:block w-full h-[400px] md:h-[600px] lg:h-[800px] rounded-xl overflow-hidden border-none"
          ></iframe>
      </div>
       */}
      <div className="w-full h-14" />
      <div className="md:w-2/5 font-heebo">
        <div className="bg-[#070707] pb-6 pt-4 px-6 rounded-xl bg-gradient-to-br from-purple-800/5 to-cyan-400/5 border-2 border-pink/5  shadow-md ">
          <div className="flex justify-between text-gray-400 text-sm">
            <p>
              <strong className="text-gray-500">Website</strong>
            </p>
            <p>
              <strong className="text-gray-500">Agency:</strong> Uni Project
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <h1 className="text-white text-2xl font-bold">Legacy Lines</h1>
          </div>
          <UsedTechList technologies={["VueJs", "MySQL", "NodeJs", "Prisma"]} />
          <p className="text-gray-400 text-sm mt-9 mb-2">
            A modern full-stack proof-of-concept application, developed in a
            short time as part of a university course. The project visualizes
            family trees using an interactive 2D interface. It is built with
            Vue.js on the frontend and Express.js with MySQL and Prisma on the
            backend.
          </p>
        </div>
        <div className="w-full h-4" />
        <h2 className="text-xl font-bold">Where can I access the page?</h2>
        <p className="text-gray-300 text-sm leading-relaxed my-4">
          I used to have it linked here, but I&apos;m currently working on
          improvements. I&apos;ll put it back up once it&apos;s finished.
        </p>
        <h2 className="text-xl font-bold">
          Why can&apos;t I see any family trees?
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed my-4">
          You need to be logged in to access the features of the site. Once
          you&apos;re in, you can create profiles, add or modify family trees,
          and manage access for other accounts.
        </p>

        <h2 className="text-xl font-bold">Why is the design so...?</h2>
        <p className="text-gray-300 text-sm leading-relaxed my-4">
          I built this app under a tight deadline while experimenting with new
          ideas, so the design and UX are a bit &quot;unique.&quot; That said, I
          really like the concept and plan to revisit and improve the site when
          I have more time.
        </p>

        <h2 className="text-xl font-bold">I don&apos;t speak German?</h2>
        <p className="text-gray-300 text-sm leading-relaxed my-4">
          No worries! I plan to fully rework this project in the future with a
          better design, improved UX, English translation, and a bunch of new
          features.
        </p>
      </div>
    </main>
  );
}
