import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/api/query-client';
import { MainLayout } from './features/ui/components/main-layout';
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
const PoliticaDePrivacidadePage = lazy(() => import('./features/politica-de-privacidade/politica-de-privacidade-page').then((m) => ({ default: m.PoliticaDePrivacidadePage })));
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
      <QueryClientProvider client={queryClient}>
        <CookieConsentProvider>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/site-hoteleiro" element={<SiteHoteleiroPage />} />
                <Route path="/motor-de-reservas" element={<MotorReservasPage />} />
                <Route path="/channel-manager" element={<ChannelManagerPage />} />
                <Route path="/gestao-hoteleira" element={<GestaoHoteleiraPage />} />
                <Route path="/experiencia-do-hospede" element={<ExperienciaHospedePage />} />
                <Route path="/software-de-pagamentos" element={<SoftwarePagamentosPage />} />
                <Route path="/integracoes-hoteleiras" element={<IntegracoesHoteleirasPage />} />
                <Route path="/crm-hoteleiro" element={<CrmHoteleiroPage />} />
                <Route path="/otheo-ai" element={<OtheoAiPage />} />
                <Route path="/sobre" element={<SobrePage />} />
                <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidadePage />} />
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
