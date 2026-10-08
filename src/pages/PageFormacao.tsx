import { GraduationCap } from 'lucide-react';
import { DonutChart, COLORS_BRAND, ModuleHeader } from '../components/ChartComponents';
import survey from '../data/survey_data.json';
import { DESC } from '../data/descriptions';

export function PageFormacao() {
  return (
    <div className="page-content">
      <ModuleHeader
        number="2"
        title="Formação Acadêmica"
        description="Escolaridade e áreas de formação da equipe."
        color="#0891b2"
        icon={GraduationCap}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <DonutChart
          title="Escolaridade Máxima"
          description={DESC.escolaridade}
          data={survey.escolaridade}
          colors={['#0891b2', '#4f46e5', '#10b981', '#f59e0b', '#ef4444']}
        />
        <DonutChart
          title="Área de Formação Superior"
          description={DESC.formacao}
          data={survey.formacao_superior}
          colors={COLORS_BRAND}
        />
      </div>
    </div>
  );
}
