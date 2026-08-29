import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/api/query-client';
import { MainLayout } from './features/ui/components/main-layout';
import { ScrollToTop } from './features/ui/components/scroll-to-top';
import { Spinner } from './components/ui/spinner';
import { CookieConsentProvider, CookieConsentWidget } from './features/cookie-consent';

// ── Code-splitting por rota ──────────────────────────────────────────────────
// Antes, todas as 12 páginas eram importadas de forma direta aqui, então
// QUALQUER entrada no site baixava o JS do site inteiro num bundle único
// (~1.4MB). `lazy()` faz cada página virar seu próprio chunk, baixado só
// quando a rota é visitada — a Home não paga mais pelo peso de
// site-hoteleiro, otheo-ai, etc. `MainLayout` (header/footer) fica de fora
// disso de propósito: ele é comum a toda rota, então continua no bundle
// principal (senão toda navegação teria que rebaixá-lo).
const HomePage = lazy(() => import('./features/home/home-page').then((m) => ({ default: m.HomePage })));
const SiteHoteleiroPage = lazy(() => import('./features/site-hoteleiro/site-hoteleiro-page').then((m) => ({ default: m.SiteHoteleiroPage })));
const MotorReservasPage = lazy(() => import('./features/motor-reservas/motor-reservas-page').then((m) => ({ default: m.MotorReservasPage })));
const ChannelManagerPage = lazy(() => import('./features/channel-manager/channel-manager-page').then((m) => ({ default: m.ChannelManagerPage })));
const GestaoHoteleiraPage = lazy(() => import('./features/gestao-hoteleira/gestao-hoteleira-page').then((m) => ({ default: m.GestaoHoteleiraPage })));
const ExperienciaHospedePage = lazy(() => import('./features/experiencia-hospede/experiencia-hospede-page').then((m) => ({ default: m.ExperienciaHospedePage })));
const SoftwarePagamentosPage = lazy(() => import('./features/software-pagamentos/software-pagamentos-page').then((m) => ({ default: m.SoftwarePagamentosPage })));
const IntegracoesHoteleirasPage = lazy(() => import('./features/integracoes-hoteleiras/integracoes-hoteleiras-page').then((m) => ({ default: m.IntegracoesHoteleirasPage })));
const CrmHoteleiroPage = lazy(() => import('./features/crm-hoteleiro/crm-hoteleiro-page').then((m) => ({ default: m.CrmHoteleiroPage })));
const OtheoAiPage = lazy(() => import('./features/otheo-ai/otheo-ai-page').then((m) => ({ default: m.OtheoAiPage })));
const SobrePage = lazy(() => import('./features/sobre/sobre-page').then((m) => ({ default: m.SobrePage })));
const MarketingParaHoteisPage = lazy(() => import('./features/marketing-para-hoteis/marketing-para-hoteis-page').then((m) => ({ default: m.MarketingParaHoteisPage })));
const PoliticaDePrivacidadePage = lazy(() => import('./features/politica-de-privacidade/politica-de-privacidade-page').then((m) => ({ default: m.PoliticaDePrivacidadePage })));
// Cada uma aponta pro PRÓPRIO arquivo, não pro barrel `./features/blog` —
// importar todas do mesmo barrel faz o Rollup fundir as 6 páginas (+ os
// posts MDX) num único chunk, já que teriam o mesmo module specifier;
// apontando direto pro arquivo de cada uma, cada rota do blog mantém seu
// próprio chunk, igual toda outra rota do site.
const BlogHomePage = lazy(() => import('./features/blog/blog-home-page').then((m) => ({ default: m.BlogHomePage })));
const BlogPostPage = lazy(() => import('./features/blog/blog-post-page').then((m) => ({ default: m.BlogPostPage })));
const BlogCategoryPage = lazy(() => import('./features/blog/blog-category-page').then((m) => ({ default: m.BlogCategoryPage })));
const BlogTagPage = lazy(() => import('./features/blog/blog-tag-page').then((m) => ({ default: m.BlogTagPage })));
const BlogAuthorPage = lazy(() => import('./features/blog/blog-author-page').then((m) => ({ default: m.BlogAuthorPage })));
const BlogSearchPage = lazy(() => import('./features/blog/blog-search-page').then((m) => ({ default: m.BlogSearchPage })));
const NotFoundPage = lazy(() => import('./features/ui/not-found-page').then((m) => ({ default: m.NotFoundPage })));

// Fallback simples enquanto o chunk da rota carrega — mesmo spinner já
// usado no loading state das páginas (ver home-page.tsx), só que aqui cobre
// o tempo de rede do próprio chunk, não de dados.
function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className="w-12 h-12" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <CookieConsentProvider>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/sites-para-hoteis-e-pousadas" element={<SiteHoteleiroPage />} />
                <Route path="/motor-de-reservas" element={<MotorReservasPage />} />
                <Route path="/gestor-de-canais-channel-manager" element={<ChannelManagerPage />} />
                <Route path="/sistema-de-gestao-hoteleira-pms" element={<GestaoHoteleiraPage />} />
                <Route path="/aplicativo-de-hospedagem" element={<ExperienciaHospedePage />} />
                <Route path="/software-de-pagamentos" element={<SoftwarePagamentosPage />} />
                <Route path="/integracoes-hoteleiras" element={<IntegracoesHoteleirasPage />} />
                <Route path="/crm-hoteleiro" element={<CrmHoteleiroPage />} />
                <Route path="/inteligencia-artificial-para-hoteis-e-pousadas" element={<OtheoAiPage />} />
                <Route path="/sobre" element={<SobrePage />} />
                <Route path="/marketing-para-hoteis" element={<MarketingParaHoteisPage />} />
                <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidadePage />} />
                {/* Rotas mais específicas ANTES do catch-all de 1 segmento
                    (/blog/:slug) — senão "/blog/categoria" seria lido como
                    se "categoria" fosse o slug de um post. */}
                <Route path="/blog" element={<BlogHomePage />} />
                <Route path="/blog/busca" element={<BlogSearchPage />} />
                <Route path="/blog/categoria/:slug" element={<BlogCategoryPage />} />
                <Route path="/blog/tag/:slug" element={<BlogTagPage />} />
                <Route path="/blog/autor/:slug" element={<BlogAuthorPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
          <CookieConsentWidget />
        </CookieConsentProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
