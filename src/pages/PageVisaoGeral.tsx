import {
  Users, GraduationCap, Briefcase, Award, Brain, MessageSquare,
  ClipboardList, TrendingUp, Sparkles, Lightbulb,
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { DonutChart, ScaleBar, COLORS_YN, scaleAvg } from '../components/ChartComponents';
import { CompetenciasRadar, ClimaBars, SwotCounts, IATemas, radarData } from '../components/ModuleCharts';
import { DESC } from '../data/descriptions';
import survey from '../data/survey_data.json';

function ModuleBlock({ number, title, icon: Icon, color, children }: {
  number: string; title: string; icon: any; color: string; children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{
          width: 34, height: 34, borderRadius: 10, background: `${color}22`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={17} color={color} />
        </span>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color, textTransform: 'uppercase' }}>{number}</div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{title}</h2>
        </div>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}44, transparent)`, marginLeft: 8 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
        {children}
      </div>
    </section>
  );
}

function Highlights() {
  const total = survey.total_respondentes;
  const superior = (survey.escolaridade['GRADUAÇÃO'] || 0) + (survey.escolaridade['ESPECIALIZAÇÃO'] || 0);
  const sortedComp = [...radarData].sort((a, b) => a.A - b.A);
  const climaAvg = (
    scaleAvg(survey.clima_organizacional.comunicacao_interna) +
    scaleAvg(survey.clima_organizacional.clareza_atribuicoes) +
    scaleAvg(survey.clima_organizacional.empatia_cooperacao)
  ) / 3;
  const items = [
    `${total} servidores responderam ao mapeamento; ${superior} (${((superior / total) * 100).toFixed(0)}%) possuem ensino superior.`,
    `${survey.cargo_comissionado['SIM'] || 0} ocupam cargo comissionado/FG e ${survey.atuou_outras_areas['SIM'] || 0} já atuaram em outras áreas da SEDUC.`,
    `Clima organizacional com média geral de ${climaAvg.toFixed(1)} de 5 nos três indicadores avaliados.`,
    `Competência com menor média: ${sortedComp[0].subject} (${sortedComp[0].A.toFixed(1)}); maior: ${sortedComp[sortedComp.length - 1].subject} (${sortedComp[sortedComp.length - 1].A.toFixed(1)}).`,
    `Tema mais recorrente nas respostas livres: capacitação em PAE 4.0 e legislação.`,
  ];
  return (
    <div style={{
      marginBottom: 28, padding: '18px 22px', borderRadius: 16,
      background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(236,72,153,0.06))',
      border: '1px solid var(--border-active)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontWeight: 800, fontSize: 14, color: 'var(--text-accent)' }}>
        <Lightbulb size={16} /> Principais destaques
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((t, i) => (
          <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, display: 'flex', gap: 8 }}>
            <span style={{ color: 'var(--text-accent)' }}>•</span>{t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageVisaoGeral() {
  return (
    <div className="page-content">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <StatCard icon={Users} value={survey.total_respondentes} label="Respondentes CCM" color="#4f46e5" iconBg="rgba(79,70,229,0.15)" delta="100% CCM" />
        <StatCard icon={Briefcase} value={survey.cargo_comissionado['SIM'] || 0} label="Com Cargo/FG" color="#10b981" iconBg="rgba(16,185,129,0.15)" />
        <StatCard icon={GraduationCap} value={(survey.escolaridade['GRADUAÇÃO'] || 0) + (survey.escolaridade['ESPECIALIZAÇÃO'] || 0)} label="Com Ensino Superior" color="#0891b2" iconBg="rgba(8,145,178,0.15)" />
        <StatCard icon={Award} value={survey.atuou_outras_areas['SIM'] || 0} label="Atuaram em Outras Áreas" color="#f59e0b" iconBg="rgba(245,158,11,0.15)" />
      </div>

      <Highlights />

      <ModuleBlock number="Módulo 1" title="Identificação Organizacional" icon={Users} color="#4f46e5">
        <DonutChart title="Vínculo Funcional" description={DESC.vinculo} data={survey.vinculo_funcional} colors={['#4f46e5', '#0891b2', '#f59e0b', '#10b981']} height={220} />
        <DonutChart title="Cargo Comissionado / FG" description={DESC.cargo} data={survey.cargo_comissionado} colors={COLORS_YN} height={220} />
      </ModuleBlock>

      <ModuleBlock number="Módulo 2" title="Formação Acadêmica" icon={GraduationCap} color="#0891b2">
        <DonutChart title="Escolaridade Máxima" description={DESC.escolaridade} data={survey.escolaridade} colors={['#0891b2', '#4f46e5', '#10b981', '#f59e0b', '#ef4444']} height={220} />
      </ModuleBlock>

      <ModuleBlock number="Módulo 3" title="Experiência Profissional" icon={Briefcase} color="#10b981">
        <DonutChart title="Atividades Correspondem à Qualificação?" description={DESC.qualificacao} data={survey.atividades_correspondem_qualif} colors={COLORS_YN} height={220} />
        <DonutChart title="Já Atuou em Outras Áreas da SEDUC?" description={DESC.outrasAreas} data={survey.atuou_outras_areas} colors={['#10b981', '#ef4444']} height={220} />
      </ModuleBlock>

      <ModuleBlock number="Módulo 4" title="Clima Organizacional" icon={MessageSquare} color="#7c3aed">
        <ClimaBars />
      </ModuleBlock>

      <ModuleBlock number="Módulo 5" title="Competências e Habilidades" icon={Brain} color="#f59e0b">
        <CompetenciasRadar />
      </ModuleBlock>

      <ModuleBlock number="Módulo 6" title="Gestão de Rotina e Planejamento" icon={ClipboardList} color="#0891b2">
        <ScaleBar title="Avaliação da Execução de Tarefas" description={DESC.execucao} data={survey.gestao_rotina.avaliacao_execucao_tarefas} />
        <DonutChart title="Planejamento Semanal/Mensal das Atividades?" description={DESC.planejamento} data={survey.gestao_rotina.planejamento_semanal} colors={['#10b981', '#ef4444', '#f59e0b']} height={220} />
      </ModuleBlock>

      <ModuleBlock number="Módulo 7" title="Matriz SWOT" icon={TrendingUp} color="#10b981">
        <SwotCounts />
      </ModuleBlock>

      <ModuleBlock number="Módulo 8" title="Visão de IA" icon={Sparkles} color="#ec4899">
        <IATemas />
      </ModuleBlock>
    </div>
  );
}
