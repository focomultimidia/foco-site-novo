"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pmsIntegrados = [
  {
    nome: "Plus",
    descricao:
      "Sistema de gestão hoteleira em nuvem desenvolvido pela Foco Tecnologia, para pequenos hoteleiros. Integrado ao motor de reservas e ao gestor de canais, os clientes terão a tranquilidade de disponibilizar 100% das suas ocupações para vendas em mais de 800 canais integrados, sem overbookings.",
  },
  {
    nome: "ADM",
    descricao:
      "A ADM Desenvolvimento de Sistemas é uma empresa de tecnologia, sediada em Ilhéus-BA, criada em 2008, que desenvolve e comercializa o ADM Hotel e o ADM Restaurante, ferramentas para gestão de hotéis, pousadas, bares, restaurantes e similares com mais de 1200 licenças em todo o Brasil.",
  },
  {
    nome: "Bitz",
    descricao:
      "A Bitz Softwares está há mais de 9 anos no mercado, uma empresa de tecnologia especializada no setor hoteleiro. Nosso propósito é gerar ótimas experiências para as pessoas. Facilitando suas vidas, economizando seu tempo e aumentando seu rendimento no dia-a-dia.",
  },
  {
    nome: "Carsoft",
    descricao:
      "Xenios – Sistema de gestão de hotéis, pousadas e hostels de fácil utilização. Possui integração com outros módulos como estoque, restaurante, financeiro, eventos, controle de serviços e reserva online direto pelo site do hotel/pousada. Conta com suporte 24 horas.",
  },
  {
    nome: "Desbravador",
    descricao:
      "Atuamos no desenvolvimento de software para a gestão de hotéis desde 1988. Somos Desbravadores! Atendemos hotéis de pequeno, médio e grande porte, fornecendo soluções que otimizam suas operações e aprimoram a experiência do hóspede. Hoje são mais de 3.500 clientes espalhados em dez países.",
  },
  {
    nome: "eSolution",
    descricao:
      "A eSolution é uma empresa de software que está no mercado desde 2007. Sua atuação está focada em softwares de gestão em hotelaria e parques temáticos. Com um ideal de excelência, ela vem ganhando destaque nesses setores.",
  },
  {
    nome: "HMAX",
    descricao:
      "A HMAX é uma empresa pioneira no mercado de automação hoteleira. O nosso sistema de gestão oferece 30 anos de conhecimento organizados em módulos, que você pode contratar segundo a sua necessidade. O PMS HMAX está integrado com a Foco Multimídia.",
  },
  {
    nome: "Hotelflow",
    descricao:
      "Com o Hotelflow, você tem em mãos um gerenciamento moderno, prático e intuitivo para aumentar a produtividade do seu empreendimento hoteleiro. O sistema é web, não requer instalação, basta acessar pelo seu navegador e usar de qualquer lugar, até mesmo do seu dispositivo móvel!",
  },
  {
    nome: "Isasoft",
    descricao:
      "Empresa voltada para o desenvolvimento de sistemas para gerenciamento de micros e pequenas empresas do comércio para todo o território nacional. O Isasoft Inn, foi desenvolvido para administrar pousadas, hotéis e resorts de forma rápida e profissional.",
  },
  {
    nome: "MDE",
    descricao:
      "Há mais de 27 anos a MDE Informática projeta e desenvolve Sistemas de Gestão para os segmentos Hoteleiro e Motelero. Nosso diferencial está em oferecer soluções personalizadas para a necessidade específica de cada cliente.",
  },
  {
    nome: "Newhotel",
    descricao:
      "Uma empresa de software especializada em desenvolver sistemas para gestão hoteleira. Pioneiros internacionais em soluções Cloud para o setor hoteleiro, estamos no mercado há 37 anos e possuímos um portfólio com mais de 6 mil hotéis, em 64 países.",
  },
  {
    nome: "Queops",
    descricao:
      "A Quéops possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira, unindo funcionalidades essenciais com o que há de melhor em distribuição, canal direto e automações.",
  },
  {
    nome: "Sachar",
    descricao:
      "A Sachar (SGH) possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira, unindo funcionalidades essenciais com o que há de melhor em distribuição, canal direto e automações.",
  },
  {
    nome: "Silbeck",
    descricao:
      "Somos uma empresa de software para gestão hoteleira. Atuamos há 25 anos no mercado com foco na busca da excelência em nosso atendimento e no desenvolvimento de nossos produtos. O nosso objetivo nunca foi oferecer apenas um sistema de gestão.",
  },
  {
    nome: "Simpleshotel",
    descricao:
      "A Simple Hotel possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira, unindo funcionalidades essenciais com o que há de melhor em distribuição, canal direto e automações.",
  },
  {
    nome: "Techside",
    descricao:
      "A TechSide (TechHotel) possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira, unindo funcionalidades essenciais com o que há de melhor em distribuição, canal direto e automações.",
  },
  {
    nome: "Tô de Férias",
    descricao:
      "O TDF Hotel é um PMS completo, integrando as rotinas de recepção, reservas, governança, financeiro e estoque, que possui integrações comerciais e administrativas, além de configurações personalizadas e foco no relacionamento entre hoteleiro e hóspede.",
  },
  {
    nome: "TOTVS",
    descricao:
      "A TOTVS cresce junto com a sua empresa. Aumente sua eficiência operacional e produtividade com um software completo para gestão e automação de processos. Não perca tempo e automatize a sua gestão de reservas, unificando toda a sua disponibilidade em um só sistema.",
  },
];

function PmsIntegradosSection() {
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
            Conheça os <span className="text-[#455A64]">PMS's integrados</span> com a Foco Multimídia
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Nosso sistema se conecta aos principais PMS do mercado brasileiro,
            garantindo sincronização em tempo real e eliminando retrabalho.
          </p>
        </motion.div>

        {/* Grid - 3 columns x 6 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pmsIntegrados.map((pms, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#455A64]/20 transition-all duration-300 flex flex-col"
            >
              {/* Logo Placeholder */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#455A64] to-[#263238] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">{pms.nome.charAt(0)}</span>
              </div>

              <h3 className="font-bold text-[#1e3a5f] mb-3 text-center text-lg">{pms.nome}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{pms.descricao}</p>

              <Button
                variant="outline"
                size="sm"
                className="text-[#455A64] hover:text-[#263238] hover:bg-[#455A64]/10 text-sm w-full mt-auto rounded-full"
              >
                Solicite orçamento
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { PmsIntegradosSection };
