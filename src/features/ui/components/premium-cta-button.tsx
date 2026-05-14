"use client";

/**
 * PremiumCTAButton — Botão ultra-premium com física e efeitos ópticos
 *
 * Camadas de efeito (de fora para dentro):
 *   1. Magnetic field  → div raiz, detecta proximidade via mousemove global
 *   2. Spring magnet   → motion.div translata suavemente em direção ao cursor
 *   3. 3D tilt         → motion.div com rotateX/Y + perspective 900px
 *   4. Border beam     → conic-gradient rotativo (1px "gap" = borda luminosa)
 *   5. Glow aura       → cópia desfocada do beam, atrás do botão
 *   6. Glass button    → fundo navy gradiente + backdrop-blur + box-shadow glow
 *   7. Shimmer sweep   → luz diagonal que atravessa o botão periodicamente
 *   8. Top edge line   → highlight físico no topo (simula superfície curva)
 *
 * Performance:
 *   · Magnetic + tilt usam useSpring → interpolação nativa do Framer Motion
 *   · Beam usa useAnimationFrame + useTransform → MotionValue atualizado por RAF
 *   · will-change: transform no botão → GPU layer hint
 *   · Shimmer usa Framer Motion scheduler (RAF-based, não setInterval)
 */

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimationFrame,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumCTAButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

// Raio do campo magnético (px a partir do centro do botão)
const MAGNETIC_RADIUS   = 160;
// Intensidade: quanto o botão se move em direção ao cursor (0–1)
const MAGNETIC_STRENGTH = 0.28;
// Duração de uma rotação completa do beam (ms)
const BEAM_PERIOD_MS    = 3000;

function PremiumCTAButton({
  label    = "Agendar uma demonstração",
  onClick,
  className,
}: PremiumCTAButtonProps) {
  const outerRef = useRef<HTMLDivElement>(null);

  // ── Border beam ────────────────────────────────────────────────────────────
  // beamAngle é um MotionValue que aumenta a cada frame via useAnimationFrame.
  // beamBg é derivado via useTransform — gera o conic-gradient com o ângulo atual.
  // Nenhum state React envolvido: zero re-renders durante a rotação.
  const beamAngle = useMotionValue(0);
  const beamBg = useTransform(
    beamAngle,
    (a) =>
      `conic-gradient(from ${a}deg, ` +
      `transparent 0%, transparent 28%, ` +
      `rgba(96, 165, 250, 0.65) 42%, ` +
      `rgba(255, 255, 255, 0.95) 50%, ` +
      `rgba(96, 165, 250, 0.65) 58%, ` +
      `transparent 72%, transparent 100%)`
  );

  useAnimationFrame((t) => {
    beamAngle.set(((t / BEAM_PERIOD_MS) * 360) % 360);
  });

  // ── Magnetic ───────────────────────────────────────────────────────────────
  // Spring com massa baixa → resposta rápida, amortecimento suave.
  const magnetX = useSpring(0, { stiffness: 110, damping: 18, mass: 0.1 });
  const magnetY = useSpring(0, { stiffness: 110, damping: 18, mass: 0.1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = outerRef.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAGNETIC_RADIUS) {
        const factor = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
        magnetX.set(dx * factor);
        magnetY.set(dy * factor);
      } else {
        magnetX.set(0);
        magnetY.set(0);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [magnetX, magnetY]);

  // ── 3D tilt ────────────────────────────────────────────────────────────────
  // Stiffness alta + damping moderado → resposta imediata mas sem vibração.
  const tiltX = useSpring(0, { stiffness: 280, damping: 28 });
  const tiltY = useSpring(0, { stiffness: 280, damping: 28 });

  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r  = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2); // –1 → +1
    const ny = (e.clientY - r.top  - r.height / 2) / (r.height / 2); // –1 → +1
    tiltY.set( nx * 14); // max ±14° no eixo Y (esq-dir)
    tiltX.set(-ny *  9); // max ±9°  no eixo X (cima-baixo), invertido
  };

  const onTiltReset = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    // Referência para cálculo do campo magnético
    <div ref={outerRef} className={cn("inline-block", className)}>

      {/* ── Camada magnética ─────────────────────────────────────────────── */}
      <motion.div style={{ x: magnetX, y: magnetY }} className="inline-block">

        {/* ── Camada de tilt 3D ───────────────────────────────────────────── */}
        <motion.div
          className="inline-block"
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
          onMouseMove={onTiltMove}
          onMouseLeave={onTiltReset}
        >
          {/* ── Moldura do beam (p-[1px] = espessura da borda luminosa) ─── */}
          <div className="relative rounded-full p-[1px]">

            {/* Fundo rotativo — conic-gradient que forma a borda animada */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: beamBg }}
              aria-hidden="true"
            />

            {/* Aura desfocada — glow que emana para além da borda */}
            <motion.div
              className="absolute -inset-[4px] rounded-full pointer-events-none"
              style={{ background: beamBg, filter: "blur(9px)", opacity: 0.4 }}
              aria-hidden="true"
            />

            {/* ── Botão de vidro ─────────────────────────────────────────── */}
            <motion.button
              type="button"
              onClick={onClick}
              className="group relative z-[1] flex items-center gap-2.5 px-7 py-3.5 rounded-full font-display font-medium tracking-tight text-sm text-white/90 cursor-pointer select-none overflow-hidden"
              style={{
                // Fundo navy gradiente — funciona sobre fundo escuro E sobre
                // o header branco flutuante
                background:
                  "linear-gradient(145deg, rgba(30,58,95,0.96) 0%, rgba(20,44,80,0.98) 100%)",
                backdropFilter:       "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                // Glow multicamadas em repouso
                boxShadow:
                  "0 0 20px rgba(37,99,235,0.22), " +
                  "0 0 42px rgba(37,99,235,0.10), " +
                  "inset 0 1px 0 rgba(255,255,255,0.13), " +
                  "inset 0 -1px 0 rgba(0,0,0,0.16)",
                willChange: "transform",
              }}
              whileHover={{
                color: "rgba(255,255,255,1)",
                // Glow mais intenso no hover
                boxShadow:
                  "0 0 28px rgba(37,99,235,0.50), " +
                  "0 0 60px rgba(37,99,235,0.24), " +
                  "inset 0 1px 0 rgba(255,255,255,0.20), " +
                  "inset 0 -1px 0 rgba(0,0,0,0.16)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {/* ── Shimmer diagonal ──────────────────────────────────────── */}
              {/* Uma faixa de luz translúcida que atravessa o botão a cada ~5s */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <motion.div
                  className="absolute top-0 bottom-0"
                  style={{
                    left: "-65%",
                    width: "65%",
                    background:
                      "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)",
                  }}
                  animate={{ x: ["0%", "360%"] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatDelay: 3.8,
                    ease: [0.4, 0, 0.6, 1],
                  }}
                />
              </div>

              {/* ── Highlight de topo (simula superfície curva física) ────── */}
              <div
                className="absolute top-0 left-8 right-8 h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 50%, transparent)",
                }}
                aria-hidden="true"
              />

              {/* ── Texto com brilho no hover (via Tailwind group) ─────────── */}
              <span className="relative z-10 whitespace-nowrap transition-colors duration-300">
                {label}
              </span>

              {/* ── Seta com slide no hover ────────────────────────────────── */}
              <span className="relative z-10 flex-shrink-0 translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export { PremiumCTAButton };
