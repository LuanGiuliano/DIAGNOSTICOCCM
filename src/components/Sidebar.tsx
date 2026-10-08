import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Brain,
  ClipboardList,
  TrendingUp,
  Sparkles,
  Settings,
  Network,
} from 'lucide-react';
import { useClock } from '../hooks/useClock';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const diagnosticoItems = [
  { id: 'visao-geral', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'mod1-identificacao', label: 'M1 · Identificação', icon: Users },
  { id: 'mod2-formacao', label: 'M2 · Formação Acadêmica', icon: GraduationCap },
  { id: 'mod3-experiencia', label: 'M3 · Experiência Prof.', icon: Briefcase },
  { id: 'mod4-clima', label: 'M4 · Clima Organizacional', icon: MessageSquare },
  { id: 'mod5-competencias', label: 'M5 · Competências', icon: Brain },
  { id: 'mod6-gestao', label: 'M6 · Gestão de Rotina', icon: ClipboardList },
  { id: 'mod7-swot', label: 'M7 · Matriz SWOT', icon: TrendingUp },
  { id: 'mod8-ia', label: 'Visão de IA', icon: Sparkles },
];

const systemItems = [
  { id: 'conexoes', label: 'Conexões (Fluxos)', icon: Network },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const { timeStr, dateStr } = useClock();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/bussola.png" alt="Bússola" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        <div>
          <div className="sidebar-logo-title">Cartografia de Saberes</div>
          <div className="sidebar-logo-subtitle">Diagnóstico CCM</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Diagnóstico CCM</div>

        {diagnosticoItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={15} strokeWidth={2.5} />
              {item.label}
            </button>
          );
        })}

        <div className="sidebar-section-label" style={{ marginTop: 16 }}>Sistema</div>
        {systemItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={15} strokeWidth={2.5} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Clock */}
      <div className="sidebar-footer">
        <div className="sidebar-clock">{timeStr}</div>
        <div className="sidebar-date">{dateStr}</div>
      </div>
    </aside>
  );
}
