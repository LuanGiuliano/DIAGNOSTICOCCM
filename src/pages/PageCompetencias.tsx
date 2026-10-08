import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Brain } from 'lucide-react';
import { ModuleHeader, ChartDescription } from '../components/ChartComponents';
import dados from '../data/cartografia_processada.json';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="custom-tooltip-label">{label}</div>
        {payload.map((entry: any) => (
          <div key={entry.name} className="custom-tooltip-item">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, display: 'inline-block' }} />
            {entry.name}: <strong style={{ color: 'var(--text-primary)' }}>{entry.value}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Radar Data para Média Geral
const radarDataGeral = Object.entries(dados.mediasCompetenciasGeral).map(([subject, A]) => ({
  subject,
  A,
  fullMark: 5,
}));

// Separar em duas categorias (Técnicas vs Comportamentais/Gestão)
const tecnicas = ['Informática', 'Planilhas', 'Google', 'Sistemas SEDUC', 'PAE 4.0', 'Inteligência Artif.'];
const radarTecnicas = radarDataGeral.filter(d => tecnicas.includes(d.subject));
const radarGestao = radarDataGeral.filter(d => !tecnicas.includes(d.subject));

// Bar chart data comparativo (Média de Sistemas vs Legislação, etc por carteira)
const compPorCarteira = dados.competenciasPorCarteira.map(c => ({
  carteira: c.carteira,
  'Sistemas SEDUC': c['Sistemas SEDUC'] || 0,
  'Legislação': c['Legislação'] || 0,
  'PAE 4.0': c['PAE 4.0'] || 0,
  'Planilhas': c['Planilhas'] || 0,
}));

export function PageCompetencias() {
  return (
    <div className="page-content">
      <ModuleHeader
        number="5"
        title="Competências Digitais e Técnicas"
        description="Autoavaliação das lideranças em relação às habilidades essenciais para a rotina da CCM. Escala de 1 a 5."
        color="#0891b2"
        icon={Brain}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 16 }}>
        
        {/* Radar Técnicas */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span className="section-dot" style={{ background: '#4f46e5' }} />
              Competências Digitais e Sistemas (Média Geral)
            </div>
          </div>
          <div className="card-body">
            <ChartDescription
              description="Radar com a média de autoavaliação (1 a 5) nas competências digitais e de sistemas. Quanto mais próximo da borda, maior o domínio."
              insight={`Maior média: ${[...radarTecnicas].sort((a, b) => b.A - a.A)[0]?.subject} (${[...radarTecnicas].sort((a, b) => b.A - a.A)[0]?.A.toFixed(1)}). Menor média: ${[...radarTecnicas].sort((a, b) => a.A - b.A)[0]?.subject} (${[...radarTecnicas].sort((a, b) => a.A - b.A)[0]?.A.toFixed(1)}).`}
            />
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarTecnicas}>
                <PolarGrid stroke="rgba(15,23,42,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar name="Média" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Gestão */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span className="section-dot" style={{ background: '#10b981' }} />
              Competências de Gestão e Administrativas (Média Geral)
            </div>
          </div>
          <div className="card-body">
            <ChartDescription
              description="Radar com a média de autoavaliação (1 a 5) nas competências de gestão e administrativas, como redação, legislação e análise de dados."
              insight={`Maior média: ${[...radarGestao].sort((a, b) => b.A - a.A)[0]?.subject} (${[...radarGestao].sort((a, b) => b.A - a.A)[0]?.A.toFixed(1)}). Menor média: ${[...radarGestao].sort((a, b) => a.A - b.A)[0]?.subject} (${[...radarGestao].sort((a, b) => a.A - b.A)[0]?.A.toFixed(1)}).`}
            />
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarGestao}>
                <PolarGrid stroke="rgba(15,23,42,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar name="Média" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Comparativo de Competências Críticas por Carteira */}
      <div className="card">
         <div className="card-header">
            <div className="card-title">
              <span className="section-dot" style={{ background: '#f59e0b' }} />
              Comparativo de Competências Críticas por Carteira
            </div>
          </div>
          <div className="card-body">
            <ChartDescription
              description="Compara por carteira a média nas quatro competências consideradas críticas: Sistemas SEDUC, PAE 4.0, Legislação e Planilhas. Barras baixas indicam necessidade de capacitação."
              insight={`${compPorCarteira.length} carteiras comparadas.`}
            />
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={compPorCarteira} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.04)" vertical={false} />
                <XAxis dataKey="carteira" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} angle={-45} textAnchor="end" />
                <YAxis domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Sistemas SEDUC" fill="#4f46e5" radius={[2, 2, 0, 0]} />
                <Bar dataKey="PAE 4.0" fill="#0891b2" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Legislação" fill="#ef4444" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Planilhas" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
}
