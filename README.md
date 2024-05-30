# GeoSimples: Criador de Figuras Geométricas

Simplicidade na criação de figuras geométricas. Desenhada para educadores (e por um educador), especialmente os criadores de conteúdo educativo, como materiais didáticos e testes.

## Fundamentos

- ### Facilidade e eficiência:
  Fácil e rápido de usar. Possui apenas as ferramentas essenciais de forma clara e intuitiva mas poderosas para a criação de uma ampla quantidade de ilustrações geométricas.
- ### Padronização e precisão visual:
  O uso de diferentes ferramentas para criação de figuras geométricas introduz ao estudante e ao criador de conteúdo uma complexidade extra, onde diferentes problemas ficam com identidades visuais dissonantes. Cada figura geométrica criada aqui é nítida e precisa, proporcionando aos leitores uma compreensão consistente de conceitos fundamentais da geometria.

---

# Trabalho em progresso:

- Criação de customização para segmentos e ângulos:
  1. [x] Estilo de traço.
  2. [x] Cor do traço.
  3. [x] (ângulos) preenchimento.
  4. [x] (ângulos) refinar posicionamento da etiqueta.
  5. [x] (segmentos) destaque um/dois/três tracinhos.
  6. [x] (segmentos) consertar destaques em segmos pontilhados ou traçejados. Separar path.
  7. [x] (ângulos) fazer com que laterais radias do ângulo possam ser ocultas (estético em relação a segmentos adjescentes não sólidos), para isso acrescentar mais dotstyles, com ou sem laterais.
  8. [x] (ângulos) consertar fill em ângulos de 90°.
  9. [x] (ângulos) consertar visibilidade de customização de 'marcas' para ângulos de 90°.
- [x] Customização de cor para ponto.
- [x] Consertar: Não é possível inserir uma tag na customização, apenas alterar se já existe uma.
- [ ] Selecionados um segmento e um ponto: criar altura (liga/desliga prolongar segmento) ou mediana.
- [ ] elecionado um ângulo: criar bissetriz.
- [ ] Selecionado um segmento: criar mediatriz.
- [x] Criar nova entidade: círculo.
- [x] Selecionados dois pontos: criar círculo centrado no primeiro e cujo raio é a distância entre os dois pontos.
- [x] Selecionados três pontos: criar círculo.
- [x] Selecionados ponto e um segmento: criar círculo centrado no ponto e tangente ao segmento.
- [x] ~~Selecionados três segmentos: Criar círculo tangente aos três segmentos. ~~ (não)
- [x] Customização de contornos.
- [x] Customização de Preenchimentos.
- [x] Criação de uma nova entidade: polígono, para preenchimento.
- [x] Colocar um setTimeOut para as mensagens de erro automaticamente esmaecerem (toast).
- [x] Tooptips.
- [ ] Presets:
  1. Triângulo retângulo:
     - Inscrito.
     - Cincunscrito.
     - Altura pela hipotenusa.
  2. Triângulo equilátero:
     - Inscrito.
     - Cincunscrito.
     - B.I.C.O.
  3. Hexágono:
     - Diagonais.
- Ferramenta rotacionar um grupo.
- [x] Ferramenta zoom.
- 3D?
- [x] Salvar imagem em svg.
- [x] Modal configurações e sobre.
- [ ] Ferramenta mover pontos apenas quando selecionada.
- [ ] Selecionar somente múltiplas entidades quando pressionada a tecla shift ou selecionada ferramenta de selecção múiltipla. Customizações em cor e contorno com caixa de seleção "aplicar a todos" e uma divisória mais visível na UI.
- [ ] Menu para adicionar eixos, e customizá-los, incluindo grid.
- [ ] Adicionar acessibilidade aos botões.
- [ ] Caixa de seleção para adicionar preenchimento de um círculo, ao invés de utilizar opacidade 0 como default.
- [ ] Opção refinar posicionamento de etiquetas em ângulos.
- [ ] Quando limpar a tela de todas as entidades, resetar os contadores de id.
- [ ] Salvar templates customizáveis em Presets.
- [x] Arcos de circunferência.

### Bugs

- [ ] Na ferramenta Inserir Ponto em Segmento, quando selecionada distância 'd' aparece espaço em branco em baixo da página.
- [ ] nos menus de selecionar cor, overflow não está como contain, e ao scrollar a na página inteira dá scroll.
- [ ] Quando movido ponto, mover também círculos, segmentos e polígonos que utilizam esse ponto.
