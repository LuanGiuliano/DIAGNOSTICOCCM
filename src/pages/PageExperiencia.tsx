import { Briefcase } from 'lucide-react';
import { DonutChart, COLORS_YN, ModuleHeader } from '../components/ChartComponents';
import survey from '../data/survey_data.json';
import { DESC } from '../data/descriptions';

export function PageExperiencia() {
  return (
    <div className="page-content">
      <ModuleHeader
        number="3"
        title="Experiência Profissional"
        description="Alinhamento entre atividades e qualificação dos servidores."
        color="#10b981"
        icon={Briefcase}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <DonutChart
          title="Atividades Correspondem à Qualificação?"
          description={DESC.qualificacao}
          data={survey.atividades_correspondem_qualif}
          colors={COLORS_YN}
        />
        <DonutChart
          title="Já Atuou em Outras Áreas da SEDUC?"
          description={DESC.outrasAreas}
          data={survey.atuou_outras_areas}
          colors={['#10b981', '#ef4444']}
        />
      </div>
    </div>
  );
}
