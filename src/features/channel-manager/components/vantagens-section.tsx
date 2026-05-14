"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data (preserved exactly) ──────────────────────────────────────────────────

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

// ── Spring — cinematic inertia: sub-amortecida com peso real ─────────────────
// mass: 1.2 → aumenta a inércia (o card sente mais "pesado" ao acelerar)
// stiffness: 150, damping: 25 → ζ = 25/(2×√(150×1.2)) = 25/26.83 ≈ 0.93
// Levemente sub-amortecido: assentamento em ~380ms com overshoot imperceptível.
const SPRING = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1.2, restDelta: 0.001 };

// ── Sentence-case helper ──────────────────────────────────────────────────────
// Os dados estão em caixa alta; exibimos com capitalização de frase.
const sc = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();


// ══════════════════════════════════════════════════════════════════════════════
// ACCORDION PANEL
// ══════════════════════════════════════════════════════════════════════════════

interface PanelProps {
  item: (typeof VANTAGENS)[number];
  isActive: boolean;
  onEnter: () => void;
}

function AccordionPanel({ item, isActive, onEnter }: PanelProps) {
  return (
    <motion.div
      layout
      className="relative overflow-hidden cursor-pointer select-none"
      style={{
        flex: isActive ? "6 1 0%" : "1 1 0%",
        willChange: "transform",
        // borderRadius como inline style é obrigatório para que o Framer Motion
        // aplique a correção de escala inversa (inverse-scale correction) durante
        // a animação layout. Com apenas a classe rounded-2xl o Framer Motion não
        // consegue ler o valor computado e os cantos se distorcem.
        borderRadius: 16,
        filter: isActive
          ? "drop-shadow(0 12px 28px rgba(40,89,146,0.14)) drop-shadow(0 4px 8px rgba(36,66,72,0.08))"
          : "drop-shadow(0 4px 16px rgba(36,42,82,0.22))",
      }}
      transition={SPRING}
      onMouseEnter={onEnter}
    >
      {/* ── Layer A: gradiente azul — base do estado fechado ───────────── */}
      {/* Fica sempre presente; Layer B sobrepõe quando isActive. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#285992] to-[#4876ab]" />

      {/* ── Layer B: glassmorphism — cross-fade ao abrir ─────────────────── */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* ── Bevel: visível só no card aberto ────────────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isActive
            ? "inset 0 0 0 1px rgba(255,255,255,0.80)"
            : "inset 0 0 0 0px rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* ── Outer border: só no card aberto ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-2xl border pointer-events-none"
        animate={{
          borderColor: isActive
            ? "rgba(40,89,146,0.22)"
            : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* ── Top-edge highlight on active card ───────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        animate={{
          background: isActive
            ? "linear-gradient(90deg,transparent,rgba(40,89,146,0.35) 40%,rgba(100,160,255,0.5) 60%,transparent)"
            : "transparent",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait" initial={false}>

          {isActive ? (
            // ── OPEN STATE ─────────────────────────────────────────────────
            <motion.div
              key="open"
              className="absolute inset-0 flex flex-col p-7 xl:p-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.10 }}
            >
              {/* Watermark number — decorative, very low opacity */}
              <span
                aria-hidden="true"
                className="
                  absolute right-0 bottom-0
                  font-black text-[#285992]/[0.04]
                  select-none pointer-events-none leading-none
                "
                style={{ fontSize: "clamp(90px, 14vw, 160px)" }}
              >
                {item.numero}
              </span>

              {/* ── Top block ─────────────────────────────────────────────── */}
              <div>
                {/* Badge + separator */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#285992] flex items-center justify-center shrink-0 shadow-lg shadow-[#285992]/30">
                    <span className="text-white font-mono text-xs uppercase tracking-widest">
                      {item.numero}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#285992]/30 via-[#285992]/10 to-transparent" />
                </div>

                {/* Title — sentence case, máximo impacto tipográfico */}
                <h3 className="
                  font-display font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased
                  text-4xl xl:text-5xl
                  mb-0
                ">
                  {sc(item.titulo)}
                </h3>
              </div>

              {/* Thin separator */}
              <div className="my-5 h-px bg-gradient-to-r from-[#285992]/15 to-transparent" />

              {/* ── Description — fade-in + slide-up ──────────────────────── */}
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
            // ── CLOSED STATE ─────────────────────────────────────────────────
            // Title: âncora no topo, flui para baixo em writing-mode vertical.
            // Número: pill-tag minimalista no rodapé — detalhe de joalheria.
            <motion.div
              key="closed"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* ── Title — top-anchored, flows downward ─────────────────────
                  flex justify-center: centers the column horizontally.
                  items-start: anchors to the top so the text reads from
                  the very beginning of the available space.
                  pt-6: luxurious breathing room from the card's top edge.
              */}
              <div className="flex-1 overflow-hidden flex justify-center items-start pt-6">
                <div style={{ writingMode: "vertical-rl" }}>
                  <span className="
                    font-display font-semibold text-white antialiased
                    tracking-tighter leading-none
                    text-xl
                  ">
                    {sc(item.titulo)}
                  </span>
                </div>
              </div>

              {/* ── Number pill-tag — bottom anchor ──────────────────────────
                  font-light para contrastar com o peso do título acima.
                  backdrop-blur-sm + border-white/20 = toque de joalheria tech.
              */}
              <div className="shrink-0 flex justify-center pb-5">
                <div className="
                  inline-flex items-center
                  rounded-full px-2.5 py-2.5
                  border border-white/20
                  bg-white/10
                ">
                  <span className="
                    font-mono text-[10px] uppercase
                    text-white/60
                    tracking-widest
                  ">
                    {item.numero}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION
// ══════════════════════════════════════════════════════════════════════════════

function VantagensSection() {
  // Inicia com o primeiro card aberto; reverte para ele ao sair do container.
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section className="py-24 bg-gray-50">
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
            <span className="text-blue-500">gestor de canais</span>{" "}
            para hotéis e pousadas
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed max-w-4xl mx-auto">
            O nosso{" "}
            <span className="text-blue-500 font-medium">software de hotelaria</span>{" "}
            permite que você distribua as acomodações em centenas de canais,
            aumentando sua taxa de ocupação, reduzindo os riscos de overbooking e
            otimizando o trabalho da equipe de reservas do seu hotel.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP — Acordeão horizontal (lg+)
            onMouseLeave no container evita flicker ao mover entre painéis.
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
            MOBILE — Lista vertical (< lg)
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VANTAGENS.map((vantagem, index) => (
            <motion.div
              key={vantagem.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.07 }}
              className="
                relative overflow-hidden
                bg-white/90 backdrop-blur-xl
                border border-gray-200/70
                rounded-2xl p-6
                shadow-[0_4px_16px_rgba(36,66,72,0.07)]
                ring-1 ring-white/70
              "
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
