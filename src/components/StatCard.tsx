import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  color: string;
  iconBg: string;
  delta?: string;
}

export function StatCard({ icon: Icon, value, label, color, iconBg, delta }: StatCardProps) {
  return (
    <div className="stat-card" style={{ '--card-accent': color, '--card-icon-bg': iconBg } as React.CSSProperties}>
      <div className="stat-card-icon">
        <Icon size={18} color={color} />
      </div>
      <div>
        <div className="stat-card-value">{value.toLocaleString('pt-BR')}</div>
        <div className="stat-card-label">{label}</div>
      </div>
      {delta && (
        <div className="stat-card-delta">
          {delta}
        </div>
      )}
    </div>
  );
}
