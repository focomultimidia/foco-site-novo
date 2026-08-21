"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReservaScroll } from "../hooks/use-reserva-scroll";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Data (original content — unchanged) ──────────────────────────────────────
// Uma imagem própria por passo agora (antes as 4 dividiam o mesmo mockup
// genérico) — renders 3D em fundo branco, a mesma linguagem visual do site
// de referência (echofi-bp.webflow.io/#how-it-works).
const PASSOS = [
  {
    numero: "01",
    titulo: "Recuperação automática de reservas",
    descricao:
      "Envie lembretes por e-mail e WhatsApp para retomar o contato com hóspedes que iniciaram a reserva, mas não finalizaram.",
    imagem: "/assets/imgs/site-hoteleiro/recursos/recuperacao-reserva.png",
  },
  {
    numero: "02",
    titulo: "Reserva finalizada em segundos",
    descricao:
      "Com a integração total entre site e motor, seu hóspede conclui a reserva de forma simples e imediata.",
    imagem: "/assets/imgs/site-hoteleiro/recursos/reserva-finalizada.png",
  },
  {
    numero: "03",
    titulo: "Gatilhos e alertas de urgência",
    descricao:
      'Ative recursos como "pouca disponibilidade", contadores, descontos, comparador de preços e outros estímulos à decisão.',
    imagem: "/assets/imgs/site-hoteleiro/recursos/gatilhos-ofertas.png",
  },
  {
    numero: "04",
    titulo: "Pagamento facilitado e completo",
    descricao:
      "Aceite Pix e todas as bandeiras de cartão de crédito, incentivando a compra online com um processo rápido e confiável.",
    imagem: "/assets/imgs/site-hoteleiro/recursos/pagamento-facilitado.png",
  },
] as const;

const HEADER = (
  <>
    <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-3">
      Seu hóspede sem trabalho para{" "}
      <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
        finalizar a reserva
      </span>
    </h2>
    <p className="text-gray-500 text-lg">
      A integração com o motor de reservas da Foco garante um fluxo de
      navegação fluido e conversão otimizada.
    </p>
  </>
);

// ── Item de passo (desktop, trilho pinado) ───────────────────────────────────
// Imagem grande ancorada à direita do item; o card de título/resumo flutua
// por cima, começando na borda esquerda do item e sobrepondo a borda
// esquerda da imagem (efeito editorial em camadas, não lado a lado). O
// card nunca tem altura forçada — só `w-[...]` + padding, a altura vem do
// próprio conteúdo — é isso que evita o corte de texto que a versão
// anterior tinha (lá a largura fixa era estreita demais pro texto quebrar
// em poucas linhas, e a linha de código empurrava o card pra fora do
// espaço que ele tinha). Sem numeração — o conteúdo não é uma sequência
// de passos.
function PassoItem({ passo }: { passo: (typeof PASSOS)[number] }) {
  return (
    <div className="group relative h-full w-full">
      <motion.img
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        src={passo.imagem}
        alt={passo.titulo}
        width={500}
        height={334}
        loading="lazy"
        decoding="async"
        className="absolute top-0 right-0 h-full w-auto object-contain rounded-[24px]"
        style={{ filter: "drop-shadow(0 20px 44px rgba(15,40,80,0.22))" }}
      />

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[250px] xl:w-[290px] rounded-[24px] bg-white p-5 xl:p-6"
        style={{ boxShadow: "0 8px 16px rgba(15,40,80,0.07), 0 32px 64px -20px rgba(15,40,80,0.32)" }}
      >
        <h3 className="font-display text-lg xl:text-xl font-semibold text-[#1e293b] tracking-tight leading-snug mb-2">
          {passo.titulo}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-slate-500">
          {passo.descricao}
        </p>
      </div>
    </div>
  );
}

// ── Item de passo (mobile / reduced-motion, empilhado) ───────────────────────
// A sobreposição do desktop depende de posicionamento absoluto dentro de
// uma caixa de altura fixa (o item do trilho) — não existe fora desse
// contexto. Aqui o card fica em fluxo normal, sem nenhuma altura forçada,
// então nunca corta texto: cresce o quanto precisar.
function PassoItemStacked({ passo }: { passo: (typeof PASSOS)[number] }) {
  return (
    <div>
      <img
        src={passo.imagem}
        alt={passo.titulo}
        width={500}
        height={334}
        loading="lazy"
        decoding="async"
        className="w-full max-w-[320px] mx-auto h-auto object-contain rounded-[24px] mb-5"
        style={{ filter: "drop-shadow(0 16px 32px rgba(15,40,80,0.18))" }}
      />
      <div
        className="rounded-[24px] bg-white p-5 xl:p-6 max-w-[320px] mx-auto"
        style={{ boxShadow: "0 8px 16px rgba(15,40,80,0.06), 0 24px 48px -20px rgba(15,40,80,0.20)" }}
      >
        <h3 className="font-display text-lg font-semibold text-[#1e293b] tracking-tight leading-snug mb-2">
          {passo.titulo}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-slate-500">
          {passo.descricao}
        </p>
      </div>
    </div>
  );
}

// ── Régua de progresso — linha própria no fluxo do flex-col da seção
// (nunca mais absoluta sobre o trilho — era essa sobreposição que cortava
// os cards no meio). Cada passo recebe 1/total do scroll pinado (ver
// use-reserva-scroll.ts), então a estação ativa sempre bate certo com o
// card que está no centro do palco naquele instante. ────────────────────
function ProgressoRail({ activeIndex }: { activeIndex: number }) {
  const total = PASSOS.length;
  const activePct = ((activeIndex + 0.5) / total) * 100;

  return (
    <div className="shrink-0 px-[6vw] pb-8 xl:pb-10 pt-3">
      <div className="relative h-px w-full bg-[#1e3a5f]/12">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg,#285992,#427ab9)" }}
          animate={{ width: `${activePct}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
        {PASSOS.map((passo, i) => {
          const isActive = i === activeIndex;
          const leftPct = ((i + 0.5) / total) * 100;
          return (
            <div
              key={passo.numero}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${leftPct}%` }}
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.7 : 1,
                  backgroundColor: isActive ? "#fccc30" : "#285992",
                }}
                transition={{ duration: 0.3, ease: EASE }}
                className="block w-2.5 h-2.5 rounded-full ring-4 ring-[#f4f7fb]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function ReservaSection() {
  // Pin + scroll horizontal só em desktop largo + sem reduced-motion —
  // mesmo critério da EventosSection/FuncionalidadesSection (ver
  // use-reserva-scroll.ts). A seção pinada nem monta fora dessa condição:
  // um trilho oculto via CSS mede largura 0 e quebra o cálculo do pin.
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useReservaScroll(useHorizontalScroll, sectionRef, trackRef, PASSOS.length, setActiveIndex);

  return (
    <>
      {/* ── Desktop — pin + trilho horizontal + régua de progresso (efeito
          "steno.ai", mesma mecânica de Eventos/Funcionalidades) ─────────── */}
      {useHorizontalScroll && (
        <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#f4f7fb] flex flex-col">
          {/* Glow ambiente — sutil, só reforça profundidade atrás do trilho */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(66,122,185,0.10), transparent 70%)",
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-6 relative z-10 shrink-0">
            <div className="max-w-2xl">{HEADER}</div>
          </div>

          {/* Trilho — cards com altura FIXA (não mais `h-full` esticando até
              o teto da faixa `flex-1`): com a imagem virando faixa lateral
              (ver PassoCard), o card fica mais baixo e mais largo, então
              `items-center` no trilho centraliza essa altura menor dentro
              do espaço disponível, em vez de forçar o card a preencher
              tudo. Largura maior em vw — imagem lateral + texto ao lado
              pede mais espaço horizontal do que o layout empilhado
              anterior. O hook mede `track.scrollWidth` de verdade e mapeia
              o scroll 1:1 pro `x` (ver use-reserva-scroll.ts). */}
          <div className="relative flex-1 min-h-0">
            <div
              ref={trackRef}
              className="h-full flex items-center gap-6 xl:gap-8 pl-[6vw] pr-[6vw] will-change-transform"
            >
              {PASSOS.map((passo) => (
                <div
                  key={passo.numero}
                  className="h-full max-h-[320px] xl:max-h-[380px] w-[66vw] xl:w-[50vw] max-w-[820px] flex-shrink-0"
                >
                  <PassoItem passo={passo} />
                </div>
              ))}
            </div>
          </div>

          <ProgressoRail activeIndex={activeIndex} />
        </section>
      )}

      {/* ── Mobile / tablet / reduced-motion — grid estático empilhado,
          mesmo padrão de fallback da FuncionalidadesSection (pin horizontal
          não tem um fallback estático razoável). ───────────────────────── */}
      {!useHorizontalScroll && (
        <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.72, ease: EASE }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              {HEADER}
            </motion.div>

            <div className="flex flex-col gap-5">
              {PASSOS.map((passo, i) => (
                <motion.div
                  key={passo.numero}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                >
                  <PassoItemStacked passo={passo} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export { ReservaSection };
