"use client";

import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { useCookieConsent } from "@/features/cookie-consent";

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
      { label: "Integrações Hoteleiras", href: "/integracoes-hoteleiras" },
      { label: "Otheo AI", href: "/otheo-ai" },
      //{ label: "CRM Hoteleiro", href: "/crm-hoteleiro" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", href: "/sobre" },
      { label: "Blog", href: "https://blog.focomultimidia.com" },
      { label: "Parceiros", href: "https://promocoes.focomultimidia.com/foco-partner-program" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Widgets", href: "https://widgets.motor-reservas.com.br/" },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: "https://br.linkedin.com/company/focotecnologiaemarketing", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/focomultimidia/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/focotecnologiaemarketing/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCufhGIuMoV3ASJxaOR4Ci_Q", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/FocoMultimidia_", label: "Twitter" },

];

function Footer() {
  const { openPanel } = useCookieConsent();

  return (
    <footer className="bg-[#1E3A5F] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex mb-6">
              <img
                src="/assets/imgs/logo/logo-foco.svg"
                alt="Foco Tecnologia e Marketing"
                width={147}
                height={55}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/80 text-sm mb-6 max-w-sm">
              Líder em software para hotelaria no Brasil. Transformando a gestão hoteleira
              com tecnologia inovadora desde 2006.
            </p>
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
                      className="text-sm text-white/70 hover:text-[#fccc30] transition-colors"
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
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#fccc30] hover:text-[#1E3A5F] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-white/60">
              <Link to="/politica-de-privacidade" className="hover:text-[#fccc30] transition-colors">
                Privacidade
              </Link>
              <button
                type="button"
                onClick={() => openPanel("detalhado")}
                className="hover:text-[#fccc30] transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
