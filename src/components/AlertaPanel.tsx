import { AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { type IndicadorAlerta } from '../data/mockData';

interface AlertaPanelProps {
  alertas: IndicadorAlerta[];
}

const tipoConfig = {
  critico: {
    Icon: AlertOctagon,
    className: 'critico',
    label: 'CRÍTICO',
  },
  atencao: {
    Icon: AlertTriangle,
    className: 'atencao',
    label: 'ATENÇÃO',
  },
  info: {
    Icon: Info,
    className: 'info',
    label: 'INFO',
  },
};

export function AlertaPanel({ alertas }: AlertaPanelProps) {
  return (
    <div className="alerts-list">
      {alertas.map((alerta) => {
        const config = tipoConfig[alerta.tipo];
        const { Icon } = config;
        return (
          <div key={alerta.id} className={`alert-item ${config.className}`}>
            <div className="alert-icon">
              <Icon size={16} />
            </div>
            <div className="alert-content">
              <div className="alert-titulo">{alerta.titulo}</div>
              <div className="alert-descricao">{alerta.descricao}</div>
            </div>
            <div className="alert-cadeira">{alerta.cadeira}</div>
          </div>
        );
      })}
      {alertas.length === 0 && (
        <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: 13 }}>
          Nenhum alerta ativo
        </div>
      )}
    </div>
  );
}
