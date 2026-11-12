# DESIGN.md

## Direcao Visual

A Rucad deve parecer uma empresa de engenharia eletrica com presenca de campo, rigor tecnico e energia comercial.

O visual deve combinar:

- massas escuras em azul tecnico;
- amarelo eletrico como sinal de acao, energia e destaque;
- layouts com escala e assimetria controlada;
- imagens reais de obra, rede, subestacao, equipe, frota, planta e instrumentos quando estiverem disponiveis;
- interfaces densas o suficiente para parecerem tecnicas, mas claras o bastante para vender.

Evitar aparencia de template SaaS generico, cartao branco repetido, landing page decorativa ou institucional antigo.

## Paleta

Tokens atuais em `app/globals.css`:

- Azul principal: `--brand-primary`, `--blue-800`, `#062141`
- Azul escuro: `--blue-900`, `#020913`
- Amarelo principal: `--brand-secondary`, `--yellow-300`, `#FDF24E`
- Cinzas: escala `--gray-*`
- Fundo claro atual: `#ffffff`

Uso recomendado:

- Azul escuro para hero, rodape, blocos bento, secoes de autoridade e CTAs tecnicos.
- Amarelo para CTA, marcador, pequenos pontos de energia, numero, hover e um ou outro bloco de destaque.
- Branco/off-white para paginas longas e respiro de leitura.
- Ciano claro pode aparecer como apoio visual em diagramas ou glows, mas nao deve virar nova identidade principal.

Regras:

- Nao usar vermelho como cor de interface ou alerta visual de marca.
- Nao deixar o site dominado por uma unica familia de azuis em todas as secoes, variar claro/escuro e usar amarelo com intencao.
- Evitar gradientes decorativos genericos. Se houver gradiente, deve parecer luz, energia, fotografia ou profundidade tecnica.
- Amarelo em grande area so quando for intencional e raro, como card de destaque.

## Tipografia

Fontes atuais:

- Headings: Anek Latin via `--font-heading`
- Corpo: DM Sans via `--font-body`

Direcao:

- Titulos grandes, pesados e diretos.
- Corpo com leitura facil, sem texto excessivamente pequeno.
- Em componentes compactos, reduzir escala e manter line-height confortavel.
- Evitar uppercase em textos longos. Usar uppercase apenas em labels curtos.
- Nao usar tracking negativo.

## Layout

Principios:

- Usar grids assimetricos quando isso ajudar a criar hierarquia.
- Evitar grades de cards identicos para conteudo importante.
- Cards so devem existir quando forem unidades clicaveis ou agrupamentos reais.
- Nao colocar card dentro de card.
- Dar respiro entre secoes, mas manter densidade nas paginas de servico.
- Em mobile, empilhar com margens generosas e evitar texto comprimido.

Padroes atuais importantes:

- `--wrap: 1200px`
- `--gutter: 24px`, com ajuste mobile para 20px
- breakpoint principal: `860px`
- cards podem usar raio maior quando forem bento ou imagem-led; botoes mantem formato pill.

## Componentes

### Hero

Home:

- Hero deve ser forte, com imagem ou fundo visual real.
- H1 deve ser visivel imediatamente no HTML inicial.
- Nao aplicar reveal/animacao que atrase LCP.
- CTA principal: WhatsApp.

Paginas internas:

- Hero pode usar fundo azul solido enquanto imagens finais nao existirem.
- Quando forem criadas imagens por pagina, substituir com midia otimizada e prioridade adequada somente quando estiver acima da dobra.

### Servicos

Bento grid minimalista e uniforme (`ServicesGrid` + `ServiceCard`).

- Hierarquia so pela area: primeira linha 7/5 colunas, segunda linha 4/4/4. Tablet 2 colunas com o primeiro card em largura total; mobile 1 coluna.
- Todos os cards com o mesmo tratamento: fundo branco-azulado (#EDF2F8), modelo 3D no topo, numero em azul, titulo, resumo e seta circular no canto superior direito.
- Modelos 3D procedurais em wireframe (`ServiceModel` + `lib/three/service-models.ts`): superficie clara, malha azul-escura (#0D1F38) desenhada no shader e contorno nas arestas. Um objeto por servico: galpao com SPDA, painel de media tensao com instrumento de ensaio, poste com cruzeta e transformador, medidor de energia inteligente, mesas fotovoltaicas.
- Interacao: giro lento continuo + inclinacao seguindo o cursor dentro do card. Sem arrastar, para nao competir com o clique do link. Com reduced motion, o giro para.
- Performance: three.js so e baixado quando a grid se aproxima da tela; o loop para fora da tela e com a aba oculta. Sem WebGL, o card fica so com o fundo liso.
- Hover (no touch: card na faixa central da tela): para de girar, vai para vista isometrica quase ortografica, abre a vista explodida e pinta o elemento-chave de amarelo (para-raios, instrumento de ensaio, isoladores e condutores, visor do medidor, modulos).
- Paginas de servico: o mesmo modelo no lado direito do hero, tema escuro (superficie azul, linha azul-clara #A9CCF7) sobre degrade radial do azul do hero para um azul mais claro.
- Amarelo so como sinal: seta no hover e elemento-chave.

### Conteudos Relacionados

Artigos tecnicos devem aparecer relacionados nas paginas de servico.

Nao e necessario colocar artigos no menu principal nesta fase. Links contextuais em servicos tendem a ser mais uteis para usuario e SEO, desde que sejam claros e indexaveis.

### Stats

Stats devem funcionar como prova concreta.

Usar apenas dados validados. Numeros atuais:

- 1.405 postes implantados em campo
- 93,37 km de rede eletrica executada
- 4.695 kVA de potencia instalada para operacao

Manter animacao de contagem, respeitando `prefers-reduced-motion`.

## Imagens

Preferencia futura:

- equipe em campo;
- redes de baixa e media tensao;
- subestacoes;
- usinas fotovoltaicas;
- instrumentos e laudos;
- frota, equipamentos e cenas reais de obra.

Regras:

- Imagens devem revelar o servico real, nao apenas textura atmosferica.
- Evitar foto escura demais, borrada ou cortada sem informacao.
- Otimizar antes de publicar. Hero mobile deve ter arquivo proprio quando necessario.
- Usar `alt` descritivo quando a imagem tiver informacao. Imagens puramente decorativas podem ter `alt=""`.

## Movimento

Movimento deve reforcar energia e precisao, nao atrapalhar performance.

Permitido:

- contagem de stats;
- hover discreto;
- menu mobile;
- FAQ/acordeao;
- pequenos movimentos em transform/opacity.

Evitar:

- animacoes que escondem H1 ou texto principal ate JS carregar;
- dependencias pesadas no caminho inicial;
- scroll effects que prejudiquem Lighthouse ou mobile;
- animar layout properties.

## SEO, Performance E Acessibilidade Visual

- Manter conteudo principal visivel sem JS.
- Evitar strokes claros em excesso em cards grandes.
- Garantir contraste em texto sobre amarelo e azul.
- Todo link visual deve ter texto legivel e area clicavel confortavel.
- Nao usar imagem gigante em PNG no hero.
- Preferir assets responsivos: desktop e mobile quando necessario.
- Revalidar Lighthouse depois de mudancas visuais grandes.

## Linguagem Visual A Evitar

- Grid uniforme de cards brancos com borda cinza para tudo.
- Gradiente roxo/azul de SaaS generico.
- Hero com texto dentro de card.
- Icones grandes e redondos repetidos acima de cada titulo.
- Efeito vidro/glassmorphism decorativo.
- Ilustracoes SVG genericas de energia.
- Texto explicando como usar a interface.

## Checklist Antes De Fechar Uma Mudanca Visual

- A secao ainda comunica claramente o servico ou beneficio?
- O componente continua bom em mobile?
- O texto cabe sem sobrepor ou estourar?
- O clique/link principal continua obvio?
- O HTML continua indexavel?
- A mudanca nao piorou LCP, CLS ou contraste?
- O visual parece Rucad, nao um template generico?
