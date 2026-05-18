"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2,
  Search,
  Palette,
  TrendingUp,
  Shield,
  Building,
  ChevronDown,
} from "lucide-react";

const VIDEO_SRC = "/assets/videos/site-hoteleiro/notebook.mp4";

// ── Data ─────────────────────────────────────────────────────────────────────
const BENEFICIOS = [
  {
    icon: Link2,
    titulo: "Site 100% integrado com o motor de reservas",
    descricao:
      "Eliminamos distrações como links externos e abas múltiplas. O hóspede navega com foco e reserva com rapidez.",
  },
  {
    icon: Search,
    titulo: "SEO e indexação orgânica no Google",
    descricao:
      "Seu site aparece nas buscas certas, com performance técnica e conteúdo otimizado para ranquear.",
  },
  {
    icon: Palette,
    titulo: "Layouts personalizados com a cara do seu hotel",
    descricao:
      "Escolha um layout exclusivo que valorize sua marca e reflita a experiência que você oferece.",
  },
  {
    icon: TrendingUp,
    titulo: "Páginas de vendas com foco em conversão",
    descricao:
      "Criamos fluxos de navegação que conduzem o hóspede direto às promoções e pacotes ideais.",
  },
  {
    icon: Shield,
    titulo: "Performance, velocidade e segurança",
    descricao:
      "Seu site carrega em segundos e oferece uma jornada confiável, com os padrões mais avançados da web.",
  },
  {
    icon: Building,
    titulo: "Tecnologia feita para o setor hoteleiro",
    descricao:
      "Mais que uma agência, somos especialistas em soluções digitais para hotéis, pousadas e resorts.",
  },
] as const;

// ── Screen Accordion ──────────────────────────────────────────────────────────
function ScreenAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      style={{
        height: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        padding: "18px 24px",
        paddingRight: 12,
        background: "#ffffff",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0,0,0,0.12) transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 800 }}>

        {/* macOS traffic lights */}
        <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
          {(["#ff5f57", "#ffbd2e", "#28c840"] as const).map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
          ))}
        </div>

        {BENEFICIOS.map((b, i) => {
          const Icon = b.icon;
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  gap: 12, padding: "11px 0",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: isOpen ? "rgba(40,89,146,0.11)" : "rgba(0,0,0,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.22s ease",
                }}>
                  <Icon style={{ width: 16, height: 16, color: isOpen ? "#285992" : "#94a3b8", transition: "color 0.22s ease" }} strokeWidth={1.7} />
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: isOpen ? "#0f172a" : "#475569", lineHeight: 1.35, transition: "color 0.22s ease", textAlign: "center" }}>
                  {b.titulo}
                </span>
                <ChevronDown style={{ width: 14, height: 14, color: "rgba(0,0,0,0.3)", flexShrink: 0, transition: "transform 0.22s ease", transform: isOpen ? "rotate(180deg)" : "none" }} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ paddingBottom: 14, paddingLeft: 44, paddingRight: 4, fontSize: 13, color: "#64748b", lineHeight: 1.72, background: "#ffffff", textAlign: "center" }}>
                      {b.descricao}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function PorQueEscolherSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [isScreenOpen, setIsScreenOpen] = useState(false);

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Reveal accordion once the video finishes playing
    const handleEnded = () => setIsScreenOpen(true);
    video.addEventListener("ended", handleEnded);

    // Play automatically when the section is at least 50% in the viewport.
    // disconnect() after first trigger so the video doesn't restart on re-entry.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.playbackRate = 6.5;
          video.play().catch(() => {
            // Autoplay blocked by browser policy — silently ignore.
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white">
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "6vh",
          paddingBottom: "4vh",
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 56, padding: "0 24px", flexShrink: 0 }}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            Por que escolher a{" "}
            <span style={{ background: "linear-gradient(90deg,#285992,#427ab9,#285992)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Foco
            </span>{" "}
            para criar o site do seu hotel
          </h2>
          <p className="font-sans" style={{ fontSize: "clamp(0.9rem,1.5vw,1.05rem)", color: "#64748b", lineHeight: 1.75 }}>
            Tenha um site completo, integrado ao motor de reservas e indexado
            organicamente no Google para que seus hóspedes te encontrem.
          </p>
        </div>

        {/* ── Video stage ─────────────────────────────────────────────── */}
        {/*
          aspect-video keeps a strict 16:9 box — the container never collapses.
          object-contain ensures the full notebook frame is always visible.

          ⚠️  Accordion overlay coordinates are percentage-based so they scale
          proportionally with the video. Calibrate top/left/width/height here
          to match the screen area in the last frame of notebook.mp4.
        */}
        <div
          className="relative aspect-video mx-auto"
          style={{ width: "min(1150px, 85vw)", flexShrink: 0 }}
        >
          {/*
            muted + playsInline are mandatory for programmatic autoplay.
            No loop — the video plays once and the accordion fades in on end.
          */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/*
            Accordion overlay — sits above the video at the notebook's screen
            position. Starts fully transparent and non-interactive; fades in
            with a 1 s ease transition once isScreenOpen becomes true.
          */}
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: "8.5%",
              left: "18%",
              width: "62%",
              height: "61.5%",
              overflow: "hidden",
              borderRadius: 4,
              background: "#ffffff",
              opacity: isScreenOpen ? 1 : 0,
              pointerEvents: isScreenOpen ? "auto" : "none",
              transition: "opacity 1s ease",
            }}
          >
            <ScreenAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}

export { PorQueEscolherSection };
