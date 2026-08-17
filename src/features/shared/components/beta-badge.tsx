"use client";

/**
 * BetaBadge — selo compacto "BETA" em dourado (o acento #fccc30 da própria
 * marca), usado nas chamadas do Otheo AI espalhadas pelo site (menu, cards
 * de produto) pra deixar clara a condição atual do produto. Versões
 * dedicadas e mais elaboradas existem na hero de /otheo-ai e no
 * OtheoAiTeaserSection (home) — este é o selo pequeno, pra contextos
 * compactos onde um badge maior não cabe.
 */
function BetaBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider leading-none flex-shrink-0 ${className}`}
      style={{
        background: "linear-gradient(135deg, #fccc30, #e0ac1f)",
        color: "#132840",
        boxShadow: "0 1px 4px rgba(224,172,31,0.45)",
      }}
    >
      Beta
    </span>
  );
}

export { BetaBadge };
