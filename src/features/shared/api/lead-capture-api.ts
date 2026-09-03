// ── Captura de lead — genérico ───────────────────────────────────────────────
// Usado por todo CTA de "solicitar demonstração/orçamento" do site (heros das
// páginas internas, botão "Fale com um consultor" do header, CTAs finais e os
// botões de "Quero saber mais" da TiposPropriedadeSection na home) através do
// LeadCaptureModal + LeadCaptureProvider (ver
// src/features/shared/lib/lead-capture-context.tsx).

interface LeadCapturePayload {
  /** De onde veio o lead — "form-[nome da página de origem]" pros botões
      padrão (ex.: "form-motor-de-reservas", "form-home"); outros valores
      (ex.: "planos_turbo" em marketing-para-hoteis) continuam válidos fora
      desse conjunto, quando a informação extra importa mais que a
      uniformidade. */
  source:          string;
  nome:            string;
  email:           string;
  telefone:        string;
  estabelecimento: string;
  clienteFoco:     boolean;
}

// ── RD Station Marketing — API de Conversões (legada) ───────────────────────
// Endpoint feito pra ser chamado direto do navegador (o mesmo mecanismo por
// trás dos formulários embutíveis do próprio RD Station) — sem backend, sem
// OAuth, só o token público da conta. `identificador` é o nome do evento de
// conversão dentro do RD Station: um por `source` (em vez de um identificador
// único genérico) pra cada botão do site virar uma conversão rastreável em
// separado nos relatórios/funis do RD Station. Qualquer campo fora da lista
// de campos padrão (email, name, mobile_phone...) vira automaticamente um
// campo customizado na conta, criado na primeira convesão que o enviar — não
// precisa ser pré-cadastrado no RD Station antes.
const RD_STATION_TOKEN = import.meta.env.VITE_RD_STATION_TOKEN;
const RD_STATION_CONVERSION_URL = "https://www.rdstation.com.br/api/1.3/conversions";

function toRdStationPayload(payload: LeadCapturePayload) {
  return {
    token_rdstation: RD_STATION_TOKEN,
    identificador: `site-${payload.source}`,
    email: payload.email,
    name: payload.nome,
    mobile_phone: payload.telefone,
    // Campos customizados — identificadores em snake_case, criados
    // automaticamente pelo RD Station na primeira convesão recebida com eles.
    estabelecimento: payload.estabelecimento,
    cliente_da_foco: payload.clienteFoco ? "Sim" : "Não",
    origem_do_lead: payload.source,
    // Consentimento LGPD — o formulário já exige o aceite da política de
    // privacidade antes de habilitar o envio (ver LeadCaptureModal), então
    // toda convesão que chega aqui já tem esse consentimento coletado.
    legal_bases: [
      {
        category: "communications",
        type: "consent",
        status: "granted",
      },
    ],
  };
}

async function submitLeadCapture(payload: LeadCapturePayload): Promise<{ success: true }> {
  if (!RD_STATION_TOKEN) {
    // Sem token configurado (.env.local ausente, ex.: clone novo do repo em
    // dev) — cai pro mock em vez de quebrar, mesmo padrão de antes.
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.info("[lead-capture] VITE_RD_STATION_TOKEN ausente — envio simulado (mock):", payload);
    return { success: true };
  }

  const response = await fetch(RD_STATION_CONVERSION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toRdStationPayload(payload)),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`RD Station respondeu ${response.status}: ${body}`);
  }

  return { success: true };
}

export { submitLeadCapture };
export type { LeadCapturePayload };
