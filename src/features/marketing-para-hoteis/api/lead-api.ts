interface MarketingLeadPayload {
  nome:            string;
  estabelecimento: string;
  telefone:        string;
  email:           string;
  clienteFoco:     boolean;
}

// Mock — mesmo padrão de submitPmsOrcamento em integracoes-hoteleiras-api.ts
// (todo o backend do site ainda é simulado). Payload já tipado e pronto pra
// trocar pela chamada real ao CRM assim que o endpoint existir.
async function submitMarketingLead(payload: MarketingLeadPayload): Promise<{ success: true }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info("[marketing-para-hoteis] Lead do formulário (mock):", payload);
  return { success: true };
}

export { submitMarketingLead };
export type { MarketingLeadPayload };
