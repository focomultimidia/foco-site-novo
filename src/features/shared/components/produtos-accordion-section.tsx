"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { PRODUTOS_DATA } from "@/features/shared/data/produtos-data";
import type { ProdutoItem } from "@/features/shared/data/produtos-data";

// ── Constants ─────────────────────────────────────────────────────────────────

const SPRING        = { type: "spring" as const, stiffness: 280, damping: 28 };
const SPRING_GENTLE = { type: "spring" as const, stiffness: 180, damping: 26 };

// ── DesktopCard — 3 distinct visual states ────────────────────────────────────
//
//  isDefault  → nothing hovered: equal flex, horizontal title, full image visible
//  isExpanded → this card hovered: flex-grow 4, full content revealed
//  isSqueezed → another card hovered: narrow, vertical title only
//
interface DesktopCardProps {
  produto:     ProdutoItem;
  isExpanded:  boolean;
  isSqueezed:  boolean;
  onEnter:     () => void;
  onLeave:     () => void;
}

function DesktopCard({ produto, isExpanded, isSqueezed, onEnter, onLeave }: DesktopCardProps) {
  const { Icone: Icon } = produto;
  const isDefault = !isExpanded && !isSqueezed;

  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-default"
      style={{ flexShrink: 1, flexBasis: 0, minWidth: "52px" }}
      animate={{ flexGrow: isExpanded ? 4 : 1 }}
      transition={SPRING}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ── Background image — subtle zoom when expanded ─────────────── */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isExpanded ? 1.06 : 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={produto.imagem}
          alt={produto.titulo}
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      {/* ── Gradient overlay ─────────────────────────────────────────── */}
      <div className={`absolute inset-0 bg-gradient-to-t ${produto.overlay}`} />

      {/* ── Adaptive darkness veil ───────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{
          opacity: isExpanded ? 0.22 : isSqueezed ? 0.68 : 0.52,
        }}
        transition={{ duration: 0.35 }}
      />

      {/* ══════════════════════════════════════════════════════════════
          STATE 1 — DEFAULT (nothing hovered)
          Equal width • horizontal title • full product image visible
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDefault && (
          <motion.div
            key="default"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Icon badge */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${produto.accent}28`,
                border: `1px solid ${produto.accent}45`,
              }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Horizontal title */}
            <p className="text-white text-[13px] font-bold text-center tracking-tight leading-snug px-1 drop-shadow-md">
              {produto.titulo}
            </p>

            {/* Floating product image — object-contain so it's always whole */}
            <motion.div
              className="w-full flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.8,
                ease: "easeInOut",
                delay: Number(produto.id) * 0.4,
              }}
            >
              <img
                src={produto.imagem}
                alt={produto.titulo}
                className="w-full object-contain drop-shadow-2xl"
                style={{ maxHeight: "110px" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          STATE 2 — SQUEEZED (another card is hovered)
          Very narrow • vertical title only • icon + image fade out
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isSqueezed && (
          <motion.div
            key="squeezed"
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.p
              className="font-extrabold uppercase whitespace-nowrap text-white drop-shadow-lg leading-none"
              style={{ rotate: -90 }}
              initial={{ fontSize: "14px", letterSpacing: "0.06em", opacity: 0.7 }}
              animate={{ fontSize: "20px", letterSpacing: "0.22em", opacity: 1 }}
              exit={{ fontSize: "14px", letterSpacing: "0.06em", opacity: 0.7 }}
              transition={SPRING_GENTLE}
            >
              {produto.titulo}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          STATE 3 — EXPANDED (this card is hovered)
          Full width • horizontal title • description + benefits + CTA
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded"
            className="absolute inset-0 flex flex-col justify-end p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, delay: 0.08 }}
          >
            {/* Icon badge (large) */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{
                backgroundColor: `${produto.accent}28`,
                border: `1.5px solid ${produto.accent}55`,
                boxShadow: `0 0 28px ${produto.accent}22`,
              }}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-white text-2xl font-bold tracking-tight leading-none mb-2.5">
              {produto.titulo}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              {produto.descricao}
            </p>

            {/* Benefits */}
            <ul className="space-y-1.5 mb-6">
              {produto.beneficios.map((b) => (
                <li key={b} className="flex items-center gap-2 text-white/80 text-xs">
                  <Check className="w-3.5 h-3.5 shrink-0" style={{ color: produto.accent }} />
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={produto.link}
              className="self-start flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-[#0f172a] transition-opacity hover:opacity-90 active:opacity-75"
              style={{ backgroundColor: produto.accent }}
            >
              Estou interessado, quero saber mais
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Mobile vertical accordion card ────────────────────────────────────────────

interface MobileCardProps {
  produto:  ProdutoItem;
  isActive: boolean;
  onToggle: () => void;
}

function MobileCard({ produto, isActive, onToggle }: MobileCardProps) {
  const { Icone: Icon } = produto;

  return (
    <div className="overflow-hidden rounded-2xl">
      {/* Clickable header */}
      <button
        type="button"
        className="relative w-full h-20 overflow-hidden block text-left"
        onClick={onToggle}
      >
        <img
          src={produto.imagem}
          alt={produto.titulo}
          className="w-full h-full object-cover object-top"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${produto.overlay}`} />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative h-full flex items-center px-5 gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${produto.accent}30` }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-base tracking-tight flex-1">
            {produto.titulo}
          </span>
          <motion.span animate={{ rotate: isActive ? 90 : 0 }} transition={SPRING} className="shrink-0">
            <ArrowRight className="w-4 h-4 text-white/55" />
          </motion.span>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={SPRING}
            className="overflow-hidden"
          >
            <div className="bg-[#151e2e] px-5 py-5">
              <p className="text-white/60 text-sm leading-relaxed mb-4">{produto.descricao}</p>
              <ul className="space-y-1.5 mb-5">
                {produto.beneficios.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-white/80 text-xs">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: produto.accent }} />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={produto.link}
                className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-[#0f172a]"
                style={{ backgroundColor: produto.accent }}
              >
                Estou interessado, quero saber mais
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export interface ProdutosAccordionSectionProps {
  title?:    string;
  subtitle?: string;
}

function ProdutosAccordionSection({
  title    = "Sistema para hotéis e pousadas aprovado por 97% dos nossos clientes",
  subtitle = "Da reserva à gestão financeira, nossa plataforma reúne produtos inovadores para otimizar cada detalhe do seu hotel ou pousada",
}: ProdutosAccordionSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </motion.div>

        {/* ── Desktop: Horizontal Accordion ─────────────────────────────── */}
        <motion.div
          className="hidden md:flex flex-row gap-1.5 rounded-3xl overflow-hidden"
          style={{ height: "520px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {PRODUTOS_DATA.map((produto) => (
            <DesktopCard
              key={produto.id}
              produto={produto}
              isExpanded={activeId === produto.id}
              isSqueezed={activeId !== null && activeId !== produto.id}
              onEnter={() => setActiveId(produto.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </motion.div>

        {/* ── Mobile: Vertical Accordion ────────────────────────────────── */}
        <div className="md:hidden space-y-2">
          {PRODUTOS_DATA.map((produto, i) => (
            <motion.div
              key={produto.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: i * 0.06 }}
            >
              <MobileCard
                produto={produto}
                isActive={activeId === produto.id}
                onToggle={() =>
                  setActiveId((prev) => (prev === produto.id ? null : produto.id))
                }
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export { ProdutosAccordionSection };
