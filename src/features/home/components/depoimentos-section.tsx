"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Depoimento } from "../types";

import "swiper/css";
import "swiper/css/pagination";

// ── CDN ───────────────────────────────────────────────────────────────────────
const VANILLA_TILT_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js";

declare global {
  interface Window {
    VanillaTilt: {
      init(el: HTMLElement | HTMLElement[], opts?: VanillaTiltOpts): void;
    };
  }
  interface HTMLElement {
    vanillaTilt?: { destroy(): void };
  }
}
interface VanillaTiltOpts {
  max?: number;
  speed?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  "max-glare"?: number;
}

// ── Shadows ───────────────────────────────────────────────────────────────────
const SHADOW_REST =
  "0 1px 2px rgba(0,0,0,0.04), " +
  "0 4px 12px rgba(0,0,0,0.05), " +
  "0 8px 24px rgba(0,0,0,0.04)";

const SHADOW_HOVER =
  "0 4px 8px rgba(0,0,0,0.06), " +
  "0 12px 28px rgba(0,0,0,0.08), " +
  "0 24px 56px rgba(0,0,0,0.06), " +
  "0 40px 80px rgba(40,89,146,0.06)";

// ── Props ─────────────────────────────────────────────────────────────────────
interface DepoimentosSectionProps {
  depoimentos: Depoimento[];
}

// ── Section ───────────────────────────────────────────────────────────────────
function DepoimentosSection({ depoimentos }: DepoimentosSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef    = useRef<HTMLElement>(null);
  const swiperWrapRef = useRef<HTMLDivElement>(null); // GSAP entrance target
  const swiperRef     = useRef<SwiperType | null>(null);
  const tiltRefs = useRef<HTMLDivElement[]>([]);

  // ── GSAP entrance + autoplay control ─────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrap = swiperWrapRef.current;
    if (!wrap) return;

    gsap.set(wrap, { opacity: 0, y: 40 });

    // Entrance animation — fires once on first viewport entry.
    const entranceST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () =>
        gsap.to(wrap, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          onComplete: () => gsap.set(wrap, { clearProps: "opacity,y" }),
        }),
    });

    // Autoplay control — fires on every enter/leave so the carousel only
    // runs while it is visible, saving CPU when the user scrolls away.
    const autoplayST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 90%",
      end:   "bottom 10%",
      onEnter:     () => swiperRef.current?.autoplay.start(),
      onLeave:     () => swiperRef.current?.autoplay.stop(),
      onEnterBack: () => swiperRef.current?.autoplay.start(),
      onLeaveBack: () => swiperRef.current?.autoplay.stop(),
    });

    return () => {
      entranceST.kill();
      autoplayST.kill();
    };
  }, [depoimentos]);

  // ── Vanilla-tilt ──────────────────────────────────────────────────────────
  useEffect(() => {
    const initTilt = () => {
      const els = tiltRefs.current.filter(Boolean);
      if (!window.VanillaTilt || !els.length) return;
      window.VanillaTilt.init(els, {
        max: 4, speed: 500, perspective: 1000, glare: true, "max-glare": 0.12,
      });
    };

    if (window.VanillaTilt) {
      initTilt();
    } else {
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${VANILLA_TILT_CDN}"]`
      );
      if (!script) {
        script = document.createElement("script");
        script.src   = VANILLA_TILT_CDN;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", initTilt, { once: true });
    }

    return () => {
      tiltRefs.current.forEach(el => el?.vanillaTilt?.destroy());
    };
  }, []);

  // ── Swiper ready ──────────────────────────────────────────────────────────
  const handleSwiperReady = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    // Start paused — the autoplay ScrollTrigger will start it on viewport entry.
    swiper.autoplay.stop();

    const initClones = () => {
      if (!window.VanillaTilt) return;
      const uninit = Array.from(
        swiper.el.querySelectorAll<HTMLElement>("[data-dep-tilt]")
      ).filter(el => !el.vanillaTilt);
      if (uninit.length > 0) {
        window.VanillaTilt.init(uninit, {
          max: 4, speed: 500, perspective: 1000, glare: true, "max-glare": 0.12,
        });
      }
    };

    if (window.VanillaTilt) {
      initClones();
    } else {
      document
        .querySelector<HTMLScriptElement>(`script[src="${VANILLA_TILT_CDN}"]`)
        ?.addEventListener("load", initClones, { once: true });
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-5xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased mb-4">
            Quem usa,{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              aprova
            </span>{" "}
            e comprova resultados
          </h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Junte-se a mais de 2.000 hoteleiros que escolheram a Foco para
            crescer e se destacar no mercado.
          </p>
        </motion.div>

        {/* ── Carousel ──────────────────────────────────────────────────────── */}
        <div ref={swiperWrapRef} className="relative depo-carousel">

          {/*
            Scoped overrides:
            · overflow:visible so card shadows/scale aren't clipped by Swiper's
              own overflow:hidden container.
            · padding leaves room for scale(1.03) + shadow on all four sides.
            · Pagination bullets: pill-shaped active, brand blue; inactive gray.
          */}
          <style>{`
            .depo-carousel .swiper {
              overflow: visible;
              padding: 48px 6px 64px;
            }
            .depo-carousel .swiper-pagination {
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
            }
            .depo-carousel .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              border-radius: 999px;
              background: rgba(40,89,146,0.18);
              opacity: 1;
              transition: width 300ms ease, background 300ms ease;
              margin: 0 !important;
            }
            .depo-carousel .swiper-pagination-bullet-active {
              width: 24px;
              background: #285992;
            }
          `}</style>

          {/* ── Prev arrow ── hidden on mobile, visible sm+ ──────────────── */}
          <button
            aria-label="Anterior"
            onClick={() => swiperRef.current?.slidePrev()}
            className="
              hidden sm:flex
              absolute left-0 top-1/2 -translate-y-1/2 z-20 -translate-x-4
              w-11 h-11 rounded-full
              bg-white/90 backdrop-blur-sm shadow-md border border-gray-100
              items-center justify-center
              text-[#285992]
              transition-all duration-200
              hover:scale-110 hover:bg-white hover:shadow-lg
            "
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* ── Next arrow ───────────────────────────────────────────────── */}
          <button
            aria-label="Próximo"
            onClick={() => swiperRef.current?.slideNext()}
            className="
              hidden sm:flex
              absolute right-0 top-1/2 -translate-y-1/2 z-20 translate-x-4
              w-11 h-11 rounded-full
              bg-white/90 backdrop-blur-sm shadow-md border border-gray-100
              items-center justify-center
              text-[#285992]
              transition-all duration-200
              hover:scale-110 hover:bg-white hover:shadow-lg
            "
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>

          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640:  { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            onSwiper={handleSwiperReady}
          >
            {depoimentos.map((dep, i) => {
              const isHovered = hoveredIndex === i;
              const isDimmed  = hoveredIndex !== null && !isHovered;

              return (
                <SwiperSlide key={dep.id}>
                  {/*
                    Layer 2 — Hover dim layer (UNCHANGED).
                  */}
                  <div
                    className="h-full"
                    style={{
                      opacity:   isDimmed ? 0.50 : 1,
                      filter:    isDimmed ? "blur(2px)" : "none",
                      transform: isHovered
                        ? "scale(1.03)"
                        : isDimmed
                          ? "scale(0.98)"
                          : "scale(1)",
                      transition:
                        "opacity 300ms ease, filter 300ms ease, transform 300ms ease",
                      willChange: "opacity, filter, transform",
                    }}
                  >
                    {/*
                      Layer 3 — Vanilla-tilt target (UNCHANGED).
                    */}
                    <div
                      ref={el => { if (el) tiltRefs.current[i] = el; }}
                      data-dep-tilt
                      className="relative overflow-hidden rounded-3xl bg-white p-8 lg:p-10 h-full transform-gpu cursor-default"
                      style={{
                        border: "1px solid rgba(0,0,0,0.05)",
                        boxShadow: isHovered ? SHADOW_HOVER : SHADOW_REST,
                        transition: "box-shadow 300ms ease",
                      }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Brand top-edge accent */}
                      <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-[#285992]/20 to-transparent" />

                      {/* Stars with golden glow */}
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star
                            key={si}
                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                            strokeWidth={0}
                            style={{
                              filter: "drop-shadow(0 0 4px rgba(250,204,21,0.55))",
                            }}
                          />
                        ))}
                      </div>

                      {/* Quote text */}
                      <p className="text-slate-700 text-base leading-relaxed mb-8">
                        &ldquo;{dep.texto}&rdquo;
                      </p>

                      {/* Separator */}
                      <div className="h-px bg-gradient-to-r from-[#285992]/10 via-[#285992]/5 to-transparent mb-7" />

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{
                            background: "linear-gradient(135deg,#285992,#427ab9)",
                            boxShadow: "0 4px 12px rgba(40,89,146,0.28)",
                          }}
                        >
                          {dep.avatar}
                        </div>
                        <div>
                          <p className="font-display font-bold text-[#0f172a] text-sm tracking-tight">
                            {dep.autor}
                          </p>
                          <p className="text-slate-500 text-xs mt-0.5">
                            {dep.cargo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

export { DepoimentosSection };
