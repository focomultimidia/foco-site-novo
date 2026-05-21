"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  LayoutGrid,
  ClipboardList,
  Calculator,
  Package,
  Monitor,
  CreditCard,
} from "lucide-react";

// ── Data (original — unchanged) ───────────────────────────────────────────────
const recursos = [
  {
    icon: Package,
    titulo: "Gerenciamento de produtos",
    descricao:
      "Cadastro detalhado de todos os itens do menu, incluindo custos, margens de lucro e variações (tamanhos, adicionais), para um controle financeiro completo.",
    imagem: "/assets/imgs/experiencia-do-hospede/gerenciamento-de-produtos.png",
  },
  {
    icon: Boxes,
    titulo: "Controle de estoque",
    descricao:
      "Gerenciamento preciso de insumos e produtos acabados. Evita desperdícios, otimiza o momento da compra e garante que o cardápio reflita apenas o que está disponível.",
    imagem: "/assets/imgs/experiencia-do-hospede/controle-de-estoque1.png",
  },
  {
    icon: LayoutGrid,
    titulo: "Controle de mesas",
    descricao:
      "Visão em tempo real da ocupação do salão e do status de cada mesa. Agiliza o atendimento, a alocação de clientes e o fechamento de contas.",
    imagem: "/assets/imgs/experiencia-do-hospede/controle-de-mesas.png",
  },
  {
    icon: ClipboardList,
    titulo: "Gestão de pedidos",
    descricao:
      "Recebimento e roteamento automático de pedidos (cozinha, bar, serviço de quarto). Reduz o tempo de espera do cliente e elimina erros de comunicação entre salão e cozinha.",
    imagem: "/assets/imgs/experiencia-do-hospede/gestao-de-pedidos.png",
  },
  {
    icon: Calculator,
    titulo: "Controle de caixa",
    descricao:
      "Registro e conciliação de todas as transações financeiras. Garante a precisão do fechamento diário, reduzindo fraudes e facilitando a auditoria.",
    imagem: "/assets/imgs/experiencia-do-hospede/experiencia-hospede.png",
  },
  {
    icon: Monitor,
    titulo: "Cardápio online",
    descricao:
      "Interface digital moderna e visualmente atraente. Permite atualizações instantâneas de preços e disponibilidade, além de fotos de alta qualidade para incentivar a compra.",
    imagem: "/assets/imgs/experiencia-do-hospede/experiencia-hospede.png",
  },
  {
    icon: CreditCard,
    titulo: "Pagamento online",
    descricao:
      "Recebimento de pagamentos via cartão de crédito, débito ou PIX diretamente pelo sistema. Garante segurança na transação e agilidade no checkout do cliente.",
    imagem: "/assets/imgs/experiencia-do-hospede/experiencia-hospede.png",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────
function CardapioDigitalSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loopKey, setLoopKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Start/stop autoplay based on viewport visibility.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Autoplay — only runs while the section is visible.
  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % recursos.length);
    }, 3500);
    return () => clearInterval(id);
  }, [loopKey, isVisible]);

  const handleSelect = (i: number) => {
    setActiveIndex(i);
    setLoopKey(k => k + 1);
  };

  const activeItem = recursos[activeIndex];

  return (
    <>
      {/*
        cardapio-water-breathe — opacity pulse with offset phase so it never
        syncs with the identical animation in experiencias-section or reserva-section.
      */}
      <style>{`
        @keyframes cardapio-water-breathe {
          0%, 100% { opacity: 0.11; }
          50%       { opacity: 0.19; }
        }
        .cardapio-water-overlay {
          animation: cardapio-water-breathe 8.5s ease-in-out infinite;
          animation-delay: -5s;
        }
      `}</style>

    <section ref={sectionRef} className="py-24 bg-[#fff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header — original content ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-5xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">Cardápio Digital</span> para
            hotéis, pousadas e resorts
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A gestão completa que multiplica a receita do seu hotel e restaurante.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            Smart TV Container — cloned from experiencias-section.tsx
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(150deg, #285992 0%, #427ab9 50%, #285992 100%)",
          }}
        >
          {/*
            Water ripple overlay — seeds 19/41 differ from experiencias (7/23)
            and reserva (11/37) so each container has a visually unique wave pattern.
          */}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="cardapio-water-overlay pointer-events-none absolute inset-0 w-full h-full"
            style={{ zIndex: 50, mixBlendMode: "overlay" }}
          >
            <defs>
              <filter
                id="cardapio-water"
                x="0%" y="0%" width="100%" height="100%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence type="turbulence"   baseFrequency="0.013 0.024" numOctaves="2" seed="19" result="bigWaves"    />
                <feColorMatrix in="bigWaves"    type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.62 0 0 0 0" result="bigLayer"   />
                <feTurbulence type="fractalNoise" baseFrequency="0.075 0.12"  numOctaves="3" seed="41" result="smallRipples" />
                <feColorMatrix in="smallRipples" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.27 0 0 0 0" result="smallLayer" />
                <feMerge>
                  <feMergeNode in="bigLayer"   />
                  <feMergeNode in="smallLayer" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#cardapio-water)" />
          </svg>

          <div className="flex flex-col lg:flex-row">

            {/* ── Left: Menu (40%) ───────────────────────────────────────── */}
            <div className="lg:w-2/5 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5">

              {/* Mobile: horizontal scroll tabs */}
              <div
                className="flex lg:hidden gap-2 pb-1 overflow-x-auto"
                style={
                  { scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties
                }
              >
                {recursos.map((item, i) => {
                  const TabIcon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300"
                      style={
                        activeIndex === i
                          ? {
                              background: "rgba(59,130,246,0.18)",
                              borderColor: "rgba(96,165,250,0.45)",
                              color: "#93c5fd",
                            }
                          : {
                              background: "rgba(255,255,255,0.05)",
                              borderColor: "rgba(255,255,255,0.1)",
                              color: "rgba(148,163,184,0.5)",
                            }
                      }
                    >
                      <TabIcon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.8} />
                      {item.titulo}
                    </button>
                  );
                })}
              </div>

              {/* Desktop: vertical menu with sliding indicator */}
              <div className="hidden lg:flex flex-col gap-2">
                {recursos.map((item, i) => {
                  const MenuIcon = item.icon;
                  const isActive = activeIndex === i;

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="relative flex items-start gap-3 text-left w-full pt-4 pb-4 rounded-xl px-4 py-2.5"
                      whileHover={{ x: isActive ? 0 : 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Sliding glassmorphism highlight */}
                      {isActive && (
                        <motion.div
                          layoutId="cardapio-highlight"
                          className="absolute inset-0 rounded-xl border border-white/20"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(12px)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 36 }}
                        />
                      )}

                      {/* Vertical bar — slides between items via layoutId */}
                      <div className="relative flex-shrink-0 w-[2px] self-stretch rounded-full bg-white/20 mt-[4px]">
                        {isActive && (
                          <motion.div
                            layoutId="cardapio-bar"
                            className="absolute inset-0 rounded-full bg-white"
                            transition={{ type: "spring", stiffness: 380, damping: 36 }}
                          />
                        )}
                      </div>

                      {/* Icon + text */}
                      <div className="flex-1 relative z-10 min-w-0 flex items-center gap-2.5">
                        {/* ── Original icon preserved ── */}
                        <MenuIcon
                          className="w-8 h-8 flex-shrink-0 transition-colors duration-200"
                          style={{
                            color: isActive
                              ? "#93c5fd"
                              : "rgba(255,255,255,0.35)",
                          }}
                          strokeWidth={1.7}
                        />

                        <div className="min-w-0">
                          <span
                            className="block font-display font-normal text-[1.2rem] tracking-tight leading-snug transition-colors duration-200"
                            style={{
                              color: isActive ? "white" : "rgba(255,255,255,0.60)",
                            }}
                          >
                            {item.titulo}
                          </span>

                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Dot progress indicators (desktop) */}
              <div className="hidden lg:flex items-center gap-2 mt-6">
                {recursos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="h-[2px] rounded-full transition-all duration-300"
                    style={{
                      width: activeIndex === i ? 20 : 8,
                      background:
                        activeIndex === i
                          ? "#60a5fa"
                          : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── Right: Feature Display (60%) ───────────────────────────── */}
            <div className="relative lg:w-3/5 aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">

              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(40,89,146,0.22), transparent 75%)",
                }}
              />

              {/* Animated image + text panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 lg:p-10"
                >


                  <div className="text-center">
                    <h3
                      className="font-display font-bold text-white text-xl lg:text-3xl tracking-tight leading-tight mb-2"
                      style={{ textShadow: "0 2px 16px rgba(0,0,0,0.18)" }}
                    >
                      {activeItem.titulo}
                    </h3>
                    <p className="text-white font-normal text-lg leading-relaxed max-w-60% mx-auto">
                      {activeItem.descricao}
                    </p>
                  </div>
                  <img
                    src={activeItem.imagem}
                    alt={activeItem.titulo}
                    className="w-full max-h-[70%] object-contain rounded-xl drop-shadow-2xl flex-shrink-0"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}

export { CardapioDigitalSection };
