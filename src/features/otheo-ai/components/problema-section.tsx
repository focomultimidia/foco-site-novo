"use client";

import { motion } from "framer-motion";
import { Monitor, DollarSign, CalendarRange, FileSpreadsheet, MessageCircle, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TELAS = [
  { icon: Monitor, label: "PMS", rotate: -6 },
  { icon: DollarSign, label: "Financeiro", rotate: 3 },
  { icon: CalendarRange, label: "CRS", rotate: -3 },
  { icon: FileSpreadsheet, label: "Planilha", rotate: 6 },
];

/**
 * ProblemaSection — cria a tensão que o resto da página resolve. As telas
 * espalhadas e giradas (uma pra cada sistema que o hoteleiro abre pra
 * responder uma pergunta simples) convergem visualmente pra um único chip
 * "Otheo", antecipando a virada de "seis abas" pra "uma conversa" antes
 * mesmo do texto explicar isso.
 */
function ProblemaSection() {
  return (
    <section className="py-24 lg:py-28 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Sua manhã já começa com{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              seis abas abertas
            </span>
            .
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            PMS pra ver ocupação. Planilha pra conferir tarifa. Extranet pra fechar uma
            categoria. Você não geriu um hotel hoje, você navegou por um.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-3">
          <div className="flex items-center -space-x-4">
            {TELAS.map((tela, index) => (
              <motion.div
                key={tela.label}
                initial={{ opacity: 0, y: 16, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: tela.rotate }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                style={{ zIndex: TELAS.length - index }}
                className="relative bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-center gap-2.5"
              >
                <tela.icon className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{tela.label}</span>
              </motion.div>
            ))}
          </div>

          <ArrowRight className="w-5 h-5 text-slate-300 hidden sm:block" strokeWidth={2} />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
            className="flex items-center gap-2.5 rounded-2xl px-5 py-4"
            style={{
              background: "linear-gradient(135deg,#285992,#427ab9)",
              boxShadow: "0 20px 40px -12px rgba(40,89,146,0.4)",
            }}
          >
            <MessageCircle className="w-4 h-4 text-white" strokeWidth={1.8} />
            <span className="text-sm font-medium text-white whitespace-nowrap">Otheo</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ProblemaSection };
