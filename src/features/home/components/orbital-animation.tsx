"use client";

import { cn } from "@/lib/utils";

interface IntegrationLogo {
  src: string;
  alt: string;
}

interface OrbitalAnimationProps {
  logos: IntegrationLogo[]; // Espera 6 logos (2 por anel)
}

function OrbitalAnimation({ logos }: OrbitalAnimationProps) {
  // Configuração dos anéis: tamanho e duração da rotação
  const rings = [
    { size: "w-[250px] h-[250px]", duration: "animate-spin-slow", logos: logos.slice(0, 2) },
    { size: "w-[400px] h-[400px]", duration: "animate-spin-reverse-slow", logos: logos.slice(2, 4) },
    { size: "w-[550px] h-[550px]", duration: "animate-spin-slower", logos: logos.slice(4, 6) },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-[600px] overflow-hidden">
      {/* Logo Central da Foco */}
      <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-xl border border-slate-100">
        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-3xl">
          F
        </div>
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

export { OrbitalAnimation };
