import { useEffect, useMemo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Users, GraduationCap, Briefcase, MessageSquare, Brain, ClipboardList, TrendingUp, Sparkles } from 'lucide-react';
import { DonutChart, ScaleBar, FreeTextList, COLORS_BRAND, COLORS_YN } from './ChartComponents';
import { CompetenciasRadar, ClimaBars, SwotCounts, IATemas } from './ModuleCharts';
import { DESC } from '../data/descriptions';
import survey from '../data/survey_data.json';

interface Slide {
  section: string;
  color: string;
  title: string;
  node: React.ReactNode;
  wide?: boolean; // grid de vários gráficos
}

const grid = (n: number): React.CSSProperties => ({
  display: 'grid', gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap: 20, width: '100%',
});

const swotBlock = (label: string, color: string, items: string[]) => (
  <div>
    <div style={{ fontSize: 14, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{label}</div>
    <FreeTextList items={items} color={color} />
  </div>
);

function buildSlides(): Slide[] {
  const s: Slide[] = [];
  const total = survey.total_respondentes;

  // ── Capa ──
  s.push({
    section: 'Cartografia de Saberes', color: '#4f46e5', title: 'Visão Geral da CCM',
    node: (
      <div style={{ textAlign: 'center', maxWidth: 760 }}>
        <div className="slide-cover-number">{total}</div>
        <div style={{ fontSize: 22, color: 'var(--text-secondary)', marginBottom: 24 }}>servidores responderam ao mapeamento de saberes</div>
        <div style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Esta apresentação percorre os 8 módulos do dashboard: identificação, formação, experiência, clima,
          competências, gestão da rotina, matriz SWOT e síntese de IA — cada gráfico acompanhado de sua descrição.
        </div>
        <div style={{ marginTop: 28, fontSize: 13, color: 'var(--text-accent)' }}>Use as setas do teclado para navegar · Esc para sair</div>
      </div>
    ),
  });

  // ── M1 ──
  const m1 = { section: 'Módulo 1 · Identificação Organizacional', color: '#4f46e5' };
  s.push({ ...m1, title: 'Vínculo Funcional', node: <DonutChart title="Vínculo Funcional" description={DESC.vinculo} data={survey.vinculo_funcional} colors={['#4f46e5', '#0891b2', '#f59e0b', '#10b981']} height={300} /> });
  s.push({ ...m1, title: 'Cargo Comissionado / FG', node: <DonutChart title="Cargo Comissionado / FG" description={DESC.cargo} data={survey.cargo_comissionado} colors={COLORS_YN} height={300} /> });
  s.push({ ...m1, title: 'Jornada de Trabalho', node: <DonutChart title="Jornada de Trabalho" description={DESC.jornada} data={survey.jornada} colors={['#8b5cf6', '#f59e0b']} height={300} /> });
  s.push({ ...m1, title: 'Grupo Funcional', node: <DonutChart title="Grupo Funcional" description={DESC.grupo} data={survey.grupo_funcional} colors={['#4f46e5', '#10b981']} height={300} /> });
  s.push({
    ...m1, title: 'Carteira — Ponto Focal por Servidor',
    node: (
      <div style={{ maxWidth: 900 }}>
        <div className="chart-description"><div className="chart-description-text">{DESC.carteira}</div>
          <div className="chart-description-insight">{Object.keys(survey.carteira_ponto_focal).length} carteiras mapeadas.</div></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
          {Object.entries(survey.carteira_ponto_focal).map(([name, value], i) => {
            const c = COLORS_BRAND[i % COLORS_BRAND.length];
            return <div key={name} style={{ background: `${c}22`, border: `1px solid ${c}55`, borderRadius: 10, padding: '10px 16px', fontSize: 14, fontWeight: 600, color: c }}>{name}: {value as any}</div>;
          })}
        </div>
      </div>
    ),
  });

  // ── M2 ──
  const m2 = { section: 'Módulo 2 · Formação Acadêmica', color: '#0891b2' };
  s.push({ ...m2, title: 'Escolaridade Máxima', node: <DonutChart title="Escolaridade Máxima" description={DESC.escolaridade} data={survey.escolaridade} colors={['#0891b2', '#4f46e5', '#10b981', '#f59e0b', '#ef4444']} height={300} /> });
  s.push({ ...m2, title: 'Área de Formação Superior', node: <DonutChart title="Área de Formação Superior" description={DESC.formacao} data={survey.formacao_superior} colors={COLORS_BRAND} height={300} /> });

  // ── M3 ──
  const m3 = { section: 'Módulo 3 · Experiência Profissional', color: '#10b981' };
  s.push({ ...m3, title: 'Atividades × Qualificação', node: <DonutChart title="Atividades Correspondem à Qualificação?" description={DESC.qualificacao} data={survey.atividades_correspondem_qualif} colors={COLORS_YN} height={300} /> });
  s.push({ ...m3, title: 'Atuação em Outras Áreas', node: <DonutChart title="Já Atuou em Outras Áreas da SEDUC?" description={DESC.outrasAreas} data={survey.atuou_outras_areas} colors={['#10b981', '#ef4444']} height={300} /> });

  // ── M4 ──
  const m4 = { section: 'Módulo 4 · Clima Organizacional', color: '#7c3aed' };
  s.push({ ...m4, title: 'Média dos Indicadores de Clima', node: <ClimaBars height={240} /> });
  s.push({
    ...m4, title: 'Indicadores de Clima — Distribuição das Notas', wide: true,
    node: (
      <div style={grid(3)}>
        <ScaleBar title="Comunicação Interna Clara e Objetiva" description={DESC.comunicacao} data={survey.clima_organizacional.comunicacao_interna} height={220} />
        <ScaleBar title="Clareza das Atribuições" description={DESC.clareza} data={survey.clima_organizacional.clareza_atribuicoes} height={220} />
        <ScaleBar title="Empatia e Cooperação entre Pares" description={DESC.empatia} data={survey.clima_organizacional.empatia_cooperacao} height={220} />
      </div>
    ),
  });
  s.push({
    ...m4, title: 'Principais Desafios para Melhoria do Clima',
    node: <div style={{ maxWidth: 1000, width: '100%' }}><FreeTextList items={survey.desafios_clima} color="#7c3aed" /></div>,
  });

  // ── M5 ──
  const m5 = { section: 'Módulo 5 · Competências e Habilidades', color: '#f59e0b' };
  s.push({ ...m5, title: 'Radar de Competências', node: <div style={{ width: '100%', maxWidth: 860 }}><CompetenciasRadar height={360} /></div> });
  const comp: [string, any][] = [
    ['Informática Básica', survey.competencias.informatica_basica],
    ['Planilhas Eletrônicas', survey.competencias.planilhas_eletronicas],
    ['Ferramentas Google', survey.competencias.ferramentas_google],
    ['Sistemas da SEDUC', survey.competencias.sistemas_seduc],
    ['PAE 4.0', survey.competencias.pae40],
    ['Redação Oficial / Parecer Técnico', survey.competencias.redacao_oficial],
    ['Relações Interpessoais / Atendimento', survey.competencias.relacoes_interpessoais],
    ['Gestão de Processos Administrativos', survey.competencias.gestao_processos],
    ['Análise de Dados e Documentação', survey.competencias.analise_dados],
    ['Planejamento Baseado em Evidências', survey.competencias.planejamento_evidencias],
    ['Ferramentas de Inteligência Artificial', survey.competencias.ferramentas_ia],
    ['Noções em Legislação', survey.competencias.nocoes_legislacao],
  ];
  for (let i = 0; i < comp.length; i += 3) {
    const part = comp.slice(i, i + 3);
    s.push({
      ...m5, title: `Detalhe das Competências (${i / 3 + 1}/${comp.length / 3})`, wide: true,
      node: <div style={grid(3)}>{part.map(([t, d]) => <ScaleBar key={t} title={t} description={DESC.competencia} data={d} height={220} />)}</div>,
    });
  }

  // ── M6 ──
  const m6 = { section: 'Módulo 6 · Gestão de Rotina e Planejamento', color: '#0891b2' };
  s.push({ ...m6, title: 'Execução de Tarefas', node: <ScaleBar title="Avaliação da Execução de Tarefas" description={DESC.execucao} data={survey.gestao_rotina.avaliacao_execucao_tarefas} height={280} /> });
  s.push({ ...m6, title: 'Planejamento das Atividades', node: <DonutChart title="Planejamento Semanal/Mensal das Atividades?" description={DESC.planejamento} data={survey.gestao_rotina.planejamento_semanal} colors={['#10b981', '#ef4444', '#f59e0b']} height={300} /> });
  s.push({ ...m6, title: 'Processos Passivos no PAE', node: <DonutChart title="Gerenciamento de Processos Passivos no PAE" description={DESC.pae} data={survey.gestao_rotina.pae_passivos} colors={['#10b981', '#ef4444', '#f59e0b']} height={300} /> });
  s.push({ ...m6, title: 'Distribuição das Tarefas nas Carteiras', node: <div style={{ maxWidth: 1000, width: '100%' }}><FreeTextList items={survey.distribuicao_tarefas} color="#0891b2" /></div> });

  // ── M7 ──
  const m7 = { section: 'Módulo 7 · Matriz SWOT', color: '#10b981' };
  s.push({ ...m7, title: 'Panorama da Matriz SWOT', node: <div style={{ width: '100%', maxWidth: 860 }}><SwotCounts height={260} /></div> });
  s.push({
    ...m7, title: 'Forças e Fraquezas', wide: true,
    node: <div style={grid(2)}>{swotBlock('Forças', '#10b981', survey.swot.forcas)}{swotBlock('Fraquezas', '#ef4444', survey.swot.fraquezas)}</div>,
  });
  s.push({
    ...m7, title: 'Oportunidades e Ameaças', wide: true,
    node: <div style={grid(2)}>{swotBlock('Oportunidades / Prioridades', '#f59e0b', survey.swot.oportunidades)}{swotBlock('Ameaças', '#8b5cf6', survey.swot.ameacas)}</div>,
  });

  // ── M8 ──
  const m8 = { section: 'Módulo 8 · Visão de IA', color: '#ec4899' };
  s.push({ ...m8, title: 'Temas Recorrentes', node: <div style={{ width: '100%', maxWidth: 860 }}><IATemas /></div> });
  s.push({
    ...m8, title: 'Observações Registradas pelos Servidores',
    node: <div style={{ maxWidth: 1000, width: '100%' }}><FreeTextList items={survey.observacoes} color="#ec4899" /></div>,
  });

  return s;
}

const sectionIcon = (section: string) => {
  if (section.includes('Módulo 1')) return Users;
  if (section.includes('Módulo 2')) return GraduationCap;
  if (section.includes('Módulo 3')) return Briefcase;
  if (section.includes('Módulo 4')) return MessageSquare;
  if (section.includes('Módulo 5')) return Brain;
  if (section.includes('Módulo 6')) return ClipboardList;
  if (section.includes('Módulo 7')) return TrendingUp;
  return Sparkles;
};

export function Presentation({ onExit }: { onExit: () => void }) {
  const slides = useMemo(buildSlides, []);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');

  const go = useCallback((n: number) => {
    setIndex((cur) => {
      const target = Math.max(0, Math.min(slides.length - 1, n));
      setDir(target >= cur ? 'next' : 'prev');
      return target;
    });
  }, [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); setIndex(i => { setDir('next'); return Math.min(slides.length - 1, i + 1); }); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); setIndex(i => { setDir('prev'); return Math.max(0, i - 1); }); }
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(slides.length - 1);
      else if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onExit, slides.length]);

  // Tela cheia
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
    const onFs = () => { if (!document.fullscreenElement) onExit(); };
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, [onExit]);

  const slide = slides[index];
  const Icon = sectionIcon(slide.section);

  return (
    <div className="presentation-overlay" style={{ ['--slide-color' as any]: slide.color }}>
      <div className="presentation-glow" />
      <header className="presentation-header">
        <div className="presentation-section">
          <span className="presentation-section-icon"><Icon size={20} color={slide.color} /></span>
          <div>
            <div className="presentation-section-label">{slide.section}</div>
            <h1 className="presentation-title">{slide.title}</h1>
          </div>
        </div>
        <button className="presentation-close" onClick={onExit} title="Sair (Esc)"><X size={20} /></button>
      </header>

      <main className="presentation-stage">
        <div key={index} className={`presentation-slide slide-${dir} ${slide.wide ? 'slide-wide' : ''}`}>
          {slide.node}
        </div>
      </main>

      <footer className="presentation-footer">
        <button className="presentation-nav" onClick={() => go(index - 1)} disabled={index === 0} title="Anterior (←)"><ChevronLeft size={22} /></button>
        <div className="presentation-progress">
          <div className="presentation-progress-bar" style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
        </div>
        <div className="presentation-counter">{index + 1} / {slides.length}</div>
        <button className="presentation-nav" onClick={() => go(index + 1)} disabled={index === slides.length - 1} title="Próximo (→)"><ChevronRight size={22} /></button>
      </footer>
    </div>
  );
}
