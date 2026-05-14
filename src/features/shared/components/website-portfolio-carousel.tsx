"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface WebsiteTemplate {
  id: string;
  nome: string;
  categoria: string;
  imagemUrl: string;
  previewUrl: string;
}

const TEMPLATES: WebsiteTemplate[] = [
  {
    id: "1",
    nome: "Royal Resort",
    categoria: "Resort & Spa",
    imagemUrl: "/assets/imgs/motor-de-reservas/1.png?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "2",
    nome: "Boutique Urban",
    categoria: "Hotel Urbano",
    imagemUrl: "/assets/imgs/motor-de-reservas/2.png?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "3",
    nome: "Pousada Serena",
    categoria: "Pousada & Chalé",
    imagemUrl: "/assets/imgs/motor-de-reservas/3.png?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "4",
    nome: "Fazenda Vista",
    categoria: "Hotel Fazenda",
    imagemUrl: "/assets/imgs/motor-de-reservas/4.png?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "5",
    nome: "Minimal Suite",
    categoria: "Boutique & Design",
    imagemUrl: "/assets/imgs/motor-de-reservas/5.png?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
];

// Variants defined outside the component to prevent recreation on each render
const btnVariants = {
  idle: {
    scale: 1,
    background: "rgba(255,255,255,0.08)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
  },
  hover: {
    scale: 1.12,
    background: "rgba(255,255,255,0.20)",
    boxShadow: "0 10px 36px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.28)",
  },
  tap: {
    scale: 0.90,
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
  },
};

const glowVariants = {
  idle: { opacity: 0, scale: 0.6 },
  hover: { opacity: 1, scale: 1 },
  tap: { opacity: 0.4, scale: 0.9 },
};

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const side = direction === "prev" ? "-left-6" : "-right-6";

  return (
    <motion.button
      onClick={onClick}
      aria-label={direction === "prev" ? "Slide anterior" : "Próximo slide"}
      className={`absolute top-1/2 -translate-y-1/2 ${side} hidden lg:flex items-center justify-center w-12 h-12 rounded-full z-20 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.22)",
      }}
      variants={btnVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      {/* Radial glow that sweeps in on hover */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22), transparent 68%)",
        }}
        variants={glowVariants}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      <Icon
        className="w-5 h-5 text-white relative z-10 drop-shadow-sm"
        strokeWidth={1.5}
      />
    </motion.button>
  );
}

function WebsitePortfolioCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section className="py-20 relative flex overflow-hidden bg-[url('/assets/imgs/hero/bkg-modelos-sites4.png')] bg-cover bg-center">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-white leading-none tracking-tighter antialiased mb-4">
            Sites de alta performance para{" "}
            <span className="text-yellow-400">vendas diretas</span>
          </h2>
          <p className="text-white mt-4 max-w-3xl mx-auto">
            Escolha o modelo de sua preferência ou personalize seu site e potencialize sua lucratividade com uma ferramenta desenhada para converter visitantes em hóspedes.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {TEMPLATES.map((template) => (
              <CarouselItem
                key={template.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative bg-white rounded-2xl overflow-hidden border-2 border-white">

                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={template.imagemUrl}
                      alt={template.nome}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/55 transition-colors duration-300 flex items-center justify-center">
                      <a
                        href={template.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 bg-white text-[#1e3a5f] text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-50"
                      >
                        <ExternalLink className="w-4 h-4" strokeWidth={2} />
                        Ver modelo do site
                      </a>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-500">
                      {template.categoria}
                    </span>
                    <h3 className="text-base font-bold text-[#1e3a5f] mt-1">
                      {template.nome}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom glassmorphic nav buttons — desktop only */}
          <NavButton direction="prev" onClick={() => api?.scrollPrev()} />
          <NavButton direction="next" onClick={() => api?.scrollNext()} />
        </Carousel>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-blue-100 w-8"
                  : "w-2.5 bg-blue-400 hover:bg-blue-100"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export { WebsitePortfolioCarousel };
