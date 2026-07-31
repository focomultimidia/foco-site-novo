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
    imagemUrl: "/assets/imgs/shared/1.webp?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "2",
    nome: "Boutique Urban",
    categoria: "Hotel Urbano",
    imagemUrl: "/assets/imgs/shared/2.webp?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "3",
    nome: "Pousada Serena",
    categoria: "Pousada & Chalé",
    imagemUrl: "/assets/imgs/shared/3.webp?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "4",
    nome: "Fazenda Vista",
    categoria: "Hotel Fazenda",
    imagemUrl: "/assets/imgs/shared/4.webp?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
  {
    id: "5",
    nome: "Minimal Suite",
    categoria: "Boutique & Design",
    imagemUrl: "/assets/imgs/shared/5.webp?w=700&h=328&fit=crop",
    previewUrl: "#",
  },
];

// Variants defined outside the component to prevent recreation on each render
const btnVariants = {
  idle: {
    scale: 1,
    background: "#ffffff",
    boxShadow: "0 1px 2px rgba(19,40,64,0.05), 0 12px 28px -16px rgba(19,40,64,0.28)",
  },
  hover: {
    scale: 1.12,
    background: "#f4f7fb",
    boxShadow: "0 4px 10px rgba(19,40,64,0.08), 0 16px 36px -16px rgba(19,40,64,0.34)",
  },
  tap: {
    scale: 0.90,
    background: "#eef2f7",
    boxShadow: "0 2px 8px rgba(19,40,64,0.12)",
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
      // top-[38%] em vez de top-1/2: centraliza o botão na imagem do card, não
      // na altura total do item (que inclui a legenda abaixo da imagem).
      // O -50% de recentragem vai no `style.y`, não numa classe -translate-y:
      // o Framer Motion já controla `transform` por causa do `scale` do
      // btnVariants, e uma classe Tailwind de transform seria descartada.
      className={`absolute top-[38%] ${side} hidden lg:flex items-center justify-center w-12 h-12 rounded-full z-20 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992]/40`}
      style={{ y: "-50%", border: "1px solid rgba(19,40,64,0.09)" }}
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
            "radial-gradient(circle at 50% 50%, rgba(40,89,146,0.14), transparent 68%)",
        }}
        variants={glowVariants}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      <Icon
        className="w-5 h-5 text-[#285992] relative z-10"
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
    // O PNG de fundo saiu: a superfície é #f4f7fb e os modelos de site
    // passam a ser as únicas peças com imagem — sem competição visual.
    <section className="py-20 relative flex overflow-hidden bg-[#f4f7fb]">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#132840] leading-none tracking-tighter antialiased mb-4">
            Sites de alta performance para{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">vendas diretas</span>
          </h2>
          <p className="text-[#4c5c73] mt-4 max-w-3xl mx-auto">
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
          {/* O viewport do Embla PRECISA de overflow-x:hidden (esconder slides
              fora da faixa) — mas misturar overflow-x:hidden com overflow-y:
              visible não funciona como parece: a spec recalcula o eixo
              "visible" para "auto", e overflow:auto ainda CORTA sombra (só
              não mostra scrollbar quando não há conteúdo de layout
              transbordando). Por isso a sombra continuava cortada mesmo com
              aquele ajuste. A correção real: dar respiro vertical DENTRO de
              cada slide (pt-4 pb-8 no wrapper abaixo), para a sombra nunca
              precisar sair da própria caixa do slide — sem depender de
              relaxar o overflow do viewport compartilhado. */}
          <CarouselContent className="-ml-4">
            {TEMPLATES.map((template) => (
              <CarouselItem
                key={template.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                {/* overflow-hidden vive no wrapper da imagem, não no card: este
                    div de fora carrega a sombra (.paper/.paper-hover) e o
                    translateY do hover, e um overflow-hidden na MESMA caixa
                    que desenha a sombra cortaria a própria sombra. */}
                <div className="pt-4 pb-8">
                <div className="group relative rounded-3xl paper paper-hover">

                  <div className="relative overflow-hidden rounded-t-3xl aspect-[16/10]">
                    <img
                      src={template.imagemUrl}
                      alt={template.nome}
                      width={1280}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
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
                  ? "bg-[#285992] w-8"
                  : "w-2.5 bg-[#285992]/25 hover:bg-[#285992]/50"
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
