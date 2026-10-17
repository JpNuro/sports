# Sports Central

Portal esportivo acadêmico demonstrativo para apresentar notícias, jogos, classificação e interações básicas no navegador.

> **Aviso:** notícias, calendário e classificação podem conter conteúdo fictício; não devem ser tratados como dados esportivos atualizados.

## Funcionalidades
- Página inicial com destaque.
- Notícias com filtro de busca.
- Favoritos salvos no `localStorage`.
- Página `favoritos.html` para consultar/remover favoritos.
- Calendário demonstrativo de jogos.
- Tabela demonstrativa de classificação.
- Formulário demonstrativo de novidades.

Confirme o comportamento exato no código do commit que será entregue.

## Tecnologias
- HTML semântico.
- CSS próprio: `assets/css/style.css`.
- JavaScript: `js/app.js`.
- Bootstrap 5.3.8 por CDN no HTML compartilhado.
- jQuery 4.0.0 por CDN foi discutido para o filtro no T08; confirme se a implementação final o utiliza.

## Estrutura esperada

```text
sports-central/
├── index.html
├── favoritos.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── img/
├── js/
│   └── app.js
├── docs/
│   └── relatorio-final.md
├── DECISOES.md
├── TESTES.md
├── CMS.md
└── README.md
```

Esta é uma estrutura de referência baseada nos caminhos citados durante o desenvolvimento. Ajuste-a se o repositório real for diferente.

## Como executar
1. Clone o repositório.
2. Abra a pasta do projeto.
3. Abra `index.html` em um navegador ou use um servidor estático local.
4. Teste favoritos no mesmo navegador e na mesma origem.
5. Abra `favoritos.html` para testar a lista e a remoção de itens.

Como Bootstrap e jQuery foram carregados por CDN no HTML compartilhado, é necessária conexão para carregar essas dependências, salvo se o repositório tiver cópias locais.

## Testes
Consulte [`TESTES.md`](TESTES.md). Os casos estão pendentes até serem executados no commit atual; não marque como aprovados sem evidências.

## Decisões
Consulte [`DECISOES.md`](DECISOES.md) para versões, alternativas, limitações e decisões pendentes.

## CMS
Consulte [`CMS.md`](CMS.md) para o plano de portabilidade para WordPress. A migração não está declarada como concluída.

## Relatório T09
Registrar a auditoria em `docs/relatorio-final.md`, incluindo evidências, resultados antes/depois e limitações das ferramentas. Não inventar métricas nem declarar conformidade total sem testes.

## Limitações conhecidas
- O formulário descrito é demonstrativo e não envia dados a servidor ou serviço de e-mail.
- Favoritos ficam no navegador e não sincronizam entre dispositivos.
- Conteúdo de exemplo deve estar identificado como fictício.
- Dependências por CDN podem falhar sem conexão.
- Acessibilidade, SEO, desempenho, funcionamento offline e compatibilidade precisam ser verificados no ambiente de entrega.

## Próximas etapas
1. Concluir T09 e documentar evidências.
2. Corrigir defeitos encontrados e repetir os testes relevantes.
3. Refinar o plano de CMS.
4. Executar testes no clone limpo e no ambiente publicado.
5. Documentar limitações e decisões restantes antes da entrega.
