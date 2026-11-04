# O site se constrói durante a visita

Status: implementação aplicada; validação visual em navegador pendente.
Data: 2026-11-04.

Revisão após o feedback visual do proprietário: a camada de transferência entre cenas e a fragmentação de screenshots foram retiradas. A direção atual usa capturas inteiras e ambientes de produto integrados à página, com interações locais de agenda, leitura e compra. O detalhamento atualizado está em [Ambientes de produto](../immersive-product-environments.md). O storyboard abaixo registra a proposta original; os efeitos de fragmentação e transferência descritos nele foram substituídos por essa revisão.

## Intenção

A pessoa deve perceber peças chegando, se conectando, formando uma interface utilizável e depois se reorganizando para dar origem à próxima cena. A construção precisa acontecer dentro da área que ela está olhando, e continuar ao navegar, abrir projetos e voltar.

Leitura de direção: portfólio autoral para recrutadores, times de produto e clientes, com composição editorial e construção espacial. ENERGY 3 / RHYTHM 3 / MOTION 3.

O motivo visual é a continuidade da estrutura: uma peça tem origem, trajetória, destino e função. Linhas são arestas e encaixes reais da composição. Screenshots são evidências do produto. A tipografia organiza o espaço e participa das mudanças de escala.

## Por que a tentativa atual ficou discreta

- `useAssembly.js` conclui a entrada entre o início da seção a 92% e a 24% da altura da janela. A composição tende a chegar pronta ao momento principal de leitura.
- `AssemblyPart` trata grupos inteiros como uma peça, com deslocamentos de 36 a 56 px e um recorte. O visitante vê uma revelação de conteúdo previamente montado.
- A mesma coreografia reaparece em várias seções, mesmo quando seus conteúdos pedem construções diferentes.
- As peças não sobrevivem à troca de seção ou rota. A próxima cena começa com uma estrutura independente.
- O mobile desativa a montagem inteira. A ideia precisa ter uma versão própria para toque.

## Contrato da experiência

1. A construção é visível enquanto a cena está em destaque. Deve ser possível parar em uma composição parcialmente montada e entender o que está acontecendo.
2. O scroll controla o avanço; a pessoa mantém rolagem nativa, teclado, trackpad e navegação por âncoras.
3. A montagem altera a organização percebida do espaço. Os deslocamentos principais atravessam uma fração relevante da tela, em vez de alguns pixels.
4. Depois de encaixar, o conteúdo permanece estável para leitura e uso.
5. Cada transição importante reaproveita uma estrutura da cena anterior.
6. Links de navegação, idioma e contato permanecem acessíveis desde o início. Uma interação nunca precisa esperar a coreografia terminar.
7. As dimensões finais ficam reservadas no documento. O efeito não provoca saltos de layout ou altera a rolagem acumulada.
8. Opacidade animada permanece específica de Experiência. A construção usa posição, profundidade, recorte e geometria.

## Storyboard da home

### 1. Chegada: uma estrutura começando a existir

O nome e a navegação estão acessíveis. Uma aresta atravessa a tela e encontra uma segunda aresta, estabelecendo os dois eixos da composição. Fragmentos da assinatura EF existente se deslocam de posições claramente separadas e formam a marca. A headline se organiza por linhas, com alinhamentos compartilhados com a estrutura.

As peças ganham presença com camadas de profundidade discretas: elementos podem vir de trás do plano principal, mas assentam retos e nítidos. A sequência inicial dura aproximadamente 600 ms; a transformação seguinte é controlada pelo scroll.

Ao começar a rolar, a coluna da assinatura se abre lateralmente. A headline se acomoda à nova largura enquanto o espaço recém-aberto recebe o contexto profissional. O visitante acompanha a construção de uma composição a partir da outra.

### 2. Abordagem para Experiência: o espaço ganha outra função

A divisória principal continua na tela e se estende para formar a estrutura da trajetória profissional. A passagem ao ambiente escuro acompanha a entrada de uma superfície contínua, em vez de uma troca instantânea de cor.

Os registros de experiência se montam como linhas de informação: primeiro o alinhamento e as separações, depois cargo, empresa e período. Há um intervalo amplo de leitura estável. Na saída, os textos terminam sua coreografia antes da passagem ao próximo ambiente, respeitando a solicitação anterior de uma pausa escura.

### 3. Experiência para Projetos: a estrutura recebe um produto

Uma das superfícies da trajetória cresce e se torna o plano de apresentação do primeiro produto. O índice se acomoda em uma lateral; o nome do projeto ocupa o espaço que acabou de abrir. A moldura do produto passa a ser construída a partir dessa superfície.

Este é o primeiro momento de continuidade forte: o visitante reconhece a origem do espaço que vai receber a aplicação.

### 4. Trato: a operação se encaixa

O painel é montado em regiões extraídas de capturas reais: navegação, área de trabalho e informação de apoio. Elas entram de direções diferentes e se unem em uma única tela íntegra. O conjunto final preserva a proporção da captura.

Depois do encaixe, a mesma superfície recebe as próximas telas da operação. O texto explica o que muda no fluxo. O visitante pode escolher uma etapa diretamente pelos controles existentes, sem perder sua posição ou aguardar uma animação obrigatória.

A borda de saída e parte da superfície permanecem como origem espacial do próximo projeto.

### 5. Opinioteca: do livro à conversa

A composição se reorganiza ao redor do conteúdo de leitura. Regiões reais do feed e do catálogo entram como partes conectadas; as capas e as pessoas mostradas vêm das próprias capturas existentes.

O elemento focal é a relação entre livro, avaliação e conversa. Ao avançar, o espaço do catálogo dá lugar ao feed e depois às mensagens dentro do mesmo quadro. Na etapa mobile, o enquadramento se ajusta a um plano vertical, mantendo a interface legível.

A montagem pode ocupar planos diferentes durante a transição, mas termina com uma evidência principal clara, sem uma colagem permanente de telas concorrentes.

### 6. Calmera: o catálogo toma forma

A superfície anterior se torna uma folha de catálogo. As colunas da captura entram separadas e encontram seus alinhamentos. O título, a imagem e a área de compra passam a formar a loja completa.

Depois, o quadro se reorganiza para conta, carrinho e coleções, conforme os assets reais disponíveis. As dimensões externas ficam estáveis durante toda a sequência.

O repositório não tem evidência visual suficiente para reconstruir uma interface de receitas, estoque ou custos. Esses temas permanecem na explicação textual até existirem capturas reais.

### 7. Outros trabalhos: um arquivo que se fecha

As superfícies dos produtos se acomodam em uma composição mais compacta e abrem espaço para Vwrks e os sistemas internos. Cada trabalho permanece acessível com navegação normal.

O trabalho interno da Texsa tem uma construção tipográfica própria: registros, relações e hierarquia de texto. Não haverá painéis ou métricas inventados para compensar a ausência de screenshots.

### 8. Encerramento: a última peça

A última superfície cresce e ocupa a área útil inteira da janela. A mensagem de contato se encaixa, a navegação secundária encontra o rodapé e o movimento principal termina.

O resultado comunica que a página chegou ao fim. Voltar ao topo percorre as transições inversas sem um reinício artificial ou um loader.

## Abrir um projeto também faz parte da construção

Ao clicar, o preview já visível expande da posição atual para o enquadramento da página interna. O título e a identificação acompanham a transformação. A página interna herda uma peça reconhecível da home e constrói sua descrição a partir dela.

A transição deve manter uma única representação visual principal da imagem, evitando a sobreposição com crossfade que contrariaria a direção aprovada.

Ao voltar pelo navegador, a home recupera posição, etapa e enquadramento do projeto. Ao acessar uma URL interna diretamente, a página monta a cena de entrada em seu próprio espaço, sem depender da visita à home.

### Identidades das páginas internas

| Projeto | Construção da página |
| --- | --- |
| Trato | A superfície operacional recebida da home se desdobra em contexto, fluxo e evidências do produto. |
| Opinioteca | A tela recebida organiza uma sequência centrada em descoberta, avaliação e conversa. |
| Calmera | O catálogo se transforma em uma sequência editorial de loja e rotina de compra. |
| Vwrks | Folhas do arquivo encontram seus alinhamentos e abrem espaço para os trabalhos do cliente. O ciclo pastel inferior e a navbar neutra são requisitos preservados. |
| Texsa | A hierarquia se constrói com texto e registros reais de atuação, sem interface fictícia. |

O fundo do Vwrks está estático no working tree atual. A implementação precisa recuperar o ciclo solicitado anteriormente, preservando a máscara inferior e o tratamento de movimento reduzido. Isso deve ser conciliado com o teste local que atualmente proíbe o nome desse ciclo.

## O que acontece enquanto a pessoa usa

| Ação | Resposta planejada |
| --- | --- |
| Rolar devagar | A posição do scroll expõe a construção intermediária de cada peça. |
| Parar | A suavização termina e as peças ficam onde estão; nada continua flutuando. |
| Voltar o scroll | A passagem entre ambientes se reverte espacialmente, mantendo a orientação. |
| Rolar rapidamente | A cena alcança o estado correspondente à posição atual; não enfileira todas as animações perdidas. |
| Clicar numa etapa | A evidência e sua explicação mudam juntas dentro de uma moldura estável. |
| Abrir projeto | O preview se torna a entrada da página interna. |
| Usar Voltar | A home recupera a posição e o estado anterior. |
| Pular pela navbar | A seção de destino fica utilizável imediatamente; a coreografia não impõe espera. |
| Trocar idioma | O texto se reorganiza usando suas medidas reais, sem repetir a construção inteira ou perder o lugar. |
| Navegar com Tab | O foco revela imediatamente o destino e seus ancestrais visuais. |

Pequenas respostas de hover podem reforçar encaixes e conexões já existentes. Elas são secundárias à construção e também precisam funcionar com foco de teclado. Não haverá cursor obrigatório, som automático ou instrução para arrastar sem função real.

## Ritmo e escala

Valores iniciais para o protótipo, sujeitos à avaliação visual:

- Deslocamentos principais entre 20% e 60% da dimensão disponível, com destino calculado a partir do layout real.
- De 4 a 10 peças relevantes por construção, em vez de dezenas de partículas decorativas.
- Cada capítulo começa com cerca de 30% a 40% de seu avanço dedicado à montagem visível, reserva pelo menos 40% à leitura e usa o trecho final para a passagem à cena seguinte.
- As passagens por clique duram aproximadamente 550 a 850 ms e podem ser interrompidas.
- Microinterações ficam aproximadamente entre 160 e 240 ms.
- Springs assentam sem quique exagerado ou atraso que afaste a interface da intenção de scroll.
- Cada ambiente tem uma transformação principal claramente reconhecível. Os elementos de apoio têm coreografia menor.

O tempo de leitura deve ser ajustado ao conteúdo, não a um número igual de telas de scroll para todo projeto.

## Mobile e movimento reduzido

Mobile terá uma construção própria: peças entram por trajetórias curtas dentro da largura da tela, a composição se organiza em um único eixo e o encaixe acontece enquanto o conteúdo está visível. A narrativa deve continuar perceptível sem depender de hover ou de vários planos de profundidade.

Uma pausa curta de montagem pode existir em cenas pontuais; a leitura longa segue em fluxo normal. A experiência não deve exigir vários gestos para descobrir a próxima informação.

Com `prefers-reduced-motion`, o conteúdo final aparece completo, com navegação e galerias funcionais. A direção visual permanece nos alinhamentos, proporções, linhas e paletas.

## Arquitetura proposta

### Coordenador de cenas

Um coordenador compartilha posição, direção de scroll, cena ativa e estado de navegação. Cada capítulo declara seus momentos: montar, usar, transferir e encerrar.

O avanço é representado por MotionValues; React recebe apenas mudanças discretas de estado. O movimento quadro a quadro não dispara renders da árvore inteira.

### Peças persistentes

Um registro de peças relaciona origem e destino de uma superfície. Uma camada visual temporária faz a passagem entre os dois espaços e rotas. As dimensões são medidas quando o layout muda, e não a cada evento de scroll.

O documento mantém lugares reservados para o conteúdo final. Duplicatas visuais de transição são `aria-hidden` e não contêm alvos interativos duplicados. No destino, o elemento semântico assume a representação final.

### Coreografias por conteúdo

Trato, Opinioteca, Calmera, Vwrks e Texsa compartilham o controle de cenas, mas cada um declara suas peças e trajetórias. Um wrapper genérico de reveal deixa de ser responsável pela identidade do projeto.

### Tecnologia

O protótipo deve usar React, Framer Motion, CSS 3D e SVG já compatíveis com a base atual. Motion cobre scroll e mudanças de geometria; SVG cobre traços que precisam ser desenhados. A profundidade inicial pode ser feita com planos DOM.

Three.js e React Three Fiber já estão declarados no projeto, mas só entram em uma etapa posterior caso o protótipo demonstre necessidade de volume ou material real que CSS não resolva. Nesse caso, usar um canvas compartilhado, carregamento sob demanda e renderização apenas enquanto houver movimento.

O vídeo é evidência do produto depois de montado. Não é necessário renderizar vídeos para simular a construção da própria página.

## Escopo dos arquivos

- `App.jsx`: coordenador compartilhado e continuidade entre rotas.
- `About.jsx`: abertura, assinatura e primeira transformação espacial.
- `Experience.jsx`: montagem da trajetória, leitura estável e transferência da superfície.
- `ProjectCard.jsx`: composição própria de cada produto, com pontos de transferência.
- `StoryFilm.jsx`: associação entre evidência, etapa e estado de mídia.
- `CaseMotion.jsx`: substituir a responsabilidade de revelar blocos pela de compor e transferir peças.
- `ProjectPage.jsx`: entrada por preview, entrada direta e restauração ao voltar.
- `Header.jsx` e `Footer.jsx`: navegação acessível durante o processo e encerramento completo.
- `index.css`: geometria estável, planos de profundidade, versão mobile e movimento reduzido.
- Novos módulos devem separar coordenação, medição e desenho das peças para não transformar os componentes de conteúdo em controladores de animação.

## Ordem de execução

### Etapa 1: demonstrar a ideia com uma sequência completa

Implementar abertura, passagem para Experiência e entrada do Trato, incluindo ida e volta pelo scroll. Acrescentar uma abertura de projeto com continuidade do preview. Criar também a composição equivalente no mobile.

Esta etapa precisa mostrar o conceito completo antes de espalhar qualquer mecanismo pelo restante do site.

### Etapa 2: avaliar movimento real

Gravar a sequência em navegador e capturar estados de construção, leitura e transferência. Verificar rolagem lenta, rápida, reversa, âncoras e interrupção por clique. Conferir perda de quadros e dimensões em desktop curto, desktop amplo e telefone.

O critério de avanço é reconhecer a transformação do espaço sem precisar explicar onde olhar. Um build verde não substitui essa avaliação.

### Etapa 3: compor os outros produtos

Desenhar e implementar a coreografia específica da Opinioteca e do Calmera, depois Vwrks e Texsa. Aproveitar os vídeos reais quando estiverem disponíveis, com fallback em capturas existentes.

### Etapa 4: fechar continuidade e qualidade

Conferir páginas internas, retorno de navegação, troca de idioma, carregamento de mídia, redimensionamento, teclado e movimento reduzido. Só então consolidar testes, build e publicação.

## Critérios de aceite

- Em uma gravação, é visível que a interface se forma durante a visita, e não apenas antes de entrar na janela.
- Pelo menos três passagens principais reaproveitam estruturas reconhecíveis da cena anterior.
- Há um estado intermediário deliberado e um estado final utilizável em cada construção.
- A pessoa consegue interromper, voltar ou pular uma sequência sem perder orientação ou acesso ao conteúdo.
- O preview clicado tem continuidade visual com a página do projeto, incluindo o retorno.
- Nenhuma imagem estica, escapa da moldura ou revela um vazio entre estados.
- O conteúdo não se move durante o intervalo reservado à leitura.
- Inglês permanece como padrão e Português preserva a mesma experiência.
- O background solicitado do Vwrks e a navbar neutra passam por verificação específica.
- Mobile conserva o conceito; movimento reduzido conserva o conteúdo e os controles.
- O alvo é fluidez próxima à taxa de atualização dos dispositivos usados na validação, registrada por medição; não é uma promessa de 60 fps sem teste.
- Apenas a cena atual e a adjacente fazem trabalho de animação relevante. Mídia e camadas fora de uso são suspensas ou liberadas.
- Nenhuma etapa é declarada visualmente concluída sem execução em navegador.

## Referências técnicas verificadas

- [Motion: animações ligadas ao scroll](https://motion.dev/docs/react-scroll-animations).
- [Motion: animação de layout e elementos compartilhados](https://motion.dev/docs/react-layout-animations).
- [React Three Fiber: renderização sob demanda e desempenho](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

Estas fontes sustentam as escolhas de implementação. A direção visual acima é uma proposta específica para o portfólio.

## Registro da implementação

- Coordenador de scroll compartilhado, fases de montagem/leitura/transferência e medição por resize/fontes.
- Superfícies persistentes entre abertura, Experiência, três produtos, arquivo e encerramento.
- Assinatura EF em três fragmentos e capturas reais em regiões próprias de cada produto, com movimento em profundidade e encaixes de grande escala.
- Abertura do projeto a partir do preview, restauração da posição pelo histórico e tratamento de cliques modificados.
- Montagem reduzida à largura disponível no mobile, conteúdo completo com movimento reduzido e desbloqueio visual por foco.
- Ciclo pastel inferior do Vwrks recuperado, com redução de movimento respeitada.
- Migração autorizada para `motion/react` 13.1.1. Manifesto e lockfile gerados pelo pnpm; pacotes locais verificados com React 18.3.1 porque o registry está inacessível neste ambiente.
- Testes de fases, leitura, navegação e enquadramento, lint e build executados.
- Smoke de renderização executado para a home e as cinco rotas de projeto via esbuild/React SSR, confirmando providers, hooks e composição sem erro de inicialização. Isso não valida a animação em navegador.
- Não foi possível gravar nem aprovar o comportamento visual: o sandbox bloqueia sockets de servidor/navegador. A validação web de produção passa, mas a avaliação gráfica permanece pendente.
- Nenhum deploy faz parte desta implementação enquanto a avaliação visual estiver pendente.
