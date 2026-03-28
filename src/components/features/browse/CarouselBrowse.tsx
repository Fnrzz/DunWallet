import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";

const CarouselBrowse = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="w-full flex flex-col gap-4">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full h-[200px]"
      >
        <CarouselContent className="h-full ">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-full w-full">
              <Image
                src="/test.webp"
                alt={`test ${index}`}
                width={500}
                height={200}
                className="w-full h-[200px] object-center object-cover rounded-2xl"
                priority
                unoptimized
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center items-center gap-2">
        {(() => {
          const maxDots = 4;
          const startDot = Math.max(
            0,
            Math.min(current - Math.ceil(maxDots / 2), count - maxDots),
          );

          return Array.from({ length: Math.min(count, maxDots) }).map(
            (_, idx) => {
              const i = startDot + idx;
              return (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current - 1 ? "w-6 bg-black" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              );
            },
          );
        })()}
      </div>
    </div>
  );
};

export default CarouselBrowse;
