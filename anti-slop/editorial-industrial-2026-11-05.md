# Revisão editorial-industrial

Direção: `docs/plans/editorial-industrial.md`.

Brief: portfólio de engenharia full-stack e operações, com linguagem editorial-industrial e sistemas que chegaram ao trabalho real. ENERGY 3 / RHYTHM 3 / MOTION 3.

## Preferências aplicadas durante a execução

- Paleta anterior preservada: papel `#ECE9DF`, tinta `#11120F`, acento `#F05A3F`. As cores dos três produtos seguem a implementação anterior.
- Urbanist existente, com títulos em peso 400. A preferência foi reafirmada pelo proprietário durante a revisão.
- A miniatura dentro do título foi rejeitada e removida. A abertura relaciona título e apresentação profissional, sem imagem.
- Inglês padrão e português disponíveis. Navegação na ordem Projetos, Operação, Sobre e Contato.
- Fundo animado do Vwrks preservado na parte inferior, com navbar neutra.
- Opacidade coreografada reservada à seção de Operação/Experiência.

## Decisões e propósito

| Decisão | Propósito |
| --- | --- |
| Título e apresentação em duas colunas | Explicar o posicionamento e a responsabilidade profissional na primeira tela. No celular, os dois blocos seguem a ordem de leitura. |
| Projetos antes do histórico | Dar acesso às evidências do trabalho antes da explicação do percurso profissional. |
| Capturas inteiras em proporção fixa | Mostrar interfaces sem fragmentação, sobreposição sobre o texto ou alterações na altura do conteúdo durante a troca. |
| Duas telas por produto, com controles | Demonstrar dois contextos reais do produto no mesmo enquadramento. O scroll acompanha a troca no desktop; controles funcionam também no celular e com movimento reduzido. |
| Composição própria por produto | Agenda e gestão no Trato; capas e rede social na Opinioteca; fotos de velas e relação entre loja e produção no Calmera. |
| Créditos e responsabilidades junto à mídia | Distinguir o que o produto faz do papel de Eduardo na sua construção. |
| Capa do caso em fluxo normal | Aproximar a apresentação do ambiente utilizável, retirando a espera de uma capa presa por duas telas. |
| Encerramento com altura da área visível | Tornar o fim do percurso claro e manter contato e links acessíveis. |

## Evidência de verificação

- Lint e build executados com sucesso; dependências não foram alteradas.
- Suíte de testes cobre destinos da navegação, ordem das seções, conteúdo bilíngue, existência da mídia, integridade de capturas e as regras dos ambientes interativos.
- Os antigos testes que exigiam strings de CSS e a composição anterior foram substituídos por verificações da navegação e do HTML renderizado.
- Capturas de layout geradas em navegador headless a partir dos componentes reais, com fontes e imagens locais. A revisão incluiu abertura desktop e mobile, Trato desktop, Opinioteca mobile e Calmera desktop. A abertura foi capturada novamente depois da correção de identidade.
- Uma página temporária executou os componentes React reais no navegador com MemoryRouter: troca EN/PT, retorno a EN, troca das duas telas dos três projetos no mobile, abertura e fechamento do menu, largura do título e ausência de overflow na home. As verificações passaram em 320×720, 390×844 e 1440×1000.

Artefatos locais: `/tmp/portfolio-editorial-review`. As capturas `revised-desktop.png` e `revised-mobile.png` mostram a abertura revisada; `runtime-desktop.png` e `runtime-mobile.png` incluem o resultado das verificações temporárias.

Limite: o ambiente bloqueia o servidor HTTP local. As verificações no navegador usaram arquivos locais e um pacote temporário dos componentes. Elas não equivalem a testar os caminhos BrowserRouter servidos por HTTP, a transferência entre rotas ou medir a fluidez do scroll em tempo real. Nenhuma aprovação de FPS ou de MotionScore é declarada.

## Correção das demos com as telas originais

As demos recriadas foram removidas. Os casos agora usam os componentes dos próprios produtos: agendamento do Trato; navegação, feed, avaliações e comentários da Opinioteca; catálogo e sacola da Calmera; trabalho, sobre e galeria do Vwrks. A comparação em bytes confirmou 51 arquivos copiados sem alteração. Os adaptadores, dados locais e limites estão em `src/product-slices/README.md`.

Os estilos originais ficam em ShadowRoots. Fontes e assets são locais; Montserrat e Libre Baskerville foram obtidas do repositório oficial Google Fonts, com licenças OFL e verificação dos hashes dos arquivos. O fundo do Vwrks continua animado e sua navegação não modifica a navbar do portfólio.

A revisão em navegador incluiu oito cenários dos quatro produtos, com áreas visíveis de 1246×984 e 306×984. Foram verificadas ações reais, busca, contador de comentários, geometria, imagens carregadas e isolamento de estilos. Os testes detectaram e acompanharam a correção do logo ampliado da Calmera, do alinhamento da busca, da altura do Vwrks e da posição do botão do Trato no celular. O resultado resumido está em `docs/verification/product-slices-2026-11-05.json`; os arquivos completos e capturas estão em `/tmp/product-slice-review`.

Lint, os nove arquivos de testes e o build passaram após a integração. Esses resultados não representam uma auditoria de dependências dos módulos vendorizados nem uma medição de FPS. A limitação do servidor HTTP local continua a mesma.
