import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Award } from "lucide-react";
import { Section, StaggerSection, StaggerItem } from "./motion-primitives";
import { useLeadCapture } from "@/features/shared/lib/lead-capture-context";

export function CTASection() {
  const { openLeadCapture } = useLeadCapture();

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
              Junte-se aos mais de 2.700 estabelecimentos que já confiam na Foco Tecnologia para crescer com mais eficiência e menos estresse operacional.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                type="button"
                onClick={() => openLeadCapture({ source: "cta_final_sobre", title: "Foco Tecnologia" })}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-t from-[#285992] to-[#427ab9] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#285992]/25 hover:brightness-110 transition-all"
              >
                Solicitar demonstração gratuita
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#285992]/20 text-[#285992] text-sm font-semibold hover:bg-[#285992]/5 hover:border-[#285992]/30 transition-colors"
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
