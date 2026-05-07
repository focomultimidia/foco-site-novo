"use client";

import { useMotorReservasPage } from "./hooks/use-motor-reservas-page";
import {
  HeroSection,
  OQueESection,
  VantagensSection,
  AumenteReservasSection,
  FuncionalidadesSection,
  IntegracoesMarketingSection,
  GerencieCelularSection,
} from "./components";

// Provas Sociais importadas da Home
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { SoftwareProductsCarousel, TrustedLogosMarquee, SmartIntegrationsTabs } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";
import { WebsitePortfolioCarousel } from "@/features/shared/components";

import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

import { artigosMidia, depoimentos, numeros, videosData } from "@/features/shared/data/social-proof-data";


function MotorReservasPage() {
  const { data, isLoading, isError, refetch } = useMotorReservasPage();

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

      {/* Section 2: O que é um motor de reservas */}
      <OQueESection />

      {/* Prova Social: Cases de sucesso */}
      <TrustedLogosMarquee />

      {/* Section 3: Modelos de sites */}
      <WebsitePortfolioCarousel />

      {/* Section 4: Vantagens do motor de reservas */}
      <VantagensSection />

      {/* Section 5: Funcionalidades */}
      <FuncionalidadesSection />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou suas vendas"
        subtitle="Depoimentos em vídeo de clientes que aumentaram suas reservas diretas"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Section 6: Aumente as reservas diretas */}
      <AumenteReservasSection />

      {/* Section 7: Integrações de Marketing */}
      <IntegracoesMarketingSection />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numeros} />

      {/* Section 8: Gerencie pelo celular */}
      <GerencieCelularSection />

      {/* Section 9: Integrações Inteligentes */}
      <SmartIntegrationsTabs />

      {/* Prova Social: Aprovação 97% - Depoimentos */}
      <DepoimentosSection depoimentos={depoimentos} />

      {/* Prova Social: Na Mídia */}
      <NaMidiaSection artigos={artigosMidia} />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para aumentar suas reservas diretas?"
        subtitle="Solicite uma demonstração e descubra como o Motor de Reservas da Foco pode transformar seu negócio."
        badge="Comece agora"
      />

      {/* Prova Social: FAQ */}
      <FAQAccordion
        items={data.faq.map((f) => ({ id: f.id, question: f.pergunta, answer: f.resposta }))}
        title="Perguntas frequentes sobre o Motor de reservas da Foco"
        badge="FAQ"
        showContactButton
      />

    </div>
  );
}

export { MotorReservasPage };
