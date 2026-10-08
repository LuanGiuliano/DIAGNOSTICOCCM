import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { cadeiras, eficienciaCadeiras } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 12,
        color: 'var(--text-primary)',
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color, fontSize: 11 }}>
            {p.name}: <strong>{p.value}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Dados para radar de eficiência
const radarData = cadeiras.map((c) => ({
  cadeira: c.sigla,
  Conclusão: Math.round((c.concluidos / c.total) * 100),
  Volume: Math.round((c.total / 88) * 100), // normalizado pelo máximo (PROTOCOLO)
  Risco: c.atrasados > 2 ? 80 : c.atrasados > 0 ? 40 : 10,
}));

// Dados de meta vs realizado
const metaData = cadeiras.map((c) => ({
  nome: c.sigla,
  Realizado: c.total,
  Meta: c.meta,
  cor: c.cor,
}));

export function PageAnalise() {
  return (
    <div className="page-content">
      <div className="section-header">
        <div>
          <div className="section-title">
            <span className="section-title-dot" style={{ background: '#06b6d4' }} />
            Análise Comparativa
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Indicadores de desempenho e comparativo entre cadeiras
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Meta vs Realizado */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
              Meta vs. Realizado
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metaData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.04)" />
                <XAxis dataKey="nome" tick={{ fill: '#5a618a', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5a618a', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Meta" fill="rgba(99,102,241,0.2)" radius={[4, 4, 0, 0]} name="Meta" />
                <Bar dataKey="Realizado" fill="#6366f1" radius={[4, 4, 0, 0]} name="Realizado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar de perfil */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />
              Perfil por Cadeira (Radar)
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(15,23,42,0.06)" />
                <PolarAngleAxis dataKey="cadeira" tick={{ fill: '#5a618a', fontSize: 10 }} />
                <PolarRadiusAxis tick={{ fill: '#5a618a', fontSize: 9 }} domain={[0, 100]} />
                <Radar name="Conclusão %" dataKey="Conclusão" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Radar name="Volume" dataKey="Volume" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                <Radar name="Risco" dataKey="Risco" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                <Tooltip
                  content={<CustomTooltip />}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabela de eficiência */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            Ranking de Eficiência (% de Conclusão)
          </div>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[...eficienciaCadeiras]
              .sort((a, b) => b.eficiencia - a.eficiencia)
              .map((item, idx) => (
                <div key={item.nome} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: idx < 3 ? 'rgba(99,102,241,0.2)' : 'rgba(15,23,42,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: idx < 3 ? '#818cf8' : 'var(--text-muted)',
                    flexShrink: 0,
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', width: 160, flexShrink: 0 }}>
                    {item.nomeCompleto}
                  </span>
                  <div style={{ flex: 1, height: 8, background: 'rgba(15,23,42,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${item.eficiencia}%`,
                      background: item.cor,
                      borderRadius: 4,
                      transition: 'width 0.8s ease',
                    }} />
                  </div>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: item.cor,
                    width: 40,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}>
                    {item.eficiencia}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
