"use client";

import { useChannelManagerPage } from "./hooks/use-channel-manager-page";
import {
  HeroSection,
  OQueESection,
  VantagensSection,
  AplicativoSection,
  RecursosSection,
  ChannelManagerFlow,
} from "./components";

// Provas Sociais importadas da Home e UI
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
import { SoftwareProductsCarousel, TrustedLogosMarquee, SmartIntegrationsTabs } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";

import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

import { artigosMidia, depoimentos, numeros, videosData } from "@/features/shared/data/social-proof-data";


function ChannelManagerPage() {
  const { data, isLoading, isError, refetch } = useChannelManagerPage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Empty className="text-center">
          <EmptyHeader>
            <EmptyTitle>Erro ao carregar dados</EmptyTitle>
            <EmptyDescription>
              Não foi possível carregar o conteúdo da página. Tente novamente.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => refetch()} variant="outline" className="rounded-full px-6">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Section 1: Hero */}
      <HeroSection data={data.hero} />

      {/* Section 2: O que é um gestor de canais */}
      <OQueESection />

      {/* Section 3: Fluxo de sincronização */}
      <ChannelManagerFlow />

      {/* Section 4: Vantagens do gestor de canais */}
      <VantagensSection />

      {/* Section 5: Aplicativo mobile */}
      <AplicativoSection />

      {/* Section 6: Recursos */}
      <RecursosSection />

      {/* Integrações Inteligentes */}
      <SmartIntegrationsTabs />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua gestão de canais"
        subtitle="Depoimentos em vídeo de clientes que eliminaram o overbooking e aumentaram a ocupação"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Prova Social: Na Mídia */}
      <NaMidiaSection artigos={artigosMidia} />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentos} />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numeros} />
      <TrustedLogosMarquee />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      {/* Prova Social: FAQ */}
      <FAQAccordion
        items={[
          { id: "1", question: "O que é um Channel Manager?", answer: "Um Channel Manager (ou Gestor de Canais) é um software que sincroniza automaticamente as reservas, disponibilidade e tarifas do seu hotel em todos os canais de vendas conectados, eliminando o risco de overbooking." },
          { id: "2", question: "Com quantos canais o Channel Manager da Foco integra?", answer: "Nosso Channel Manager integra com mais de 800 canais de vendas, incluindo as principais OTAs globais e regionais, GDS, canais corporativos e o motor de reservas do seu site." },
          { id: "3", question: "Posso automatizar o pagamento das reservas do gestor de canais?", answer: "Através do sistema Foco Pay, todas as reservas do Gestor de canais e Motor de reservas podem ser cobradas automaticamente pelo robô, de acordo com configurações pré determinadas para cada canal, política ou tipo de cartão de crédito." },
          { id: "4", question: "O Channel Manager integra com meu PMS?", answer: "Sim, oferecemos integração two-way com os principais PMS do mercado brasileiro, garantindo sincronização completa de reservas, cancelamentos e alterações." },
          { id: "5", question: "Posso gerenciar pelo celular?", answer: "Sim! Nosso aplicativo mobile permite que você gerencie tarifas, disponibilidade, reservas e visualize relatórios de qualquer lugar, a qualquer momento." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Channel Manager"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para eliminar o overbooking e aumentar sua ocupação?"
        subtitle="Solicite uma demonstração e descubra como o Channel Manager da Foco pode transformar a gestão do seu hotel."
        badge="Comece agora"
      />
    </div>
  );
}

export { ChannelManagerPage };
