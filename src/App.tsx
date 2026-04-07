import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './features/home/home-page';
import { SiteHoteleiroPage } from './features/site-hoteleiro/site-hoteleiro-page';
import { MotorReservasPage } from './features/motor-reservas/motor-reservas-page';
import { ChannelManagerPage } from './features/channel-manager/channel-manager-page';
import { GestaoHoteleiraPage } from './features/gestao-hoteleira/gestao-hoteleira-page';
import { ExperienciaHospedePage } from './features/experiencia-hospede/experiencia-hospede-page';
import { SoftwarePagamentosPage } from './features/software-pagamentos/software-pagamentos-page';
import { IntegracoesHoteleirasPage } from './features/integracoes-hoteleiras/integracoes-hoteleiras-page';
import { CrmHoteleiroPage } from './features/crm-hoteleiro/crm-hoteleiro-page';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/api/query-client';
import { MainLayout } from './features/ui/components/main-layout';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
