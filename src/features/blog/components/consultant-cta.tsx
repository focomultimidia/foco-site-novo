"use client";

import { MessageCircleQuestion } from "lucide-react";

// ── ConsultantCta ─────────────────────────────────────────────────────────────
// Substitui a caixa de comentário nativa do WordPress — decisão do plano
// técnico: a Opção B (conteúdo como código) não tem backend/banco pra
// armazenar e moderar comentário. Em vez de fingir uma seção de comentário
// que não escala, o espaço equivalente vira um convite direto pra falar com
// um consultor (abre o `LeadCaptureModal` já existente no site, gerenciado
// pela própria BlogPostPage — este componente só dispara `onOpen`).
function ConsultantCta({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="mt-10 pt-8 border-t border-slate-200 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#285992]/[0.08]">
          <MessageCircleQuestion className="w-[18px] h-[18px] text-[#285992]" strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[#1e3a5f]">Teve uma dúvida sobre esse assunto?</p>
          <p className="text-[13px] text-slate-600">Fale direto com um consultor Foco — sem robô, sem fila de espera.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="rounded-full bg-[#285992] hover:bg-[#1e4d85] text-white text-[13.5px] font-semibold px-5 py-2.5 transition-colors whitespace-nowrap"
      >
        Falar com um especialista
      </button>
    </div>
  );
}

export { ConsultantCta };
