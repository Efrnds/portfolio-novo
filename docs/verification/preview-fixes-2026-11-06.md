# Carrinho, Plena e header

## Correções

- O header mostra apenas `ef.`, com os 32 px anteriores em desktop e celular. As regras `span:last-child` destinadas ao nome também estavam atingindo a marca depois da remoção do texto; essas regras foram removidas.
- Navegação principal e menu mobile seguem Work → About → Contact, com as traduções existentes. A seção de operações permanece no conteúdo, fora da navbar.
- O carrinho da Calmera agora fica ancorado à janela, mesmo depois de rolar o catálogo. A rolagem acontece dentro de `[data-browser-scroll]`; os portais são seus irmãos no ShadowRoot e usam a viewport externa estacionária como referência.
- O adaptador de imagens respeita `loading="eager"` quando solicitado pelo componente original. `SequenceImage` já fazia essa solicitação, mas o adaptador a sobrescrevia com lazy loading nos frames sem prioridade. Os cinco arquivos da Plena estavam presentes e decodificavam no disco.

Os componentes e arquivos de mídia originais não foram substituídos. Os módulos gerados foram recompilados.

## Regressões e validação

Antes da correção, abrir o carrinho com o catálogo rolado em 200 px posicionava sua parte superior em −23 px para uma viewport que começava em 177 px no cenário desktop. O teste equivalente também falhou no celular. Depois da separação entre rolagem e portais, a gaveta permanece contida na janela.

O teste usa pointerdown no campo e no botão de remoção, altera a quantidade para dois, confere o subtotal de R$ 99,98 e verifica o estado vazio após remover. A Plena é alcançada pela rolagem interna e seus cinco frames são decodificados sem o teste mudar sua política de carregamento.

Há regressões para o tamanho e a visibilidade da marca em todas as viewports, ordem da navbar, instruções EN/PT e preservação do carregamento solicitado pelas sequências originais. O histórico e as interações das demais demos continuam no runner completo.

Lint, testes Node, build e `git diff --check` executados. Resultados de navegador: [preview-fixes-2026-11-06.json](preview-fixes-2026-11-06.json). O ambiente continua limitado a bundles locais no Firefox headless, sem servidor HTTP ou telefone físico.

## Gate antislop

- **R-03 / C-4 PASS no escopo testado:** gaveta contida após rolagem; marca visível no tamanho original; mídia da Plena decodificada.
- **R-24 / R-26 / C-2 PASS:** ordem e destinos da navbar conferidos; quantidade, remoção, estado vazio e navegação exercitados.
- **R-19 / R-31 PASS:** a camada de portais permanece estacionária durante o uso; nenhum novo efeito visual foi introduzido para esconder o erro de posicionamento.
- **R-29 / C-1 PASS:** fontes, tamanho anterior da marca e fundos preservados.
- **R-35 / R-36 / C-5 PASS:** evidências e limitações registradas; a validação em fixtures não é apresentada como medição de desempenho em hardware real.
