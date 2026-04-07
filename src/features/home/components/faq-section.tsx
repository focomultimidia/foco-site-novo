"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "../types";

interface FAQSectionProps {
  faq: FAQItem[];
}

function FAQSection({ faq }: FAQSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start"
        >
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
                alt="Suporte e atendimento Foco Tecnologia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-50 rounded-xl -z-10" />
          </div>

          {/* Right Column - FAQ Content */}
          <div className="order-1 lg:order-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <HelpCircle className="w-4 h-4" />
                <span>FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#1e3a5f] mb-2">
                Perguntas e <span className="text-blue-500">respostas</span>
              </h2>
              <p className="text-gray-500">
                Encontre respostas para as principais dúvidas sobre nossos serviços
              </p>
            </motion.div>

            {/* Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {faq.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-white rounded-xl px-5 border border-gray-100 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-blue-600 hover:no-underline py-4 text-sm">
                      {item.pergunta}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-sm pb-4">
                      {item.resposta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-center lg:text-left"
            >
              <p className="text-gray-500 mb-4 text-sm">Ainda tem dúvidas?</p>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full px-6"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Fale com nossa equipe
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { FAQSection };
