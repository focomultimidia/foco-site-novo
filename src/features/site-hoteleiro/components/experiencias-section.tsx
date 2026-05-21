"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data (original — unchanged) ───────────────────────────────────────────────
const EXPERIENCIAS = [
  {
    titulo: "Design que converte",
    descricao:
      "Design intuitivo e velocidade de carregamento transformam visitantes em hóspedes antes mesmo de qualquer clique.",
    imagem: "/assets/imgs/site-hoteleiro/experiencias/modelo-site.png",
  },
  {
    titulo: "Gatilhos de reserva",
    descricao:
      "Site otimizado para conversão, com gatilhos mentais e recursos que conduzem o hóspede direto à reserva.",
    imagem: "/assets/imgs/site-hoteleiro/experiencias/modelo-site.png",
  },
  {
    titulo: "Landing pages de impacto",
    descricao:
      "Páginas dedicadas para pacotes, promoções ou eventos, com acesso direto ao motor de reservas.",
    imagem: "/assets/imgs/site-hoteleiro/experiencias/modelo-site.png",
  },
  {
    titulo: "Pacotes em destaque",
    descricao:
      "Venda mais com pacotes e promoções posicionados estrategicamente na capa do site.",
    imagem: "/assets/imgs/site-hoteleiro/experiencias/modelo-site.png",
  },
  {
    titulo: "Captação de leads",
    descricao:
      "Capture clientes interessados com formulários personalizados integrados à operação do hotel.",
    imagem: "/assets/imgs/site-hoteleiro/experiencias/modelo-site.png",
  },
] as const;

// ── Section ───────────────────────────────────────────────────────────────────
function ExperienciasSection() {
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
      setActiveIndex(prev => (prev + 1) % EXPERIENCIAS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [loopKey, isVisible]);

  const handleSelect = (i: number) => {
    setActiveIndex(i);
    setLoopKey(k => k + 1);
  };

  const activeItem = EXPERIENCIAS[activeIndex];

  return (
    <>
      {/*
        experiencias-water-breathe — slow opacity pulse on the ripple overlay.
        Scoped name avoids collision with the identical animation in reserva-section.
      */}
      <style>{`
        @keyframes experiencias-water-breathe {
          0%, 100% { opacity: 0.10; }
          50%       { opacity: 0.18; }
        }
        .experiencias-water-overlay {
          animation: experiencias-water-breathe 8s ease-in-out infinite;
        }
      `}</style>

    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header (original content) ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Experiências incríveis
            </span>{" "}
            para que os visitantes não abandonem seu site
          </h2>
        </motion.div>

        {/* ── Smart TV Container ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(150deg, #285992 0%, #427ab9 50%, #285992 100%)",
          }}
        >
          {/*
            Water ripple overlay — covers the entire Smart TV container.
            Two feTurbulence layers (big rolling waves + fine capillaries) produce
            white pixels whose alpha is derived from the noise channel.
            mix-blend-mode:overlay blends caustic highlights into the blue gradient
            without obscuring the menu or display content beneath.
          */}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="experiencias-water-overlay pointer-events-none absolute inset-0 w-full h-full"
            style={{ zIndex: 50, mixBlendMode: "overlay" }}
          >
            <defs>
              <filter
                id="experiencias-water"
                x="0%" y="0%" width="100%" height="100%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence type="turbulence"   baseFrequency="0.012 0.022" numOctaves="2" seed="7"  result="bigWaves"    />
                <feColorMatrix in="bigWaves"    type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.65 0 0 0 0" result="bigLayer"   />
                <feTurbulence type="fractalNoise" baseFrequency="0.07 0.11"   numOctaves="3" seed="23" result="smallRipples" />
                <feColorMatrix in="smallRipples" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.28 0 0 0 0" result="smallLayer" />
                <feMerge>
                  <feMergeNode in="bigLayer"   />
                  <feMergeNode in="smallLayer" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#experiencias-water)" />
          </svg>

          <div className="flex flex-col lg:flex-row">

            {/* ── Left: Menu (40%) ──────────────────────────────────────── */}
            <div className="lg:w-2/5 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5">

              {/* Mobile: horizontal scroll tabs — text only, no icons */}
              <div
                className="flex lg:hidden gap-2 pb-1 overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
              >
                {EXPERIENCIAS.map((item, i) => (
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

              {/* Desktop: vertical menu with sliding indicator — text only, no icons */}
              <div className="hidden lg:flex flex-col gap-2">
                {EXPERIENCIAS.map((item, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="relative flex items-center gap-3 text-left w-full rounded-xl px-4 py-4"
                      whileHover={{ x: isActive ? 0 : 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Sliding glassmorphism highlight */}
                      {isActive && (
                        <motion.div
                          layoutId="experiencias-highlight"
                          className="absolute inset-0 rounded-xl border border-white/20"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(12px)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 36 }}
                        />
                      )}

                      {/* Vertical bar — slides between items via layoutId */}
                      <div className="relative flex-shrink-0 w-[2px] self-stretch rounded-full bg-white/20">
                        {isActive && (
                          <motion.div
                            layoutId="experiencias-bar"
                            className="absolute inset-0 rounded-full bg-white"
                            transition={{ type: "spring", stiffness: 380, damping: 36 }}
                          />
                        )}
                      </div>

                      {/* Title only */}
                      <span
                        className="relative z-10 block font-display font-normal text-[1.2rem] tracking-tight leading-snug transition-colors duration-200"
                        style={{
                          color: isActive ? "white" : "rgba(255,255,255,0.60)",
                        }}
                      >
                        {item.titulo}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Dot progress indicators (desktop) */}
              <div className="hidden lg:flex items-center gap-2 mt-6">
                {EXPERIENCIAS.map((_, i) => (
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

            {/* ── Right: Display (60%) ──────────────────────────────────── */}
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

export { ExperienciasSection };
