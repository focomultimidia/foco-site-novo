"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
}

function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#1E3A5F] to-[#0d1f35]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.imagemUrl}
          alt="Site Hoteleiro"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/90 via-[#1E3A5F]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#00BCD4]/20 text-[#00BCD4] rounded-full text-sm font-medium mb-6">
              {data.subtitulo}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {data.titulo}
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
              {data.descricao}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#00BCD4] hover:bg-[#0097A7] text-white px-8 h-14 text-base rounded-full"
              >
                {data.ctaPrimario}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 h-14 text-base rounded-full"
              >
                <Play className="w-5 h-5 mr-2" />
                {data.ctaSecundario}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src={data.imagemUrl}
                alt="Site Hoteleiro"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E3A5F]">+45%</p>
                    <p className="text-sm text-gray-500">Reservas Diretas</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
