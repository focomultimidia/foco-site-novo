"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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
import { PRODUTOS_DATA } from "@/features/shared/data/produtos-data";
import type { ProdutoItem } from "@/features/shared/data/produtos-data";

// Backward-compat alias so existing imports of ProdutoData still resolve.
export type { ProdutoItem as ProdutoData };

// ── Section header ────────────────────────────────────────────────────────────

function ShowcaseHeader({ animate }: { animate: boolean }) {
  const content = (
    <div className="text-center mb-12">
      <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
        Sistema para hotéis e pousadas{" "}
        <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">aprovado por 97%</span>{" "}
        dos nossos clientes
      </h2>
      <p className="text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
        Da reserva à gestão financeira, nossa plataforma reúne produtos inovadores
        para otimizar cada detalhe do seu hotel ou pousada
      </p>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.div>
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────

interface ProductCardProps {
  produto:            ProdutoItem;
  index:              number;
  fullHeight?:        boolean;
  withEntryAnimation?: boolean;
}

function ProductCard({
  produto,
  index,
  fullHeight = false,
  withEntryAnimation = false,
}: ProductCardProps) {
  const { Icone: Icon, imagem } = produto;

  const card = (
    <div
      className={`
        group relative
        bg-white rounded-2xl p-5
        border border-gray-100 hover:border-blue-100
        shadow-sm hover:shadow-xl
        transition-all duration-300 overflow-hidden
        ${fullHeight ? "flex flex-col h-full" : ""}
      `}
    >
      <div className={`relative z-10 ${fullHeight ? "flex flex-col h-full" : ""}`}>

        {/* Title + icon */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display font-bold text-[#1e3a5f] tracking-tight leading-snug text-lg pr-10">
            {produto.titulo}
          </h3>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-md"
            style={{ backgroundColor: produto.accent, boxShadow: `0 4px 12px ${produto.accent}40` }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Product image */}
        <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center">
          <img
            src={imagem}
            alt={produto.titulo}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Description */}
        <p className={`text-gray-500 text-sm leading-relaxed mb-4 ${fullHeight ? "flex-grow" : ""}`}>
          {produto.descricao}
        </p>

        {/* Benefits list */}
        <ul className="space-y-2 mb-4">
          {produto.beneficios.map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-gray-600">
              <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: produto.accent }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA — reveals on hover */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${fullHeight ? "mt-auto" : ""}`}>
          <Button
            className="w-full text-white rounded-full py-2.5 text-sm font-medium"
            style={{ backgroundColor: produto.accent }}
            asChild
          >
            <a href={produto.link} className="flex items-center justify-center gap-2">
              Clique para mais detalhes
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

      </div>
    </div>
  );

  if (!withEntryAnimation) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {card}
    </motion.div>
  );
}

// ── GridView ──────────────────────────────────────────────────────────────────

function GridView() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUTOS_DATA.map((p, i) => (
        <ProductCard key={p.id} produto={p} index={i} withEntryAnimation />
      ))}
    </div>
  );
}

// ── CarouselView ──────────────────────────────────────────────────────────────

function CarouselView() {
  const [api, setApi]         = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount]     = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {PRODUTOS_DATA.map((p, i) => (
            <CarouselItem key={p.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
              <ProductCard produto={p} index={i} fullHeight />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden lg:block">
          <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
          <CarouselNext    className="-right-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
        </div>
      </Carousel>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-blue-500" : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}

// ── ProductShowcase ───────────────────────────────────────────────────────────

export interface ProductShowcaseProps {
  viewMode?: "grid" | "carousel";
}

function ProductShowcase({ viewMode = "carousel" }: ProductShowcaseProps) {
  return (
    <section className={`py-20 ${viewMode === "grid" ? "bg-white" : "bg-slate-50"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader animate={viewMode === "grid"} />
        {viewMode === "grid" ? <GridView /> : <CarouselView />}
      </div>
    </section>
  );
}

export { ProductShowcase };
