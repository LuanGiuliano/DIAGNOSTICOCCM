import { ClipboardList } from 'lucide-react';
import { DonutChart, ScaleBar, FreeTextList, ModuleHeader } from '../components/ChartComponents';
import survey from '../data/survey_data.json';
import { DESC } from '../data/descriptions';

export function PageGestao() {
  return (
    <div className="page-content">
      <ModuleHeader
        number="6"
        title="Gestão de Rotina e Planejamento"
        description="Avaliação de como as atividades são planejadas e executadas na carteira."
        color="#0891b2"
        icon={ClipboardList}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 20 }}>
        <ScaleBar 
          title="Avaliação da Execução de Tarefas" 
          description={DESC.execucao}
          data={survey.gestao_rotina.avaliacao_execucao_tarefas} 
        />
        <DonutChart
          title="Planejamento Semanal/Mensal das Atividades?"
          description={DESC.planejamento}
          data={survey.gestao_rotina.planejamento_semanal}
          colors={['#10b981', '#ef4444', '#f59e0b']}
        />
        <DonutChart
          title="Gerenciamento de Processos Passivos no PAE"
          description={DESC.pae}
          data={survey.gestao_rotina.pae_passivos}
          colors={['#10b981', '#ef4444', '#f59e0b']}
        />
      </div>
      
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Como as Tarefas São Distribuídas nas Carteiras
        </div>
        <FreeTextList items={survey.distribuicao_tarefas} color="#0891b2" />
      </div>
    </div>
  );
}
