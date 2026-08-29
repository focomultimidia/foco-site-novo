"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data ──────────────────────────────────────────────────────────────────────
// Sem preço, de propósito (confirmado com o cliente): cada card termina em
// CTA pra falar com consultor — o valor varia por porte/destino do hotel, e
// a conversa comercial é a própria meta desta página.
interface Plano {
  id: string;
  nome: string;
  tagline: string;
  destaque?: boolean;
  badgeLabel?: string;
  recursos: string[];
  ctaLabel: string;
}

const PLANOS: Plano[] = [
  {
    id: "turbo",
    nome: "Marketing Turbo",
    tagline: "Pra quem quer começar a reduzir a dependência de OTA.",
    recursos: [
      "Atendimento personalizado",
      "12 criações de campanha por mês (Instagram, Facebook e site)",
      "Impulsionamentos no Meta Ads",
      "Campanhas no Google Hotel Ads",
      "Tags de monitoramento no site e motor de reservas",
      "Relatórios mensais de performance",
      "Google Free Links",
    ],
    ctaLabel: "Quero o Turbo",
  },
  {
    id: "premium",
    nome: "Marketing Premium",
    tagline: "Pra quem quer presença completa em todos os canais pagos.",
    destaque: true,
    badgeLabel: "Mais completo",
    // Lista fechada, não "tudo do Turbo + resto" — o item de criações de
    // campanha substitui o do Turbo (15 no lugar de 12, mesmo item
    // evoluído), os outros 6 do Turbo se repetem aqui tal e qual, e os 3
    // últimos são exclusivos do Premium.
    recursos: [
      "Atendimento personalizado",
      "15 criações de campanha por mês (Instagram, Facebook e site)",
      "Impulsionamentos no Meta Ads",
      "Campanhas no Google Hotel Ads",
      "Tags de monitoramento no site e motor de reservas",
      "Relatórios mensais de performance",
      "Google Free Links",
      "Campanhas na rede de pesquisa do Google",
      "Nome do seu hotel anunciado no Google Hotel Ads",
      "Remarketing no Meta Ads e Google Ads",
    ],
    ctaLabel: "Quero o Premium",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CARD_BG = "linear-gradient(135deg, #1e4d85 0%, #285992 45%, #3a72b0 100%)";
const CARD_SHADOW = "0 8px 20px rgba(40,89,146,0.12), 0 20px 50px rgba(40,89,146,0.18), 0 40px 60px rgba(40,89,146,0.10)";

// ── PlanoCard ─────────────────────────────────────────────────────────────────
function PlanoCard({ plano, onSelect }: { plano: Plano; onSelect: (id: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const destaque = plano.destaque ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: destaque ? 0.94 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: destaque ? 0.1 : 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      // Wrapper SEM overflow-hidden: o selo "Mais completo" fica posicionado
      // com offset negativo (-top-3), por cima da borda do card — se
      // overflow-hidden estivesse aqui (no mesmo elemento), ele recortaria o
      // próprio selo. `pt-3` reserva o respiro pro selo não colidir com o
      // que vem antes dele na seção.
      className={`relative flex h-full flex-col pt-3 ${destaque ? "lg:-translate-y-3 lg:scale-[1.03]" : ""}`}
    >
      {destaque && (
        <div
          className="absolute -top-0.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#132840]"
          style={{ background: "#fccc30", boxShadow: "0 6px 16px -4px rgba(252,204,48,0.6)" }}
        >
          <Sparkles className="h-3 w-3" />
          {plano.badgeLabel}
        </div>
      )}

      {/* Miolo — AQUI mora o overflow-hidden (brilho diagonal + cantos
          arredondados), abaixo do selo, então nunca recorta ele. */}
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[28px] p-8"
        style={
          destaque
            ? { background: CARD_BG, boxShadow: CARD_SHADOW, border: "1px solid rgba(255,255,255,0.13)" }
            : { background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(36,66,72,0.06)" }
        }
      >
      {destaque && (
        <>
          {/* Brilho diagonal — mesma técnica de CertificacoesSection */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="shine"
                initial={{ x: "-150%" }}
                animate={{ x: "260%" }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="pointer-events-none absolute left-0 z-10 w-1/2"
                style={{ top: "-20%", height: "140%" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
                    transform: "skewX(-15deg)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Aro superior */}
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </>
      )}

      <div className="relative z-10 mb-6 mt-2">
        <h3 className={`font-display mb-2 text-2xl font-semibold tracking-tight ${destaque ? "text-white" : "text-[#1e3a5f]"}`}>
          {plano.nome}
        </h3>
        <p className={`text-sm leading-relaxed ${destaque ? "text-blue-100/75" : "text-slate-500"}`}>{plano.tagline}</p>
      </div>

      <ul className="relative z-10 mb-8 flex flex-1 flex-col gap-3.5">
        {plano.recursos.map((recurso, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                destaque ? "bg-white/15" : "bg-[#28599214]"
              }`}
            >
              <Check className={`h-3 w-3 ${destaque ? "text-white" : "text-[#285992]"}`} strokeWidth={2.5} />
            </span>
            <span className={`text-sm leading-relaxed ${destaque ? "text-blue-50/90" : "text-slate-600"}`}>
              {recurso}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(plano.id)}
        className={`relative z-10 w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
          destaque
            ? "bg-[#fccc30] text-[#132840] shadow-lg shadow-[#fccc30]/30 hover:-translate-y-0.5 hover:shadow-[#fccc30]/45"
            : "bg-[#285992] text-white hover:-translate-y-0.5 hover:bg-[#1e4d85]"
        }`}
      >
        {plano.ctaLabel}
      </button>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface PlanosSectionProps {
  onSelectPlano?: (planoId: string) => void;
}

function PlanosSection({ onSelectPlano }: PlanosSectionProps) {
  return (
    <section className="bg-[#f4f7fb] py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <SectionEyebrow className="justify-center">Planos</SectionEyebrow>
          <h2 className="font-display mb-4 text-4xl font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased sm:text-5xl">
            Dois jeitos de vender{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              mais direto
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Sem letras miúdas nem mensalidade padronizada — o valor certo depende do porte e do destino do seu hotel.
            Fale com um consultor pra montar o plano.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
          {PLANOS.map((plano) => (
            <PlanoCard key={plano.id} plano={plano} onSelect={(id) => onSelectPlano?.(id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { PlanosSection };
