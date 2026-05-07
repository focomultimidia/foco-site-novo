"use client";

import { useSoftwarePagamentosPage } from "./hooks/use-software-pagamentos-page";
import {
  HeroSection,
  OQueESection,
  MeiosPagamentoSection,
} from "./components";

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

function SoftwarePagamentosPage() {
  const { data, isLoading, isError, refetch } = useSoftwarePagamentosPage();

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

      {/* Section 2: O que é o Foco Pay */}
      <OQueESection />

      {/* Section 3: Meios de Pagamento */}
      <MeiosPagamentoSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentos} />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua gestão financeira"
        subtitle="Depoimentos em vídeo de clientes que automatizaram seus pagamentos com o Foco Pay"
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
          { id: "1", question: "O que é o Foco Pay?", answer: "O Foco Pay é um software de pagamentos para hotéis que automatiza a gestão financeira, integra múltiplos gateways de pagamento e garante segurança e rapidez em cada transação." },
          { id: "2", question: "Quais gateways de pagamento são integrados?", answer: "O Foco Pay integra com Sicredi, PagSeguro, Sip2g, Cielo e outros principais gateways do mercado brasileiro, oferecendo flexibilidade total para seus hóspedes." },
          { id: "3", question: "A plataforma é segura?", answer: "Sim! O Foco Pay segue os mais altos padrões de segurança do mercado, com criptografia de dados, conformidade com PCI DSS e proteção contra fraudes." },
          { id: "4", question: "Como funciona a conciliação automática?", answer: "O sistema concilia automaticamente todas as transações, eliminando erros manuais e garantindo que o fluxo de caixa seja sempre preciso e confiável." },
          { id: "5", question: "Posso acompanhar as transações em tempo real?", answer: "Sim! O dashboard do Foco Pay permite acompanhar todas as transações em tempo real, com relatórios detalhados e alertas de segurança." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Foco Pay"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para automatizar a gestão financeira do seu hotel?"
        subtitle="Solicite uma demonstração e descubra como o Foco Pay pode transformar seus pagamentos."
        badge="Comece agora"
      />
    </div>
  );
}

export { SoftwarePagamentosPage };
