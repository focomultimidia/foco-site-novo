"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, CheckCircle, Lock } from "lucide-react";

interface Certificacao {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  icon?: "shield" | "award" | "check" | "lock";
}

interface CertificationsRowProps {
  certifications: Certificacao[];
  title: string;
  subtitle?: string;
  badge?: string;
  columns?: number;
}

function CertificationsRow({
  certifications,
  title,
  subtitle,
  badge,
  columns = 4,
}: CertificationsRowProps) {
  const getIcon = (iconType?: string) => {
    const iconClass = "w-12 h-12 text-[#00BCD4]";
    switch (iconType) {
      case "shield":
        return <Shield className={iconClass} />;
      case "award":
        return <Award className={iconClass} />;
      case "check":
        return <CheckCircle className={iconClass} />;
      case "lock":
        return <Lock className={iconClass} />;
      default:
        return <Shield className={iconClass} />;
    }
  };

  const getGridClass = () => {
    if (columns === 2) return "grid-cols-1 sm:grid-cols-2";
    if (columns === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
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

        {/* Certifications Grid */}
        <div className={`grid ${getGridClass()} gap-6`}>
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              {cert.logoUrl ? (
                <img
                  src={cert.logoUrl}
                  alt={cert.name}
                  className="h-16 w-auto object-contain mx-auto mb-4"
                  loading="lazy"
                />
              ) : (
                <div className="flex justify-center mb-4">
                  {getIcon(cert.icon)}
                </div>
              )}
              <h3 className="font-bold text-[#1E3A5F] mb-2">{cert.name}</h3>
              <p className="text-sm text-gray-600">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { CertificationsRow };
export type { Certificacao };
