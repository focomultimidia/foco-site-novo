"use client";

/**
 * Badge padrão do topo das seções.
 *
 * Visual único do site, extraído do header do ProductShowcase (seção
 * "ProdutosSection" da home): mono, caixa alta, tracking largo, na tinta da
 * marca, entre dois fios de 1px.
 *
 * Substitui os três padrões que coexistiam antes — <Badge> ciano do shadcn,
 * pílula azul arredondada e eyebrow solto — para que toda seção abra do
 * mesmo jeito.
 */
function SectionEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#285992] mb-6 ${className}`}
    >
      <span className="w-6 h-px bg-[#285992]/35" />
      {children}
      <span className="w-6 h-px bg-[#285992]/35" />
    </span>
  );
}

export { SectionEyebrow };
