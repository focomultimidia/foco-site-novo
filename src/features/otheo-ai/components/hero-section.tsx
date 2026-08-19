"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * HeroSection — thesis do produto, não um resumo dele. O elemento
 * assinatura aqui é o vídeo real do Theo (video-theo.mp4, o mesmo do
 * OtheoAiTeaserSection) como textura ambiente atrás do mockup, bem
 * escurecido/borrado — não é "um vídeo tocando na tela", é atmosfera. O
 * mockup em si usa o print real do produto (chat-ia.jpg) dentro da MESMA
 * moldura de vidro fosco já estabelecida em HeroMobileMockup
 * (hero-section.tsx da home) e no OtheoAiTeaserSection — aqui ela vira a
 * peça central, não um acessório no canto.
 *
 * Badge acima do título reaproveita o mesmo texto/selo do
 * OtheoAiTeaserSection (home) — quem clica no teaser e chega aqui vê o
 * mesmo carimbo "Novidade", reforçando que é a mesma coisa. `pt-24 sm:pt-28
 * lg:pt-32` (era pt-16/20, curto demais): o header é `fixed` e mede ~90px
 * de altura parado no topo — com menos que isso o menu ficava colado ou
 * sobrepondo o badge/título (mesmo valor já usado em sobre/hero-section.tsx,
 * outra hero sem `min-h-dvh`).
 */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#10233d] pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24">
      {/* Vídeo do Theo — textura ambiente, não protagonista. Opacidade e
          escurecimento fortes de propósito: é o mesmo asset do teaser da
          home, mas aqui ele é pano de fundo pro mockup real, não o próprio
          conteúdo. Sem `useInViewOnce`: já está acima da dobra, adiar o
          mount só atrasaria o efeito sem ganhar nada. */}
      <video
        src="/assets/videos/home/video-theo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 -z-20 w-full h-full object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#10233d] via-[#10233d]/90 to-[#10233d]" />

      {/* Aurora — mesmo vocabulário do resto do site, dourado ganha mais
          peso aqui (é a cor do "insight", ver raciocinio-section.tsx). */}
      <div aria-hidden="true" className="absolute -inset-[10%] -z-10 overflow-hidden" style={{ filter: "blur(80px)", opacity: 0.6 }}>
        <div
          className="absolute w-[480px] h-[480px] -left-32 top-0 rounded-full motion-safe:animate-aurora-a"
          style={{ background: "radial-gradient(circle, rgba(66,122,185,0.5), transparent 70%)" }}
        />
        <div
          className="absolute w-[420px] h-[420px] -right-24 bottom-0 rounded-full motion-safe:animate-aurora-c"
          style={{ background: "radial-gradient(circle, rgba(252,204,48,0.28), transparent 70%)" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-14 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center lg:text-left order-1 lg:order-1"
          >
            <span
              className="inline-flex items-center gap-2.5 border border-white/15 bg-white/8 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6"
            >
              <span className="w-1.5 h-1.5 bg-[#fccc30] rounded-full animate-pulse" />
              Novidade · Inteligência Artificial
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tighter leading-[1.05] mb-6">
              O hotel inteiro,{" "}
              <span className="bg-gradient-to-r from-[#fccc30] via-[#ffe28a] to-[#fccc30] bg-clip-text text-transparent">
                a uma pergunta de distância
              </span>
              .
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-9">
              Otheo entende sua operação e age por você: ocupação, tarifas e disponibilidade,
              em português, de qualquer lugar.
            </p>
            <a
              href="#contato"
              className="group inline-flex items-center gap-2.5 bg-[#fccc30] text-[#132840] font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#fccc30]/25 hover:shadow-[#fccc30]/45 hover:-translate-y-0.5"
            >
              Solicite uma demonstração
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative order-2 lg:order-2 flex items-center justify-center"
          >
            {/* Halo pulsante atrás do mockup — mesma técnica do teaser
                (otheo-ai-teaser-section.tsx), reaproveitada aqui como peça
                central em vez de acessório de canto. */}
            <div
              aria-hidden="true"
              className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full blur-3xl motion-safe:animate-[otheo-hero-halo_4s_ease-in-out_infinite]"
              style={{ background: "radial-gradient(circle, rgba(252,204,48,0.4), transparent 70%)" }}
            />
            <style>{`
              @keyframes otheo-hero-halo {
                0%, 100% { transform: scale(1); opacity: 0.6; }
                50%      { transform: scale(1.15); opacity: 0.9; }
              }
            `}</style>

            {/* Wrapper "justo" — ao contrário do palco (`stage`) acima, que
                é item de grid e se ESTICA pra preencher a coluna
                (0.9fr, bem mais largo que os 220-280px do mockup), este
                `div` comum não estica: encolhe exatamente do tamanho do
                mockup grande, seu único filho em fluxo normal. É essa
                caixa justa — não a coluna larga — que serve de referência
                pro `left`/`top` do mockup pequeno e pro `right`/`bottom` do
                chip logo abaixo; sem ela, os dois calculavam a posição a
                partir da borda da coluna (bem mais longe do mockup do que
                parece) em vez da borda real do mockup. */}
            <div className="relative">
              {/* Segundo mockup, menor, atrás do principal — mesma moldura
                  de vidro fosco, ~78% do tamanho do mockup grande. `z-0`
                  (o mockup grande logo abaixo é `z-10`) garante que ele
                  fique por trás; `left` negativo o empurra pra fora da
                  borda esquerda do mockup grande, então ele espia PELO LADO
                  (não por baixo) — o `top` só desce um pouco a partir do
                  centro vertical, pra dar profundidade sem virar um
                  peek embaixo. A sobreposição (em sm/lg, ~20% da largura
                  deste mockup) vem do `ml` no mockup grande logo abaixo —
                  ele empurra pra direita sem mexer no `left` daqui, e como
                  o wrapper "justo" encolhe pro tamanho do grande (único
                  filho em fluxo), a borda direita dele — e o chip que se
                  ancora nela — andam junto. No mobile (`base`, sem prefixo)
                  `left`/`ml` são menores de propósito — os valores calibrados
                  pro desktop deixavam a dupla larga demais pra caber num
                  viewport de ~375px, com o mockup pequeno "colado"/cortado na
                  borda esquerda da tela; aqui a prioridade é a dupla caber
                  centralizada com folga, não bater os mesmos 20%. */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
                className="absolute z-0 w-[175px] sm:w-[205px] lg:w-[220px] rounded-[30px] p-2 -left-4 sm:-left-20 lg:-left-24 top-8 sm:top-10 lg:top-12"
                style={{
                  background: "rgba(16,35,61,0.55)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "2px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 24px 60px -20px rgba(0,0,0,0.55)",
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[22px] ring-1 ring-white/15"
                  style={{ aspectRatio: "738 / 1456" }}
                >
                  <img
                    src="/assets/imgs/otheo-ai/mockup.webp"
                    alt="Otheo AI listando reservas com check-in hoje, direto no chat"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Moldura de vidro fosco escuro — mesma família visual do
                  HeroMobileMockup (home) e do OtheoAiTeaserSection, agora em
                  tamanho de protagonista. */}
              <div
                className="relative z-10 w-[220px] sm:w-[260px] lg:w-[280px] rounded-[36px] p-2.5 ml-20 sm:ml-[84px] lg:ml-[80px]"
                style={{
                  background: "rgba(16,35,61,0.55)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "2px solid rgba(255,255,255,0.22)",
                  boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[26px] ring-1 ring-white/15"
                  style={{ aspectRatio: "738 / 1456" }}
                >
                  <img
                    src="/assets/imgs/home/otheoai/chat-ia.webp"
                    alt="Otheo AI respondendo um comando na extranet do hotel, via chat"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Selo Beta — mesmo vidro fosco + borda fina + pontinho
                    pulsante das outras chips premium desta hero (ver o chip
                    "Pronto para ajudar" logo abaixo, e o LiveDot de
                    PilaresSection) em vez de um adesivo dourado sólido —
                    fica no MESMO vocabulário visual do resto do site em vez
                    de introduzir um material novo. Mesmo tratamento
                    replicado no OtheoAiTeaserSection (home), de propósito —
                    quem vê o teaser e chega aqui reconhece o mesmo selo. */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                  className="absolute z-20 -top-3 -right-3 sm:-top-4 sm:-right-4 motion-safe:animate-badge-float"
                >
                  <div
                    className="flex items-center gap-2 rounded-full pl-2.5 pr-3.5 py-2 whitespace-nowrap"
                    style={{
                      background: "rgba(16,35,61,0.75)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      border: "1px solid rgba(252,204,48,0.4)",
                      boxShadow: "0 16px 40px -16px rgba(0,0,0,0.55), 0 0 20px -4px rgba(252,204,48,0.25)",
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                      <span aria-hidden="true" className="absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping" style={{ background: "#fccc30" }} />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#fccc30" }} />
                    </span>
                    <span className="text-[#fccc30] text-[10px] font-mono font-semibold uppercase tracking-[0.16em]">
                      Beta
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Chip de estado — semântico (o produto está ativo/pronto),
                  não decorativo; único badge flutuante da hero. Só em
                  desktop: no mobile ele flutuava sobre/por cima do mockup e
                  ficava cortado na borda da tela (pedido explícito pra
                  remover). */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
                className="hidden lg:block absolute lg:bottom-2 lg:left-auto lg:-right-6 lg:translate-x-0 z-20 motion-safe:animate-badge-float"
              >
                <div
                  className="flex items-center gap-2 rounded-full pl-2.5 pr-4 py-2 whitespace-nowrap"
                  style={{
                    background: "rgba(16,35,61,0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span className="w-6 h-6 rounded-full bg-[#fccc30]/15 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-[#fccc30]" strokeWidth={2} />
                  </span>
                  <span className="text-white text-xs font-medium">Pronto para ajudar, em português</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
