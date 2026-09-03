"use client";

import { useMotorReservasPage } from "./hooks/use-motor-reservas-page";
import { useSeo } from "@/features/shared/lib/use-seo";
import {
  HeroSection,
  VantagensSection,
  AumenteReservasSection,
  FuncionalidadesSection,
  IntegracoesMarketingSection,
  GerencieCelularSection,
} from "./components";
import { GenericInfoSection } from "@/features/shared/components/generic-info-section";
import { INFO_SECTIONS } from "@/features/shared/content/info-sections";

// Provas Sociais importadas da Home
import { NumerosSection } from "@/features/home/components/numeros-section";
import { SoftwareProductsCarousel, TrustedLogosMarquee, SmartIntegrationsTabs, WallOfLoveSection, DorParallaxSection } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";
import { useLeadCapture } from "@/features/shared/lib/lead-capture-context";
import { UltimasDoBlogSection } from "@/features/shared/components/ultimas-do-blog-section-lazy";
import { getProdutoIcone } from "@/features/shared/data/produtos-data";
import { WebsitePortfolioCarousel } from "@/features/shared/components";
//import { ProdutosAccordionSection } from "@/features/shared/components";


import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

import { artigosMidia, depoimentos, numeros, videosData } from "@/features/shared/data/social-proof-data";

const LEAD_TITLE = "Motor de Reservas";

function MotorReservasPage() {
  useSeo({
    title: "Motor de Reservas para Hotéis sem Comissão | Foco",
    description:
      "Motor de reservas com alta conversão: checkout simples, PIX e cartão integrados, comparador de preços e venda direta sem comissão de OTAs.",
    path: "/motor-de-reservas",
  });

  const { openLeadCapture } = useLeadCapture();
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
      <HeroSection
        data={data.hero}
        onCtaClick={() => openLeadCapture({ source: "form-motor-de-reservas", title: LEAD_TITLE, icon: getProdutoIcone("/motor-de-reservas") })}
      />

      {/* Section 2: O que é um motor de reservas */}
      <GenericInfoSection {...INFO_SECTIONS.motorReservas} imageSide="right" />

      {/* Diagnóstico: baixa ocupação (mesmo cenário da home) */}
      <DorParallaxSection
        dorId="baixa-ocupacao"
        backgroundImage="/assets/imgs/motor-de-reservas/dor.webp"
        backgroundAlt="Lobby de hotel vazio à noite, recepcionista sozinha aguardando hóspedes"
      />

      {/* Prova Social: Cases de sucesso */}
      <TrustedLogosMarquee />

      {/* Section 3: Modelos de sites */}
      <WebsitePortfolioCarousel />

      {/* Section 4: Vantagens do motor de reservas */}
      <VantagensSection />

      {/* Section 5: Funcionalidades */}
      <FuncionalidadesSection />

      {/* Prova Social: Mural de depoimentos (texto + vídeo, unificados) */}
      <WallOfLoveSection
        depoimentos={depoimentos}
        videos={videosData}
        badge="Depoimentos"
        title="Um mural de resultados reais"
        subtitle="Cada card aqui é um hoteleiro de verdade, contando como a Foco aumentou suas reservas diretas."
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

      {/* Prova Social: Na Mídia */}
      <NaMidiaSection artigos={artigosMidia} />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      <UltimasDoBlogSection productSlug="motor-de-reservas" />

      {/* Prova Social: FAQ */}
      <FAQAccordion
        items={data.faq.map((f) => ({ id: f.id, question: f.pergunta, answer: f.resposta }))}
        title="Perguntas frequentes sobre o Motor de reservas da Foco"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para aumentar suas reservas diretas?"
        subtitle="Solicite uma demonstração e descubra como o Motor de Reservas da Foco pode transformar seu negócio."
        badge="Comece agora"
        source="motor-de-reservas"
        leadTitle={LEAD_TITLE}
      />

    </div>
  );
}

export { MotorReservasPage };
