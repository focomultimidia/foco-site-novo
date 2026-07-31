"use client";

/**
 * SoftwareProductsCarousel — compact cross-sell rail used on the internal
 * product pages. Deliberately a different object from the home page's
 * ProductShowcase: tall, narrow cards that read at four-up, where the home
 * grid runs two-up with a full product screenshot.
 *
 * The card's illustration is not decoration — it is built from the product's
 * own `beneficios`, fanned out as a stack of glass chips. The content is the
 * picture, so nothing here can drift out of sync with the copy.
 */

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
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

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Brand-blue reading of the reference palette: a tinted field for the scene,
// white for the card, a single accent for marks.
const TINT_FROM = "#E4EEFA";
const TINT_VIA = "#EFF5FC";
const TINT_TO = "#F9FBFE";
const ACCENT = "#285992";
const ACCENT_SOFT = "#427AB9";

// ── Scene ─────────────────────────────────────────────────────────────────────

function ProductScene({ produto }: { produto: ProdutoItem }) {
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-[20px]"
      style={{ background: `linear-gradient(to bottom, ${TINT_FROM}, ${TINT_VIA} 55%, ${TINT_TO})` }}
    >
      {/* Halo — light pooling behind the screen */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl
                   transition-opacity duration-500 group-hover:opacity-90"
        style={{ backgroundColor: `${ACCENT_SOFT}40`, opacity: 0.55 }}
      />

      {/* Concentric rings — depth cue behind the screen */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/3">
        {[132, 98].map((s, i) => (
          <div
            key={s}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
            style={{ width: s, height: s, opacity: 0.5 - i * 0.14 }}
          />
        ))}
      </div>

      {/* The same product mockup used on the home cards, anchored to the bottom
          so it rises into frame and crops — the panel shows the top of the
          screen rather than a shrunken whole. Nothing here animates its own
          entrance; the card's reveal covers it. */}
      <div
        className="absolute inset-x-3.5 top-4 overflow-hidden rounded-t-[9px]
                   ring-1 ring-slate-900/10
                   shadow-[0_2px_6px_-2px_rgba(15,40,80,0.12),0_16px_28px_-14px_rgba(15,40,80,0.32)]
                   transition-transform duration-500 ease-out group-hover:-translate-y-1"
      >
        <img src={produto.screenshot} alt="" loading="lazy" className="block w-full" />
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function CompactProductCard({ produto, index }: { produto: ProdutoItem; index: number }) {
  const { Icone: Icon } = produto;

  return (
    // Solid 2px white rim around a lightly translucent card.
    <motion.div
      className="group h-full rounded-[28px] bg-white p-[2px]
                 shadow-[0_2px_4px_-2px_rgba(15,40,80,0.05),0_14px_34px_-22px_rgba(15,40,80,0.30)]
                 transition-shadow duration-500
                 hover:shadow-[0_4px_8px_-4px_rgba(15,40,80,0.07),0_26px_54px_-26px_rgba(15,40,80,0.42)]"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: EASE }}
    >
      <article className="flex h-full flex-col rounded-[26px] bg-white/60 p-2.5 backdrop-blur-xl">
      <ProductScene produto={produto} />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl
                       bg-[#285992]/[0.08] ring-1 ring-inset ring-[#285992]/15
                       transition-transform duration-500 group-hover:-translate-y-0.5"
          >
            <Icon className="h-[17px] w-[17px] text-[#285992]" />
          </span>
          <h3 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-[#1e3a5f]">
            {produto.titulo}
          </h3>
        </div>
        <p className="mt-3 line-clamp-3 text-[12.5px] leading-relaxed text-slate-500">
          {produto.descricao}
        </p>

        {/* Benefits — read as a spec list under the summary */}
        <ul className="mt-4 flex flex-col gap-1.5">
          {produto.beneficios.map((b) => (
            <li
              key={b}
              className="flex items-center gap-1.5 rounded-full border border-slate-200/80
                         bg-slate-50/80 py-1.5 pl-1.5 pr-3"
            >
              <span
                className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${ACCENT}14` }}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} style={{ color: ACCENT }} />
              </span>
              <span className="truncate text-[10.5px] font-medium leading-none text-slate-700">
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Action — icon-only, right-aligned. Same mark as the home card's
            corner button, scaled down and kept inside the card. */}
        <div className="mt-auto flex justify-end pt-4">
          <a
            href={produto.link}
            aria-label={`Conhecer ${produto.titulo}`}
            className="group/btn flex h-11 w-11 items-center justify-center rounded-full bg-[#1e3a5f]
                       transition-[background-color,transform] duration-300
                       hover:scale-105 hover:bg-[#285992]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992] focus-visible:ring-offset-2
                       motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <ArrowUpRight
              className="h-[18px] w-[18px] text-white transition-transform duration-300
                         group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5
                         motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
      </article>
    </motion.div>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────

function SoftwareProductsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    // overflow-hidden lets the carousel viewport below expand past the
    // container's gutter without adding a horizontal scrollbar to the page.
    <section className="overflow-hidden bg-[#f4f7fb] py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display mb-4 text-4xl font-medium leading-none tracking-tighter text-[#1e3a5f] antialiased sm:text-5xl">
            Sistema para hotéis e pousadas{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              aprovado por 97%
            </span>{" "}
            dos nossos clientes
          </h2>
          <p className="mx-auto max-w-3xl leading-relaxed text-slate-500">
            Da reserva à gestão financeira, nossa plataforma reúne produtos inovadores
            para otimizar cada detalhe do seu hotel ou pousada
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          {/* Negative margin + matching padding push the clip boundary out so
              the cards' shadows aren't sliced off at the viewport edges. Sized
              to clear the hover shadow, which reaches further than the resting
              one; the section's overflow-hidden absorbs the horizontal spill. */}
          <CarouselContent viewportClassName="-mx-10 -my-12 px-10 py-12" className="-ml-4">
            {PRODUTOS_DATA.map((p, i) => (
              <CarouselItem key={p.id} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4">
                <CompactProductCard produto={p} index={i} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden lg:block">
            <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-[#1e3a5f] hover:border-slate-300 hover:bg-slate-50" />
            <CarouselNext className="-right-12 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-[#1e3a5f] hover:border-slate-300 hover:bg-slate-50" />
          </div>
        </Carousel>

        <div className="mt-9 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#285992]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { SoftwareProductsCarousel };
