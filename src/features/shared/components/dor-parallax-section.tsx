"use client";

import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Radar,
  ArrowRight,
  Globe,
  Layout,
  Target,
  Zap,
  Cloud,
  CreditCard,
  Headset,
  Plug,
  Star,
  Smartphone,
  MessageCircle,
  Percent,
} from "lucide-react";
import { DORES_DATA } from "@/features/shared/data/dores-data";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;

// Ícone por solução, por cenário — presentation-only (mesma separação que
// DOR_CONFIG em dores-diagnostico-section.tsx já usa: conteúdo vem de fora,
// ícone é local a quem desenha). Reaproveita de propósito a MESMA escolha
// visual da home — mesmo cenário, mesmo símbolo, em qualquer página onde
// ele reaparecer.
const SOLUCAO_ICONS: Record<string, IconType[]> = {
  "baixa-ocupacao": [Globe, Layout, Target, Zap],
  prejuizos: [Cloud, CreditCard, Headset, Plug],
  "experiencia-ruim": [Star, Smartphone, MessageCircle, Percent],
};

const MotionLink = motion(Link);

interface DorParallaxSectionProps {
  /** Um dos 3 ids em DORES_DATA: "baixa-ocupacao" | "prejuizos" | "experiencia-ruim" */
  dorId: string;
  backgroundImage: string;
  backgroundAlt: string;
}

/**
 * DorParallaxSection — o mesmo cenário de dor da home (DoresDiagnosticoSection),
 * agora como uma seção única dentro da página de produto que resolve aquela
 * dor especificamente. Visual herdado da ProblemaParallaxSection (otheo-ai):
 * foto em palco cheio com parallax de verdade, gradiente cinematográfico,
 * cartões de vidro (blur + transparência) flutuando por cima — mas aqui o
 * conteúdo é mais denso (título + parágrafo + 4 soluções), então em vez de
 * UM cartão ancorado à esquerda, a "moldura de vidro" se abre pra receber a
 * grade inteira.
 *
 * Cartões de solução viram link SOMENTE quando: (a) têm um `link` real na
 * origem (DORES_DATA), (b) esse link não é "#" (placeholder, ver "Atrair
 * visitantes qualificados"), e (c) não aponta pra própria página — nesse
 * caso ele é a página atual, um link pra si mesmo não serve pra nada, então
 * vira só um cartão informativo. Card sem link nunca ganha estado de hover
 * (evita sugerir clique onde não há ação).
 *
 * Overscan do fundo em PX fixos, não porcentagem: este cartão tem altura
 * orgânica (cresce com o conteúdo, sem altura fixa como a ProblemaParallax
 * original), e `height: X%` só resolve contra uma altura definida do pai —
 * problema já mapeado neste projeto (ver nota de altura percentual).
 */
function DorParallaxSection({ dorId, backgroundImage, backgroundAlt }: DorParallaxSectionProps) {
  const dor = DORES_DATA.find((d) => d.id === dorId);
  const { pathname } = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  if (!dor) return null;
  const icons = SOLUCAO_ICONS[dorId] ?? [];

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] lg:rounded-[56px] bg-[#10233d] shadow-[0_30px_90px_-24px_rgba(15,40,80,0.4)] min-h-[560px] sm:min-h-[600px]"
        >
          {/* Fundo com parallax — sempre 100% visível, só a posição (`y`)
              reage ao scroll. Overscan fixo de 48px em cima/baixo (não %). */}
          <motion.div style={{ y }} className="absolute -top-12 -bottom-12 left-0 right-0">
            <img
              src={backgroundImage}
              alt={backgroundAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradiente cinematográfico — a foto respira no topo (onde não
              há texto) e escurece progressivamente até a base, onde vivem
              título e cartões. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,22,38,0.32) 0%, rgba(10,22,38,0.55) 30%, rgba(10,22,38,0.88) 68%, rgba(10,22,38,0.96) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, rgba(10,22,38,0.35) 100%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Conteúdo */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-2xl mb-10 lg:mb-12"
            >
              <span
                className="inline-flex items-center gap-2.5 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6"
                style={{ border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.08)" }}
              >
                <Radar className="w-3.5 h-3.5 text-[#fccc30]" strokeWidth={2} />
                Diagnóstico Foco
              </span>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[2.5rem] text-white leading-[1.1] tracking-tight antialiased mb-4">
                {dor.titulo}
              </h2>
              <p className="text-white/65 text-base sm:text-lg leading-relaxed">
                {dor.descricao}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {dor.solucoes.map((solucao, i) => {
                const Icon = icons[i];
                const isNavigable = !!solucao.link && solucao.link !== "#" && solucao.link !== pathname;

                const inner = (
                  <>
                    {Icon && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
                      >
                        <Icon className="w-5 h-5 text-[#fccc30]" strokeWidth={1.8} />
                      </div>
                    )}
                    <h4 className="text-white font-semibold text-sm sm:text-[15px] mb-1.5 leading-snug pr-5">
                      {solucao.titulo}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {solucao.descricao}
                    </p>
                    {isNavigable && (
                      <ArrowRight
                        className="w-4 h-4 text-[#fccc30] absolute top-5 right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                        strokeWidth={2}
                      />
                    )}
                    {isNavigable && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(252,204,48,0.4), 0 16px 36px -16px rgba(252,204,48,0.3)" }}
                      />
                    )}
                  </>
                );

                const cardStyle = {
                  background: "rgba(16,35,61,0.45)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 20px 45px -22px rgba(0,0,0,0.5)",
                };

                const motionProps = {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-60px" },
                  transition: { duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE },
                };

                return isNavigable ? (
                  <MotionLink
                    key={solucao.titulo}
                    to={solucao.link!}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative block rounded-2xl p-5 pr-11 overflow-hidden"
                    style={cardStyle}
                    {...motionProps}
                  >
                    {inner}
                  </MotionLink>
                ) : (
                  <motion.div
                    key={solucao.titulo}
                    className="relative rounded-2xl p-5 overflow-hidden"
                    style={cardStyle}
                    {...motionProps}
                  >
                    {inner}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { DorParallaxSection };
