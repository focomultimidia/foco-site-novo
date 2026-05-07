"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Calendar, Smile } from "lucide-react";
import { HeroButton } from "@/features/shared/components/hero-button";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data: _data, onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#eaeeef" }}>
      {/* Background Pattern - subtle dots */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #1e40af 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-7rem)]">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-100/50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              Sistema completo para hotelaria
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.15] mb-8"
            >
              10 sistemas hoteleiros integrados em um único software para{" "}
              <span className="text-blue-600">hotéis e pousadas!</span>
            </motion.h1>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-10"
            >
              <HeroButton onClick={onCtaClick}>
                Demonstração grátis
              </HeroButton>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {/* Card 1 - Clientes */}
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">+2.500</div>
                  <div className="text-xs text-gray-500">Clientes ativos</div>
                </div>
              </div>

              {/* Card 2 - Transações */}
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">+1B</div>
                  <div className="text-xs text-gray-500">Transações/ano</div>
                </div>
              </div>

              {/* Card 3 - Experiência */}
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">+18</div>
                  <div className="text-xs text-gray-500">Anos de experiência</div>
                </div>
              </div>
              {/* Card 4 - Satisfação */}
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Smile className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">+2.4k</div>
                  <div className="text-xs text-gray-500">Clientes satisfeitos</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden ">

                {/* Hero Image */}
                <img
                  src="/assets/imgs/home/img-hero-home.png"
                  alt="Sistema Foco Tecnologia"
                  className="w-full h-auto object-cover"
                />

                {/* Dashboard Overlay UI */}
                <div className="absolute inset-0" />

              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-100 rounded-full opacity-40 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
