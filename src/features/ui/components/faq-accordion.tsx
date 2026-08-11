"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { PremiumCTAButton } from "./premium-cta-button";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title: string;
  subtitle?: string;
  badge?: string;
  showContactButton?: boolean;
}

function FAQAccordion({
  items,
  title,
  subtitle,
  badge,
  showContactButton = true,
}: FAQAccordionProps) {
  // Extraído pra renderizar em DOIS lugares: dentro da coluna esquerda
  // sticky (desktop, posição original) e depois do acordeão inteiro
  // (mobile — pedido explícito: "o botão deve ficar no final do módulo",
  // antes ele vinha antes do acordeão por herdar a ordem da coluna
  // esquerda). `hidden lg:block` / `lg:hidden` garantem que só UMA das
  // duas cópias fica visível por vez — nada de duplicar o botão na tela.
  const contactCta = showContactButton ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
      <PremiumCTAButton label="Falar com especialista" icon={MessageCircle} />
    </motion.div>
  ) : null;

  return (
    <section className="py-16 lg:py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-10 lg:gap-12 items-start">

          {/* Left: badge, title, subtitle, CTA (CTA só aqui em desktop) */}
          <div className="lg:sticky lg:top-24">
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SectionEyebrow>{badge}</SectionEyebrow>
              </motion.div>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-500 text-lg font-light leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}

            {contactCta && <div className="hidden lg:block mt-8">{contactCta}</div>}
          </div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-white rounded-lg border border-gray-200 px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-[#1E3A5F] font-semibold hover:text-[#285992] hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Mobile — botão vem DEPOIS do acordeão inteiro, no final do módulo. */}
            {contactCta && <div className="lg:hidden mt-8">{contactCta}</div>}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { FAQAccordion };
export type { FAQItem };
