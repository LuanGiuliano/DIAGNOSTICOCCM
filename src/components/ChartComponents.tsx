/**
 * Shared chart components and helpers for Cartografia de Saberes dashboard.
 */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from 'recharts';

// ─── Color system ─────────────────────────────────────────────────────────────
export const COLORS_BRAND = [
  '#4f46e5', '#7c3aed', '#0891b2', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6',
];
export const COLORS_YN = ['#10b981', '#ef4444', '#f59e0b'];

/** Scale colors: 1=red → 5=dark green */
export const SCALE_COLORS: Record<string, string> = {
  '1': '#ef4444',
  '2': '#f97316',
  '3': '#eab308',
  '4': '#84cc16',
  '5': '#16a34a',
};

export function scaleAvg(obj: Record<string, number>): number {
  let sum = 0, total = 0;
  for (const [k, v] of Object.entries(obj)) {
    sum += Number(k) * v;
    total += v;
  }
  return total > 0 ? sum / total : 0;
}

export function avgColor(avg: number): string {
  if (avg >= 4.5) return '#16a34a';
  if (avg >= 3.5) return '#84cc16';
  if (avg >= 2.5) return '#eab308';
  if (avg >= 1.5) return '#f97316';
  return '#ef4444';
}

export function toPie(obj: Record<string, number>, colors: string[]) {
  const total = Object.values(obj).reduce((a, b) => a + b, 0);
  return Object.entries(obj).map(([name, value], i) => ({
    name, value, color: colors[i % colors.length], total,
  }));
}

// ─── Descriptions / auto insights ────────────────────────────────────────────
export function insightDonut(obj: Record<string, number>): string {
  const entries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (!total) return 'Sem respostas registradas.';
  const [n1, v1] = entries[0];
  let txt = `Predomina "${n1}" com ${v1} de ${total} respostas (${((v1 / total) * 100).toFixed(0)}%).`;
  if (entries.length > 1 && entries[1][1] > 0) {
    const [n2, v2] = entries[1];
    txt += ` Em seguida, "${n2}" com ${v2} (${((v2 / total) * 100).toFixed(0)}%).`;
  }
  return txt;
}

export function insightScale(obj: Record<string, number>): string {
  const total = Object.values(obj).reduce((a, b) => a + b, 0);
  if (!total) return 'Sem respostas registradas.';
  const hi = ((obj['4'] || 0) + (obj['5'] || 0));
  const lo = ((obj['1'] || 0) + (obj['2'] || 0));
  return `Média ${scaleAvg(obj).toFixed(1)} de 5. ${hi} de ${total} (${((hi / total) * 100).toFixed(0)}%) avaliam como alto/muito alto e ${lo} (${((lo / total) * 100).toFixed(0)}%) como baixo/muito baixo.`;
}

export function ChartDescription({ description, insight }: { description?: string; insight?: string }) {
  if (!description && !insight) return null;
  return (
    <div className="chart-description">
      {description && <div className="chart-description-text">{description}</div>}
      {insight && <div className="chart-description-insight">{insight}</div>}
    </div>
  );
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────
export const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload[0]?.payload?.total ?? null;
  return (
    <div className="custom-tooltip">
      <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)', fontSize: 12 }}>
        {payload[0]?.payload?.name ?? payload[0]?.payload?.nivel}
      </div>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="custom-tooltip-item">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.fill || entry.color, display: 'inline-block' }} />
          Qtd: <strong style={{ color: 'var(--text-primary)' }}>{entry.value}</strong>
          {total ? <span style={{ color: 'var(--text-muted)' }}> ({((entry.value / total) * 100).toFixed(0)}%)</span> : ''}
        </div>
      ))}
    </div>
  );
};

// ─── Donut Chart ─────────────────────────────────────────────────────────────
interface DonutProps {
  title: string;
  subtitle?: string;
  description?: string;
  data: Record<string, number>;
  colors: string[];
  height?: number;
}

export function DonutChart({ title, subtitle, description, data, colors, height = 260 }: DonutProps) {
  const pieData = toPie(data, colors);
  const total = pieData.reduce((s, d) => s + d.value, 0);
  const innerR = Math.floor(height * 0.22);
  const outerR = Math.floor(height * 0.38);

  return (
    <div style={{
      background: 'rgba(15,23,42,0.03)',
      borderRadius: 14,
      padding: '18px 20px',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>}
        <ChartDescription description={description} insight={insightDonut(data)} />
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
          Total: <strong style={{ color: 'var(--text-secondary)' }}>{total}</strong> respondentes
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flexShrink: 0, width: height * 0.75, height: height * 0.85, minWidth: 150 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
          {pieData.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: item.color, display: 'inline-block', flexShrink: 0,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="donut-legend-name" style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.name}>{item.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 1 }}>
                  <strong style={{ fontSize: 16, color: item.color }}>{item.value}</strong>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    ({((item.value / total) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Scale Bar Chart ──────────────────────────────────────────────────────────
interface ScaleBarProps {
  title: string;
  subtitle?: string;
  description?: string;
  data: Record<string, number>;
  height?: number;
}

export function ScaleBar({ title, subtitle, description, data, height = 200 }: ScaleBarProps) {
  const barData = ['1', '2', '3', '4', '5'].map((k) => ({
    nivel: k,
    label: `Nível ${k}`,
    value: (data as any)[k] || 0,
    fill: SCALE_COLORS[k],
    total: Object.values(data).reduce((a, b) => a + b, 0),
  }));

  const avg = scaleAvg(data);
  const ac = avgColor(avg);
  const total = barData.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{
      background: 'rgba(15,23,42,0.03)',
      borderRadius: 14,
      padding: '18px 20px',
      border: '1px solid var(--border-subtle)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>}
          <ChartDescription description={description} insight={insightScale(data)} />
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
            (1=Muito Baixo · 5=Muito Alto) · n={total}
          </div>
        </div>
        <div style={{
          background: `${ac}22`,
          border: `1px solid ${ac}44`,
          borderRadius: 8,
          padding: '4px 10px',
          textAlign: 'center',
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Média</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: ac }}>{avg.toFixed(1)}</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={barData} margin={{ top: 8, right: 10, left: -10, bottom: 0 }} barSize={36}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" vertical={false} />
          <XAxis
            dataKey="nivel"
            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `Nível ${v}`}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(15,23,42,0.04)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Respostas">
            {barData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              style={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* color legend */}
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {Object.entries(SCALE_COLORS).map(([k, color]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-muted)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: color, display: 'inline-block' }} />
            {k}={['Muito Baixo', 'Baixo', 'Médio', 'Alto', 'Muito Alto'][Number(k) - 1]}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Free text list ───────────────────────────────────────────────────────────
export function FreeTextList({ items, color = '#4f46e5', emptyMsg = 'Nenhuma resposta registrada.' }: {
  items: string[]; color?: string; emptyMsg?: string;
}) {
  if (!items.length) return <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{emptyMsg}</div>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: 'rgba(15,23,42,0.03)',
          border: `1px solid ${color}33`,
          borderLeft: `3px solid ${color}`,
          borderRadius: 10,
          padding: '12px 16px',
          fontSize: 13,
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
        }}>
          {item}
        </div>
      ))}
    </div>
  );
}

// ─── Page header ─────────────────────────────────────────────────────────────
export function ModuleHeader({ number, title, description, color, icon: Icon }: {
  number: string; title: string; description: string; color: string; icon: any;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      marginBottom: 28, padding: '20px 24px',
      background: `linear-gradient(135deg, ${color}12, ${color}06)`,
      border: `1px solid ${color}30`,
      borderRadius: 16,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: `${color}22`, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={24} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          Módulo {number}
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{description}</div>
      </div>
    </div>
  );
}
