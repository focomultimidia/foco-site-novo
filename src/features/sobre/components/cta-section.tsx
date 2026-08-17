import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Award } from "lucide-react";
import { Section, StaggerSection, StaggerItem, MagneticButton } from "./motion-primitives";

export function CTASection() {
  return (
    <Section className="bg-[#f4f7fb]">
      <StaggerSection>
        <StaggerItem>
          <div className="px-4 py-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              className="w-14 h-14 rounded-3xl bg-[#285992]/8 border border-[#285992]/15 flex items-center justify-center mx-auto mb-8"
            >
              <Award className="w-7 h-7 text-[#285992]" />
            </motion.div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#132840] leading-none tracking-tighter mb-6 max-w-3xl mx-auto">
              Pronto para transformar a gestão do seu hotel?
            </h2>
            <p className="text-[#4c5c73] text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Junte-se aos mais de 2.800 estabelecimentos que já confiam na Foco Tecnologia para crescer com mais eficiência e menos estresse operacional.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>Solicitar demonstração gratuita</MagneticButton>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-[#285992] hover:text-[#132840] font-medium transition-colors text-sm"
              >
                Conhecer nossas soluções <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </StaggerItem>
      </StaggerSection>
    </Section>
  );
}
