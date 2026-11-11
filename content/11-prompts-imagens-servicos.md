# Prompts de imagem dos serviços (ChatGPT)

Documento de trabalho. Prompts para gerar as 5 imagens dos cards de serviço, que também viram o fundo do hero de cada página de serviço e a imagem de compartilhamento (OG).

## Como usar

1. Abra um chat novo no ChatGPT e anexe `public/hero-bg.jpg` como referência de estilo.
2. Cole primeiro o **Bloco de estilo** e depois o prompt do serviço. Gere os 5 no mesmo chat para manter luz, paleta e tratamento consistentes.
3. Peça sempre formato horizontal 3:2 (1536 × 1024).
4. Salve cada arquivo em `public/servicos/` com o nome exato indicado (`<slug>.webp`; `.jpg` e `.png` também funcionam).
5. Rode o build. O site detecta a imagem sozinho e passa a usá-la no card, no hero da página e no OG. Nada mais precisa mudar no código.

Por que essas regras de composição: o texto do card fica no terço inferior, por cima de um degradê escuro, e a seta fica no canto superior direito. Por isso os prompts pedem o assunto principal no centro/terço superior e uma parte de baixo mais simples (chão, grama, piso). O recorte do card varia de quase quadrado (mobile) a bem horizontal (desktop), então o assunto precisa estar centralizado, sem nada importante nas bordas.

Peso: converter para WebP com largura de 1600 px e qualidade por volta de 80. O alvo é ficar abaixo de ~250 KB por imagem.

## Bloco de estilo (colar antes de cada prompt)

```
Style reference: the attached photo. Match its look.

Photorealistic documentary photography for a Brazilian electrical engineering company's website. Shot on a full-frame camera, 35mm lens, natural light at late afternoon golden hour, warm sunlight with deep navy-blue shadows. Setting: Mato Grosso do Sul, Brazil (cerrado vegetation, red soil, wide flat horizon, agro-industrial facilities). Workers wear correct, realistic PPE: white hard hats with chin straps, long-sleeve gray or navy work uniforms with reflective strips, safety boots, and dielectric gloves whenever near electrical equipment. People seen from behind or in three-quarter view, faces not the focus. Equipment looks real, clean and professional, never sci-fi.

Composition: horizontal 3:2. Main subject centered or in the upper two thirds. Keep the lower third visually simple and slightly darker (ground, grass, floor) because text will be placed over it. Nothing important near the edges, the image will be cropped to different ratios.

Do not include: any text, letters, numbers, logos, brand names, watermarks or signage; yellow brand-colored props; exaggerated sparks, lightning bolts or glowing effects; unsafe practices (bare hands on conductors, missing hard hats); cartoon, 3D render or illustration look; oversaturated HDR.
```

## 01 · Projeto Elétrico e SPDA

Arquivo: `public/servicos/projetos-eletricos-spda.webp`
Alt já cadastrado: "Engenheiro revisando projeto elétrico em frente a galpão industrial com sistema de proteção contra descargas atmosféricas"

```
An electrical engineer stands in front of a large modern industrial warehouse, holding a tablet that shows an electrical single-line diagram (lines only, no readable text). On the warehouse roof edge, a lightning protection system is clearly visible: air terminals (lightning rods) along the ridge connected by down conductors running down the facade to grounding points. A second person in PPE points toward the roof. Golden hour light grazing the metal facade, clear sky with a few clouds. Lower third: gravel and short grass in soft shadow.
```

## 02 · Ensaios, Comissionamento e Laudos Técnicos

Arquivo: `public/servicos/ensaios-comissionamento-laudos.webp`
Alt já cadastrado: "Técnico com EPI realizando ensaio elétrico em painel de média tensão"

```
Inside a clean industrial electrical room, a technician in full arc-flash PPE (hard hat with face shield raised, dielectric gloves, flame-resistant uniform) performs a test on a gray medium-voltage switchgear panel. A professional insulation resistance tester sits on a small cart with test leads properly connected to the open compartment. A second engineer holds a clipboard, observing. Warm late-afternoon light enters through a high side window, mixing with cool overhead light. Lower third: smooth concrete floor with subtle painted safety lines, in soft shadow.
```

## 03 · Construção e Manutenção de Redes Elétricas

Arquivo: `public/servicos/construcao-manutencao-redes.webp`
Alt já cadastrado: "Equipe com caminhão cesto construindo rede de distribuição de energia em estrada rural"

```
A line crew builds a medium-voltage overhead distribution line along a red-dirt rural road in Mato Grosso do Sul. A white utility bucket truck with its aerial basket raised next to a new concrete pole; one lineworker in the basket, fully harnessed, installing a crossarm with insulators. Two more workers on the ground with a reel of conductor. A row of newly installed concrete poles recedes toward the horizon across cerrado and pasture. Golden hour backlight, long shadows. Lower third: red dirt road and dry grass in shadow.
```

## 04 · Eficiência Energética

Arquivo: `public/servicos/eficiencia-energetica.webp`
Alt já cadastrado: "Engenheiro analisando dados de consumo de energia em painel elétrico industrial"

```
An engineer stands beside an open low-voltage distribution panel in an agro-industrial facility (grain dryer or cold storage plant visible through a large open door in the background). A portable power quality analyzer hangs inside the panel with flexible current probes clamped around the cables. The engineer holds a tablet showing an abstract consumption curve (shapes only, no readable numbers). Calm, analytical mood. Warm sunset light from the open door, the rest of the room in cool shade. Lower third: concrete floor in shadow.
```

## 05 · Usinas e Sistemas Fotovoltaicos (UFV)

Arquivo: `public/servicos/ufv-fotovoltaica.webp`
Alt já cadastrado: "Usina fotovoltaica de solo em área rural com técnicos fazendo inspeção"

```
A ground-mounted solar power plant on flat farmland in Mato Grosso do Sul: long, precise rows of photovoltaic panels on metal racks stretching toward the horizon, with cultivated fields and a few cerrado trees beyond. Two technicians in PPE walk between the rows, one checking a string combiner box with a multimeter, the other holding a tablet. Golden hour, sun low near the horizon reflecting softly on the panels, warm sky fading to blue. Lower third: trimmed grass between the rows, in shadow.
```

## Ajustes rápidos, se precisar

- Imagem muito "IA" (pele de plástico, brilho demais): "make it look like an unretouched editorial photo, natural skin texture, slight film grain, less contrast".
- Texto ou logo apareceu em alguma superfície: "remove all text, letters and logos from every surface".
- Ficou com cara de outro país: "make the landscape clearly Brazilian Midwest: red soil, cerrado shrubs, flat horizon".
- Para conferir consistência no fim: peça "show the five images side by side" e regenere a que destoar.

## Observação

São imagens geradas para ilustrar os serviços. Quando a Rucad tiver fotos reais de obra, equipe e frota, vale substituir (mesmo nome de arquivo), porque foto real passa mais confiança e o PRODUCT.md já lista isso como pendência.
