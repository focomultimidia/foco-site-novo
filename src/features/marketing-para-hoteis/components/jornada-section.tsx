"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Radar, Flame, CheckCircle2 } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data ──────────────────────────────────────────────────────────────────────
const ESTAGIOS = [
  {
    numero: "01",
    icon: Radar,
    titulo: "Reconhecimento",
    subtitulo: "Seja descoberto",
    descricao:
      "Aumentamos a presença digital do seu hotel e encurtamos a distância até o hóspede ideal, com anúncios segmentados exatamente onde ele está pesquisando.",
  },
  {
    numero: "02",
    icon: Flame,
    titulo: "Engajamento",
    subtitulo: "Desperte o desejo",
    descricao:
      "Conteúdo que desperta o interesse pelo seu destino e coloca o seu hotel na rota de quem já está planejando a próxima viagem.",
  },
  {
    numero: "03",
    icon: CheckCircle2,
    titulo: "Conversão",
    subtitulo: "Feche a reserva direta",
    descricao:
      "Transformamos interesse em reserva — com as melhores soluções em tecnologia hoteleira integradas diretamente à campanha.",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Section ───────────────────────────────────────────────────────────────────
// Stepper horizontal (desktop) com trilho "percorrido" ligado ao scroll —
// mesma técnica de useScroll+useTransform de dor-parallax-section.tsx,
// simplificada pra uma barra linear (scaleX) em vez do parallax vertical de
// imagem daquele componente. Um cometa acompanha o avanço, reforçando a
// leitura de jornada em progresso — mesmo espírito do OrbitComet de
// orbit-diagram.tsx, adaptado de órbita circular pra trilho reto.
function JornadaSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const cometLeft = useTransform(progress, [0, 1], ["0%", "100%"]);
  const cometOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-xl text-center"
        >
          <SectionEyebrow className="justify-center">Metodologia</SectionEyebrow>
          <h2 className="font-display mb-4 text-4xl font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased sm:text-5xl">
            Uma jornada,{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              três movimentos
            </span>
          </h2>
        </motion.div>

        {/* ── Desktop — stepper horizontal ligado ao scroll ──────────────── */}
        <div ref={railRef} className="relative hidden lg:block">
          {/* Trilho de fundo */}
          <div className="absolute inset-x-8 top-8 h-0.5 -translate-y-1/2 bg-slate-200" />
          {/* Trilho percorrido */}
          <motion.div
            className="absolute inset-x-8 top-8 h-0.5 -translate-y-1/2 origin-left bg-gradient-to-r from-[#285992] to-[#427ab9]"
            style={{ scaleX }}
          />
          {/* Cometa */}
          <motion.div
            aria-hidden="true"
            className="absolute top-8 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: cometLeft,
              opacity: cometOpacity,
              background: "#fccc30",
              boxShadow: "0 0 10px 2px #fccc30, 0 0 3px 1px #fccc30",
            }}
          />

          <div className="grid grid-cols-3 gap-8">
            {ESTAGIOS.map((estagio, i) => {
              const Icon = estagio.icon;
              return (
                <motion.div
                  key={estagio.numero}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white ring-4 ring-white"
                    style={{
                      background: "linear-gradient(135deg,#285992,#427ab9)",
                      boxShadow: "0 12px 32px -8px rgba(40,89,146,0.45)",
                    }}
                  >
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.7} />
                  </div>
                  <span className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-[#285992]">
                    {estagio.numero} · {estagio.subtitulo}
                  </span>
                  <h3 className="font-display mb-3 text-2xl font-semibold tracking-tight text-[#1e3a5f]">
                    {estagio.titulo}
                  </h3>
                  <p className="max-w-[280px] text-sm leading-relaxed text-slate-500">{estagio.descricao}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile — stack vertical com traço curto entre nós ──────────── */}
        <div className="flex flex-col lg:hidden">
          {ESTAGIOS.map((estagio, i) => {
            const Icon = estagio.icon;
            return (
              <div key={estagio.numero} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(135deg,#285992,#427ab9)", boxShadow: "0 10px 26px -8px rgba(40,89,146,0.45)" }}
                  >
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.7} />
                  </motion.div>
                  {i < ESTAGIOS.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.15, ease: EASE }}
                      className="my-1 h-10 w-0.5 origin-top bg-gradient-to-b from-[#285992] to-[#427ab9]/30"
                    />
                  )}
                </div>
                <div className="pb-10">
                  <span className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] text-[#285992]">
                    {estagio.numero} · {estagio.subtitulo}
                  </span>
                  <h3 className="font-display mb-2 text-xl font-semibold tracking-tight text-[#1e3a5f]">{estagio.titulo}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{estagio.descricao}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { JornadaSection };
