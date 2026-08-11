"use client";

import { motion } from "framer-motion";
import type { OtheoGrupo } from "../data/otheo-actions";
import { ActionCard } from "./action-card";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ActionGroupDeck({
  grupo,
  onSelectAcao,
}: {
  grupo: OtheoGrupo;
  onSelectAcao: (template: string) => void;
}) {
  const Icon = grupo.Icone;

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
          <Icon className="w-3.5 h-3.5 text-[#fccc30]" strokeWidth={2} />
        </div>
        <h3 className="font-display font-semibold text-sm text-white/90 tracking-tight">
          {grupo.titulo}
        </h3>
      </motion.div>
      <p className="text-white/45 text-xs mb-4 ml-[38px]">{grupo.descricao}</p>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2.5">
        {grupo.acoes.map((acao, i) => (
          <ActionCard
            key={acao.id}
            acao={acao}
            index={i}
            onSelect={() => onSelectAcao(acao.template)}
          />
        ))}
      </div>
    </section>
  );
}

export { ActionGroupDeck };
