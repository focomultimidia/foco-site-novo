import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Award } from "lucide-react";
import { Section, StaggerSection, StaggerItem, MagneticButton } from "./motion-primitives";

export function CTASection() {
  return (
    <Section className="bg-white">
      <StaggerSection>
        <StaggerItem>
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1a3357] via-[#285992] to-[#3b7fc4] px-8 py-16 lg:py-24 text-center shadow-2xl shadow-[#285992]/20">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />
            <div
              aria-hidden
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 65%)" }}
            />
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-8"
              >
                <Award className="w-7 h-7 text-white/70" />
              </motion.div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-none tracking-tighter mb-6 max-w-3xl mx-auto">
                Pronto para transformar a gestão do seu hotel?
              </h2>
              <p className="text-[#93b8d8] text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                Junte-se aos mais de 1.300 estabelecimentos que já confiam na Foco Tecnologia para crescer com mais eficiência e menos estresse operacional.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton>Solicitar demonstração gratuita</MagneticButton>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-white/75 hover:text-white font-medium transition-colors text-sm"
                >
                  Conhecer nossas soluções <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerSection>
    </Section>
  );
}
