import { Users } from 'lucide-react';
import { DonutChart, COLORS_BRAND, COLORS_YN, ModuleHeader } from '../components/ChartComponents';
import survey from '../data/survey_data.json';
import { DESC } from '../data/descriptions';

export function PageIdentificacao() {
  return (
    <div className="page-content">
      <ModuleHeader
        number="1"
        title="Identificação Organizacional"
        description="Perfil funcional e alocação dos servidores nas carteiras."
        color="#4f46e5"
        icon={Users}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <DonutChart
          title="Vínculo Funcional"
          description={DESC.vinculo}
          data={survey.vinculo_funcional}
          colors={['#4f46e5', '#0891b2', '#f59e0b', '#10b981']}
        />
        <DonutChart
          title="Cargo Comissionado / FG"
          description={DESC.cargo}
          data={survey.cargo_comissionado}
          colors={COLORS_YN}
        />
        <DonutChart
          title="Jornada de Trabalho"
          description={DESC.jornada}
          data={survey.jornada}
          colors={['#8b5cf6', '#f59e0b']}
        />
        <DonutChart
          title="Grupo Funcional"
          description={DESC.grupo}
          data={survey.grupo_funcional}
          colors={['#4f46e5', '#10b981']}
        />
      </div>

      <div style={{ marginTop: 24, background: 'rgba(15,23,42,0.03)', borderRadius: 12, padding: 20, border: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Carteira — Ponto Focal por Servidor
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
          {DESC.carteira} Total de carteiras: <strong>{Object.keys(survey.carteira_ponto_focal).length}</strong>.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {Object.entries(survey.carteira_ponto_focal).map(([name, value], i) => (
            <div key={name} style={{
              background: `${COLORS_BRAND[i % COLORS_BRAND.length]}22`,
              border: `1px solid ${COLORS_BRAND[i % COLORS_BRAND.length]}44`,
              borderRadius: 8,
              padding: '8px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: COLORS_BRAND[i % COLORS_BRAND.length],
            }}>
              {name}: {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
