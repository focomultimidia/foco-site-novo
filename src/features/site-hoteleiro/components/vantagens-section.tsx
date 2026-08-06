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
      <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div ref={headerRef} className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
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
                  {/* Inner card — Vanilla-tilt target. overflow-hidden clips the
                      VanillaTilt glare to the card boundary. */}
                  <div
                    ref={el => { if (el) cardRefs.current[i] = el; }}
                    className="group relative h-full rounded-3xl p-6 cursor-default overflow-hidden"
                    style={{
                      background: CARD_BG,
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: CARD_SHADOW,
                    }}
                  >
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
                            v.iconHoverClass,
                          ].join(" ")}
                          strokeWidth={1.7}
                        />
                      </div>

                      <h3 className="font-display font-semibold text-white text-[1.3rem] mb-2.5 leading-snug tracking-tight">
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
