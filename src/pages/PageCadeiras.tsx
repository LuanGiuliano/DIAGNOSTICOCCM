import { useState } from 'react';
import { CadeiraCard } from '../components/CadeiraCard';
import { cadeiras } from '../data/mockData';
import { Search, SlidersHorizontal } from 'lucide-react';

type FiltroStatus = 'todos' | 'com-atraso' | 'acima-meta';

export function PageCadeiras() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<FiltroStatus>('todos');

  const cadeirasFiltradas = cadeiras.filter((c) => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro =
      filtro === 'todos' ||
      (filtro === 'com-atraso' && c.atrasados > 0) ||
      (filtro === 'acima-meta' && c.total >= c.meta);
    return matchBusca && matchFiltro;
  });

  return (
    <div className="page-content">
      {/* Header da seção */}
      <div className="section-header">
        <div>
          <div className="section-title">
            <span className="section-title-dot" />
            Cadeiras — CCM
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Monitoramento individual por subssetor de trabalho
          </div>
        </div>
        <span className="section-count">{cadeirasFiltradas.length} cadeiras</span>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Campo de busca */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 14px',
          flex: '1',
          minWidth: 200,
          maxWidth: 320,
        }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Buscar cadeira..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 13,
              width: '100%',
            }}
          />
        </div>

        {/* Tabs de filtro */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <SlidersHorizontal size={14} color="var(--text-muted)" />
          <div className="tabs">
            {(['todos', 'com-atraso', 'acima-meta'] as FiltroStatus[]).map((f) => (
              <button
                key={f}
                className={`tab-btn ${filtro === f ? 'active' : ''}`}
                onClick={() => setFiltro(f)}
              >
                {f === 'todos' ? 'Todas' : f === 'com-atraso' ? 'Com Atraso' : 'Acima da Meta'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de cadeiras */}
      {cadeirasFiltradas.length > 0 ? (
        <div className="cadeiras-grid">
          {cadeirasFiltradas.map((c) => (
            <CadeiraCard key={c.nome} cadeira={c} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-muted)',
          fontSize: 14,
        }}>
          Nenhuma cadeira encontrada com os filtros aplicados.
        </div>
      )}
    </div>
  );
}
