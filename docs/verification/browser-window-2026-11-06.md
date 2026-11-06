# Demos em uma janela de navegador

Referência do proprietário: captura fornecida nesta conversa, com uma janela de navegador apresentada dentro da página. O ajuste se limita à apresentação e ao uso das demos nos casos. A direção editorial, Urbanist e a paleta do portfólio permanecem.

## Implementação

- Uma moldura compartilhada contém aba, barra de endereço, controles e status. A elevação identifica a janela interativa e segue a referência; não foi adicionada aos demais componentes.
- Voltar e avançar operam sobre o histórico da demo, separado do histórico do portfólio. Uma nova página depois de voltar substitui o percurso à frente. As setas ficam desabilitadas quando não há destino.
- O endereço acompanha a página local. Reiniciar limpa dados e histórico daquele produto. Abrir site leva ao produto real em outra aba.
- A janela tem sua própria rolagem. Navegação e troca de etapas preservam a posição da página externa; os campos e telas continuam sendo os componentes copiados dos produtos.
- A barra de endereço ganha uma linha própria no celular. Na Calmera estreita, o cabeçalho reordena logo, ações e busca para evitar sobreposição.
- Diálogos das demos usam o modo não modal do Radix dentro da janela. Continuam acessíveis por teclado e mantêm sua saída, mas deixam os controles do navegador e do portfólio disponíveis. Os portais permanecem na fronteira de tema do produto.
- O fundo do Vwrks e a navbar principal permanecem com seus tratamentos anteriores. Não foram adicionadas capturas de abertura ou iframes.

Os arquivos em `upstream` permanecem intactos. Os quatro módulos de produto foram recompilados pelo script existente, com o contexto de navegação compartilhado.

## Verificação

O teste de regressão reproduziu a sobreposição do logo e da sacola da Calmera no viewport estreito antes da correção. Os testes de histórico cobrem retorno, avanço, substituição e descarte de destinos futuros.

O runner de navegador também verifica limites da janela, largura do conteúdo, scroll interno, controles da sacola, busca refletida no endereço, navegação local, reinício e preservação da posição externa. Mantém os percursos de motion, histórico do portfólio, menu, leitura e encerramento.

Resultados completos: [browser-window-2026-11-06.json](browser-window-2026-11-06.json).

Reprodução:

```sh
pnpm build
node scripts/review-motion.mjs
```

`MOTION_CASES` agora restringe também a geração das fixtures e dos perfis, evitando gerar os dezoito casos quando só um produto precisa de revisão. O bloqueio de HTTP local continua; os cenários usam componentes reais em bundles de arquivo no Firefox headless. Não representam validação em telefone físico ou medição de FPS.

## Gate antislop

- **R-03 / C-4 PASS no escopo exercitado:** janela, conteúdo e sacola contidos; logo e ações sem sobreposição na Calmera estreita. A revisão em dispositivo físico permanece pendente.
- **R-24 / R-26 / C-2 PASS:** histórico, reinício, endereço, abertura externa e interações dos produtos possuem destinos e comportamentos reais. Os círculos da moldura são decoração marcada com `aria-hidden`, sem botões falsos.
- **R-12 / R-19 / R-31 PASS:** sombra identifica a superfície do navegador; os controles usam respostas discretas, sem animar toda a superfície durante o uso dos portais.
- **R-25 / R-32 PASS no escopo alterado:** contraste dos textos novos conferido, controles com rótulos EN/PT e alvos de 44 px, região rolável acessível por teclado e movimento reduzido preservado.
- **R-29 / C-1 PASS:** a moldura usa o papel e a tinta existentes; produtos preservam temas e componentes próprios.
- **R-35 / R-36 / C-5 PASS:** execução e limites registrados no JSON; nenhuma promessa de desempenho físico foi inferida das capturas.

ENERGY 3 / RHYTHM 3 / MOTION 3 continuam sendo a direção do conjunto. Nesta superfície, a prioridade é manter o produto legível e utilizável dentro da composição.
