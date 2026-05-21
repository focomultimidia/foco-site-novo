"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data (original content — unchanged) ──────────────────────────────────────
// One shared image per the original design; each passo shows its own
// title + description alongside it in the display panel.
const PASSOS = [
  {
    numero: "01",
    titulo: "Recuperação automática de reservas não concluídas",
    descricao:
      "Envie lembretes por e-mail e WhatsApp para retomar o contato com hóspedes que iniciaram a reserva, mas não finalizaram.",
    imagem: "/assets/imgs/site-hoteleiro/finalizar-reserva/modelo-site.png",
  },
  {
    numero: "02",
    titulo: "Reserva finalizada em menos de 1 minuto",
    descricao:
      "Com a integração total entre site e motor, seu hóspede conclui a reserva de forma simples e imediata.",
    imagem: "/assets/imgs/site-hoteleiro/finalizar-reserva/modelo-site.png",
  },
  {
    numero: "03",
    titulo: "Gatilhos e alertas de urgência",
    descricao:
      'Ative recursos como "pouca disponibilidade", contadores, descontos, comparador de preços e outros estímulos à decisão.',
    imagem: "/assets/imgs/site-hoteleiro/finalizar-reserva/modelo-site.png",
  },
  {
    numero: "04",
    titulo: "Pagamento facilitado e completo",
    descricao:
      "Aceite Pix e todas as bandeiras de cartão de crédito, incentivando a compra online com um processo rápido e confiável.",
    imagem: "/assets/imgs/site-hoteleiro/finalizar-reserva/modelo-site.png",
  },
] as const;

// ── Section ───────────────────────────────────────────────────────────────────
function ReservaSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loopKey, setLoopKey]         = useState(0);
  const [isVisible, setIsVisible]     = useState(false);
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
      setActiveIndex(prev => (prev + 1) % PASSOS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [loopKey, isVisible]);

  const handleSelect = (i: number) => {
    setActiveIndex(i);
    setLoopKey(k => k + 1);
  };

  const activeItem = PASSOS[activeIndex];

  return (
    <>
      {/*
        reserva-water-breathe — slow opacity pulse, offset phase vs. experiencias
        so the two sections never pulse in unison when both are in the viewport.
      */}
      <style>{`
        @keyframes reserva-water-breathe {
          0%, 100% { opacity: 0.09; }
          50%       { opacity: 0.17; }
        }
        .reserva-water-overlay {
          animation: reserva-water-breathe 9s ease-in-out infinite;
          animation-delay: -3s;
        }
      `}</style>

    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header (original content) ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-5xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            Seu hóspede sem trabalho para{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              finalizar a reserva
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-5xl mx-auto">
            A integração com o motor de reservas da Foco garante um fluxo de
            navegação fluido e conversão otimizada.
          </p>
        </motion.div>

        {/* ── Smart TV Container ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: "radial-gradient(#427ab9 0%, #285992 50%)",
          }}
        >
          {/*
            Water ripple overlay — seeds differ from experiencias-section so the
            two containers always show distinct wave patterns.
          */}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="reserva-water-overlay pointer-events-none absolute inset-0 w-full h-full"
            style={{ zIndex: 50, mixBlendMode: "overlay" }}
          >
            <defs>
              <filter
                id="reserva-water"
                x="0%" y="0%" width="100%" height="100%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence type="turbulence"   baseFrequency="0.014 0.025" numOctaves="2" seed="11" result="bigWaves"    />
                <feColorMatrix in="bigWaves"    type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.60 0 0 0 0" result="bigLayer"   />
                <feTurbulence type="fractalNoise" baseFrequency="0.08 0.13"   numOctaves="3" seed="37" result="smallRipples" />
                <feColorMatrix in="smallRipples" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.25 0 0 0 0" result="smallLayer" />
                <feMerge>
                  <feMergeNode in="bigLayer"   />
                  <feMergeNode in="smallLayer" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#reserva-water)" />
          </svg>

          {/*
            lg:flex-row-reverse mirrors the columns on desktop:
              display (60%) → LEFT   |   menu (40%) → RIGHT
            Mobile stacking order remains unchanged (menu first, display below).
          */}
          <div className="flex flex-col lg:flex-row-reverse">

            {/* ── Left (DOM) / Right (visual desktop): Menu (40%) ──────────── */}
            <div className="lg:w-2/5 p-6 lg:p-10 border-b lg:border-b-0 lg:border-l border-white/5">

              {/* Mobile: horizontal scroll tabs */}
              <div
                className="flex lg:hidden gap-2 pb-1 overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
              >
                {PASSOS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300"
                    style={
                      activeIndex === i
                        ? { background: "rgba(59,130,246,0.18)", borderColor: "rgba(96,165,250,0.45)", color: "#93c5fd" }
                        : { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(148,163,184,0.5)" }
                    }
                  >
                    {item.titulo}
                  </button>
                ))}
              </div>

              {/* Desktop: vertical menu with sliding indicator */}
              <div className="hidden lg:flex flex-col gap-2">
                {PASSOS.map((item, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="relative flex items-center gap-3 text-left w-full rounded-xl px-4 py-4"
                      whileHover={{ x: isActive ? 0 : -3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Sliding glassmorphism highlight */}
                      {isActive && (
                        <motion.div
                          layoutId="reserva-highlight"
                          className="absolute inset-0 rounded-xl border border-white/20"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(12px)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 36 }}
                        />
                      )}

                      {/* Vertical bar */}
                      <div className="relative flex-shrink-0 w-[2px] self-stretch rounded-full bg-white/20">
                        {isActive && (
                          <motion.div
                            layoutId="reserva-bar"
                            className="absolute inset-0 rounded-full bg-white"
                            transition={{ type: "spring", stiffness: 380, damping: 36 }}
                          />
                        )}
                      </div>

                      {/* Number badge + title */}
                      <div className="flex-1 relative z-10 min-w-0 flex items-center gap-3">
                        <span
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-normal text-[18px] font-semibold border transition-colors duration-200"
                          style={{
                            background: isActive ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)",
                            borderColor: isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)",
                            color: isActive ? "white" : "rgba(255,255,255,0.45)",
                          }}
                        >
                          {item.numero}
                        </span>
                        <span
                          className="block font-display font-normal text-[1.1rem] tracking-tight leading-snug transition-colors duration-200"
                          style={{
                            color: isActive ? "white" : "rgba(255,255,255,0.55)",
                          }}
                        >
                          {item.titulo}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Dot progress indicators (desktop) */}
              <div className="hidden lg:flex items-center gap-2 mt-6">
                {PASSOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="h-[2px] rounded-full transition-all duration-300"
                    style={{
                      width: activeIndex === i ? 20 : 8,
                      background: activeIndex === i ? "#60a5fa" : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── Right (DOM) / Left (visual desktop): Display (60%) ────────── */}
            <div className="relative lg:w-3/5 aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">

              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(40,89,146,0.22), transparent 75%)",
                }}
              />

              {/* Animated panel: title + description + image */}
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
                    <p className="text-white/70 font-normal text-base leading-relaxed max-w-md mx-auto">
                      {activeItem.descricao}
                    </p>
                  </div>

                  <img
                    src={activeItem.imagem}
                    alt={activeItem.titulo}
                    className="w-full max-h-[55%] object-contain rounded-xl drop-shadow-2xl flex-shrink-0"
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

export { ReservaSection };
