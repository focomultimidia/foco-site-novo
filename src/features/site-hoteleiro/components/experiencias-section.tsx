"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Tag,
  UserPlus,
  Palette,
  Zap,
  Rocket,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────────
// `imagem` fica vazia de propósito — o espaço já está desenhado no layout
// abaixo; basta preencher com o caminho real depois.
interface Experiencia {
  titulo: string;
  descricao: string;
  icon: LucideIcon;
  imagem?: string;
}

const EXPERIENCIAS: Experiencia[] = [
  {
    titulo: "Pacotes em destaque",
    descricao:
      "Venda mais com pacotes e promoções posicionados estrategicamente na capa do site.",
    icon: Tag,
  },
  {
    titulo: "Captação de leads",
    descricao:
      "Capture clientes interessados com formulários personalizados integrados à operação do hotel.",
    icon: UserPlus,
  },
  {
    titulo: "Design que converte",
    descricao:
      "Design intuitivo e velocidade de carregamento transformam visitantes em hóspedes antes mesmo de qualquer clique.",
    icon: Palette,
  },
  {
    titulo: "Gatilhos de reserva",
    descricao:
      "Site otimizado para conversão, com gatilhos mentais e recursos que conduzem o hóspede direto à reserva.",
    icon: Zap,
  },
  {
    titulo: "Landing pages de impacto",
    descricao:
      "Páginas dedicadas para pacotes, promoções ou eventos, com acesso direto ao motor de reservas.",
    icon: Rocket,
  },
];

// Function-form variants — necessário para AnimatePresence mode="popLayout" não
// deixar nós fantasmas ao trocar de categoria rapidamente (padrão já validado no projeto).
const descVariants = {
  initial: () => ({ opacity: 0, y: 8 }),
  animate: () => ({ opacity: 1, y: 0 }),
  exit: () => ({ opacity: 0, y: -8 }),
};

interface FrameConfig {
  left: string;
  top: string;
  width: string;
  height: string;
  rotate: number;
  z: number;
}

// ── Palco (centro) — para onde a imagem da categoria ativa viaja ────────────
const CENTER_DESKTOP: FrameConfig = { left: "24%", top: "8%", width: "46%", height: "72%", rotate: 0, z: 30 };
const CENTER_MOBILE: FrameConfig = { left: "13%", top: "6%", width: "74%", height: "56%", rotate: 0, z: 30 };

// ── Casas fixas — cada categoria tem a sua; a inclinação sutil e o
// posicionamento assimétrico dão o ar de "fotografias espalhadas" que se
// alinham perfeitamente ao chegar ao centro.
const HOME_DESKTOP: FrameConfig[] = [
  { left: "-3%", top: "2%", width: "23%", height: "34%", rotate: -3, z: 20 },
  { left: "-1%", top: "44%", width: "20%", height: "60%", rotate: 2.5, z: 15 },
  { left: "75%", top: "0%", width: "24%", height: "22%", rotate: 3, z: 22 },
  { left: "77%", top: "26%", width: "22%", height: "34%", rotate: -2, z: 18 },
  { left: "27%", top: "84%", width: "22%", height: "20%", rotate: 1.8, z: 12 },
];

const HOME_MOBILE: FrameConfig[] = [
  { left: "-5%", top: "0%", width: "34%", height: "20%", rotate: -3, z: 20 },
  { left: "-3%", top: "62%", width: "32%", height: "30%", rotate: 2.5, z: 15 },
  { left: "68%", top: "2%", width: "34%", height: "18%", rotate: 3, z: 22 },
  { left: "70%", top: "40%", width: "30%", height: "24%", rotate: -2, z: 18 },
  { left: "30%", top: "84%", width: "34%", height: "16%", rotate: 1.8, z: 12 },
];

function ImageFrame({
  item,
  index,
  isActive,
  frame,
  onSelect,
}: {
  item: Experiencia;
  index: number;
  isActive: boolean;
  frame: FrameConfig;
  onSelect: () => void;
}) {
  return (
    <motion.div
      layout
      layoutId={`experiencia-frame-${index}`}
      onClick={onSelect}
      className="absolute rounded-2xl overflow-hidden"
      // left/top/width/height ficam no style "cru" — é a mudança nesses
      // valores entre renders que o `layout` detecta e transforma numa
      // animação suave (FLIP), em vez de deixar o Framer tentar animar o
      // CSS diretamente (que entraria em conflito com o próprio `layout`).
      style={{ left: frame.left, top: frame.top, width: frame.width, height: frame.height, zIndex: isActive ? 30 : frame.z }}
      animate={{
        rotate: frame.rotate,
        boxShadow: isActive
          ? "0 30px 60px -20px rgba(15,23,42,0.30), 0 8px 20px -8px rgba(15,23,42,0.14)"
          : "0 16px 32px -14px rgba(15,23,42,0.20)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9 }}
    >
      <button
        type="button"
        disabled={isActive}
        aria-label={isActive ? undefined : `Destacar ${item.titulo}`}
        aria-hidden={isActive}
        tabIndex={isActive ? -1 : 0}
        className={`w-full h-full ${isActive ? "cursor-default" : "cursor-pointer"}`}
      >
        {item.imagem ? (
          <img src={item.imagem} alt={item.titulo} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        ) : (
          // Placeholder — some ao adicionar `imagem` no item correspondente em EXPERIENCIAS.
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-white/70 border-2 border-dashed transition-opacity duration-300"
            style={{ borderColor: "rgba(40,89,146,0.22)" }}
          >
            <ImageIcon
              className={isActive ? "w-7 h-7 lg:w-8 lg:h-8" : "w-4 h-4 lg:w-5 lg:h-5"}
              style={{ color: "rgba(40,89,146,0.35)" }}
              strokeWidth={1.5}
            />
            <span
              className={`font-medium text-center px-1 ${isActive ? "text-[11px] lg:text-xs" : "text-[9px] lg:text-[10px]"}`}
              style={{ color: "rgba(40,89,146,0.4)" }}
            >
              {item.titulo}
            </span>
          </div>
        )}
      </button>
    </motion.div>
  );
}

// Renderiza os 5 frames para um dado breakpoint — cada categoria mantém sua
// própria casa fixa; a ativa "viaja" até o centro por cima das demais.
function Collage({ activeIndex, onSelect, center, homes }: {
  activeIndex: number;
  onSelect: (i: number) => void;
  center: FrameConfig;
  homes: FrameConfig[];
}) {
  return (
    <>
      {EXPERIENCIAS.map((item, i) => (
        <ImageFrame
          key={item.titulo}
          item={item}
          index={i}
          isActive={i === activeIndex}
          frame={i === activeIndex ? center : homes[i]}
          onSelect={() => onSelect(i)}
        />
      ))}
    </>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function ExperienciasSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = EXPERIENCIAS[activeIndex];
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  // Mobile: abas em rolagem horizontal (ver className abaixo) — sem isso,
  // trocar pra uma aba fora da faixa visível deixava ela cortada na borda
  // da tela. Rola sozinha atrás da aba ativa a cada troca.
  useEffect(() => {
    const container = tabsScrollRef.current;
    const activeTab = container?.children[activeIndex] as HTMLElement | undefined;
    activeTab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-5">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Experiências incríveis
            </span>{" "}
            para que os visitantes não abandonem seu site
          </h2>
          <p className="text-[#1e3a5f]/70 text-lg leading-relaxed">
            Cada visitante que sai sem reservar é uma venda perdida. Nosso design converte
            atenção em reserva — com pacotes em destaque, gatilhos estratégicos e páginas
            feitas para vender antes do primeiro clique.
          </p>
        </motion.div>

        {/* ── Botões (abas) — ficam acima das imagens. No mobile viram uma
            fileira horizontal rolável (lado a lado, ver useEffect acima)
            em vez de empilhar em várias linhas (`flex-wrap`); a partir de
            `lg` volta a ser o layout original, centralizado e quebrando
            linha livremente. ─────────────────────────────────────────── */}
        <div
          ref={tabsScrollRef}
          className="flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible justify-start lg:justify-center gap-2.5 mb-6 pb-2 lg:pb-0 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {EXPERIENCIAS.map((item, i) => {
            const isActive = i === activeIndex;
            const Icon = item.icon;
            return (
              <button
                key={item.titulo}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={isActive}
                className={`relative flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold bg-white ring-1 transition-colors duration-300 ${
                  isActive ? "ring-transparent" : "ring-slate-200 hover:ring-[#285992]/30"
                }`}
              >
                {/* Pílula que desliza entre as abas — mesma técnica (layoutId)
                    usada no RecursosGridSection: o Framer Motion anima
                    posição e largura sozinho quando o elemento "pula" de
                    um botão para o outro. */}
                {isActive && (
                  <motion.span
                    layoutId="experiencias-tab-indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#285992] shadow-md shadow-[#285992]/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-600 hover:text-[#285992]"}`}>
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
                  {item.titulo}
                </span>
              </button>
            );
          })}
        </div>

        {/* Descrição da categoria ativa */}
        <div className="min-h-[3rem] flex items-start justify-center mb-8">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={activeIndex}
              custom={null}
              variants={descVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center text-[#1e3a5f]/60 max-w-xl mx-auto text-base"
            >
              {active.descricao}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Colagem — a imagem da categoria ativa viaja até o centro ────
            Cada categoria tem uma casa fixa; ao ser selecionada, sua imagem
            desliza (spring) até o palco central enquanto a anterior volta
            para a sua própria casa. Espaços sem imagem real mostram um
            placeholder — preencher `imagem` no item correspondente depois. */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-[1100px] rounded-[32px] overflow-hidden"
          style={{
            backgroundColor: "#eef2f9",
            backgroundImage: "radial-gradient(rgba(40,89,146,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          {/* Glow suave central — reforça o palco onde a imagem ativa pousa */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(66,122,185,0.14), transparent 70%)" }}
          />

          <LayoutGroup id="experiencias-collage-desktop">
            <div className="relative hidden lg:block aspect-[2/1]">
              <Collage activeIndex={activeIndex} onSelect={setActiveIndex} center={CENTER_DESKTOP} homes={HOME_DESKTOP} />
            </div>
          </LayoutGroup>

          <LayoutGroup id="experiencias-collage-mobile">
            <div className="relative lg:hidden aspect-[4/5] sm:aspect-[3/2]">
              <Collage activeIndex={activeIndex} onSelect={setActiveIndex} center={CENTER_MOBILE} homes={HOME_MOBILE} />
            </div>
          </LayoutGroup>
        </motion.div>

      </div>
    </section>
  );
}

export { ExperienciasSection };
