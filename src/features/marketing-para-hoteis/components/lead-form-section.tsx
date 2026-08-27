"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Target, Users, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PolicyModal } from "@/features/politica-de-privacidade/components/policy-modal";
import { submitMarketingLead } from "../api/lead-api";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const CARD_BG = "linear-gradient(135deg, #1e4d85 0%, #285992 45%, #3a72b0 100%)";

// ── Form state ────────────────────────────────────────────────────────────────
interface FormState {
  nome:            string;
  estabelecimento: string;
  telefone:        string;
  email:           string;
  clienteFoco:     "sim" | "nao" | "";
}

const EMPTY_FORM: FormState = { nome: "", estabelecimento: "", telefone: "", email: "", clienteFoco: "" };

// Formatação progressiva (99) 99999-9999 conforme o usuário digita — mesma
// técnica de pms-orcamento-modal.tsx (sem util compartilhado no codebase,
// mesmo precedente de duplicar essa função por formulário).
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

function Field({
  label, htmlFor, error, children,
}: {
  label:    string;
  htmlFor:  string;
  error?:   string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-[13px] font-medium text-[#132840]">
        {label}
      </label>
      {children}
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}

// ── InfoPanel ─────────────────────────────────────────────────────────────────
// Metade esquerda — não é só copy de reforço, é uma prévia real do que
// acontece depois do envio (retorno rápido, humano, sem fila), fechada com
// um mockup de chat que torna essa promessa tangível em vez de abstrata —
// mesmo espírito dos ad-mockups do hero, aplicado aqui pra "provar" a
// velocidade de resposta em vez de só declará-la em texto.
const CHECKLIST = [
  { icon: Clock, text: "Retorno em até 1 dia útil, direto com um consultor" },
  { icon: Target, text: "Diagnóstico gratuito da presença digital do seu hotel" },
  { icon: Users, text: "Atendimento direto — sem SDR, sem fila de espera" },
  { icon: ShieldCheck, text: "Seus dados protegidos, zero spam" },
] as const;

function InfoPanel() {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden p-8 sm:p-10 lg:p-12" style={{ background: CARD_BG }}>
      {/* Textura decorativa — grade de pontos + glow, mesmo espírito do
          brilho diagonal do PlanosSection, mas em repouso (não hover) já
          que aqui é sempre visível, não um estado de interação. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      <div className="relative z-10">
        <h3 className="font-display mb-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          O que acontece depois que você envia
        </h3>
        <ul className="flex flex-col gap-4">
          {CHECKLIST.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/15">
                <Icon className="h-4 w-4 text-[#fccc30]" strokeWidth={1.8} />
              </span>
              <span className="pt-1 text-[14.5px] leading-snug text-blue-50/90">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 mt-10 text-[12.5px] text-blue-100/60">+2.700 hotéis já confiam na Foco</p>
    </div>
  );
}

// ── LeadFormSection ───────────────────────────────────────────────────────────
function LeadFormSection() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [aceitePolitica, setAceitePolitica] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "aceitePolitica", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.nome.trim()) next.nome = "Informe seu nome";
    if (!form.estabelecimento.trim()) next.estabelecimento = "Informe o nome do estabelecimento";
    if (form.telefone.replace(/\D/g, "").length < 10) next.telefone = "Informe um telefone válido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Informe um e-mail válido";
    if (!form.clienteFoco) next.clienteFoco = "Selecione uma opção";
    if (!aceitePolitica) next.aceitePolitica = "É necessário aceitar a política de privacidade";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitMarketingLead({
        nome:            form.nome.trim(),
        estabelecimento: form.estabelecimento.trim(),
        telefone:        form.telefone,
        email:           form.email.trim(),
        clienteFoco:     form.clienteFoco === "sim",
      });
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setAceitePolitica(false);
    setErrors({});
    setIsSuccess(false);
  }

  return (
    <section id="diagnostico-gratuito" className="relative overflow-hidden bg-[#f4f7fb] py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <SectionEyebrow className="justify-center">Diagnóstico gratuito</SectionEyebrow>
          <h2 className="font-display mb-4 text-4xl font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased sm:text-5xl">
            Antes de aplicar a metodologia,{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              queremos entender seu hotel
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Preencha o formulário e um consultor retorna com um diagnóstico honesto — sem letra miúda, sem contrato
            na primeira ligação.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[32px] shadow-2xl shadow-[#132840]/10 ring-1 ring-black/5 lg:grid lg:grid-cols-[1fr_1.15fr]"
        >
          <InfoPanel />

          <div className="relative bg-white p-8 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-full flex-col items-center justify-center py-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#285992]/10 text-[#285992]"
                  >
                    <CheckCircle2 className="h-7 w-7" strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="font-display mb-2 text-xl font-semibold text-[#132840]">Solicitação enviada!</h3>
                  <p className="mb-7 max-w-xs text-sm leading-relaxed text-slate-500">
                    Recebemos seus dados. Nossa equipe entra em contato em breve pra montar o diagnóstico do seu
                    hotel.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-medium text-[#285992] underline decoration-[#285992]/30 underline-offset-2 hover:decoration-[#285992]"
                  >
                    Preencher novamente
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Nome" htmlFor="lead-nome" error={errors.nome}>
                      <input
                        id="lead-nome"
                        value={form.nome}
                        onChange={(e) => updateField("nome", e.target.value)}
                        placeholder="Seu nome"
                        className={fieldClass(!!errors.nome)}
                      />
                    </Field>
                    <Field label="Estabelecimento" htmlFor="lead-estabelecimento" error={errors.estabelecimento}>
                      <input
                        id="lead-estabelecimento"
                        value={form.estabelecimento}
                        onChange={(e) => updateField("estabelecimento", e.target.value)}
                        placeholder="Nome do hotel ou pousada"
                        className={fieldClass(!!errors.estabelecimento)}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Telefone" htmlFor="lead-telefone" error={errors.telefone}>
                      <input
                        id="lead-telefone"
                        type="tel"
                        inputMode="numeric"
                        value={form.telefone}
                        onChange={(e) => updateField("telefone", formatTelefone(e.target.value.replace(/\D/g, "").slice(0, 11)))}
                        placeholder="(00) 00000-0000"
                        className={fieldClass(!!errors.telefone)}
                      />
                    </Field>
                    <Field label="E-mail" htmlFor="lead-email" error={errors.email}>
                      <input
                        id="lead-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="seu@email.com"
                        className={fieldClass(!!errors.email)}
                      />
                    </Field>
                  </div>

                  <Field label="Você é cliente Foco?" htmlFor="lead-cliente-foco-sim" error={errors.clienteFoco}>
                    <RadioGroup
                      value={form.clienteFoco}
                      onValueChange={(v) => updateField("clienteFoco", v as "sim" | "nao")}
                      className="grid grid-cols-2 gap-2.5"
                    >
                      {(["sim", "nao"] as const).map((v) => (
                        <label
                          key={v}
                          htmlFor={`lead-cliente-foco-${v}`}
                          className="relative flex h-10 items-center justify-center rounded-xl border border-slate-200 transition-colors has-[[data-state=checked]]:border-[#285992] has-[[data-state=checked]]:bg-[#285992]/[0.06]"
                        >
                          <RadioGroupItem id={`lead-cliente-foco-${v}`} value={v} className="peer sr-only" />
                          <span className="text-[14px] font-medium text-slate-500 transition-colors peer-data-[state=checked]:text-[#285992]">
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
                      <label htmlFor="lead-aceite-politica" className="cursor-pointer select-none text-[13.5px] leading-snug text-slate-500">
                        Li e aceito a{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsPolicyOpen(true);
                          }}
                          className="font-medium text-[#285992] underline decoration-[#285992]/30 underline-offset-2 hover:decoration-[#285992]"
                        >
                          Política de Privacidade
                        </button>
                      </label>
                    </div>
                    {errors.aceitePolitica && <p className="mt-1.5 text-[12px] text-red-500">{errors.aceitePolitica}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-t from-[#285992] to-[#427ab9] text-sm font-semibold text-white shadow-lg shadow-[#285992]/25 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Enviando..." : "Quero meu diagnóstico gratuito"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </section>
  );
}

export { LeadFormSection };
