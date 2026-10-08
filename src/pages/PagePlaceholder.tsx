import { Construction } from 'lucide-react';

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="page-content">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: '60vh',
        gap: 16,
        textAlign: 'center',
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Construction size={32} color="var(--brand-primary)" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 360 }}>{description}</div>
        </div>
        <div style={{
          fontSize: 12,
          padding: '8px 20px',
          borderRadius: 20,
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          color: 'var(--text-accent)',
        }}>
          Em desenvolvimento — disponível em breve
        </div>
      </div>
    </div>
  );
}
