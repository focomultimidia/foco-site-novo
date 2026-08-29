"use client";

// LeadCaptureModal — versão genérica do formulário premium originalmente
// criado só pra pedir orçamento de integração com um PMS específico (ver
// src/features/integracoes-hoteleiras/components/pms-orcamento-modal.tsx,
// que continua existindo à parte — fluxo diferente, por PMS individual).
// Este componente é o padrão único de captura de lead do resto do site:
// mesmo visual, mesmos campos (Nome, Email, Telefone, Estabelecimento,
// "Você é cliente da Foco?", aceite de política), só que parametrizado por
// `title`/`logo`/`source` em vez de amarrado a um objeto `pms`. Normalmente
// não é instanciado direto — ver useLeadCapture()/LeadCaptureProvider em
// src/features/shared/lib/lead-capture-context.tsx.

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, X, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PolicyModal } from "@/features/politica-de-privacidade/components/policy-modal";
import { submitLeadCapture } from "@/features/shared/api/lead-capture-api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface LeadCaptureModalProps {
  isOpen:  boolean;
  onClose: () => void;
  /** Texto principal do cabeçalho — ex.: "Motor de Reservas", "Foco Tecnologia". Renderizado como "Contato: {title}". */
  title:   string;
  /** Selo acima do título — default "Solicitar orçamento". */
  eyebrow?: string;
  /** Logo/ícone opcional ao lado do título — sem ele, cai no mesmo placeholder tracejado do PmsOrcamentoModal. */
  logo?:    string;
  /** De onde veio o lead (hero de qual página, header, CTA final, etc.) — vai junto no payload do envio. */
  source:   string;
}

interface FormState {
  nome:            string;
  email:           string;
  telefone:        string;
  estabelecimento: string;
  clienteFoco:     "sim" | "nao" | "";
}

const EMPTY_FORM: FormState = { nome: "", email: "", telefone: "", estabelecimento: "", clienteFoco: "" };

// ── Helpers ───────────────────────────────────────────────────────────────────

// Formatação progressiva (99) 99999-9999 conforme o usuário digita.
function formatTelefone(digits: string) {
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-[14.5px] text-[#132840] placeholder:text-slate-400 outline-none transition-colors duration-200 focus:ring-4";

function fieldClass(hasError: boolean) {
  return hasError
    ? `${inputClass} border-red-300 focus:border-red-400 focus:ring-red-100`
    : `${inputClass} border-slate-200 focus:border-[#285992] focus:ring-[#285992]/10`;
}

// ── Field ─────────────────────────────────────────────────────────────────────

function Field({
  label, htmlFor, error, hint, children,
}: {
  label:    string;
  htmlFor:  string;
  error?:   string;
  hint?:    string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-[13px] font-medium text-[#132840]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] text-red-500">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

// ── LeadCaptureModal ──────────────────────────────────────────────────────────

function LeadCaptureModal({ isOpen, onClose, title, eyebrow = "Solicitar orçamento", logo, source }: LeadCaptureModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [aceitePolitica, setAceitePolitica] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "aceitePolitica", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Reseta o formulário toda vez que o modal abre, pra não vazar dados de
  // uma solicitação anterior (fonte diferente) pra próxima.
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM);
      setAceitePolitica(false);
      setErrors({});
      setIsSuccess(false);
      setSubmitError(null);
    }
  }, [isOpen]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.nome.trim()) next.nome = "Informe seu nome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Informe um e-mail válido";
    if (form.telefone.replace(/\D/g, "").length < 10) next.telefone = "Informe um telefone válido";
    if (!form.estabelecimento.trim()) next.estabelecimento = "Informe o meio de hospedagem";
    if (!form.clienteFoco) next.clienteFoco = "Selecione uma opção";
    if (!aceitePolitica) next.aceitePolitica = "É necessário aceitar a política de privacidade";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitLeadCapture({
        source,
        nome:            form.nome.trim(),
        email:           form.email.trim(),
        telefone:        form.telefone,
        estabelecimento: form.estabelecimento.trim(),
        clienteFoco:     form.clienteFoco === "sim",
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("[lead-capture] Falha ao enviar:", err);
      setSubmitError("Não foi possível enviar sua solicitação. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          showCloseButton={false}
          className="p-0 gap-0 w-[calc(100%-2rem)] sm:max-w-md rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-black/20 overflow-hidden"
        >
          <DialogTitle className="sr-only">
            {isSuccess ? "Solicitação enviada" : `Contato: ${title}`}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulário de contato para solicitar uma demonstração ou orçamento da Foco Tecnologia.
          </DialogDescription>

          {isSuccess ? (
            <div className="flex flex-col items-center text-center px-6 sm:px-8 py-12">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-14 h-14 rounded-full bg-[#285992]/10 text-[#285992] flex items-center justify-center mb-5"
              >
                <CheckCircle2 className="w-7 h-7" strokeWidth={1.8} />
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-[#132840] mb-2">Solicitação enviada!</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-7">
                Recebemos seu pedido de contato. Nossa equipe entrará em contato em breve.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-8 h-11 rounded-full bg-[#132840] text-white text-sm font-semibold hover:bg-[#1e3a5f] transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="relative px-6 sm:px-8 pt-7 pb-6 border-b border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar"
                  className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>

                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-[#285992] bg-[#285992]/8 border border-[#285992]/15 rounded-full px-3 py-1 mb-3">
                  {eyebrow}
                </span>

                <div className="flex items-center gap-3 pr-8">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0">
                    {logo ? (
                      <img src={logo} alt="" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-slate-300" strokeWidth={1.5} />
                    )}
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#132840] tracking-tight leading-tight">
                    Contato: {title}
                  </h2>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-4 max-h-[65vh] overflow-y-auto">
                <Field label="Nome" htmlFor="lead-nome" error={errors.nome}>
                  <input
                    id="lead-nome"
                    value={form.nome}
                    onChange={(e) => updateField("nome", e.target.value)}
                    placeholder="Nome"
                    className={fieldClass(!!errors.nome)}
                  />
                </Field>

                <Field label="Email" htmlFor="lead-email" error={errors.email}>
                  <input
                    id="lead-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Email"
                    className={fieldClass(!!errors.email)}
                  />
                </Field>

                <Field
                  label="Telefone"
                  htmlFor="lead-telefone"
                  error={errors.telefone}
                  hint="Formato: (99) 99999-9999"
                >
                  <input
                    id="lead-telefone"
                    type="tel"
                    inputMode="numeric"
                    value={form.telefone}
                    onChange={(e) => updateField("telefone", formatTelefone(e.target.value.replace(/\D/g, "").slice(0, 11)))}
                    placeholder="Telefone"
                    className={fieldClass(!!errors.telefone)}
                  />
                </Field>

                <Field label="Estabelecimento" htmlFor="lead-estabelecimento" error={errors.estabelecimento}>
                  <input
                    id="lead-estabelecimento"
                    value={form.estabelecimento}
                    onChange={(e) => updateField("estabelecimento", e.target.value)}
                    placeholder="Meio de hospedagem"
                    className={fieldClass(!!errors.estabelecimento)}
                  />
                </Field>

                <Field label="Você é cliente da Foco?" htmlFor="lead-cliente-foco-sim" error={errors.clienteFoco}>
                  <RadioGroup
                    value={form.clienteFoco}
                    onValueChange={(v) => updateField("clienteFoco", v as "sim" | "nao")}
                    className="grid grid-cols-2 gap-2.5"
                  >
                    {(["sim", "nao"] as const).map((v) => (
                      <label
                        key={v}
                        htmlFor={`lead-cliente-foco-${v}`}
                        className="relative flex items-center justify-center h-10 rounded-xl border border-slate-200 cursor-pointer transition-colors has-[[data-state=checked]]:border-[#285992] has-[[data-state=checked]]:bg-[#285992]/[0.06]"
                      >
                        <RadioGroupItem id={`lead-cliente-foco-${v}`} value={v} className="peer sr-only" />
                        <span className="text-[14px] font-medium text-slate-600 peer-data-[state=checked]:text-[#285992] transition-colors">
                          {v === "sim" ? "Sim" : "Não"}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </Field>

                <div>
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="lead-aceite-politica"
                      checked={aceitePolitica}
                      onCheckedChange={(v) => {
                        setAceitePolitica(v === true);
                        setErrors((e) => ({ ...e, aceitePolitica: undefined }));
                      }}
                      className="mt-0.5 data-[state=checked]:bg-[#285992] data-[state=checked]:border-[#285992]"
                    />
                    <label htmlFor="lead-aceite-politica" className="text-[13.5px] text-slate-500 leading-snug cursor-pointer select-none">
                      Li e aceito a{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsPolicyOpen(true);
                        }}
                        className="font-medium text-[#285992] underline decoration-[#285992]/30 hover:decoration-[#285992] underline-offset-2"
                      >
                        Política de Privacidade
                      </button>
                    </label>
                  </div>
                  {errors.aceitePolitica && <p className="text-[12px] text-red-500 mt-1.5">{errors.aceitePolitica}</p>}
                </div>

                {submitError && (
                  <p className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-[13px] text-red-600">
                    {submitError}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 h-11 rounded-full border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-11 rounded-full bg-gradient-to-t from-[#285992] to-[#427ab9] text-white text-sm font-semibold shadow-lg shadow-[#285992]/25 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </>
  );
}

export { LeadCaptureModal };
export type { LeadCaptureModalProps };
