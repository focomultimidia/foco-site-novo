"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const leadFormSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  hotel: z.string().min(2, "Nome do hotel é obrigatório"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadCaptureCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  badge?: string;
  variant?: "default" | "gradient";
}

function LeadCaptureCTA({
  title = "Solicite uma Demonstração",
  subtitle = "Preencha o formulário e nossa equipe entrará em contato em até 24 horas.",
  buttonText = "Solicitar Demonstração",
  badge,
  variant = "gradient",
}: LeadCaptureCTAProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (_data: LeadFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Solicitação enviada com sucesso!");
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const bgClass = variant === "gradient" 
    ? "bg-gradient-to-br from-[#1E3A5F] via-[#1E3A5F] to-[#0097A7]"
    : "bg-white border-t border-gray-200";

  const textClass = variant === "gradient" ? "text-white" : "text-[#1E3A5F]";
  const subTextClass = variant === "gradient" ? "text-white/80" : "text-gray-600";

  return (
    <section className={`py-16 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {badge && (
              <Badge className={`${variant === "gradient" ? "bg-white/20 text-white" : "bg-[#00BCD4]/10 text-[#00BCD4]"} mb-4`}>
                {badge}
              </Badge>
            )}
            <h2 className={`text-3xl lg:text-4xl font-bold ${textClass} mb-4`}>
              {title}
            </h2>
            <p className={`text-lg ${subTextClass} mb-8`}>{subtitle}</p>

            <div className="space-y-4">
              <div className={`flex items-center gap-3 ${subTextClass}`}>
                <div className={`w-10 h-10 rounded-full ${variant === "gradient" ? "bg-white/10" : "bg-[#00BCD4]/10"} flex items-center justify-center`}>
                  <Phone className={`w-5 h-5 ${variant === "gradient" ? "text-white" : "text-[#00BCD4]"}`} />
                </div>
                <div>
                  <p className={`text-sm ${variant === "gradient" ? "text-white/60" : "text-gray-500"}`}>Central de Vendas</p>
                  <p className={`font-semibold ${textClass}`}>4002-8822</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 ${subTextClass}`}>
                <div className={`w-10 h-10 rounded-full ${variant === "gradient" ? "bg-white/10" : "bg-[#00BCD4]/10"} flex items-center justify-center`}>
                  <Mail className={`w-5 h-5 ${variant === "gradient" ? "text-white" : "text-[#00BCD4]"}`} />
                </div>
                <div>
                  <p className={`text-sm ${variant === "gradient" ? "text-white/60" : "text-gray-500"}`}>Email</p>
                  <p className={`font-semibold ${textClass}`}>vendas@focotec.com.br</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">
                    Solicitação Enviada!
                  </h3>
                  <p className="text-gray-600">
                    Nossa equipe entrará em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <Label htmlFor="nome" className="text-[#1E3A5F]">
                      Nome Completo
                    </Label>
                    <Input
                      id="nome"
                      {...register("nome")}
                      placeholder="Seu nome"
                      className="mt-1.5"
                    />
                    {errors.nome && (
                      <p className="text-sm text-red-500 mt-1">{errors.nome.message}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-[#1E3A5F]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="seu@email.com"
                        className="mt-1.5"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telefone" className="text-[#1E3A5F]">
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        {...register("telefone")}
                        placeholder="(11) 99999-9999"
                        className="mt-1.5"
                      />
                      {errors.telefone && (
                        <p className="text-sm text-red-500 mt-1">{errors.telefone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hotel" className="text-[#1E3A5F]">
                      Nome do Hotel
                    </Label>
                    <Input
                      id="hotel"
                      {...register("hotel")}
                      placeholder="Nome do seu hotel"
                      className="mt-1.5"
                    />
                    {errors.hotel && (
                      <p className="text-sm text-red-500 mt-1">{errors.hotel.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#1E3A5F] to-[#00BCD4] text-white hover:opacity-90 h-12 rounded-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {buttonText}
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Ao enviar, você concorda com nossa{" "}
                    <a href="#" className="text-[#00BCD4] hover:underline">
                      Política de Privacidade
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { LeadCaptureCTA };
