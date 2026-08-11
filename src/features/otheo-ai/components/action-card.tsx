"use client";

import { motion } from "framer-motion";
import type { OtheoAcao } from "../data/otheo-actions";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STATUS_LABEL: Record<string, string> = {
  "em-construcao": "Em breve",
  "pendente": "Pendente",
};

/**
 * ActionCard — clicar não executa nada aqui: pré-preenche o Omnibox com o
 * template do comando e devolve o foco pra ele (ver `onSelect` no
 * chamador). Mantém uma única superfície de interação (linguagem natural)
 * em vez de um clique-em-botão concorrendo com o comando digitado — o
 * clique é só um atalho para escrever o comando certo.
 */
function ActionCard({
  acao,
  index,
  onSelect,
}: {
  acao: OtheoAcao;
  index: number;
  onSelect: () => void;
}) {
  const Icon = acao.Icone;
  const disabled = acao.status !== "pronto";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04, ease: EASE }}
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      className={[
        "group relative flex items-start gap-3 text-left rounded-xl p-3.5 border transition-all duration-300",
        disabled
          ? "border-dashed border-white/10 bg-white/[0.02] opacity-55 cursor-not-allowed"
          : "border-white/10 bg-white/[0.04] hover:border-[#fccc30]/40 hover:bg-white/[0.07] hover:-translate-y-0.5",
      ].join(" ")}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
        style={{ background: disabled ? "rgba(255,255,255,0.05)" : "rgba(252,204,48,0.12)" }}
      >
        <Icon className="w-4 h-4" style={{ color: disabled ? "rgba(255,255,255,0.4)" : "#fccc30" }} strokeWidth={1.8} />
      </div>
      <span className="text-sm font-medium leading-snug text-white/90 pt-1">{acao.label}</span>

      {disabled && (
        <span className="absolute top-2.5 right-2.5 font-mono text-[8.5px] uppercase tracking-wide text-white/40 border border-white/10 rounded-full px-2 py-0.5 whitespace-nowrap">
          {STATUS_LABEL[acao.status]}
        </span>
      )}
    </motion.button>
  );
}

export { ActionCard };
