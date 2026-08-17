import { motion } from "framer-motion";
import { LineReveal } from "./motion-primitives";

const GRADIENT_BACKGROUND =
  "radial-gradient(ellipse 55% 45% at 76% 62%, rgba(252,204,48,0.16), transparent 62%)," +
  "radial-gradient(ellipse 60% 50% at 50% -6%, rgba(255,255,255,0.92), transparent 55%)," +
  "linear-gradient(165deg, #eef5ff 0%, #cfe4fb 32%, #9dcdf3 66%, #5599d6 100%)";

export function HeroSection() {
  return (
    // Mesma faixa degradê da hero da Home — sem mockup/CTA aqui (a Sobre não
    // tem screenshot de produto nem CTA própria), só a mesma superfície e
    // tipografia. O reveal em duas linhas é um recurso próprio desta página,
    // mantido por cima do padrão compartilhado.
    <section
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-0 overflow-hidden"
      style={{ background: GRADIENT_BACKGROUND }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2.5 border border-[#132840]/15 bg-white/40 backdrop-blur-sm text-[#1e3a5f] px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 bg-[#1e3a5f] rounded-full animate-pulse" />
            Empresa Brasileira · +20 anos transformando a hotelaria
          </span>
        </motion.div>

        {/* Headline — two masked line reveals */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold text-center text-[#132840] leading-[1.08] tracking-tighter max-w-5xl mx-auto mb-7">
          <LineReveal delay={0.12}>O motor por trás de mais de</LineReveal>
          <LineReveal delay={0.26}>
            <span
              className="bg-gradient-to-r from-[#1e3a5f] via-[#285992] to-[#427ab9] bg-clip-text text-transparent"
            >
              2.800 hotéis
            </span>{" "}
            de sucesso.
          </LineReveal>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.44 }}
          className="text-[#1e3a5f]/70 text-lg sm:text-xl font-light text-center max-w-2xl mx-auto leading-relaxed mb-0"
        >
          Há +20 anos, combinamos tecnologia de ponta com a paixão de entender cada detalhe do
          negócio hoteleiro. Mais reservas, menos fricção e uma gestão que realmente liberta.
        </motion.p>

        {/* Respiro antes da próxima seção */}
        <div aria-hidden className="h-24 pointer-events-none" />
      </div>
    </section>
  );
}
