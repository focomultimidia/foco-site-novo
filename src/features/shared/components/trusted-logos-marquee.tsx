"use client";

import { motion } from "framer-motion";

interface LogoCliente {
  id: string;
  nome: string;
  logo: string;
}

const clientesData: LogoCliente[] = [
  {
    id: "1",
    nome: "Casa Odara",
    logo: "/casa-odara.png",
  },
  {
    id: "2",
    nome: "Casas Brancas",
    logo: "/casas-brancas.png",
  },
  {
    id: "3",
    nome: "Chalé Bosque Fortuna",
    logo: "/chale-bosque-fortuna.png",
  },
  {
    id: "4",
    nome: "Chalés Arimara",
    logo: "/chales-arimara.png",
  },
  {
    id: "5",
    nome: "Chalés da Represa",
    logo: "/chales-da-represa.png",
  },
  {
    id: "6",
    nome: "Collegare Hotel",
    logo: "/collegare-hotel.png",
  },
  {
    id: "7",
    nome: "Conexão Sebold",
    logo: "/conexao-sebold.png",
  },
  {
    id: "8",
    nome: "Covivere",
    logo: "/covivere.png",
  },
  {
    id: "9",
    nome: "EAS Airport",
    logo: "/eas-airport.png",
  },
  {
    id: "10",
    nome: "Gromsvillage",
    logo: "/gromsvillage.png",
  },
  {
    id: "11",
    nome: "Hotel Fazenda Brejo",
    logo: "/hotel-fazenda-brejo.png",
  },
  {
    id: "12",
    nome: "Hotel Fazenda Cheiro Verde",
    logo: "/hotel-fazenda-cheiro-verde.png",
  },
  {
    id: "13",
    nome: "Hotel Fazenda Horizonte Belo",
    logo: "/hotel-fazenda-horizonte-belo.png",
  },
  {
    id: "14",
    nome: "Hotel Fazenda Tambatajá",
    logo: "/hotel-fazenda-tambataja.png",
  },
  {
    id: "15",
    nome: "Hotel Fazenda Vitória",
    logo: "/hotel-fazenda-vitoria.png",
  },
  {
    id: "16",
    nome: "Marano Hotel",
    logo: "/marano-hotel.png",
  },
  {
    id: "17",
    nome: "Pedra Afiada",
    logo: "/pedra-afiada.png",
  },
  {
    id: "18",
    nome: "Pousada Restaurante Wassu",
    logo: "/pousada-restaurante-wassu.png",
  },
  {
    id: "19",
    nome: "Pousada Villas Tature",
    logo: "/pousada-villas-tature.png",
  },
  {
    id: "20",
    nome: "Quilombo",
    logo: "/quilombo.png",
  },
  {
    id: "21",
    nome: "Rede BUP",
    logo: "/rede-bup.png",
  },
  {
    id: "22",
    nome: "Rede KS Hotéis",
    logo: "/rede-ks-hoteis.png",
  },
  {
    id: "23",
    nome: "Rede Tonziro",
    logo: "/rede-tonziro.png",
  },
  {
    id: "24",
    nome: "Viageiro Casa Hotel",
    logo: "/viageiro-casa-hotel.png",
  },
  {
    id: "25",
    nome: "Vila Gramado",
    logo: "/vila-gramado.png",
  },
  {
    id: "26",
    nome: "Villa Forte",
    logo: "/villa-forte.png",
  },
];

function TrustedLogosMarquee() {
  // Duplicar os logos para criar o efeito infinito contínuo
  const logosDuplicados = [...clientesData, ...clientesData];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            +2.500 hotéis turbinaram seus resultados com as{" "}
            <span className="text-blue-500">nossas tecnologias</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Grandes redes e pousadas independentes confiam na Foco para impulsionar seus negócios
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {logosDuplicados.map((cliente, index) => (
              <div
                key={`${cliente.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="h-16 w-40 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <img
                    src={cliente.logo}
                    alt={cliente.nome}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { TrustedLogosMarquee };
