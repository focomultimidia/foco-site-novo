"use client";

import { useEffect, useRef, useState } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import type { Evento } from "../types";
import { useEventosScroll } from "../hooks/use-eventos-scroll";

// ── Asset maps — um por evento real (ids "4"/"5"/"6" eram só as duplicatas
//    removidas de social-proof-data.ts, não existem mais). ─────────────────
const EVENTO_IMAGES: Record<string, string> = {
  "1": "/assets/imgs/feiras-eventos/equipotel-2025.webp",
  "2": "/assets/imgs/feiras-eventos/expohotel-2025.webp",
  "3": "/assets/imgs/feiras-eventos/expohotel-2024.webp",
};

// Logo do evento/feira — existia na versão anterior (grayscale → cor no
// hover, ao lado do "dot" numerado da timeline) e tinha ficado de fora da
// reformulação. Volta aqui como selo no canto oposto ao "Em destaque".
const EVENTO_LOGOS: Record<string, string> = {
  "1": "/assets/imgs/feiras-eventos/equipotel.webp",
  "2": "/assets/imgs/feiras-eventos/expotel.webp",
  "3": "/assets/imgs/feiras-eventos/encatho-exprotel.webp",
};

const MOBILE_MAX = 4;

// ── EventStatusDot — o pontinho verde "Active" do steno.ai, adaptado pro
//    conteúdo real: aqui não existe uma sessão "ao vivo", mas o campo
//    `tag` já existente nos dados ("Destaque" em alguns eventos) é uma
//    condição de verdade equivalente — pulsa só nos eventos marcados como
//    destaque, em vez de simular um estado "ao vivo" que não existe. ──────
function EventStatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

// ── EventoInfoCard — logo, data e local, num card próprio na frente do card
//    principal do evento. Antes isso ficava sobreposto na foto (logo no
//    canto, data/local em texto branco por cima do gradiente) — virou um
//    cartão de identificação separado, mais fácil de ler e sem competir
//    visualmente com a foto. Sem altura própria — o pai (o par no trilho)
//    estica os dois cards pra mesma altura via `items-stretch` (default do
//    flex); aqui só centralizamos o conteúdo dentro do espaço esticado. ───
function EventoInfoCard({ evento }: { evento: Evento }) {
  return (
    <div className="flex-shrink-0 w-[150px] sm:w-[170px] xl:w-[190px] rounded-3xl bg-white border border-slate-100 shadow-lg p-5 flex flex-col items-center justify-center text-center gap-5">
      {EVENTO_LOGOS[evento.id] && (
        <img
          src={EVENTO_LOGOS[evento.id]}
          alt=""
          aria-hidden="true"
          width={140}
          height={40}
          loading="lazy"
          decoding="async"
          className="h-8 w-auto max-w-full object-contain"
        />
      )}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#285992] leading-none mb-2">
          {evento.data}
        </p>
        <span className="flex items-center justify-center gap-1 text-xs text-slate-500">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {evento.local}
        </span>
      </div>
    </div>
  );
}

// ── EventoCard — cantos arredondados, fundo claro, indicador dinâmico.
//    A vaga do "vídeo em loop / GIF de waveform" do steno.ai virou a foto
//    real do evento com Ken Burns sutil no hover — não fabricamos um
//    áudio/waveform falso pra um card de feira de hotelaria, isso não
//    existe no conteúdo real; a foto já é o "material dinâmico" genuíno
//    que a Foco tem desse evento. Logo e data/local saíram daqui — ver
//    EventoInfoCard, agora num card próprio na frente deste. ─────────────
function EventoCard({ evento }: { evento: Evento }) {
  const featured = evento.tag === "Destaque";
  return (
    <div className="group relative flex-shrink-0 w-[260px] sm:w-[300px] xl:w-[340px] rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <img
          src={EVENTO_IMAGES[evento.id] ?? EVENTO_IMAGES["1"]}
          alt={evento.titulo}
          width={480}
          height={360}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />

        {featured && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full pl-2 pr-3 py-1.5">
            <EventStatusDot />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0f172a]">Em destaque</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-[#0f172a] text-base leading-snug tracking-tight mb-2">
          {evento.titulo}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {evento.descricao}
        </p>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface EventosSectionProps {
  eventos: Evento[];
}

function EventosSection({ eventos }: EventosSectionProps) {
  // ── Pin + scroll horizontal só em desktop largo + sem reduced-motion —
  //    mesmo critério de `canScrollytell` na hero. Aqui a seção pinada nem
  //    monta fora dessa condição (ver comentário em use-eventos-scroll.ts
  //    sobre por que não dá pra só escondê-la via CSS). ────────────────────
  const [useHorizontalScroll, setUseHorizontalScroll] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const widthMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseHorizontalScroll(widthMq.matches && !motionMq.matches);
    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  useEventosScroll(useHorizontalScroll, sectionRef, trackRef, textRef);

  const [showAll, setShowAll] = useState(false);
  const total = eventos.length;

  return (
    <>
      {/* ── Desktop — pin + trilho horizontal (efeito steno.ai) ─────────── */}
      {useHorizontalScroll && (
        <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#f4f7fb]">
          {/* Texto fixo — some (fade + slide-up) nos primeiros 20% do scroll
              pinado, ver use-eventos-scroll.ts */}
          <div
            ref={textRef}
            className="absolute inset-y-0 left-0 z-20 w-[42%] xl:w-[38%] flex flex-col justify-center px-4 lg:pl-16 xl:pl-24 pr-8"
          >
            <SectionEyebrow>Eventos</SectionEyebrow>
            <h2 className="font-display text-4xl xl:text-5xl font-semibold text-[#1e3a5f] leading-[1.05] tracking-tighter antialiased mb-4">
              Presente nas principais{" "}
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                feiras de hotelaria
              </span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-md">
              Grandes redes e pousadas independentes confiam na Foco — acompanhe
              onde estivemos e onde vamos estar em seguida.
            </p>
          </div>

          {/* Trilho — `pl-[44%]` empurra o 1º par pra começar logo depois da
              coluna de texto (o "início do trilho" pedido); a partir daí o
              GSAP assume o `x` inteiro (ver use-eventos-scroll.ts). Largura
              soma sozinha pelo conteúdo (flex + flex-shrink-0 nos cards),
              não precisa de w-[300vw] chutado — o hook mede
              `track.scrollWidth` de verdade.

              Cada evento é um PAR — EventoInfoCard (logo/data/local) na
              frente do EventoCard correspondente, com um gap menor entre os
              dois do que entre pares diferentes. O par usa `items-stretch`
              (default do flex — sem classe pra isso) pra os dois cards
              ficarem na MESMA altura; o conteúdo do InfoCard se centraliza
              dentro desse espaço esticado (ver EventoInfoCard). O trilho em
              si continua com `items-center`, alinhando os PARES entre si. */}
          <div
            ref={trackRef}
            className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-6 xl:gap-8 pl-[44%] xl:pl-[40%] pr-[6vw] will-change-transform"
          >
            {eventos.map((evento) => (
              <div key={evento.id} className="flex gap-4 xl:gap-5">
                <EventoInfoCard evento={evento} />
                <EventoCard evento={evento} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Mobile / tablet / reduced-motion — pilha vertical + "Ver mais",
          idêntico ao que já existia (pin horizontal não tem um fallback
          estático razoável: um trilho pela metade, parado, é pior do que
          nunca ter tentado). ────────────────────────────────────────────── */}
      {!useHorizontalScroll && (
        <section className="relative py-20 overflow-hidden bg-[#f4f7fb]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <SectionEyebrow>Eventos</SectionEyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
                Presente nas principais{" "}
                <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                  feiras de hotelaria
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {eventos.slice(0, showAll ? undefined : MOBILE_MAX).map((evento, i) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: (i % MOBILE_MAX) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={EVENTO_IMAGES[evento.id] ?? EVENTO_IMAGES["1"]}
                        alt={evento.titulo}
                        width={555}
                        height={304}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      {evento.tag === "Destaque" && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full pl-2 pr-3 py-1">
                          <EventStatusDot />
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#0f172a]">Em destaque</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#285992] mb-0.5">
                        {evento.data}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {evento.local}
                      </span>
                      <h3 className="font-display font-semibold text-[#0f172a] text-sm leading-snug tracking-tight mb-1">
                        {evento.titulo}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {evento.descricao}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {!showAll && total > MOBILE_MAX && (
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  onClick={() => setShowAll(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#285992] bg-white border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                >
                  Ver mais eventos ({total - MOBILE_MAX} restantes)
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export { EventosSection };
