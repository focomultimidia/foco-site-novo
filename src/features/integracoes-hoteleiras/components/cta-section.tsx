"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  onCtaClick?: () => void;
}

function CtaSection({ onCtaClick }: CtaSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-[#455A64] to-[#263238]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Não encontrou a integração que precisa?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Estamos constantemente expandindo nosso ecossistema de integrações.
            Entre em contato e solicite a integração que seu hotel precisa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#455A64] hover:bg-gray-100 px-8 h-14 text-base rounded-full"
              onClick={onCtaClick}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Solicitar Integração
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 h-14 text-base rounded-full"
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
