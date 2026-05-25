import { Carousel } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const highlights = [
  {
    tag: "11 km away",
    title: "Walk the gorge of a lifetime",
    description:
      "The Caminito del Rey clings to the walls of the El Chorro gorge. One of the most dramatic walks in Europe. You'll be back for dinner.",
    image: "/caminito.jpg",
  },
  {
    tag: "GR-340 trail",
    title: "Ride out. Get lost. Find yourself.",
    description:
      "The GR-340 passes right through the village. Climb into the hills on two wheels or two feet, through olive groves, limestone ridges and zero crowds.",
    image: "/mb.jpg",
  },
  {
    tag: "Within 1 hour",
    title: "Three cities, one base.",
    description:
      "Málaga's waterfront, Antequera's dolmens, Ronda's cliffside views. All within an hour. Stay here. Go everywhere.",
    image: "/malaga.jpg",
  },
  {
    tag: "Local life",
    title: "Spain as it used to be",
    description:
      "Valle de Abdalajís hasn't been packaged for tourists. And that's exactly the point. Sit on a terrace, order something cold, and let the afternoon disappear.",
    image: "/local.jpg",
  },
];

export default function SurroundingsCarousel() {
  return (
    <div>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">The surroundings</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-casa-text leading-tight">
            Step outside. There's a lot to do.
          </h2>
        </div>
      </div>

      <Carousel.Root defaultPage={0} slideCount={highlights.length}>
        <div className="relative">
          <Carousel.ItemGroup className="overflow-hidden rounded-3xl">
            {highlights.map((item, index) => (
              <Carousel.Item key={index} index={index}>
                <div className="relative h-[480px] md:h-[580px] w-full overflow-hidden rounded-3xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                      {item.tag}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/75 text-base leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          {/* Top arrows */}
          <Carousel.Control className="absolute top-5 left-0 right-0 flex items-start justify-between px-5 pointer-events-none">
            <Carousel.PrevTrigger className="pointer-events-auto p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white transition-all">
              <ChevronLeft size={22} />
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger className="pointer-events-auto p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white transition-all">
              <ChevronRight size={22} />
            </Carousel.NextTrigger>
          </Carousel.Control>
        </div>

        <Carousel.IndicatorGroup className="flex justify-center items-center mt-5 gap-2">
          {highlights.map((_, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className="h-1.5 w-6 rounded-full bg-gray-300 data-[current]:bg-casa-teal data-[current]:w-10 transition-all cursor-pointer"
            />
          ))}
        </Carousel.IndicatorGroup>
      </Carousel.Root>
    </div>
  );
}
