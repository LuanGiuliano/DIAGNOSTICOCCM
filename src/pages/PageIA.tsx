import { Sparkles } from 'lucide-react';
import { FreeTextList, ModuleHeader } from '../components/ChartComponents';
import survey from '../data/survey_data.json';

export function PageIA() {
  return (
    <div className="page-content">
      <ModuleHeader
        number="8"
        title="Visão de IA — Síntese das Sugestões"
        description={`Análise inteligente gerada a partir das observações dos ${survey.total_respondentes} respondentes.`}
        color="#ec4899"
        icon={Sparkles}
      />

      <div style={{
        background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(124,58,237,0.06))',
        border: '1px solid rgba(236,72,153,0.2)',
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: 'rgba(15,23,42,0.03)', borderRadius: 10, padding: 14, border: '1px solid rgba(15,23,42,0.06)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔁 Temas que Mais se Repetem</div>
            {[
              { tema: 'Necessidade de capacitação em PAE 4.0 e legislação', freq: '9 de 14 respondentes' },
              { tema: 'Alto volume de erratas por inconsistências nas portarias', freq: '7 de 14 respondentes' },
              { tema: 'Falta de pessoal / ampliação da equipe', freq: '6 de 14 respondentes' },
              { tema: 'Desafios na integração com DIGE e SEPLAD', freq: '6 de 14 respondentes' },
              { tema: 'Organização e digitalização do arquivo físico', freq: '4 de 14 respondentes' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < 4 ? '1px solid rgba(15,23,42,0.05)' : 'none' }}>
                <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{item.tema}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{item.freq}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(15,23,42,0.03)', borderRadius: 10, padding: 14, border: '1px solid rgba(15,23,42,0.06)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>✅ Principais Sugestões de Melhoria</div>
            {[
              'Promover treinamento específico em PAE 4.0 para toda a equipe da CCM',
              'Criar processo formal de gestão do conhecimento antes de aposentadorias chave',
              'Estabelecer fluxo conjunto entre DIGE e CCM para validação de portarias',
              'Reorganizar o arquivo físico com equipe dedicada e EPIs adequados',
              'Ampliar equipe com estagiários e concluir digitalização via SIGED',
              'Melhorar comunicação interna com reuniões regulares de alinhamento',
              'Padronizar triagem de processos vindos de múltiplos pontos de entrada',
            ].map((sug, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#10b981', fontSize: 13, lineHeight: 1.4, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{sug}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16, background: 'rgba(15,23,42,0.03)', borderRadius: 10, padding: 14, border: '1px solid rgba(15,23,42,0.06)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ec4899', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>📝 Observações Registradas pelos Servidores</div>
          <FreeTextList items={survey.observacoes} color="#ec4899" />
        </div>
      </div>
    </div>
  );
}
