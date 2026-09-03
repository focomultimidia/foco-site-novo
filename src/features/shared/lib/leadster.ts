// openLeadster — ponto único de acesso ao widget do Leadster (Neurolead).
// O script (`neurolead.min.js`) é injetado pelo próprio GTM, não pelo nosso
// código (ver comentário sobre a tag Neurolead em index.html) — `window.
// neurolead` só existe depois que essa tag dispara, o que pode acontecer
// bem depois do primeiro clique num CTA (GTM carrega adiado de propósito).
// Daí o acesso encadeado com `?.`: chamar antes do widget carregar não
// pode quebrar o clique do usuário, só vira um no-op silencioso.
//
// Todo botão que precisa abrir o Leadster chama ESTA função — nunca
// `window.neurolead.open()` direto — pra manter um único lugar sabendo
// como o widget é acessado.

declare global {
  interface Window {
    neurolead?: {
      open?: () => void;
    };
  }
}

function openLeadster(): void {
  window?.neurolead?.open?.();
}

export { openLeadster };
