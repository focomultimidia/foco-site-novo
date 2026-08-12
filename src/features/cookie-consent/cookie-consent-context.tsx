"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ConsentCategory, ConsentPreferences, StoredConsent } from "./types";

// Sobe esse número se algum dia a POLÍTICA em si mudar de um jeito que
// invalide consentimentos antigos (ex.: nova categoria de cookie) — todo
// mundo volta a ver o aviso, mesmo quem já tinha decidido antes.
const CONSENT_VERSION = 1;
const STORAGE_KEY = "foco:cookie-consent";

interface CookieConsentContextValue {
  // `null` = visitante ainda não decidiu nada (primeira visita, ou
  // versão da política mudou). Uma vez decidido, nunca mais volta a null
  // sozinho — só se o usuário limpar o localStorage manualmente.
  consent: ConsentPreferences | null;
  isPanelOpen: boolean;
  panelView: "compact" | "detalhado";
  openPanel: (view?: "compact" | "detalhado") => void;
  closePanel: () => void;
  setPanelView: (view: "compact" | "detalhado") => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: Record<ConsentCategory, boolean>) => void;
  hasCategory: (category: ConsentCategory) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return { necessary: true, analytics: parsed.analytics, marketing: parsed.marketing };
  } catch {
    return null;
  }
}

function persistConsent(prefs: ConsentPreferences) {
  const stored: StoredConsent = { ...prefs, version: CONSENT_VERSION, decidedAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

/**
 * CookieConsentProvider — fica no topo da árvore (App.tsx) pra que tanto o
 * widget flutuante quanto o link "Cookies" do rodapé (e, no futuro,
 * qualquer script de analytics/marketing) compartilhem o mesmo estado sem
 * precisar de prop drilling.
 *
 * `consent` começa `null` (sem ler localStorage ainda) de propósito — ler
 * no primeiro render causaria hidratação inconsistente em qualquer cenário
 * SSR futuro. O `useEffect` resolve isso depois do mount, igual ao padrão
 * já usado nos outros hooks de `matchMedia` deste projeto (ver
 * eventos-section.tsx: primeiro render assume um valor seguro, o efeito
 * corrige em seguida).
 */
function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelView, setPanelView] = useState<"compact" | "detalhado">("compact");

  useEffect(() => {
    setConsent(readStoredConsent());
    setHasHydrated(true);
  }, []);

  // Primeira visita (ou consentimento expirado por versão): o aviso
  // aparece sozinho depois de um respiro curto, pra não brigar com o
  // primeiro paint da página.
  useEffect(() => {
    if (!hasHydrated || consent !== null) return;
    const timer = setTimeout(() => setIsPanelOpen(true), 700);
    return () => clearTimeout(timer);
  }, [hasHydrated, consent]);

  const openPanel = (view: "compact" | "detalhado" = "compact") => {
    setPanelView(view);
    setIsPanelOpen(true);
  };
  const closePanel = () => setIsPanelOpen(false);

  const acceptAll = () => {
    const next: ConsentPreferences = { necessary: true, analytics: true, marketing: true };
    setConsent(next);
    persistConsent(next);
    setIsPanelOpen(false);
  };

  const rejectNonEssential = () => {
    const next: ConsentPreferences = { necessary: true, analytics: false, marketing: false };
    setConsent(next);
    persistConsent(next);
    setIsPanelOpen(false);
  };

  const savePreferences = (prefs: Record<ConsentCategory, boolean>) => {
    const next: ConsentPreferences = { necessary: true, analytics: prefs.analytics, marketing: prefs.marketing };
    setConsent(next);
    persistConsent(next);
    setIsPanelOpen(false);
  };

  const hasCategory = (category: ConsentCategory) => consent?.[category] === true;

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isPanelOpen,
        panelView,
        openPanel,
        closePanel,
        setPanelView,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        hasCategory,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent precisa estar dentro de <CookieConsentProvider>");
  return ctx;
}

export { CookieConsentProvider, useCookieConsent };
