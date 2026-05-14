"use client";

import { motion, type Variants } from "framer-motion";

// --- Brand icon SVGs ---

const MetaIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1877F2" className="w-9 h-9">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const GoogleAdsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-9 h-9">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GA4Icon = () => (
  <svg viewBox="0 0 32 28" className="w-9 h-9" fill="none">
    <rect x="0" y="16" width="8" height="12" rx="2" fill="#E37400" />
    <rect x="12" y="9" width="8" height="19" rx="2" fill="#E37400" fillOpacity="0.7" />
    <rect x="24" y="0" width="8" height="28" rx="2" fill="#E37400" fillOpacity="0.4" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" className="w-9 h-9">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const RDStationIcon = () => (
  <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
    <circle cx="20" cy="20" r="19" fill="#FF5E00" />
    <text
      x="20"
      y="25"
      textAnchor="middle"
      fill="white"
      fontSize="12"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      RD
    </text>
  </svg>
);

const ChatbotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none">
    <rect x="2" y="2" width="20" height="15" rx="3" fill="#6366F1" />
    <circle cx="8" cy="9.5" r="1.5" fill="white" />
    <circle cx="12" cy="9.5" r="1.5" fill="white" />
    <circle cx="16" cy="9.5" r="1.5" fill="white" />
    <path d="M10 17l-3.5 4.5h11L14 17" fill="#6366F1" />
  </svg>
);

// --- Data ---

const integracoes = [
  {
    Icon: MetaIcon,
    titulo: "Facebook e Instagram Ads (Meta)",
    descricao:
      "Integre campanhas Meta Ads ao motor de reservas e acompanhe conversões reais com rastreio completo de visitas, cliques e reservas.",
  },
  {
    Icon: GoogleAdsIcon,
    titulo: "Google Ads e Tag Manager",
    descricao:
      "Meça o ROI de campanhas com integração ao Google Ads e Tag Manager. Veja exatamente quais anúncios geram reservas diretas.",
  },
  {
    Icon: GA4Icon,
    titulo: "GA4 Analytics",
    descricao:
      "Monitore toda a jornada do hóspede com dados sobre origem do tráfego, comportamento no site e taxa de conversão por canal.",
  },
  {
    Icon: WhatsAppIcon,
    titulo: "AskFlow (WhatsApp Marketing)",
    descricao:
      "Automatize o envio de mensagens via WhatsApp com dados de reservas e abandono de carrinho para impactar o hóspede em cada etapa.",
  },
  {
    Icon: RDStationIcon,
    titulo: "RD Station",
    descricao:
      "Alimente fluxos automáticos de e-mail e WhatsApp com informações do motor, e recupere reservas com marketing personalizado.",
  },
  {
    Icon: ChatbotIcon,
    titulo: "Chatbots inteligentes",
    descricao:
      "Conecte chatbots ao motor e ofereça atendimento 24h com respostas automáticas que ajudam o visitante a concluir a reserva.",
  },
];

// --- Animation variants ---

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Component ---

function IntegracoesMarketingSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Integrações de marketing para atrair mais hóspedes e vender com inteligência
          </h2>
          <p className="text-gray-400 text-lg max-w-6xl mx-auto">
            Conecte seu motor de reservas às principais plataformas de marketing digital e mensure o impacto real de cada campanha em vendas diretas.
          </p>
        </motion.div>

        {/* Staggered grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {integracoes.map(({ Icon, titulo, descricao }, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Gradient accent line on hover */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Brand icon */}
              <div className="mb-5 w-fit transition-transform duration-300 group-hover:scale-110 origin-left">
                <Icon />
              </div>

              {/* Title */}
              <h3 className="text-[0.925rem] font-semibold text-[#1e3a5f] mb-2 leading-snug">
                {titulo}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {descricao}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { IntegracoesMarketingSection };
