import { motion, useScroll, useTransform } from "framer-motion";
import { LineReveal } from "./motion-primitives";

export function HeroSection() {
  const { scrollY } = useScroll();
  const glowY    = useTransform(scrollY, [0, 600], [0, -90]);
  const dotGridY = useTransform(scrollY, [0, 600], [0, -45]);

  return (
    <section className="relative pt-36 pb-0 bg-white overflow-hidden">
      {/* Parallax radial glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY, background: "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(40,89,146,0.09) 0%, transparent 70%)" }}
      />
      {/* Parallax dot grid */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          y: dotGridY,
          backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#285992]/20 bg-white/80 backdrop-blur-sm shadow-sm text-sm font-medium text-[#285992]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#285992] opacity-55" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#285992]" />
            </span>
            Empresa Brasileira · 16 anos transformando a hotelaria
          </span>
        </motion.div>

        {/* Headline — two masked line reveals */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold text-center text-[#1e293b] leading-[1.08] tracking-tighter max-w-5xl mx-auto mb-7">
          <LineReveal delay={0.12}>O motor por trás de mais de</LineReveal>
          <LineReveal delay={0.26}>
            <span className="bg-gradient-to-r from-[#1e3a5f] via-[#285992] to-[#427ab9] bg-clip-text text-transparent">
              1.300 hotéis
            </span>{" "}
            de sucesso.
          </LineReveal>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.44 }}
          className="text-lg sm:text-xl text-slate-500 text-center max-w-2xl mx-auto leading-relaxed mb-0"
        >
          Há 16 anos, combinamos tecnologia de ponta com a paixão de entender cada detalhe do
          negócio hoteleiro. Mais reservas, menos fricção e uma gestão que realmente liberta.
        </motion.p>

        {/* Gradient bleed into next section */}
        <div
          aria-hidden
          className="h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #f8fafc)" }}
        />
      </div>
    </section>
  );
}
