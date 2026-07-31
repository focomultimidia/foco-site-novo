"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const VANTAGENS = [
  {
    numero: "01",
    titulo: "PREVENÇÃO DE OVERBOOKING",
    subtitulo: "(Sincronização em tempo real)",
    descricao:
      "O Channel Manager atualiza a disponibilidade de quartos em todos os canais de venda (OTAs, GDS, Motor de Reservas) instantaneamente. Isso elimina o risco de overbooking e os custos e transtornos associados a ele.",
  },
  {
    numero: "02",
    titulo: "MAXIMIZAÇÃO DE VENDAS",
    subtitulo: "(Distribuição ampla e eficiente)",
    descricao:
      "Permite que o hotel se conecte a um grande número de OTAs e canais globais sem esforço manual. Isso maximiza a exposição do inventário, alcançando um público muito maior e aumentando a taxa de ocupação.",
  },
  {
    numero: "03",
    titulo: "OTIMIZAÇÃO DE TEMPO",
    subtitulo: "(Automação de tarefas)",
    descricao:
      "Elimina a necessidade de acessar individualmente cada extranet de OTA para atualizar preços e disponibilidade. O hotel economiza horas de trabalho manual, que podem ser dedicadas ao atendimento ao hóspede ou a estratégias de Revenue Management.",
  },
  {
    numero: "04",
    titulo: "REVENUE MANAGEMENT",
    subtitulo: "(Gestão centralizada de tarifas)",
    descricao:
      "Permite a aplicação rápida de estratégias de preços dinâmicos. O hotel pode ajustar tarifas em um único painel e replicá-las em todos os canais simultaneamente, garantindo que o preço certo seja oferecido no momento certo.",
  },
  {
    numero: "05",
    titulo: "CONTROLE DE INVENTÁRIO",
    subtitulo: "(Visão centralizada)",
    descricao:
      "Oferece uma visão unificada de todo o inventário de quartos. O gestor sabe exatamente quantos quartos estão disponíveis em cada canal, evitando a venda excessiva ou a subutilização do inventário.",
  },
  {
    numero: "06",
    titulo: "AUMENTO DA LUCRATIVIDADE",
    subtitulo: "(Foco nas reservas diretas)",
    descricao:
      "Ao integrar o Motor de Reservas do site, o Channel Manager garante que o inventário esteja sempre disponível no canal próprio, incentivando as reservas diretas e, consequentemente, aumentando a lucratividade ao reduzir as comissões de terceiros.",
  },
  {
    numero: "07",
    titulo: "INTELIGÊNCIA DE DADOS",
    subtitulo: "(Relatórios de performance)",
    descricao:
      "Muitos sistemas oferecem relatórios detalhados sobre o desempenho de cada canal de venda. Isso permite identificar quais canais trazem mais receita e qual o custo de aquisição de cada hóspede, subsidiando decisões estratégicas.",
  },
  {
    numero: "08",
    titulo: "SINCRONIZAÇÃO TWO-WAY COM PMS",
    subtitulo: "(Redução de erros humanos)",
    descricao:
      "Garante a sincronização em tempo real de reservas, cancelamentos, alterações e disponibilidade com os principais PMS do Brasil. Essa conexão elimina o risco de overbooking e assegura a precisão dos dados em toda a sua gestão hoteleira.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const sc = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// ── AccordionPanel ────────────────────────────────────────────────────────────
/*
  Architecture decision — WHY a plain <div> instead of <motion.div layout>:

  Framer Motion's `layout` animates size changes via transform: scaleX/scaleY.
  That scale is applied to the *entire subtree*, causing text to blur and squish
  during the animation — impossible to fully compensate even with layoutId tricks.

  The fix: animate `flex` (the width ratio) with a plain CSS transition.
  The browser changes the box dimensions directly, no transform involved.
  Text is ALWAYS at 100 % its natural size and never gets rasterised at a
  different resolution. Content layers are position:absolute so they fill the
  panel at every frame without layout shift.
*/
interface PanelProps {
  item: (typeof VANTAGENS)[number];
  isActive: boolean;
  onEnter: () => void;
}

function AccordionPanel({ item, isActive, onEnter }: PanelProps) {
  return (
    /*
      CSS `flex` transition — expo.out feel (cubic-bezier(0.16,1,0.3,1)):
        · Starts fast (panel snaps open decisively)
        · Decelerates smoothly near the end (natural inertia)
        · Zero scale transforms → zero text distortion
    */
    <div
      className="relative overflow-hidden cursor-pointer select-none"
      style={{
        flex: isActive ? "6 1 0%" : "1 1 0%",
        borderRadius: 16,
        transition:
          "flex 550ms cubic-bezier(0.16, 1, 0.3, 1), " +
          "filter 550ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "flex",
        filter: isActive
          ? "drop-shadow(0 12px 28px rgba(40,89,146,0.14)) drop-shadow(0 4px 8px rgba(36,66,72,0.08))"
          : "drop-shadow(0 4px 16px rgba(36,42,82,0.22))",
      }}
      onMouseEnter={onEnter}
    >
      {/* ── Layer A: blue gradient — always present ──────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#285992] to-[#4876ab]" />

      {/* ── Layer B: white overlay — CSS transition, no Framer Motion ───── */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 350ms ease",
        }}
      />

      {/* ── Bevel: inner border ring ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: isActive
            ? "inset 0 0 0 1px rgba(255,255,255,0.80)"
            : "inset 0 0 0 0px rgba(255,255,255,0)",
          transition: "box-shadow 300ms ease",
        }}
      />

      {/* ── Outer border ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-3xl border pointer-events-none"
        style={{
          borderColor: isActive ? "rgba(40,89,146,0.22)" : "rgba(0,0,0,0)",
          transition: "border-color 300ms ease",
        }}
      />

      {/* ── Top-edge highlight ───────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: isActive
            ? "linear-gradient(90deg,transparent,rgba(40,89,146,0.35) 40%,rgba(100,160,255,0.5) 60%,transparent)"
            : "transparent",
          transition: "background 400ms ease",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      {/*
        Both states are position:absolute so they never affect the panel's
        layout — the panel width is driven purely by `flex` above.
      */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait" initial={false}>

          {isActive ? (
            // ── OPEN STATE ───────────────────────────────────────────────
            <motion.div
              key="open"
              className="absolute inset-0 flex flex-col p-7 xl:p-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.12 }}
            >
              {/* Watermark number — decorative, very low opacity */}
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 font-black text-[#285992]/[0.04] select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(90px, 14vw, 160px)" }}
              >
                {item.numero}
              </span>

              {/* Badge + separator */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-3xl bg-[#285992] flex items-center justify-center shrink-0 shadow-lg shadow-[#285992]/30">
                    <span className="text-white font-normal text-xs uppercase tracking-widest">
                      {item.numero}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#285992]/30 via-[#285992]/10 to-transparent" />
                </div>

                <h3 className="font-display font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased text-4xl xl:text-5xl">
                  {sc(item.titulo)}
                </h3>
              </div>

              {/* Thin separator */}
              <div className="my-5 h-px bg-gradient-to-r from-[#285992]/15 to-transparent" />

              {/* Description — slides up after panel is mostly open */}
              <motion.p
                className="text-gray-500 text-base font-light leading-relaxed flex-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.22, ease: "easeOut" }}
              >
                {item.descricao}
              </motion.p>
            </motion.div>

          ) : (
            // ── CLOSED STATE ─────────────────────────────────────────────
            <motion.div
              key="closed"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Title — vertical writing, bottom-to-top (matches tipos-propriedade-section) */}
              <div className="flex-1 overflow-hidden flex justify-center items-center">
                <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  <span
                    className="text-[12px] font-extrabold uppercase whitespace-nowrap text-white drop-shadow-lg leading-none"
                    style={{ letterSpacing: "0.28em" }}
                  >
                    {sc(item.titulo)}
                  </span>
                </div>
              </div>

              {/* Number pill-tag — bottom anchor */}
              <div className="shrink-0 flex justify-center pb-5">
                <div className="inline-flex items-center rounded-full px-2.5 py-2.5 border border-white/20 bg-white/10">
                  <span className="font-normal text-[10px] uppercase text-white/60 tracking-widest">
                    {item.numero}
                  </span>
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
function VantagensSection() {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Vantagens do{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              gestor de canais
            </span>{" "}
            para hotéis e pousadas
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed max-w-4xl mx-auto">
            O nosso{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent font-medium">
              software de hotelaria
            </span>{" "}
            permite que você distribua as acomodações em centenas de canais,
            aumentando sua taxa de ocupação, reduzindo os riscos de overbooking e
            otimizando o trabalho da equipe de reservas do seu hotel.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP — Horizontal accordion (lg+)
            onMouseLeave reverts to the first panel to avoid stuck states.
        ════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden lg:flex gap-2 h-[430px]"
          onMouseLeave={() => setHoveredIdx(0)}
        >
          {VANTAGENS.map((item, i) => (
            <AccordionPanel
              key={item.numero}
              item={item}
              isActive={hoveredIdx === i}
              onEnter={() => setHoveredIdx(i)}
            />
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            MOBILE — Vertical list (< lg)
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VANTAGENS.map((vantagem, index) => (
            <motion.div
              key={vantagem.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.07 }}
              className="relative overflow-hidden bg-white/90 backdrop-blur-xl border border-gray-200/70 rounded-3xl p-6 shadow-[0_4px_16px_rgba(36,66,72,0.07)] ring-1 ring-white/70"
            >
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-4 text-[80px] leading-none font-black text-[#285992]/[0.04] select-none pointer-events-none"
              >
                {vantagem.numero}
              </span>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#285992] flex items-center justify-center shrink-0 shadow-md shadow-[#285992]/20">
                  <span className="text-white font-bold text-xs tracking-widest">
                    {vantagem.numero}
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#285992]/20 to-transparent" />
              </div>

              <h3 className="font-bold text-[#1e3a5f] text-sm leading-snug mb-1">
                {vantagem.titulo}
              </h3>
              <p className="text-[#285992] text-xs font-medium mb-3">
                {vantagem.subtitulo}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {vantagem.descricao}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export { VantagensSection };
