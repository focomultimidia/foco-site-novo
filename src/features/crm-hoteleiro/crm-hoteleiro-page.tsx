"use client";

import { useCrmHoteleiroPage } from "./hooks/use-crm-hoteleiro-page";
import {
  HeroSection,
  OQueESection,
  RecursosSection,
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
    texto: "O CRM da Foco nos permitiu segmentar nossa base de clientes e criar campanhas personalizadas. A taxa de retorno de hóspedes aumentou em 35%.",
    autor: "Patricia Lima",
    cargo: "Gerente de Marketing, Hotel Central",
    avatar: "PL",
  },
  {
    id: "2",
    texto: "A automação de e-mails e WhatsApp economizou horas de trabalho da nossa equipe. Agora conseguimos nutrir leads sem intervenção manual.",
    autor: "Roberto Mendes",
    cargo: "Diretor, Resort Paradise",
    avatar: "RM",
  },
  {
    id: "3",
    texto: "As pesquisas de satisfação nos deram insights valiosos. Conseguimos identificar pontos de melhoria e elevar nossa nota nas OTAs.",
    autor: "Carla Souza",
    cargo: "Proprietária, Pousada do Sol",
    avatar: "CS",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como aumentamos a fidelização em 40% com CRM",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Plaza",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "Automação que transformou nosso marketing",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Segmentação inteligente gera mais reservas",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Resort Paradise",
    hotel: "Bahia",
  },
];

const numerosData: Numero[] = [
  { id: "1", valor: "6", sufixo: "", label: "recursos principais" },
  { id: "2", valor: "2500", sufixo: "+", label: "clientes ativos" },
  { id: "3", valor: "18", sufixo: "", label: "anos de mercado" },
  { id: "4", valor: "35", sufixo: "%", label: "aumento na fidelização" },
  { id: "5", valor: "50", sufixo: "+", label: "integrações disponíveis" },
  { id: "6", valor: "24", sufixo: "h", label: "suporte disponível" },
];

const artigosMidiaData: ArtigoMidia[] = [
  {
    id: "1",
    publicacao: "Hotel Management",
    data: "Mar 2024",
    titulo: "CRM Hoteleiro: a ferramenta da fidelização",
    descricao: "Como a gestão de relacionamento transforma hóspedes em embaixadores da marca.",
    link: "#",
  },
  {
    id: "2",
    publicacao: "Turismo 360",
    data: "Fev 2024",
    titulo: "Automação de marketing no setor hoteleiro",
    descricao: "Especialistas explicam como a automação aumenta a produtividade e as vendas.",
    link: "#",
  },
  {
    id: "3",
    publicacao: "Hospedagem News",
    data: "Jan 2024",
    titulo: "Segmentação: a chave para campanhas efetivas",
    descricao: "Como dividir a base de clientes para ofertas personalizadas.",
    link: "#",
  },
];

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
      <OQueESection />

      {/* Section 3: Recursos (com título/subtítulo customizado) */}
      <RecursosSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentosData} />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua fidelização com CRM"
        subtitle="Depoimentos em vídeo de clientes que aumentaram a retenção de hóspedes"
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
