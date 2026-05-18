"use client";

import { useRef, useEffect } from "react";
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
// iconHoverType drives the CSS micro-interaction per icon semantic:
//   "lift"   → translate-y pulse  (trend / financial)
//   "expand" → scale expand       (people / volume)
//   "spin"   → 45° rotation       (gear / clock / time)
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

// Per-type Tailwind hover class applied to the icon SVG itself.
// cubic-bezier(0.34,1.56,0.64,1) = spring overshoot for a physical feel.
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

// ── Props ─────────────────────────────────────────────────────────────────────
// `numeros` is kept for backward compatibility with existing page wiring.
// Visual data (icons, animation config) lives in METRICAS above.
interface NumerosSectionProps {
  numeros: Numero[];
}

// ── Component ─────────────────────────────────────────────────────────────────
function NumerosSection(_props: NumerosSectionProps) {
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  // Two-layer refs — wrapperRefs: GSAP, cardRefs: Vanilla-tilt
  const wrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs    = useRef<HTMLDivElement[]>([]);
  // One ref per animated number span
  const numRefs     = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrappers = wrapperRefs.current.filter(Boolean);
    const cards    = cardRefs.current.filter(Boolean);

    // ── Initial hidden state ──────────────────────────────────────────────────
    gsap.set(headerRef.current, { opacity: 0, y: 20 });
    gsap.set(wrappers, { opacity: 0, y: 36 });

    // ── Header reveal ─────────────────────────────────────────────────────────
    const headerST = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(headerRef.current, {
          opacity: 1, y: 0, duration: 0.72, ease: "power3.out",
        }),
    });

    // ── Card stagger — asymmetric via each + ease ─────────────────────────────
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

    // ── Number tickers (one ScrollTrigger per number) ─────────────────────────
    // Each card gets its own GSAP tween triggered when it scrolls into view.
    // duration and delay vary per index to create an organic, staggered count-up.
    const numSTs: ScrollTrigger[] = [];

    METRICAS.forEach((m, i) => {
      const el = numRefs.current[i];
      if (!el) return;

      const counter = { n: 0 };
      const tween = gsap.to(counter, {
        n: m.valor,
        duration: 1.8 + i * 0.1,   // each card counts slightly longer
        delay: i * 0.09,            // each starts slightly later
        ease: "power2.out",
        paused: true,
        onUpdate() {
          // Keep the number integer except for the "5 bi" case (still integer)
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

    // ── Vanilla-tilt ──────────────────────────────────────────────────────────
    const initTilt = () => {
      if (!window.VanillaTilt || cards.length === 0) return;
      window.VanillaTilt.init(cards, {
        max: 5,
        speed: 400,
        perspective: 1000,
        scale: 1.03,
        glare: true,
        "max-glare": 0.25,
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
    <section ref={gridRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center mb-12">
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
              /* Outer wrapper — GSAP target (opacity + translateY) */
              <div
                key={i}
                ref={el => { if (el) wrapperRefs.current[i] = el; }}
              >
                {/*
                  Inner card — Vanilla-tilt target.
                  overflow-hidden clips the injected glare div correctly.
                  group enables child group-hover: classes.
                */}
                <div
                  ref={el => { if (el) cardRefs.current[i] = el; }}
                  className="group relative h-full rounded-3xl p-6 text-center cursor-default overflow-hidden"
                  style={{
                    background: CARD_BG,
                    border: "1px solid rgba(255,255,255,0.13)",
                    boxShadow: CARD_SHADOW,
                  }}
                >
                  {/* Specular rim light at top edge */}
                  <div className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  {/* Subtle depth haze at top */}
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 rounded-t-3xl bg-gradient-to-b from-white/6 to-transparent" />

                  {/* ── Content ───────────────────────────────────────── */}
                  <div className="relative z-10 flex flex-col items-center">

                    {/*
                      Icon container — glassmorphic chip.
                      Glow shadow pulses on hover (group-hover:).
                    */}
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
                      {/*
                        Icon — unique micro-interaction per semantic type:
                          lift   → up + slight scale (trend/financial)
                          expand → generous scale   (people/volume)
                          spin   → 45° rotation    (gear/clock)
                        All transitions share the spring cubic-bezier.
                      */}
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

                    {/* Animated number — GSAP drives the count-up via numRefs */}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { NumerosSection };
