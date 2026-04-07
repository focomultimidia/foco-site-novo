import { useState } from "react";
import { useHomePage } from "./hooks/use-home-page";
import {
  HeroSection,
  ProdutosSection,
  NaMidiaSection,
  DoresSection,
  EventosSection,
  IntegracoesSection,
  DepoimentosSection,
  DiferenciaisSection,
  CasesSection,
  SegurancaSection,
  TiposPropriedadeSection,
  NumerosSection,
  FAQSection,
} from "./components";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorMessage } from "@/components/ui/error-message";
import { LeadCaptureModal } from "@/components/shared/lead-capture-modal";
import { TrustedLogosMarquee } from "@/features/shared/components";

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
      <NaMidiaSection artigos={data.artigosMidia} />
      <DoresSection dores={data.dores} />
      <EventosSection eventos={data.eventos} />
      <IntegracoesSection categorias={data.categoriasIntegracao} />
      <DepoimentosSection depoimentos={data.depoimentos} />
      <DiferenciaisSection diferenciais={data.diferenciais} />
      <CasesSection cases={data.cases} />
      <SegurancaSection certificacoes={data.certificacoes} />
      <TiposPropriedadeSection tipos={data.tiposPropriedade} />
      <NumerosSection numeros={data.numeros} />
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
