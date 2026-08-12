"use client";

import { motion } from "framer-motion";
import { Wrench, BookOpen, ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AGENTES = ["PMS", "Financeiro", "CRS", "Sob demanda"];

/**
 * PilaresSection — os "dois grandes pilares" descritos no material fonte
 * viram duas colunas, não três cards genéricos. É uma dualidade real do
 * produto (agentes que agem vs. agente que ensina), então o layout 2 a 2
 * comunica a própria estrutura do conteúdo em vez de só ilustrá-la.
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group bg-white rounded-[28px] border border-slate-100 p-8 sm:p-10 flex flex-col"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(15,23,42,0.06)" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}>
              <Wrench className="w-6 h-6 text-white" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#1e3a5f] tracking-tight mb-2">
              Agentes especializados
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#285992]/70 mb-4">
              Consultam e executam
            </p>
            <p className="text-slate-500 leading-relaxed mb-7 flex-1">
              Cada área do sistema tem um agente com conhecimento aprofundado sobre o seu nicho
              e acesso às ferramentas certas para consultar informações e executar ações, como
              localizar uma reserva ou alterar o status de uma UH.
            </p>
            {/* Pulso em cascata ao passar o mouse no card inteiro — sinaliza
                que os agentes são entidades ativas, não uma lista estática. */}
            <div className="flex flex-wrap gap-2">
              {AGENTES.map((agente, index) => (
                <span
                  key={agente}
                  style={{ transitionDelay: `${index * 70}ms` }}
                  className="font-mono text-[11px] uppercase tracking-wide text-[#285992] bg-[#285992]/8 border border-[#285992]/15 rounded-full px-3 py-1.5 transition-transform duration-300 group-hover:-translate-y-1"
                >
                  {agente}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="bg-white rounded-[28px] border border-slate-100 p-8 sm:p-10 flex flex-col"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(15,23,42,0.06)" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#fccc30]/15 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-[#b8860b]" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#1e3a5f] tracking-tight mb-2">
              Base de conhecimento
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#285992]/70 mb-4">
              Orienta e ensina
            </p>
            <p className="text-slate-500 leading-relaxed mb-7 flex-1">
              Um agente dedicado a ensinar, alimentado progressivamente com a documentação da
              Foco. Ele orienta o hoteleiro passo a passo em vez de executar a ação por conta
              própria.
            </p>
            <div className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4">
              <p className="text-slate-700 text-sm italic mb-1.5">
                "Como faço para configurar o Pay?"
              </p>
              <p className="text-slate-400 text-xs flex items-center gap-1.5">
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                Otheo responde com o passo a passo, na hora
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { PilaresSection };
