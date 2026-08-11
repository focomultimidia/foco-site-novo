"use client";

import { useRef, useState } from "react";
import { OTHEO_GRUPOS } from "./data/otheo-actions";
import { resolveOtheoIntent, type OtheoResponse } from "./lib/resolve-intent";
import { TheoAvatar } from "./components/theo-avatar";
import { IntroOverlay } from "./components/intro-overlay";
import { Omnibox } from "./components/omnibox";
import { ActionGroupDeck } from "./components/action-group-deck";
import { ConsultaChips } from "./components/consulta-chips";
import { ContextPanel } from "./components/context-panel";
import { TheoChatDrawer } from "./components/chat-drawer";

/**
 * OtheoAiPage — protótipo/showcase do módulo Otheo AI dentro do site
 * institucional (não existe extranet real neste repositório — ver decisão
 * registrada na conversa). Logo e mascote são placeholders propositais
 * (dashed border + ícone genérico, mesmo padrão do resto do site) até os
 * arquivos oficiais chegarem — nenhuma tentativa de recriar a marca real.
 */
function OtheoAiPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [omniboxValue, setOmniboxValue] = useState("");
  const [response, setResponse] = useState<OtheoResponse | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = () => {
    const text = omniboxValue.trim();
    if (!text) return;
    setBusy(true);
    // Atraso curto só pra simular "pensando" — sem isso a resposta troca
    // instantaneamente e perde a sensação de que algo foi processado.
    setTimeout(() => {
      setResponse(resolveOtheoIntent(text));
      setBusy(false);
    }, 450);
  };

  const handleSelectTemplate = (template: string) => {
    if (template === "__ABRIR_MAPA__") {
      setResponse({ kind: "mapa" });
      return;
    }
    setOmniboxValue(template);
    // `setTimeout` (não `requestAnimationFrame`) — só precisa rodar depois
    // do commit do estado, não do próximo paint; rAF fica preso em abas
    // que não compositam (ver memória do projeto sobre isso).
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const [grupoVenda, grupoReservas, grupoEspacial, grupoInteligencia] = OTHEO_GRUPOS;

  return (
    <div className="relative bg-[#0b1a2e]">
      <IntroOverlay />

      {/* ── Cabeçalho do módulo — Theo docado, status, título e Omnibox ── */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 pb-10">
        <div aria-hidden="true" className="absolute -inset-[10%] -z-10 overflow-hidden" style={{ filter: "blur(60px)", opacity: 0.7 }}>
          <div
            className="absolute w-[460px] h-[460px] -left-24 top-0 rounded-full motion-safe:animate-aurora-a"
            style={{ background: "radial-gradient(circle, rgba(66,122,185,0.55), transparent 70%)" }}
          />
          <div
            className="absolute w-[420px] h-[420px] -right-20 top-10 rounded-full motion-safe:animate-aurora-b"
            style={{ background: "radial-gradient(circle, rgba(252,204,48,0.18), transparent 70%)" }}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <TheoAvatar size={48} floating />
            <div>
              <p className="font-display font-bold text-white text-lg leading-none">
                Othe<span style={{ color: "#fccc30" }}>o</span> AI
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-white/50 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online — pronto pra ajudar
              </span>
            </div>
          </div>

          <div className="max-w-2xl mb-8">
            <h1 className="font-display font-semibold text-3xl sm:text-4xl text-white leading-tight tracking-tight mb-3">
              O copiloto da sua operação hoteleira
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Peça, pergunte ou mande executar — em português mesmo. O Theo entende sua reserva, seu mapa e seu inventário.
            </p>
          </div>

          <div className="max-w-2xl">
            <Omnibox ref={inputRef} value={omniboxValue} onChange={setOmniboxValue} onSubmit={handleSubmit} busy={busy} />
          </div>
        </div>
      </section>

      {/* ── Corpo — grid de ações à esquerda, painel do Theo à direita ── */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div className="space-y-12">
            <ActionGroupDeck grupo={grupoVenda} onSelectAcao={handleSelectTemplate} />
            <ActionGroupDeck grupo={grupoReservas} onSelectAcao={handleSelectTemplate} />
            <ConsultaChips onSelectConsulta={handleSelectTemplate} />
            <ActionGroupDeck grupo={grupoEspacial} onSelectAcao={handleSelectTemplate} />
            <ActionGroupDeck grupo={grupoInteligencia} onSelectAcao={handleSelectTemplate} />
          </div>

          <ContextPanel response={response} />
        </div>
      </div>

      <TheoChatDrawer />
    </div>
  );
}

export { OtheoAiPage };
