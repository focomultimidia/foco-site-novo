"use client";

import { motion } from "framer-motion";
import { Play, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";
import type { Case } from "../types";

interface CasesSectionProps {
  cases: Case[];
}

function CasesSection({ cases }: CasesSectionProps) {
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

  const visibleCases = cases.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4">
            O que hoteleiros dizem sobre a{" "}
            <span className="text-blue-500">Foco</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Mais do que tecnologia, entregamos resultados reais. Conheça a
            opinião de quem já transformou seu hotel com as soluções da Foco.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-8xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {visibleCases.map((caseItem) => (
                <CarouselItem
                  key={caseItem.id}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group cursor-pointer">
                    <div className="relative rounded-2xl overflow-hidden aspect-video mb-4">
                      <img
                        src={caseItem.imagem}
                        alt={caseItem.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                        <User className="w-3.5 h-3.5" />
                        {caseItem.tipo}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-blue-600 ml-1" />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {caseItem.titulo}
                    </h3>
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
                {visibleCases.map((_, index) => (
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

export { CasesSection };
