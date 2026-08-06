"use client";

import {
  Link2,
  Search,
  Palette,
  TrendingUp,
  Shield,
  Building,
  ImagePlus,
} from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data ─────────────────────────────────────────────────────────────────────
const BENEFICIOS = [
  {
    icon: Link2,
    titulo: "Site 100% integrado com o motor de reservas",
    descricao:
      "Eliminamos distrações como links externos e abas múltiplas. O hóspede navega com foco e reserva com rapidez.",
  },
  {
    icon: Search,
    titulo: "SEO e indexação orgânica no Google",
    descricao:
      "Seu site aparece nas buscas certas, com performance técnica e conteúdo otimizado para ranquear.",
  },
  {
    icon: Palette,
    titulo: "Layouts personalizados com a cara do seu hotel",
    descricao:
      "Escolha um layout exclusivo que valorize sua marca e reflita a experiência que você oferece.",
  },
  {
    icon: TrendingUp,
    titulo: "Páginas de vendas com foco em conversão",
    descricao:
      "Criamos fluxos de navegação que conduzem o hóspede direto às promoções e pacotes ideais.",
  },
  {
    icon: Shield,
    titulo: "Performance, velocidade e segurança",
    descricao:
      "Seu site carrega em segundos e oferece uma jornada confiável, com os padrões mais avançados da web.",
  },
  {
    icon: Building,
    titulo: "Tecnologia feita para o setor hoteleiro",
    descricao:
      "Mais que uma agência, somos especialistas em soluções digitais para hotéis, pousadas e resorts.",
  },
] as const;

// Sticky-stack recipe (same technique contiant.com uses on its "01/02/03"
// module): each card is `position: sticky` inside ONE shared tall container.
// As the page scrolls, each card catches the SAME `top` offset in turn and
// holds there — frozen — while the next card slides up from below and
// settles exactly over it, covering it completely (z-index crescente, sem
// stagger no `top` — sobreposição total, não um leque com as bordas
// anteriores à mostra). Pure CSS; no scroll-linked JS, no jank.
const BASE_TOP = 96; // clears the fixed header

// ── Section ───────────────────────────────────────────────────────────────────
function PorQueEscolherSection() {
  return (
    <section className="bg-[#f4f7fb] py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionEyebrow className="justify-center">Por que a Foco</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#1e293b] leading-tight tracking-tight mb-3">
            Seis motivos para escolher a{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#285992,#427ab9,#285992)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Foco
            </span>{" "}
            no site do seu hotel
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Continue rolando — cada motivo se empilha sobre o anterior.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {BENEFICIOS.map((beneficio, i) => {
            const Icon = beneficio.icon;
            const imageOnRight = i % 2 === 1;
            return (
              <div
                key={beneficio.titulo}
                className="sticky mb-6 sm:mb-8"
                style={{ top: BASE_TOP, zIndex: i + 1 }}
              >
                <div
                  className={`flex flex-col sm:h-[280px] ${
                    imageOnRight ? "sm:flex-row-reverse" : "sm:flex-row"
                  } rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,0.16)] overflow-hidden`}
                >
                  {/* ── Image slot — full-bleed to the card's own edge ─────── */}
                  <div className="relative sm:w-[42%] sm:h-full shrink-0">
                    <div className="aspect-[16/10] sm:aspect-auto sm:h-full min-h-[160px] w-full bg-gradient-to-br from-[#f4f7fb] to-white border-b sm:border-b-0 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2">
                      <ImagePlus className="w-6 h-6 text-slate-300" strokeWidth={1.6} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                        Imagem
                      </span>
                    </div>
                    <span className="absolute top-4 left-4 font-mono text-[11px] font-semibold tracking-widest text-white bg-[#285992] rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* ── Content ─────────────────────────────────────────────── */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#285992] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" strokeWidth={1.8} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#1e293b] leading-snug">
                        {beneficio.titulo}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed">
                      {beneficio.descricao}
                    </p>
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

export { PorQueEscolherSection };
