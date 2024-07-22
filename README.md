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
- [x] Separar zoom preview da escala em tikzpicture.
- 3D?
- [x] Salvar imagem em svg.
- [x] Modal configurações e sobre.
- [ ] Ferramenta mover pontos apenas quando selecionada.
- [ ] Selecionar somente múltiplas entidades quando pressionada a tecla shift ou selecionada ferramenta de selecção múiltipla. Customizações em cor e contorno com caixa de seleção "aplicar a todos" e uma divisória mais visível na UI.
- [ ] Menu para adicionar eixos, e customizá-los, incluindo grid.
- [x] Adicionar acessibilidade aos botões.
- [ ] Caixa de seleção para adicionar preenchimento de um círculo, ao invés de utilizar opacidade 0 como default.
- [ ] Opção refinar posicionamento de etiquetas em ângulos.
- [x] Quando limpar a tela de todas as entidades, resetar os contadores de id.
- [ ] Salvar templates customizáveis em Presets.
- [x] Arcos de circunferência.
- [x] Formatar auto etiquetas.
- [ ] usar zod para descrever tipos das diferentes configs e gerar um componente melhor para alterar as configs ("settings").

### Bugs

- [ ] Na ferramenta Inserir Ponto em Segmento, quando selecionada distância 'd' aparece espaço em branco em baixo da página.
- [-] Quando movido ponto, mover também círculos, segmentos e polígonos que utilizam esse ponto.
- [ ] Marcadores em segmentos não funcionando em código tikz. Posicionamento errado e palavra chave "solid" entre aspas.
- [x] transferir layout shadcn para mais acessibilidade.
- [x] Paginator está dentro de AccordionTrigger, o que causa button as a descendant of button.
- [x] Adicionar ponto remove um ponto antigo.
- [ ] (?) Quando ponto é movido de forma aproximadamente colinear a outro, as dimensões do svg explodem naquela direção.

### Blog

#### 1. O problema de atributos dinâmicos

Certas entidades tem atributos que são dinâmicos calculados a partir de outras entidades (por exemplo o tamanho de um segmento é calculado como a distância entre os pontos de suas extremidades, ou o centro de um círculo calculado como o círculo formado entre três pontos), mas não se pode salvar atributos de entidades como funções em Zustand. Logo, é preciso recalcular esses atributos todas as vezes que as entidades os quais dependem sofrem alguma alteração.

#### 2. A solução

A solução é simples: salvar algum métodos comuns que fazem os cálculos e atualizam esses atributos dinâmicos por fora de Zustand, e salvar no estado de Zustand, ou seja, em cada entidade que contenha esses atributos, um identificador do método utilizado e os argumentos a serem utilizados, e então chamar esses métodos toda vez que as dependências desses atributos forem modificadas. 

Como chamar esse **re**cálculo? Toda vez que uma entidade for modificada:

1. um loop entre as entidades, buscando as que possuem essa entidade como dependências. (Ler observações abaixo.) 
2. identificar e executar os métodos, e salvar as novas entidades geradas a partir dos cálculos.
3. fazer um update na store de um pacote com todas as entidades atualizadas.

#### Observações

Poderíamos salvar em cada entidade uma lista de entidades que devem ser recalculadas a partir dela, ou seja, salvar uma dependência inversa. Porém, isso envolveria atualizar essa lista toda vez que uma nova entidade que a referenciasse fosse criada. Um método específico para isso deveria ser criado na store. 

Salvaríamos no estado da store uma lista de dependências (adjacência, em grafos), de forma a otimizar essa busca. 

Assim, teríamos na store um método chamado 'recalculate'. Esse método seria chamado toda vez que o método 'update' fosse chamado, receberia como argumento a entidade que foi modificada (utilizando a lista de adjacência para identificar se e quais outras entidades têm essa como dependência) e retornaria todas as entidades que foram utilizadas.

Por fim, o método update setaria todas essas novas entidades.

O método 'update' também pode ser chamado com um array de entidades novas, que só é utilizada ao criar múltiplos pontos em AddPointInput; ao criar novas entidades, o método 'recalculate' não deveria ser executado, portanto há de haver uma distinção entre essas duas coisas.

 