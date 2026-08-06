"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

interface LogoCliente {
  id: string;
  nome: string;
  logo: string;
}

const clientesData: LogoCliente[] = [
  {
    id: "1",
    nome: "Casa Odara",
    logo: "/assets/imgs/clientes/casa-odara.webp",
  },
  {
    id: "2",
    nome: "Casas Brancas",
    logo: "/assets/imgs/clientes/casas-brancas.webp",
  },
  {
    id: "3",
    nome: "Chalé Bosque Fortuna",
    logo: "/assets/imgs/clientes/chale-bosque-fortuna.webp",
  },
  {
    id: "4",
    nome: "Chalés Arimara",
    logo: "/assets/imgs/clientes/chales-arimara.webp",
  },
  {
    id: "5",
    nome: "Chalés da Represa",
    logo: "/assets/imgs/clientes/chales-da-represa.webp",
  },
  {
    id: "6",
    nome: "Collegare Hotel",
    logo: "/assets/imgs/clientes/collegare-hotel.webp",
  },
  {
    id: "7",
    nome: "Conexão Sebold",
    logo: "/assets/imgs/clientes/conexao-sebold.webp",
  },
  {
    id: "8",
    nome: "Covivere",
    logo: "/assets/imgs/clientes/covivere.webp",
  },
  {
    id: "9",
    nome: "EAS Airport",
    logo: "/assets/imgs/clientes/eas-airport.webp",
  },
  {
    id: "10",
    nome: "Gromsvillage",
    logo: "/assets/imgs/clientes/gromsvillage.webp",
  },
  {
    id: "11",
    nome: "Hotel Fazenda Brejo",
    logo: "/assets/imgs/clientes/hotel-fazenda-brejo.webp",
  },
  {
    id: "12",
    nome: "Hotel Fazenda Cheiro Verde",
    logo: "/assets/imgs/clientes/hotel-fazenda-cheiro-verde.webp",
  },
  {
    id: "13",
    nome: "Hotel Fazenda Horizonte Belo",
    logo: "/assets/imgs/clientes/hotel-fazenda-horizonte-belo.webp",
  },
  {
    id: "14",
    nome: "Hotel Fazenda Tambatajá",
    logo: "/assets/imgs/clientes/hotel-fazenda-tambataja.webp",
  },
  {
    id: "15",
    nome: "Hotel Fazenda Vitória",
    logo: "/assets/imgs/clientes/hotel-fazenda-vitoria.webp",
  },
  {
    id: "16",
    nome: "Marano Hotel",
    logo: "/assets/imgs/clientes/marano-hotel.webp",
  },
  {
    id: "17",
    nome: "Pedra Afiada",
    logo: "/assets/imgs/clientes/pedra-afiada.webp",
  },
  {
    id: "18",
    nome: "Pousada Restaurante Wassu",
    logo: "/assets/imgs/clientes/pousada-restaurante-wassu.webp",
  },
  {
    id: "19",
    nome: "Pousada Villas Tature",
    logo: "/assets/imgs/clientes/pousada-villas-tature.webp",
  },
  {
    id: "20",
    nome: "Quilombo",
    logo: "/assets/imgs/clientes/quilombo.webp",
  },
  {
    id: "21",
    nome: "Rede BUP",
    logo: "/assets/imgs/clientes/rede-bup.webp",
  },
  {
    id: "22",
    nome: "Rede KS Hotéis",
    logo: "/assets/imgs/clientes/rede-ks-hoteis.webp",
  },
  {
    id: "23",
    nome: "Rede Tonziro",
    logo: "/assets/imgs/clientes/rede-tonziro.webp",
  },
  {
    id: "24",
    nome: "Viageiro Casa Hotel",
    logo: "/assets/imgs/clientes/viageiro-casa-hotel.webp",
  },
  {
    id: "25",
    nome: "Vila Gramado",
    logo: "/assets/imgs/clientes/vila-gramado.webp",
  },
  {
    id: "26",
    nome: "Villa Forte",
    logo: "/assets/imgs/clientes/villa-forte.webp",
  },
];

function TrustedLogosMarquee() {
  // Duplicar os logos para criar o efeito infinito contínuo
  const logosDuplicados = [...clientesData, ...clientesData];

  return (
    <section className="py-20 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionEyebrow>Cases</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">+2.500 hotéis</span> turbinaram seus resultados com a Foco
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
                <div className="h-16 w-40 flex items-center justify-center transition-all duration-300">
                  <img
                    src={cliente.logo}
                    alt={cliente.nome}
                    width={222}
                    height={104}
                    loading="lazy"
                    decoding="async"
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
