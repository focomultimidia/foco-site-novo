"use client";

import { motion } from "framer-motion";

interface Logo {
  id: string;
  name: string;
  color: string;
}

interface LogoTickerProps {
  logos: Logo[];
}

function LogoTicker({ logos }: LogoTickerProps) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

      {/* Ticker container */}
      <motion.div
        className="flex gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: logo.color }}
            >
              <span className="text-white font-bold text-xs">
                {logo.name.charAt(0)}
              </span>
            </div>
            <span className="text-gray-700 font-medium text-sm whitespace-nowrap">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export { LogoTicker };
