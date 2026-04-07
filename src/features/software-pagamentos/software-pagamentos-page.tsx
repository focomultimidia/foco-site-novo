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

import type { Depoimento, Numero, ArtigoMidia } from "@/features/home/types";
import type { VideoDepoimento } from "@/features/ui/components/video-testimonials-carousel";

// Dados mockados para as seções de prova social
const depoimentosData: Depoimento[] = [
  {
    id: "1",
    texto: "O Foco Pay eliminou completamente os erros de conciliação do nosso hotel. A automação financeira nos economiza horas de trabalho toda semana.",
    autor: "Fernanda Lima",
    cargo: "Gerente Financeira, Hotel Central",
    avatar: "FL",
  },
  {
    id: "2",
    texto: "A integração com múltiplos gateways de pagamento nos deu flexibilidade total. Nossos hóspedes podem pagar da forma que preferem.",
    autor: "Ricardo Mendes",
    cargo: "Diretor, Resort Paradise",
    avatar: "RM",
  },
  {
    id: "3",
    texto: "A segurança das transações é impressionante. Nunca tivemos problemas com fraudes desde que implementamos o Foco Pay.",
    autor: "Ana Paula Costa",
    cargo: "Proprietária, Pousada do Sol",
    avatar: "AC",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como automatizamos 100% da gestão financeira",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Plaza",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "Integração perfeita com todos os gateways",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Segurança e rapidez em cada transação",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Resort Paradise",
    hotel: "Bahia",
  },
];

const numerosData: Numero[] = [
  { id: "1", valor: "4", sufixo: "+", label: "gateways integrados" },
  { id: "2", valor: "2500", sufixo: "+", label: "clientes ativos" },
  { id: "3", valor: "18", sufixo: "", label: "anos de mercado" },
  { id: "4", valor: "99.9", sufixo: "%", label: "uptime garantido" },
  { id: "5", valor: "50", sufixo: "+", label: "integrações disponíveis" },
  { id: "6", valor: "24", sufixo: "h", label: "suporte disponível" },
];

const artigosMidiaData: ArtigoMidia[] = [
  {
    id: "1",
    publicacao: "Hotel Management",
    data: "Mar 2024",
    titulo: "Foco Pay: a revolução nos pagamentos hoteleiros",
    descricao: "Como a automação financeira está transformando a gestão de receitas no setor hoteleiro.",
    link: "#",
  },
  {
    id: "2",
    publicacao: "Turismo 360",
    data: "Fev 2024",
    titulo: "Segurança e agilidade nas transações de hotéis",
    descricao: "Especialistas explicam a importância de um software de pagamentos robusto.",
    link: "#",
  },
  {
    id: "3",
    publicacao: "Hospedagem News",
    data: "Jan 2024",
    titulo: "Integração multi-gateway: tendência para 2024",
    descricao: "Hotéis que oferecem múltiplas formas de pagamento aumentam conversão em 35%.",
    link: "#",
  },
];

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
      <DepoimentosSection depoimentos={depoimentosData} />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua gestão financeira"
        subtitle="Depoimentos em vídeo de clientes que automatizaram seus pagamentos com o Foco Pay"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Prova Social: Na Mídia */}
      <NaMidiaSection artigos={artigosMidiaData} />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numerosData} />
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
