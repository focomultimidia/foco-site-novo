"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data: _data, onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30 overflow-hidden">
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
              <Button
                size="lg"
                className="bg-[#1e3a5f] hover:bg-[#152a45] text-white px-8 py-6 text-base rounded-full group transition-all duration-300 shadow-lg shadow-blue-900/20"
                onClick={onCtaClick}
              >
                Demonstração grátis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
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
                  <div className="text-xl font-bold text-gray-900">+2.000</div>
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
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10">
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">97% aprovação</span>
                </div>

                {/* Hero Image */}
                <img
                  src="/img-home-topo.png"
                  alt="Sistema Foco Tecnologia"
                  className="w-full h-auto object-cover"
                />

                {/* Dashboard Overlay UI */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                
                {/* Floating UI Elements */}
                <div className="absolute top-1/4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg max-w-[180px]">
                  <div className="text-xs text-gray-500 mb-1">CENTRAL DE RESERVAS</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">12 reservas hoje</span>
                  </div>
                </div>

                <div className="absolute bottom-1/4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg max-w-[160px]">
                  <div className="text-xs text-gray-500 mb-1">CHECK-IN FRONT DESK</div>
                  <div className="text-sm font-medium text-gray-900">8 check-ins</div>
                </div>

                {/* Bottom Right Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                  <div className="text-2xl font-bold text-blue-600">+2.5k</div>
                  <div className="text-xs text-gray-600">Hoteleiros satisfeitos</div>
                </div>
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
