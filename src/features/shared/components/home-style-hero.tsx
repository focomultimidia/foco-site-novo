"use client";

/**
 * HomeStyleHero — mesma estrutura e linguagem visual da hero da Home
 * (fundo navy com auroras, layout partido texto|mockup, moldura de vidro com
 * tilt 3D, mockup mobile flutuante, badges flutuantes, sublinhado dourado no
 * título, CTA dourado), só que parametrizada para servir qualquer página
 * interna. Cada página continua dona do seu próprio conteúdo (título,
 * subtítulo, badge, CTA, imagem e trust-badges) — este componente só decide
 * COMO isso é apresentado, nunca O QUE é apresentado.
 *
 * Diferente da Home (hand-tuned com offsets fixos pro seu texto exato), aqui
 * tudo em fluxo normal e genérico, então serve qualquer título/subtítulo de
 * qualquer página sem precisar recalibrar nada por página.
 */

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Image as ImageIcon, Smartphone } from "lucide-react";
import { HERO_SCALE_CSS, fluidRem, fluidPx } from "@/features/shared/lib/hero-scale";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Props ─────────────────────────────────────────────────────────────────────

export interface HomeStyleHeroBadge {
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
}

export interface HomeStyleHeroImage {
  src?: string;
  alt: string;
}

export interface HomeStyleHeroProps {
  eyebrow: string;
  /** String simples ganha o sublinhado dourado via `highlightKeyword`; um nó já pronto (ex.: destaque em degradê próprio de uma página) é renderizado como está. */
  title: string | React.ReactNode;
  /** Trecho de `title` que ganha o sublinhado dourado — mesmo tratamento da Home. Busca case-insensitive. Ignorado se `title` não for string. */
  highlightKeyword?: string;
  subtitle: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  desktopImage?: HomeStyleHeroImage;
  mobileImage?: HomeStyleHeroImage;
  /** Proporção (CSS aspect-ratio) do palco/imagem desktop — default "16 / 10". Ajuste para bater com as dimensões reais de `desktopImage`, evitando corte via object-cover. */
  desktopAspectRatio?: string;
  /** Proporção (CSS aspect-ratio) do mockup mobile flutuante — default "9 / 19.5". Ajuste para bater com as dimensões reais de `mobileImage`. */
  mobileAspectRatio?: string;
  /** Até 3 — mesmo tratamento visual dos stat-badges da Home. */
  badges?: HomeStyleHeroBadge[];
  /**
   * Visual customizado pra coluna direita (ex.: um carrossel próprio da
   * página) — substitui inteiramente o palco de vidro com desktopImage/
   * mobileImage/badges quando presente. Mesmo padrão do `children` do
   * GradientHero.
   */
  children?: React.ReactNode;
}

const BADGE_SLOTS = [
  { topPct: -14, side: "left" as const,  offsetRem: 1.25, delay: 0.8, floatDelay: 0   },
  { topPct: 106, side: "right" as const, offsetRem: 0.5,  delay: 1.0, floatDelay: 0.7 },
  { topPct: 46,  side: "left" as const,  offsetRem: 6.5,  delay: 1.2, floatDelay: 1.4 },
];

// ── SlideVisual — imagem real ou placeholder tracejado (mesmo padrão da Home). ──

function SlideVisual({ src, alt, eager, icon, iconClassName, labelClassName }: {
  src?: string;
  alt: string;
  eager?: boolean;
  icon?: ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;
  iconClassName: string;
  labelClassName: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        fetchPriority={eager ? "high" : "low"}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover block"
      />
    );
  }
  const Icon = icon ?? ImageIcon;
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed"
      style={{ borderColor: "rgba(40,89,146,0.2)", background: "rgba(40,89,146,0.04)" }}
    >
      <Icon className={iconClassName} style={{ color: "rgba(40,89,146,0.35)" }} strokeWidth={1.5} />
      <span className={labelClassName} style={{ color: "rgba(40,89,146,0.45)" }}>{alt}</span>
    </div>
  );
}

// ── Título — sublinhado dourado animado sob a palavra-chave (mesma técnica SVG da Home). ──

function buildTitleNodes(title: string, keyword: string | undefined, reducedMotion: boolean) {
  const idx = keyword ? title.toLowerCase().indexOf(keyword.toLowerCase()) : -1;
  if (!keyword || idx === -1) return title;

  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + keyword.length);
  const after = title.slice(idx + keyword.length);

  return (
    <>
      {before}
      <span className="relative inline-block text-white whitespace-nowrap">
        {match}
        <svg
          aria-hidden="true"
          viewBox="0 0 320 14"
          preserveAspectRatio="none"
          className="absolute left-0 -bottom-2 w-full h-[0.85rem] pointer-events-none"
          fill="none"
        >
          <motion.path
            d="M 4 10 C 60 4, 150 3, 230 6 C 270 7.5, 300 9, 316 8"
            stroke="#fccc30"
            strokeWidth={4}
            strokeLinecap="round"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
      </span>
      {after}
    </>
  );
}

// ── HomeStyleHero ─────────────────────────────────────────────────────────────

function HomeStyleHero({
  eyebrow,
  title,
  highlightKeyword,
  subtitle,
  ctaLabel,
  onCtaClick,
  desktopImage,
  mobileImage,
  desktopAspectRatio = "16 / 10",
  mobileAspectRatio = "9 / 19.5",
  badges = [],
  children,
}: HomeStyleHeroProps) {
  const reducedMotion = useReducedMotion();
  const mockupRef = useRef<HTMLDivElement>(null);

  const [isWideLayout, setIsWideLayout] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsWideLayout(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Tilt 3D sutil ao mouse — mesma técnica da Home.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 100, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 100, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [4, -4]);
  const rotateX = useTransform(sy, [-1, 1], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !isWideLayout) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleMouseLeave = () => { px.set(0); py.set(0); };

  const mockupStageStyle: React.CSSProperties = isWideLayout
    ? { position: "relative", width: fluidPx(660), aspectRatio: desktopAspectRatio, height: "auto" }
    : { position: "relative", width: "min(78vw, 440px)", aspectRatio: desktopAspectRatio, height: "auto" };

  // CTA renderizado em UM só lugar por vez: dentro da coluna de texto em
  // desktop (ordem original), depois da imagem/mockup em mobile (pedido
  // explícito — antes o CTA vinha antes da imagem no fluxo, e os badges
  // flutuantes com offset negativo (`-top-14` etc.) podiam invadir visualmente
  // o espaço do botão logo acima). Extraído uma vez pra não duplicar o JSX.
  const ctaButton = ctaLabel ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
    >
      <button
        onClick={onCtaClick}
        className="group inline-flex items-center gap-2 bg-[#fccc30] text-[#132840] font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#fccc30]/30 hover:shadow-[#fccc30]/45 hover:-translate-y-0.5"
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </motion.div>
  ) : null;

  return (
    <section
      data-hero="section"
      className="relative min-h-dvh lg:h-dvh min-h-[600px] overflow-x-hidden lg:overflow-hidden bg-[#10233d] grid grid-rows-[auto_auto] lg:grid-rows-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      style={{ "--hero-scale": HERO_SCALE_CSS } as React.CSSProperties}
    >
      {/* Fundo — aurora azul em deriva lenta, mesmas 3 manchas da Home. */}
      <div aria-hidden="true" className="absolute -inset-[10%] -z-10 overflow-hidden" style={{ filter: "blur(50px)", opacity: 0.85 }}>
        <div
          className="absolute w-[480px] h-[480px] -left-20 -top-16 rounded-full motion-safe:animate-aurora-a"
          style={{ background: "radial-gradient(circle, rgba(66,122,185,0.65), transparent 70%)" }}
        />
        <div
          className="absolute w-[520px] h-[520px] -right-32 -bottom-36 rounded-full motion-safe:animate-aurora-b"
          style={{ background: "radial-gradient(circle, rgba(30,58,95,0.55), transparent 70%)" }}
        />
        <div
          className="absolute w-[380px] h-[380px] right-[10%] -top-20 rounded-full motion-safe:animate-aurora-c"
          style={{ background: "radial-gradient(circle, rgba(40,89,146,0.55), transparent 70%)" }}
        />
      </div>
      {/* Grão sutil — mesmo tratamento da Home. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Coluna esquerda — eyebrow, título, subtítulo (CTA só aqui em
          desktop — ver `ctaButton` abaixo). `pt-24 sm:pt-28` — margem um
          pouco maior entre o menu e a badge/eyebrow em mobile (pedido
          explícito, era pt-20/pt-24). ────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left justify-center gap-4 lg:gap-6 px-4 sm:px-6 lg:pl-16 xl:pl-24 lg:pr-6 pt-24 sm:pt-28 lg:pt-0 pb-8 lg:pb-0 max-w-xl lg:max-w-none mx-auto lg:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="inline-flex items-center gap-2.5 border border-white/15 bg-white/8 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <span className="w-1.5 h-1.5 bg-[#fccc30] rounded-full animate-pulse" />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
          style={isWideLayout ? { fontSize: fluidRem(3.8) } : undefined}
          className="font-display font-bold text-4xl sm:text-5xl text-white leading-[1.08] antialiased"
        >
          {typeof title === "string" ? buildTitleNodes(title, highlightKeyword, !!reducedMotion) : title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.44, ease: EASE }}
          style={isWideLayout ? { fontSize: fluidRem(1.125) } : undefined}
          className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-lg lg:max-w-md"
        >
          {subtitle}
        </motion.p>

        {isWideLayout && ctaButton}
      </div>

      {/* ── Coluna direita — palco do mockup, mesma composição da Home; ou um
          visual customizado da própria página (`children`), quando presente.
          Em mobile virou `flex-col` pra empilhar mockup → badges → CTA, nessa
          ordem — antes o CTA vinha lá na coluna de texto (acima da imagem) e
          os badges eram chips flutuantes sobre o mockup; os dois pedidos
          explícitos ("botão abaixo das imagens", "badges abaixo da imagem
          principal") viram esse empilhamento. Em desktop (`lg:`) volta a ser
          o palco centralizado de sempre, sem essa pilha extra. ──────────── */}
      <div className="relative z-10 min-h-0 min-w-0 lg:h-full flex flex-col items-center justify-center gap-7 lg:gap-0 px-4 lg:px-0 pb-10 lg:pb-0">
        {children ? (
          children
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="min-w-0"
            style={mockupStageStyle}
          >
            <div
              ref={mockupRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-full rounded-[24px] sm:rounded-[32px] p-3 sm:p-4 [perspective:1600px]"
              style={{
                background: "rgba(16,35,61,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: isWideLayout ? `${fluidPx(2)} solid rgba(255,255,255,0.22)` : "2px solid rgba(255,255,255,0.22)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 30px 70px -20px rgba(0,0,0,0.5)",
                ...(isWideLayout ? { borderRadius: fluidPx(32), padding: fluidPx(16) } : {}),
              }}
            >
              <motion.div
                style={{
                  ...(reducedMotion || !isWideLayout ? {} : { rotateX, rotateY }),
                  ...(isWideLayout ? { borderRadius: fluidPx(22) } : {}),
                }}
                className="relative h-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#10233d]/30 ring-1 ring-white/15 [transform-style:preserve-3d]"
              >
                {/* Reflexo diagonal — sugere superfície de vidro sobre a tela. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.22), transparent 40%)" }}
                />
                <div className="relative w-full h-full" style={{ aspectRatio: desktopAspectRatio }}>
                  <SlideVisual
                    src={desktopImage?.src}
                    alt={desktopImage?.alt ?? ""}
                    eager
                    iconClassName="w-7 h-7"
                    labelClassName="text-xs font-medium px-6 text-center"
                  />
                </div>
              </motion.div>

              {/* Só em desktop — no mobile essa silhueta de celular (alta,
                  9:19.5) transbordava pra baixo do palco raso (16:10) e
                  sobrepunha o CTA logo abaixo (pedido explícito pra
                  remover). */}
              {isWideLayout && (
                <HeroMobileMockup
                  isWideLayout={isWideLayout}
                  src={mobileImage?.src}
                  alt={mobileImage?.alt ?? desktopImage?.alt ?? ""}
                  aspectRatio={mobileAspectRatio}
                />
              )}

              {/* Chips flutuantes sobre o mockup — só em desktop, onde há
                  espaço de sobra ao redor do palco. Em mobile eles migram
                  pra baixo da imagem (ver bloco logo após este `motion.div`). */}
              {isWideLayout && badges.slice(0, 3).map((badge, i) => (
                <HeroBadgeChip
                  key={badge.label}
                  icon={badge.icon}
                  label={badge.label}
                  {...BADGE_SLOTS[i]}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Mobile — só o CTA, sempre DEPOIS da imagem/mockup acima. Os
            badges de confiança saíram daqui (pedido explícito): no mobile
            eles apareciam sobre/colados na borda do mockup. ─────────────── */}
        {!isWideLayout && ctaButton && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
            className="flex flex-col items-center gap-5 w-full"
          >
            {ctaButton}
          </motion.div>
        )}
      </div>
    </section>
  );
}


// ── HeroBadgeChip — mesmas 3 camadas de responsabilidade da Home (posição via
//    motion.div externo, flutuação idle via CSS puro, tamanho fluido via
//    --hero-scale). Pill de uma linha (ícone + label) — não o formato de
//    duas linhas com número, que é conteúdo específico da Home. ─────────────

function HeroBadgeChip({
  icon: Icon, label, topPct, side, offsetRem, delay, floatDelay,
}: HomeStyleHeroBadge & {
  topPct: number;
  side: "left" | "right";
  offsetRem: number;
  delay: number;
  floatDelay: number;
}) {
  const positionStyle = {
    top: `${topPct}%`,
    [side]: `calc(-${offsetRem}rem * var(--hero-scale))`,
  } as React.CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="absolute z-20"
      style={positionStyle}
    >
      <div className="motion-safe:animate-badge-float" style={{ animationDelay: `${floatDelay}s` }}>
        <div
          className="flex items-center bg-[#10233d]/55 backdrop-blur-md border border-white/15 rounded-2xl shadow-[0_16px_32px_-16px_rgba(0,0,0,0.5)]"
          style={{
            gap: fluidRem(0.6),
            paddingLeft: fluidRem(0.6),
            paddingRight: fluidRem(1),
            paddingTop: fluidRem(0.55),
            paddingBottom: fluidRem(0.55),
          }}
        >
          <div
            className="rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              width: fluidRem(2),
              height: fluidRem(2),
              background: "linear-gradient(135deg,#285992,#427ab9)",
            }}
          >
            <Icon className="text-white" style={{ width: fluidRem(1), height: fluidRem(1) } as React.CSSProperties} />
          </div>
          <span style={{ fontSize: fluidRem(0.85) }} className="text-white font-semibold whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── HeroMobileMockup — mesma silhueta e vidro fosco da Home. ─────────────────

function HeroMobileMockup({ isWideLayout, src, alt, aspectRatio }: { isWideLayout: boolean; src?: string; alt: string; aspectRatio: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
      className="absolute -top-6 -right-2 sm:-top-8 sm:-right-4 lg:-top-10 lg:-right-6 z-20 w-[160px] sm:w-[175px] lg:w-[220px]"
      style={{
        filter: "drop-shadow(0 22px 34px rgba(0,0,0,0.45))",
        ...(isWideLayout ? { width: fluidPx(220), top: fluidPx(-40), right: fluidPx(-24) } : {}),
      }}
    >
      <div
        className="rounded-[30px] p-2"
        style={{
          background: "rgba(16,35,61,0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "2px solid rgba(255,255,255,0.22)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
          ...(isWideLayout ? { borderRadius: fluidPx(30), padding: fluidPx(8) } : {}),
        }}
      >
        <div
          className="relative overflow-hidden rounded-[22px] bg-[#10233d]/30 ring-1 ring-white/15"
          style={{ aspectRatio, ...(isWideLayout ? { borderRadius: fluidPx(22) } : {}) }}
        >
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-[7px] rounded-full bg-slate-900/70 z-10"
            style={isWideLayout ? { top: fluidPx(12), width: fluidPx(32), height: fluidPx(7) } : undefined}
          />
          <SlideVisual
            src={src}
            alt={alt}
            icon={Smartphone}
            iconClassName="w-6 h-6"
            labelClassName="text-[10px] font-medium text-center px-2"
          />
        </div>
      </div>
    </motion.div>
  );
}

export { HomeStyleHero };
