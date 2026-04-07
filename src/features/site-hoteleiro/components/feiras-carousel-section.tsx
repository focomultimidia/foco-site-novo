"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const feiras = [
  {
    id: "1",
    imagem: "https://images.unsplash.com/photo-1540575465583-0e6896e9a2f5?w=800&h=500&fit=crop",
    titulo: "Abav Expo",
    local: "São Paulo, SP",
    ano: "2024",
  },
  {
    id: "2",
    titulo: "Festuris",
    local: "Gramado, RS",
    ano: "2024",
    imagem: "https://images.unsplash.com/photo-1517457373958-b7c5f3c4f8e0?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    titulo: "Equipotel",
    local: "São Paulo, SP",
    ano: "2024",
    imagem: "https://images.unsplash.com/photo-1505373877841-b4170886d440?w=800&h=500&fit=crop",
  },
];

function FeirasCarouselSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4">
            Presente nas principais{" "}
            <span className="text-blue-500">feiras do setor</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Acompanhamos de perto as novidades e tendências da hotelaria
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {feiras.map((feira) => (
                <CarouselItem key={feira.id} className="basis-full pl-0">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <div className="aspect-[16/10] bg-slate-200">
                      <img
                        src={feira.imagem}
                        alt={feira.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white font-bold text-xl mb-1">
                        {feira.titulo}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {feira.local} • {feira.ano}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious
                onClick={() => api?.scrollPrev()}
                className="static translate-y-0 bg-white border-gray-200 text-gray-600 hover:bg-gray-50 w-10 h-10 rounded-full shadow-sm cursor-pointer"
              />
              <div className="flex gap-2">
                {feiras.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      index === current ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext
                onClick={() => api?.scrollNext()}
                className="static translate-y-0 bg-white border-gray-200 text-gray-600 hover:bg-gray-50 w-10 h-10 rounded-full shadow-sm cursor-pointer"
              />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}

export { FeirasCarouselSection };
