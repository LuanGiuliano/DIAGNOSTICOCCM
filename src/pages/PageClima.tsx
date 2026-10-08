import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MessageSquare, Target, Users } from 'lucide-react';
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

const climaData = dados.climaPorCarteira.map(c => ({
  carteira: c.carteira,
  'Comunicação Interna': c['Comunicação Interna'] || 0,
  'Clareza das Atribuições': c['Clareza das Atribuições'] || 0,
  'Empatia e Cooperação': c['Empatia e Cooperação'] || 0,
}));

export function PageClima() {
  return (
    <div className="page-content">
      <ModuleHeader
        number="4"
        title="Clima Organizacional e Gestão da Rotina"
        description="Percepções sobre o ambiente de trabalho e autoavaliação da execução das tarefas."
        color="#10b981"
        icon={Users}
      />

      {/* ── KPIs de Clima ── */}
      <div className="stats-grid">
        <div className="stat-card" style={{ '--card-accent': '#0891b2' } as React.CSSProperties}>
          <div className="stat-card-icon" style={{ background: 'rgba(8, 145, 178, 0.15)' }}>
            <MessageSquare size={18} color="#0891b2" />
          </div>
          <div>
            <div className="stat-card-value">{dados.mediasClima['Comunicação Interna'].toFixed(1)}</div>
            <div className="stat-card-label">Comunicação Interna</div>
          </div>
        </div>
        <div className="stat-card" style={{ '--card-accent': '#7c3aed' } as React.CSSProperties}>
          <div className="stat-card-icon" style={{ background: 'rgba(124, 58, 237, 0.15)' }}>
            <Target size={18} color="#7c3aed" />
          </div>
          <div>
             <div className="stat-card-value">{dados.mediasClima['Clareza das Atribuições'].toFixed(1)}</div>
             <div className="stat-card-label">Clareza das Atribuições</div>
          </div>
        </div>
        <div className="stat-card" style={{ '--card-accent': '#10b981' } as React.CSSProperties}>
          <div className="stat-card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
            <Users size={18} color="#10b981" />
          </div>
          <div>
            <div className="stat-card-value">{dados.mediasClima['Empatia e Cooperação'].toFixed(1)}</div>
            <div className="stat-card-label">Empatia e Cooperação</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {/* Gráfico de Clima por Carteira */}
        <div className="card">
           <div className="card-header">
            <div className="card-title">
              <span className="section-dot" style={{ background: '#7c3aed' }} />
              Clima Organizacional por Carteira
            </div>
          </div>
          <div className="card-body">
             <ChartDescription
               description="Compara, carteira a carteira, a média (1 a 5) de comunicação interna, clareza das atribuições e empatia/cooperação."
               insight={`Médias gerais: comunicação ${dados.mediasClima['Comunicação Interna'].toFixed(1)}, clareza das atribuições ${dados.mediasClima['Clareza das Atribuições'].toFixed(1)} e empatia/cooperação ${dados.mediasClima['Empatia e Cooperação'].toFixed(1)}.`}
             />
             <ResponsiveContainer width="100%" height={280}>
              <BarChart data={climaData} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.04)" vertical={false} />
                <XAxis dataKey="carteira" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} angle={-45} textAnchor="end" />
                <YAxis domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Comunicação Interna" fill="#0891b2" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Clareza das Atribuições" fill="#7c3aed" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Empatia e Cooperação" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avaliação da Gestão da Rotina (Tabela/Lista) */}
        <div className="card">
           <div className="card-header">
            <div className="card-title">
              <span className="section-dot" style={{ background: '#f59e0b' }} />
              Avaliação e Planejamento
            </div>
          </div>
          <div className="card-body" style={{ overflowY: 'auto', maxHeight: '400px', paddingRight: 5 }}>
            <ChartDescription
              description="Lista a nota de autoavaliação da execução das tarefas (1 a 5) e se a carteira realiza planejamento regular das atividades."
              insight={`${dados.avaliacoesPorCarteira.length} carteiras avaliadas; ${dados.avaliacoesPorCarteira.filter((a: any) => a.planejamento === 'Sim').length} declaram planejar suas atividades.`}
            />
            <table className="carteira-table">
              <thead>
                <tr>
                  <th>Carteira</th>
                  <th>Autoavaliação (1-5)</th>
                  <th>Planejamento</th>
                </tr>
              </thead>
              <tbody>
                {dados.avaliacoesPorCarteira.map((av, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{av.carteira}</td>
                    <td>
                      <div className="nota-meter">
                        <span style={{ fontWeight: 700, marginRight: 4, width: 14 }}>{av.notaExecucao}</span>
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} className="nota-dot" style={{ background: i <= av.notaExecucao ? '#f59e0b' : 'rgba(15,23,42,0.1)' }} />
                        ))}
                      </div>
                    </td>
                    <td>
                       <span className={`badge ${av.planejamento === 'Sim' ? 'badge-verde' : av.planejamento === 'Às vezes' ? 'badge-amarelo' : 'badge-vermelho'}`}>
                          {av.planejamento}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
