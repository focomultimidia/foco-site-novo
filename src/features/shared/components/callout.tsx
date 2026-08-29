"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// ── Callout ───────────────────────────────────────────────────────────────────
// Extraído de politica-de-privacidade/components/policy-content.tsx (onde
// já destacava as seções sobre biometria facial e segurança da informação)
// pra virar reaproveitável — o blog usa o mesmo tratamento visual pra
// destacar avisos dentro de um post MDX (ex.: "este conteúdo não substitui
// revisão jurídica").
function Callout({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex gap-3.5 bg-[#285992]/[0.04] border border-[#285992]/12 rounded-2xl px-5 py-4">
      <Icon className="w-5 h-5 text-[#285992] flex-shrink-0 mt-0.5" strokeWidth={1.8} />
      <div className="space-y-3 text-slate-600 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

export { Callout };
