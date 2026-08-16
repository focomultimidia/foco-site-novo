import { useState } from "react";
import { useHomePage } from "./hooks/use-home-page";
import {
  HeroSection,
  ProdutosSection,
  //DoresSection,
  DoresDiagnosticoSection,
  OtheoAiTeaserSection,
  ParceirosEliteSection,
  DiferenciaisSection,
  SegurancaSection,
  TiposPropriedadeSection,
} from "./components";
import { EventosSection } from "@/features/home/components/eventos-section";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
import { LeadCaptureModal } from "@/components/shared/lead-capture-modal";
import { TrustedLogosMarquee, SmartIntegrationsTabs, CertificacoesSection, WallOfLoveSection } from "@/features/shared/components";
import { eventos, depoimentos, numeros, videosData, artigosMidia } from "@/features/shared/data/social-proof-data";
import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function HomePage() {
  const { data, isLoading, isError, refetch } = useHomePage();
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

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
    <div className="min-h-screen">
      <HeroSection
        data={data.hero}
        onCtaClick={() => setIsLeadModalOpen(true)}
      />

      <ProdutosSection />

      <TrustedLogosMarquee />

      <OtheoAiTeaserSection />

      <SmartIntegrationsTabs />

      {/*<DoresSection dores={data.dores} />*/}

      {/* Módulo novo, em comparação com o DoresSection acima — remover um dos
          dois assim que a escolha final for feita. */}
      <DoresDiagnosticoSection dores={data.dores} />

      <EventosSection eventos={eventos} />

      <NaMidiaSection artigos={artigosMidia} />

      <DiferenciaisSection diferenciais={data.diferenciais} />

      <WallOfLoveSection
        depoimentos={depoimentos}
        videos={videosData}
        badge="Depoimentos"
        title="Um mural de resultados reais"
        subtitle="Cada card aqui é um hoteleiro de verdade, contando como a Foco revolucionou a gestão do seu hotel."
      />
      <SegurancaSection certificacoes={data.certificacoes} />

      <CertificacoesSection />

      <ParceirosEliteSection />

      <TiposPropriedadeSection tipos={data.tiposPropriedade} />

      <NumerosSection numeros={numeros} />

      {/* Prova Social: FAQ */}
      <FAQAccordion
        items={[
          { id: "1", question: "Por que a Foco Tecnologia é indicada para pequenos e médios hoteleiros e aluguéis de temporada?", answer: "A Foco Tecnologia é indicada para pequenos e médios hoteleiros e aluguéis de temporada porque oferecemos soluções específicas para este segmento, com ferramentas intuitivas e acessíveis que otimizam a gestão, aumentam a visibilidade online e melhoram a experiência dos hóspedes. Nosso sistema é escalável e se adapta ao crescimento do seu negócio." },
          { id: "2", question: "Quanto custa o combo de tecnologia hoteleira da Foco?", answer: "O custo do combo de tecnologia hoteleira da Foco varia de acordo com o tamanho do seu estabelecimento e as funcionalidades necessárias. Oferecemos planos flexíveis que se adaptam ao seu orçamento, com opções a partir de planos mensais acessíveis. Entre em contato conosco para receber uma proposta personalizada." },
          { id: "3", question: "Posso personalizar o combo de tecnologia de acordo com as minhas necessidades?", answer: "Sim, todos os nossos combos de tecnologia são personalizáveis. Entendemos que cada estabelecimento tem necessidades únicas, por isso permitimos que você escolha as funcionalidades que melhor atendem ao seu negócio. Você pode começar com o básico e adicionar módulos conforme sua necessidade." },
          { id: "4", question: "Como funciona a implantação das soluções da Foco Tecnologia?", answer: "A implantação das nossas soluções segue um processo estruturado em etapas: análise inicial das necessidades, configuração personalizada do sistema, migração de dados (se necessário), treinamento da equipe e acompanhamento pós-implantação. Nossa equipe de suporte está sempre disponível para garantir uma transição suave." },
          { id: "5", question: "Os contratos dos sistemas hoteleiros possuem fidelidade?", answer: "Nossos contratos são flexíveis e transparentes. Oferecemos opções com e sem período de fidelidade, permitindo que você escolha o modelo que melhor se adapta às suas necessidades. Acreditamos na qualidade do nosso serviço e não precisamos prender clientes com contratos longos." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre a Foco Tecnologia e seus produtos"
        badge="FAQ"
        showContactButton
      />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Solicite uma Demonstração Grátis"
        description="Preencha seus dados e nossa equipe entrará em contato para agendar uma demonstração personalizada do nosso sistema."
        source="home"
      />
    </div>
  );
}
