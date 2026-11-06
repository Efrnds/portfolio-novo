# Portfólio editorial-industrial

Data: 2026-11-05.
Status: implementação em revisão na branch `feat/editorial-industrial`.

Correção de direção solicitada durante a implementação: manter a paleta anterior e a Urbanist com títulos em peso 400. A miniatura integrada ao título foi rejeitada e removida. A abertura passa a relacionar a frase editorial à apresentação profissional em duas colunas, com uma composição linear no celular.

## Brief recebido

“Um portfólio de engenheiro full-stack e de operações, com linguagem editorial-industrial, mostrando sistemas que saíram do protótipo e chegaram ao trabalho real.”

Referência indicada: [Kenji Lambert](https://www.kenjilambert.com/). Foram consultados a home, a listagem de trabalhos e o case [Hidden Within the Flames](https://www.kenjilambert.com/work/blacklyte-kraken-pro). A referência sustenta a apresentação autoral, a prioridade dada ao trabalho e a explicação do processo. Sua execução de animação não foi validada em navegador neste ambiente.

Leitura de direção: portfólio autoral para equipes de produto, lideranças técnicas e clientes, com linguagem editorial-industrial. ENERGY 3 / RHYTHM 3 / MOTION 3. As decisões abaixo são propostas para desenvolver o brief recebido.

## Posição

O visitante precisa entender o que Eduardo construiu, para quem aquilo funciona e qual responsabilidade assumiu entre interface, aplicação e operação. O portfólio deve permitir uma leitura visual rápida e uma leitura técnica aprofundada.

A passagem do protótipo para o uso cotidiano organiza os casos. Cada afirmação sobre produção, escala ou resultado precisa ter evidência disponível. O conteúdo de `src/data/projects.js` é a base inicial, sujeita à confirmação do proprietário.

Proposta de abertura em inglês, mantendo o idioma padrão atual:

> From prototype
> to everyday
> operations.

Assinatura de função: “Eduardo Fernandes / Full-stack engineering & IT operations”.

Adaptação em português:

> Do protótipo
> à operação
> de todo dia.

## Linguagem visual

- **Tipografia como estrutura:** a abertura ocupa a tela com uma frase curta e hierarquia forte. Os títulos dos projetos funcionam como entradas de uma publicação. O primeiro estudo usa as fontes já disponíveis, com peso e composição revistos; a escolha final exige comparação visual.
- **Paleta preservada:** papel `#ECE9DF`, tinta `#11120F` e acento `#F05A3F`, conforme a preferência reafirmada pelo proprietário. A organização editorial usa essa identidade existente. Trato, Opinioteca e Calmera também preservam suas cores anteriores.
- **Informação técnica com função:** índices, autoria, período, contexto de uso, diagramas e legendas dão a linguagem industrial. Linhas alinham informação e mostram relações reais.
- **Matéria visual própria:** capturas, gravações, fluxos de uso e artefatos técnicos dos sistemas fornecem a identidade. Os elementos gráficos da referência pertencem ao trabalho de Kenji e não entram como assets do portfólio.
- **Ritmo variável:** projetos com necessidades diferentes recebem composições diferentes. A ficha de contexto pode ser consistente; a história e a mídia determinam o restante da página.

## Percurso da home

1. **Abertura:** nome, função, frase editorial e apresentação profissional. Contato e navegação estão disponíveis desde o primeiro quadro. A evidência visual entra nos projetos.
2. **Sistemas selecionados:** o trabalho aparece logo depois da abertura. Cada entrada mostra quem usa, o problema resolvido, o papel de Eduardo e uma ação real do produto. O visitante abre o caso quando quer aprofundar.
3. **Operação:** a experiência profissional é apresentada por meio de responsabilidades e exemplos: implantação, suporte, manutenção e ferramentas internas. Um relato concreto oferece mais contexto que uma lista de tecnologias.
4. **Sobre:** texto breve conecta a atuação em produto e TI, com percurso profissional e contatos verificados.
5. **Contato:** encerramento com a altura da área visível, preservando a preferência anterior por um final de página evidente.

Navegação proposta: Work / Operations / About / Contact, com versão equivalente em português. A ordem no documento acompanha a navegação. A reorganização não altera as URLs existentes dos projetos.

## Tratamento de cada caso

| Projeto | Eixo editorial | Evidência e interação |
| --- | --- | --- |
| Trato | O percurso entre agendamento e operação da barbearia | Agenda e disponibilidade, telas reais de gestão e decisões sobre aplicação, dados e implantação. A interação local de reserva pode aparecer integrada ao ambiente do caso. |
| Opinioteca | O livro como conexão entre identidade e conversa | Capas, leitura, avaliações e estante conduzem a página. A explicação técnica conecta a interface à API Go, PostgreSQL e mensagens via WebSocket descritos no repositório. |
| Calmera | A relação entre produção doméstica e venda | Composição de catálogo e caderno de produção, com fotos reais das velas. A sacola local demonstra quantidades e totais; a explicação do sistema cobre receitas, lotes e custos conforme as evidências disponíveis. |
| Vwrks | Engenharia a serviço do trabalho visual do cliente | Imagens amplas, decisões de mídia e composição responsiva. O ciclo pastel na parte inferior e a navbar neutra continuam como solicitado. |
| Sistemas internos | Relatos de intervenções no trabalho cotidiano | Problema, intervenção e consequência observável. Diagramas e artefatos anonimizados substituem telas que exponham informações internas. |

Os ambientes interativos existentes são material aproveitável. Seu uso deve ajudar a entender o caso e ficar próximo da evidência real do produto. Interações locais são identificadas como demonstrações; reservas, avaliações e compras não são apresentadas como ações enviadas à produção.

## Movimento

A assinatura proposta é a transformação de uma composição editorial em uma interface utilizável. Um título estabelece o assunto; a mídia assume o foco; o ambiente do produto entra com sua identidade e passa a responder às ações do visitante.

- Abertura com uma sequência curta de título, seguida de um estado estável. A mídia entra nos projetos.
- Entradas de projetos que variam escala e enquadramento de capturas inteiras.
- Momentos de pin usados para uma transformação específica, com início e término reconhecíveis. A leitura comum mantém rolagem nativa.
- Trocas de cor ligadas à passagem entre ambientes, com texto e controles legíveis durante toda a transição.
- Respostas ao clique e alterações de estado dão continuidade ao movimento depois da entrada na seção.
- A coreografia de opacidade continua reservada à Experiência. Os demais conteúdos usam posição, recorte e mudanças de composição.
- As capturas permanecem contidas; a camada de transferência que produziu o retângulo flutuante não retorna.
- No mobile, o percurso se reorganiza para toque e uma coluna. Movimento reduzido entrega o estado final e todos os controles.

Motion, React e Vite já cobrem essa direção. A definição visual e a coreografia precedem qualquer decisão de adicionar dependências.

## Conteúdo e mídia

Para cada caso, reunir contexto, papel, decisões, uma limitação real e evidência do uso. Indicadores de usuários, desempenho ou resultado só entram quando houver fonte verificável.

As capturas existentes permitem o primeiro estudo. Gravações curtas de tarefas reais dão continuidade aos produtos: reservar um horário no Trato, percorrer livro e conversa na Opinioteca, acompanhar produto e pedido no Calmera. O guia existente em `src/assets/videos/README.md` pode ser adaptado a essas tomadas.

## Primeira entrega verificável

Construir uma fatia com a abertura, a entrada do Trato e o começo do caso. Ela deve demonstrar tipografia, ritmo, transição e interação em desktop e mobile. A avaliação em navegador acontece antes de estender a direção aos demais casos.

O estudo precisa permitir ler a apresentação sem esperar pela animação, entender o produto antes de abrir o caso e usar a interação sem perder o enquadramento. Capturas em diferentes pontos da rolagem e uma gravação documentam o resultado.

## Verificação da proposta

- **Brief PASS:** o posicionamento foi extraído da descrição do proprietário; interpretações visuais estão identificadas como propostas.
- **R-31 PASS:** cor, tipografia, composição, mídia e movimento possuem motivos registrados neste documento.
- **C-5 PASS:** a proposta não atribui métricas, clientes ou resultados novos aos projetos.
- **Liveliness PASS no planejamento:** os três dials estão declarados e traduzidos em decisões de composição e movimento.
- **Verificação visual e funcional:** resultados e limites estão registrados em `anti-slop/editorial-industrial-2026-11-05.md`. A verificação local não declara aprovação de FPS ou do percurso completo servido por HTTP.
