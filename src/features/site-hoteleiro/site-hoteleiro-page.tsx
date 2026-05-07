"use client";

import { useSiteHoteleiroPage } from "./hooks/use-site-hoteleiro-page";
import {
  HeroSection,
  RecursosGridSection,
  ExperienciasSection,
  VantagensSection,
  ReservaSection,
  PorQueEscolherSection,
  IntegracoesSolucoesSection,
} from "./components";
import { EventosSection } from "@/features/home/components/eventos-section";
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { WebsitePortfolioCarousel } from "@/features/shared/components";
import { SoftwareProductsCarousel, TrustedLogosMarquee } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";
import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { eventos, depoimentos, numeros, videosData } from "@/features/shared/data/social-proof-data";

function SiteHoteleiroPage() {
  const { data, isLoading, error, refetch } = useSiteHoteleiroPage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  if (error || !data) {
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
      {/* Hero Section */}
      <HeroSection data={data.hero} />

      {/* Section 1: Modelos de sites */}
      <WebsitePortfolioCarousel />

      <TrustedLogosMarquee />

      {/* Seção 2: Por que escolher a Foco */}
      <PorQueEscolherSection />

      {/* Seção 3: Experiências */}
      <ExperienciasSection />

      {/* Seção 4: Recursos */}
      <RecursosGridSection />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numeros} />

      {/* Seção 5: Vantagens */}
      <VantagensSection />

      {/* Prova Social 1: Feiras */}
      <EventosSection eventos={eventos} />

      {/* Seção 6: Reserva */}
      <ReservaSection />

      {/* Prova Social 2: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua presença digital"
        subtitle="Depoimentos em vídeo de clientes que aumentaram suas reservas diretas"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Seção 7: Integrações com soluções */}
      <IntegracoesSolucoesSection />

      {/* Prova Social 3: Aprovação 97% */}
      <DepoimentosSection depoimentos={depoimentos} />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para ter um Site Hoteleiro Profissional?"
        subtitle="Solicite uma demonstração e veja como podemos ajudar seu hotel a vender mais diretamente."
        badge="Comece agora"
      />

      {/* Prova Social 4: FAQ */}
      <FAQAccordion
        items={data.faq.map((f) => ({ id: f.id, question: f.pergunta, answer: f.resposta }))}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Site Hoteleiro"
        badge="FAQ"
        showContactButton
      />


    </div>
  );
}

export { SiteHoteleiroPage };
