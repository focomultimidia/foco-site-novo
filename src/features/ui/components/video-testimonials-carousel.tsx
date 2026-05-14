"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  /** @deprecated — layout is now controlled by Tailwind breakpoints */
  slidesToShow?: number;
  autoplayDelay?: number;
}

function VideoTestimonialsCarousel({
  items,
  title,
  subtitle,
  badge,
  autoplayDelay = 4000,
}: VideoTestimonialsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoDepoimento | null>(null);

  // Sync dots with carousel position
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  // ESC key + body scroll lock when modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    if (selectedVideo) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  return (
    <>
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
              className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Carousel — 4 cards on desktop, 2 on tablet, 1 on mobile */}
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            plugins={[
              Autoplay({
                delay: autoplayDelay,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/6"
                >
                  {/*
                    Card vertical (9:16 stories format).
                    Preview: thumbnail gerada dinamicamente a partir do youtubeId.
                    Para usar <video> com arquivo direto, adicione videoUrl ao interface e substitua o <img> por:
                    <video
                      src={`${item.videoUrl}#t=0.001`}
                      preload="metadata"
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  */}
                  <div
                    className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-black cursor-pointer"
                    onClick={() => setSelectedVideo(item)}
                  >
                    {/* Thumbnail (first frame via YouTube CDN) */}
                    <img
                      src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />

                    {/* Top: channel badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-white/80 text-[11px] font-medium drop-shadow">
                        Foco Tecnologia
                      </span>
                    </div>

                    {/* Center: play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Bottom: title + author */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-semibold leading-snug line-clamp-2 mb-1.5">
                        {item.title}
                      </p>
                      <p className="text-white/70 text-xs line-clamp-1">{item.author}</p>
                      <p className="text-white/50 text-xs">{item.hotel}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation arrows — same style as SoftwareProductsCarousel */}
            <div className="hidden lg:block">
              <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
              <CarouselNext className="-right-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
            </div>
          </Carousel>

          {/* Dots indicator — same logic and style as SoftwareProductsCarousel */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-blue-500 w-8"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedVideo && (
          // Backdrop — glassmorphism, click outside closes
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Modal panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Fechar vídeo"
                className="absolute -top-11 right-0 flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
              >
                <X className="w-5 h-5" strokeWidth={2} />
                <span className="tracking-wide">ESC</span>
              </button>

              {/* 16:9 YouTube embed */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-white font-medium text-sm">{selectedVideo.title}</p>
                <p className="text-white/50 text-xs mt-0.5">
                  {selectedVideo.author} — {selectedVideo.hotel}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { VideoTestimonialsCarousel };
export type { VideoDepoimento };
