"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
import type { Depoimento } from "../types";

interface DepoimentosSectionProps {
  depoimentos: Depoimento[];
}

function DepoimentosSection({ depoimentos }: DepoimentosSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

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
    <section className="py-20 bg-gray-50">
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
            Quem usa, <span className="text-blue-500">aprova</span> e comprova resultados
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Junte-se a mais de 2.000 hoteleiros que escolheram a Foco para
            crescer e se destacar no mercado
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="/img-home-depoimentos.png"
                alt="Hoteleiro satisfeito com a Foco Tecnologia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-50 rounded-xl -z-10" />
          </div>

          {/* Right Column - Carousel */}
          <div className="flex flex-col justify-center">
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
                {depoimentos.map((depoimento) => (
                  <CarouselItem key={depoimento.id} className="basis-full pl-0">
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg h-full">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>

                      <p className="text-gray-700 text-base leading-relaxed mb-6">
                        &ldquo;{depoimento.texto}&rdquo;
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {depoimento.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {depoimento.autor}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {depoimento.cargo}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <CarouselPrevious
                  onClick={() => api?.scrollPrev()}
                  className="static translate-y-0 bg-white border-gray-200 text-gray-600 hover:bg-gray-50 w-9 h-9 rounded-full cursor-pointer"
                />
                <div className="flex gap-2">
                  {depoimentos.map((_, index) => (
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
                  className="static translate-y-0 bg-white border-gray-200 text-gray-600 hover:bg-gray-50 w-9 h-9 rounded-full cursor-pointer"
                />
              </div>
            </Carousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { DepoimentosSection };
