"use client";

/**
 * HeroSection — /sobre
 *
 * Toda outra hero do site enquadra o PRODUTO numa moldura de vidro sobre o
 * mesmo fundo navy com auroras (ver home-style-hero.tsx/gradient-hero.tsx).
 * Esta é a única página que existe pra falar da EMPRESA, não de um produto —
 * então o "mockup" vira a própria foto da equipe, corrigida de cor pra
 * dentro da mesma paleta navy/dourada da marca (nunca solta como um stock
 * photo genérico por cima do fundo escuro) e dissolvida a partir de um
 * painel sólido à esquerda (vertical no mobile) — o mesmo tratamento visual
 * de "vidro" do resto do site, só que revelando pessoas em vez de uma tela
 * de produto.
 *
 * O texto fica ancorado embaixo do palco (não centralizado verticalmente
 * como as outras heroes) — cartão de abertura de documentário, não banner
 * de produto: reforça que esta página conta uma história, não vende uma
 * feature.
 */

import { motion, useReducedMotion } from "framer-motion";
import { LineReveal } from "./motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Grão sutil — mesmo data-uri usado em toda outra hero do site (ver
// home-style-hero.tsx) — quebra a chapadura do gradiente/foto sem repintar.
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      data-hero="section"
      className="relative isolate overflow-hidden bg-[#0a1a30] min-h-[600px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[780px] flex flex-col"
    >
      {/* ── Foto — corrigida de cor pra dentro da paleta da marca ──────────
          1. filter no <img>: dessaturação leve + contraste, tira o "clima"
             de banco de imagens antes de qualquer blend.
          2. wash navy em mix-blend-mode:color — troca o matiz da foto pro
             azul da marca preservando a luminância (rostos/janelas
             continuam lendo como as áreas mais claras, só que azuis).
          3. painel de dissolução — sólido à esquerda (diagonal no desktop,
             vertical de baixo pra cima no mobile), esmaecendo até
             transparente onde a equipe aparece. Nunca opacidade uniforme:
             é um corte com borda suave, ecoando as paredes de vidro reais
             da própria foto. ──────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0">
        <motion.img
          src="/assets/imgs/sobre/img-hero.webp"
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[62%_32%] lg:object-[66%_40%]"
          style={{ filter: "grayscale(0.22) contrast(1.06) brightness(0.9)" }}
          initial={false}
          animate={reducedMotion ? undefined : { scale: [1, 1.045, 1] }}
          transition={reducedMotion ? undefined : { duration: 34, ease: "linear", repeat: Infinity }}
        />

        <div className="absolute inset-0" style={{ background: "#12294a", mixBlendMode: "color", opacity: 0.68 }} />

        {/* Dissolução — diagonal a partir de lg, vertical (baixo→cima) antes disso. */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(101deg, #0a1a30 0%, #0a1a30 36%, rgba(10,26,48,0.88) 48%, rgba(10,26,48,0.42) 63%, rgba(10,26,48,0.06) 78%, transparent 92%)",
          }}
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(0deg, #0a1a30 0%, #0a1a30 30%, rgba(10,26,48,0.9) 46%, rgba(10,26,48,0.45) 64%, rgba(10,26,48,0.08) 82%, transparent 100%)",
          }}
        />

        {/* Halo dourado — mesmo vocabulário de luz das outras heroes, aqui
            entrando por cima da foto (screen) em vez de atrás dela. */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-[6%] w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(252,204,48,0.4), transparent 68%)",
            filter: "blur(70px)",
            mixBlendMode: "screen",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: GRAIN_BG }}
        />
      </div>

      {/* ── Conteúdo — ancorado embaixo do palco ──────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end container mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-14 lg:pb-16">
        <div className="relative max-w-xl pl-5 sm:pl-6">
          {/* Espinha dourada — a página é um dossiê da trajetória da empresa;
              o traço lateral marca isso tipograficamente, não é só decoração. */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-2 w-px"
            style={{ background: "linear-gradient(180deg, #fccc30 0%, rgba(252,204,48,0.25) 65%, transparent 100%)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center border border-white/15 bg-white/8 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6"
          >
            Desde 2006 · Tecnologia hoteleira brasileira
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.6rem] font-bold text-white leading-[1.04] tracking-tighter mb-6">
            <LineReveal delay={0.14}>O motor por trás</LineReveal>
            <LineReveal delay={0.26}>
              de{" "}
              <span className="relative inline-block whitespace-nowrap">
                +2.700 hotéis
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 14"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-2 w-full h-[0.85rem] pointer-events-none"
                  fill="none"
                >
                  <motion.path
                    d="M 4 10 C 60 4, 150 3, 230 6 C 270 7.5, 300 9, 316 8"
                    stroke="#fccc30"
                    strokeWidth={4}
                    strokeLinecap="round"
                    initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.9 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </span>
            </LineReveal>
            <LineReveal delay={0.38}>de sucesso.</LineReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.56, ease: EASE }}
            className="text-white/65 text-base sm:text-lg font-light leading-relaxed max-w-md"
          >
            Há mais de 20 anos combinamos tecnologia de ponta com a paixão de
            entender cada detalhe da operação hoteleira. Mais reservas, menos
            fricção — uma gestão que realmente liberta.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
