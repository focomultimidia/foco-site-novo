"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data ──────────────────────────────────────────────────────────────────────
const DIFERENCIAIS = [
  {
    numero: "01",
    titulo: "EQUIPE ESPECIALIZADA EM HOTELARIA",
    subtitulo: "(Não generalista)",
    descricao:
      "Cada estrategista, designer e analista de mídia do time só trabalha com hotelaria — entende sazonalidade, tarifário e o que realmente faz um viajante decidir.",
  },
  {
    numero: "02",
    titulo: "METODOLOGIA PRÓPRIA",
    subtitulo: "(Jornada do hóspede)",
    descricao:
      "A jornada do hóspede orienta cada campanha — reconhecimento, engajamento e conversão — com métricas específicas em cada etapa, não um funil genérico de agência.",
  },
  {
    numero: "03",
    titulo: "GESTÃO DE TRÁFEGO PONTA A PONTA",
    subtitulo: "(Meta + Google, integrados)",
    descricao:
      "Meta Ads e Google Ads administrados de forma integrada, não como duas contas separadas competindo pelo mesmo orçamento e pelo mesmo hóspede.",
  },
  {
    numero: "04",
    titulo: "PRODUÇÃO DE CONTEÚDO PRÓPRIA",
    subtitulo: "(Sem terceirizar a criação)",
    descricao:
      "Designers e criadores de conteúdo internos — sem repassar a produção pra terceiros nem depender de banco de imagem genérico que qualquer concorrente também usa.",
  },
  {
    numero: "05",
    titulo: "PERFORMANCE, NÃO VAIDADE",
    subtitulo: "(Reserva, não curtida)",
    descricao:
      "Medimos reserva direta, não curtida ou alcance. O relatório mensal mostra exatamente o que impacta o seu caixa, não vaidade de rede social.",
  },
  {
    numero: "06",
    titulo: "INTEGRAÇÃO NATIVA COM SUA STACK",
    subtitulo: "(Site + motor + marketing)",
    descricao:
      "Site, motor de reservas e marketing rodando na mesma plataforma — a campanha já nasce conectada ao que converte a visita em reserva, sem elo perdido.",
  },
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────
const sc = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// ── AccordionPanel ────────────────────────────────────────────────────────────
// Mesma técnica de channel-manager/components/vantagens-section.tsx: `flex`
// (não `layout` do Framer) pra evitar o texto borrar/espremer durante a
// transição de largura — a mudança de tamanho é 100% CSS, sem transform de
// escala na subárvore.
interface PanelProps {
  item: (typeof DIFERENCIAIS)[number];
  isActive: boolean;
  onEnter: () => void;
}

function AccordionPanel({ item, isActive, onEnter }: PanelProps) {
  return (
    <div
      className="relative cursor-pointer select-none overflow-hidden"
      style={{
        flex: isActive ? "6 1 0%" : "1 1 0%",
        borderRadius: 16,
        transition: "flex 550ms cubic-bezier(0.16, 1, 0.3, 1), filter 550ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "flex",
        filter: isActive
          ? "drop-shadow(0 12px 28px rgba(40,89,146,0.14)) drop-shadow(0 4px 8px rgba(36,66,72,0.08))"
          : "drop-shadow(0 4px 16px rgba(36,42,82,0.22))",
      }}
      onMouseEnter={onEnter}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#285992] to-[#4876ab]" />

      <div
        className="absolute inset-0 bg-white"
        style={{ opacity: isActive ? 1 : 0, transition: "opacity 350ms ease" }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          boxShadow: isActive ? "inset 0 0 0 1px rgba(255,255,255,0.80)" : "inset 0 0 0 0px rgba(255,255,255,0)",
          transition: "box-shadow 300ms ease",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-3xl border"
        style={{
          borderColor: isActive ? "rgba(40,89,146,0.22)" : "rgba(0,0,0,0)",
          transition: "border-color 300ms ease",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: isActive
            ? "linear-gradient(90deg,transparent,rgba(40,89,146,0.35) 40%,rgba(100,160,255,0.5) 60%,transparent)"
            : "transparent",
          transition: "background 400ms ease",
        }}
      />

      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait" initial={false}>
          {isActive ? (
            <motion.div
              key="open"
              className="absolute inset-0 flex flex-col p-7 xl:p-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.12 }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 select-none font-black leading-none text-[#285992]/[0.04]"
                style={{ fontSize: "clamp(90px, 14vw, 160px)" }}
              >
                {item.numero}
              </span>

              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl bg-[#285992] shadow-lg shadow-[#285992]/30">
                    <span className="text-xs font-normal uppercase tracking-widest text-white">{item.numero}</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#285992]/30 via-[#285992]/10 to-transparent" />
                </div>

                <h3 className="font-display text-4xl font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased xl:text-5xl">
                  {sc(item.titulo)}
                </h3>
              </div>

              <div className="my-5 h-px bg-gradient-to-r from-[#285992]/15 to-transparent" />

              <motion.p
                className="flex-1 text-base font-light leading-relaxed text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.22, ease: "easeOut" }}
              >
                {item.descricao}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex flex-1 items-center justify-center overflow-hidden">
                <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  <span
                    className="whitespace-nowrap text-[12px] font-extrabold uppercase leading-none text-white drop-shadow-lg"
                    style={{ letterSpacing: "0.28em" }}
                  >
                    {sc(item.titulo)}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 justify-center pb-5">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-2.5">
                  <span className="text-[10px] font-normal uppercase tracking-widest text-white/60">{item.numero}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function DiferenciaisSection() {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section className="bg-[#f4f7fb] py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <SectionEyebrow className="justify-center">Como trabalhamos</SectionEyebrow>
          <h2 className="font-display mb-4 text-4xl font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased sm:text-5xl">
            Marketing feito por quem entende de{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              hotelaria
            </span>
            , não de marketing genérico.
          </h2>
        </motion.div>

        {/* Desktop — accordion horizontal */}
        <div className="hidden h-[430px] gap-2 lg:flex" onMouseLeave={() => setHoveredIdx(0)}>
          {DIFERENCIAIS.map((item, i) => (
            <AccordionPanel key={item.numero} item={item} isActive={hoveredIdx === i} onEnter={() => setHoveredIdx(i)} />
          ))}
        </div>

        {/* Mobile — lista vertical */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {DIFERENCIAIS.map((item, index) => (
            <motion.div
              key={item.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.07 }}
              className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/90 p-6 shadow-[0_4px_16px_rgba(36,66,72,0.07)] ring-1 ring-white/70 backdrop-blur-xl"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-3 select-none text-[80px] font-black leading-none text-[#285992]/[0.04]"
              >
                {item.numero}
              </span>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#285992] shadow-md shadow-[#285992]/20">
                  <span className="text-xs font-bold tracking-widest text-white">{item.numero}</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#285992]/20 to-transparent" />
              </div>

              <h3 className="mb-1 text-sm font-bold leading-snug text-[#1e3a5f]">{item.titulo}</h3>
              <p className="mb-3 text-xs font-medium text-[#285992]">{item.subtitulo}</p>
              <p className="text-sm leading-relaxed text-gray-500">{item.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { DiferenciaisSection };
