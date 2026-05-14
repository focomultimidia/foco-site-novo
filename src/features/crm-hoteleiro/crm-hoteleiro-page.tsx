"use client";

import { useCrmHoteleiroPage } from "./hooks/use-crm-hoteleiro-page";
import {
  HeroSection,
  RecursosSection,
} from "./components";
import { GenericInfoSection } from "@/features/shared/components/generic-info-section";
import { INFO_SECTIONS } from "@/features/shared/content/info-sections";

// Provas Sociais importadas da Home e UI
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
import { SoftwareProductsCarousel, TrustedLogosMarquee } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";

import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

import { artigosMidia, depoimentos, numeros, videosData } from "@/features/shared/data/social-proof-data";


function CrmHoteleiroPage() {
  const { data, isLoading, isError, refetch } = useCrmHoteleiroPage();

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

      {/* Section 2: O que é um CRM */}
      <GenericInfoSection {...INFO_SECTIONS.crmHoteleiro} imageSide="right" />

      {/* Section 3: Recursos (com título/subtítulo customizado) */}
      <RecursosSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentos} />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua fidelização com CRM"
        subtitle="Depoimentos em vídeo de clientes que aumentaram a retenção de hóspedes"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Prova Social: Na Mídia */}
      <NaMidiaSection artigos={artigosMidia} />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numeros} />
      <TrustedLogosMarquee />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      {/* Prova Social: FAQ */}
      <FAQAccordion
        items={[
          { id: "1", question: "O que é um CRM Hoteleiro?", answer: "Um CRM Hoteleiro é um sistema de gestão de relacionamento com o cliente que centraliza dados de hóspedes, permite segmentação, automação de marketing e criação de campanhas personalizadas para fidelização." },
          { id: "2", question: "Como o CRM ajuda na fidelização?", answer: "O CRM permite conhecer profundamente cada hóspede, suas preferências e histórico. Com esses dados, você pode criar ofertas personalizadas, enviar lembretes de datas especiais e oferecer experiências únicas que incentivam o retorno." },
          { id: "3", question: "Quais integrações o CRM oferece?", answer: "Nosso CRM integra com PMS, Motor de Reservas, Channel Manager e ferramentas de marketing como RD Station, Mailchimp, Meta Ads e Google Ads, proporcionando uma visão 360° do cliente." },
          { id: "4", question: "Como funciona a automação de marketing?", answer: "Você cria fluxos automáticos de e-mail e WhatsApp que são disparados baseados em comportamentos do cliente: aniversário, aniversário de casamento, pós-estadia, recuperação de orçamentos e muito mais." },
          { id: "5", question: "As pesquisas de satisfação são personalizáveis?", answer: "Sim! Você pode criar pesquisas personalizadas com perguntas específicas sobre a experiência do hóspede e receber os resultados em tempo real para tomar decisões rápidas." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o CRM Hoteleiro"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para transformar dados em hóspedes fiéis?"
        subtitle="Solicite uma demonstração e descubra como o CRM da Foco pode aumentar sua fidelização e reservas diretas."
        badge="Comece agora"
      />
    </div>
  );
}

export { CrmHoteleiroPage };
