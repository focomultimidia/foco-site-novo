"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText, Zap, ShieldCheck } from "lucide-react";
import { useScrollPinScale } from "@/features/shared/hooks/use-scroll-pin-scale";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Badges flutuantes ao redor do Theo — só ilustrativos, não são CTAs
//    (o pedido foi "apenas uma chamada"). Mesma técnica de flutuação idle
//    (motion-safe:animate-badge-float) já usada na hero da home. ──────────
const CAPACIDADES = [
  { Icon: MessageSquareText, label: "Comandos em português", className: "top-[4%] -left-6 sm:-left-14 lg:-left-16", floatDelay: 0 },
  { Icon: Zap, label: "Executa na hora", className: "top-[50%] -right-6 sm:-right-14 lg:-right-16", floatDelay: 0.6 },
  { Icon: ShieldCheck, label: "Sem sair da extranet", className: "bottom-[2%] -left-2 sm:-left-10 lg:-left-12", floatDelay: 1.2 },
] as const;

/**
 * OtheoAiTeaserSection — um único chamado, de impacto, apresentando o
 * Otheo AI na home. Não tenta replicar o cockpit inteiro (isso já existe
 * em /otheo-ai) — aqui é só o "trailer": vídeo do Theo em destaque com um
 * halo pulsante, título, uma frase e UM botão. O vídeo substituiu o
 * mascote placeholder (ícone) que existia aqui antes — a logo/mascote em
 * SVG dos outros lugares (header docado, chat drawer) continuam
 * placeholder até os arquivos reais chegarem, mas ESTE hero visual já é
 * conteúdo real (video-theo.mp4).
 *
 * Scroll-Triggered Scale, versão "pin": em vez de acompanhar livremente a
 * posição de scroll (a v1 fazia isso e passava rápido demais), a seção
 * agora TRAVA no topo da tela assim que chega lá — o usuário fica "preso"
 * ali por uma janela de scroll bem maior (140% da viewport) enquanto o
 * card materializa (cresce + aparece + desfoca), e ainda sobra um respiro
 * parado no final antes de destravar. Ver useOtheoScaleScroll — mesma
 * técnica de pin+scrub (GSAP ScrollTrigger), agora compartilhada em
 * `useScrollPinScale` (mesmo efeito replicado em ReservaSection e
 * CardapioDigitalSection).
 * Só roda em desktop largo + sem reduced-motion (`canPinScroll`); no
 * mobile/touch ou com menos movimento pedido, vira um fade+scale simples
 * de "dispara uma vez ao entrar na tela", sem pin (pin em touch tende a
 * brigar com barra de endereço retrátil e teclado virtual).
 */
function OtheoAiTeaserSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [canPinScroll, setCanPinScroll] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const widthMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanPinScroll(widthMq.matches && !motionMq.matches);
    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  useScrollPinScale(canPinScroll, sectionRef, cardRef);

  // O vídeo de fundo tem `autoPlay`, que faz o navegador ignorar o hint de
  // `preload` e baixar/tocar assim que o elemento existe no DOM — mesmo
  // fora da tela. Em vez de mexer no `preload`, adiamos o MOUNT do próprio
  // <video> até a seção chegar perto da viewport (reusa o mesmo sectionRef
  // que o GSAP já observa acima, sem precisar de um segundo ref). Uma vez
  // montado, autoplay/loop funcionam exatamente como antes — o usuário só
  // vê a seção quando já rolou até ali de qualquer forma, então não há
  // diferença perceptível, só menos banda gasta por quem nunca chega lá.
  const { inView: videoInView } = useInViewOnce(sectionRef, "400px");

  return (
    <>
      <style>{`
        @keyframes otheo-halo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.15); opacity: 0.85; }
        }
        .otheo-halo { animation: otheo-halo-pulse 4s ease-in-out infinite; }

        /* Card do resumo — só no mobile/tablet, mesmo vidro fosco da badge
           "Novidade · Inteligência Artificial" (border + background sutis
           em rgba), pra dar mais contraste/legibilidade ao parágrafo por
           cima do vídeo. Em lg+ o texto já tem espaço de sobra ao lado do
           mockup e volta a ficar solto, sem o card. */
        .otheo-summary-card {
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
        }
        @media (min-width: 1024px) {
          .otheo-summary-card {
            border: none;
            background: transparent;
          }
        }
      `}</style>

      {/*
        A seção em si só dá o respiro vertical e mostra a mesma superfície
        clara dos vizinhos (`#f4f7fb`), então o card "flutua" sobre a
        página em vez de esticar de ponta a ponta. O card era escuro
        (`#0b1a2e`) e virou um degradê radial claro (branco → cinza),
        pedido explícito — por isso ganhou uma borda branca + sombra
        própria: sem isso, ficaria quase impossível de distinguir da
        superfície clara da seção ao redor.
      */}
      <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#f4f7fb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card gigante — bordas bem arredondadas. Em desktop largo, o
              GSAP (useOtheoScaleScroll) manipula scale/opacity/blur direto
              no nó via ref — por isso NENHUM `initial`/`animate` do Framer
              é passado nesse caso (as duas engines nunca disputam o mesmo
              `transform` no mesmo elemento, mesma regra de sempre). No
              fallback (mobile/reduced-motion), é um `whileInView` comum. */}
          <motion.div
            ref={cardRef}
            {...(!canPinScroll && {
              initial: { opacity: 0, scale: 0.88, filter: "blur(8px)" },
              whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
              viewport: { once: true, margin: "-100px" },
              transition: { duration: 0.8, ease: EASE },
            })}
            className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] lg:rounded-[56px] border border-white shadow-[0_30px_90px_-24px_rgba(15,40,80,0.22)] px-6 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24"
            style={{ background: "#c9d0da" }}
          >
            {/* Vídeo do Theo como background do card inteiro — nítido, sem
                nenhum véu/scrim por cima (pedido explícito: "totalmente
                nítido, sem transparência"). O fundo do vídeo já é claro
                (cinza bem próximo do gradiente do card), então o texto da
                coluna esquerda continua legível mesmo sem overlay.

                Só MONTA quando `videoInView` (ver useInViewOnce acima) —
                até lá, a cor sólida no `style` do card acima (mesmo tom do
                fundo do vídeo) segura o lugar sem flash perceptível. */}
            {videoInView && (
              <video
                src="/assets/videos/home/video-theo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 -z-20 w-full h-full object-cover"
              />
            )}

            {/* Aurora azul + dourada, versão clara — mesma técnica das seções
                escuras (blobs desfocados em deriva lenta), só que com muito
                menos intensidade: aqui é um véu de cor bem sutil sobre o
                branco, não um brilho contra o escuro. */}
            <div aria-hidden="true" className="absolute -inset-[10%] -z-10 overflow-hidden" style={{ filter: "blur(70px)", opacity: 0.55 }}>
              <div
                className="absolute w-[480px] h-[480px] -right-24 -top-20 rounded-full motion-safe:animate-aurora-a"
                style={{ background: "radial-gradient(circle, rgba(252,204,48,0.22), transparent 70%)" }}
              />
              <div
                className="absolute w-[520px] h-[520px] -left-32 bottom-0 rounded-full motion-safe:animate-aurora-b"
                style={{ background: "radial-gradient(circle, rgba(66,122,185,0.28), transparent 70%)" }}
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 pointer-events-none opacity-[0.04] mix-blend-multiply"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

          {/* Texto à esquerda / placeholder mobile à direita, cada um com
              largura CURTA e empurrado pra sua borda — o espaço do meio
              (spacer, sem conteúdo) fica livre pro mascote do vídeo
              respirar, sem nada por cima dele. Antes era um `grid-cols-2`
              de 50/50, e o texto (largo) acabava sobrepondo o mascote. */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-6">

            {/* ── Texto — eyebrow, logo, título, frase, UM botão. Reformulado
                pro vídeo de fundo ESCURO (antes era claro): eyebrow e logo
                eram desenhados pra fundo claro (texto navy #1e3a5f quase
                invisível em cima do vídeo escuro; a logo em si usa tinta
                #001D36 / #004480, também escura demais) — viraram versões
                claras. Título e parágrafo já estavam em branco.

                Nota técnica: os opacity-modifiers "soltos" do Tailwind
                (classes tipo bg-white/8, text-white/92) SILENCIOSAMENTE
                não geram regra nesse projeto quando o número não é um dos
                steps padrão da escala (5,10,20,25,30...) — confirmado
                inspecionando o CSS gerado. Por isso as cores/opacidades
                aqui viraram atributo style inline (100% confiável) em vez
                de classes de opacidade arbitrária; border com opacidade
                continua OK como classe (esse core plugin não tem esse
                bug). ──────────────────────────────────────────────────── */}
            <div className="text-center lg:text-left order-1 lg:order-1 max-w-md lg:max-w-[320px] xl:max-w-[360px] mx-auto lg:mx-0 shrink-0">
              <span
                className="inline-flex items-center gap-2.5 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-5"
                style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.08)" }}
              >
                <span className="w-1.5 h-1.5 bg-[#fccc30] rounded-full animate-pulse" />
                Novidade · Inteligência Artificial
              </span>

              {/* A marca do produto — estática, sem halo pulsante nem
                  flutuação. Logo original é tinta escura (#001D36 /
                  #004480), desenhada pra fundo claro; vira silhueta
                  branca via filtro (mesma técnica já usada no hover do
                  CertCard) pra ficar legível em cima do vídeo escuro. */}
              <img
                src="/assets/imgs/home/logotheoai.svg"
                alt="Otheo AI"
                width={477}
                height={93}
                className="h-8 sm:h-9 w-auto mb-7 mx-auto lg:mx-0"
                style={{ filter: "brightness(0) invert(1) drop-shadow(0 2px 10px rgba(0,0,0,0.35))" }}
              />

              <h2
                className="font-display font-semibold text-4xl sm:text-5xl text-white leading-[1.08] tracking-tighter antialiased mb-5"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)" }}
              >
                Seu copiloto de IA na operação do hotel.
              </h2>

              <div className="otheo-summary-card backdrop-blur-sm rounded-2xl px-5 py-4 lg:px-0 lg:py-0 lg:backdrop-blur-none mb-9">
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 14px rgba(0,0,0,0.55)" }}
                >
                  Abra vendas, feche check-ins, consulte reservas ou gerencie bloqueios,
                  tudo em português, com um comando. O Otheo AI entende sua operação e
                  executa por você.
                </p>
              </div>

              <Link
                to="/otheo-ai"
                className="group inline-flex items-center gap-2 bg-[#fccc30] text-[#132840] font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#fccc30]/25 hover:shadow-[#fccc30]/45 hover:-translate-y-0.5"
              >
                Quero saber como funciona
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Espaço vazio central — sem conteúdo nenhum, só respiro pro
                mascote do vídeo aparecer inteiro entre as duas colunas.
                `lg:order-2`: fica ENTRE o texto (order-1) e o visual
                (order-3) — sem isso, um spacer sem `order` explícito
                herdava `order:0` e furava pra frente do texto no
                `flex-row`, empurrando o texto pro centro/direita. */}
            <div className="hidden lg:block lg:order-2 flex-1" aria-hidden="true" />

            {/* ── Visual — halo pulsante + badges ilustrativas + o espaço
                reservado (placeholder), agora em formato de TELA DE
                CELULAR (9:19.5, mesma proporção do mockup mobile da hero) —
                é onde entra um print mobile do Otheo AI rodando dentro da
                extranet. Painel opaco de propósito: cobre o vídeo nítido
                que corre atrás do card inteiro, então esse recorte fica
                "vazio" (pronto pra receber a imagem) em vez de deixar o
                vídeo aparecer por trás dele. ─────────────────────────── */}
            <div className="relative order-2 lg:order-3 flex items-center justify-center shrink-0 h-[300px] sm:h-[360px] lg:h-[400px] mx-auto lg:mx-0">
              <div
                aria-hidden="true"
                className="otheo-halo absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(252,204,48,0.35), transparent 70%)" }}
              />

              {/* Moldura de vidro fosco escuro — mesma família visual do
                  mockup mobile da hero (HeroMobileMockup em hero-section.tsx),
                  aqui sem a complexidade de `fluidPx`/`isWideLayout` porque
                  esta seção não escala fluida como a hero. Proporção real do
                  print (738×1456, medida do arquivo) em vez do 9:19.5
                  chutado do placeholder anterior — `object-cover` já não
                  cortaria nada mesmo, mas a proporção exata evita qualquer
                  distorção. Sem "notch" sintético: o print já é uma tela
                  cheia (barra de status própria bem no topo), um entalhe
                  desenhado por cima colidiria com o cabeçalho "Hotel
                  Village..." que começa bem perto da borda. */}
              <div
                className="relative z-10 w-[190px] sm:w-[220px] lg:w-[240px] rounded-[30px] p-2"
                style={{
                  background: "rgba(16,35,61,0.55)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "2px solid rgba(255,255,255,0.22)",
                  boxShadow: "0 24px 60px -24px rgba(15,40,80,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[22px] ring-1 ring-white/15"
                  style={{ aspectRatio: "738 / 1456" }}
                >
                  <img
                    src="/assets/imgs/home/otheoai/chat-ia.webp"
                    alt="Otheo AI respondendo um comando na extranet do hotel, via chat"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Selo Beta — mesmo vidro fosco + borda fina + pontinho
                    pulsante das chips CAPACIDADES logo abaixo e do LiveDot
                    de PilaresSection, em vez de um adesivo dourado sólido —
                    fica no mesmo vocabulário visual do resto do site.
                    Tratamento idêntico ao da hero de /otheo-ai, de
                    propósito: quem vê o teaser aqui e depois abre a página
                    reconhece o mesmo selo. */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                  className="absolute z-20 -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 motion-safe:animate-badge-float"
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

              {CAPACIDADES.map(({ Icon, label, className, floatDelay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                  className={`absolute z-20 ${className}`}
                >
                  <div
                    className="motion-safe:animate-badge-float flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#285992]/15 rounded-2xl pl-2.5 pr-3.5 py-2 shadow-[0_16px_32px_-16px_rgba(15,40,80,0.25)]"
                    style={{ animationDelay: `${floatDelay}s` }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}
                    >
                      <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
                    </div>
                    <span className="text-[#1e3a5f] text-xs font-semibold whitespace-nowrap">{label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export { OtheoAiTeaserSection };
