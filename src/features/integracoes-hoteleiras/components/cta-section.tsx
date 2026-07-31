"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  onCtaClick?: () => void;
}

/**
 * O gradiente cinza-esverdeado (#455A64 → #263238) que servia de fundo aqui
 * não era nem da marca. A seção passa a usar apenas a superfície #f4f7fb,
 * com a hierarquia sustentada pela tipografia e pelos botões.
 */
function CtaSection({ onCtaClick }: CtaSectionProps) {
  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#132840] leading-tight tracking-tight mb-5">
            Não encontrou a integração que precisa?
          </h2>
          <p className="text-lg text-[#4c5c73] leading-relaxed mb-9">
            Estamos constantemente expandindo nosso ecossistema de integrações.
            Entre em contato e solicite a integração que seu hotel precisa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-t from-[#285992] to-[#427ab9] text-white hover:brightness-110 px-8 h-14 text-base rounded-full shadow-lg shadow-[#285992]/25"
              onClick={onCtaClick}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Solicitar Integração
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#285992]/25 text-[#285992] bg-transparent hover:bg-[#285992]/6 hover:text-[#132840] px-8 h-14 text-base rounded-full"
            >
              Ver Documentação
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { CtaSection };
