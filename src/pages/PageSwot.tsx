import { ShieldCheck, ShieldAlert, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { ModuleHeader } from '../components/ChartComponents';
import dados from '../data/cartografia_processada.json';

export function PageSwot() {
  const { swot } = dados;

  return (
    <div className="page-content">
      <ModuleHeader
        number="7"
        title="Matriz SWOT Consolidada"
        description="Análise de Forças, Fraquezas, Oportunidades e Ameaças levantadas pelos pontos focais das carteiras."
        color="#f59e0b"
        icon={TrendingUp}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        
        {/* Forças */}
        <div className="swot-quadrant forcas">
          <div className="swot-quadrant-title">
            <ShieldCheck size={16} />
            Forças (Strengths)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {swot.forcas.length > 0 ? swot.forcas.map((item, idx) => (
              <div key={idx} className="swot-item">
                <span className="swot-item-tag">{item.carteira}</span>
                <span>{item.texto}</span>
              </div>
            )) : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nenhum dado informado.</span>}
          </div>
        </div>

        {/* Fraquezas */}
        <div className="swot-quadrant fraquezas">
          <div className="swot-quadrant-title">
            <ShieldAlert size={16} />
            Fraquezas (Weaknesses)
          </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {swot.fraquezas.length > 0 ? swot.fraquezas.map((item, idx) => (
              <div key={idx} className="swot-item">
                <span className="swot-item-tag">{item.carteira}</span>
                <span>{item.texto}</span>
              </div>
            )) : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nenhum dado informado.</span>}
          </div>
        </div>

        {/* Oportunidades */}
        <div className="swot-quadrant oportunidades">
          <div className="swot-quadrant-title">
            <Zap size={16} />
            Oportunidades (Opportunities)
          </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {swot.oportunidades.length > 0 ? swot.oportunidades.map((item, idx) => (
              <div key={idx} className="swot-item">
                <span className="swot-item-tag">{item.carteira}</span>
                <span>{item.texto}</span>
              </div>
            )) : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nenhum dado informado.</span>}
          </div>
        </div>

        {/* Ameaças */}
        <div className="swot-quadrant ameacas">
          <div className="swot-quadrant-title">
            <AlertTriangle size={16} />
            Ameaças (Threats)
          </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {swot.ameacas.length > 0 ? swot.ameacas.map((item, idx) => (
              <div key={idx} className="swot-item">
                <span className="swot-item-tag">{item.carteira}</span>
                <span>{item.texto}</span>
              </div>
            )) : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Nenhum dado informado.</span>}
          </div>
        </div>

      </div>
    </div>
  );
}
