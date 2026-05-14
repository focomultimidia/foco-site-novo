"use client";

import { ProductShowcase } from "@/features/shared/components/product-showcase";
import type { ProdutoData } from "@/features/shared/components/product-showcase";
import type { Produto } from "../types";

interface ProdutosSectionProps {
  produtos: Produto[];
}

// Produto (home API type) and ProdutoData are structurally identical —
// TypeScript's structural typing handles the cast implicitly.
function ProdutosSection({ produtos }: ProdutosSectionProps) {
  return (
    <ProductShowcase
      viewMode="grid"
      produtos={produtos as unknown as ProdutoData[]}
    />
  );
}

export { ProdutosSection };
