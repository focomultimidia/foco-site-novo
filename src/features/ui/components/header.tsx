"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe, Calendar, LayoutGrid, Monitor, CreditCard, Users, Smartphone, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
}

const softwaresSubmenu = [
  { label: "Site Hoteleiro", href: "/site-hoteleiro", icon: Globe },
  { label: "Motor de Reservas", href: "/motor-de-reservas", icon: Calendar },
  { label: "Channel Manager", href: "/channel-manager", icon: LayoutGrid },
  { label: "Gestão Hoteleira (PMS)", href: "/gestao-hoteleira", icon: Monitor },
  { label: "Experiência do Hóspede", href: "/experiencia-do-hospede", icon: Smartphone },
  { label: "Software de Pagamentos", href: "/software-de-pagamentos", icon: CreditCard },
  { label: "CRM Hoteleiro", href: "/crm-hoteleiro", icon: Users },
  { label: "Integrações Hoteleiras", href: "/integracoes-hoteleiras", icon: Link2 },
];

const navItems: NavItem[] = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Softwares hoteleiro", href: "/softwares", children: softwaresSubmenu },
  { label: "Marketing", href: "/marketing" },
  { label: "Blog", href: "/blog" },
  { label: "Seja um parceiro", href: "/parceiro" },
];

function isActiveRoute(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath.startsWith(href);
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSoftwaresOpen, setIsSoftwaresOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo-foco.png"
              alt="Foco Tecnologia e Marketing"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsSoftwaresOpen(true)}
                    onMouseLeave={() => setIsSoftwaresOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActiveRoute(location.pathname, item.href)
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSoftwaresOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isSoftwaresOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                        >
                          {item.children.map((child) => {
                            const Icon = child.icon;
                            return (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <Icon className="w-4 h-4 text-blue-500" />
                                {child.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveRoute(location.pathname, item.href)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6"
            >
              Fale com um consultor
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setIsSoftwaresOpen(!isSoftwaresOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                            isActiveRoute(location.pathname, item.href)
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${isSoftwaresOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isSoftwaresOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-1">
                                {item.children.map((child) => {
                                  const Icon = child.icon;
                                  return (
                                    <Link
                                      key={child.label}
                                      to={child.href}
                                      className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <Icon className="w-4 h-4 text-blue-500" />
                                      {child.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                          isActiveRoute(location.pathname, item.href)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full"
                >
                  Fale com um consultor
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { Header };
