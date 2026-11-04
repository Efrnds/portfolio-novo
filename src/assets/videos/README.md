# Guia de gravação dos filmes de produto

O portfólio encontra automaticamente estes arquivos nesta pasta:

- `trato.mp4` ou `trato.webm`
- `opinioteca.mp4` ou `opinioteca.webm`
- `calmera-os.mp4` ou `calmera-os.webm`

Não é necessário alterar o componente. Depois de adicionar o arquivo, reinicie o Vite ou gere um novo build.

## Padrão comum

- Duração: 45 a 60 segundos.
- Formato de gravação: 16:9, preferencialmente 2560x1440 ou 1920x1080.
- Taxa: 60 fps durante a captura e 30 ou 60 fps na exportação.
- Navegador: zoom em 100%, sem barra de favoritos, notificações ou extensões visíveis.
- Conteúdo: dados reais anonimizados ou uma base demonstrativa coerente. Nunca grave clientes, e-mails, telefones ou valores sensíveis.
- Cursor: movimento curto e deliberado. Pare por 1 a 2 segundos antes de cada clique.
- Ritmo: cada tomada deve mostrar uma decisão ou mudança de estado. Evite navegar sem objetivo.
- Áudio: não é necessário. O filme toca sem som no portfólio.
- Início e final: reserve 1 segundo de imagem estável em cada ponta. Não finalize em tela preta.

## Trato, roteiro de 50 segundos

1. `00:00–00:05`: abra na visão do dia e deixe agenda, caixa e contexto operacional legíveis.
2. `00:05–00:17`: crie ou abra um agendamento e mostre como cliente, horário e serviço entram no fluxo.
3. `00:17–00:28`: passe pelo histórico do cliente ou por uma assinatura recorrente.
4. `00:28–00:40`: mostre relatório ou financeiro respondendo a uma pergunta concreta do proprietário.
5. `00:40–00:50`: feche em estoque ou na experiência mobile, conectando operação e continuidade.

## Opinioteca, roteiro de 50 segundos

1. `00:00–00:06`: comece no feed com atividade de leitura realista e coerente.
2. `00:06–00:17`: encontre um livro pela descoberta e abra sua página.
3. `00:17–00:29`: adicione à estante, registre progresso ou publique uma avaliação.
4. `00:29–00:41`: entre em uma conversa e mostre uma mensagem chegando em tempo real.
5. `00:41–00:50`: termine no perfil ou na versão mobile, mostrando a leitura como identidade acumulada.

## Calmera OS, roteiro de 50 segundos

1. `00:00–00:07`: abra a loja com um produto e sua apresentação final.
2. `00:07–00:17`: faça a passagem da loja para materiais e receita no backoffice.
3. `00:17–00:29`: registre ou abra um lote e mostre o impacto no estoque.
4. `00:29–00:41`: mostre pedido, venda, despesa ou posição de caixa conectada à produção.
5. `00:41–00:50`: gere um orçamento ou cartão de cuidados e feche na vela pronta.

## Exportação recomendada

MP4 com H.264 é o formato principal. Use `faststart` para o vídeo começar antes do download completo.

```bash
ffmpeg -i gravacao.mov -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart trato.mp4
```

Troque o nome final para o produto correspondente. Se quiser oferecer WebM junto, mantenha os dois arquivos com o mesmo nome base; o navegador escolherá o formato compatível.
