"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    titulo: "Hotel Fazenda São Paulo",
    descricao: "Aumento de 40% nas reservas diretas",
    duracao: "2:34",
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    titulo: "Pousada Mar Azul",
    descricao: "Site moderno e conversão alta",
    duracao: "1:58",
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    titulo: "Resort Paradise",
    descricao: "Integração perfeita com nossos sistemas",
    duracao: "3:12",
  },
];

function VideosSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4">
            Veja quem já transformou{" "}
            <span className="text-blue-500">sua presença digital</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Depoimentos em vídeo de clientes que aumentaram suas reservas diretas
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden mb-4">
                <div className="aspect-video bg-slate-200">
                  <img
                    src={video.thumbnail}
                    alt={video.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-[#1e3a5f] ml-1" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duracao}
                </div>
              </div>
              <h3 className="font-bold text-[#1e3a5f] mb-1">{video.titulo}</h3>
              <p className="text-gray-500 text-sm">{video.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { VideosSection };
