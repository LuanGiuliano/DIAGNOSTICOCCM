# -*- coding: utf-8 -*-
"""
Processa os dados da Cartografia de Saberes e gera JSON estruturado para o dashboard.
"""
import json, statistics

with open('dados_cartografia.json', encoding='utf-8') as f:
    dados = json.load(f)

# ─── 1. COMPETÊNCIAS DIGITAIS por carteira ────────────────────────────────────
competencias = [
    'INFORMÁTICA BÁSICA',
    'PLANILHAS ELETRÔNICAS',
    'FERRAMENTAS GOOGLE',
    'SISTEMAS DA SEDUC',
    'PAE 4.0',
    'REDAÇÃO OFICIAL E ELABORAÇÃO DE PARECER TÉCNICO',
    'RELAÇÕES INTERPESSOAIS E ATENDIMENTO AO PÚBLICO',
    'GESTÃO DE PROCESSOS ADMINISTRATIVOS',
    'ANÁLISE DE DADOS E DOCUMENTAÇÃO',
    'PLANEJAMENTO BASEADO EM EVIDÊNCIAS',
    'FERRAMENTAS DE INTELIGÊNCIA ARTIFICIAL',
    'NOÇÕES EM LEGISLAÇÃO',
]

comp_labels_curtos = {
    'INFORMÁTICA BÁSICA': 'Informática',
    'PLANILHAS ELETRÔNICAS': 'Planilhas',
    'FERRAMENTAS GOOGLE': 'Google',
    'SISTEMAS DA SEDUC': 'Sistemas SEDUC',
    'PAE 4.0': 'PAE 4.0',
    'REDAÇÃO OFICIAL E ELABORAÇÃO DE PARECER TÉCNICO': 'Redação/Parecer',
    'RELAÇÕES INTERPESSOAIS E ATENDIMENTO AO PÚBLICO': 'Rel. Interpessoais',
    'GESTÃO DE PROCESSOS ADMINISTRATIVOS': 'Gestão Proc.',
    'ANÁLISE DE DADOS E DOCUMENTAÇÃO': 'Análise Dados',
    'PLANEJAMENTO BASEADO EM EVIDÊNCIAS': 'Planejamento',
    'FERRAMENTAS DE INTELIGÊNCIA ARTIFICIAL': 'Inteligência Artif.',
    'NOÇÕES EM LEGISLAÇÃO': 'Legislação',
}

# Média de cada competência (geral)
medias_geral = {}
for comp in competencias:
    vals = [d[comp] for d in dados if comp in d and d[comp] is not None]
    medias_geral[comp] = round(statistics.mean(vals), 2) if vals else 0

print("=== MÉDIAS GERAIS DE COMPETÊNCIAS ===")
for k, v in sorted(medias_geral.items(), key=lambda x: x[1]):
    print(f"  {comp_labels_curtos[k]}: {v}")

# ─── 2. COMPETÊNCIAS por carteira ────────────────────────────────────────────
competencias_por_carteira = []
for d in dados:
    carteira = d.get('INDIQUE A CARTEIRA EM QUE VOCÊ É O PONTO FOCAL', 'N/D')
    row = {'carteira': carteira}
    for comp in competencias:
        row[comp_labels_curtos[comp]] = d.get(comp)
    competencias_por_carteira.append(row)

print("\n=== COMPETÊNCIAS POR CARTEIRA ===")
for r in competencias_por_carteira:
    print(f"  {r['carteira']}")

# ─── 3. CLIMA ORGANIZACIONAL ─────────────────────────────────────────────────
clima_campos = ['COMUNICAÇÃO INTERNA CLARA E OBJETIVA', 'CLAREZA DAS ATRIBUIÇÕES', 'EMPATIA E COOPERAÇÃO ENTRE PARES']
clima_curtos = {
    'COMUNICAÇÃO INTERNA CLARA E OBJETIVA': 'Comunicação Interna',
    'CLAREZA DAS ATRIBUIÇÕES': 'Clareza das Atribuições',
    'EMPATIA E COOPERAÇÃO ENTRE PARES': 'Empatia e Cooperação',
}

clima_por_carteira = []
for d in dados:
    carteira = d.get('INDIQUE A CARTEIRA EM QUE VOCÊ É O PONTO FOCAL', 'N/D')
    row = {'carteira': carteira}
    for c in clima_campos:
        row[clima_curtos[c]] = d.get(c)
    clima_por_carteira.append(row)

medias_clima = {}
for c in clima_campos:
    vals = [d[c] for d in dados if c in d and d[c] is not None]
    medias_clima[clima_curtos[c]] = round(statistics.mean(vals), 2) if vals else 0

print("\n=== MÉDIAS CLIMA ORGANIZACIONAL ===")
for k, v in medias_clima.items():
    print(f"  {k}: {v}")

# ─── 4. AVALIAÇÃO DA EXECUÇÃO por carteira ───────────────────────────────────
avaliacoes = []
for d in dados:
    carteira = d.get('INDIQUE A CARTEIRA EM QUE VOCÊ É O PONTO FOCAL', 'N/D')
    nota = d.get('De que forma você avalia a execução de tarefas na Carteira que lidera?')
    planejamento = d.get('Há um planejamento semanal ou mensal das atividades na carteira que lidera?')
    pae_passivo = d.get('Com relação ao PAE, existe algum gerenciamento ou priorização dos processos passivos voltados às unidades vinculadas a carteira?')
    avaliacoes.append({
        'carteira': carteira,
        'notaExecucao': nota,
        'planejamento': planejamento,
        'gestaoPassivoPAE': pae_passivo,
    })

print("\n=== AVALIAÇÕES DE EXECUÇÃO ===")
for a in avaliacoes:
    print(f"  {a['carteira']}: nota={a['notaExecucao']} | planejamento={a['planejamento']} | PAE passivo={a['gestaoPassivoPAE']}")

# ─── 5. ESCOLARIDADE ─────────────────────────────────────────────────────────
escolaridade_count = {}
for d in dados:
    e = d.get('INDIQUE SUA ESCOLARIDADE MÁXIMA', 'N/I')
    escolaridade_count[e] = escolaridade_count.get(e, 0) + 1

print("\n=== ESCOLARIDADE ===", escolaridade_count)

# ─── 6. JORNADA / VÍNCULO ────────────────────────────────────────────────────
jornadas = {}
for d in dados:
    j = d.get('SELECIONE SUA JORNADA DE TRABALHO MENSAL', 'N/I')
    jornadas[j] = jornadas.get(j, 0) + 1

vinculo = {}
for d in dados:
    v = d.get('INDIQUE O SEU TIPO DE VÍNCULO FUNCIONAL', 'N/I')
    vinculo[v] = vinculo.get(v, 0) + 1

atualidade = {}
for d in dados:
    a = d.get('SUAS ATIVIDADES ATUAIS CORRESPONDEM A SUA QUALIFICAÇÃO PROFISSIONAL?', 'N/I')
    atualidade[a] = atualidade.get(a, 0) + 1

cargo = {}
for d in dados:
    c = d.get('EXERCE CARGO COMISSIONADO OU FUNÇÃO GRATIFICADA?', 'N/I')
    cargo[c] = cargo.get(c, 0) + 1

print("\n=== JORNADA ===", jornadas)
print("=== VÍNCULO ===", vinculo)
print("=== QUALIFICAÇÃO ===", atualidade)
print("=== CARGO COMISSIONADO ===", cargo)

# ─── 7. SWOT COLETADO ────────────────────────────────────────────────────────
swot = {'forcas': [], 'fraquezas': [], 'oportunidades': [], 'ameacas': []}
for d in dados:
    carteira = d.get('INDIQUE A CARTEIRA EM QUE VOCÊ É O PONTO FOCAL', '')
    f = d.get('CONSIDERANDO A MATRIZ SWOT DA CCM, INDIQUE OS ASPECTOS E ELEMENTOS QUE VOCÊ GOSTARIA DE ACRESCENTAR PARA O CAMPO FORÇAS, TENDO EM VISTA A CARTEIRA QUE LIDERA.')
    fr = d.get('CONSIDERANDO A MATRIZ SWOT DA CCM, INDIQUE OS ASPECTOS E ELEMENTOS QUE VOCÊ GOSTARIA DE ACRESCENTAR PARA O CAMPO FRAQUEZAS,  TENDO EM VISTA A CARTEIRA QUE LIDERA.')
    o = d.get('CONSIDERANDO A MATRIZ SWOT DA CCM, INDIQUE OS ASPECTOS E ELEMENTOS QUE VOCÊ GOSTARIA DE ACRESCENTAR PARA O CAMPO OPORTUNIDADES/PRIORIDADES,  TENDO EM VISTA A CARTEIRA QUE LIDERA.')
    a = d.get('CONSIDERANDO A MATRIZ SWOT DA CCM, INDIQUE OS ASPECTOS E ELEMENTOS QUE VOCÊ GOSTARIA DE ACRESCENTAR PARA O CAMPO AMEAÇAS,  TENDO EM VISTA A CARTEIRA QUE LIDERA.')
    if f and f.strip() not in ['.', '']:
        swot['forcas'].append({'carteira': carteira, 'texto': f.strip()})
    if fr and fr.strip() not in ['.', '']:
        swot['fraquezas'].append({'carteira': carteira, 'texto': fr.strip()})
    if o and o.strip() not in ['.', '']:
        swot['oportunidades'].append({'carteira': carteira, 'texto': o.strip()})
    if a and a.strip() not in ['.', '']:
        swot['ameacas'].append({'carteira': carteira, 'texto': a.strip()})

# Também pegar dos comentários finais
for d in dados:
    carteira = d.get('INDIQUE A CARTEIRA EM QUE VOCÊ É O PONTO FOCAL', '')
    obs = d.get('OBSERVAÇÃO ADICIONAL', '')
    if obs and obs.strip() not in ['.', '', 'Necessidade de sistema ']:
        swot['oportunidades'].append({'carteira': carteira, 'texto': obs.strip()})

print("\n=== SWOT ===")
for k, v in swot.items():
    print(f"  {k}: {len(v)} entradas")
    for item in v:
        print(f"    [{item['carteira']}] {item['texto'][:80]}...")

# ─── 8. CONEXÕES ENTRE CARTEIRAS ────────────────────────────────────────────
conexoes = {}
colunas_conexao = [
    ('TRIÊNIO', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [TRIÊNIO]'),
    ('CERTIDÃO', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [CERTIDÃO]'),
    ('DESIGNAÇÃO', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [DESIGNAÇÃO]'),
    ('FÉRIAS', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [FÉRIAS]'),
    ('LICENÇAS DIVERSAS', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [LICENÇAS DIVERSAS]'),
    ('PECÚNIA', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [PECÚNIA]'),
    ('POLO', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [POLO]'),
    ('DIÁRIO/PUBLICAÇÃO', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [DIÁRIO/PUBLICAÇÃO]'),
    ('DECLARAÇÃO/ATESTADO', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [DECLARAÇÃO/ATESTADO]'),
    ('PROTOCOLO', 'INDIQUE A(s) CARTEIRA(s) EM QUE HÁ UMA FORTE CONEXÃO COM A QUE VOCÊ LIDERA, PORTANTO, É IMPRESCINDÍVEL PARA A FLUIDEZ DOS PROCESSOS DE SUA CARTEIRA [PROTOCOLO]'),
]

for carteira_focal, col in colunas_conexao:
    for d in dados:
        val = d.get(col)
        if val:
            conexoes[carteira_focal] = [c.strip() for c in val.split(',')]

print("\n=== CONEXÕES ===")
for k, v in conexoes.items():
    print(f"  {k} -> {v}")

# ─── EXPORTAR TUDO ───────────────────────────────────────────────────────────
output = {
    'totalRespostas': len(dados),
    'carteiras': [d.get('INDIQUE A CARTEIRA EM QUE VOCÊ É O PONTO FOCAL') for d in dados],
    'mediasCompetenciasGeral': {comp_labels_curtos[k]: v for k, v in medias_geral.items()},
    'competenciasPorCarteira': competencias_por_carteira,
    'climaPorCarteira': clima_por_carteira,
    'mediasClima': medias_clima,
    'avaliacoesPorCarteira': avaliacoes,
    'escolaridade': escolaridade_count,
    'jornada': jornadas,
    'vinculo': vinculo,
    'qualificacaoAtual': atualidade,
    'cargoComissionado': cargo,
    'swot': swot,
    'conexoes': conexoes,
}

with open('src/data/cartografia_processada.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("\n✅ Exportado para src/data/cartografia_processada.json")
