"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
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
import { useHeroScrollytelling } from "../hooks/use-hero-scrollytelling";
import { HERO_SCALE_CSS, computeHeroScale, fluidRem, fluidPx } from "../lib/hero-scale";

// ── Entry easing ──────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Hero stats — flutuam sobre as laterais do mockup desktop. `topPct` fica
//    dentro do topo ~46% do frame — a base do mockup é cortada de propósito
//    (ver mockupStageStyle), então nada pode chegar perto da borda inferior
//    ou cai na zona invisível. `offsetRem` é o quanto o badge poka pra fora
//    da borda do mockup — multiplicado por `--hero-scale` no próprio
//    HeroStatBadge, então continua proporcional ao tamanho real do mockup em
//    qualquer largura (era um `-left-9`/`-right-10` fixo antes, por isso
//    invadia o conteúdo do mockup quando ele encolhia em telas menores).
//    `key` identifica o badge pro GSAP (ver data-badge em HeroStatBadge). ───

const STATS = [
  { key: "clientes",   icon: Users,        value: "+2.500", label: "Clientes ativos",       delay: 0.9, topPct: 6,  side: "left"  as const, offsetRem: 2.25 },
  { key: "transacoes", icon: TrendingUp,   value: "+1B",    label: "Transações/ano",         delay: 1.0, topPct: 26, side: "right" as const, offsetRem: 2.5  },
  { key: "anos",       icon: Calendar,     value: "+18",    label: "Anos de experiência",    delay: 1.1, topPct: 46, side: "left"  as const, offsetRem: 2.25 },
] as const;

// ── Slides do mockup — desktop e celular, 3 etapas cada, narrativamente
//    pareados (ex.: a etapa 0 mostra o ecossistema no desktop e o check-in
//    digital no celular — a mesma "história" em duas telas). As etapas 2 e 3
//    do desktop usam ilustrações de produto que já existiam no repo (as
//    mesmas do site em /produtos), escolhidas só pra preencher o espaço até
//    as telas reais serem fotografadas — não são screenshots reais do
//    produto, por isso optei por essas peças abstratas/wireframe (mesmo
//    estilo, cores da marca) em vez de recortar um screenshot de OUTRA
//    função do sistema e rotular errado. `objectPosition` desloca o corte
//    do `object-cover` pra longe de elementos (ex.: o celular sobreposto em
//    motor-de-reservas.webp) que ficariam cortados de forma estranha no
//    box quase quadrado do mockup. ──────────────────────────────────────

interface SlideDef {
  src?: string;
  alt: string;
  objectPosition?: string;
}

const DESKTOP_SLIDES: SlideDef[] = [
  {
    src: "/assets/imgs/home/extranet.png",
    alt: "Ecossistema Foco Tecnologia conectando sistemas de gestão hoteleira em uma única plataforma",
  },
  {
    src: "/assets/imgs/produtos/motor-de-reservas.webp",
    alt: "Painel de reservas em tempo real",
    objectPosition: "22% center",
  },
  {
    src: "/assets/imgs/produtos/pms-integracoes.webp",
    alt: "Relatórios e indicadores de performance",
  },
];

// As 3 telas do FocoPass (app real do hóspede) já existiam no repo, em
// 600×1300 — bate quase exato com o "9 / 19.5" do mockup do celular (0.4615
// nos dois), então o object-cover não corta praticamente nada. Escolhidas
// pelo assunto mais próximo do alt de cada etapa (a 1ª já tem "Faça o
// check-in online" na tela; a 2ª tem ícones de despertador/notificação; a
// 3ª é a única sobrando) — mesmo critério do desktop: preencher com algo
// real e da marca em vez de um recorte de outra tela rotulado errado.
const MOBILE_SLIDES: SlideDef[] = [
  { src: "/assets/imgs/experiencia-do-hospede/app-hospede.webp", alt: "Check-in digital do hóspede" },
  { src: "/assets/imgs/experiencia-do-hospede/app-hospede2.webp", alt: "Notificação de nova reserva em tempo real" },
  { src: "/assets/imgs/experiencia-do-hospede/app-hospede1.webp", alt: "Indicador de ocupação no bolso" },
];

// Sem `custom` real para diferenciar (todas as trocas são um crossfade simples),
// mas a assinatura em função + a prop `custom` no AnimatePresence e no elemento
// evitam o freeze de saída do Framer neste projeto (ver convenção do repo).
const slideVariants = {
  enter: (_custom: number) => ({ opacity: 0, filter: "blur(10px)" }),
  center: (_custom: number) => ({ opacity: 1, filter: "blur(0px)" }),
  exit: (_custom: number) => ({ opacity: 0, filter: "blur(10px)" }),
};

// ── SlideVisual — imagem real ou placeholder tracejado, reaproveitado tanto
//    pelas camadas empilhadas do scrollytelling quanto pelo carrossel de
//    fallback. ─────────────────────────────────────────────────────────────

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

  // ── Scrollytelling só roda em desktop largo + movimento permitido — pin de
  //    scroll em touch tende a brigar com o gesto de rolagem do usuário.
  //    Abaixo disso, cai pro carrossel simples (crossfade + auto-troca) que
  //    já existia antes desta feature. Calculado no mount (SPA, sem SSR —
  //    `window` já existe no primeiro render) e reavaliado se a viewport
  //    cruzar o breakpoint (resize, rotação de tablet). ─────────────────────
  const [canScrollytell, setCanScrollytell] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const widthMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanScrollytell(widthMq.matches && !motionMq.matches);
    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  // ── Layout esquerda/direita (texto+badges+cta | mockups) só a partir de
  //    lg — independente de `canScrollytell`, que também exige "sem
  //    reduced-motion". Um usuário com reduced-motion numa tela larga ainda
  //    deve ver o layout em coluna dupla (é estrutura, não animação); só a
  //    troca de imagem (Iris Reveal) é que não roda pra ele. ───────────────
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

  // Mesma curva de `--hero-scale` (CSS), como número — o GSAP não pode
  // multiplicar um tween por uma string de clamp(), e ler o valor computado
  // da variável CSS de volta não funciona (ver comentário em lib/hero-scale.ts).
  // Calculado direto no corpo do componente (não precisa de useState/effect
  // dedicados): só é lido UMA VEZ, dentro do useLayoutEffect do hook, no
  // mount — não precisa reagir a cada pixel de resize.
  const heroScale = computeHeroScale(typeof window !== "undefined" ? window.innerWidth : 1920);
  useHeroScrollytelling(sectionRef, { steps: DESKTOP_SLIDES.length, heroScale });

  // Alternância das imagens do mockup — só usada no carrossel de fallback
  // (!canScrollytell). No modo scrollytelling as 3 camadas ficam sempre
  // montadas e o GSAP controla qual está visível.
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    if (canScrollytell || reducedMotion || DESKTOP_SLIDES.length <= 1) return;
    const id = setTimeout(() => {
      setActiveSlide((i) => (i + 1) % DESKTOP_SLIDES.length);
    }, 4500);
    return () => clearTimeout(id);
  }, [activeSlide, reducedMotion, canScrollytell]);
  const currentSlide = DESKTOP_SLIDES[activeSlide];

  // Tilt 3D sutil ao mouse — mesma técnica já usada no ProductShowcase.
  // Desligado no modo scrollytelling: o tilt por mouse e o pin por scroll
  // competindo pela atenção do usuário no mesmo elemento é ruído, não polish.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 100, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 100, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [4, -4]);
  const rotateX = useTransform(sy, [-1, 1], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || canScrollytell) return;
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
  // Em telas largas, o palco é ancorado por `position:absolute` com
  // `bottom` NEGATIVO — o mockup sempre nasce 100px abaixo da borda da
  // seção, cortado pelo overflow-hidden dela, não importa a altura da
  // viewport. É isso que dá o efeito "saindo de dentro do limite da seção"
  // em vez de flutuar inteiro com uma borda/gap visível embaixo.
  const mockupStageStyle: React.CSSProperties = isWideLayout
    ? {
        position: "absolute",
        right: "clamp(8px, 2.5vw, 48px)",
        bottom: -100,
        width: fluidPx(660),
        aspectRatio: "900 / 816",
        height: "auto",
      }
    : {
        position: "relative",
        width: "min(78vw, 440px)",
        aspectRatio: "900 / 816",
        height: "auto",
      };

  return (
    <section
      ref={sectionRef}
      data-hero="section"
      className="relative h-dvh min-h-[600px] overflow-hidden bg-[#f4f7fb] grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      style={{ "--hero-scale": HERO_SCALE_CSS } as React.CSSProperties}
    >
      {/* Fundo — full-bleed nos 100dvh inteiros. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 76% 62%, rgba(252,204,48,0.16), transparent 62%)," +
            "radial-gradient(ellipse 60% 50% at 50% -6%, rgba(255,255,255,0.92), transparent 85%)," +
            "linear-gradient(165deg, #eef5ff 0%, #cfe4fb 32%, #9dcdf3 66%, #5599d6 100%)",
        }}
      />

      {/* ── Coluna esquerda — eyebrow, título, subtítulo, badges e CTA, todos
          juntos no mesmo bloco. Centralizado em telas estreitas (empilha
          acima do mockup); alinhado à esquerda e centralizado verticalmente
          a partir de lg (vira a coluna da esquerda de um layout partido). ── */}
      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left justify-center gap-4 lg:gap-6 px-4 sm:px-6 lg:pl-16 xl:pl-24 lg:pr-6 pt-20 sm:pt-24 lg:pt-0 max-w-xl lg:max-w-none mx-auto lg:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="inline-flex items-center gap-2.5 border border-[#132840]/15 bg-white/40 backdrop-blur-sm text-[#1e3a5f] px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full animate-pulse" />
          Ecossistema completo para hotelaria
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
          style={isWideLayout ? { fontSize: fluidRem(3.4) } : undefined}
          className="font-display font-bold text-4xl sm:text-5xl text-[#132840] leading-[1.08] tracking-tighter antialiased"
        >
          Tecnologia hoteleira integrada em uma{" "}
          <span className="relative inline-block text-[#1e3a5f] whitespace-nowrap">
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
          className="text-[#1e3a5f]/70 text-base sm:text-lg font-light leading-relaxed max-w-lg lg:max-w-md"
        >
          Para hotéis e pousadas que querem vender mais, gastar menos e ter
          controle total da operação.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
        >
          <button
            onClick={onCtaClick}
            className="group inline-flex items-center gap-2 bg-[#132840] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#132840]/25 hover:shadow-[#132840]/40 hover:-translate-y-0.5"
          >
            Demonstração grátis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>
      </div>

      {/* ── Coluna direita — palco dos mockups. Em telas estreitas fica contido
          e centralizado (cabe inteiro na faixa flexível abaixo do texto,
          como sempre foi). A partir de lg, `mockupStageStyle` assume a
          posição inteira via `position:absolute` (a coluna só precisa ser o
          contexto de posicionamento — `lg:h-full` garante que o `bottom`
          negativo ancore contra a borda da PRÓPRIA seção, não algo menor).
          `min-w-0` é defensivo: evita que o item estoure a coluna. ───────── */}
      <div className="relative z-10 min-h-0 min-w-0 lg:h-full flex items-center justify-center px-4 lg:px-0 pb-6 lg:pb-0">
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
            // Classes Tailwind fixas (`rounded-t-[24px] sm:rounded-t-[32px]
            // p-2 sm:p-2.5`) continuam como fallback pra mobile/tablet — só
            // sobrescritas por `style` a partir de `isWideLayout`, onde viram
            // fluidas via `fluidPx(N)` (mesma `--hero-scale` do H1/mockup/
            // badges). `style` sempre vence `className` na cascata, então em
            // desktop essas classes nunca chegam a se aplicar de fato.
            className="relative h-full rounded-t-[24px] sm:rounded-t-[32px] p-2 sm:p-2.5 [perspective:1600px]"
            style={{
              background: "rgba(255,255,255,0.32)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: isWideLayout ? `${fluidPx(1)} solid rgba(255,255,255,0.55)` : "1px solid rgba(255,255,255,0.55)",
              borderBottom: "none",
              boxShadow: "0 30px 70px -20px rgba(15,40,80,0.35)",
              ...(isWideLayout ? {
                borderTopLeftRadius: fluidPx(32),
                borderTopRightRadius: fluidPx(32),
                padding: fluidPx(10),
              } : {}),
            }}
          >
            <motion.div
              style={{
                ...(reducedMotion || canScrollytell ? {} : { rotateX, rotateY }),
                ...(isWideLayout ? { borderTopLeftRadius: fluidPx(24), borderTopRightRadius: fluidPx(24) } : {}),
              }}
              className="relative h-full rounded-t-[18px] sm:rounded-t-[24px] overflow-hidden bg-white ring-1 ring-white/40 [transform-style:preserve-3d]"
            >
              <div className="relative w-full h-full" style={{ aspectRatio: "900 / 816" }}>
                {canScrollytell ? (
                  <>
                    {DESKTOP_SLIDES.map((slide, i) => (
                      <div key={i} data-mockup="desktop-step" className="absolute inset-0">
                        <SlideVisual
                          src={slide.src}
                          alt={slide.alt}
                          eager={i === 0}
                          objectPosition={slide.objectPosition}
                          iconClassName="w-7 h-7"
                          labelClassName="text-xs font-medium px-6 text-center"
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <AnimatePresence mode="popLayout" custom={activeSlide}>
                    <motion.div
                      key={activeSlide}
                      custom={activeSlide}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.7, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <SlideVisual
                        src={currentSlide.src}
                        alt={currentSlide.alt}
                        eager={activeSlide === 0}
                        objectPosition={currentSlide.objectPosition}
                        iconClassName="w-7 h-7"
                        labelClassName="text-xs font-medium px-6 text-center"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

            </motion.div>

            <HeroMobileMockup canScrollytell={canScrollytell} isWideLayout={isWideLayout} />

            {STATS.map(({ key, icon, value, label, delay, topPct, side, offsetRem }) => (
              <HeroStatBadge
                key={key}
                badgeKey={key}
                icon={icon}
                value={value}
                label={label}
                delay={delay}
                topPct={topPct}
                side={side}
                offsetRem={offsetRem}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── HeroStatBadge ─────────────────────────────────────────────────────────────
// Três camadas de responsabilidade, cada uma dona só de uma coisa:
//   1. motion.div (externo) — posição (top/left/right) + entrada (Framer).
//   2. div[data-badge] (interno) — flutuação idle (GSAP, só no modo
//      scrollytelling). GSAP e Framer nunca disputam a mesma propriedade.
//   3. Todo tamanho (padding, ícone, fonte) e o deslocamento lateral
//      (`side`/`offsetRem`) multiplicam `var(--hero-scale)` — a mesma
//      variável do H1/subtítulo/mockup — em vez de saltar em `sm:`/`lg:`.
//      Antes disso, o deslocamento fixo (`-left-9`, ~36px sempre) invadia o
//      conteúdo do mockup quando ele encolhia numa tela menor; agora encolhe
//      na mesma proporção.

function HeroStatBadge({
  icon: Icon, value, label, delay, badgeKey, topPct, side, offsetRem,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: string;
  label: string;
  delay: number;
  badgeKey: string;
  topPct: number;
  side: "left" | "right";
  offsetRem: number;
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
      <div
        data-badge={badgeKey}
        className="flex items-center bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl shadow-[0_16px_32px_-16px_rgba(15,40,80,0.4)]"
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
          <div style={{ fontSize: fluidRem(1) }} className="text-[#1e3a5f] font-bold leading-none">{value}</div>
          <div style={{ fontSize: fluidRem(0.75), marginTop: fluidRem(0.125) }} className="text-slate-500">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── HeroMobileMockup ──────────────────────────────────────────────────────────
// Silhueta de celular reta (sem inclinação) apoiada no canto superior direito
// do mockup desktop. No modo scrollytelling, empilha as mesmas 3 etapas do
// desktop (data-mockup="mobile-step"), trocadas com 0.12s de atraso em
// relação ao desktop via "Iris Reveal" (ver use-hero-scrollytelling.ts). Fora
// desse modo, mantém o placeholder único estático que já existia.
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
function HeroMobileMockup({ canScrollytell, isWideLayout }: { canScrollytell: boolean; isWideLayout: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
      className="absolute -top-6 -right-2 sm:-top-8 sm:-right-4 lg:-top-10 lg:-right-6 z-20 w-[160px] sm:w-[175px] lg:w-[220px]"
      style={{
        filter: "drop-shadow(0 22px 34px rgba(15,40,80,0.32))",
        ...(isWideLayout ? { width: fluidPx(220), top: fluidPx(-40), right: fluidPx(-24) } : {}),
      }}
    >
      <div
        className="rounded-[30px] p-1"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.35))",
          ...(isWideLayout ? { borderRadius: fluidPx(30), padding: fluidPx(4) } : {}),
        }}
      >
        <div
          className="relative overflow-hidden rounded-[26px] bg-white ring-1 ring-slate-900/10"
          style={{
            aspectRatio: "9 / 19.5",
            ...(isWideLayout ? { borderRadius: fluidPx(26) } : {}),
          }}
        >
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-[7px] rounded-full bg-slate-900/70 z-10"
            style={isWideLayout ? { top: fluidPx(12), width: fluidPx(32), height: fluidPx(7) } : undefined}
          />

          {canScrollytell ? (
            <>
              {MOBILE_SLIDES.map((slide, i) => (
                <div key={i} data-mockup="mobile-step" className="absolute inset-0">
                  <SlideVisual
                    src={slide.src}
                    alt={slide.alt}
                    eager={i === 0}
                    icon={Smartphone}
                    iconClassName="w-6 h-6"
                    labelClassName="text-[10px] font-medium text-center px-2"
                  />
                </div>
              ))}
            </>
          ) : (
            <SlideVisual
              alt="Print mobile"
              icon={Smartphone}
              iconClassName="w-6 h-6"
              labelClassName="text-[10px] font-medium text-center px-2"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export { HeroSection };
