"use client";

import { motion } from "framer-motion";
import { Filter, History, Zap, ClipboardCheck, BarChart3, Link2 } from "lucide-react";

const recursos = [
  {
    icon: Filter,
    titulo: "Segmentação Inteligente",
    descricao:
      "Divida sua base de clientes em grupos específicos (ex: hóspedes de lazer, corporativos, famílias) com base em comportamento, histórico de compras e preferências. Envie ofertas direcionadas que realmente convertem.",
  },
  {
    icon: History,
    titulo: "Histórico do Hóspede",
    descricao:
      "Tenha acesso instantâneo a todas as informações do cliente: estadias anteriores, preferências de quarto, consumo no frigobar, datas especiais e interações passadas. Ofereça um atendimento personalizado desde o primeiro contato.",
  },
  {
    icon: Zap,
    titulo: "Automação de Marketing",
    descricao:
      "Crie fluxos automáticos de e-mail e WhatsApp para nutrir leads, enviar lembretes de aniversário, recuperar orçamentos não concluídos e fidelizar hóspedes após o check-out, tudo sem intervenção manual.",
  },
  {
    icon: ClipboardCheck,
    titulo: "Pesquisas de Satisfação",
    descricao:
      "Envie pesquisas automatizadas após a estadia para medir a satisfação do hóspede em tempo real. Identifique pontos de melhoria e transforme feedbacks em ações concretas para elevar a qualidade do serviço.",
  },
  {
    icon: BarChart3,
    titulo: "Dashboards e Analytics",
    descricao:
      "Acompanhe métricas-chave como taxa de conversão de leads, tempo médio de resposta, satisfação do cliente e receita por segmento. Tome decisões baseadas em dados e otimize suas campanhas de marketing.",
  },
  {
    icon: Link2,
    titulo: "Integração Completa",
    descricao:
      "Conecte seu CRM ao PMS, Motor de Reservas, Channel Manager e ferramentas de marketing (RD Station, Mailchimp, Meta Ads). Tenha uma visão 360° do cliente em uma única plataforma.",
  },
];

function RecursosSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Custom Title/Subtitle as requested */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            Transforme dados em <span className="text-[#5E35B1]">hóspedes fiéis</span> e{" "}
            <span className="text-[#5E35B1]">reservas diretas</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Utilize a inteligência do nosso CRM para entender o comportamento do seu
            público e criar campanhas automatizadas que geram faturamento recorrente.
          </p>
        </motion.div>

        {/* Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recursos.map((recurso, index) => {
            const Icon = recurso.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#5E35B1] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-bold text-[#1e3a5f] mb-2">{recurso.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{recurso.descricao}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { RecursosSection };
