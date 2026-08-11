"use client";

import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, CornerDownLeft } from "lucide-react";
import { OMNIBOX_PLACEHOLDERS } from "../data/otheo-actions";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface OmniboxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  busy?: boolean;
}

/**
 * Omnibox — a porta de entrada única do módulo (Sessão 1 do briefing).
 * `⌘K`/`Ctrl+K` foca o campo de qualquer lugar da página. O placeholder
 * roda por exemplos reais dos comandos que o Theo entende, em vez de um
 * genérico "Digite aqui" — a UI já ensina o vocabulário sem precisar de
 * onboarding separado.
 */
const Omnibox = forwardRef<HTMLInputElement, OmniboxProps>(function Omnibox(
  { value, onChange, onSubmit, busy = false },
  ref,
) {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setPlaceholderIdx(i => (i + 1) % OMNIBOX_PLACEHOLDERS.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        (ref as React.RefObject<HTMLInputElement>)?.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ref]);

  return (
    <div className="relative">
      <form
        onSubmit={e => { e.preventDefault(); if (value.trim()) onSubmit(); }}
        className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm px-5 py-4 transition-colors focus-within:border-[#fccc30]/50"
      >
        <Sparkles className="w-5 h-5 text-[#fccc30] shrink-0" strokeWidth={1.8} />

        <div className="relative flex-1">
          <input
            ref={ref}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-transparent text-white text-base outline-none placeholder:text-transparent"
          />
          {/* Placeholder rotativo — só aparece quando o campo está vazio */}
          {value === "" && (
            <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={placeholderIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-white/35 text-base whitespace-nowrap"
                >
                  {OMNIBOX_PLACEHOLDERS[placeholderIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        {value.trim() ? (
          <button
            type="submit"
            disabled={busy}
            className="shrink-0 flex items-center gap-1.5 rounded-full bg-[#fccc30] text-[#132840] text-xs font-semibold px-3 py-1.5 disabled:opacity-60"
          >
            {busy ? "Pensando..." : "Perguntar"}
            {!busy && <CornerDownLeft className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <kbd className="hidden sm:inline shrink-0 text-[10px] font-mono text-white/30 border border-white/15 rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        )}
      </form>
    </div>
  );
});

export { Omnibox };
