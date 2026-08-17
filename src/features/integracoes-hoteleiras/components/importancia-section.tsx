"use client";

import { motion } from "framer-motion";
import { OrbitDiagram, type OrbitPartner } from "@/features/shared/components/orbit-diagram";

// Mesmo componente do /sobre e do DiferenciaisSection da home, mas com os
// parceiros da PRÓPRIA página (ver PmsIntegradosSection logo abaixo) em vez
// das OTAs de canal — um representante de cada categoria não-PMS no anel
// interno (a "espinha" das 4 abas: marketing, canal de vendas, chatbot,
// adquirentes), o resto no anel externo. Ângulos do externo deslocados 45°
// em relação ao interno de propósito, pra não empilhar radialmente com o
// anel de dentro (ver Spoke em orbit-diagram.tsx — os raios-guia seguem
// esses mesmos ângulos).
const INTEGRACOES_INNER: OrbitPartner[] = [
  { id: "tribuzana",    label: "Tribuzana",    logo: "/assets/imgs/parceiros-elite/icones-parceiros/tribuzana.svg", angle: 0   },
  { id: "silbeck",      label: "Silbeck",      logo: "/assets/imgs/parceiros-elite/icones-parceiros/silbeck.svg",  angle: 90  },
  { id: "asksuite",     label: "Asksuite",     logo: "/assets/imgs/parceiros-elite/icones-parceiros/asksuite.svg",  angle: 180 },
  { id: "stone",        label: "Stone",        logo: "/assets/imgs/parceiros-elite/icones-parceiros/stone.svg",    angle: 270 },
];

const INTEGRACOES_OUTER: OrbitPartner[] = [
  { id: "reprotel", label: "Reprotel", logo: "/assets/imgs/parceiros-elite/icones-parceiros/reprotel.svg", angle: 45  },
  { id: "decolar",  label: "Decolar",  logo: "/assets/imgs/channel-manager/icones-canais/decolar.svg",     angle: 135 },
  { id: "hmax",     label: "HMAX",     logo: "/assets/imgs/parceiros-elite/icones-parceiros/hmax.svg",     angle: 225 },
  { id: "expedia",  label: "Expedia",  logo: "/assets/imgs/channel-manager/icones-canais/expedia.svg",     angle: 315 },
];

function ImportanciaSection() {
  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            A importância estratégica da{" "}
            <span className="text-[#455A64]">integração de sistemas</span> para o
            hoteleiro
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Descubra como a sinergia entre as nossas integrações{" "}
            <span className="text-[#455A64] font-medium">elimina erros</span> e{" "}
            <span className="text-[#455A64] font-medium">maximiza a receita</span>{" "}
            do seu hotel.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-500 text-lg leading-relaxed">
              No cenário competitivo da hotelaria, a integração de sistemas não é
              mais um luxo, mas sim uma necessidade estratégica. Para o hoteleiro,
              possuir um ecossistema tecnológico onde o PMS (gestão operacional), o
              RMS (gestão de receita), e as ferramentas de Marketing se comunicam
              perfeitamente é o que define a eficiência e a lucratividade do negócio.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              Em suma, um sistema integrado transforma a tecnologia de um custo
              operacional em um centro de inteligência e lucro, garantindo que o
              hotel opere com máxima eficiência e esteja sempre um passo à frente da
              concorrência.
            </p>
          </motion.div>

          {/* Right Column - Orbit Diagram (parceiros da própria página) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center py-8 lg:py-0"
          >
            <OrbitDiagram
              innerPartners={INTEGRACOES_INNER}
              outerPartners={INTEGRACOES_OUTER}
              showConnections
              innerDurationSec={12}
              outerDurationSec={50}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ImportanciaSection };
