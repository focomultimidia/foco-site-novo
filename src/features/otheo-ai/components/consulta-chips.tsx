"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { OTHEO_CONSULTAS } from "../data/otheo-actions";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * ConsultaChips — grupo 3 do briefing ("Consulta Profunda de Dados"). Não
 * são ações (nada é executado), então ganham um tratamento visualmente mais
 * leve que os `ActionCard` dos outros grupos: chips numa única linha que
 * quebra, não cards em grid — reforça que isso é "uma pergunta", não "um
 * botão".
 */
function ConsultaChips({ onSelectConsulta }: { onSelectConsulta: (template: string) => void }) {
  const grupo = OTHEO_CONSULTAS;

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex items-center gap-2.5 mb-1"
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.06]">
          <Search className="w-3.5 h-3.5 text-[#fccc30]" strokeWidth={2} />
        </div>
        <h3 className="font-display font-semibold text-sm text-white/90 tracking-tight">
          {grupo.titulo}
        </h3>
      </motion.div>
      <p className="text-white/45 text-xs mb-4 ml-[38px]">{grupo.descricao}</p>

      <div className="flex flex-wrap gap-2">
        {grupo.consultas.map((consulta, i) => (
          <motion.button
            key={consulta.id}
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: (i % 10) * 0.03, ease: EASE }}
            onClick={() => onSelectConsulta(consulta.template)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/70 hover:border-[#fccc30]/40 hover:text-white hover:bg-white/[0.07] transition-colors duration-200"
          >
            {consulta.label}
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export { ConsultaChips };
