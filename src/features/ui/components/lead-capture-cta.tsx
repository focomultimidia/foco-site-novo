"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { ArrowRight } from "lucide-react";

interface LeadCaptureCTAProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

/**
 * CTA de captura.
 *
 * A foto em parallax que servia de fundo foi removida — a seção usa apenas
 * a cor da superfície (#f4f7fb). Sem imagem e sem véu escuro, a hierarquia
 * passa a ser tipográfica: badge, título em display e botão na tinta da marca.
 */
function LeadCaptureCTA({
  badge = "Comece agora",
  title = "Pronto para transformar a gestão do seu hotel?",
  subtitle = "Solicite uma demonstração e descubra como a Foco pode otimizar todas as operações do seu negócio.",
}: LeadCaptureCTAProps) {
  return (
    <section className="bg-[#f4f7fb] py-24 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <SectionEyebrow className="mb-7">{badge}</SectionEyebrow>

          {/* Title */}
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#132840] leading-none tracking-tighter antialiased mb-5">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-[#4c5c73] font-light leading-relaxed mb-11 max-w-xl mx-auto">
            {subtitle}
          </p>

          {/* CTA button */}
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-t from-[#285992] to-[#427ab9] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#285992]/25 hover:brightness-110 transition-all"
          >
            Solicite uma demonstração
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export { LeadCaptureCTA };
