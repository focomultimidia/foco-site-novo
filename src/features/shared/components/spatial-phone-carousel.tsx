"use client";

/**
 * SpatialPhoneCarousel — os 3 celulares clicáveis (central grande + 2
 * laterais menores/desfocados atrás), extraído da hero de
 * /experiencia-do-hospede pra ser reaproveitado tal e qual em outras heras
 * (ex.: /otheo-ai). Cada celular pode ter seu próprio mini-slideshow
 * (`slides`) ou uma única imagem estática (array de 1 item) — a mecânica
 * espacial (posições, mola, clique-pra-centralizar) é idêntica nos dois
 * casos.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SpatialPhoneItem {
  id: number;
  slides: readonly { src: string; alt: string }[];
  /** Intervalo do slideshow (ms) — irrelevante quando `slides` tem 1 item só. */
  interval: number;
  startSlide: number;
}

// ── Layout geometry ───────────────────────────────────────────────────────────
/*
  Container: 620 × 520 px
  Phone natural CSS width: 220 px  →  height ≈ 477 px  (aspect 9/19.5)
  Side phones use scale: 0.85 → apparent size ≈ 187 × 405 px

  Absolute positions (top-left of each motion.div, scale applied from element center):
    center: x=200, y=22  → element center at (310, 260.5) ← exact container center
    left:   x=5,   y=22  → element center at (115, 260.5), slight 8 px overlap with center
    right:  x=395, y=22  → element center at (505, 260.5), slight 8 px overlap with center
*/
const PHONE_W = 220;
const PHONE_H = Math.round(PHONE_W * 19.5 / 9); // 477

const ROLE_CFG = {
  center: {
    x: Math.round((620 - PHONE_W) / 2), // 200
    y: Math.round((520 - PHONE_H) / 2), // 22
    scale:   1,
    opacity: 1,
    filter:  "blur(0px)",
    zIndex:  30,
    cursor:  "default" as const,
  },
  left: {
    x: 5,
    y: Math.round((520 - PHONE_H) / 2),
    scale:   0.85,
    opacity: 0.6,
    filter:  "blur(2px)",
    zIndex:  10,
    cursor:  "pointer" as const,
  },
  right: {
    x: 620 - PHONE_W - 5, // 395
    y: Math.round((520 - PHONE_H) / 2),
    scale:   0.85,
    opacity: 0.6,
    filter:  "blur(2px)",
    zIndex:  10,
    cursor:  "pointer" as const,
  },
} as const;

type Role = keyof typeof ROLE_CFG;

// ── Phone Mockup ──────────────────────────────────────────────────────────────
// Self-contained: manages its own slide state and timer independently.
function PhoneMockup({
  slides,
  interval,
  startSlide,
  priority = false,
}: {
  slides: readonly { src: string; alt: string }[];
  interval: number;
  startSlide: number;
  priority?: boolean;
}) {
  const [slideIdx, setSlideIdx] = useState(startSlide % slides.length);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setSlideIdx(prev => (prev + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [interval, slides.length]);

  const slide = slides[slideIdx];

  return (
    <div
      className="bg-[#fbfbfb] rounded-[26px] p-[4px] w-full"
      style={{ boxShadow: "0 24px 56px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.07)" }}
    >
      <div
        className="relative bg-white rounded-[22px] overflow-hidden"
        style={{ aspectRatio: "9/19.5" }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-12 h-[12px] bg-[#1c1c1e] rounded-full" />

        {/* Screen — fade between slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={slideIdx}
            src={slide.src}
            alt={slide.alt}
            fetchPriority={priority && slideIdx === startSlide ? "high" : undefined}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-[4px] bg-black/20 rounded-full z-10" />
      </div>
    </div>
  );
}

// ── PhoneStage — os 3 celulares, mecânica intocada. ──────────────────────────
function PhoneStage({ produtos, initialCenter }: { produtos: readonly SpatialPhoneItem[]; initialCenter: number }) {
  // centerPhone tracks which phone (id) is currently in the center position.
  const [centerPhone, setCenterPhone] = useState(initialCenter);
  const total = produtos.length;

  // Map phone ID → spatial role based on the current center.
  const getRole = (id: number): Role => {
    if (id === centerPhone) return "center";
    if (id === (centerPhone - 1 + total) % total) return "left";
    return "right";
  };

  return (
    // Fixed container — phones are absolutely positioned inside.
    // All three motion.divs start at top:0 left:0 and are moved into
    // position via Framer Motion's x/y/scale/opacity/filter animations.
    <div className="relative" style={{ width: 620, height: 520 }}>
      {produtos.map(phone => {
        const role   = getRole(phone.id);
        const cfg    = ROLE_CFG[role];
        const isCenter = role === "center";

        return (
          <motion.div
            key={phone.id}
            /*
              initial matches animate on first render → no entrance animation
              for the phones themselves (parent already fades in the whole group).
            */
            initial={{
              x: cfg.x, y: cfg.y, scale: cfg.scale,
              opacity: cfg.opacity, filter: cfg.filter,
            }}
            animate={{
              x: cfg.x, y: cfg.y, scale: cfg.scale,
              opacity: cfg.opacity, filter: cfg.filter,
            }}
            transition={{
              // Spring for position/scale — snappy but smooth
              type:      "spring",
              stiffness: 260,
              damping:   28,
              // Faster linear fade for opacity + filter
              opacity: { type: "tween", duration: 0.28 },
              filter:  { type: "tween", duration: 0.32 },
            }}
            onClick={() => !isCenter && setCenterPhone(phone.id)}
            style={{
              position:        "absolute",
              width:           PHONE_W,
              top:             0,
              left:            0,
              zIndex:          cfg.zIndex, // immediate — keeps new center on top
              cursor:          cfg.cursor,
              transformOrigin: "center center",
            }}
          >
            {/*
              Inner motion.div handles the vertical float for the center phone.
              It resets to y:0 when the phone moves to a side position.
            */}
            <motion.div
              animate={isCenter ? { y: [0, -10, 0] } : { y: 0 }}
              transition={
                isCenter
                  ? { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                  : { type: "tween", duration: 0.4 }
              }
            >
              <PhoneMockup
                slides={phone.slides}
                interval={phone.interval}
                startSlide={phone.startSlide}
                priority={phone.id === centerPhone}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── useMobileStageScale — o palco dos 3 celulares é uma caixa de pixel FIXO
// (620×520, ver PhoneStage) — no mobile precisa encolher pra caber na
// largura disponível (`px-4` da HomeStyleHero: viewport - 32px). `--hero-
// scale` do resto do site não serve aqui: aquela curva é ancorada entre
// 1366–1920px (só desktop), nunca chega perto do que uma tela de 375px
// precisa. `Math.min(1, ...)`: em telas largas o palco já cabe inteiro, sem
// encolher. ───────────────────────────────────────────────────────────────
function useMobileStageScale() {
  const [scale, setScale] = useState(() =>
    typeof window === "undefined" ? 1 : Math.min(1, (window.innerWidth - 32) / 620),
  );
  useEffect(() => {
    function update() {
      setScale(Math.min(1, (window.innerWidth - 32) / 620));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

// ── SpatialPhoneCarousel — os mesmos celulares em todas as larguras (nada de
// versão simplificada no mobile). Em `lg+` o palco aparece no tamanho
// natural; abaixo disso, o MESMO `PhoneStage` é encolhido via `transform:
// scale()` — o wrapper externo já nasce com o tamanho FINAL (620/520 ×
// escala) pra o resto do layout reservar o espaço certo, enquanto o miolo
// interno mantém 620×520 reais (a lógica espacial de posição/mola não muda
// em nada, só o resultado final fica menor). ──────────────────────────────
function SpatialPhoneCarousel({
  produtos,
  initialCenter = 1,
}: {
  produtos: readonly SpatialPhoneItem[];
  /** Id do celular que começa centralizado — default 1 (o do meio, num trio). */
  initialCenter?: number;
}) {
  const scale = useMobileStageScale();

  return (
    <>
      <div className="hidden lg:flex items-center justify-center mt-16 xl:mt-20">
        <PhoneStage produtos={produtos} initialCenter={initialCenter} />
      </div>

      <div
        className="relative lg:hidden"
        style={{ width: 620 * scale, height: 520 * scale }}
      >
        <div
          className="absolute top-0 left-0"
          style={{ width: 620, height: 520, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <PhoneStage produtos={produtos} initialCenter={initialCenter} />
        </div>
      </div>
    </>
  );
}

export { SpatialPhoneCarousel };
