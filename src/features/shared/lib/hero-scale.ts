// ── Escala fluida do Hero ("--hero-scale") ───────────────────────────────────
// Fonte única de verdade pra escala fluida das heros no estilo Home — usada
// tanto pela versão CSS (multiplicada em font-size/largura/padding via
// `calc(...*var(--hero-scale))`) quanto por qualquer versão numérica em JS
// que precise da mesma curva (ex.: um tween). Compartilhada entre a hero da
// Home e a `HomeStyleHero` (heros internas com o mesmo visual) — as duas
// precisam vir da MESMA fórmula, senão a escala descola entre elas.

export const HERO_SCALE_MIN_VW = 1366; // âncora: menor notebook testado
export const HERO_SCALE_MAX_VW = 1920; // âncora: monitor widescreen testado
export const HERO_SCALE_MIN = 0.81;    // multiplicador no piso (1366px)
// no teto (1920px) o multiplicador é sempre 1 — os tamanhos-base já SÃO o
// valor de referência em 1920px.

export const HERO_SCALE_CSS =
  `clamp(${HERO_SCALE_MIN}, ${HERO_SCALE_MIN} + ${(1 - HERO_SCALE_MIN).toFixed(2)} * ` +
  `((100vw - ${HERO_SCALE_MIN_VW}px) / (${HERO_SCALE_MAX_VW}px - ${HERO_SCALE_MIN_VW}px)), 1)`;

/** Mesma curva do `HERO_SCALE_CSS`, como número — pra uso em tweens do GSAP. */
export function computeHeroScale(viewportWidth: number): number {
  const t = Math.min(
    Math.max((viewportWidth - HERO_SCALE_MIN_VW) / (HERO_SCALE_MAX_VW - HERO_SCALE_MIN_VW), 0),
    1,
  );
  return HERO_SCALE_MIN + (1 - HERO_SCALE_MIN) * t;
}

export const fluidRem = (base: number) => `calc(${base}rem * var(--hero-scale))`;
export const fluidPx  = (base: number) => `calc(${base}px * var(--hero-scale))`;
