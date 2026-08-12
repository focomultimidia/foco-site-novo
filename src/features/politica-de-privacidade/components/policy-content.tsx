"use client";

import type { ReactNode } from "react";
import { Fingerprint, ShieldCheck, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { tocSections } from "../data/toc-sections";

// ── PolicySection ─────────────────────────────────────────────────────────
// Cabeçalho padrão de cada seção — numeral em mono (mesma linguagem visual
// do TimelineRail em eventos-section.tsx) + título, com `id` de âncora pro
// sumário. `scroll-mt` compensa o header fixo na hora do salto por JS (ver
// HEADER_OFFSET em policy-toc.tsx — os dois valores devem bater).
function PolicySection({
  id,
  numero,
  titulo,
  children,
}: {
  id: string;
  numero: string;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-8 border-b border-slate-100 last:border-b-0">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-sm text-[#fccc30] font-semibold flex-shrink-0">{numero}</span>
        <h2 className="font-display text-2xl sm:text-[28px] font-semibold text-[#1e3a5f] tracking-tight leading-tight">
          {titulo}
        </h2>
      </div>
      <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed pl-0 sm:pl-[calc(theme(fontSize.sm)+0.75rem)]">
        {children}
      </div>
    </section>
  );
}

// Subtítulo interno (ex.: os 5 tipos de dado dentro da seção 2) — run-in
// bold em vez de <h3> separado, pra não competir com a hierarquia do
// sumário (que só indexa as 14 seções numeradas, não os subtópicos).
function SubHeading({ children }: { children: ReactNode }) {
  return <p className="font-semibold text-[#1e3a5f]">{children}</p>;
}

// Card de destaque — usado só nas duas seções sobre dado sensível/segurança
// (biometria facial e segurança da informação), pra essas duas se
// diferenciarem visualmente do restante do texto corrido e chamarem mais
// atenção (pedido implícito em "altamente navegável e intuitiva": destacar
// o que mais importa, não só listar tudo no mesmo peso visual).
function Callout({ icon: Icon, children }: { icon: typeof ShieldCheck; children: ReactNode }) {
  return (
    <div className="flex gap-3.5 bg-[#285992]/[0.04] border border-[#285992]/12 rounded-2xl px-5 py-4">
      <Icon className="w-5 h-5 text-[#285992] flex-shrink-0 mt-0.5" strokeWidth={1.8} />
      <div className="space-y-3 text-slate-600 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

const FINALIDADES = [
  "Cadastro e identificação, inclusive mediante métodos de autenticação (por exemplo, sem se limitar, fotos ou e-mail), para criação e acesso aos nossos serviços",
  "Realização e efetivação de transações",
  "Elaboração de estatística do uso e melhoria de usabilidade das ferramentas",
  "Apoio à tomada de decisão estratégica, com a metrificação dos dados e análise de padrões de utilização",
  "Implementação de campanhas de marketing e relacionamento",
  "Notificação dos usuários a respeito de alterações na plataforma e/ou nos serviços, bem como o cumprimento das obrigações advindas da lei e assumidas no âmbito da contratação dos serviços e/ou do acesso e utilização à plataforma",
  "Medidas julgadas necessárias ou recomendáveis para a constante melhoria das funcionalidades da plataforma e ações realizadas para a oferta dos serviços, bem como para melhor entender as necessidades dos usuários",
  "Reporte de operações, armazenamento de informações, dados, comunicações e outros relacionados ao acesso e utilização da plataforma e contratação dos serviços, bem como o cumprimento de outras obrigações legais e regulatórias impostas à plataforma",
];

const EXCECOES_EXCLUSAO = [
  "Se existir um problema não resolvido relativo ao contrato celebrado, os dados pessoais necessários serão retidos até que o problema seja resolvido",
  "Se houver previsão legal para manutenção dos dados pessoais visando o cumprimento de nossas obrigações jurídicas, fiscais, de auditoria e contabilidade, pelo período exigido pela legislação aplicável",
  "Sempre que necessário para os nossos legítimos interesses comerciais, como a prevenção contra fraudes ou para manter a segurança dos nossos usuários",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fccc30] flex-shrink-0 mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── PolicyContent ─────────────────────────────────────────────────────────
function PolicyContent() {
  const n = (id: string) => tocSections.find((s) => s.id === id)!.numero;

  return (
    <div>
      <PolicySection id="objetivo" numero={n("objetivo")} titulo={tocSections[0].titulo}>
        <p>
          A nossa Política de Privacidade de Dados foi criada para reafirmar nosso compromisso com
          a segurança, privacidade e a transparência no tratamento das suas informações.
        </p>
        <p>
          Nela, você vai encontrar a descrição de como coletamos e tratamos dados quando você
          trafega em nossos websites, utiliza os nossos softwares, instala nossos aplicativos no
          seu celular/tablet, usa nossos produtos e/ou serviços ou entra em contato conosco por
          meio dos canais de comunicação disponíveis.
        </p>
        <p>
          Ao acessar e/ou utilizar o conteúdo deste site, você expressa sua aceitação plena e sem
          reservas aos termos aqui constantes, para todos os fins de direito. Se você não
          concordar com algum dos termos e regras aqui previstos, não deverá acessar e/ou utilizar
          o conteúdo.
        </p>
      </PolicySection>

      <PolicySection id="dados-coletados" numero={n("dados-coletados")} titulo="Quais dados são coletados?">
        <div>
          <SubHeading>Informações fornecidas por você</SubHeading>
          <p>
            Coletamos informações de identificação pessoal – como nome/razão social, CPF/CNPJ,
            RG/CNH, endereço, telefone, endereço de e-mail, cargo e empresa que trabalha, selfie,
            além de informações bancárias como dados de cartão de crédito, banco, número da
            agência e da conta corrente. Eventualmente, a solicitação de algumas informações pode
            ser feita por meio de contato direto com você via e-mail, telefone ou formulários
            específicos.
          </p>
          <p>
            Ao aceitar nossa política, você declara estar ciente e de acordo com o compartilhamento
            e coleta de dados a seu respeito com fontes externas, bureaus de créditos e de dados,
            tais como Serasa, Receita Federal e Google, para complementar o cadastro e detectar
            possíveis fraudes.
          </p>
        </div>

        <div>
          <SubHeading>Informações de navegação no site</SubHeading>
          <p>
            Quando você visita nossos sites é solicitada a habilitação do cookie de seu navegador
            possibilitando um melhor funcionamento do nosso software e de terceiros como o Google
            Analytics. Essa habilitação armazenará informações como: endereço de Protocolo de
            Internet (endereço IP), registro de acesso, geolocalização do endereço IP, tipo do
            navegador utilizado, versão do sistema operacional, modelo e características do
            aparelho móvel, banda de internet, operadora, duração da visita, caminhos de navegação
            ao site, comportamento de pageview e páginas visitadas.
          </p>
          <p>
            A coleta de dados referentes à geolocalização ocorrerá na plataforma caso tal opção
            esteja ativa e você autorizar. A finalidade da coleta de tais informações será
            exclusivamente para evitar fraudes, identificar bugs, melhoria na usabilidade das
            ferramentas, performance e monitoramento de marketing e campanhas.
          </p>
        </div>

        <div>
          <SubHeading>Histórico de contato</SubHeading>
          <p>
            Armazenamos informações a respeito de todos os contatos já realizados com nossos
            usuários, como conteúdos baixados a partir de nossas páginas e interações via e-mail,
            telefone, chats e chamados/solicitações de informações.
          </p>
        </div>

        <div>
          <SubHeading>Dados gerados na utilização de nossos serviços</SubHeading>
          <p>
            Se você utilizar algum dos nossos serviços, serão coletadas outras informações suas e
            das pessoas que visitarem os sites que você cadastrar em nossas plataformas. Nesse
            caso, serão coletados dados de contato como seu nome, e-mail e telefone, dados
            locacionais, como país, cidade e estado do local do seu acesso e informações sobre seu
            browser.
          </p>
        </div>

        <div>
          <SubHeading>Dados do Facebook</SubHeading>
          <p>
            Ao utilizar sua conta do Facebook para se integrar aos nossos serviços, poderemos
            coletar todos os dados que forem disponibilizados pelo Facebook ao nosso sistema, como
            informações sobre seus anúncios, quantos cliques eles receberam, informações sobre os
            visitantes aos seus websites que estejam disponíveis nessa plataforma, entre outras.
          </p>
        </div>
      </PolicySection>

      <PolicySection id="dados-faciais" numero={n("dados-faciais")} titulo="Políticas de dados faciais">
        <Callout icon={Fingerprint}>
          <p>
            Coletamos os seus dados faciais para fins de liberação de acesso ao nosso sistema e
            cadastramento de dispositivos móveis. Poderemos solicitar documento com foto e selfie,
            comparando a sua titularidade ao acessar o nosso aplicativo.
          </p>
          <p>
            Inicialmente coletamos o seu documento com foto para cadastro em nosso sistema. Após
            baixar o app do Foco Safe será necessário a confirmação de identidade por meio de
            match entre a foto do documento e a selfie capturada direto do seu dispositivo móvel.
          </p>
          <p>
            Os seus dados pessoais, inclusive as selfies e documentos, ficarão armazenados em
            nossos bancos de dados enquanto você utilizar o aplicativo ou por 5 anos após deixar
            de ser nosso cliente.
          </p>
          <p>
            Os dados poderão ser compartilhados com empresas especializadas em reconhecimento
            facial, com o objetivo de oferecer a melhor segurança no acesso ao aplicativo Foco
            Safe. Inicialmente será compartilhado com a empresa{" "}
            <a
              href="https://bigdatacorp.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#285992] font-medium underline decoration-[#285992]/30 hover:decoration-[#285992] underline-offset-2"
            >
              BigDataCorp
              <ExternalLink className="w-3 h-3" strokeWidth={2} />
            </a>
            .
          </p>
        </Callout>
      </PolicySection>

      <PolicySection id="criancas-adolescentes" numero={n("criancas-adolescentes")} titulo="Crianças e adolescentes">
        <p>
          Nossos produtos e serviços não são direcionados a menores de 18 anos, portanto não
          coletamos propositalmente informações de crianças e adolescentes.
        </p>
        <p>
          A permissão dos pais ou responsáveis será assegurada antes de intencionalmente coletar,
          usar ou divulgar informações pessoais de menores de idade.
        </p>
      </PolicySection>

      <PolicySection id="finalidades" numero={n("finalidades")} titulo="Finalidades do tratamento">
        <p>
          Nós coletamos dados pessoais para fins de identificação e autenticação; viabilização de
          ofertas de produtos e serviços; operacionalização de novos produtos; proteção ao
          crédito; prevenção e combate de crimes financeiros, problemas técnicos ou de segurança
          nos processos de identificação e autenticação; e até mesmo a melhoria de serviços e da
          sua experiência. Dentre os dados coletados, podemos tratar dados sensíveis, como
          biometria e fotografias (selfies), para fins de prevenção de fraude e garantia de
          segurança dos serviços contratados. Também podemos coletar e tratar dados para cumprir
          com a legislação vigente aplicável.
        </p>
        <p>Abaixo, estão descritas as finalidades da coleta de dados:</p>
        <BulletList items={FINALIDADES} />
        <p>
          Eventualmente, poderemos utilizar dados para finalidades não previstas nesta política de
          privacidade, mas elas estarão dentro das suas legítimas expectativas. O eventual uso dos
          seus dados para finalidades que não cumpram com essa prerrogativa serão feitos mediante
          sua autorização prévia.
        </p>
      </PolicySection>

      <PolicySection id="compartilhamento" numero={n("compartilhamento")} titulo="Compartilhamento de dados">
        <p>
          Ao concordar com esta política, você autoriza expressamente o compartilhamento de
          algumas das suas informações com terceiros – nossos parceiros – a fim de que seja
          possível prestar os serviços contratados.
        </p>
        <p>
          Além disso, certas informações também poderão ser compartilhadas para fins de
          cumprimento de obrigações legais.
        </p>
      </PolicySection>

      <PolicySection id="conservacao" numero={n("conservacao")} titulo="Conservação de dados">
        <p>
          Seus dados pessoais serão conservados e mantidos em nosso banco de dados enquanto for
          necessário para prestar os serviços e para fins comerciais legítimos e essenciais, tais
          como a manutenção do desempenho dos serviços, tomada de decisões empresariais acerca de
          funcionalidades e ofertas com base em dados, cumprimento de obrigações legais e solução
          de disputas.
        </p>
      </PolicySection>

      <PolicySection id="alteracao-exclusao" numero={n("alteracao-exclusao")} titulo="Alteração e exclusão de dados">
        <p>
          Você poderá solicitar a revisão e correção de seus dados sem qualquer ônus e a qualquer
          tempo. Para isso, basta entrar em contato por meio de um dos canais de atendimento
          disponíveis. Ao final de nossa relação comercial, caso deseje excluir seus dados,
          lembre-se que alguns deles ficarão armazenados por período definido em lei, para o fim
          de cumprimento de obrigações legais.
        </p>
        <p>
          Com base em sua solicitação, vamos eliminar ou anonimizar os seus dados pessoais, exceto
          se for legalmente permitido ou obrigatório manter determinados dados pessoais, incluindo
          situações como:
        </p>
        <BulletList items={EXCECOES_EXCLUSAO} />
      </PolicySection>

      <PolicySection id="seguranca" numero={n("seguranca")} titulo="Segurança dos dados">
        <Callout icon={ShieldCheck}>
          <p>
            Não se preocupe, envidaremos todos os esforços para garantir a proteção dos dados
            pessoais dos usuários contra o acesso não autorizado e o uso indevido, utilizando
            tecnologias e políticas e os cuidados praticados pela indústria quando coleta e
            armazena seus dados pessoais, além de criptografia de dados padrão da internet (SSL).
          </p>
          <p>
            Os dados coletados serão armazenados em servidores localizados nos Estados Unidos e no
            Brasil, bem como em ambiente de uso de recursos ou servidores na nuvem (cloud
            computing), o que enseja, neste último caso, transferência ou processamento dos dados
            no exterior.
          </p>
        </Callout>
      </PolicySection>

      <PolicySection id="alteracoes-politica" numero={n("alteracoes-politica")} titulo="Alterações a esta política">
        <p>Podemos fazer alterações a esta política periodicamente.</p>
        <p>
          Se você é nosso cliente, fornecedor e/ou parceiro, quando tais alterações forem
          realizadas, você será notificado e, ainda, poderá consultar a versão atualizada
          disponível em nosso site.
        </p>
      </PolicySection>

      <PolicySection id="lei-aplicavel" numero={n("lei-aplicavel")} titulo="Lei aplicável">
        <p>
          Este documento é regido e deve ser interpretado de acordo com as leis da República
          Federativa do Brasil. Fica eleito o Foro da Comarca de Salvador, Estado da Bahia, como o
          competente para dirimir quaisquer questões porventura oriundas do presente documento,
          com expressa renúncia a qualquer outro, por mais privilegiado que seja.
        </p>
      </PolicySection>

      <PolicySection id="periodicidade" numero={n("periodicidade")} titulo="Periodicidade de revisão">
        <p>A cada 12 meses ou sempre que se fizer necessário.</p>
      </PolicySection>

      <PolicySection id="fale-conosco" numero={n("fale-conosco")} titulo="Fale conosco">
        <p>
          Se você tiver alguma dúvida sobre esta política, entre em contato com nosso
          representante de proteção de dados através do e-mail{" "}
          <a href="mailto:contato@focotec.com.br" className="text-[#285992] font-medium underline decoration-[#285992]/30 hover:decoration-[#285992] underline-offset-2">
            contato@focotec.com.br
          </a>.
        </p>
        <a
          href="mailto:contato@focotec.com.br"
          className="group inline-flex items-center gap-2 bg-[#fccc30] text-[#132840] font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm shadow-lg shadow-[#fccc30]/25 hover:shadow-[#fccc30]/45 hover:-translate-y-0.5 mt-1"
        >
          <Mail className="w-4 h-4" strokeWidth={2} />
          Falar com o time de privacidade
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </PolicySection>

      <PolicySection id="referencias" numero={n("referencias")} titulo="Referências">
        <p className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fccc30] flex-shrink-0 mt-2" />
          <span>
            <a
              href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#285992] font-medium underline decoration-[#285992]/30 hover:decoration-[#285992] underline-offset-2"
            >
              Lei nº 13.709/2018
              <ExternalLink className="w-3 h-3" strokeWidth={2} />
            </a>{" "}
            – Lei Geral de Proteção de Dados (LGPD)
          </span>
        </p>
      </PolicySection>
    </div>
  );
}

export { PolicyContent };
