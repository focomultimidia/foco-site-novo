"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MidiaItem {
  id: string;
  source: string;
  date: string;
  title: string;
  summary: string;
  imageUrl: string;
  link?: string;
}

interface DepoimentoItem {
  id: string;
  rating: number;
  content: string;
  author: string;
  hotel: string;
  imageUrl?: string;
}

interface ClienteLogo {
  id: string;
  name: string;
  logoUrl: string;
}

type CarouselItem = MidiaItem | DepoimentoItem | ClienteLogo;

interface SocialProofCarouselProps {
  items: CarouselItem[];
  title: string;
  subtitle?: string;
  badge?: string;
  slidesToShow?: number;
  autoplayDelay?: number;
}

function isMidiaItem(item: CarouselItem): item is MidiaItem {
  return "source" in item;
}

function isDepoimentoItem(item: CarouselItem): item is DepoimentoItem {
  return "rating" in item;
}

function isClienteLogo(item: CarouselItem): item is ClienteLogo {
  return "logoUrl" in item;
}

function SocialProofCarousel({
  items,
  title,
  subtitle,
  badge,
  slidesToShow = 3,
  autoplayDelay = 4000,
}: SocialProofCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  const getSlideWidth = () => {
    if (slidesToShow === 1) return "flex-[0_0_100%]";
    if (slidesToShow === 2) return "flex-[0_0_calc(50%-12px)]";
    return "flex-[0_0_calc(33.333%-16px)]";
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
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
                key={isClienteLogo(item) ? item.name : "id" in item ? item.id : index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${getSlideWidth()} min-w-0`}
              >
                {isMidiaItem(item) && (
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow h-full">
                    <div className="aspect-video relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span className="font-medium text-[#00BCD4]">{item.source}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-bold text-[#1E3A5F] mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                      {item.link && (
                        <Button variant="ghost" className="p-0 h-auto text-[#00BCD4] hover:text-[#1E3A5F] rounded-full">
                          Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {isDepoimentoItem(item) && (
                  <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 flex-1">&ldquo;{item.content}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#00BCD4] flex items-center justify-center text-white font-bold">
                          {item.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#1E3A5F]">{item.author}</p>
                        <p className="text-sm text-gray-500">{item.hotel}</p>
                      </div>
                    </div>
                  </div>
                )}

                {isClienteLogo(item) && (
                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#00BCD4] hover:shadow-lg transition-all h-full flex items-center justify-center">
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                      loading="lazy"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { SocialProofCarousel };
export type { MidiaItem, DepoimentoItem, ClienteLogo };
