"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, TrendingUp, Clock, LayoutDashboard } from "lucide-react";

// ── CDN ───────────────────────────────────────────────────────────────────────
const VANILLA_TILT_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js";

declare global {
  interface Window {
    VanillaTilt: { init(el: HTMLElement | HTMLElement[], opts?: Record<string, unknown>): void };
  }
  // HTMLElement extended by other sections — no re-declaration needed here
}

// ── Data ──────────────────────────────────────────────────────────────────────
const RAZOES = [
  {
    icon: Zap,
    titulo: "Ganhe tempo e aumente a produtividade da sua equipe",
    descricao:
      "Agende os débitos automáticos em reservas e dedique esforços apenas em vendas com pagamento recusado, sobrando mais tempo para captar novos clientes.",
    iconHoverClass: "group-hover:-translate-y-1 group-hover:scale-[1.15]",
  },
  {
    icon: TrendingUp,
    titulo: "Evite prejuízos financeiros",
    descricao:
      "Com o Foco Pay, todas as reservas serão cobradas automaticamente e os valores serão creditados na conta do hotel.",
    iconHoverClass: "group-hover:translate-x-1.5 group-hover:-translate-y-1",
  },
  {
    icon: Clock,
    titulo: "Pagamentos 24 horas por dia e 7 dias por semana",
    descricao:
      "Ao automatizar os pagamentos das reservas, o sistema realizará os débitos programados todos os dias do ano, garantindo seu faturamento antes do esperado.",
    iconHoverClass: "group-hover:rotate-[45deg] group-hover:scale-[1.08]",
  },
  {
    icon: LayoutDashboard,
    titulo: "Controle e organização dos seus pagamentos",
    descricao:
      "Tenha acesso, a qualquer momento e de qualquer lugar, a todo o histórico de pagamentos relacionados às reservas do seu hotel em um único local.",
    iconHoverClass: "group-hover:scale-[1.1] group-hover:-translate-y-1",
  },
] as const;

// Identical to vantagens-section visual tokens
const CARD_BG =
  "linear-gradient(135deg, #1e4d85 0%, #285992 40%, #3a72b0 100%)";

const CARD_SHADOW =
  "0 4px 12px rgba(40,89,146,0.08), " +
  "0 12px 28px rgba(40,89,146,0.10), " +
  "0 24px 48px rgba(40,89,146,0.10)";

// ── Right-column image ─────────────────────────────────────────────────────────
const IMAGE_SRC = "/assets/imgs/software-pagamentos/por-que-automatizar.png";

// ── Section ───────────────────────────────────────────────────────────────────
function PorQueSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs  = useRef<HTMLDivElement[]>([]);
  const imageRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean);

    gsap.set(headerRef.current, { opacity: 0, y: 20 });
    gsap.set(cards,             { opacity: 0, x: -24 });
    gsap.set(imageRef.current,  { opacity: 0, x: 24 });

    const headerST = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(headerRef.current, {
          opacity: 1, y: 0, duration: 0.72, ease: "power3.out",
        }),
    });

    const cardsST = ScrollTrigger.create({
      trigger: cards[0] ?? headerRef.current,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1, x: 0, duration: 0.65,
          stagger: 0.1, ease: "power3.out",
        });
        gsap.to(imageRef.current, {
          opacity: 1, x: 0, duration: 0.72, delay: 0.15, ease: "power3.out",
        });
      },
    });

    return () => {
      headerST.kill();
      cardsST.kill();
    };
  }, []);

  return (
    <>
      {/*
        Border Comet keyframes — scoped to "por-que-comet" to avoid conflicts
        with pagamentos-comet and vantagens-comet from other sections.
      */}
      <style>{`
        @keyframes por-que-comet {
          from { transform: translate(-50%, -50%) rotate(0deg);    }
          to   { transform: translate(-50%, -50%) rotate(360deg);  }
        }
        @keyframes por-que-comet-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg);    }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>

      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div ref={headerRef} className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased mb-4">
              Por que{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#285992,#427ab9,#285992)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                automatizar
              </span>{" "}
              os pagamentos de reservas
            </h2>
            <p className="font-sans font-normal text-slate-500 text-lg leading-relaxed">
              Ganhe eficiência, reduza inadimplência e garanta a receita do seu
              hotel de forma segura e automática.
            </p>
          </div>

          {/* ── 2-column split ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* ── Left: 4 cards stacked ─────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              {RAZOES.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div
                    key={i}
                    ref={el => { if (el) cardRefs.current[i] = el; }}
                    className="group relative overflow-hidden rounded-2xl p-5 cursor-default transition-transform duration-300 ease-out hover:translate-x-1"
                    style={{
                      background: CARD_BG,
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: CARD_SHADOW,
                    }}
                  >
                    {/* ── Border Comet ────────────────────────────────────── */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
                      style={{ zIndex: 0 }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "200%",
                          height: "200%",
                          animation: `${i % 2 === 0 ? "por-que-comet" : "por-que-comet-ccw"} ${5 + i * 0.9}s ${i * 1.3}s linear infinite`,
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
                      {/* Cutout — exposes only the ~1.5 px comet border ring */}
                      <div
                        style={{
                          position: "absolute",
                          inset: "1.5px",
                          borderRadius: "14.5px",
                          background: CARD_BG,
                        }}
                      />
                    </div>

                    {/* Specular rim light */}
                    <div
                      className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ zIndex: 10 }}
                    />

                    {/* Content: icon · title · description */}
                    <div
                      className="relative flex items-start gap-4"
                      style={{ zIndex: 10 }}
                    >
                      {/* Glassmorphic icon container */}
                      <div
                        className="
                          w-11 h-11 rounded-xl flex-shrink-0
                          flex items-center justify-center
                          border border-white/20
                          transition-all duration-500
                          ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          group-hover:border-white/45
                          group-hover:shadow-[0_0_18px_rgba(255,255,255,0.30)]
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
                            r.iconHoverClass,
                          ].join(" ")}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-white text-[1.05rem] mb-1.5 leading-snug tracking-tight">
                          {r.titulo}
                        </h3>
                        <p className="font-sans font-normal text-blue-100/85 text-[0.88rem] leading-relaxed">
                          {r.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right: static image with premium framing ──────────────── */}
            <div ref={imageRef} className="flex items-center justify-center">
              <div
                className="relative w-full rounded-3xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 24px 64px rgba(40,89,146,0.22), " +
                    "0 8px 20px rgba(0,0,0,0.12), " +
                    "0 0 0 1px rgba(40,89,146,0.12)",
                }}
              >
                <img
                  src={IMAGE_SRC}
                  alt="Automação de pagamentos de reservas"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export { PorQueSection };
