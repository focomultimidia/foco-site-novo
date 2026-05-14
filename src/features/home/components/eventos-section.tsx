"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket } from "lucide-react";

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
import type { Evento } from "../types";

interface EventosSectionProps {
  eventos: Evento[];
}

function EventosSection({ eventos }: EventosSectionProps) {
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
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Ticket className="w-4 h-4" />
            <span>Eventos</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Presença da Foco nas principais{" "}
            <span className="text-blue-500">Feiras de Hotelaria</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
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
            <CarouselContent className="-ml-0 py-10 -my-10">
              {eventos.map((evento) => (
                <CarouselItem key={evento.id} className="basis-full pl-0">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-56 md:h-auto min-h-[280px]">
                        <img
                          src={
                            evento.id === "1"
                              ? "/assets/imgs/feiras-eventos/equipotel-2025.jpg"
                              : evento.id === "2"
                              ? "/assets/imgs/feiras-eventos/expohotel-2025.jpg"
                              : "/assets/imgs/feiras-eventos/expohotel-2024.jpg"
                          }
                          alt={evento.titulo}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                      </div>

                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {evento.data}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            {evento.local}
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-3">
                          {evento.titulo}
                        </h3>

                        <p className="text-gray-500 text-sm mb-6">
                          {evento.descricao}
                        </p>
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
                {eventos.map((_, index) => (
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

export { EventosSection };
