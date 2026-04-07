"use client";

import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  QrCode,
  Utensils,
  Sparkles,
  Building,
  Calendar,
  Wifi,
  Bell,
  Receipt,
  MessageCircle,
  MapPin,
} from "lucide-react";

const recursos = [
  {
    icon: Star,
    titulo: "Avaliações",
    descricao:
      "Sua opinião é valiosa! Compartilhe sua experiência de forma rápida e ajude-nos a tornar sua próxima estadia ainda melhor.",
  },
  {
    icon: CheckCircle,
    titulo: "Check-in online",
    descricao:
      "Agilidade total! Faça seu check-in antes mesmo de chegar ao hotel e vá direto para o seu quarto, sem filas na recepção.",
  },
  {
    icon: QrCode,
    titulo: "Pagamento de contas (PIX)",
    descricao:
      "Pague sua conta de forma instantânea e segura. Encerre seu consumo e faça o check-out com a rapidez e a facilidade do PIX.",
  },
  {
    icon: Utensils,
    titulo: "Cardápio digital",
    descricao:
      "Acesse o menu completo do nosso restaurante e serviço de quarto diretamente do seu celular. Faça seu pedido com facilidade e receba no conforto do seu quarto.",
  },
  {
    icon: Sparkles,
    titulo: "Comodidades do hotel",
    descricao:
      "Conheça todos os serviços e facilidades que o hotel oferece (piscina, academia, spa, etc.). Saiba horários de funcionamento e regras de uso em um só lugar.",
  },
  {
    icon: Building,
    titulo: "Sobre o hotel",
    descricao:
      "Nossa história e missão. Conheça a filosofia do hotel, nossa equipe e o compromisso que temos em tornar sua estadia inesquecível.",
  },
  {
    icon: Calendar,
    titulo: "Programação do hotel",
    descricao:
      "Não perca nada! Fique por dentro de todos os eventos, atividades e horários de lazer que o hotel preparou para você durante sua estadia.",
  },
  {
    icon: Wifi,
    titulo: "Wifi",
    descricao:
      "Conecte-se em segundos. Obtenha a senha e as instruções de acesso à nossa rede Wi-Fi de alta velocidade com apenas um toque.",
  },
  {
    icon: Bell,
    titulo: "Push interativo",
    descricao:
      "Aplicativo com alerta de toda a programação de entretenimento do seu hotel e destino.",
  },
  {
    icon: Receipt,
    titulo: "Acompanhamento de consumo",
    descricao:
      "Transparência total! Visualize em tempo real todos os seus gastos no hotel (frigobar, restaurante, serviços), evitando surpresas no check-out.",
  },
  {
    icon: MessageCircle,
    titulo: "Integração via Whatsapp",
    descricao:
      "Comunicação instantânea. Fale diretamente com a recepção ou com o serviço de quarto para tirar dúvidas ou fazer pedidos de forma rápida e familiar, usando o seu aplicativo favorito.",
  },
  {
    icon: MapPin,
    titulo: "Como chegar",
    descricao:
      "Rota fácil e sem erro. Acesse o mapa e as direções detalhadas para chegar ao hotel de forma rápida, seja de carro ou transporte público.",
  },
];

function RecursosSection() {
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
            Confira alguns recursos do mais inovador{" "}
            <span className="text-blue-500">aplicativo de hospedagem</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Do check-in online ao pagamento via PIX: a tecnologia que coloca o controle
            da estadia na palma da mão do seu hóspede.
          </p>
        </motion.div>

        {/* Grid - 4 columns x 3 rows (11 items) */}
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
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
