"use client";

import { useIntegracoesHoteleirasPage } from "./hooks/use-integracoes-hoteleiras-page";
import {
  HeroSection,
  ImportanciaSection,
  PmsIntegradosSection,
  PorQueContratarSection,
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


function IntegracoesHoteleirasPage() {
  const { data, isLoading, isError, refetch } = useIntegracoesHoteleirasPage();

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

      {/* Section 2: Importância da Integração */}
      <ImportanciaSection />

      {/* Section 3: PMS's Integrados */}
      <PmsIntegradosSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentos} />

      {/* Section 4: Por que contratar */}
      <PorQueContratarSection />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua operação com integrações"
        subtitle="Depoimentos em vídeo de clientes que conectaram seus sistemas com a Foco"
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
          { id: "1", question: "Quais PMS's são integrados com a Foco?", answer: "Integramos com mais de 18 dos principais PMS do mercado brasileiro, incluindo Plus, ADM, Bitz, Carsoft, Desbravador, eSolution, HMAX, Hotelflow, Isasoft, MDE, Newhotel, Queops, Sachar, Silbeck, Simpleshotel, Techside, Tô de Férias e TOTVS." },
          { id: "2", question: "Como funciona a integração com o PMS?", answer: "A integração é feita via API, garantindo sincronização em tempo real de reservas, disponibilidade, tarifas e dados de hóspedes entre o PMS e nossos sistemas." },
          { id: "3", question: "Existe custo adicional para integração?", answer: "Os custos de integração variam conforme o PMS e a complexidade do projeto. Entre em contato conosco para um orçamento personalizado." },
          { id: "4", question: "Quanto tempo leva para implementar a integração?", answer: "O prazo médio de implementação é de 7 a 15 dias úteis, dependendo do PMS escolhido e da complexidade da operação do hotel." },
          { id: "5", question: "A integração é segura?", answer: "Sim! Todas as nossas integrações seguem os mais altos padrões de segurança, com criptografia de dados e conformidade com as normas do mercado." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre integrações hoteleiras"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para conectar seus sistemas?"
        subtitle="Solicite uma demonstração e descubra como as integrações da Foco podem transformar a operação do seu hotel."
        badge="Comece agora"
      />
    </div>
  );
}

export { IntegracoesHoteleirasPage };
