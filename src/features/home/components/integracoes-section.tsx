"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Building2, CreditCard, TrendingUp } from "lucide-react";
// Tabs component not needed - using custom implementation
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CategoriaIntegracao } from "../types";

interface IntegracoesSectionProps {
  categorias: CategoriaIntegracao[];
}

// Partner logos data by category (6 logos each - 2 per ring)
const partnerLogos: Record<string, { src: string; alt: string }[]> = {
  canais: [
    { src: "/booking.png", alt: "Booking" },
    { src: "/airbnb.png", alt: "Airbnb" },
    { src: "/expedia.png", alt: "Expedia" },
    { src: "/decolar.png", alt: "Decolar" },
    { src: "/cvc.png", alt: "CVC" },
    { src: "/agoda.png", alt: "Agoda" },
  ],
  pms: [
    { src: "/booking.png", alt: "Booking" },
    { src: "/airbnb.png", alt: "Airbnb" },
    { src: "/expedia.png", alt: "Expedia" },
    { src: "/decolar.png", alt: "Decolar" },
    { src: "/cvc.png", alt: "CVC" },
    { src: "/agoda.png", alt: "Agoda" },
  ],
  pagamentos: [
    { src: "/booking.png", alt: "Booking" },
    { src: "/airbnb.png", alt: "Airbnb" },
    { src: "/expedia.png", alt: "Expedia" },
    { src: "/decolar.png", alt: "Decolar" },
    { src: "/cvc.png", alt: "CVC" },
    { src: "/agoda.png", alt: "Agoda" },
  ],
  marketing: [
    { src: "/booking.png", alt: "Booking" },
    { src: "/airbnb.png", alt: "Airbnb" },
    { src: "/expedia.png", alt: "Expedia" },
    { src: "/decolar.png", alt: "Decolar" },
    { src: "/cvc.png", alt: "CVC" },
    { src: "/agoda.png", alt: "Agoda" },
  ],
};

// Ticker logos (all partners)
const allTickerLogos = [
  { id: "1", name: "Booking.com", color: "#003580" },
  { id: "2", name: "Expedia", color: "#FFC107" },
  { id: "3", name: "Airbnb", color: "#FF5A5F" },
  { id: "4", name: "Decolar", color: "#7B1FA2" },
  { id: "5", name: "Hurb", color: "#00BCD4" },
  { id: "6", name: "Hospedin", color: "#4CAF50" },
  { id: "7", name: "Htools", color: "#2196F3" },
  { id: "8", name: "Stripe", color: "#635BFF" },
  { id: "9", name: "PagSeguro", color: "#00C853" },
  { id: "10", name: "Google", color: "#4285F4" },
  { id: "11", name: "Meta", color: "#0668E1" },
  { id: "12", name: "WhatsApp", color: "#25D366" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  canais: Globe,
  pms: Building2,
  pagamentos: CreditCard,
  marketing: TrendingUp,
};

function OrbitalAnimation({ logos }: { logos: { src: string; alt: string }[] }) {
  // Configuração dos anéis: tamanho e duração da rotação
  const rings = [
    { size: "w-[250px] h-[250px]", duration: "animate-spin-slow", logos: logos.slice(0, 2) },
    { size: "w-[400px] h-[400px]", duration: "animate-spin-reverse-slow", logos: logos.slice(2, 4) },
    { size: "w-[550px] h-[550px]", duration: "animate-spin-slower", logos: logos.slice(4, 6) },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-[600px] overflow-hidden">
      {/* Logo Central da Foco */}
      <div className="relative z-10 flex items-center justify-center w-28 h-28 bg-white rounded-2xl shadow-xl border border-slate-100 p-3">
        <img src="/foco.png" alt="Foco Tecnologia" className="w-full h-full object-contain" />
      </div>

      {/* Anéis de Órbita */}
      {rings.map(function (ring, index) {
        return (
          <div
            key={index}
            className={cn(
              "absolute border border-slate-200 rounded-full flex items-center justify-center",
              ring.size,
              ring.duration
            )}
          >
            {/* Logos em cada anel (Posicionadas em 0° e 180°) */}
            {ring.logos.map(function (logo, logoIndex) {
              return (
                <div
                  key={logoIndex}
                  className={cn(
                    "absolute w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 p-2 flex items-center justify-center animate-counter-spin",
                    logoIndex === 0 ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
                  )}
                >
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function LogoTicker({ logos }: { logos: { id: string; name: string; color: string }[] }) {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-6 mt-12">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />

      {/* Ticker container */}
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: logo.color }}
            >
              <span className="text-white font-bold text-[10px]">
                {logo.name.charAt(0)}
              </span>
            </div>
            <span className="text-gray-600 font-medium text-xs whitespace-nowrap">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function IntegracoesSection({ categorias }: IntegracoesSectionProps) {
  const [activeTab, setActiveTab] = useState("canais");
  const activeCategoria = categorias.find((c) => c.id === activeTab);
  const currentLogos = partnerLogos[activeTab] || partnerLogos.canais;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4">
            Potencialize seu hotel com{" "}
            <span className="text-blue-500">integrações inteligentes!</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Estamos conectados com as principais tecnologias do ramo hoteleiro
            para maximizar sua operação e receita
          </p>
        </motion.div>

        {/* Tabs - Centralized */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-50 p-1 rounded-lg border border-slate-200">
            {categorias.map((categoria) => {
              const Icon = iconMap[categoria.id] || Globe;
              const isActive = activeTab === categoria.id;
              
              return (
                <button
                  key={categoria.id}
                  onClick={() => setActiveTab(categoria.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-[#1e3a5f] text-white shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-gray-900"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {categoria.nome}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Info Card */}
            <Card className="max-w-xl mx-auto mb-8 border-gray-100 shadow-sm">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = iconMap[activeTab] || Globe;
                    return <Icon className="w-5 h-5 text-blue-600" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {activeCategoria?.nome}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {activeCategoria?.descricao}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Orbital Animation */}
            <div className="flex justify-center mb-8">
              <OrbitalAnimation logos={currentLogos} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Logo Ticker */}
        <LogoTicker logos={allTickerLogos} />
      </div>
    </section>
  );
}

export { IntegracoesSection };
