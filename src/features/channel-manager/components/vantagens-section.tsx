"use client";

import { motion } from "framer-motion";

const vantagens = [
  {
    numero: "01",
    titulo: "PREVENÇÃO DE OVERBOOKING",
    subtitulo: "(Sincronização em tempo real)",
    descricao:
      "O Channel Manager atualiza a disponibilidade de quartos em todos os canais de venda (OTAs, GDS, Motor de Reservas) instantaneamente. Isso elimina o risco de overbooking e os custos e transtornos associados a ele.",
  },
  {
    numero: "02",
    titulo: "MAXIMIZAÇÃO DE VENDAS",
    subtitulo: "(Distribuição ampla e eficiente)",
    descricao:
      "Permite que o hotel se conecte a um grande número de OTAs e canais globais sem esforço manual. Isso maximiza a exposição do inventário, alcançando um público muito maior e aumentando a taxa de ocupação.",
  },
  {
    numero: "03",
    titulo: "OTIMIZAÇÃO DE TEMPO",
    subtitulo: "(Automação de tarefas)",
    descricao:
      "Elimina a necessidade de acessar individualmente cada extranet de OTA para atualizar preços e disponibilidade. O hotel economiza horas de trabalho manual, que podem ser dedicadas ao atendimento ao hóspede ou a estratégias de Revenue Management.",
  },
  {
    numero: "04",
    titulo: "REVENUE MANAGEMENT",
    subtitulo: "(Gestão centralizada de tarifas)",
    descricao:
      "Permite a aplicação rápida de estratégias de preços dinâmicos. O hotel pode ajustar tarifas em um único painel e replicá-las em todos os canais simultaneamente, garantindo que o preço certo seja oferecido no momento certo.",
  },
  {
    numero: "05",
    titulo: "CONTROLE DE INVENTÁRIO",
    subtitulo: "(Visão centralizada)",
    descricao:
      "Oferece uma visão unificada de todo o inventário de quartos. O gestor sabe exatamente quantos quartos estão disponíveis em cada canal, evitando a venda excessiva ou a subutilização do inventário.",
  },
  {
    numero: "06",
    titulo: "AUMENTO DA LUCRATIVIDADE",
    subtitulo: "(Foco nas reservas diretas)",
    descricao:
      "Ao integrar o Motor de Reservas do site, o Channel Manager garante que o inventário esteja sempre disponível no canal próprio, incentivando as reservas diretas e, consequentemente, aumentando a lucratividade ao reduzir as comissões de terceiros.",
  },
  {
    numero: "07",
    titulo: "INTELIGÊNCIA DE DADOS",
    subtitulo: "(Relatórios de performance)",
    descricao:
      "Muitos sistemas oferecem relatórios detalhados sobre o desempenho de cada canal de venda. Isso permite identificar quais canais trazem mais receita e qual o custo de aquisição de cada hóspede, subsidiando decisões estratégicas.",
  },
  {
    numero: "08",
    titulo: "SINCRONIZAÇÃO TWO-WAY COM PMS",
    subtitulo: "(Redução de erros humanos)",
    descricao:
      "Garante a sincronização em tempo real de reservas, cancelamentos, alterações e disponibilidade com os principais PMS do Brasil. Essa conexão elimina o risco de overbooking e assegura a precisão dos dados em toda a sua gestão hoteleira.",
  },
];

function VantagensSection() {
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
            Vantagens do <span className="text-blue-500">gestor de canais</span>{" "}
            para hotéis e pousadas
          </h2>
          <p className="text-gray-500 text-lg max-w-4xl mx-auto">
            O nosso <span className="text-blue-500 font-medium">software de hotelaria</span>{" "}
            permite que você distribua as acomodações em centenas de canais,
            aumentando sua taxa de ocupação, reduzindo os riscos de overbooking e
            otimizando o trabalho da equipe de reservas do seu hotel.
          </p>
        </motion.div>

        {/* Grid - 4 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vantagens.map((vantagem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
            >
              {/* Number Badge */}
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-sm">{vantagem.numero}</span>
              </div>

              <h3 className="font-bold text-[#1e3a5f] mb-1 text-sm">{vantagem.titulo}</h3>
              <p className="text-blue-500 text-xs mb-3">{vantagem.subtitulo}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{vantagem.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { VantagensSection };
