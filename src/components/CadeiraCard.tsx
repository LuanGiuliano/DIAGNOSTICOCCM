import { type DadosCadeira } from '../data/mockData';

interface CadeiraCardProps {
  cadeira: DadosCadeira;
  onClick?: () => void;
}

export function CadeiraCard({ cadeira, onClick }: CadeiraCardProps) {
  const pct = Math.round((cadeira.concluidos / cadeira.total) * 100);
  const metaPct = Math.round((cadeira.total / cadeira.meta) * 100);

  return (
    <div
      className="cadeira-card"
      style={{ '--cadeira-cor': cadeira.cor } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="cadeira-header">
        <div className="cadeira-sigla">{cadeira.sigla}</div>
        {cadeira.atrasados > 0 && (
          <span
            style={{
              fontSize: 10,
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              padding: '2px 7px',
              borderRadius: 20,
              fontWeight: 700,
            }}
          >
            {cadeira.atrasados} atrasado{cadeira.atrasados > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="cadeira-nome">{cadeira.nome}</div>
      <div className="cadeira-total">{cadeira.total}</div>
      <div className="cadeira-total-label">processos no período</div>

      <div className="cadeira-stats">
        <div className="cadeira-stat-item">
          <span className="cadeira-stat-dot" style={{ background: '#f59e0b' }} />
          <span>{cadeira.pendentes} pendentes</span>
        </div>
        <div className="cadeira-stat-item">
          <span className="cadeira-stat-dot" style={{ background: cadeira.cor }} />
          <span>{cadeira.emAndamento} em andamento</span>
        </div>
        <div className="cadeira-stat-item">
          <span className="cadeira-stat-dot" style={{ background: '#10b981' }} />
          <span>{cadeira.concluidos} concluídos</span>
        </div>
        <div className="cadeira-stat-item">
          <span className="cadeira-stat-dot" style={{ background: '#ef4444' }} />
          <span>{cadeira.atrasados} atrasados</span>
        </div>
      </div>

      {/* Progress bar — % de conclusão */}
      <div className="cadeira-progress">
        <div className="cadeira-progress-bar" style={{ width: `${pct}%` }} />
      </div>
      <div className="cadeira-progress-label">
        <span>Conclusão: {pct}%</span>
        <span>Meta: {cadeira.meta} ({metaPct}%)</span>
      </div>
    </div>
  );
}
