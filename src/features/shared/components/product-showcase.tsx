"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { PRODUTOS_DATA } from "@/features/shared/data/produtos-data";
import type { ProdutoItem } from "@/features/shared/data/produtos-data";

// Backward-compat alias so existing imports of ProdutoData still resolve.
export type { ProdutoItem as ProdutoData };

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Section header ────────────────────────────────────────────────────────────

function ShowcaseHeader({ animate }: { animate: boolean }) {
  const content = (
    <div className="text-center mb-16 lg:mb-20">
      <SectionEyebrow>A plataforma</SectionEyebrow>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-medium text-[#1e3a5f] leading-[1.05] tracking-tighter antialiased mb-5 max-w-3xl mx-auto">
        Sistema para hotéis e pousadas{" "}
        <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
          aprovado por 97%
        </span>{" "}
        dos nossos clientes
      </h2>
      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Da reserva à gestão financeira, nossa plataforma reúne produtos inovadores
        para otimizar cada detalhe do seu hotel ou pousada
      </p>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {content}
    </motion.div>
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────

interface ProductCardProps {
  produto:             ProdutoItem;
  index:               number;
  withEntryAnimation?: boolean;
}

function ProductCard({ produto, index, withEntryAnimation = false }: ProductCardProps) {
  const { Icone: Icon } = produto;
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  // Cursor position across the card, normalised to -1…1 on both axes.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 110, damping: 20, mass: 0.5 });

  // The stage tilts against the cursor, so the screen reads as a physical
  // object suspended in the card rather than a flat image.
  const rotateY = useTransform(sx, [-1, 1], [10, -10]);
  const rotateX = useTransform(sy, [-1, 1], [-7, 7]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  const card = (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-full rounded-[36px]
                 shadow-[0_8px_20px_-14px_rgba(15,40,80,0.20),0_34px_70px_-34px_rgba(15,40,80,0.42)]
                 transition-shadow duration-500
                 hover:shadow-[0_10px_24px_-14px_rgba(15,40,80,0.26),0_52px_96px_-38px_rgba(15,40,80,0.55)]"
    >
      {/* Shell — carries the 5px glass frame. A silhueta agora é um retângulo
          arredondado limpo: o entalhe no canto inferior direito existia só para
          acomodar o botão circular, que passou para dentro do card.
          Raios concêntricos: 36 − 5 = 31. */}
      <div
        className="h-full rounded-[36px] p-[5px]
                   bg-gradient-to-br from-white/75 via-white/25 to-white/[0.03]"
      >
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-[31px]
                   bg-white/45 backdrop-blur-2xl
                   ring-1 ring-inset ring-white/60"
      >
      {/* Receding grid floor — the horizon the screen hovers above */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [perspective:420px] opacity-[0.5]">
        <div
          className="absolute inset-0 origin-bottom [transform:rotateX(74deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(40,89,146,0.16) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(40,89,146,0.16) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            WebkitMaskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
            maskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
          }}
        />
      </div>

      {/* Inner top highlight — catches light along the card's upper edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px
                   bg-gradient-to-r from-transparent via-white to-transparent"
      />

      {/* ── Copy ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-7 sm:p-9 sm:max-w-[50%]">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-3xl
                          bg-[#285992]/[0.08] ring-1 ring-inset ring-[#285992]/15
                          transition-transform duration-500 group-hover:-translate-y-0.5">
            <Icon className="h-5 w-5 text-[#285992]" />
          </div>
          <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-[#1e3a5f]">
            {produto.titulo}
          </h3>
        </div>

        <p className="text-[14px] leading-relaxed text-slate-600 mb-6">
          {produto.descricao}
        </p>

        {/* Badges — mesmo material das chips do SoftwareProductsCarousel:
            pílula clara com borda slate e o check num disco tingido de marca.
            Aqui elas continuam em wrap (o card é largo), não em coluna. */}
        <ul className="flex flex-wrap gap-2">
          {produto.beneficios.map((b) => (
            <li
              key={b}
              className="flex items-center gap-1.5 rounded-full border border-slate-200/80
                         bg-slate-50/80 py-1.5 pl-1.5 pr-3"
            >
              <span
                className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#28599214" }}
              >
                <Check className="h-2.5 w-2.5 text-[#285992]" strokeWidth={3.5} />
              </span>
              <span className="text-[10.5px] font-medium leading-none text-slate-700">
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Ação — só o ícone, num disco. Mesma marca do botão do
            SoftwareProductsCarousel, abaixo das badges e alinhada à esquerda. */}
        <a
          href={produto.link}
          aria-label={`Conhecer ${produto.titulo}`}
          className="group/btn mt-7 flex h-12 w-12 items-center justify-center rounded-full
                     bg-[#1e3a5f]
                     transition-[background-color,transform] duration-300
                     hover:scale-105 hover:bg-[#285992]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992] focus-visible:ring-offset-2
                     motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          <ArrowUpRight
            className="h-5 w-5 text-white transition-transform duration-300
                       group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5
                       motion-reduce:transition-none"
          />
        </a>
      </div>

      {/* ── Stage: the product screen suspended in space ─────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-20 mt-2 px-7 pb-7 sm:mt-0 sm:px-0 sm:pb-0
                   sm:absolute sm:inset-y-0 sm:left-[50%] sm:right-[-20%]
                   sm:flex sm:items-center [perspective:1600px]"
      >
        <motion.div
          className="relative w-full [transform-style:preserve-3d]"
          style={reduceMotion ? undefined : { rotateX, rotateY }}
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 + index * 0.06, ease: EASE }}
        >
          {/* Screen — lifted off the card by a real shadow, so the light UI
              still reads as a separate object on a light surface */}
          <div
            className="relative overflow-hidden rounded-xl ring-1 ring-slate-900/10
                       shadow-[0_2px_6px_-2px_rgba(15,40,80,0.10),0_26px_50px_-18px_rgba(15,40,80,0.38)]
                       transition-transform duration-700 ease-out group-hover:-translate-y-2"
          >
            <img
              src={produto.screenshot}
              alt=""
              loading="lazy"
              className="block w-full"
            />
            {/* Screen sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/35 mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
      </article>
      </div>
    </div>
  );

  if (!withEntryAnimation) return card;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: EASE }}
    >
      {card}
    </motion.div>
  );
}

// ── GridView ──────────────────────────────────────────────────────────────────

function GridView() {
  return (
    <div className="grid gap-6 lg:gap-7 lg:grid-cols-2">
      {PRODUTOS_DATA.map((p, i) => (
        <ProductCard key={p.id} produto={p} index={i} withEntryAnimation />
      ))}
    </div>
  );
}

// ── StackView ─────────────────────────────────────────────────────────────────
// Same sticky-stack recipe used in the site-hoteleiro "por que escolher"
// section (and, before that, reverse-engineered from contiant.com's own
// "01/02/03" module): each card is `position: sticky` inside one shared tall
// container, with an increasing `top` offset. As the page scrolls, each card
// catches its own offset in turn and holds there while the next slides up
// from below and settles just over it. The sticky mechanics stay pure CSS;
// only the fade-in as each card approaches its resting spot is scroll-linked
// (via each card's own useScroll progress), so it fades in right as it
// starts covering the one beneath it.
const STACK_BASE_TOP = 96; // clears the fixed header
const STACK_STAGGER = 0; // 0 = full overlap — each card fully covers the previous one

function StackCard({ produto, index }: { produto: ProdutoItem; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // 0 as the card's top crosses the bottom of the viewport (just entering
    // from below), 1 once it reaches the top of the viewport.
    offset: ["start end", "start start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <motion.div
      ref={wrapRef}
      className="sticky mb-8 sm:mb-10 sm:h-[400px]"
      style={{
        top: STACK_BASE_TOP + index * STACK_STAGGER,
        zIndex: index + 1,
        opacity: reduceMotion ? 1 : opacity,
      }}
    >
      <ProductCard produto={produto} index={index} />
    </motion.div>
  );
}

function StackView() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {PRODUTOS_DATA.map((p, i) => (
        <StackCard key={p.id} produto={p} index={i} />
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
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {PRODUTOS_DATA.map((p, i) => (
            <CarouselItem key={p.id} className="pl-4 basis-full lg:basis-1/2">
              <ProductCard produto={p} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden lg:block">
          <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-[#1e3a5f] hover:bg-slate-50 hover:border-slate-300" />
          <CarouselNext    className="-right-12 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-[#1e3a5f] hover:bg-slate-50 hover:border-slate-300" />
        </div>
      </Carousel>

      <div className="mt-10 flex justify-center gap-2">
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
    </>
  );
}

// ── ProductShowcase ───────────────────────────────────────────────────────────

export interface ProductShowcaseProps {
  viewMode?: "grid" | "carousel" | "stack";
}

function ProductShowcase({ viewMode = "carousel" }: ProductShowcaseProps) {
  return (
    // #F4F7FB is the canvas colour of the product mockups, so the screens sit
    // on the same field as the page and read as part of it.
    // Stack mode skips overflow-hidden: any ancestor with overflow other than
    // visible breaks position:sticky on the cards below.
    <section className={`relative bg-[#f4f7fb] py-24 lg:py-32 ${viewMode === "stack" ? "" : "overflow-hidden"}`}>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader animate={viewMode !== "carousel"} />
        {viewMode === "grid" && <GridView />}
        {viewMode === "stack" && <StackView />}
        {viewMode === "carousel" && <CarouselView />}
      </div>
    </section>
  );
}

export { ProductShowcase };
