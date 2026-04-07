"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoDepoimento {
  id: string;
  title: string;
  thumbnailUrl: string;
  youtubeId: string;
  author: string;
  hotel: string;
}

interface VideoTestimonialsCarouselProps {
  items: VideoDepoimento[];
  title: string;
  subtitle?: string;
  badge?: string;
  slidesToShow?: number;
  autoplayDelay?: number;
}

function VideoTestimonialsCarousel({
  items,
  title,
  subtitle,
  badge,
  slidesToShow = 3,
  autoplayDelay = 5000,
}: VideoTestimonialsCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoDepoimento | null>(null);

  const getSlideWidth = () => {
    if (slidesToShow === 1) return "flex-[0_0_100%]";
    if (slidesToShow === 2) return "flex-[0_0_calc(50%-12px)]";
    return "flex-[0_0_calc(33.333%-16px)]";
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[#00BCD4]/10 text-[#00BCD4] hover:bg-[#00BCD4]/20 mb-4">
                {badge}
              </Badge>
            </motion.div>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${getSlideWidth()} min-w-0`}
              >
                <div
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(item)}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:bg-black/50 transition-all">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-[#1E3A5F] ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-[#1E3A5F] group-hover:text-[#00BCD4] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.author} • {item.hotel}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          {selectedVideo && (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export { VideoTestimonialsCarousel };
export type { VideoDepoimento };
