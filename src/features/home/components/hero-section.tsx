"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Calendar,
  Image as ImageIcon,
  Smartphone,
} from "lucide-react";
import type { HeroData } from "../types";
import { HERO_SCALE_CSS, fluidRem, fluidPx } from "@/features/shared/lib/hero-scale";

// ── Entry easing ──────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Hero stats — flutuam sobre as laterais do mockup desktop. `topPct` fica
//    dentro do topo ~46% do frame — a base do mockup é cortada de propósito
//    (ver mockupStageStyle), então nada pode chegar perto da borda inferior
//    ou cai na zona invisível. `offsetRem` é o quanto o badge poka pra fora
//    da borda do mockup — multiplicado por `--hero-scale` no próprio
//    HeroStatBadge, então continua proporcional ao tamanho real do mockup em
//    qualquer largura (era um `-left-9`/`-right-10` fixo antes, por isso
//    invadia o conteúdo do mockup quando ele encolhia em telas menores). ───

const STATS = [
  { key: "clientes",   icon: Users,        value: "+18", label: "Anos de experiência",       delay: 0.8, topPct: -14,  side: "left"  as const, offsetRem: 1.25, floatDelay: 0    },
  { key: "transacoes", icon: TrendingUp,   value: "+1B",    label: "Transações/ano",         delay: 1.0, topPct: 106, side: "right" as const, offsetRem: 0.5,  floatDelay: 0.7  },
  { key: "anos",       icon: Calendar,     value: "+2.500",    label: "Clientes ativos",    delay: 1.2, topPct: 46, side: "left"  as const, offsetRem: 9, floatDelay: 1.4  },
] as const;

// ── Imagem única do mockup — desktop e celular, sem troca/transição (pedido
//    explícito: um print fixo em cada tela, nada de carrossel ou scrollytelling). ──

interface SlideDef {
  src?: string;
  alt: string;
  objectPosition?: string;
}

const DESKTOP_SLIDE: SlideDef = {
  src: "/assets/imgs/home/dashboard.png",
  alt: "Ecossistema Foco Tecnologia conectando sistemas de gestão hoteleira em uma única plataforma",
};

const MOBILE_SLIDE: SlideDef = {
  src: "/assets/imgs/experiencia-do-hospede/app-hospede.webp",
  alt: "Check-in digital do hóspede",
};

// ── SlideVisual — imagem real ou placeholder tracejado, usado pelos mockups
//    desktop e mobile. ────────────────────────────────────────────────────

function SlideVisual({ src, alt, eager, icon, iconClassName, labelClassName, objectPosition }: {
  src?: string;
  alt: string;
  eager?: boolean;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;
  iconClassName: string;
  labelClassName: string;
  objectPosition?: string;
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
        style={objectPosition ? { objectPosition } : undefined}
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

// ── HeroSection ───────────────────────────────────────────────────────────────

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data: _data, onCtaClick }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  // ── Layout esquerda/direita (texto+badges+cta | mockups) só a partir de lg. ──
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

  // Tilt 3D sutil ao mouse — mesma técnica já usada no ProductShowcase.
  // Só em desktop (mousemove não faz sentido em touch) e sem reduced-motion.
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

  // Dimensionado pela LARGURA, não pela altura — fixar altura e deixar a
  // largura "seguir" via aspect-ratio não trava contra o espaço da coluna
  // (bug real já visto: vazava por cima do texto). `fluidPx(660)` — mesma
  // variável `--hero-scale` do H1 e do subtítulo — substitui o antigo
  // `min(46vw, 660px)`: aquele teto de 660px batia em ~1435px de largura,
  // um ponto DIFERENTE de onde o H1 travava (1280px), e essa diferença é
  // que causava a desarmonia entre 1366 e 1920 vista nos prints.
  //
  // Sempre `position: relative` — nada de ancorar no `bottom` da seção pra
  // cortar a base do mockup (pedido explícito: mockup inteiro, sem corte).
  // Fica em fluxo normal dentro do palco (`flex items-center justify-center`
  // no wrapper), centralizado horizontal e verticalmente na coluna da
  // direita — mesmo tratamento simples que a coluna de texto já tem.
  const mockupStageStyle: React.CSSProperties = isWideLayout
    ? {
        position: "relative",
        width: fluidPx(660),
        aspectRatio: "16 / 10",
        height: "auto",
      }
    : {
        position: "relative",
        width: "min(78vw, 440px)",
        aspectRatio: "16 / 10",
        height: "auto",
      };

  // CTA extraído — renderizado em UM só lugar por vez: dentro da coluna de
  // texto em desktop (ordem original), depois do mockup em mobile (pedido
  // explícito — a imagem ficava por cima do botão, e os badges flutuantes
  // com offset negativo podiam invadir visualmente o espaço logo acima).
  const ctaButton = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
    >
      <button
        onClick={onCtaClick}
        className="group inline-flex items-center gap-2 bg-[#fccc30] text-[#132840] font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#fccc30]/30 hover:shadow-[#fccc30]/45 hover:-translate-y-0.5"
      >
        Demonstração grátis
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      data-hero="section"
      className="relative min-h-dvh lg:h-dvh min-h-[600px] overflow-x-hidden lg:overflow-hidden bg-[#10233d] grid grid-rows-[auto_auto] lg:grid-rows-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      style={{ "--hero-scale": HERO_SCALE_CSS } as React.CSSProperties}
    >
      {/* Fundo — aurora azul em deriva lenta (operação 24h, nunca "desligada"),
          3 manchas com raio/direção próprios pra combinação nunca se repetir
          exatamente. `motion-safe:` respeita prefers-reduced-motion sozinho
          (sem precisar do `reducedMotion` do Framer aqui — são só CSS
          keyframes, ver tailwind.config.js). */}
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
      {/* Grão sutil — quebra a chapadura do gradiente, não repaint-a
          (elemento fixo, não rola). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Coluna esquerda — eyebrow, título e subtítulo (CTA só aqui em
          desktop — ver `ctaButton` acima). Centralizado em telas estreitas
          (empilha acima do mockup); alinhado à esquerda e centralizado
          verticalmente a partir de lg (vira a coluna da esquerda de um
          layout partido). `pt-24 sm:pt-28` — margem um pouco maior entre o
          menu e a badge/eyebrow em mobile (pedido explícito, era pt-20/24). ── */}
      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left justify-center gap-4 lg:gap-6 px-4 sm:px-6 lg:pl-16 xl:pl-24 lg:pr-6 pt-24 sm:pt-28 lg:pt-0 pb-8 lg:pb-0 max-w-xl lg:max-w-none mx-auto lg:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="inline-flex items-center gap-2.5 border border-white/15 bg-white/8 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <span className="w-1.5 h-1.5 bg-[#fccc30] rounded-full animate-pulse" />
          Ecossistema completo para hotelaria
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
          style={isWideLayout ? { fontSize: fluidRem(3.8) } : undefined}
          className="font-display font-bold text-4xl sm:text-5xl text-white leading-[1.18] antialiased"
        >
          Tecnologia hoteleira integrada em uma{" "}
          <span className="relative inline-block text-white whitespace-nowrap">
            única plataforma.
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
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.44, ease: EASE }}
          style={isWideLayout ? { fontSize: fluidRem(1.125) } : undefined}
          className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-lg lg:max-w-md"
        >
          Para hotéis e pousadas que querem vender mais, gastar menos e ter
          controle total da operação.
        </motion.p>

        {isWideLayout && ctaButton}
      </div>

      {/* ── Coluna direita — palco dos mockups. Sempre em fluxo normal,
          centralizado pelo `flex items-center justify-center` do wrapper —
          em qualquer largura, o mockup inteiro (sem corte) fica centralizado
          na coluna, tanto na horizontal quanto na vertical. `lg:h-full` dá
          altura de sobra pro `justify-center` centralizar verticalmente
          contra a seção inteira. `min-w-0` é defensivo: evita que o item
          estoure a coluna. Em mobile virou `flex-col` pra empilhar
          mockup → badges → CTA (pedido explícito: botão e badges saíram de
          cima/sobre a imagem e foram pra baixo dela). ────────────────────── */}
      <div className="relative z-10 min-h-0 min-w-0 lg:h-full flex flex-col items-center justify-center gap-7 lg:gap-0 px-4 lg:px-0 pb-10 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="min-w-0"
          style={mockupStageStyle}
        >
          <div
            ref={mockupRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // Classes Tailwind fixas (`rounded-[24px] sm:rounded-[32px]
            // p-3 sm:p-4`) continuam como fallback pra mobile/tablet — só
            // sobrescritas por `style` a partir de `isWideLayout`, onde viram
            // fluidas via `fluidPx(N)` (mesma `--hero-scale` do H1/mockup/
            // badges). `style` sempre vence `className` na cascata, então em
            // desktop essas classes nunca chegam a se aplicar de fato.
            // Cantos e borda completos nos 4 lados (mockup inteiro, sem
            // corte na base). Vidro fosco escuro — mesmo tratamento visual
            // dos badges (fundo translúcido + blur + borda clara fina) — com
            // borda e respiro (bezel) bem maiores que antes, pedido explícito.
            className="relative h-full rounded-[24px] sm:rounded-[32px] p-3 sm:p-4 [perspective:1600px]"
            style={{
              background: "rgba(16,35,61,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: isWideLayout ? `${fluidPx(2)} solid rgba(255,255,255,0.22)` : "2px solid rgba(255,255,255,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 30px 70px -20px rgba(0,0,0,0.5)",
              ...(isWideLayout ? {
                borderRadius: fluidPx(32),
                padding: fluidPx(16),
              } : {}),
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
              <div className="relative w-full h-full" style={{ aspectRatio: "16 / 10" }}>
                <SlideVisual
                  src={DESKTOP_SLIDE.src}
                  alt={DESKTOP_SLIDE.alt}
                  eager
                  objectPosition={DESKTOP_SLIDE.objectPosition}
                  iconClassName="w-7 h-7"
                  labelClassName="text-xs font-medium px-6 text-center"
                />
              </div>

            </motion.div>

            <HeroMobileMockup isWideLayout={isWideLayout} />

            {/* Badges flutuantes sobre o mockup — só em desktop, onde há
                espaço de sobra ao redor do palco. Em mobile migram pra baixo
                da imagem (ver bloco logo após este `motion.div`). */}
            {isWideLayout && STATS.map(({ key, icon, value, label, delay, topPct, side, offsetRem, floatDelay }) => (
              <HeroStatBadge
                key={key}
                icon={icon}
                value={value}
                label={label}
                delay={delay}
                topPct={topPct}
                side={side}
                offsetRem={offsetRem}
                floatDelay={floatDelay}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Mobile — badges em linha (não mais flutuando sobre a imagem) e
            CTA, nessa ordem, sempre DEPOIS do mockup acima. ─────────────── */}
        {!isWideLayout && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
            className="flex flex-col items-center gap-5 w-full"
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {STATS.map(({ key, icon, value, label }) => (
                <MobileHeroStatBadge key={key} icon={icon} value={value} label={label} />
              ))}
            </div>
            {ctaButton}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── HeroStatBadge ─────────────────────────────────────────────────────────────
// Três camadas de responsabilidade, cada uma dona só de uma coisa:
//   1. motion.div (externo) — posição (top/left/right) + entrada (Framer).
//   2. div com `animate-badge-float` (interno) — flutuação idle contínua,
//      via CSS puro (não Framer — Framer e uma animação CSS não devem
//      disputar `transform` no mesmo nó), defasada por badge via
//      `animationDelay`. `motion-safe:` já respeita prefers-reduced-motion
//      sozinho, sem precisar do `reducedMotion` do Framer aqui.
//   3. Todo tamanho (padding, ícone, fonte) e o deslocamento lateral
//      (`side`/`offsetRem`) multiplicam `var(--hero-scale)` — a mesma
//      variável do H1/subtítulo/mockup — em vez de saltar em `sm:`/`lg:`.
//      Antes disso, o deslocamento fixo (`-left-9`, ~36px sempre) invadia o
//      conteúdo do mockup quando ele encolhia numa tela menor; agora encolhe
//      na mesma proporção.

function HeroStatBadge({
  icon: Icon, value, label, delay, topPct, side, offsetRem, floatDelay,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: string;
  label: string;
  delay: number;
  topPct: number;
  side: "left" | "right";
  offsetRem: number;
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
            paddingLeft: fluidRem(0.5),
            paddingRight: fluidRem(0.9),
            paddingTop: fluidRem(0.5),
            paddingBottom: fluidRem(0.5),
          }}
        >
          <div
            className="rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              width: fluidRem(2.25),
              height: fluidRem(2.25),
              background: "linear-gradient(135deg,#285992,#427ab9)",
            }}
          >
            <Icon style={{ width: fluidRem(1), height: fluidRem(1) }} className="text-white" />
          </div>
          <div className="text-left whitespace-nowrap">
            <div style={{ fontSize: fluidRem(1) }} className="text-white font-bold leading-none">{value}</div>
            <div style={{ fontSize: fluidRem(0.75), marginTop: fluidRem(0.125) }} className="text-white/55">{label}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── MobileHeroStatBadge — mesma pill de duas linhas (valor + label) do
//    HeroStatBadge, mas em fluxo normal (sem `position:absolute`, sem
//    flutuação idle) — usada só abaixo do mockup em mobile, onde os stats
//    não flutuam mais sobre a imagem. Tamanho fixo, não fluido via
//    `--hero-scale`: em mobile a largura da viewport não varia o bastante
//    pra justificar o cálculo. ──────────────────────────────────────────────

function MobileHeroStatBadge({
  icon: Icon, value, label,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl pl-2 pr-3.5 py-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}
      >
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="text-left whitespace-nowrap">
        <div className="text-white font-bold text-sm leading-none">{value}</div>
        <div className="text-white/55 text-[11px] mt-0.5">{label}</div>
      </div>
    </div>
  );
}

// ── HeroMobileMockup ──────────────────────────────────────────────────────────
// Silhueta de celular reta (sem inclinação) apoiada no canto superior direito
// do mockup desktop, com uma única imagem fixa (sem troca/transição).
// Deslocamento reduzido de propósito (era -top-20/-right-14) — grudava no
// botão do header e ficava colado na borda direita da viewport.
//
// Toda a "carcaça" (largura, deslocamento, cantos arredondados, notch) usa
// classes Tailwind fixas como fallback pra mobile/tablet, sobrescritas por
// `style` via `fluidPx(N)` quando `isWideLayout` — mesmo padrão do mockup
// desktop logo acima. Sem isso, o celular ficava com raio de canto e notch
// no mesmo tamanho em px absoluto em QUALQUER largura de tela ≥1024px (não
// tinha nem breakpoint pra essas duas propriedades), então desproporcionava
// conforme o resto do hero (texto, mockup desktop, badges) crescia fluido.
function HeroMobileMockup({ isWideLayout }: { isWideLayout: boolean }) {
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
      {/* Mesmo vidro fosco escuro do mockup desktop e dos badges, bezel
          maior que antes (era p-1/fluidPx(4)) — pedido explícito. */}
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
          style={{
            aspectRatio: "9 / 19.5",
            ...(isWideLayout ? { borderRadius: fluidPx(22) } : {}),
          }}
        >
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-[7px] rounded-full bg-slate-900/70 z-10"
            style={isWideLayout ? { top: fluidPx(12), width: fluidPx(32), height: fluidPx(7) } : undefined}
          />

          <SlideVisual
            src={MOBILE_SLIDE.src}
            alt={MOBILE_SLIDE.alt}
            icon={Smartphone}
            iconClassName="w-6 h-6"
            labelClassName="text-[10px] font-medium text-center px-2"
          />
        </div>
      </div>
    </motion.div>
  );
}

export { HeroSection };
