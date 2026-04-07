"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const orbitLogos = [
  { src: "/booking.png", alt: "Booking" },
  { src: "/airbnb.png", alt: "Airbnb" },
  { src: "/expedia.png", alt: "Expedia" },
  { src: "/decolar.png", alt: "Decolar" },
  { src: "/cvc.png", alt: "CVC" },
  { src: "/agoda.png", alt: "Agoda" },
];

function IntegracoesOrbitalSection() {
  // Configuração dos anéis: tamanho e duração da rotação
  const rings = [
    { size: "w-[200px] h-[200px]", duration: "animate-spin-slow", logos: orbitLogos.slice(0, 2) },
    { size: "w-[320px] h-[320px]", duration: "animate-spin-reverse-slow", logos: orbitLogos.slice(2, 4) },
    { size: "w-[440px] h-[440px]", duration: "animate-spin-slower", logos: orbitLogos.slice(4, 6) },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            Integrado com os principais{" "}
            <span className="text-blue-500">canais de venda</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Seu site se conecta automaticamente com as maiores plataformas de
            reserva do mundo
          </p>
        </motion.div>

        {/* Orbital Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex items-center justify-center w-full h-[500px]"
        >
          {/* Logo Central da Foco */}
          <div className="relative z-10 flex items-center justify-center w-28 h-28 bg-white rounded-2xl shadow-xl border border-slate-100 p-3">
            <img
              src="/foco.png"
              alt="Foco Tecnologia"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Anéis de Órbita */}
          {rings.map((ring, index) => (
            <div
              key={index}
              className={cn(
                "absolute border border-slate-200 rounded-full flex items-center justify-center",
                ring.size,
                ring.duration
              )}
            >
              {/* Logos em cada anel (Posicionadas em 0° e 180°) */}
              {ring.logos.map((logo, logoIndex) => (
                <div
                  key={logoIndex}
                  className={cn(
                    "absolute w-14 h-14 bg-white rounded-full shadow-md border border-slate-100 p-2 flex items-center justify-center animate-counter-spin",
                    logoIndex === 0 ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"
                  )}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { IntegracoesOrbitalSection };
