"use client";

import { motion } from "framer-motion";
import {
  Bed,
  Tag,
  Image,
  Star,
  Building,
  Newspaper,
  Award,
  LayoutTemplate,
  Calendar,
  MessageCircle,
  FormInput,
  Bot,
} from "lucide-react";

const recursos = [
  {
    icon: Bed,
    titulo: "Acomodações com Detalhes",
    descricao:
      "Exiba fotos, descrições, preços e diferenciais de cada tipo de quarto.",
  },
  {
    icon: Tag,
    titulo: "Pacotes e Promoções",
    descricao:
      "Crie ofertas sazonais ou personalizadas e aumente suas vendas diretas.",
  },
  {
    icon: Image,
    titulo: "Galeria de Fotos e Vídeos",
    descricao:
      "Encante seus visitantes com imagens e vídeos profissionais do hotel.",
  },
  {
    icon: Star,
    titulo: "Depoimentos e Avaliações",
    descricao:
      "Mostre a opinião de hóspedes reais e gere mais confiança no seu hotel.",
  },
  {
    icon: Building,
    titulo: "Página Institucional",
    descricao:
      "Conte a história do seu hotel e reforce sua credibilidade com visitantes.",
  },
  {
    icon: Newspaper,
    titulo: "Notícias e Atualizações",
    descricao:
      "Divulgue eventos, ações especiais e novidades para atrair mais tráfego.",
  },
  {
    icon: Award,
    titulo: "Prêmios e Certificações",
    descricao:
      "Destaque selos de qualidade que comprovam sua excelência no setor.",
  },
  {
    icon: LayoutTemplate,
    titulo: "Banners Promocionais",
    descricao:
      "Promova ofertas e eventos com banners estratégicos no seu site.",
  },
  {
    icon: Calendar,
    titulo: "Eventos e Datas Especiais",
    descricao:
      "Crie páginas dedicadas para eventos, casamentos ou pacotes temáticos.",
  },
  {
    icon: MessageCircle,
    titulo: "Integração com WhatsApp",
    descricao:
      "Permita que o hóspede tire dúvidas e reserve direto pelo WhatsApp.",
  },
  {
    icon: FormInput,
    titulo: "Formulários de Contato Rápido",
    descricao:
      "Capte leads e reservas com formulários simples e intuitivos.",
  },
  {
    icon: Bot,
    titulo: "Chatbot Inteligente Integrado",
    descricao:
      "Atenda visitantes automaticamente e aumente suas chances de conversão.",
  },
];

function RecursosGridSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            <span className="text-blue-500">Recursos essenciais</span> de um
            site hoteleiro que converte visitantes em hóspedes
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A Foco oferece recursos práticos, integrados e pensados para
            destacar sua estrutura, engajar visitantes e gerar reservas diretas,
            sem comissões.
          </p>
        </motion.div>

        {/* Grid - 4 columns x 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recursos.map((recurso, index) => {
            const Icon = recurso.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">{recurso.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {recurso.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { RecursosGridSection };
