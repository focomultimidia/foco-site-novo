import { useState } from "react";
import { useHomePage } from "./hooks/use-home-page";
import {
  HeroSection,
  ProdutosSection,
  DoresSection,
  DiferenciaisSection,
  SegurancaSection,
  TiposPropriedadeSection,

  FAQSection,
} from "./components";
import { EventosSection } from "@/features/home/components/eventos-section";
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorMessage } from "@/components/ui/error-message";
import { LeadCaptureModal } from "@/components/shared/lead-capture-modal";
import { TrustedLogosMarquee, SmartIntegrationsTabs } from "@/features/shared/components";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { eventos, depoimentos, numeros, videosData, artigosMidia } from "@/features/shared/data/social-proof-data";

export function HomePage() {
  const { data, isLoading, isError, refetch } = useHomePage();
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !data) {
    return (
      <ErrorMessage
        title="Erro ao carregar página"
        message="Não foi possível carregar o conteúdo. Tente novamente."
        onRetry={refetch}
      />
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection
        data={data.hero}
        onCtaClick={() => setIsLeadModalOpen(true)}
      />

      <ProdutosSection produtos={data.produtos} />

      <TrustedLogosMarquee />

      <NaMidiaSection artigos={artigosMidia} />

      <DoresSection dores={data.dores} />

      <EventosSection eventos={eventos} />

      <SmartIntegrationsTabs />

      <DepoimentosSection depoimentos={depoimentos} />

      <DiferenciaisSection diferenciais={data.diferenciais} />

      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua gestão hoteleira"
        subtitle="Depoimentos em vídeo de clientes que revolucionaram a gestão do seu hotel com a Foco Tecnologia"
        badge="Depoimentos"
        slidesToShow={3}
      />
      <SegurancaSection certificacoes={data.certificacoes} />

      <TiposPropriedadeSection tipos={data.tiposPropriedade} />

      <NumerosSection numeros={numeros} />

      <FAQSection faq={data.faq} />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Solicite uma Demonstração Grátis"
        description="Preencha seus dados e nossa equipe entrará em contato para agendar uma demonstração personalizada do nosso sistema."
        source="home"
      />
    </main>
  );
}
