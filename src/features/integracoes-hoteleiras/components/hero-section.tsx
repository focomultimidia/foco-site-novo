"use client";

import { motion } from "framer-motion";
import { HeroButton } from "@/features/shared/components/hero-button";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#e7ecef] bg-[url('/assets/imgs/hero/bkg.png')] bg-cover bg-center">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#244248]/10 text-[#244248] rounded-full text-sm font-medium mb-6">
              {data.subtitulo}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#244248] mb-6 leading-tight">
              {data.titulo}
            </h1>
            <p className="text-lg text-[#244248]/80 mb-8 leading-relaxed max-w-xl">
              {data.descricao}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <HeroButton onClick={onCtaClick}>
                {data.ctaPrimario}
              </HeroButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src={data.imagemUrl}
              alt="Integrações Hoteleiras"
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
