"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, MapPin, Tag, Smartphone } from "lucide-react";

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

// ── Data (original content — unchanged) ──────────────────────────────────────
const BENEFICIOS = [
  {
    numero: "01",
    icon: CheckCircle,
    titulo: "Fim das filas",
    descricao:
      "Integrado ao seu sistema de gestão hoteleira, o Foco Pass permite realizar o pré-check-in e check-in online para seus hóspedes.",
    iconHoverClass: "group-hover:scale-[1.15] group-hover:rotate-[15deg]",
  },
  {
    numero: "02",
    icon: MapPin,
    titulo: "Comodidade para o hóspede",
    descricao:
      "O seu hóspede terá acesso à localização dos principais pontos turísticos, senha do Wi-Fi, ao cardápio digital* e diversos recursos integrados.",
    iconHoverClass: "group-hover:-translate-y-2 group-hover:scale-[1.1]",
  },
  {
    numero: "03",
    icon: Tag,
    titulo: "Descontos em seu destino",
    descricao:
      "Garanta benefícios exclusivos para o seu hóspede nos principais restaurantes, receptivos e espetáculos dos parceiros do Foco Pass no seu destino.",
    iconHoverClass: "group-hover:rotate-[-15deg] group-hover:scale-[1.1]",
  },
  {
    numero: "04",
    icon: Smartphone,
    titulo: "Versão PWA disponível",
    descricao:
      "Não perca tempo, solicite agora a versão do aplicativo (PWA) para hotéis e pousadas e garanta a satisfação do seu hóspede.",
    iconHoverClass: "group-hover:-translate-y-2 group-hover:scale-[1.08]",
  },
] as const;

const CARD_BG   = "linear-gradient(135deg, #1e4d85 0%, #285992 40%, #3a72b0 100%)";
const CARD_SHADOW =
  "0 4px 12px rgba(40,89,146,0.08), " +
  "0 12px 28px rgba(40,89,146,0.10), " +
  "0 24px 48px rgba(40,89,146,0.10), " +
  "0 40px 64px rgba(40,89,146,0.07)";

// ── Section ───────────────────────────────────────────────────────────────────
function PorQueContratarSection() {
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
        gsap.to(headerRef.current, {
          opacity: 1, y: 0, duration: 0.72, ease: "power3.out",
        }),
    });

    const gridST = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 80%",
      once: true,
      onEnter: () =>
        gsap.to(wrappers, {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
        }),
    });

    const initTilt = () => {
      if (!window.VanillaTilt || cards.length === 0) return;
      window.VanillaTilt.init(cards, {
        max: 4, speed: 400, perspective: 1000, scale: 1.02,
        glare: true, "max-glare": 0.2,
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
      cards.forEach(c => c?.vanillaTilt?.destroy());
    };
  }, []);

  return (
    <>
      {/*
        Border Comet keyframes — identical technique to vantagens-section.tsx.
        CW (even index) and CCW (odd index) give organic asymmetry.
      */}
      <style>{`
        @keyframes pqc-comet {
          from { transform: translate(-50%, -50%) rotate(0deg);    }
          to   { transform: translate(-50%, -50%) rotate(360deg);  }
        }
        @keyframes pqc-comet-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg);    }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>

      <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
        {/* Top-edge hairline separator */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header (original content) ──────────────────────────────── */}
          <div ref={headerRef} className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0f172a] leading-none tracking-tighter antialiased mb-4">
              Por que contratar o{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#285992,#427ab9,#285992)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Foco Pass
              </span>{" "}
              para o seu hóspede
            </h2>
            <p className="font-sans font-normal text-slate-500 text-lg leading-relaxed">
              Autonomia, praticidade e satisfação garantidas para o seu hóspede
              vivenciar experiências únicas em sua viagem.
            </p>
          </div>

          {/* ── 4-column grid ─────────────────────────────────────────── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {BENEFICIOS.map((b, i) => {
              const Icon = b.icon;
              return (
                /* Outer wrapper — GSAP entrance target */
                <div
                  key={i}
                  ref={el => { if (el) wrapperRefs.current[i] = el; }}
                >
                  {/*
                    Inner card — Vanilla-tilt target.
                    overflow-hidden clips the comet beam and the glare layer.
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
                    {/* ── Border Comet ─────────────────────────────────── */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
                      style={{ zIndex: 0 }}
                    >
                      {/* Spinning conic-gradient beam */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "200%",
                          height: "200%",
                          animation: `${i % 2 === 0 ? "pqc-comet" : "pqc-comet-ccw"} ${4 + i * 0.9}s ${i * 1.3}s linear infinite`,
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
                      {/* Cutout — masks the beam interior, exposes only the border ring */}
                      <div
                        style={{
                          position: "absolute",
                          inset: "1.5px",
                          borderRadius: "22.5px",
                          background: CARD_BG,
                        }}
                      />
                    </div>

                    {/* Specular rim light */}
                    <div
                      className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                      style={{ zIndex: 10 }}
                    />

                    {/* Inner top glow for depth */}
                    <div
                      className="pointer-events-none absolute top-0 left-0 right-0 h-20 rounded-t-3xl bg-gradient-to-b from-white/6 to-transparent"
                      style={{ zIndex: 10 }}
                    />

                    {/* Watermark number — decorative, very low opacity */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute right-3 bottom-2 font-black leading-none text-white/[0.05]"
                      style={{ fontSize: "clamp(56px,8vw,80px)", zIndex: 0 }}
                    >
                      {b.numero}
                    </span>

                    {/* ── Content ──────────────────────────────────────── */}
                    <div className="relative" style={{ zIndex: 10 }}>

                      {/* Glassmorphic icon container */}
                      <div
                        className="
                          w-12 h-12 rounded-3xl
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
                            b.iconHoverClass,
                          ].join(" ")}
                          strokeWidth={1.7}
                        />
                      </div>

                      <h3 className="font-display font-semibold text-white text-[1.3rem] mb-2.5 leading-snug tracking-tight">
                        {b.titulo}
                      </h3>
                      <p className="font-sans font-normal text-blue-100/90 text-[0.9rem] leading-relaxed">
                        {b.descricao}
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

export { PorQueContratarSection };
