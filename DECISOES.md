# Registro de decisões — Sports Central

Este documento registra decisões conhecidas a partir do desenvolvimento descrito na conversa. Pontos que dependem de teste ou conferência do repositório estão identificados como pendentes.

## D01 — Tecnologias principais
- **Decisão:** usar HTML semântico, CSS próprio e JavaScript no navegador.
- **Motivo:** projeto acadêmico que demonstra estrutura, responsividade e manipulação do DOM.
- **Consequência:** as interações precisam de testes próprios e documentação.

## D02 — Bootstrap
- **Estado registrado:** o `index.html` compartilhado carrega Bootstrap 5.3.8 por CDN.
- **Consequência:** o carregamento depende de conexão, salvo se houver cópia local no repositório.
- **Pendente:** confirmar o estado atual após o último commit e avaliar cópia local se houver requisito offline.

## D03 — jQuery no T08
- **Versão discutida:** jQuery 4.0.0.
- **Origem no HTML compartilhado:** `https://code.jquery.com/jquery-4.0.0.min.js`.
- **Licença:** MIT.
- **Interação escolhida:** filtro de notícias.
- **Alternativa nativa:** `querySelector`, `addEventListener`, `querySelectorAll`, `textContent` e `hidden`.
- **Justificativa acadêmica:** demonstrar seleção, eventos com namespace, iteração e atualização de conteúdo sem reescrever as outras funcionalidades.
- **Custos/limitações:** dependência externa, transferência e execução adicionais; o CDN depende de rede.
- **Plano de remoção:** substituir pelo filtro nativo, remover a referência à biblioteca e repetir os mesmos testes.
- **Status:** confirmar no código atual se a troca foi concluída e testada; não registrar ganhos de desempenho sem medição.

## D04 — Falha do CDN
- **Recomendação para o filtro com jQuery:** verificar se `window.jQuery` existe antes de inicializá-lo.
- **Motivo:** a falha do CDN não deve interromper favoritos ou outras funções.
- **Pendente:** conferir se essa proteção está no `js/app.js` atual.

## D05 — Favoritos
- **Implementação observada no `app.js` compartilhado:** `localStorage`, chave `sportsCentralFavoritos`, serialização JSON, alternância dos botões e renderização em `favoritos.html`.
- **Limitação:** os favoritos ficam no navegador/origem atual; não sincronizam entre dispositivos nem são enviados a um servidor.
- **Robustez:** o código compartilhado cria elementos e usa `textContent`, evitando interpretar os textos armazenados como HTML. Dados do `localStorage` continuam sendo dados não confiáveis.

## D06 — Busca de notícias
- **Versão nativa compartilhada:** busca em título e descrição, sem distinção de maiúsculas/minúsculas para a localidade `pt-BR`, oculta artigos sem correspondência e atualiza a mensagem.
- **T08:** foi proposta a troca isolada do filtro para jQuery.
- **Critério:** preservar busca por título e descrição, mensagem de zero resultados e restauração de todos os artigos ao limpar a busca.
- **Pendente:** conferir o código atual depois do commit.

## D07 — Formulário
- **Escopo observado:** nome, e-mail, seleção de interesse, aceite obrigatório e região de mensagem.
- **Limitação:** o formulário foi descrito como demonstrativo; não envia dados para servidor nem para serviço de e-mail.
- **Regra:** não descrevê-lo como inscrição real.

## D08 — Conteúdo demonstrativo
Notícias, calendário e classificação de exemplo devem ser identificados como fictícios quando aplicável, para não parecerem dados esportivos atualizados.

## D09 — Escopo de conteúdo
O usuário decidiu manter o conteúdo como estava antes da proposta de remover esportes que não fossem futebol e informou que fez commit e seguiu para T09. Não aplicar aquela proposta sem nova solicitação explícita.

## D10 — T09: acessibilidade, SEO e desempenho
**Objetivo:** auditar a acessibilidade, os metadados e o desempenho do Sports Central, registrando os testes executados, as evidências, as correções e os retestes.
**Acessibilidade:** o usuário informou que os testes de acessibilidade realizados foram concluídos satisfatoriamente. Registrar os critérios verificados, o ambiente de teste e as evidências disponíveis em `TESTES.md`. Esse resultado não equivale, por si só, à comprovação de conformidade integral com a WCAG 2.2.
**SEO:** conferir os metadados das páginas, a hierarquia dos títulos, os textos alternativos das imagens e os links. Registrar os resultados e as correções realizadas.
**Desempenho:** utilizar o Lighthouse para avaliar Performance e SEO. Registrar as medições reais, o dispositivo ou perfil utilizado, o navegador, a data e o commit testado. Avaliar LCP, INP e CLS quando houver dados adequados, distinguindo medições de laboratório de dados reais de usuários.
**Critério de conclusão:** os testes e as medições devem estar documentados, os problemas identificados devem ter seu tratamento registrado e as correções devem ser retestadas. Resultados indisponíveis ou verificações não executadas devem permanecer identificados como pendentes.
**Status:** testes de acessibilidade informados como satisfatórios pelo usuário; auditoria de SEO e desempenho pendente de execução e documentação. A conclusão geral do T09 depende do registro das evidências e dos retestes.