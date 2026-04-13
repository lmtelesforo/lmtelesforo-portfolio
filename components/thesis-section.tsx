import React from "react";
import MatrixRain from "@/components/matrix-rain";
import Masonry from "@/components/Masonry";
import { lifePhotos } from "@/components/icons/life";

const masonryItems = [
    { id: "1", img: lifePhotos.a1, height: 400 },
    { id: "2", img: lifePhotos.a2, height: 250 },
    { id: "3", img: lifePhotos.a3, height: 600 },
    { id: "4", img: lifePhotos.a6, height: 300 },
    { id: "5", img: lifePhotos.a5, height: 500 },
    { id: "6", img: lifePhotos.a4, height: 350 },
    { id: "7", img: lifePhotos.a7, height: 450 },
    { id: "8", img: lifePhotos.a8, height: 400 },
    { id: "9", img: lifePhotos.a9, height: 300 },
    { id: "10", img: lifePhotos.a10, height: 550 },
];

export function ThesisSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 pt-4 pb-20 md:pt-8 md:pb-25 bg-background scroll-mt-15 lg:scroll-mt-15">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm -z-5 pointer-events-none" />
      <MatrixRain />
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-14 flex items-center gap-4 mt-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="font-sans text-[15px] font-medium tracking-[0.2em] uppercase text-primary">
            ABOUT ME
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        <div className="flex flex-col gap-8 font-sans text-sm leading-[1.8] text-primary-light md:text-base">
          <p>
            I thrive at the {" "}
            <span className="text-foreground">intersection of logic and impact</span>. As a Computer Science senior at the University of the Philippines Los Baños, my work focuses on using Artificial Intelligence to solve tangible, real-world problems.
          </p>
          <p>
            Whether I’m optimizing SqueezeNet models for infrastructure maintenance or managing cross-functional teams at Limitless Lab, my goal is to build software that is {" "}
            <span className="text-foreground">
              as empathetic as it is intelligent
            </span>
            . I don't just write code; I design solutions that bridge the physical and digital worlds.
          </p>

          <blockquote className="relative my-4 border-l-2 border-primary/60 pl-6">
            <p className="font-sans text-l font-medium italic leading-relaxed text-foreground md:text-xl">
              Powered by logic, fueled by the people I love. See my life beyond code.
            </p>
          </blockquote>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto mt-10 px-0 md:px-4">
        <Masonry
          items={masonryItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
        />
      </div>
      
      {/* Smooth gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}
