import { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { PageVisaoGeral } from './pages/PageVisaoGeral';
import { PageIdentificacao } from './pages/PageIdentificacao';
import { PageFormacao } from './pages/PageFormacao';
import { PageExperiencia } from './pages/PageExperiencia';
import { PageClima } from './pages/PageClima';
import { PageCompetencias } from './pages/PageCompetencias';
import { PageGestao } from './pages/PageGestao';
import { PageSwot } from './pages/PageSwot';
import { PageIA } from './pages/PageIA';
import { PageConexoes } from './pages/PageConexoes';
import { PagePlaceholder } from './pages/PagePlaceholder';
import { Presentation } from './components/Presentation';

type Page = 
  | 'visao-geral' 
  | 'mod1-identificacao' 
  | 'mod2-formacao' 
  | 'mod3-experiencia' 
  | 'mod4-clima' 
  | 'mod5-competencias' 
  | 'mod6-gestao' 
  | 'mod7-swot' 
  | 'mod8-ia' 
  | 'conexoes' 
  | 'configuracoes';

const pageConfig: Record<Page, { title: string; subtitle: string }> = {
  'visao-geral': { title: 'Visão Geral', subtitle: 'Painel resumo da Cartografia de Saberes da CCM' },
  'mod1-identificacao': { title: 'Identificação Organizacional', subtitle: 'Perfil funcional e alocação dos servidores nas carteiras' },
  'mod2-formacao': { title: 'Formação Acadêmica', subtitle: 'Escolaridade e áreas de formação da equipe' },
  'mod3-experiencia': { title: 'Experiência Profissional', subtitle: 'Alinhamento entre atividades e qualificação dos servidores' },
  'mod4-clima': { title: 'Clima Organizacional e Avaliação', subtitle: 'Percepção sobre comunicação, atribuições e rotina de trabalho' },
  'mod5-competencias': { title: 'Competências Digitais e Técnicas', subtitle: 'Mapeamento de habilidades e necessidades de treinamento' },
  'mod6-gestao': { title: 'Gestão de Rotina e Planejamento', subtitle: 'Avaliação de como as atividades são planejadas e executadas' },
  'mod7-swot': { title: 'Matriz SWOT Consolidada', subtitle: 'Forças, Fraquezas, Oportunidades e Ameaças' },
  'mod8-ia': { title: 'Visão de IA', subtitle: 'Síntese inteligente das sugestões e observações' },
  'conexoes': { title: 'Conexões (Fluxos de Trabalho)', subtitle: 'Dependências e inter-relações entre as carteiras da CCM' },
  'configuracoes': { title: 'Configurações', subtitle: 'Preferências do sistema' },
};

function App() {
  const [activePage, setActivePage] = useState<Page>('visao-geral');
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const exitPresentation = useCallback(() => setIsPresentationMode(false), []);

  const config = pageConfig[activePage] || pageConfig['visao-geral'];
  const { title, subtitle } = config;

  const renderPage = () => {
    switch (activePage) {
      case 'visao-geral': return <PageVisaoGeral />;
      case 'mod1-identificacao': return <PageIdentificacao />;
      case 'mod2-formacao': return <PageFormacao />;
      case 'mod3-experiencia': return <PageExperiencia />;
      case 'mod4-clima': return <PageClima />;
      case 'mod5-competencias': return <PageCompetencias />;
      case 'mod6-gestao': return <PageGestao />;
      case 'mod7-swot': return <PageSwot />;
      case 'mod8-ia': return <PageIA />;
      case 'conexoes': return <PageConexoes />;
      case 'configuracoes': return <PagePlaceholder title="Configurações" description="Ajustes do dashboard de Cartografia." />;
      default: return <PageVisaoGeral />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={(p) => setActivePage(p as Page)} />
      <div className="main-content">
        <Topbar 
          title={title} 
          subtitle={subtitle} 
          isPresentationMode={isPresentationMode} 
          togglePresentationMode={() => setIsPresentationMode(!isPresentationMode)} 
        />
        {renderPage()}
      </div>
      {isPresentationMode && <Presentation onExit={exitPresentation} />}
    </div>
  );
}

export default App;
