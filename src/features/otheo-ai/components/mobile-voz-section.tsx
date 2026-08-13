"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BARRAS = [0, 1, 2, 3, 4, 5, 6];
const MIC_BARRAS = [0, 1, 2, 3, 4];

/**
 * MobileVozSection — o hoteleiro fora da extranet, no trânsito, resolvendo
 * por voz. Mesma "moldura em duas telas" da OcupacaoSection (inspirada numa
 * chamada de vídeo, sem clonar a UI literal): à esquerda a cena É a prova —
 * foto real dentro de um carro à noite, com o hoteleiro falando ao celular
 * (hoteleiro-uber.jpg) e um selo "Ouvindo" com equalizador animado sobre a
 * imagem; à direita, o mockup do telefone (já existia, agora ganhou um
 * palco: halo dourado atrás + textura de ruído) mostra o que sai do outro
 * lado dessa mesma pergunta por voz. Duas fotos/telas lado a lado dentro de
 * uma moldura escura comum — a mesma gramática visual da seção de Ocupação,
 * reaproveitada aqui de propósito (não é acidente: as duas seções contam a
 * mesma ideia — "pergunta por voz → resposta imediata" — em contextos
 * diferentes).
 */
function MobileVozSection() {
  return (
    <section className="py-24 lg:py-28 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Sua operação cabe no bolso,{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              e agora ouve você
            </span>
            .
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Ações rápidas, chat completo, mensagens de áudio. Resolva no trânsito o que antes
            esperava você voltar pra recepção.
          </p>
        </motion.div>

        <style>{`
          @keyframes otheo-wave {
            0%, 100% { transform: scaleY(0.25); }
            50%      { transform: scaleY(1); }
          }
          @keyframes mobile-voz-mic-pulse {
            0%   { transform: scale(0.85); opacity: 0.8; }
            100% { transform: scale(1.7); opacity: 0; }
          }
          @keyframes mobile-voz-halo {
            0%, 100% { transform: scale(1); opacity: 0.55; }
            50%      { transform: scale(1.15); opacity: 0.85; }
          }
        `}</style>

        {/* ── Moldura premium — a pergunta (foto) e a resposta (mockup),
            dentro de um único objeto flutuante. ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto max-w-5xl rounded-[32px] sm:rounded-[40px] p-2 sm:p-2.5"
          style={{
            background: "linear-gradient(155deg, #16293f 0%, #0a1626 100%)",
            boxShadow: "0 40px 100px -24px rgba(15,40,80,0.45), 0 0 0 1px rgba(252,204,48,0.14)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-2 sm:gap-2.5">
            {/* ── Painel esquerdo — a pergunta, feita de verdade, no trânsito ── */}
            <div className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] min-h-[340px] sm:min-h-[400px] md:min-h-0 md:h-full">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: EASE }}
                className="absolute inset-0"
              >
                <img
                  src="/assets/imgs/otheo-ai/hoteleiro-uber.jpg"
                  alt="Hoteleiro no banco de trás de um carro, à noite, perguntando algo por voz no celular"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-[62%_32%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,22,38,0.05) 0%, rgba(10,22,38,0.05) 52%, rgba(10,22,38,0.8) 100%)",
                  }}
                />
                <div aria-hidden="true" className="absolute inset-0 mix-blend-multiply" style={{ background: "rgba(16,35,61,0.14)" }} />
              </motion.div>

              {/* Selo "ouvindo" — mic com anel pulsante + equalizador, no
                  canto onde o degradê escurece mais a base da foto. */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                className="absolute z-10 bottom-5 left-5 sm:bottom-6 sm:left-6 flex items-center gap-3 rounded-full pl-2.5 pr-4 py-2"
                style={{
                  background: "rgba(13,29,51,0.55)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  boxShadow: "0 16px 40px -16px rgba(0,0,0,0.55)",
                }}
              >
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}>
                  <span aria-hidden="true" className="absolute -inset-1.5 rounded-full border border-[#fccc30]/50 motion-safe:animate-[mobile-voz-mic-pulse_2s_ease-out_infinite]" />
                  <Mic className="w-3.5 h-3.5 text-white relative" strokeWidth={2} />
                </span>
                <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
                  {MIC_BARRAS.map((i) => (
                    <span
                      key={i}
                      style={{ animationDelay: `${i * 0.12}s` }}
                      className="w-[3px] h-full rounded-full bg-white/90 origin-bottom motion-safe:animate-[otheo-wave_1.2s_ease-in-out_infinite]"
                    />
                  ))}
                </div>
                <span className="text-white/85 font-mono text-[10px] uppercase tracking-[0.14em]">Ouvindo</span>
              </motion.div>
            </div>

            {/* ── Painel direito — o mockup de sempre, agora com um palco:
                halo dourado atrás + textura de ruído. ─────────────────── */}
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-[26px] sm:rounded-[32px] py-10 px-6 sm:py-12"
              style={{ background: "linear-gradient(155deg, #14263f 0%, #0a1626 100%)" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full blur-3xl motion-safe:animate-[mobile-voz-halo_4s_ease-in-out_infinite]"
                style={{ background: "radial-gradient(circle, rgba(252,204,48,0.35), transparent 70%)" }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="relative z-10 mx-auto w-[210px] sm:w-[230px] rounded-[36px] p-2.5"
                style={{
                  background: "rgba(16,35,61,0.9)",
                  boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                  border: "2px solid rgba(255,255,255,0.14)",
                }}
              >
                <div className="rounded-[26px] px-5 py-8" style={{ background: "linear-gradient(155deg, #1c3c5e 0%, #0d1d33 100%)" }}>
                  <div className="flex items-end justify-center gap-1.5 h-10 mb-7">
                    {BARRAS.map((i) => (
                      <span
                        key={i}
                        style={{ animationDelay: `${i * 0.12}s` }}
                        className="w-1.5 h-full rounded-full bg-[#fccc30] origin-bottom motion-safe:animate-[otheo-wave_1.2s_ease-in-out_infinite]"
                      />
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 ml-6">
                      <p className="text-white/80 text-xs leading-relaxed">
                        "tá vendo quantas reservas eu tenho pra sexta?"
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#fccc30]/10 border border-[#fccc30]/25 px-4 py-3 mr-6">
                      <p className="text-[#fccc30] text-xs leading-relaxed font-medium">
                        8 reservas confirmadas pra sexta.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { MobileVozSection };
