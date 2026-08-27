"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { HomeStyleHero } from "@/features/shared/components/home-style-hero";
import { InstagramAdMockup, GoogleSearchAdMockup, GoogleHotelAdsMockup } from "./ad-mockups";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Larguras reais dos 3 cards (ver ad-mockups.tsx: w-[320px]/w-[300px]) — usadas
// pra calcular o deslocamento horizontal que deixa a sobreposição em
// exatamente 10% da largura do próprio card lateral, não um valor de olho.
const W_GOOGLE_ADS = 320;
const W_META_ADS = 300;
const W_HOTEL_ADS = 300;
const OVERLAP = 0.10;

// x = distância do centro até o centro do card lateral, tal que a borda dele
// invada só 10% da própria largura por baixo do Meta Ads (centro, x:0).
const X_GOOGLE_ADS = -(W_GOOGLE_ADS / 2 + W_META_ADS / 2 - OVERLAP * W_GOOGLE_ADS);
const X_HOTEL_ADS = W_HOTEL_ADS / 2 + W_META_ADS / 2 - OVERLAP * W_HOTEL_ADS;

// Deslocamento vertical — Google Ads mais acima, Google Hotel Ads mais
// abaixo, Meta Ads como referência central. Nenhum dos 3 é inclinado
// (rotate 0 em todos, diferente da versão anterior).
const Y_GOOGLE_ADS = -70;
const Y_HOTEL_ADS = 70;

const ROLES = [
  { Comp: GoogleSearchAdMockup, x: X_GOOGLE_ADS, y: Y_GOOGLE_ADS, z: 20, w: W_GOOGLE_ADS },
  { Comp: InstagramAdMockup, x: 0, y: 0, z: 10, w: W_META_ADS },
  { Comp: GoogleHotelAdsMockup, x: X_HOTEL_ADS, y: Y_HOTEL_ADS, z: 20, w: W_HOTEL_ADS },
] as const;

// Caixa de referência (tamanho natural, sem escala) — largura da ponta
// esquerda à ponta direita do leque, altura pela carta mais alta (Meta Ads,
// centralizada, domina a extensão vertical mesmo com os outros dois
// deslocados ±70px).
const STAGE_LEFT = X_GOOGLE_ADS - W_GOOGLE_ADS / 2;
const STAGE_RIGHT = X_HOTEL_ADS + W_HOTEL_ADS / 2;
const STAGE_W = STAGE_RIGHT - STAGE_LEFT;
const STAGE_H = 560;

// ── AdStage — os 3 anúncios lado a lado, com tilt de mouse no conjunto ───────
function AdStage() {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 100, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 100, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [6, -6]);
  const rotateX = useTransform(sy, [-1, 1], [-4, 4]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative [perspective:1600px]"
      style={{ width: STAGE_W, height: STAGE_H }}
    >
      <motion.div style={reduceMotion ? undefined : { rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
        {ROLES.map((role, i) => {
          const Comp = role.Comp;
          const left = role.x - STAGE_LEFT - role.w / 2;
          return (
            <motion.div
              key={i}
              className="absolute top-1/2"
              style={{ left, zIndex: role.z }}
              initial={{ opacity: 0, y: role.y + 30 }}
              animate={{ opacity: 1, y: role.y }}
              transition={{ duration: 0.9, delay: 0.55 + i * 0.12, ease: EASE }}
            >
              <div style={{ transform: "translateY(-50%)" }}>
                <Comp />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ── useFitScale ───────────────────────────────────────────────────────────────
// Mede a largura REAL disponível no wrapper (não window.innerWidth — a
// coluna direita da hero é mais estreita que a viewport) via ResizeObserver,
// mesma técnica de orbit-diagram.tsx, e encolhe o palco só o necessário pra
// caber, sem nunca ampliar além do tamanho natural (`Math.min(1, ...)`).
function useFitScale() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sync = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(Math.min(1, w / STAGE_W));
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { wrapRef, scale };
}

// ── AdMockupStage — wrapper responsivo, reservando o tamanho final ──────────
// `lg:max-w-[92%]` — sem isso, o useFitScale mede a largura CHEIA da coluna
// (que tem lg:px-0 na HomeStyleHero) e encolhe o leque até preenchê-la de
// ponta a ponta, colando o mockup direito na borda da tela. Mesma folga que
// a hero padrão (software-pagamentos etc.) já tem "de graça" por causa do
// palco de largura fixa (fluidPx) menor que a coluna — aqui o palco é
// variável (3 cards em leque), então a margem precisa ser reservada à mão.
function AdMockupStage() {
  const { wrapRef, scale } = useFitScale();

  return (
    <div ref={wrapRef} className="relative w-full lg:max-w-[92%] xl:max-w-[88%]" style={{ height: STAGE_H * scale }}>
      <div
        className="absolute top-0 left-1/2"
        style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
      >
        <AdStage />
      </div>
    </div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────
interface HeroSectionProps {
  onCtaClick?: () => void;
}

function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <HomeStyleHero
      eyebrow="Marketing Hoteleiro"
      title="Marketing para hotéis: menos comissões, mais reservas diretas."
      highlightKeyword="OTA"
      subtitle="Gerimos Meta Ads, Google Ads e Google Hotel Ads com uma métrica só de verdade: reserva direta no seu site, não curtida. Metodologia própria pra hotelaria, do primeiro clique ao check-in."
      ctaLabel="Quero reduzir minha dependência de OTA"
      onCtaClick={onCtaClick}
    >
      <AdMockupStage />
    </HomeStyleHero>
  );
}

export { HeroSection };
