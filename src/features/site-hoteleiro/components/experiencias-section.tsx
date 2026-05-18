"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
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

  // Autoplay — advances every 3.5 s. Resets the timer whenever the user
  // clicks manually (loopKey increment triggers a fresh setInterval).
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % EXPERIENCIAS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [loopKey]);

  const handleSelect = (i: number) => {
    setActiveIndex(i);
    setLoopKey(k => k + 1); // restart the 3.5 s countdown from now
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────── */}
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

        {/* ── Smart TV Container ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(150deg, #285992 0%, #427ab9 50%, #285992 100%)",
          }}
        >
          <div className="flex flex-col lg:flex-row">

            {/* ── Left: Controls (40%) ──────────────────────────────────── */}
            <div className="lg:w-2/5 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5">

              {/* Mobile: horizontal scroll tabs */}
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

              {/* Desktop: vertical menu with sliding indicator */}
              <div className="hidden lg:flex flex-col gap-1">
                {EXPERIENCIAS.map((item, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="relative flex items-start gap-3 text-left w-full rounded-xl px-3 py-3"
                      whileHover={{ x: isActive ? 0 : 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Sliding glassmorphism highlight */}
                      {isActive && (
                        <motion.div
                          layoutId="tv-highlight"
                          className="absolute inset-0 rounded-xl border border-white/20"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(12px)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 36 }}
                        />
                      )}

                      {/* Vertical bar — slides between items via layoutId */}
                      <div className="relative flex-shrink-0 w-[2px] self-stretch rounded-full bg-white/30 mt-[3px]">
                        {isActive && (
                          <motion.div
                            layoutId="tv-bar"
                            className="absolute inset-0 rounded-full bg-white"
                            transition={{ type: "spring", stiffness: 380, damping: 36 }}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 relative z-10 min-w-0">
                        <span
                          className="block font-display font-semibold text-[1.2rem] text-white tracking-tight leading-snug">
                          {item.titulo}
                        </span>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="text-sm text-white leading-relaxed mt-1.5 overflow-hidden"
                            >
                              {item.descricao}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Dot progress indicators (desktop only) */}
              <div className="hidden lg:flex items-center gap-2 mt-8">
                {EXPERIENCIAS.map((_, i) => (
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

            {/* ── Right: Display (60%) ──────────────────────────────────── */}
            <div className="relative lg:w-3/5 aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">

              {/* Ambient glow behind image */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(40,89,146,0.2), transparent 75%)",
                }}
              />

              {/* Image with fade + zoom on tab change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-6 lg:p-10"
                >
                  <img
                    src={EXPERIENCIAS[activeIndex].imagem}
                    alt={EXPERIENCIAS[activeIndex].titulo}
                    className="max-w-full max-h-full object-contain rounded-xl drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { ExperienciasSection };
