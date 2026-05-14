"use client";

import { motion } from "framer-motion";

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
  /** Section background colour class. Defaults to "bg-white". */
  background?: string;
  /** Extra classes applied to the <section> element. */
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

function buildTitle(title: string, highlight?: string): React.ReactNode {
  if (!highlight) return title;
  const idx = title.indexOf(highlight);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-blue-500">{highlight}</span>
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
  background = "bg-white",
  className = "",
}: GenericInfoSectionProps) {

  // When the image is on the left, the text column shifts right (and vice-versa).
  // `order-*` is applied at the lg breakpoint so mobile always stacks text first.
  const textOrder  = imageSide === "left"  ? "lg:order-2" : "lg:order-1";
  const imageOrder = imageSide === "left"  ? "lg:order-1" : "lg:order-2";

  // Entry animations follow the reading direction of each column.
  const textXFrom  = imageSide === "left"  ?  40 : -40;
  const imageXFrom = imageSide === "left"  ? -40 :  40;

  // Normalise description to an array so we always render multiple <p> tags.
  const paragraphs: React.ReactNode[] = Array.isArray(description)
    ? description
    : [description];

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
            {/* Title — Space Grotesk, tight tracking */}
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#1e3a5f] tracking-tight mb-2"
              style={{ lineHeight: 1.15 }}
            >
              {buildTitle(title, titleHighlight)}
            </h2>

            {/* Body paragraphs — Inter, relaxed leading */}
            {paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 text-base lg:text-base leading-relaxed">
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
            <img
              src={imagePath}
              alt={imageAlt}
              className="w-full h-auto object-contain"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { GenericInfoSection };
