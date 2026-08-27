"use client";

import { useState } from "react";
import {
  HeroSection,
  PorQueInvestirSection,
  DiferenciaisSection,
  JornadaSection,
  LeadFormSection,
  CanaisSection,
  PostsShowcaseSection,
  PlanosSection,
} from "./components";
import { WallOfLoveSection, TrustedLogosMarquee, CertificacoesSection } from "@/features/shared/components";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";
import { LeadCaptureModal } from "@/components/shared/lead-capture-modal";
import { useSeo } from "@/features/shared/lib/use-seo";
import { depoimentos, numeros, videosData } from "@/features/shared/data/social-proof-data";

const PLANO_NOMES: Record<string, string> = {
  turbo: "Marketing Turbo",
  premium: "Marketing Premium",
};

const FAQ_ITEMS = [
  {
    id: "1",
    question: "Quanto tempo leva pra ver resultado com marketing digital hoteleiro?",
    answer:
      "Os primeiros cliques e impressões aparecem em poucos dias, mas resultado consistente em reserva direta costuma aparecer entre 30 e 60 dias — tempo pro algoritmo aprender e pras campanhas serem otimizadas com dado real do seu hotel.",
  },
  {
    id: "2",
    question: "Preciso ter site e motor de reservas prontos antes de começar?",
    answer:
      "Não precisa ter tudo pronto. Se você já usa o site e o motor de reservas da Foco, a integração é imediata; se usa outro fornecedor, adaptamos a estratégia — mas recomendamos ter pelo menos um motor de reservas funcionando antes de investir em tráfego pago, senão o anúncio manda o hóspede pra um formulário de contato, não pra uma reserva.",
  },
  {
    id: "3",
    question: "Vocês só administram anúncios ou também criam o conteúdo?",
    answer:
      "As duas coisas. Nossa equipe cria os criativos — imagem, vídeo, copy — e administra a compra de mídia. Você não precisa contratar um designer separado nem terceirizar a produção.",
  },
  {
    id: "4",
    question: "Como vocês medem resultado — é tráfego ou reserva de verdade?",
    answer:
      "Medimos reserva direta gerada, não só clique ou impressão. As tags de monitoramento ficam no seu site e motor de reservas, então o relatório mensal mostra quantas reservas — e qual receita — vieram de cada campanha.",
  },
  {
    id: "5",
    question: "Dá pra migrar de outra agência sem perder histórico de campanha?",
    answer:
      "Sim. O histórico de performance fica vinculado à sua própria conta de anúncios (Meta e Google), não à agência — migramos o acesso e seguimos otimizando a partir do que já funcionava, sem começar do zero.",
  },
];

// ── MarketingParaHoteisPage ──────────────────────────────────────────────
// Conteúdo completo: hero + 5 seções autorais (gancho, diferenciais,
// metodologia, canais, planos) + bloco de prova social reaproveitado dos
// componentes já existentes (mesmos dados reais usados em crm-hoteleiro,
// home etc.) + FAQ + CTA final. Sem API/loading state — mesmo precedente de
// "sobre" e "otheo-ai", que também não buscam dados remotos.
function MarketingParaHoteisPage() {
  useSeo({
    title: "Marketing para Hotéis e Pousadas | Foco Tecnologia",
    description:
      "Estratégias de marketing digital para hotéis e pousadas: mais reservas diretas, menos dependência de OTAs e um funil pensado para a hotelaria.",
    path: "/marketing-para-hoteis",
  });

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState<string | null>(null);

  const planoNome = selectedPlano ? PLANO_NOMES[selectedPlano] : undefined;

  return (
    <div className="space-y-0">
      <HeroSection onCtaClick={() => { setSelectedPlano(null); setIsLeadModalOpen(true); }} />

      <PorQueInvestirSection />

      <DiferenciaisSection />

      <JornadaSection />

      <LeadFormSection />

      <CanaisSection />

      <PostsShowcaseSection />

      <PlanosSection
        onSelectPlano={(planoId) => {
          setSelectedPlano(planoId);
          setIsLeadModalOpen(true);
        }}
      />

      {/* Prova Social: Mural de depoimentos (texto + vídeo, unificados) */}
      <WallOfLoveSection
        depoimentos={depoimentos}
        videos={videosData}
        badge="Depoimentos"
        title="Hoteleiros que já venderam mais direto"
        subtitle="Cada card aqui é um hoteleiro de verdade, contando como a Foco aumentou reservas e reduziu dependência de terceiros."
      />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numeros} />
      <TrustedLogosMarquee />
      <CertificacoesSection />

      <FAQAccordion items={FAQ_ITEMS} title="Dúvidas Frequentes" subtitle="Tire suas dúvidas sobre marketing digital para hotelaria" badge="FAQ" showContactButton />

      <LeadCaptureCTA
        badge="Comece agora"
        title="Pronto para vender mais reservas diretas?"
        subtitle="Fale com um consultor e descubra como a Foco pode estruturar o marketing digital do seu hotel."
      />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title={planoNome ? `Solicitar o plano ${planoNome}` : "Solicite uma Demonstração Grátis"}
        description={
          planoNome
            ? `Preencha seus dados e nossa equipe entrará em contato pra montar o ${planoNome} pro seu hotel.`
            : "Preencha seus dados e nossa equipe entrará em contato para falar sobre marketing digital para o seu hotel."
        }
        source="marketing-para-hoteis"
      />
    </div>
  );
}

export { MarketingParaHoteisPage };
