"use client";

import { useExperienciaHospedePage } from "./hooks/use-experiencia-hospede-page";
import {
  HeroSection,
  FocoPassSection,
  RecursosSection,
  VantagensSection,
  ParaQuemSection,
  CardapioDigitalSection,
  PorQueContratarSection,
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


function ExperienciaHospedePage() {
  const { data, isLoading, isError, refetch } = useExperienciaHospedePage();

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
      <GenericInfoSection {...INFO_SECTIONS.experienciaHospede} imageSide="right" />

      {/* Section 3: Recursos */}
      <RecursosSection />

      {/* Section 4: Outras Vantagens */}
      <VantagensSection />

      {/* Section 5: Para quem é */}
      <ParaQuemSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentos} />

      {/* Section 6: Cardápio Digital */}
      <CardapioDigitalSection />

      {/* Section 7: Por que contratar */}
      <PorQueContratarSection />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou a experiência dos hóspedes"
        subtitle="Depoimentos em vídeo de clientes que elevaram o padrão de serviço com o Foco Pass"
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
          { id: "1", question: "O que é o Foco Pass?", answer: "O Foco Pass é um aplicativo de hospedagem que automatiza a jornada do hóspede, desde o check-in online até o pagamento via PIX, oferecendo também descontos exclusivos em parceiros do destino." },
          { id: "2", question: "Como funciona o check-in online?", answer: "O hóspede pode fazer o check-in antes mesmo de chegar ao hotel, diretamente pelo aplicativo. Isso elimina filas na recepção e permite que ele vá direto para o quarto." },
          { id: "3", question: "Quais são os descontos disponíveis?", answer: "O Foco Pass oferece descontos exclusivos em restaurantes, passeios turísticos, transfers, ingressos para atrações e espetáculos nos principais destinos do Brasil." },
          { id: "4", question: "O cardápio digital funciona para room service?", answer: "Sim! O hóspede pode acessar o cardápio completo do restaurante e do room service pelo aplicativo, fazer pedidos e receber no conforto do quarto." },
          { id: "5", question: "O Foco Pass é seguro?", answer: "Sim, o sistema possui total segurança para garantir que apenas o hóspede registrado tenha acesso ao aplicativo durante sua estadia." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Foco Pass"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para transformar a experiência dos seus hóspedes?"
        subtitle="Solicite uma demonstração e descubra como o Foco Pass pode elevar o padrão de serviço do seu hotel."
        badge="Comece agora"
      />
    </div>
  );
}

export { ExperienciaHospedePage };
