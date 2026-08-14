"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, BarChart3, Megaphone, ChevronLeft, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useCookieConsent } from "../cookie-consent-context";
import type { ConsentCategory } from "../types";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Variants como FUNÇÃO (não objeto direto) + prop `custom` no
// `AnimatePresence` logo abaixo — não só `mode="popLayout"` sozinho. Sem
// os dois juntos, o painel que está saindo pode ficar "grudado" no DOM ao
// lado do que está entrando (2 cabeçalhos, botões duplicados) em vez de
// desmontar — lição já registrada em memória do projeto sobre esse mesmo
// padrão de troca de conteúdo.
const viewVariants = {
  hidden: () => ({ opacity: 0 }),
  visible: () => ({ opacity: 1 }),
};

const CATEGORIAS: { id: ConsentCategory; icon: typeof BarChart3; titulo: string; descricao: string }[] = [
  {
    id: "analytics",
    icon: BarChart3,
    titulo: "Análise",
    descricao: "Google Analytics, para entender como você navega e melhorar o site.",
  },
  {
    id: "marketing",
    icon: Megaphone,
    titulo: "Marketing",
    descricao: "Campanhas e remarketing, para mostrar anúncios mais relevantes pra você.",
  },
];

/**
 * CookieConsentWidget — um único cartão flutuante com dois estados
 * ("compact" e "detalhado"), morfando com `layout` do framer-motion em
 * vez de abrir um segundo componente (modal/drawer) separado — a ideia é
 * que o visitante sinta que é o MESMO objeto crescendo, não um clique que
 * te joga pra outro lugar da tela.
 *
 * Ancorado no canto inferior esquerdo de propósito: é o canto que menos
 * compete com CTAs/paginação que costumam viver à direita neste site (ex.:
 * o botão "voltar ao topo" da página de privacidade).
 */
function CookieConsentWidget() {
  const {
    consent,
    isPanelOpen,
    panelView,
    closePanel,
    setPanelView,
    acceptAll,
    rejectNonEssential,
    savePreferences,
  } = useCookieConsent();

  const [draft, setDraft] = useState<Record<ConsentCategory, boolean>>({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  });

  // Sincroniza o rascunho com o consentimento salvo toda vez que o painel
  // abre — sem isso, reabrir depois de "Aceitar todos" mostraria os
  // toggles ainda desligados (estado do primeiro mount, não o real).
  useEffect(() => {
    if (isPanelOpen) {
      setDraft({ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false });
    }
  }, [isPanelOpen, consent]);

  const jaDecidiu = consent !== null;

  return (
    <>
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            key="cookie-panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed z-[70] bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 sm:w-[400px] max-w-[calc(100vw-2rem)]"
            role="dialog"
            aria-modal="false"
            aria-label="Preferências de cookies"
          >
            <motion.div
              layout
              className="relative overflow-hidden rounded-[28px] border border-white/10"
              style={{
                background: "linear-gradient(155deg, #1c3c5e 0%, #0d1d33 100%)",
                boxShadow: "0 30px 70px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(252,204,48,0.1)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-10 w-40 h-40 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(252,204,48,0.25), transparent 70%)" }}
              />

              {jaDecidiu && (
                <button
                  type="button"
                  onClick={closePanel}
                  aria-label="Fechar"
                  className="absolute top-4 right-4 z-20 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              )}

              <div className="relative z-10 p-6 sm:p-7">
                {/* `mode="popLayout"` (nunca "wait") + `variants` nomeadas em
                    vez de initial/animate/exit como objetos diretos — a
                    combinação que evita nós fantasmas se acumulando no DOM
                    ao trocar de painel rápido (lição já registrada em
                    memória do projeto). */}
                <AnimatePresence mode="popLayout" custom={panelView}>
                  {panelView === "compact" ? (
                    <motion.div
                      key="compact"
                      custom={panelView}
                      variants={viewVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.18 }}
                    >
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="relative flex-shrink-0">
                          <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[#fccc30]/30 blur-md motion-safe:animate-pulse" />
                          <div className="relative w-11 h-11 rounded-2xl bg-[#fccc30]/15 border border-[#fccc30]/25 flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-[#fccc30]" strokeWidth={1.8} />
                          </div>
                        </div>
                        <h2 className="font-display font-semibold text-white text-lg leading-snug pt-1.5">
                          Você decide o que compartilha.
                        </h2>
                      </div>

                      <p className="text-white/60 text-sm leading-relaxed mb-6">
                        Usamos cookies essenciais para o site funcionar e, com a sua permissão,
                        cookies de análise e marketing para melhorar sua experiência.{" "}
                        <Link
                          to="/politica-de-privacidade#dados-coletados"
                          className="text-[#fccc30] underline decoration-[#fccc30]/40 hover:decoration-[#fccc30] underline-offset-2"
                        >
                          Saiba mais
                        </Link>
                        .
                      </p>

                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={acceptAll}
                          className="w-full rounded-full bg-[#fccc30] text-[#132840] font-semibold text-sm py-3 hover:brightness-105 active:scale-[0.98] transition-all"
                        >
                          Aceitar todos
                        </button>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={rejectNonEssential}
                            className="flex-1 rounded-full border border-white/20 text-white text-sm font-medium py-3 hover:bg-white/5 active:scale-[0.98] transition-all"
                          >
                            Recusar
                          </button>
                          <button
                            type="button"
                            onClick={() => setPanelView("detalhado")}
                            className="flex-1 rounded-full border border-white/20 text-white/80 text-sm font-medium py-3 hover:bg-white/5 active:scale-[0.98] transition-all"
                          >
                            Personalizar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="detalhado"
                      custom={panelView}
                      variants={viewVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.18 }}
                    >
                      <div className="flex items-center gap-1.5 mb-5">
                        <button
                          type="button"
                          onClick={() => setPanelView("compact")}
                          aria-label="Voltar"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors -ml-1.5 flex-shrink-0"
                        >
                          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <h2 className="font-display font-semibold text-white text-lg">
                          Preferências de cookies
                        </h2>
                      </div>

                      <div className="space-y-2.5 mb-6">
                        <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3.5">
                          <div className="flex items-start gap-3">
                            <ShieldCheck className="w-4 h-4 text-white/45 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                            <div>
                              <p className="text-white text-sm font-medium mb-0.5">Necessários</p>
                              <p className="text-white/45 text-xs leading-relaxed">
                                Login, preferências e segurança. Sempre ativos.
                              </p>
                            </div>
                          </div>
                          <Switch checked disabled className="mt-0.5 data-[state=checked]:bg-white/25" />
                        </div>

                        {CATEGORIAS.map(({ id, icon: Icon, titulo, descricao }) => (
                          <div
                            key={id}
                            className="flex items-start justify-between gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3.5"
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="w-4 h-4 text-white/45 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                              <div>
                                <p className="text-white text-sm font-medium mb-0.5">{titulo}</p>
                                <p className="text-white/45 text-xs leading-relaxed">{descricao}</p>
                              </div>
                            </div>
                            <Switch
                              checked={draft[id]}
                              onCheckedChange={(checked) => setDraft((d) => ({ ...d, [id]: checked }))}
                              className="mt-0.5 data-[state=checked]:bg-[#fccc30]"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => savePreferences(draft)}
                        className="w-full rounded-full bg-[#fccc30] text-[#132840] font-semibold text-sm py-3 hover:brightness-105 active:scale-[0.98] transition-all"
                      >
                        Salvar preferências
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { CookieConsentWidget };
