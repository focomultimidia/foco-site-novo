export { SectionEyebrow } from "./section-eyebrow";
export { SoftwareProductsCarousel } from "./software-products-carousel";
export { ProductShowcase } from "./product-showcase";
export type { ProductShowcaseProps, ProdutoData } from "./product-showcase";
export { ProdutosAccordionSection } from "./produtos-accordion-section";
export type { ProdutosAccordionSectionProps } from "./produtos-accordion-section";
export { GenericInfoSection } from "./generic-info-section";
export type { GenericInfoSectionProps } from "./generic-info-section";
export { WebsitePortfolioCarousel } from "./website-portfolio-carousel";
// Usadas em toda página de produto — reexportam a versão lazy (mesmo
// padrão de wall-of-love-section-lazy.tsx logo abaixo: chunk só baixa
// quando o usuário está prestes a rolar até a seção), não a implementação
// direta.
export { TrustedLogosMarquee } from "./trusted-logos-marquee-lazy";
export { SmartIntegrationsTabs } from "./smart-integrations-tabs-lazy";
export { HomeStyleHero } from "./home-style-hero";
export type { HomeStyleHeroProps, HomeStyleHeroBadge, HomeStyleHeroImage } from "./home-style-hero";
export { GradientHero } from "./gradient-hero";
export type { GradientHeroProps, GradientHeroSlide, GradientHeroBadge } from "./gradient-hero";
export { CertificacoesSection } from "./certificacoes-section-lazy";
export type { CertificacoesSectionProps } from "./certificacoes-section-lazy";
export { WallOfLoveSection } from "./wall-of-love-section-lazy";
export type { WallOfLoveSectionProps } from "./wall-of-love-section-lazy";
export { DorParallaxSection } from "./dor-parallax-section";
export { UltimasDoBlogSection } from "./ultimas-do-blog-section-lazy";
export type { UltimasDoBlogSectionProps } from "./ultimas-do-blog-section-lazy";
export { BetaBadge } from "./beta-badge";
export { SpatialPhoneCarousel } from "./spatial-phone-carousel";
export type { SpatialPhoneItem } from "./spatial-phone-carousel";
