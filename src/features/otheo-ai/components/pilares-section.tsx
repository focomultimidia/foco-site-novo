"use client";

import { motion } from "framer-motion";
import { Wrench, BookOpen, ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AGENTES = ["PMS", "Financeiro", "CRS", "Sob demanda"];

const panelVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Pontinho pulsante "ao vivo" — mesma técnica do painel "Sistema ativo" do
// Console em gestao-hoteleira/recursos-section.tsx, reaproveitada aqui como
// o fio condutor visual entre os dois painéis (apesar da pele oposta —
// escuro/mecânico vs. claro/conversa —, os dois usam o MESMO pontinho pra
// deixar claro que é o mesmo sistema vivo por trás, só em dois modos).
function LiveDot({ color = "#34d399" }: { color?: string }) {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: color }} />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: color }} />
    </span>
  );
}

/**
 * PilaresSection — os "dois grandes pilares" do material fonte viram dois
 * PAINÉIS de um único console, não dois cards brancos gêmeos (o problema do
 * design anterior: nada na pele diferenciava "agente que executa" de
 * "agente que ensina", só o ícone). Agora a dualidade está na própria pele:
 * painel esquerdo escuro/técnico (grade sutil, glow, badges "ao vivo") pra
 * "agentes que agem por você"; painel direito claro/conversa (bolhas de
 * chat de verdade, não uma citação solta numa caixa cinza) pra "agente que
 * ensina". Um único invólucro com costura ao centro (não `gap`) reforça que
 * é UM sistema com dois modos, não dois produtos separados.
 */
function PilaresSection() {
  return (
    <section className="py-24 lg:py-28 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Dois jeitos de{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              resolver
            </span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            O Otheo combina agentes que agem por você com um agente que ensina, dependendo do
            que a pergunta pedir.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-[32px] overflow-hidden shadow-[0_24px_64px_-28px_rgba(15,23,42,0.35)]"
        >
          <div className="grid md:grid-cols-2">

            {/* Painel esquerdo — Agentes especializados: escuro, técnico, "ligado" */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative p-8 sm:p-10 lg:p-12 flex flex-col overflow-hidden"
              style={{ background: "linear-gradient(160deg, #132840 0%, #1e3a5f 100%)" }}
            >
              {/* Grade técnica + glow — a "pele" que diz "sistema ativo",
                  sem depender só do ícone pra comunicar isso. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -top-24 -left-16 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(66,122,185,0.35), transparent 70%)", filter: "blur(10px)" }}
              />

              <motion.div variants={itemVariants} className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg,#285992,#5b8fc7)", boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 10px 26px -6px rgba(40,89,146,0.6)" }}>
                <Wrench className="w-6 h-6 text-white" strokeWidth={1.8} />
              </motion.div>

              <motion.h3 variants={itemVariants} className="relative z-10 font-display text-2xl font-semibold text-white tracking-tight mb-2">
                Agentes especializados
              </motion.h3>
              <motion.p variants={itemVariants} className="relative z-10 font-mono text-[11px] uppercase tracking-[0.14em] text-[#fccc30] mb-4 flex items-center gap-2">
                <LiveDot />
                Consultam e executam
              </motion.p>
              <motion.p variants={itemVariants} className="relative z-10 text-white/65 leading-relaxed mb-7 flex-1">
                Cada área do sistema tem um agente com conhecimento aprofundado sobre o seu nicho
                e acesso às ferramentas certas para consultar informações e executar ações, como
                localizar uma reserva ou alterar o status de uma UH.
              </motion.p>

              {/* Chips "ao vivo" — cada agente listado como um serviço rodando,
                  não uma etiqueta estática; sobem em cascata no hover do painel. */}
              <motion.div variants={itemVariants} className="relative z-10 flex flex-wrap gap-2">
                {AGENTES.map((agente, index) => (
                  <span
                    key={agente}
                    style={{ transitionDelay: `${index * 70}ms` }}
                    className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-white bg-white/8 border border-white/15 rounded-full pl-2.5 pr-3 py-1.5 transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <LiveDot />
                    {agente}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Painel direito — Base de conhecimento: claro, conversa de verdade */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delayChildren: 0.15 }}
              className="relative bg-white p-8 sm:p-10 lg:p-12 flex flex-col overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-16 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(252,204,48,0.12), transparent 70%)" }}
              />

              <motion.div variants={itemVariants} className="relative z-10 w-14 h-14 rounded-2xl bg-[#fccc30]/15 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-[#b8860b]" strokeWidth={1.8} />
              </motion.div>

              <motion.h3 variants={itemVariants} className="relative z-10 font-display text-2xl font-semibold text-[#1e3a5f] tracking-tight mb-2">
                Base de conhecimento
              </motion.h3>
              <motion.p variants={itemVariants} className="relative z-10 font-mono text-[11px] uppercase tracking-[0.14em] text-[#285992]/70 mb-4">
                Orienta e ensina
              </motion.p>
              <motion.p variants={itemVariants} className="relative z-10 text-slate-500 leading-relaxed mb-7 flex-1">
                Um agente dedicado a ensinar, alimentado progressivamente com a documentação da
                Foco. Ele orienta o hoteleiro passo a passo em vez de executar a ação por conta
                própria.
              </motion.p>

              {/* Exemplo como conversa de verdade (2 bolhas), não uma citação
                  solta numa caixa cinza — mostra a interação em vez de só
                  descrevê-la. */}
              <motion.div variants={itemVariants} className="relative z-10 space-y-2.5">
                <div className="flex justify-end">
                  <div className="max-w-[88%] bg-slate-100 rounded-2xl rounded-tr-sm px-4 py-2.5">
                    <p className="text-slate-600 text-sm leading-snug">
                      Como faço para configurar o Pay?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#fccc30]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#b8860b]" strokeWidth={2} />
                  </div>
                  <div className="max-w-[85%] bg-[#fccc30]/10 border border-[#fccc30]/20 rounded-2xl rounded-tl-sm px-4 py-2.5">
                    <p className="text-[#7a5c0a] text-sm leading-snug flex items-center gap-1.5">
                      <LiveDot color="#c99a1f" />
                      Otheo responde com o passo a passo, na hora
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { PilaresSection };
