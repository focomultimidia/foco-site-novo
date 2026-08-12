"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BARRAS = [0, 1, 2, 3, 4, 5, 6];

/**
 * MobileVozSection — quebra deliberada do ritmo "texto + cartão" repetido
 * nas 3 seções anteriores: aqui o mockup vem centralizado, sozinho, maior,
 * pra marcar que é um momento diferente (o hoteleiro fora da extranet, no
 * trânsito). Sem foto de pessoa de banco de imagens — a onda sonora
 * animada + transcrição já contam a cena sem cair em clichê de estoque.
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

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto w-[230px] sm:w-[250px] rounded-[36px] p-2.5"
          style={{
            background: "rgba(16,35,61,0.9)",
            boxShadow: "0 30px 80px -20px rgba(16,35,61,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            border: "2px solid rgba(16,35,61,0.15)",
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
            <style>{`
              @keyframes otheo-wave {
                0%, 100% { transform: scaleY(0.25); }
                50%      { transform: scaleY(1); }
              }
            `}</style>

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
    </section>
  );
}

export { MobileVozSection };
