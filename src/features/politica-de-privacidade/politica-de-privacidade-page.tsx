"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ShieldCheck } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { PolicyToc } from "./components/policy-toc";
import { PolicyContent } from "./components/policy-content";

// ── PoliticaDePrivacidadePage ────────────────────────────────────────────
// Página de conteúdo puro (sem hero de marketing, sem API/loading state) —
// segue o único precedente do projeto pra esse tipo de página
// (not-found-page.tsx: SectionEyebrow + h1 + parágrafo, fundo #f4f7fb,
// container padrão). `<Header/>`/`<Footer/>` NÃO são renderizados aqui —
// já vêm de MainLayout, que envolve toda rota (ver App.tsx).
//
// Estrutura de duas colunas (sumário + conteúdo) pra atender o pedido
// explícito de página "altamente navegável e intuitiva" num documento de
// 14 seções — sem isso, seria uma rolagem cega de ponta a ponta. O sumário
// (PolicyToc) e as seções (PolicyContent) ficam em componentes separados
// porque resolvem problemas diferentes (navegação com IntersectionObserver
// vs. conteúdo estático) e cada um já passa de 100 linhas sozinho.
function PoliticaDePrivacidadePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* Cabeçalho — versão clara da aurora usada na home/otheo, bem sutil
          (é uma página de texto, não uma seção de venda). */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div
          aria-hidden="true"
          className="absolute -inset-[10%] -z-0 overflow-hidden"
          style={{ filter: "blur(70px)", opacity: 0.5 }}
        >
          <div
            className="absolute w-[420px] h-[420px] -left-24 top-0 rounded-full motion-safe:animate-aurora-a"
            style={{ background: "radial-gradient(circle, rgba(66,122,185,0.28), transparent 70%)" }}
          />
          <div
            className="absolute w-[380px] h-[380px] -right-20 bottom-0 rounded-full motion-safe:animate-aurora-c"
            style={{ background: "radial-gradient(circle, rgba(252,204,48,0.18), transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <SectionEyebrow className="justify-center">Política de privacidade</SectionEyebrow>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#132840] tracking-tighter leading-[1.05] mb-5">
            Política de Privacidade de Dados
          </h1>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-6">
            Como coletamos, usamos e protegemos as suas informações — em conformidade com a Lei
            Geral de Proteção de Dados (LGPD).
          </p>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-[#285992] bg-[#285992]/8 border border-[#285992]/15 rounded-full px-4 py-2">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.8} />
            Revisada a cada 12 meses
          </span>
        </div>
      </section>

      {/* Sumário + conteúdo */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pb-24">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">
          <PolicyToc />

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-5 sm:px-10">
            <PolicyContent />
          </div>
        </div>
      </div>

      {/* Voltar ao topo — só depois de rolar um pouco, pra não competir com
          o sumário mobile logo no início da página. */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#1e3a5f] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:bg-[#285992] transition-colors"
        >
          <ArrowUp className="w-5 h-5" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

export { PoliticaDePrivacidadePage };
