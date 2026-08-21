"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowRight, Image as ImageIcon, Building2, TrendingUp, Globe, Bot, CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StickyTabsList } from "@/features/shared/components/sticky-tabs-list";
import { PmsOrcamentoModal } from "./pms-orcamento-modal";

// ── Data ──────────────────────────────────────────────────────────────────────

const pmsIntegrados = [
  {
    id: "plus",
    nome: "Plus",
    logo: "/assets/imgs/integracoes/pms/plus.webp",
    descricao:
      "Sistema de gestão hoteleira em nuvem desenvolvido pela Foco Tecnologia, para pequenos hoteleiros. Integrado ao motor de reservas e ao gestor de canais, os clientes terão a tranquilidade de disponibilizar 100% das suas ocupações para vendas em Mais de 800 canais integrados, sem overbookings.",
  },
  {
    id: "adm",
    nome: "ADM",
    logo: "/assets/imgs/integracoes/pms/adm-hoteleiro.webp",
    descricao:
      "A ADM Desenvolvimento de Sistemas é uma empresa de tecnologia, sediada em Ilhéus-BA, criada em 2008, que desenvolve e comercializa o ADM Hotel e o ADM Restaurante, ferramentas para gestão de hotéis, pousadas, bares, restaurantes e similares com mais de 1200 licenças em todo o Brasil.",
  },
  {
    id: "bitz",
    nome: "Bitz",
    logo: "/assets/imgs/integracoes/pms/bitz.webp",
    descricao:
      "A Bitz Softwares está há mais de 9 anos no mercado, uma empresa de tecnologia especializada no setor hoteleiro. Nosso propósito é gerar ótimas experiências para as pessoas. Facilitando suas vidas, economizando seu tempo e aumentando seu rendimento no dia-a-dia.",
  },
  {
    id: "carsoft",
    nome: "Carsoft",
    logo: "/assets/imgs/integracoes/pms/carsoft.webp",
    descricao:
      "Xenios: Sistema de gestão de hotéis, pousadas e hostels de fácil utilização. Possui integração com outros módulos como estoque, restaurante, financeiro, eventos, controle de serviços e reserva online direto pelo site do hotel/pousada. Conta com suporte 24 horas.",
  },
  {
    id: "desbravador",
    nome: "Desbravador",
    logo: "/assets/imgs/integracoes/pms/desbravador.webp",
    descricao:
      "Atuamos no desenvolvimento de software para a gestão de hotéis desde 1988. Somos Desbravadores! Atendemos hotéis de pequeno, médio e grande porte, fornecendo soluções que otimizam suas operações e aprimoram a experiência do hóspede. Hoje são mais de 3.500 clientes espalhados em dez países.",
  },
  {
    id: "esolution",
    nome: "eSolution",
    logo: "/assets/imgs/integracoes/pms/esolution.webp",
    descricao:
      "A eSolution é uma empresa de software que está no mercado desde 2007. Sua atuação está focada em softwares de gestão em hotelaria e parques temáticos. Com um ideal de excelência, ela vem ganhando destaque nesses setores.",
  },
  {
    id: "hmax",
    nome: "HMAX",
    logo: "/assets/imgs/integracoes/pms/hmax.webp",
    descricao:
      "A HMAX é uma empresa pioneira no mercado de automação hoteleira. O nosso sistema de gestão oferece 30 anos de conhecimento organizados em módulos, que você pode contratar segundo a sua necessidade. O PMS HMAX está integrado com a Foco Multimídia.",
  },
  {
    id: "hotelflow",
    nome: "Hotelflow",
    logo: "/assets/imgs/integracoes/pms/hotelflow.webp",
    descricao:
      "Com o Hotelflow, você tem em mãos um gerenciamento moderno, prático e intuitivo para aumentar a produtividade do seu empreendimento hoteleiro. O sistema é web, não requer instalação, basta acessar pelo seu navegador e usar de qualquer lugar, até mesmo do seu dispositivo móvel!",
  },
  {
    id: "isasoft",
    nome: "Isasoft",
    logo: "/assets/imgs/integracoes/pms/isasoft.webp",
    descricao:
      "Empresa voltada para o desenvolvimento de sistemas para gerenciamento de micros e pequenas empresas do comércio para todo o território nacional. O Isasoft Inn, foi desenvolvido para administrar pousadas, hotéis e resorts de forma rápida e profissional.",
  },
  {
    id: "mde",
    nome: "MDE",
    logo: "/assets/imgs/integracoes/pms/mde.webp",
    descricao:
      "Há mais de 27 anos a MDE Informática projeta e desenvolve Sistemas de Gestão para os segmentos Hoteleiro e Motelero. Nosso diferencial está em oferecer soluções personalizadas para a necessidade específica de cada cliente.",
  },
  {
    id: "newhotel",
    nome: "Newhotel",
    logo: "/assets/imgs/integracoes/pms/newhotel.webp",
    descricao:
      "Uma empresa de software especializada em desenvolver sistemas para gestão hoteleira. Pioneiros internacionais em soluções Cloud para o setor hoteleiro, estamos no mercado há 37 anos e possuímos um portfólio com mais de 6 mil hotéis, em 64 países.",
  },
  {
    id: "queops",
    nome: "Queops",
    logo: "/assets/imgs/integracoes/pms/queops.webp",
    descricao:
      "A Quéops possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    id: "sachar",
    nome: "Sachar",
    logo: "/assets/imgs/integracoes/pms/saghar.webp",
    descricao:
      "A Sachar (SGH) possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    id: "silbeck",
    nome: "Silbeck",
    logo: "/assets/imgs/integracoes/pms/silbeck.webp",
    descricao:
      "Somos uma empresa de software para gestão hoteleira. Atuamos há 25 anos no mercado com foco na busca da excelência em nosso atendimento e no desenvolvimento de nossos produtos. O nosso objetivo nunca foi oferecer apenas um sistema de gestão.",
  },
  {
    id: "simpleshotel",
    nome: "Simpleshotel",
    logo: "/assets/imgs/integracoes/pms/simpleshotel.webp",
    descricao:
      "A Simple Hotel possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    id: "techside",
    nome: "Techside",
    logo: "/assets/imgs/integracoes/pms/techside.webp",
    descricao:
      "A TechSide (TechHotel) possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    id: "to-de-ferias",
    nome: "Tô de Férias",
    logo: "/assets/imgs/integracoes/pms/to-de-ferias.webp",
    descricao:
      "O TDF Hotel é um PMS completo, integrando as rotinas de recepção, reservas, governança, financeiro e estoque, que possui integrações comerciais e administrativas, além de configurações personalizadas e foco no relacionamento entre hoteleiro e hóspede.",
  },
  {
    id: "totvs",
    nome: "TOTVS",
    logo: "/assets/imgs/integracoes/pms/totvs.webp",
    descricao:
      "A TOTVS cresce junto com a sua empresa. Aumente sua eficiência operacional e produtividade com um software completo para gestão e automação de processos. Não perca tempo e automatize a sua gestão de reservas, unificando toda a sua disponibilidade em um só sistema.",
  },
];

// Logo "" propositalmente — aguardando os arquivos das marcas. PmsCard já
// sabe renderizar um placeholder nesse caso (ver bloco "Logo" abaixo).
const marketingHoteleiro = [
  {
    id: "tribuzana",
    nome: "Tribuzana",
    logo: "/assets/imgs/parceiros-elite/tribuzana.svg",
    descricao:
      "Autoridade no segmento, há mais de 10 anos ao lado dos hoteleiros com soluções que unem estratégia e tecnologia para transformar meios de hospedagem.",
  },
  {
    id: "reprotel",
    nome: "Reprotel",
    logo: "/assets/imgs/parceiros-elite/reprotel.svg",
    descricao:
      "Reprotel oferece sistemas completos para hotéis e pousadas, integrando reservas, finanças e canais de venda para mais eficiência, economia e resultados.",
  },
  {
    id: "storm",
    nome: "Storm",
    logo: "/assets/imgs/parceiros-elite/storm.svg",
    descricao:
      "Na Storm, unimos branding estratégico e identidade visual para posicionar sua empresa com autoridade e atrair clientes certos.",
  },
];

const canalDeVendas = [
  {
    id: "b2b-reservas",
    nome: "B2B Reservas",
    logo: "/assets/imgs/parceiros-elite/b2breservas.svg",
    descricao:
      "A B2B Reservas conecta hotéis e pousadas a centenas de agências e operadoras, ampliando vendas e fortalecendo a distribuição hoteleira.",
  },
  {
    id: "decolar",
    nome: "Decolar",
    logo: "/assets/imgs/parceiros-elite/decolar.svg",
    descricao:
      "Cadastre seu hotel com suporte da Foco, ganhe comissão especial e destaque sua propriedade na Decolar.com com voucher exclusivo.",
  },
  {
    id: "expedia",
    nome: "Expedia",
    logo: "/assets/imgs/parceiros-elite/expedia.svg",
    descricao:
      "Cadastre seu hotel com o apoio da Foco, aproveite comissionamento reduzido por 180 dias e acesse a distribuição global e B2B do Expedia.",
  },
];

const chatbotIa = [
  {
    id: "asksuite",
    nome: "Asksuite",
    logo: "/assets/imgs/parceiros-elite/asksuite.svg",
    descricao:
      "Conheça o melhor chatbot de reservas e plataforma de atendimento para hotéis do mundo, e comece hoje a revolucionar as interações do seu hotel via WhatsApp, Instagram, Chat do Site, telefone e email.",
  },
];

const adquirentes = [
  {
    id: "stone",
    nome: "Stone",
    logo: "/assets/imgs/parceiros-elite/stone.svg",
    descricao:
      "Transforme a experiência de pagamento do seu hóspede com Pix, cartão e maquininhas integrados ao sistema Foco, sem complicação.",
  },
];

const categorias = [
  { id: "pms",             label: "PMS",                icon: Building2,  itens: pmsIntegrados },
  { id: "marketing",       label: "Marketing Hoteleiro", icon: TrendingUp, itens: marketingHoteleiro },
  { id: "canal-de-vendas", label: "Canal de vendas",     icon: Globe,      itens: canalDeVendas },
  { id: "chatbot-ia",      label: "Chatbot e IA",        icon: Bot,        itens: chatbotIa },
  { id: "adquirentes",     label: "Adquirentes",         icon: CreditCard, itens: adquirentes },
];

// Categorias com poucos itens (1-3) não devem esticar pelas 4 colunas —
// fica um card solto boiando num grid vazio. Limita as colunas ao que a
// categoria realmente tem e centraliza.
function gridColsClass(count: number) {
  if (count <= 1) return "grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}

// ── MagneticButton ────────────────────────────────────────────────────────────

const MAGNETIC_RADIUS   = 68;
const MAGNETIC_STRENGTH = 0.30;

function MagneticButton({ onClick }: { onClick: () => void }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const magX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const magY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = outerRef.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < MAGNETIC_RADIUS) {
        const f = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
        magX.set(dx * f);
        magY.set(dy * f);
      } else {
        magX.set(0);
        magY.set(0);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [magX, magY]);

  return (
    <div ref={outerRef} className="w-full">
      <motion.button
        type="button"
        onClick={onClick}
        style={{ x: magX, y: magY }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          magX.set(0);
          magY.set(0);
        }}
        whileTap={{ scale: 0.96 }}
        className="relative w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full overflow-hidden border border-slate-200 text-slate-600 transition-colors duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/20 hover:text-white hover:border-transparent"
      >
        <span
          className={`absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#285992] transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="relative z-10">Solicite orçamento</span>
        <motion.span
          className="relative z-10 flex-shrink-0"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </div>
  );
}

// ── PmsCard ───────────────────────────────────────────────────────────────────

interface PmsItem {
  id:        string;
  nome:      string;
  logo:      string;
  descricao: string;
}

interface PmsCardProps {
  pms:              PmsItem;
  index:            number;
  isHovered:        boolean;
  onEnter:          () => void;
  onSolicitar:      () => void;
}

function PmsCard({ pms, index, isHovered, onEnter, onSolicitar }: PmsCardProps) {
  return (
    // Outer div: scroll entrance animation
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type:      "spring",
        damping:   20,
        stiffness: 100,
        delay:     (index % 4) * 0.06,
      }}
    >
      {/* Inner div: hover lift do próprio card (o blur nos outros cards ao
          lado — sibling focus/blur — foi removido a pedido explícito). */}
      <motion.div
        onMouseEnter={onEnter}
        animate={{
          scale:     isHovered ? 1.02  : 1,
          boxShadow: isHovered
            ? "0 16px 48px rgba(30,58,95,0.13), 0 4px 12px rgba(30,58,95,0.06)"
            : "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col h-full"
      >
        <div className="p-5 flex flex-col h-full">

          {/* Logo — placeholder discreto (borda tracejada) enquanto o
              arquivo da marca ainda não existe; troca sozinho pra imagem
              real assim que `logo` for preenchido nos dados. */}
          <div className="h-14 flex items-center justify-center mb-4">
            {pms.logo ? (
              <img
                src={pms.logo}
                alt={pms.nome}
                width={228}
                height={80}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-[140px] w-auto object-contain transition-all duration-500"
                style={{
                  filter:    isHovered ? "grayscale(0%) opacity(1)"   : "grayscale(100%) opacity(0.5)",
                  transform: isHovered ? "scale(1.06)" : "scale(1)",
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 w-full h-full rounded-lg border border-dashed border-slate-200 text-slate-300">
                <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-[10px] font-medium tracking-wide">Logo</span>
              </div>
            )}
          </div>

          <p className="text-slate-500 text-sm leading-relaxed flex-grow mb-4">
            {pms.descricao}
          </p>

          <MagneticButton onClick={onSolicitar} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function PmsIntegradosSection() {
  const [activeTab, setActiveTab] = useState(categorias[0].id);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePms, setActivePms] = useState<PmsItem | null>(null);
  const [loopKey, setLoopKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Start/stop autoplay based on viewport visibility — mesmo padrão do
  // ReservaSection/CardapioDigitalSection.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Autoplay — só roda enquanto a seção está visível; troca manual reinicia
  // a contagem (loopKey), mas o ciclo nunca fica parado.
  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(() => {
      setActiveTab(prev => {
        const idx = categorias.findIndex(c => c.id === prev);
        return categorias[(idx + 1) % categorias.length].id;
      });
      setHoveredIndex(null);
    }, 4500);
    return () => clearInterval(id);
  }, [loopKey, isVisible]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#f4f7fb]">

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Integrações e{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              parceiros
            </span>{" "}
            da Foco Tecnologia
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Do PMS aos canais de venda, marketing e pagamentos, conheça o ecossistema
            que se conecta à nossa plataforma, com sincronização em tempo real e sem retrabalho.
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v);
            setHoveredIndex(null);
            setLoopKey(k => k + 1);
          }}
          className="w-full"
        >
          {/* Mesmo padrão do SmartIntegrationsTabs: grid 2 colunas no mobile,
              pílula em linha no desktop, com o indicador deslizante
              (layoutId) por trás da aba ativa. Sticky logo abaixo do
              header — ver StickyTabsList. */}
          <StickyTabsList className="mb-10 md:flex md:justify-center" activeValue={activeTab}>
            {(isStuck) => (
              <TabsList
                className={`grid grid-cols-2 w-full rounded-3xl md:inline-flex md:flex-nowrap md:w-auto md:rounded-full md:min-w-max h-auto gap-1 p-1.5 border transition-all duration-300 ${
                  isStuck
                    ? "bg-white/75 backdrop-blur-xl border-white/60 shadow-xl shadow-slate-900/10"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                {categorias.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.id === activeTab;
                  return (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl md:rounded-full md:px-5 md:py-2.5 md:whitespace-nowrap"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pms-integrados-tab-indicator"
                          className="absolute inset-0 rounded-xl md:rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#285992] shadow-md shadow-[#285992]/25"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-600 hover:text-[#285992]"}`}>
                        <Icon className="w-4 h-4 shrink-0" />
                        {cat.label}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            )}
          </StickyTabsList>

          {categorias.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0 outline-none">
              <div
                className={`grid ${gridColsClass(cat.itens.length)} gap-5`}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {cat.itens.map((pms, index) => (
                  <PmsCard
                    key={pms.id}
                    pms={pms}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onEnter={() => setHoveredIndex(index)}
                    onSolicitar={() => setActivePms(pms)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

      </div>

      <PmsOrcamentoModal pms={activePms} onClose={() => setActivePms(null)} />
    </section>
  );
}

export { PmsIntegradosSection };
