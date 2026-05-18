"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smartphone,
  Palette,
  Network,
  PenTool,
  Search,
  TrendingUp,
  UserCircle,
  Briefcase,
} from "lucide-react";

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

// ── Data ──────────────────────────────────────────────────────────────────────
const VANTAGENS = [
  {
    icon: Smartphone,
    titulo: "100% responsivo",
    descricao: "Layout mobile-first, compatível com celulares, tablets e computadores.",
    iconHoverClass: "group-hover:-translate-y-2 group-hover:scale-[1.1]",
  },
  {
    icon: Palette,
    titulo: "Design exclusivo",
    descricao: "Layouts personalizados para deixar o site com a identidade visual do seu hotel.",
    iconHoverClass: "group-hover:rotate-[18deg] group-hover:scale-[1.1]",
  },
  {
    icon: Network,
    titulo: "Redes e associações",
    descricao: "Sites e portais para redes de hotéis e associações hoteleiras.",
    iconHoverClass: "group-hover:scale-[1.2]",
  },
  {
    icon: PenTool,
    titulo: "Blog integrado",
    descricao: "Produza conteúdos sobre o destino e inspire seus hóspedes antes mesmo da reserva.",
    iconHoverClass: "group-hover:-translate-y-2 group-hover:translate-x-1",
  },
  {
    icon: Search,
    titulo: "SEO avançado",
    descricao: "Otimizado para o Google, maximizando a indexação orgânica e a visibilidade do hotel.",
    iconHoverClass: "group-hover:rotate-[14deg] group-hover:scale-[1.12]",
  },
  {
    icon: TrendingUp,
    titulo: "Páginas de venda",
    descricao: "Crie landing pages e leve o cliente direto ao seu pacote ou promoção.",
    iconHoverClass: "group-hover:translate-x-1.5 group-hover:-translate-y-2",
  },
  {
    icon: UserCircle,
    titulo: "Área do cliente",
    descricao: "Acesso ao histórico de reservas e compras diretamente pelo site do hotel.",
    iconHoverClass: "group-hover:scale-[1.14] group-hover:-translate-y-1",
  },
  {
    icon: Briefcase,
    titulo: "Portal corporativo",
    descricao: "Área para agências, operadoras e empresas reservarem a qualquer momento.",
    iconHoverClass: "group-hover:-translate-y-2 group-hover:rotate-[-10deg]",
  },
] as const;

const CARD_BG = "linear-gradient(135deg, #1e4d85 0%, #285992 40%, #3a72b0 100%)";

const CARD_SHADOW =
  "0 4px 12px rgba(40,89,146,0.08), " +
  "0 12px 28px rgba(40,89,146,0.10), " +
  "0 24px 48px rgba(40,89,146,0.10), " +
  "0 40px 64px rgba(40,89,146,0.07)";

// ── Section ───────────────────────────────────────────────────────────────────
function VantagensSection() {
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrappers = wrapperRefs.current.filter(Boolean);
    const cards    = cardRefs.current.filter(Boolean);

    gsap.set(headerRef.current, { opacity: 0, y: 20 });
    gsap.set(wrappers, { opacity: 0, y: 30 });

    const headerST = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out" }),
    });

    const gridST = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 80%",
      once: true,
      onEnter: () =>
        gsap.to(wrappers, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power3.out" }),
    });

    const initTilt = () => {
      if (!window.VanillaTilt || cards.length === 0) return;
      window.VanillaTilt.init(cards, {
        max: 4,
        speed: 400,
        perspective: 1000,
        scale: 1.02,
        glare: true,
        "max-glare": 0.2,
      });
    };

    if (window.VanillaTilt) {
      initTilt();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${VANILLA_TILT_CDN}"]`);
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
      cards.forEach(c => c?.vanillaTilt?.destroy());
    };
  }, []);

  return (
    <>
      {/*
        ── Border Comet keyframes ─────────────────────────────────────────────
        Technique: a conic-gradient div spins 360° via transform:rotate()
        (compositor-only — zero layout/paint, 60 fps).

        Inside each card:
          1. A spinning div (200%×200%) holds the conic-gradient beam.
          2. A cutout div (inset:1.5px, same card gradient) hides the interior,
             leaving only the ~1.5px ring at the card's perimeter exposed.

        The comet shape in the gradient:
          – 310°–342°  tail  : cyan fading in  (rgba(0,210,255, 0→0.9))
          – 342°–350°  head  : bright white    (rgba(255,255,255, 1))
          – 350°–358°  wake  : quick fade-out
          – rest        : transparent gap
      */}
      <style>{`
        @keyframes vantagens-comet {
          from { transform: translate(-50%, -50%) rotate(0deg);    }
          to   { transform: translate(-50%, -50%) rotate(360deg);  }
        }
        @keyframes vantagens-comet-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg);    }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>

      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div ref={headerRef} className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased mb-4">
              Mais vantagens em ter um{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#285992,#427ab9,#285992)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                site exclusivo
              </span>{" "}
              para hotéis e pousadas
            </h2>
            <p className="font-sans font-normal text-slate-500 text-lg leading-relaxed">
              O guia completo para transformar seu site em sua principal máquina
              de vendas diretas, garantindo a melhor margem de lucro.
            </p>
          </div>

          {/* ── 4 × 2 Grid ──────────────────────────────────────────────── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {VANTAGENS.map((v, i) => {
              const Icon = v.icon;
              return (
                /* Outer wrapper — GSAP target (opacity + translateY only) */
                <div
                  key={i}
                  ref={el => { if (el) wrapperRefs.current[i] = el; }}
                >
                  {/*
                    Inner card — Vanilla-tilt target.
                    overflow-hidden is required: clips both the VanillaTilt glare
                    and the border-comet's spinning beam to the card boundary.
                  */}
                  <div
                    ref={el => { if (el) cardRefs.current[i] = el; }}
                    className="group relative h-full rounded-3xl p-6 cursor-default overflow-hidden"
                    style={{
                      background: CARD_BG,
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: CARD_SHADOW,
                    }}
                  >
                    {/*
                      ── Border Comet ───────────────────────────────────────
                      Layer order (z-index):
                        z-0  → comet beam (behind everything)
                        z-0  → cutout (same stacking level, rendered after beam)
                        z-10 → specular highlights, icon, text

                      The spinning div is 200%×200% centered at 50%/50%.
                      Its radius (≈141% of the shorter dimension) always reaches
                      the card corners, so the gradient touches every edge.

                      The cutout div replicates CARD_BG from inset:1.5px inward,
                      hiding the beam interior — only the ~1.5px perimeter ring
                      of the spinning gradient shows through.
                    */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
                      style={{ zIndex: 0 }}
                    >
                      {/* Spinning conic-gradient — the comet source */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "200%",
                          height: "200%",
                          // Each card gets its own duration, delay and direction:
                          //   duration  4.0 → 9.6 s  (index * 0.8 s step)
                          //   delay     0.0 → 8.4 s  (index * 1.2 s step)
                          //   direction even → CW, odd → CCW
                          // The combined variation makes every comet drift apart
                          // and re-converge organically — zero visual symmetry.
                          animation: `${i % 2 === 0 ? "vantagens-comet" : "vantagens-comet-ccw"} ${4 + i * 0.8}s ${i * 1.2}s linear infinite`,
                          background: [
                            "conic-gradient(",
                            "  from 0deg at 50% 50%,",
                            "  transparent              0deg,",
                            "  transparent            310deg,",
                            "  rgba(0,210,255,0.00)   312deg,",
                            "  rgba(0,210,255,0.45)   328deg,",
                            "  rgba(80,230,255,0.80)  340deg,",
                            "  rgba(200,245,255,0.95) 346deg,",
                            "  rgba(255,255,255,1.00) 350deg,",
                            "  rgba(200,240,255,0.50) 355deg,",
                            "  rgba(0,210,255,0.10)   358deg,",
                            "  transparent            360deg",
                            ")",
                          ].join(""),
                        }}
                      />
                      {/*
                        Cutout — replicates the card gradient from inset:1.5px,
                        masking the beam interior and exposing only the border ring.
                      */}
                      <div
                        style={{
                          position: "absolute",
                          inset: "1.5px",
                          borderRadius: "22.5px",
                          background: CARD_BG,
                        }}
                      />
                    </div>

                    {/* Specular top-edge rim light (z:10) */}
                    <div
                      className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                      style={{ zIndex: 10 }}
                    />

                    {/* Inner top glow for depth (z:10) */}
                    <div
                      className="pointer-events-none absolute top-0 left-0 right-0 h-20 rounded-t-3xl bg-gradient-to-b from-white/6 to-transparent"
                      style={{ zIndex: 10 }}
                    />

                    {/* ── Content (z:10) ──────────────────────────────── */}
                    <div className="relative" style={{ zIndex: 10 }}>

                      {/* Icon container — glassmorphic */}
                      <div
                        className="
                          w-12 h-12 rounded-2xl
                          flex items-center justify-center
                          mb-5 flex-shrink-0
                          border border-white/20
                          transition-all duration-500
                          ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          group-hover:border-white/45
                          group-hover:shadow-[0_0_22px_rgba(255,255,255,0.35)]
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
                            v.iconHoverClass,
                          ].join(" ")}
                          strokeWidth={1.7}
                        />
                      </div>

                      <h3 className="font-display font-bold text-white text-[1.3rem] mb-2.5 leading-snug tracking-tight">
                        {v.titulo}
                      </h3>
                      <p className="font-sans font-normal text-blue-100/90 text-[0.9rem] leading-relaxed">
                        {v.descricao}
                      </p>
                    </div>
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

export { VantagensSection };
