"use client";

// LeadCaptureProvider — monta UM único LeadCaptureModal na raiz do layout
// (ver MainLayout) e expõe `useLeadCapture().openLeadCapture(...)` pra
// qualquer componente da árvore abrir esse modal sem precisar receber
// isOpen/onClose por prop — evita ter que perfurar props por dezenas de
// heros, o header e a home só pra controlar um booleano de modal.
//
// `source` é obrigatório em toda chamada — é o identificador de origem do
// lead (qual hero, o botão do header, qual CTA final, qual card da
// TiposPropriedadeSection) que viaja junto no payload de envio (ver
// submitLeadCapture em lead-capture-api.ts), pronto pra quando a integração
// real com o RD Station entrar.

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode, type ComponentType } from "react";
import { LeadCaptureModal } from "@/features/shared/components/lead-capture-modal";

interface OpenLeadCaptureOptions {
  /** De onde veio o lead — SEMPRE "form-[nome da página de origem]" (ex.:
      "form-motor-de-reservas", "form-home") — o único parâmetro de
      rastreamento que os botões padrão (header, heros, LeadCaptureCTA)
      passam. Fora desse conjunto (ex.: seleção de plano em
      marketing-para-hoteis) outros valores continuam válidos quando a
      informação extra importa mais que a uniformidade. */
  source:   string;
  /** Texto principal do modal — default "Foco Tecnologia". */
  title?:   string;
  eyebrow?: string;
  /** Ícone do produto — mesmo componente de `PRODUTOS_DATA` (ver
      `getProdutoIcone` em produtos-data.ts). */
  icon?:    ComponentType<{ className?: string }>;
}

interface LeadCaptureContextValue {
  openLeadCapture: (options: OpenLeadCaptureOptions) => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<OpenLeadCaptureOptions | null>(null);

  const openLeadCapture = useCallback((options: OpenLeadCaptureOptions) => setRequest(options), []);
  const close = useCallback(() => setRequest(null), []);

  const value = useMemo(() => ({ openLeadCapture }), [openLeadCapture]);

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}
      <LeadCaptureModal
        isOpen={request !== null}
        onClose={close}
        title={request?.title ?? "Foco Tecnologia"}
        eyebrow={request?.eyebrow}
        icon={request?.icon}
        source={request?.source ?? "unknown"}
      />
    </LeadCaptureContext.Provider>
  );
}

function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) throw new Error("useLeadCapture precisa ser usado dentro de um LeadCaptureProvider");
  return ctx;
}

export { LeadCaptureProvider, useLeadCapture };
