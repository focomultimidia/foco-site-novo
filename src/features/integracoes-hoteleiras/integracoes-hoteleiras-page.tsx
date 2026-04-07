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

import type { Depoimento, Numero, ArtigoMidia } from "@/features/home/types";
import type { VideoDepoimento } from "@/features/ui/components/video-testimonials-carousel";

// Dados mockados para as seções de prova social
const depoimentosData: Depoimento[] = [
  {
    id: "1",
    texto: "A integração com o PMS da Foco eliminou completamente o retrabalho da nossa equipe. A sincronização em tempo real é impressionante.",
    autor: "Carlos Mendes",
    cargo: "Gerente de TI, Hotel Central",
    avatar: "CM",
  },
  {
    id: "2",
    texto: "Conseguimos conectar todos os nossos sistemas em uma única plataforma. A produtividade aumentou em 40%.",
    autor: "Fernanda Lima",
    cargo: "Diretora, Resort Paradise",
    avatar: "FL",
  },
  {
    id: "3",
    texto: "O suporte técnico da Foco durante o processo de integração foi excepcional. Tudo funcionou perfeitamente desde o primeiro dia.",
    autor: "Ricardo Souza",
    cargo: "Proprietário, Pousada do Sol",
    avatar: "RS",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como integramos todos os nossos sistemas",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Plaza",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "A integração que transformou nossa operação",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Sincronização perfeita entre sistemas",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Resort Paradise",
    hotel: "Bahia",
  },
];

const numerosData: Numero[] = [
  { id: "1", valor: "18", sufixo: "", label: "PMS's integrados" },
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
    titulo: "Integração de sistemas: o futuro da hotelaria",
    descricao: "Como a conectividade entre plataformas está revolucionando a gestão hoteleira.",
    link: "#",
  },
  {
    id: "2",
    publicacao: "Turismo 360",
    data: "Fev 2024",
    titulo: "Foco Multimídia lidera integrações no Brasil",
    descricao: "Empresa conecta 18 dos principais PMS do mercado brasileiro.",
    link: "#",
  },
  {
    id: "3",
    publicacao: "Hospedagem News",
    data: "Jan 2024",
    titulo: "Como escolher as integrações certas para seu hotel",
    descricao: "Guia completo para selecionar as melhores integrações para sua propriedade.",
    link: "#",
  },
];

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
      <DepoimentosSection depoimentos={depoimentosData} />

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
      <NaMidiaSection artigos={artigosMidiaData} />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numerosData} />
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
