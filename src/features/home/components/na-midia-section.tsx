"use client";

import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { ArtigoMidia } from "../types";

interface NaMidiaSectionProps {
  artigos: ArtigoMidia[];
}

function NaMidiaSection({ artigos }: NaMidiaSectionProps) {
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
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            <span>Na mídia</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4">
            Reconhecidos pela <span className="text-blue-500">mídia</span>, escolhidos pelos{" "}
            <span className="text-blue-500">hoteleiros</span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            As principais publicações do setor destacam nossos sistemas como
            referência em tecnologia e eficiência para hotéis e pousadas
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
              {artigos.map((artigo) => (
                <CarouselItem key={artigo.id} className="basis-full pl-0">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-56 md:h-auto min-h-[280px]">
                        <img
                          src={`https://images.unsplash.com/photo-${
                            artigo.id === "1"
                              ? "1551288049-bebda4e38f71"
                              : artigo.id === "2"
                              ? "1460925895917-afdab827c52f"
                              : "1556761175-5973dc0f32e7"
                          }?w=600&h=400&fit=crop`}
                          alt={artigo.titulo}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
                      </div>

                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Newspaper className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {artigo.publicacao}
                            </div>
                            <div className="text-xs text-gray-500">
                              {artigo.data}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                          {artigo.titulo}
                        </h3>

                        <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                          {artigo.descricao}
                        </p>

                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto text-sm font-medium group w-fit rounded-full"
                          asChild
                        >
                          <a href={artigo.link}>
                            Ler artigo completo
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
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
                {artigos.map((_, index) => (
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

export { NaMidiaSection };
