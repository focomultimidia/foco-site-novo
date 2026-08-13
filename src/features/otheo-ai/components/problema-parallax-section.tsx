"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Monitor, DollarSign, CalendarRange, FileSpreadsheet, MessageCircle, ArrowDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TELAS = [
  { icon: Monitor, label: "PMS" },
  { icon: DollarSign, label: "Financeiro" },
  { icon: CalendarRange, label: "CRS" },
  { icon: FileSpreadsheet, label: "Planilha" },
];

/**
 * ProblemaParallaxSection — a foto vira o palco inteiro e o texto flutua
 * por cima, num cartão de vidro escuro. O fundo se move mais devagar que o
 * scroll (parallax de verdade via `useScroll`/`useTransform`, não
 * `background-attachment:fixed` — funciona igual em mobile) — só a POSIÇÃO
 * da foto depende disso, nunca a visibilidade dela: se o parallax não
 * rodar por qualquer motivo, a foto continua 100% visível, só parada.
 * Canto superior esquerdo do cartão fica ríspido de propósito (não
 * arredondado como o resto), com uma marca dourada em "L" — a assinatura
 * visual que evita o cartão-de-vidro-centralizado genérico.
 *
 * Estrutura externa igual à do OtheoAiTeaserSection (e de ReservaSection /
 * CardapioDigitalSection): seção clara (`#f4f7fb`) + `container mx-auto` +
 * um cartão gigante de cantos bem arredondados que carrega o conteúdo —
 * não sangra mais até a borda real da viewport como a v1.
 */
function ProblemaParallaxSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section className="relative py-20 sm:py-24 md:py-28 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative h-[560px] sm:h-[620px] lg:h-[680px] overflow-hidden rounded-[32px] sm:rounded-[44px] lg:rounded-[56px] bg-[#10233d] shadow-[0_30px_90px_-24px_rgba(15,40,80,0.35)]"
        >
          {/* Fundo com parallax — 120% da altura do cartão, sempre visível
              em opacidade total; só a posição (`y`) reage ao scroll. */}
          <motion.div style={{ y }} className="absolute -top-[10%] left-0 right-0 h-[120%]">
            <img
              src="/assets/imgs/otheo-ai/bkg-hoteleiro-cansado.jpg"
              alt="Hoteleiro cansado, de madrugada, consultando sistemas do hotel em dois notebooks"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-[62%_34%]"
            />
          </motion.div>

          {/* Grade cinematográfica — mais escura à esquerda (onde o cartão
              vive) e nas bordas, respiro à direita onde ficam o rosto e o
              despertador da foto original (05:45), que seguem visíveis. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(16,35,61,0.82) 0%, rgba(16,35,61,0.55) 32%, rgba(16,35,61,0.18) 58%, rgba(16,35,61,0.3) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,35,61,0.35) 0%, transparent 22%, transparent 78%, rgba(16,35,61,0.5) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Legenda editorial — retoma o "5:45" que já está no despertador
              da própria foto. Ancorada no canto inferior DIREITO do cartão
              gigante, lado oposto ao cartão de vidro (que fica à esquerda):
              é ali que o gradiente cinematográfico dá mais respiro pro rosto
              e o despertador da foto original aparecerem. Escondida abaixo
              de `sm`: no mobile o cartão de vidro ocupa quase toda a altura
              do cartão gigante (sem `max-w` sobrando pra respirar), e essa
              legenda ficaria atrás dele. */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="hidden sm:flex absolute z-10 bottom-7 right-7 items-center gap-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#fccc30] opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fccc30]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
              05:45 · antes do Otheo
            </span>
          </motion.div>

          {/* ── Cartão de vidro — ancorado à esquerda, nunca centralizado ── */}
          <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:pl-12 xl:pl-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[500px]"
            >
              <div
                className="relative rounded-tl-[6px] rounded-tr-[36px] rounded-br-[36px] rounded-bl-[36px] p-7 sm:p-9 overflow-hidden"
                style={{
                  background: "linear-gradient(155deg, rgba(28,60,94,0.55) 0%, rgba(13,29,51,0.68) 100%)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 40px 90px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Marca em "L" no canto ríspido — crop-mark discreto,
                    dourado, em vez do cartão de vidro genérico com 4 cantos
                    iguais. */}
                <div aria-hidden="true" className="absolute top-0 left-0 w-9 h-9 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-[#fccc30]/70" />
                  <div className="absolute top-0 left-0 h-full w-px bg-[#fccc30]/70" />
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white leading-[1.05] tracking-tighter antialiased mb-4">
                  Sua manhã já começa com{" "}
                  <span className="bg-gradient-to-r from-[#fccc30] via-[#ffe28a] to-[#fccc30] bg-clip-text text-transparent">
                    seis abas abertas
                  </span>
                  .
                </h2>
                <p className="text-white/65 leading-relaxed mb-8">
                  PMS pra ver ocupação. Planilha pra conferir tarifa. Extranet pra fechar uma
                  categoria. Você não geriu um hotel hoje, você navegou por um.
                </p>

                <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-5">
                  {TELAS.map((tela, index) => (
                    <motion.div
                      key={tela.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
                      className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.06] border border-white/10 px-2 py-4"
                    >
                      <tela.icon className="w-5 h-5 text-white/55" strokeWidth={1.6} />
                      <span className="text-[10.5px] font-medium text-white/60 text-center leading-tight">
                        {tela.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex justify-center mb-5"
                >
                  <ArrowDown className="w-5 h-5 text-white/30" strokeWidth={2} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-4 rounded-full blur-2xl motion-safe:animate-[problema-parallax-halo_4s_ease-in-out_infinite]"
                      style={{ background: "radial-gradient(circle, rgba(252,204,48,0.5), transparent 70%)" }}
                    />
                    <style>{`
                      @keyframes problema-parallax-halo {
                        0%, 100% { transform: scale(1); opacity: 0.55; }
                        50%      { transform: scale(1.18); opacity: 0.85; }
                      }
                    `}</style>
                    <div
                      className="relative flex items-center gap-2.5 rounded-2xl px-6 py-3.5"
                      style={{
                        background: "linear-gradient(135deg,#285992,#427ab9)",
                        boxShadow: "0 20px 45px -12px rgba(40,89,146,0.55), 0 0 0 1px rgba(252,204,48,0.3)",
                      }}
                    >
                      <MessageCircle className="w-5 h-5 text-white flex-shrink-0" strokeWidth={1.8} />
                      <span className="text-white font-semibold whitespace-nowrap">Otheo</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { ProblemaParallaxSection };
