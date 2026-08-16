"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

// ── CarouselControls ─────────────────────────────────────────────────────────
// Controle único e compartilhado por TODOS os carousels do site — antes cada
// um reinventava a roda com paleta, tamanho e posição próprios (setas
// #285992 aqui, #1e3a5f ali, azul genérico acolá; bolinhas ora slate, ora
// cinza, ora azul puro; setas só no desktop em alguns). Uma pastilha branca
// flutuante substitui os dois elementos soltos (setas + pontinhos) por UM
// objeto coeso — a "prancheta" fica sempre visível em qualquer breakpoint
// (os carousels antigos escondiam as setas fora do desktop).
//
// O indicador foge do "pontinho vira pílula" batido: é uma fileira de
// traços finos (mesma linguagem de progresso do Stories/Reels) — o ativo
// vira o dourado da marca (#fccc30, o mesmo acento usado em estrelas e
// badges pelo site inteiro), os demais ficam num traço quase invisível em
// tinta de marinho. Cada traço é o próprio botão de navegação direta.
interface CarouselControlsProps {
  count:      number;
  current:    number;
  onPrev:     () => void;
  onNext:     () => void;
  onSelect:   (index: number) => void;
  className?: string;
  labelPrev?: string;
  labelNext?: string;
  labelItem?: (index: number) => string;
}

function CarouselControls({
  count,
  current,
  onPrev,
  onNext,
  onSelect,
  className = "",
  labelPrev = "Anterior",
  labelNext = "Próximo",
  labelItem,
}: CarouselControlsProps) {
  if (count <= 1) return null;

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-2.5 ${className}`}
      style={{
        boxShadow: "0 1px 2px rgba(19,40,64,0.05), 0 18px 36px -20px rgba(19,40,64,0.32)",
        border: "1px solid rgba(19,40,64,0.07)",
      }}
    >
      <button
        type="button"
        onClick={onPrev}
        aria-label={labelPrev}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[#132840]/55
                   transition-colors duration-200 hover:bg-[#132840]/[0.06] hover:text-[#132840]"
      >
        <ArrowLeft className="h-[15px] w-[15px]" strokeWidth={1.75} />
      </button>

      <div className="flex items-center gap-[5px]">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={labelItem ? labelItem(i) : `Ir para o item ${i + 1}`}
            aria-current={i === current}
            className="group flex items-center py-2.5"
          >
            <span
              className={`block h-[3px] rounded-full transition-[width,background-color] duration-500 ease-out ${
                i === current ? "w-6 bg-[#fccc30]" : "w-[7px] bg-[#132840]/[0.14] group-hover:bg-[#132840]/30"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={labelNext}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[#132840]/55
                   transition-colors duration-200 hover:bg-[#132840]/[0.06] hover:text-[#132840]"
      >
        <ArrowRight className="h-[15px] w-[15px]" strokeWidth={1.75} />
      </button>
    </div>
  );
}

export { CarouselControls };
