import { AlertaPanel } from '../components/AlertaPanel';
import { indicadoresAlerta } from '../data/mockData';
import { AlertOctagon, AlertTriangle, Info } from 'lucide-react';

export function PageAlertas() {
  const criticos = indicadoresAlerta.filter((a) => a.tipo === 'critico');
  const atencao = indicadoresAlerta.filter((a) => a.tipo === 'atencao');
  const info = indicadoresAlerta.filter((a) => a.tipo === 'info');

  return (
    <div className="page-content">
      <div className="section-header">
        <div>
          <div className="section-title">
            <span className="section-title-dot" style={{ background: '#ef4444' }} />
            Central de Alertas
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Indicadores críticos e situações que requerem atenção
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 11, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
            {criticos.length} críticos
          </span>
          <span style={{ fontSize: 11, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
            {atencao.length} atenção
          </span>
          <span style={{ fontSize: 11, background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
            {info.length} info
          </span>
        </div>
      </div>

      <div className="charts-grid">
        {/* CRÍTICOS */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: 12 }}>
            <div className="card-title" style={{ color: '#ef4444' }}>
              <AlertOctagon size={15} color="#ef4444" />
              Críticos
            </div>
          </div>
          <div className="card-body">
            <AlertaPanel alertas={criticos} />
          </div>
        </div>

        {/* ATENÇÃO */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: 12 }}>
            <div className="card-title" style={{ color: '#f59e0b' }}>
              <AlertTriangle size={15} color="#f59e0b" />
              Atenção
            </div>
          </div>
          <div className="card-body">
            <AlertaPanel alertas={atencao} />
          </div>
        </div>
      </div>

      {/* INFORMATIVO */}
      <div className="card">
        <div className="card-header" style={{ marginBottom: 12 }}>
          <div className="card-title" style={{ color: '#06b6d4' }}>
            <Info size={15} color="#06b6d4" />
            Informativos
          </div>
        </div>
        <div className="card-body">
          <AlertaPanel alertas={info} />
        </div>
      </div>

      {/* Caixa de instrução */}
      <div style={{
        padding: '16px 20px',
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 'var(--radius-lg)',
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--text-accent)' }}>💡 Sobre os indicadores:</strong>{' '}
        Os alertas são gerados automaticamente com base nos dados inseridos. Critérios de alerta podem ser
        configurados futuramente (ex: % de atraso, volume acima da meta, prazo em risco). Dados reais
        da CCM substituirão os valores simulados quando disponíveis.
      </div>
    </div>
  );
}
