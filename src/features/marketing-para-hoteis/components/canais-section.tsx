"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Instagram, Search, Building2, Check } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { StickyTabsList } from "@/features/shared/components/sticky-tabs-list";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InstagramAdMockup, GoogleSearchAdMockup, GoogleHotelAdsMockup } from "./ad-mockups";

// ── Data ──────────────────────────────────────────────────────────────────────
const CANAIS = [
  {
    id: "meta",
    label: "Meta Ads",
    icon: Instagram,
    titulo: "Facebook & Instagram Ads",
    descricao:
      "Desperte o interesse e alcance os melhores hóspedes nas redes sociais. Impulsione pacotes e promoções do seu motor de reservas, ou mostre o seu destino pro maior número de clientes em potencial.",
    bullets: [
      "Segmentação por interesse, comportamento e localização",
      "Criativos e conteúdo pensados pra hotelaria, não banco de imagem genérico",
      "Campanhas de performance — foco em reserva, não só em alcance",
    ],
    Mockup: InstagramAdMockup,
  },
  {
    id: "google",
    label: "Google Ads",
    icon: Search,
    titulo: "Google Ads — Rede de Pesquisa",
    descricao:
      "Exiba as ofertas do seu hotel no exato momento em que o hóspede procura por hospedagem no seu destino — na rede de pesquisa mais consultada do mundo.",
    bullets: [
      "Anúncios otimizados na rede de pesquisa do Google",
      "Segmentação das palavras-chave que realmente capturam hóspedes",
      "Remarketing pra visitantes que não concluíram a reserva",
    ],
    Mockup: GoogleSearchAdMockup,
  },
  {
    id: "hotel-ads",
    label: "Google Hotel Ads",
    icon: Building2,
    titulo: "Google Hotel Ads",
    descricao:
      "Alcance o topo das buscas do Google e do Google Maps com um módulo de reserva que mostra fotos, comodidades e preço — com link direto pro seu site, não pra uma OTA.",
    bullets: [
      "Presença no módulo de reserva do Google e do Google Maps",
      "Fotos, preço e disponibilidade em tempo real",
      "Configuração e otimização de campanha por nossa conta",
    ],
    Mockup: GoogleHotelAdsMockup,
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── TiltMockup — mesmo tilt de mouse do hero, aplicado ao mockup ativo ───────
function TiltMockup({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 110, damping: 20, mass: 0.5 });
  const rotateY = useTransform(sx, [-1, 1], [10, -10]);
  const rotateX = useTransform(sy, [-1, 1], [-7, 7]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div onMouseMove={handleMove} onMouseLeave={handleLeave} className="[perspective:1400px]">
      <motion.div style={reduceMotion ? undefined : { rotateX, rotateY }} className="[transform-style:preserve-3d]">
        {children}
      </motion.div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function CanaisSection() {
  const [activeTab, setActiveTab] = useState<string>(CANAIS[0].id);
  const active = CANAIS.find((c) => c.id === activeTab) ?? CANAIS[0];
  const Mockup = active.Mockup;

  return (
    <section className="bg-[#f4f7fb] py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <SectionEyebrow className="justify-center">Onde seu hotel aparece</SectionEyebrow>
          <h2 className="font-display mb-4 text-4xl font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased sm:text-5xl">
            Presença paga em todo lugar que{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              importa
            </span>
          </h2>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <StickyTabsList className="mb-12 flex justify-center" activeValue={activeTab}>
            {(isStuck) => (
              <TabsList
                className={`inline-flex h-auto w-full max-w-full flex-wrap justify-center gap-1 rounded-3xl border p-1.5 transition-all duration-300 sm:w-auto sm:flex-nowrap sm:rounded-full ${
                  isStuck
                    ? "border-white/60 bg-white/75 shadow-xl shadow-slate-900/10 backdrop-blur-xl"
                    : "border-slate-200 bg-slate-100"
                }`}
              >
                {CANAIS.map((canal) => {
                  const Icon = canal.icon;
                  const isActive = canal.id === activeTab;
                  return (
                    <TabsTrigger
                      key={canal.id}
                      value={canal.id}
                      className="relative flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium sm:rounded-full sm:px-5 sm:py-2.5"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="canais-tab-indicator"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1e3a5f] to-[#285992] shadow-md shadow-[#285992]/25 sm:rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span
                        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
                          isActive ? "text-white" : "text-slate-600 hover:text-[#285992]"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {canal.label}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            )}
          </StickyTabsList>

          {CANAIS.map((canal) => (
            <TabsContent key={canal.id} value={canal.id} className="mt-0">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <h3 className="font-display mb-4 text-2xl font-semibold tracking-tight text-[#1e3a5f] sm:text-3xl">
                    {canal.titulo}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-slate-600">{canal.descricao}</p>
                  <ul className="flex flex-col gap-3">
                    {canal.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28599214]">
                          <Check className="h-3 w-3 text-[#285992]" strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-relaxed text-slate-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex justify-center"
                >
                  <TiltMockup>
                    <Mockup />
                  </TiltMockup>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export { CanaisSection };
