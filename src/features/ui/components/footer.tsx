"use client";

import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
  lgpdConsent: z.boolean().refine((val) => val === true, {
    message: "Você precisa concordar com a política de privacidade",
  }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Soluções",
    links: [
      { label: "Site Hoteleiro", href: "/site-hoteleiro" },
      { label: "Motor de Reservas", href: "/motor-de-reservas" },
      { label: "Channel Manager", href: "/channel-manager" },
      { label: "Gestão Hoteleira (PMS)", href: "/gestao-hoteleira" },
      { label: "Experiência do Hóspede", href: "/experiencia-do-hospede" },
      { label: "Software de Pagamentos", href: "/software-de-pagamentos" },
      { label: "CRM Hoteleiro", href: "/crm-hoteleiro" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Eventos", href: "#" },
      { label: "Parceiros", href: "#" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de Ajuda", href: "#" },
      { label: "Documentação", href: "#" },
      { label: "Treinamentos", href: "#" },
      { label: "Status", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      lgpdConsent: false,
    },
  });

  const lgpdConsent = watch("lgpdConsent");

  const onSubmit = async (_data: NewsletterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Inscrição realizada com sucesso!");
    reset();
  };

  return (
    <footer className="bg-[#1E3A5F] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00BCD4] to-[#4DD0E1] flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <span className="font-bold text-xl block">Foco</span>
                <span className="text-sm text-white/70">Tecnologia e Marketing</span>
              </div>
            </Link>
            <p className="text-white/80 text-sm mb-6 max-w-sm">
              Líder em software para hotelaria no Brasil. Transformando a gestão hoteleira 
              com tecnologia inovadora desde 2008.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+551140028822"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-[#00BCD4] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>4002-8822</span>
              </a>
              <a
                href="mailto:contato@focotec.com.br"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-[#00BCD4] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contato@focotec.com.br</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  Av. Paulista, 1000 - Sala 1501<br />
                  Bela Vista, São Paulo - SP
                </span>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="mt-8">
              <h4 className="font-semibold text-white mb-3">Assine nossa newsletter</h4>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    {...register("email")}
                    placeholder="Seu email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button type="submit" className="bg-[#00BCD4] hover:bg-[#0097A7] text-white shrink-0 rounded-full px-6">
                    Assinar
                  </Button>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-300">{errors.email.message}</p>
                )}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="lgpdConsent"
                    checked={lgpdConsent}
                    onCheckedChange={(checked) => setValue("lgpdConsent", checked as boolean)}
                    className="mt-0.5 border-white/50 data-[state=checked]:bg-[#00BCD4]"
                  />
                  <Label htmlFor="lgpdConsent" className="text-xs text-white/60 cursor-pointer">
                    Concordo em receber comunicações e aceito a{" "}
                    <Link to="#" className="text-[#00BCD4] hover:underline">
                      Política de Privacidade
                    </Link>
                    {" "}(LGPD)
                  </Label>
                </div>
                {errors.lgpdConsent && (
                  <p className="text-sm text-red-300">{errors.lgpdConsent.message}</p>
                )}
              </form>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 hover:text-[#00BCD4] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-white/60 text-center md:text-left">
              © {new Date().getFullYear()} Foco Tecnologia e Marketing. Todos os direitos reservados.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#00BCD4] hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-white/60">
              <Link to="#" className="hover:text-[#00BCD4] transition-colors">
                Privacidade
              </Link>
              <Link to="#" className="hover:text-[#00BCD4] transition-colors">
                Termos
              </Link>
              <Link to="#" className="hover:text-[#00BCD4] transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
