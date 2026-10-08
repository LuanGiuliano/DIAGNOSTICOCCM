/**
 * Gráficos de módulos reutilizados na Visão Geral e no Modo Apresentação.
 */
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import { ChartDescription, scaleAvg, avgColor } from './ChartComponents';
import { DESC } from '../data/descriptions';
import survey from '../data/survey_data.json';

const cardStyle: React.CSSProperties = {
  background: 'rgba(15,23,42,0.03)',
  borderRadius: 14,
  padding: '18px 20px',
  border: '1px solid var(--border-subtle)',
};

export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

// ─── Competências ────────────────────────────────────────────────────────────
export const radarData = [
  { subject: 'Informática', A: scaleAvg(survey.competencias.informatica_basica) },
  { subject: 'Planilhas', A: scaleAvg(survey.competencias.planilhas_eletronicas) },
  { subject: 'Google', A: scaleAvg(survey.competencias.ferramentas_google) },
  { subject: 'Sistemas SEDUC', A: scaleAvg(survey.competencias.sistemas_seduc) },
  { subject: 'PAE 4.0', A: scaleAvg(survey.competencias.pae40) },
  { subject: 'Redação', A: scaleAvg(survey.competencias.redacao_oficial) },
  { subject: 'Interpessoal', A: scaleAvg(survey.competencias.relacoes_interpessoais) },
  { subject: 'Gestão Proc.', A: scaleAvg(survey.competencias.gestao_processos) },
  { subject: 'Dados', A: scaleAvg(survey.competencias.analise_dados) },
  { subject: 'Planejamento', A: scaleAvg(survey.competencias.planejamento_evidencias) },
  { subject: 'IA', A: scaleAvg(survey.competencias.ferramentas_ia) },
  { subject: 'Legislação', A: scaleAvg(survey.competencias.nocoes_legislacao) },
];

export function competenciasInsight() {
  const sorted = [...radarData].sort((a, b) => b.A - a.A);
  const top = sorted.slice(0, 3).map(c => `${c.subject} (${c.A.toFixed(1)})`).join(', ');
  const low = sorted.slice(-3).reverse().map(c => `${c.subject} (${c.A.toFixed(1)})`).join(', ');
  const avg = radarData.reduce((s, c) => s + c.A, 0) / radarData.length;
  return `Média geral ${avg.toFixed(1)} de 5. Pontos fortes: ${top}. Pontos de atenção: ${low}.`;
}

export function CompetenciasRadar({ height = 280, title = 'Média por Competência (Autoavaliação 1–5)' }: { height?: number; title?: string }) {
  return (
    <ChartCard title={title}>
      <ChartDescription description={DESC.radar} insight={competenciasInsight()} />
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={radarData} outerRadius="72%">
          <PolarGrid stroke="rgba(15,23,42,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
          <Radar name="Média" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
          <Tooltip formatter={(v: any) => Number(v).toFixed(1)} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Clima ───────────────────────────────────────────────────────────────────
const climaItems = [
  { name: 'Comunicação interna', value: scaleAvg(survey.clima_organizacional.comunicacao_interna) },
  { name: 'Clareza das atribuições', value: scaleAvg(survey.clima_organizacional.clareza_atribuicoes) },
  { name: 'Empatia e cooperação', value: scaleAvg(survey.clima_organizacional.empatia_cooperacao) },
];

export function ClimaBars({ height = 200, title = 'Clima Organizacional — Média dos Indicadores' }: { height?: number; title?: string }) {
  const best = [...climaItems].sort((a, b) => b.value - a.value)[0];
  const worst = [...climaItems].sort((a, b) => a.value - b.value)[0];
  return (
    <ChartCard title={title}>
      <ChartDescription
        description={DESC.climaBars}
        insight={`Melhor avaliado: ${best.name} (${best.value.toFixed(1)}). Menor nota: ${worst.name} (${worst.value.toFixed(1)}).`}
      />
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={climaItems} layout="vertical" margin={{ top: 4, right: 36, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" horizontal={false} />
          <XAxis type="number" domain={[0, 5]} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={150} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v: any) => Number(v).toFixed(2)} cursor={{ fill: 'rgba(15,23,42,0.04)' }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
            {climaItems.map((c, i) => <Cell key={i} fill={avgColor(c.value)} />)}
            <LabelList dataKey="value" position="right" formatter={(v: any) => Number(v).toFixed(1)} style={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 700 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── SWOT ────────────────────────────────────────────────────────────────────
const swotItems = [
  { name: 'Forças', value: survey.swot.forcas.length, color: '#10b981' },
  { name: 'Fraquezas', value: survey.swot.fraquezas.length, color: '#ef4444' },
  { name: 'Oportunidades', value: survey.swot.oportunidades.length, color: '#f59e0b' },
  { name: 'Ameaças', value: survey.swot.ameacas.length, color: '#8b5cf6' },
];

export function SwotCounts({ height = 200, title = 'Matriz SWOT — Apontamentos por Quadrante' }: { height?: number; title?: string }) {
  const total = swotItems.reduce((s, i) => s + i.value, 0);
  const top = [...swotItems].sort((a, b) => b.value - a.value)[0];
  return (
    <ChartCard title={title}>
      <ChartDescription
        description={DESC.swot}
        insight={`${total} apontamentos no total. Quadrante com mais registros: ${top.name} (${top.value}). ${swotItems.map(i => `${i.name}: ${i.value}`).join(' · ')}.`}
      />
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={swotItems} margin={{ top: 16, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.05)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: 'rgba(15,23,42,0.04)' }} />
          <Bar dataKey="value" name="Apontamentos" radius={[6, 6, 0, 0]} barSize={44}>
            {swotItems.map((s, i) => <Cell key={i} fill={s.color} />)}
            <LabelList dataKey="value" position="top" style={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 700 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Visão de IA (conteúdo compartilhado) ────────────────────────────────────
export const IA_TEMAS = [
  { tema: 'Necessidade de capacitação em PAE 4.0 e legislação', n: 9 },
  { tema: 'Alto volume de erratas por inconsistências nas portarias', n: 7 },
  { tema: 'Falta de pessoal / ampliação da equipe', n: 6 },
  { tema: 'Desafios na integração com DIGE e SEPLAD', n: 6 },
  { tema: 'Organização e digitalização do arquivo físico', n: 4 },
];

export function IATemas({ title = 'Temas que Mais se Repetem nas Respostas Livres' }: { title?: string }) {
  const total = survey.total_respondentes;
  return (
    <ChartCard title={title}>
      <ChartDescription
        description={DESC.temasIA}
        insight={`O tema mais citado foi "${IA_TEMAS[0].tema}", mencionado por ${IA_TEMAS[0].n} de ${total} respondentes (${((IA_TEMAS[0].n / total) * 100).toFixed(0)}%).`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {IA_TEMAS.map((t) => (
          <div key={t.tema}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, gap: 12 }}>
              <span>{t.tema}</span>
              <strong style={{ color: '#ec4899', whiteSpace: 'nowrap' }}>{t.n}/{total}</strong>
            </div>
            <div style={{ height: 7, background: 'rgba(15,23,42,0.07)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${(t.n / total) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#ec4899,#8b5cf6)', borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
