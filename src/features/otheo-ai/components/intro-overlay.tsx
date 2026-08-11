"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TheoEntrance } from "./theo-avatar";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const INTRO_DURATION_MS = 2600;

/**
 * IntroOverlay — a coreografia de entrada (Sessão 2 do briefing) roda como
 * uma camada decorativa POR CIMA da página real, não como porta de entrada
 * obrigatória. Ela some sozinha depois de `INTRO_DURATION_MS`, por timer —
 * não depende de `onAnimationComplete` do Framer Motion terminando certo.
 *
 * Isso é proposital: se a animação travar (dispositivo lento, aba em
 * segundo plano, `prefers-reduced-motion`), o conteúdo real por baixo (o
 * Omnibox, os cards) já está montado e utilizável desde o primeiro
 * instante — o overlay nunca pode ser a única porta pra a página funcionar.
 */
function IntroOverlay() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setTimeout(() => setVisible(false), INTRO_DURATION_MS);
    return () => clearTimeout(id);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="otheo-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b1a2e] pointer-events-none"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display font-bold text-3xl sm:text-4xl text-white mb-8 tracking-tight"
          >
            Othe<span style={{ color: "#fccc30" }}>o</span> AI
          </motion.h1>
          <TheoEntrance />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { IntroOverlay };
