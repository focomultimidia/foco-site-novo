// `necessary` não é um campo de escolha — está aqui só pra tipar o objeto
// salvo por completo. O site nunca lê `consent.necessary` pra decidir se
// carrega algo (esses cookies já são exigidos pro site funcionar).
export interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export type ConsentCategory = "analytics" | "marketing";

export interface StoredConsent extends ConsentPreferences {
  version: number;
  decidedAt: string;
}
