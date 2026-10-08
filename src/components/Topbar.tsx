import { RefreshCw, Download, Bell, MonitorPlay, Monitor } from 'lucide-react';

interface TopbarProps {
  title: string;
  subtitle: string;
  isPresentationMode?: boolean;
  togglePresentationMode?: () => void;
}

export function Topbar({ title, subtitle, isPresentationMode, togglePresentationMode }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        <div className="topbar-subtitle">{subtitle}</div>
      </div>
      <div className="topbar-actions">
        <div className="topbar-status">
          <span className="status-dot" />
          Sistema Ativo
        </div>
        <button className={`btn ${isPresentationMode ? 'btn-primary' : 'btn-ghost'}`} onClick={togglePresentationMode} title="Modo Apresentação">
          {isPresentationMode ? <Monitor size={14} /> : <MonitorPlay size={14} />}
          Apresentação
        </button>
        <button className="btn btn-ghost" title="Notificações">
          <Bell size={14} />
        </button>
        <button className="btn btn-ghost" title="Atualizar dados">
          <RefreshCw size={14} />
          Atualizar
        </button>
        <button className="btn btn-primary" title="Exportar relatório">
          <Download size={14} />
          Exportar
        </button>
      </div>
    </header>
  );
}
