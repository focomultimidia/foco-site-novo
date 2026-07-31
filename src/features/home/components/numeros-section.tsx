"use client";

import { useRef, useEffect } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Users, Calendar, Link2, Clock } from "lucide-react";
import type { Numero } from "../types";

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

// ── Metrics data ──────────────────────────────────────────────────────────────
const METRICAS = [
  {
    icon: TrendingUp,
    valor: 20,
    sufixo: "",
    label: "anos de mercado",
    iconHoverType: "lift" as const,
  },
  {
    icon: Users,
    valor: 2800,
    sufixo: "",
    label: "clientes ativos",
    iconHoverType: "expand" as const,
  },
  {
    icon: Calendar,
    valor: 120,
    sufixo: "",
    label: "colaboradores",
    iconHoverType: "expand" as const,
  },
  {
    icon: TrendingUp,
    valor: 5,
    sufixo: " bi",
    label: "transações/ano",
    iconHoverType: "lift" as const,
  },
  {
    icon: Link2,
    valor: 850,
    sufixo: "",
    label: "integrações disponíveis",
    iconHoverType: "spin" as const,
  },
  {
    icon: Clock,
    valor: 365,
    sufixo: " dias",
    label: "suporte disponível",
    iconHoverType: "spin" as const,
  },
] as const;

const ICON_HOVER: Record<"lift" | "expand" | "spin", string> = {
  lift:   "group-hover:-translate-y-2 group-hover:scale-[1.08]",
  expand: "group-hover:scale-[1.2]",
  spin:   "group-hover:rotate-[45deg] group-hover:scale-[1.08]",
};

const CARD_BG =
  "linear-gradient(135deg, #1e4d85 0%, #285992 45%, #3a72b0 100%)";

const CARD_SHADOW =
  "0 8px 20px rgba(40,89,146,0.12), " +
  "0 20px 50px rgba(40,89,146,0.18), " +
  "0 40px 60px rgba(40,89,146,0.10)";

// ── Water ripple overlay ──────────────────────────────────────────────────────
// Two-layer SVG feTurbulence:
//   · bigWaves   — large rolling undulation (low baseFrequency)
//   · smallRipples — fine surface capillaries (high baseFrequency)
// Both layers produce white pixels with variable alpha derived from the noise
// channel; mix-blend-mode:overlay blends caustic highlights into the blue card.
function WaterRippleOverlay({ index }: { index: number }) {
  const id    = `numeros-water-${index}`;
  const seed1 = index * 13 + 7;
  const seed2 = index * 7  + 3;

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="numeros-water-overlay pointer-events-none absolute inset-0 w-full h-full"
      style={{
        zIndex: 20,
        mixBlendMode: "overlay",
        animationDelay: `${index * -1.35}s`,
      }}
    >
      <defs>
        <filter
          id={id}
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Layer 1 — broad, slow undulation */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.016 0.028"
            numOctaves="2"
            seed={seed1}
            result="bigWaves"
          />
          {/*
            Map noise → opaque white with alpha = Red channel of turbulence.
            Matrix rows: R′ G′ B′ A′ — last column is constant bias.
              0 0 0 0 1  → R′ = 1 (pure white)
              0 0 0 0 1  → G′ = 1
              0 0 0 0 1  → B′ = 1
              0.7 0 0 0 0 → A′ = 0.7 × R  (noise drives opacity)
          */}
          <feColorMatrix
            in="bigWaves"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.7 0 0 0 0"
            result="bigLayer"
          />

          {/* Layer 2 — fine surface capillaries */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09 0.14"
            numOctaves="3"
            seed={seed2}
            result="smallRipples"
          />
          <feColorMatrix
            in="smallRipples"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.32 0 0 0 0"
            result="smallLayer"
          />

          {/* Merge both layers */}
          <feMerge>
            <feMergeNode in="bigLayer" />
            <feMergeNode in="smallLayer" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface NumerosSectionProps {
  numeros: Numero[];
}

// ── Component ─────────────────────────────────────────────────────────────────
function NumerosSection(_props: NumerosSectionProps) {
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs    = useRef<HTMLDivElement[]>([]);
  const numRefs     = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrappers = wrapperRefs.current.filter(Boolean);
    const cards    = cardRefs.current.filter(Boolean);

    gsap.set(headerRef.current, { opacity: 0, y: 20 });
    gsap.set(wrappers, { opacity: 0, y: 36 });

    const headerST = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(headerRef.current, {
          opacity: 1, y: 0, duration: 0.72, ease: "power3.out",
        }),
    });

    const gridST = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 82%",
      once: true,
      onEnter: () =>
        gsap.to(wrappers, {
          opacity: 1, y: 0, duration: 0.7,
          stagger: { each: 0.13, ease: "power2.inOut" },
          ease: "power3.out",
        }),
    });

    const numSTs: ScrollTrigger[] = [];

    METRICAS.forEach((m, i) => {
      const el = numRefs.current[i];
      if (!el) return;

      const counter = { n: 0 };
      const tween = gsap.to(counter, {
        n: m.valor,
        duration: 1.8 + i * 0.1,
        delay: i * 0.09,
        ease: "power2.out",
        paused: true,
        onUpdate() {
          el.textContent = Math.round(counter.n).toString();
        },
        onComplete() {
          el.textContent = m.valor.toString();
        },
      });

      const st = ScrollTrigger.create({
        trigger: cardRefs.current[i],
        start: "top 88%",
        once: true,
        onEnter: () => tween.play(),
      });

      numSTs.push(st);
    });

    const initTilt = () => {
      if (!window.VanillaTilt || cards.length === 0) return;
      window.VanillaTilt.init(cards, {
        max: 5, speed: 400, perspective: 1000,
        scale: 1.03, glare: true, "max-glare": 0.25,
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
      headerST.kill();
      gridST.kill();
      numSTs.forEach(st => st.kill());
      cards.forEach(c => c?.vanillaTilt?.destroy());
    };
  }, []);

  return (
    <>
      {/*
        numeros-water-breathe — gentle opacity pulse per overlay.
        Each card receives a negative animationDelay so they're staggered
        and the grid never looks uniform.
      */}
      <style>{`
        @keyframes numeros-water-breathe {
          0%, 100% { opacity: 0.12; }
          50%       { opacity: 0.22; }
        }
        .numeros-water-overlay {
          animation: numeros-water-breathe 7s ease-in-out infinite;
        }
      `}</style>

      <section ref={gridRef} className="py-20 bg-[#f4f7fb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div ref={headerRef} className="text-center mb-12">
            <SectionEyebrow>Números inquestionáveis</SectionEyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased mb-3">
              Nossos{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#285992,#427ab9,#285992)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                números
              </span>{" "}
              comprovam nossa excelência
            </h2>
          </div>

          {/* ── 2 → 3 → 6 responsive grid ───────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {METRICAS.map((m, i) => {
              const Icon = m.icon;
              const hoverClass = ICON_HOVER[m.iconHoverType];

              return (
                <div
                  key={i}
                  ref={el => { if (el) wrapperRefs.current[i] = el; }}
                >
                  <div
                    ref={el => { if (el) cardRefs.current[i] = el; }}
                    className="group relative h-full rounded-3xl p-6 text-center cursor-default overflow-hidden"
                    style={{
                      background: CARD_BG,
                      border: "1px solid rgba(255,255,255,0.13)",
                      boxShadow: CARD_SHADOW,
                    }}
                  >
                    {/* Specular rim light */}
                    <div className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    {/* Depth haze */}
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 rounded-t-3xl bg-gradient-to-b from-white/6 to-transparent" />

                    {/* ── Content ───────────────────────────────────────── */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className="
                          w-10 h-10 rounded-xl
                          flex items-center justify-center
                          mx-auto mb-3 flex-shrink-0
                          border border-white/20
                          transition-all duration-500
                          ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          group-hover:border-white/45
                          group-hover:shadow-[0_0_20px_rgba(255,255,255,0.30)]
                        "
                        style={{
                          background: "rgba(255,255,255,0.10)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                        }}
                      >
                        <Icon
                          className={[
                            "w-5 h-5 text-white",
                            "transition-transform duration-500",
                            "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                            hoverClass,
                          ].join(" ")}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div className="text-3xl font-extrabold text-white mb-1 tabular-nums">
                        +<span ref={el => { if (el) numRefs.current[i] = el; }}>0</span>
                        {m.sufixo && (
                          <span className="text-xl font-bold text-blue-200/80 ml-0.5">
                            {m.sufixo}
                          </span>
                        )}
                      </div>

                      <div className="text-blue-100/70 text-xs leading-snug">
                        {m.label}
                      </div>
                    </div>

                    {/*
                      Water ripple overlay — z-20 sits above content (z-10).
                      mix-blend-mode:overlay blends caustic white highlights
                      into the blue gradient without obscuring text.
                      pointer-events-none ensures hover states still work.
                    */}
                    <WaterRippleOverlay index={i} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export { NumerosSection };
