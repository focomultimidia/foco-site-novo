"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check, Smartphone } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { PRODUTOS_DATA } from "@/features/shared/data/produtos-data";
import type { ProdutoItem } from "@/features/shared/data/produtos-data";

// Backward-compat alias so existing imports of ProdutoData still resolve.
export type { ProdutoItem as ProdutoData };

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// `titulo` is authored as "Nome do produto: resto da frase". Splitting it
// lets the name read as the heading and the rest as a quieter subtitle.
function splitTitulo(titulo: string): { nome: string; subtitulo: string } {
  const idx = titulo.indexOf(":");
  if (idx === -1) return { nome: titulo, subtitulo: "" };
  return { nome: titulo.slice(0, idx).trim(), subtitulo: titulo.slice(idx + 1).trim() };
}

// ── Section header ────────────────────────────────────────────────────────────

function ShowcaseHeader({ animate }: { animate: boolean }) {
  const content = (
    <div className="text-center mb-16 lg:mb-20">
      <SectionEyebrow>A plataforma</SectionEyebrow>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#1e3a5f] leading-[1.05] tracking-tighter antialiased mb-5 max-w-3xl mx-auto">
        Sistema para hotéis e pousadas{" "}
        <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
          aprovado por 97%
        </span>{" "}
        dos nossos clientes
      </h2>
      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Da reserva à gestão financeira, nossa plataforma reúne produtos inovadores
        para otimizar cada detalhe do seu hotel ou pousada
      </p>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {content}
    </motion.div>
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────

interface ProductCardProps {
  produto:             ProdutoItem;
  index:               number;
  withEntryAnimation?: boolean;
}

function ProductCard({ produto, index, withEntryAnimation = false }: ProductCardProps) {
  const { Icone: Icon } = produto;
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  // Cursor position across the card, normalised to -1…1 on both axes.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 110, damping: 20, mass: 0.5 });

  // The stage tilts against the cursor, so the screen reads as a physical
  // object suspended in the card rather than a flat image.
  const rotateY = useTransform(sx, [-1, 1], [10, -10]);
  const rotateX = useTransform(sy, [-1, 1], [-7, 7]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  const card = (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-full rounded-[36px]
                 shadow-[0_8px_20px_-14px_rgba(15,40,80,0.20),0_34px_70px_-34px_rgba(15,40,80,0.42)]
                 transition-shadow duration-500
                 hover:shadow-[0_10px_24px_-14px_rgba(15,40,80,0.26),0_52px_96px_-38px_rgba(15,40,80,0.55)]"
    >
      {/* Shell — carries the 5px glass frame. A silhueta agora é um retângulo
          arredondado limpo: o entalhe no canto inferior direito existia só para
          acomodar o botão circular, que passou para dentro do card.
          Raios concêntricos: 36 − 5 = 31. */}
      <div
        className="h-full rounded-[36px] p-[5px]
                   bg-gradient-to-br from-white/75 via-white/25 to-white/[0.03]"
      >
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-[31px]
                   bg-white/45 backdrop-blur-2xl
                   ring-1 ring-inset ring-white/60"
      >
      {/* Receding grid floor — the horizon the screen hovers above */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [perspective:420px] opacity-[0.5]">
        <div
          className="absolute inset-0 origin-bottom [transform:rotateX(74deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(40,89,146,0.16) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(40,89,146,0.16) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            WebkitMaskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
            maskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
          }}
        />
      </div>

      {/* Inner top highlight — catches light along the card's upper edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px
                   bg-gradient-to-r from-transparent via-white to-transparent"
      />

      {/* ── Copy ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-7 sm:p-9 sm:max-w-[50%]">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-3xl
                          bg-[#285992]/[0.08] ring-1 ring-inset ring-[#285992]/15
                          transition-transform duration-500 group-hover:-translate-y-0.5">
            <Icon className="h-5 w-5 text-[#285992]" />
          </div>
          <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-[#1e3a5f]">
            {produto.titulo}
          </h3>
        </div>

        <p className="text-[14px] leading-relaxed text-slate-600 mb-6">
          {produto.descricao}
        </p>

        {/* Badges — mesmo material das chips do SoftwareProductsCarousel:
            pílula clara com borda slate e o check num disco tingido de marca.
            Aqui elas continuam em wrap (o card é largo), não em coluna. */}
        <ul className="flex flex-wrap gap-2">
          {produto.beneficios.map((b) => (
            <li
              key={b}
              className="flex items-center gap-1.5 rounded-full border border-slate-200/80
                         bg-slate-50/80 py-1.5 pl-1.5 pr-3"
            >
              <span
                className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#28599214" }}
              >
                <Check className="h-2.5 w-2.5 text-[#285992]" strokeWidth={3.5} />
              </span>
              <span className="text-[10.5px] font-medium leading-none text-slate-700">
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Ação — só o ícone, num disco. Mesma marca do botão do
            SoftwareProductsCarousel, abaixo das badges e alinhada à esquerda. */}
        <a
          href={produto.link}
          aria-label={`Conhecer ${produto.titulo}`}
          className="group/btn mt-7 flex h-12 w-12 items-center justify-center rounded-full
                     bg-[#1e3a5f]
                     transition-[background-color,transform] duration-300
                     hover:scale-105 hover:bg-[#285992]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992] focus-visible:ring-offset-2
                     motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          <ArrowUpRight
            className="h-5 w-5 text-white transition-transform duration-300
                       group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5
                       motion-reduce:transition-none"
          />
        </a>
      </div>

      {/* ── Stage: the product screen suspended in space ─────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-20 mt-2 px-7 pb-7 sm:mt-0 sm:px-0 sm:pb-0
                   sm:absolute sm:inset-y-0 sm:left-[50%] sm:right-[-20%]
                   sm:flex sm:items-center [perspective:1600px]"
      >
        <motion.div
          className="relative w-full [transform-style:preserve-3d]"
          style={reduceMotion ? undefined : { rotateX, rotateY }}
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 + index * 0.06, ease: EASE }}
        >
          {/* Screen — lifted off the card by a real shadow, so the light UI
              still reads as a separate object on a light surface */}
          <div
            className="relative overflow-hidden rounded-xl ring-1 ring-slate-900/10
                       shadow-[0_2px_6px_-2px_rgba(15,40,80,0.10),0_26px_50px_-18px_rgba(15,40,80,0.38)]
                       transition-transform duration-700 ease-out group-hover:-translate-y-2"
          >
            <img
              src={produto.screenshot}
              alt=""
              loading="lazy"
              className="block w-full"
            />
            {/* Screen sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/35 mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
      </article>
      </div>
    </div>
  );

  if (!withEntryAnimation) return card;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: EASE }}
    >
      {card}
    </motion.div>
  );
}

// ── GridView ──────────────────────────────────────────────────────────────────

function GridView() {
  return (
    <div className="grid gap-6 lg:gap-7 lg:grid-cols-2">
      {PRODUTOS_DATA.map((p, i) => (
        <ProductCard key={p.id} produto={p} index={i} withEntryAnimation />
      ))}
    </div>
  );
}

// ── StackView ─────────────────────────────────────────────────────────────────
// Stripe checkout-page recipe: ONE stage stays pinned on the right (same
// glass-shell treatment as ProductCard's stage), while plain content scrolls
// on the left. Whichever left block is passing through the viewport's
// vertical centre is "active" — an IntersectionObserver tracks that (no
// continuous scroll-linked value, just a discrete index), and the pinned
// stage cross-fades its screenshot to match via a plain CSS opacity
// transition. Native scroll throughout; nothing here fights position:sticky.
const STAGE_TOP = 112; // clears the fixed header with room to breathe

function StagePanel({ activeIndex }: { activeIndex: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 110, damping: 20, mass: 0.5 });
  const rotateY = useTransform(sx, [-1, 1], [8, -8]);
  const rotateX = useTransform(sy, [-1, 1], [-6, 6]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleLeave = () => { px.set(0); py.set(0); };

  const activeProduct = PRODUTOS_DATA[activeIndex];

  return (
    <div className="hidden lg:flex sticky h-[580px] items-center justify-center" style={{ top: STAGE_TOP }}>
      {/* Brilho colorido — combina com o produto ativo, reforça a ligação
          visual com o trilho da coluna de texto (mesmo accent). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blur-3xl -z-10"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${activeProduct.accent}2e, transparent 70%)`,
          transition: "background 0.6s ease",
        }}
      />

      <motion.div
        ref={stageRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative w-full [perspective:1600px]"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        {/* Transição premium entre telas — em vez de um crossfade plano, a
            tela que entra desliza + escala + desfoca até o foco (e a que sai
            faz o inverso), com `variants` em função + `popLayout` (não
            "wait") para nunca travar nem empilhar nós ao trocar rápido. */}
        <AnimatePresence mode="popLayout" custom={activeIndex}>
          <motion.div
            key={activeProduct.id}
            custom={activeIndex}
            variants={
              reduceMotion
                ? undefined
                : {
                    initial: () => ({ opacity: 0, y: 20, scale: 0.97, filter: "blur(10px)" }),
                    animate: () => ({ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }),
                    exit: () => ({ opacity: 0, y: -20, scale: 0.97, filter: "blur(10px)" }),
                  }
            }
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.55, ease: EASE }}
            className="relative"
          >
            {/* Produtos com `mockups` (3 telas de celular) trocam o palco
                inteiro — nada de screenshot desktop + 1 celular flutuando,
                só os 3 mockups lado a lado (ver TriplePhoneStage). Os demais
                mantêm o tratamento original. */}
            {activeProduct.mockups && activeProduct.mockups.length >= 3 ? (
              <TriplePhoneStage mockups={activeProduct.mockups} />
            ) : (
              <>
                {/* Tela desktop — o overflow-hidden fica só aqui (não no
                    wrapper), para o mockup mobile poder "flutuar" para fora
                    do canto sem ser cortado. */}
                <div
                  className="overflow-hidden rounded-xl ring-1 ring-slate-900/10
                             shadow-[0_8px_20px_-14px_rgba(15,40,80,0.20),0_34px_70px_-34px_rgba(15,40,80,0.42)]"
                >
                  <img
                    src={activeProduct.screenshot}
                    alt={`Captura de tela do produto ${splitTitulo(activeProduct.titulo).nome}`}
                    loading={activeIndex === 0 ? "eager" : "lazy"}
                    className="block w-full max-h-[520px] object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/35 mix-blend-overlay" />
                </div>

                <PhoneMockup
                  screenshot={activeProduct.mobileScreenshot}
                  label={activeProduct.numero}
                  alt={`Tela mobile do produto ${splitTitulo(activeProduct.titulo).nome}`}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ── TriplePhoneStage ──────────────────────────────────────────────────────────
// Substitui o par screenshot+PhoneMockup quando o produto define `mockups`
// (3 telas) — celular central em primeiro plano, os das laterais um pouco
// menores atrás dele. Sem blur nos três (pedido explícito: "totalmente
// nítidos" — a versão anterior desfocava as laterais, imitando a hero de
// /experiencia-do-hospede, mas aqui as 3 telas precisam ser lidas com
// clareza, não sugeridas). A diferença de plano vem só de escala + z-index
// + uma leve opacidade (0.88, não os 0.5 de antes). Estático (sem autoplay
// por celular nem clique pra trazer um lateral pro centro, ao contrário
// daquela hero) — é um card secundário do showcase, a versão interativa
// completa já existe na página do produto.
function TriplePhoneStage({ mockups }: { mockups: readonly { src: string; alt: string }[] }) {
  const ROLES = [
    { x: -215, scale: 0.86, opacity: 0.88, z: 10 },
    { x: 0,    scale: 1,    opacity: 1,    z: 30 },
    { x: 215,  scale: 0.86, opacity: 0.88, z: 10 },
  ] as const;

  return (
    <div className="relative h-[580px] flex items-center justify-center">
      {ROLES.map((role, i) => {
        const mock = mockups[i];
        if (!mock) return null;
        return (
          <div
            key={i}
            className="absolute w-[248px]"
            style={{
              transform: `translateX(${role.x}px) scale(${role.scale})`,
              opacity: role.opacity,
              zIndex: role.z,
            }}
          >
            <div
              className="bg-white rounded-[24px] p-[4px]"
              style={{
                boxShadow: role.z === 30
                  ? "0 24px 56px -12px rgba(15,40,80,0.45)"
                  : "0 16px 32px -12px rgba(15,40,80,0.25)",
              }}
            >
              <div
                className="relative bg-white rounded-[20px] overflow-hidden ring-1 ring-slate-900/10"
                style={{ aspectRatio: "9 / 19.5" }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-9 h-[9px] bg-[#1c1c1e] rounded-full" />
                {/*
                  `loading="lazy"` nas duas telas laterais nunca chegava a
                  disparar: elas nascem dentro de um `motion.div` (a) montado
                  dinamicamente via `AnimatePresence` (troca a cada produto
                  ativo) e (b) com `position:absolute` + `transform:
                  translateX()` — o heurístico de lazy-load do browser calcula
                  distância até o viewport pela caixa de layout ANTES da
                  transform, e nesse combo específico nunca conclui que a
                  imagem está visível. Resultado: as 2 telas de fora ficavam
                  permanentemente em branco, mesmo com o arquivo existindo e
                  a tela realmente na tela. Confirmado forçando `eager` via
                  DOM — carregam na hora. Como são só 3 imagens pequenas,
                  carregadas apenas quando este produto específico fica
                  ativo, `eager` nas 3 é o fix seguro (não um workaround).
                */}
                <img
                  src={mock.src}
                  alt={mock.alt}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── MobileTripleMockup ───────────────────────────────────────────────────────
// Versão compacta do TriplePhoneStage pra telas < lg — mesmos 3 prints, mas
// lado a lado sem sobreposição (o layout absoluto/escalado do desktop não
// cabe na largura de um card mobile). Usada só por produtos com `mockups`
// (hoje, só Experiência do Hóspede) — os demais produtos continuam com a
// captura única acima do título, inalterados.
function MobileTripleMockup({ mockups }: { mockups: readonly { src: string; alt: string }[] }) {
  return (
    <div className="lg:hidden flex items-end justify-center gap-3 mb-6">
      {mockups.map((mock, i) => (
        <div key={i} className="w-[30%] max-w-[112px]">
          <div
            className="bg-white rounded-[16px] p-[3px]"
            style={{ boxShadow: "0 14px 30px -12px rgba(15,40,80,0.35)" }}
          >
            <div
              className="relative overflow-hidden rounded-[13px] bg-white ring-1 ring-slate-900/10"
              style={{ aspectRatio: "9 / 19.5" }}
            >
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-10 w-6 h-[6px] rounded-full bg-[#1c1c1e]" />
              <img
                src={mock.src}
                alt={mock.alt}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PhoneMockup ───────────────────────────────────────────────────────────────
// Silhueta minimalista (sem o clichê de moldura grossa estilo iPhone): borda
// fina em gradiente de vidro, câmera em pílula discreta, tela com espaço
// reservado para o print mobile de cada produto. Flutua sobre o canto
// inferior esquerdo da tela desktop, reta na vertical (sem inclinação) —
// reforça "funciona no computador e no bolso" sem precisar de texto
// explicando isso.
function PhoneMockup({ screenshot, label, alt }: { screenshot?: string; label: string; alt?: string }) {
  return (
    <div
      className="absolute -bottom-8 -left-8 z-20 w-[35%] max-w-[142px]"
      style={{
        filter: "drop-shadow(0 16px 24px rgba(15,40,80,0.30))",
      }}
    >
      <div
        className="rounded-[20px] p-[3px]"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.35))" }}
      >
        <div
          className="relative overflow-hidden rounded-[17px] bg-white ring-1 ring-slate-900/10"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {/* Câmera — pílula discreta, não um notch grande */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-[5px] rounded-full bg-slate-900/70 z-10" />

          {screenshot ? (
            <img
              src={screenshot}
              alt={alt ?? `Print mobile do produto ${label}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            // Placeholder — some ao adicionar `mobileScreenshot` no produto
            // correspondente em PRODUTOS_DATA.
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed"
              style={{ borderColor: "rgba(40,89,146,0.22)", background: "rgba(40,89,146,0.04)" }}
            >
              <Smartphone className="w-4 h-4" style={{ color: "rgba(40,89,146,0.35)" }} strokeWidth={1.5} />
              <span
                className="text-[7px] font-semibold text-center leading-tight px-1"
                style={{ color: "rgba(40,89,146,0.4)" }}
              >
                Print mobile {label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScrollContentBlock({
  produto,
  active,
  registerRef,
}: {
  produto:      ProdutoItem;
  active:       boolean;
  registerRef:  (el: HTMLDivElement | null) => void;
}) {
  const { Icone: Icon } = produto;
  const { nome, subtitulo } = splitTitulo(produto.titulo);
  const reducedMotion = useReducedMotion();
  const hasMockups = !!produto.mockups && produto.mockups.length >= 3;
  return (
    <div
      ref={registerRef}
      className={`lg:min-h-[85vh] flex flex-col justify-center transition-opacity duration-500 py-14 lg:py-0 lg:pl-10 ${
        active ? "lg:opacity-100" : "lg:opacity-40"
      }`}
    >
      <div className="flex items-start gap-3 mb-5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-3xl
                        bg-[#285992]/[0.08] ring-1 ring-inset ring-[#285992]/15">
          <Icon className="h-5 w-5 text-[#285992]" />
        </div>
        <div>
          <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-[#1e3a5f]">
            <span className="relative inline-block whitespace-nowrap">
              {nome}
              <svg
                aria-hidden="true"
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                className="absolute left-0 -bottom-1.5 w-full h-[0.7rem] pointer-events-none"
                fill="none"
              >
                <motion.path
                  d="M 4 10 C 60 4, 150 3, 230 6 C 270 7.5, 300 9, 316 8"
                  stroke="#fccc30"
                  strokeWidth={4}
                  strokeLinecap="round"
                  initial={false}
                  animate={
                    reducedMotion
                      ? { pathLength: 1, opacity: 0.9 }
                      : active
                      ? { pathLength: 1, opacity: 0.9 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </span>
          </h3>
          {subtitulo && (
            <p className="text-[13px] text-slate-400 font-medium leading-snug mt-1">
              {subtitulo}
            </p>
          )}
        </div>
      </div>

      {/* Mobile/tablet fallback — there's no room for a pinned side stage
          below lg, so each block carries its own screenshot(s) inline,
          sempre abaixo do título/subtítulo (mesmo tratamento pedido pro
          item Experiência do Hóspede, agora estendido a todos os produtos).
          `mockups` (hoje só Experiência do Hóspede) mostra as 3 telas reais
          lado a lado; os demais mostram a captura única. */}
      {hasMockups && produto.mockups ? (
        <MobileTripleMockup mockups={produto.mockups} />
      ) : (
        <div className="lg:hidden mb-6 rounded-2xl overflow-hidden ring-1 ring-slate-900/10 shadow-[0_10px_30px_-12px_rgba(15,40,80,0.35)]">
          <img src={produto.screenshot} alt={`Captura de tela do produto ${nome}`} loading="lazy" className="block w-full" />
        </div>
      )}

      <p className="text-[15px] leading-relaxed text-slate-600 mb-6 max-w-md">
        {produto.descricao}
      </p>

      <ul className="flex flex-col gap-2.5 mb-7">
        {produto.beneficios.map((b) => (
          <li key={b} className="flex items-center gap-2.5">
            <span
              className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "#28599214" }}
            >
              <Check className="h-2.5 w-2.5 text-[#285992]" strokeWidth={3.5} />
            </span>
            <span className="text-[13px] font-medium text-slate-700">{b}</span>
          </li>
        ))}
      </ul>

      {/* CTA pill — mesmo disco circular de antes, agora com o texto do
          botão ao lado, num card rounded-full. */}
      <a
        href={produto.link}
        className="group/btn inline-flex w-fit items-center gap-3 rounded-full
                   bg-[#1e3a5f] pl-1.5 pr-6 py-1.5
                   transition-[background-color,transform] duration-300
                   hover:scale-[1.02] hover:bg-[#285992]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992] focus-visible:ring-offset-2
                   motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
          <ArrowUpRight
            className="h-4 w-4 text-white transition-transform duration-300
                       group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5
                       motion-reduce:transition-none"
          />
        </span>
        <span className="text-white text-[13px] font-semibold leading-tight">
          {produto.ctaLabel}
        </span>
      </a>
    </div>
  );
}

// Trilho vertical com "facho luminoso" — inspirado na linha conectora
// sincronizada ao scroll do gladia.io: um trilho costura os 6 produtos, com
// um ponto de luz que viaja exatamente na posição do scroll e nós que
// acendem conforme são alcançados. Cor única (#d8dbdf, sem variar por
// produto) de propósito — a versão anterior colorida pelo accent de cada
// produto chamava atenção demais pra um elemento de apoio; o recurso
// continua funcionando (trilho percorrido, nós, facho), só que discreto.
const RAIL_COLOR = "#d8dbdf";

function ProgressRail({
  height,
  progressY,
  nodeYs,
  activeIndex,
}: {
  height:      number;
  progressY:   number;
  nodeYs:      number[];
  activeIndex: number;
}) {
  const reduceMotion = useReducedMotion();

  if (height === 0) return null;

  return (
    <svg
      aria-hidden="true"
      className="hidden lg:block absolute left-0 top-0 pointer-events-none overflow-visible"
      width={24}
      height={height}
    >
      {/* Trilho base — sempre visível, sutil */}
      <line x1={12} y1={0} x2={12} y2={height} stroke={RAIL_COLOR} strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />

      {/* Trilho percorrido — cresce com o scroll */}
      <line
        x1={12}
        y1={0}
        x2={12}
        y2={progressY}
        stroke={RAIL_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Nós — um por produto, acende (preenche) ao ser alcançado */}
      {nodeYs.map((y, i) => (
        <circle
          key={i}
          cx={12}
          cy={y}
          r={i === activeIndex ? 6 : 4}
          fill={i <= activeIndex ? RAIL_COLOR : "#f4f7fb"}
          stroke={RAIL_COLOR}
          strokeWidth={1.5}
          style={{ transition: reduceMotion ? undefined : "r 0.4s ease, fill 0.4s ease" }}
        />
      ))}

      {/* Facho luminoso — ponto de luz na posição exata do scroll */}
      {!reduceMotion && (
        <circle
          cx={12}
          cy={progressY}
          r={5}
          fill={RAIL_COLOR}
          style={{ filter: `drop-shadow(0 0 6px ${RAIL_COLOR})` }}
        />
      )}
    </svg>
  );
}

function StackView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [railHeight, setRailHeight] = useState(0);
  const [progressY, setProgressY] = useState(0);
  const [nodeYs, setNodeYs] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Progresso por scroll — leitura direta de getBoundingClientRect (mesma
  // técnica já usada em outras seções do site), throttle por timestamp em
  // vez de requestAnimationFrame. As posições dos nós só precisam ser
  // remedidas no mount e no resize; o progresso é recalculado a cada scroll.
  useEffect(() => {
    let lastRun = 0;

    const measureNodes = () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;
      const containerTop = containerEl.getBoundingClientRect().top + window.scrollY;
      setNodeYs(
        blockRefs.current.map((el) => {
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          return r.top + window.scrollY - containerTop + r.height / 2;
        })
      );
    };

    const computeProgress = () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;
      const rect = containerEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const currentY = Math.min(Math.max(vh / 2 - rect.top, 0), rect.height);
      setRailHeight(rect.height);
      setProgressY(currentY);

      // Nearest node to the current scroll position wins "active".
      const nodes = blockRefs.current.map((el) => {
        if (!el || !containerRef.current) return 0;
        const r = el.getBoundingClientRect();
        const cRect = containerRef.current.getBoundingClientRect();
        return r.top - cRect.top + r.height / 2;
      });
      let nearest = 0;
      let nearestDist = Infinity;
      nodes.forEach((y, i) => {
        const d = Math.abs(y - currentY);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = i;
        }
      });
      setActiveIndex(nearest);
    };

    const onScroll = () => {
      const now = Date.now();
      if (now - lastRun < 16) return;
      lastRun = now;
      computeProgress();
    };
    const onResize = () => {
      measureNodes();
      computeProgress();
    };

    measureNodes();
    computeProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ResizeObserver (não só o resize da janela) pega qualquer mudança de
    // altura do próprio contêiner — texto reformatando depois que a fonte
    // customizada carrega, imagem carregando, etc. — situações em que os nós
    // do trilho ficariam visualmente fora de posição sem isso.
    let ro: ResizeObserver | undefined;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        measureNodes();
        computeProgress();
      });
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <div ref={containerRef} className="relative flex flex-col">
        <ProgressRail height={railHeight} progressY={progressY} nodeYs={nodeYs} activeIndex={activeIndex} />
        {PRODUTOS_DATA.map((p, i) => (
          <ScrollContentBlock
            key={p.id}
            produto={p}
            active={i === activeIndex}
            registerRef={(el) => { blockRefs.current[i] = el; }}
          />
        ))}
      </div>

      <StagePanel activeIndex={activeIndex} />
    </div>
  );
}

// ── CarouselView ──────────────────────────────────────────────────────────────

function CarouselView() {
  const [api, setApi]         = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount]     = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {PRODUTOS_DATA.map((p, i) => (
            <CarouselItem key={p.id} className="pl-4 basis-full lg:basis-1/2">
              <ProductCard produto={p} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden lg:block">
          <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-[#1e3a5f] hover:bg-slate-50 hover:border-slate-300" />
          <CarouselNext    className="-right-12 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-[#1e3a5f] hover:bg-slate-50 hover:border-slate-300" />
        </div>
      </Carousel>

      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-[#285992]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}

// ── ProductShowcase ───────────────────────────────────────────────────────────

export interface ProductShowcaseProps {
  viewMode?: "grid" | "carousel" | "stack";
}

function ProductShowcase({ viewMode = "carousel" }: ProductShowcaseProps) {
  return (
    // #F4F7FB is the canvas colour of the product mockups, so the screens sit
    // on the same field as the page and read as part of it.
    // Stack mode skips overflow-hidden: any ancestor with overflow other than
    // visible breaks position:sticky on the cards below.
    <section className={`relative bg-[#f4f7fb] py-24 lg:py-32 ${viewMode === "stack" ? "" : "overflow-hidden"}`}>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader animate={viewMode !== "carousel"} />
        {viewMode === "grid" && <GridView />}
        {viewMode === "stack" && <StackView />}
        {viewMode === "carousel" && <CarouselView />}
      </div>
    </section>
  );
}

export { ProductShowcase };
