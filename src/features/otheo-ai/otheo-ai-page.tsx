import { HeroSection } from "./components/hero-section";
import { useSeo } from "@/features/shared/lib/use-seo";
import { ProblemaParallaxSection } from "./components/problema-parallax-section";
import { PilaresSection } from "./components/pilares-section";
import { OcupacaoSection } from "./components/ocupacao-section";
import { DisponibilidadeVendasSection } from "./components/disponibilidade-vendas-section";
import { TarifasSection } from "./components/tarifas-section";
import { MobileVozSection } from "./components/mobile-voz-section";
import { AcessoSection } from "./components/onde-vive-section";
import { ManifestoSection } from "./components/manifesto-section";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";

/**
 * OtheoAiPage — roteiro em 3 atos: problema (seis abas abertas) → como o
 * Otheo resolve (dois pilares) → os 3 assuntos que o time de produto pediu
 * destaque explícito (ocupação, disponibilidade, tarifas), cada um com sua
 * própria demonstração de chat. Mobile/voz fecha a parte de produto antes
 * do acesso (extranet/app) e do manifesto. Todas as seções de corpo em
 * `#f4f7fb` — só a hero foge do padrão claro do site.
 */
function OtheoAiPage() {
  useSeo({
    title: "Otheo AI: Assistente com Inteligência Artificial | Foco",
    description:
      "Otheo é o copiloto de IA da Foco: responde sobre ocupação, disponibilidade e tarifas em segundos, liberando sua equipe para atender o hóspede.",
    path: "/otheo-ai",
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemaParallaxSection />
      <PilaresSection />
      <OcupacaoSection />
      <DisponibilidadeVendasSection />
      <TarifasSection />
      <MobileVozSection />
      <AcessoSection />
      <ManifestoSection />

      <FAQAccordion
        items={[
          {
            id: "1",
            question: "O Otheo substitui a minha equipe?",
            answer:
              "Não. Ele cuida do repetitivo e das consultas rápidas para que sua equipe foque em atender o hóspede e tomar decisões, não em procurar informação espalhada pelo sistema.",
          },
          {
            id: "2",
            question: "Preciso configurar o Otheo com os dados do meu hotel?",
            answer:
              "Não é necessária nenhuma configuração manual. O Otheo já entende a estrutura da plataforma Foco e consulta os dados da sua operação em tempo real.",
          },
          {
            id: "3",
            question: "Funciona em português?",
            answer:
              "Sim, o Otheo entende e responde inteiramente em português, com uma conversa natural, sem comandos fixos ou palavras-chave.",
          },
          {
            id: "4",
            question: "Quando o aplicativo do Otheo estará disponível?",
            answer:
              "O app está em desenvolvimento e será publicado nas lojas em breve, com chat completo, mensagens de áudio e notificações push. Enquanto isso, o Otheo já está disponível na extranet.",
          },
          {
            id: "5",
            question: "Meus dados ficam seguros?",
            answer:
              "Sim. O Otheo consulta apenas os dados da sua própria operação, seguindo os mesmos padrões de segurança e privacidade de toda a plataforma Foco.",
          },
          {
            id: "6",
            question: "O Otheo consegue alterar tarifas de verdade, ou só sugere?",
            answer:
              "O agente de CRS e o agente Financeiro têm acesso às ferramentas certas para executar a alteração, não apenas sugerir. Fale com nosso time para confirmar o escopo exato dessa ação para o seu contrato.",
          },
          {
            id: "7",
            question: "Preciso confirmar cada ação antes do Otheo executar?",
            answer:
              "Sim. As ações mais sensíveis, como mudar uma tarifa ou fechar uma categoria, sempre mostram um resumo claro antes de serem aplicadas.",
          },
        ]}
        title="Dúvidas frequentes"
        subtitle="Tire suas dúvidas sobre o Otheo AI"
        badge="FAQ"
        showContactButton
      />

      <LeadCaptureCTA
        badge="Comece agora"
        title="Pronto para ter um copiloto de IA na sua operação?"
        subtitle="Solicite uma demonstração e veja o Otheo respondendo perguntas reais do seu hotel, ao vivo."
      />
    </div>
  );
}

export { OtheoAiPage };
