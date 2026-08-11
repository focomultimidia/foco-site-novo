"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { TheoAvatar } from "./theo-avatar";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const DEMO_MESSAGES = [
  { from: "theo" as const, text: "Oi! Sou o Theo. Prefere conversar por aqui em vez do Omnibox lá em cima? Também funciono nessa janela." },
  { from: "user" as const, text: "Quais reservas fazem check-out hoje?" },
  { from: "theo" as const, text: "Numa extranet real eu já traria a lista aqui — essa é só a prévia da conversa." },
];

/**
 * TheoChatDrawer — o mascote docado vira o gatilho flutuante (canto
 * inferior direito, padrão de FAB). Clicar expande um painel de chat com
 * uma conversa estática de demonstração — deixa claro que é uma prévia,
 * não finge ser um backend de IA real.
 */
function TheoChatDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Fechar chat do Theo" : "Abrir chat do Theo"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.8, ease: EASE }}
        className="fixed bottom-6 right-6 z-40 rounded-2xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
        style={{ background: "rgba(11,26,46,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <TheoAvatar size={56} floating={!open} className="p-1.5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-24 right-6 z-40 w-[340px] max-w-[calc(100vw-3rem)] rounded-2xl border border-white/12 overflow-hidden shadow-[0_24px_60px_-16px_rgba(0,0,0,0.55)]"
            style={{ background: "#0b1a2e" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="font-display font-semibold text-white text-sm">Theo</span>
              <button onClick={() => setOpen(false)} aria-label="Fechar" className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-2.5 max-h-[320px] overflow-y-auto">
              {DEMO_MESSAGES.map((m, i) => (
                <div
                  key={i}
                  className={[
                    "rounded-xl px-3.5 py-2.5 text-sm max-w-[85%]",
                    m.from === "theo"
                      ? "bg-white/[0.06] text-white/85 self-start"
                      : "bg-[#fccc30] text-[#132840] font-medium self-end",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { TheoChatDrawer };
