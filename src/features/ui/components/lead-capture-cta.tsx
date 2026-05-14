"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// TODO: Substitua pela imagem final do projeto
const PARALLAX_IMAGE =
  "/assets/imgs/hero/bg-home1.jpg";

interface LeadCaptureCTAProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

function LeadCaptureCTA({
  badge = "Comece agora",
  title = "Pronto para transformar a gestão do seu hotel?",
  subtitle = "Solicite uma demonstração e descubra como a Foco pode otimizar todas as operações do seu negócio.",
}: LeadCaptureCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const onScroll = () => {
      const { top } = section.getBoundingClientRect();
      bg.style.transform = `translateY(${top * 0.15}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[280px] flex items-center"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 will-change-transform bg-cover bg-center"
        style={{
          backgroundImage: `url('${PARALLAX_IMAGE}')`,
          top: "-15%",
          bottom: "-45%",
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/58 to-black/72"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-6 lg:px-8 py-28 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-white/35" />
            <span className="text-[16px] font-semibold tracking-[0.22em] uppercase text-white/60 bg-white/20 rounded-full py-2 px-4">
              {badge}
            </span>
            <span className="w-8 h-px bg-white/35" />
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-white leading-none tracking-tighter antialiased mb-5">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-white/80 font-light leading-relaxed mb-11 max-w-xl mx-auto">
            {subtitle}
          </p>

          {/* CTA button */}
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#1E3A5F] text-sm font-semibold rounded-full shadow-2xl hover:bg-white/93 transition-colors"
          >
            Solicite uma demonstração
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export { LeadCaptureCTA };
