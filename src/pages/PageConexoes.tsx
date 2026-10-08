import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import { ModuleHeader } from '../components/ChartComponents';
import dados from '../data/cartografia_processada.json';

export function PageConexoes() {
  const { conexoes } = dados;

  return (
    <div className="page-content">
      <ModuleHeader
        number="Sistema"
        title="Conexões e Fluxos de Trabalho"
        description="Mapeamento de carteiras com forte conexão, essenciais para a fluidez dos processos."
        color="#d97706"
        icon={LinkIcon}
      />

      <div className="card">
        <div className="card-header" style={{ marginBottom: 16 }}>
           <div className="card-title">
             <LinkIcon size={16} color="#d97706" />
             Dependências entre Carteiras
           </div>
        </div>
        <div className="card-body">
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
             
             {Object.entries(conexoes).map(([origem, destinos]) => (
               <div key={origem} style={{
                 background: 'rgba(15,23,42,0.02)',
                 border: '1px solid rgba(15,23,42,0.05)',
                 borderRadius: 'var(--radius-md)',
                 padding: 16,
               }}>
                 <div style={{ 
                   fontSize: 13, 
                   fontWeight: 800, 
                   color: '#f59e0b', 
                   marginBottom: 12,
                   display: 'flex',
                   alignItems: 'center',
                   gap: 8,
                   letterSpacing: '0.05em'
                 }}>
                   {origem}
                   <ArrowRight size={14} color="var(--text-muted)" />
                 </div>
                 
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                   {(destinos as string[]).map((dest, idx) => (
                     <span key={idx} style={{
                       fontSize: 10,
                       fontFamily: 'JetBrains Mono, monospace',
                       background: 'rgba(99,102,241,0.1)',
                       color: '#818cf8',
                       padding: '4px 8px',
                       borderRadius: 4,
                       border: '1px solid rgba(99,102,241,0.2)'
                     }}>
                       {dest}
                     </span>
                   ))}
                 </div>
               </div>
             ))}

           </div>
        </div>
      </div>

       <div style={{
        padding: '16px 20px',
        background: 'rgba(8,145,178,0.08)',
        border: '1px solid rgba(8,145,178,0.2)',
        borderRadius: 'var(--radius-lg)',
        fontSize: 12,
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        marginTop: 8
      }}>
        <strong style={{ color: '#0891b2' }}>💡 Análise de Fluxo:</strong>{' '}
        O mapeamento acima reflete as respostas dos pontos focais sobre quais outras carteiras são críticas para a continuidade do seu trabalho. Carteiras mencionadas frequentemente (como Manutenção e Licenças) representam nós críticos no fluxo de informações da CCM.
      </div>
    </div>
  );
}
