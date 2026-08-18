"use client";

import { motion } from "framer-motion";
import { Monitor } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface GenericInfoSectionProps {
  /** Main heading — plain string. */
  title: string;
  /** Substring of `title` to render in blue. E.g. "motor de reservas". */
  titleHighlight?: string;
  /** Body text. One string renders a single <p>; an array renders multiple. */
  description: React.ReactNode | string[];
  /** Absolute or relative path to the section image. */
  imagePath: string;
  imageAlt: string;
  /**
   * Controls which side the image appears on desktop.
   * 'right' (default) → text left, image right.
   * 'left'            → image left, text right.
   * Alternating this prop across stacked sections prevents visual monotony.
   */
  imageSide?: "left" | "right";
  /** Classe de fundo da seção. Padrão: a superfície única do site (#f4f7fb). */
  background?: string;
  /** Extra classes applied to the <section> element. */
  className?: string;
  /** Cantos arredondados na imagem (rounded-3xl, o mesmo raio usado em
   *  cards/imagens no resto do site) — opt-in porque esse componente é
   *  compartilhado por várias páginas e a mudança foi pedida só pra
   *  /experiencia-do-hospede; default false preserva as outras como estão. */
  imageRounded?: boolean;
  /**
   * Troca a imagem única por um mockup desktop (mesmo padrão visual do
   * frame de screenshot em product-showcase.tsx). Opt-in porque é um
   * componente compartilhado por várias páginas — pedido só pra
   * /software-de-pagamentos; default false preserva as outras.
   * `imagePath`/`imageAlt` são ignorados nesse modo.
   */
  showMockup?: boolean;
  /** Screenshot do mockup desktop. Se ausente, mostra um placeholder tracejado. */
  desktopMockupSrc?: string;
  desktopMockupAlt?: string;
  /**
   * No mobile, empurra a imagem pra logo abaixo do título (antes dos
   * parágrafos de descrição) em vez de depois deles. Opt-in porque esse
   * componente é compartilhado por várias páginas — pedido só pra
   * /experiencia-do-hospede; default false preserva as outras como estão.
   * Não afeta o layout em lg+ (colunas texto/imagem lado a lado, como sempre).
   */
  imageBelowTitleOnMobile?: boolean;
}

// ── Mockup (desktop) ─────────────────────────────────────────────────────────
// Mesmo padrão visual do frame de screenshot em product-showcase.tsx: moldura
// de vidro, ring, sombra, e placeholder tracejado quando não há imagem ainda.

function DesktopMockup({
  desktopSrc,
  desktopAlt,
}: {
  desktopSrc?: string;
  desktopAlt: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        className="overflow-hidden rounded-xl ring-1 ring-slate-900/10
                   shadow-[0_8px_20px_-14px_rgba(15,40,80,0.20),0_34px_70px_-34px_rgba(15,40,80,0.42)]"
      >
        {desktopSrc ? (
          // Sem aspect-ratio fixo: a altura segue a proporção real da
          // imagem (block + h-auto), pra não cortar nada via object-cover.
          <div className="relative bg-white">
            <img
              src={desktopSrc}
              alt={desktopAlt}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/35 mix-blend-overlay" />
          </div>
        ) : (
          <div
            className="relative flex flex-col items-center justify-center gap-2 border-2 border-dashed"
            style={{ aspectRatio: "16 / 10", borderColor: "rgba(40,89,146,0.22)", background: "rgba(40,89,146,0.04)" }}
          >
            <Monitor className="w-8 h-8" style={{ color: "rgba(40,89,146,0.35)" }} strokeWidth={1.5} />
            <span className="text-xs font-semibold" style={{ color: "#285992" }}>
              Print desktop
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

function buildTitle(title: string, highlight?: string): React.ReactNode {
  if (!highlight) return title;
  const idx = title.indexOf(highlight);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

function GenericInfoSection({
  title,
  titleHighlight,
  description,
  imagePath,
  imageAlt,
  imageSide = "right",
  background = "bg-[#f4f7fb]",
  className = "",
  imageRounded = false,
  showMockup = false,
  desktopMockupSrc,
  desktopMockupAlt,
  imageBelowTitleOnMobile = false,
}: GenericInfoSectionProps) {

  // When the image is on the left, the text column shifts right (and vice-versa).
  // `order-*` is applied at the lg breakpoint so mobile always stacks text first.
  const textOrder  = imageSide === "left"  ? "lg:order-2" : "lg:order-1";
  const imageOrder = imageSide === "left"  ? "lg:order-1" : "lg:order-2";

  // Posicionamento em lg+: título e parágrafos sempre juntos na MESMA coluna
  // (texto), a imagem na outra — colocados explicitamente via linha/coluna do
  // grid (em vez de só `order`) porque título e parágrafos viram itens irmãos
  // separados do grid nesse modo (não mais um único bloco de texto), pra
  // permitir reordenar só a imagem entre eles no mobile sem quebrar lg+.
  const desktopTitleCol = imageSide === "left" ? "lg:col-start-2" : "lg:col-start-1";
  const desktopImageCol = imageSide === "left" ? "lg:col-start-1" : "lg:col-start-2";

  // Entry animations follow the reading direction of each column.
  const textXFrom  = imageSide === "left"  ?  40 : -40;
  const imageXFrom = imageSide === "left"  ? -40 :  40;

  // Normalise description to an array so we always render multiple <p> tags.
  const paragraphs: React.ReactNode[] = Array.isArray(description)
    ? description
    : [description];

  const image = showMockup ? (
    <DesktopMockup
      desktopSrc={desktopMockupSrc}
      desktopAlt={desktopMockupAlt ?? imageAlt}
    />
  ) : (
    <img
      src={imagePath}
      alt={imageAlt}
      width={898}
      height={664}
      loading="lazy"
      decoding="async"
      className={`w-full h-auto object-contain ${imageRounded ? "rounded-3xl" : ""}`}
    />
  );

  // `imageBelowTitleOnMobile` muda a ESTRUTURA do grid (título/imagem/
  // descrição viram 3 irmãos em vez de 2), então em vez de tentar unificar
  // num só JSX flexível o bastante pra cobrir os dois casos (arriscando
  // mexer no espaçamento das páginas que não pediram a mudança), o branch
  // default abaixo fica byte-a-byte igual ao componente original.
  if (!imageBelowTitleOnMobile) {
    return (
      <section className={`py-24 lg:py-24 ${background} ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

            {/* ── Text column ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: textXFrom }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={`space-y-5 ${textOrder}`}
            >
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#1e3a5f] tracking-tight mb-2"
                style={{ lineHeight: 1.15 }}
              >
                {buildTitle(title, titleHighlight)}
              </h2>

              {paragraphs.map((p, i) => (
                <p key={i} className="text-slate-500 text-base lg:text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </motion.div>

            {/* ── Image column ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: imageXFrom }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className={`flex items-center justify-center ${imageOrder}`}
            >
              {image}
            </motion.div>

          </div>
        </div>
      </section>
    );
  }

  // ── Título → imagem → descrição no mobile (pedido só pra
  //    /experiencia-do-hospede); em lg+ volta ao layout de 2 colunas de sempre. ──
  return (
    <section className={`py-24 lg:py-24 ${background} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 lg:items-center">

          {/* ── Title ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: textXFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={`order-1 ${desktopTitleCol} lg:row-start-1 ${textOrder}`}
          >
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#1e3a5f] tracking-tight"
              style={{ lineHeight: 1.15 }}
            >
              {buildTitle(title, titleHighlight)}
            </h2>
          </motion.div>

          {/* ── Image ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: imageXFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className={`order-2 ${desktopImageCol} lg:row-start-1 lg:row-span-2 flex items-center justify-center ${imageOrder}`}
          >
            {image}
          </motion.div>

          {/* ── Description ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: textXFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={`order-3 ${desktopTitleCol} lg:row-start-2 space-y-5 ${textOrder}`}
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="text-slate-500 text-base lg:text-base leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { GenericInfoSection };
