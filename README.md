# Huit regards

Une expérimentation artistique et cartographique.

J’ai voulu traduire en styles JSON ce que la peinture pouvait apporter à la cartographie : les bleus de Klein, les noirs de Soulages, les formes de Kandinsky, les couleurs de Klee, Matisse, Monet, Niki de Saint Phalle et Hundertwasser.

L’idée était de voir comment ces univers pouvaient se déployer dans l’espace. Ce que ça donne sur une rue, un quartier, puis en prenant un peu de recul. Avec pas mal d’allers-retours sur les couleurs, les contours et les changements d’échelle !

J’ai commencé par Lille, mais vous pouvez vous déplacer ailleurs. Derrière les images, ce sont bien les données OpenStreetMap, diffusées par OpenFreeMap et affichées avec MapLibre.

Vous trouverez ici les huit interprétations, les cartes à explorer et les JSON pour les reprendre.

**Conception : Joe-Ann Ball**

[Explorer la carte](https://joe59260.github.io/huit-regards/) 

## Klein

Du bleu, et encore du bleu. Le travail s’est surtout joué dans les nuances, pour garder du relief.

[Voir la carte](https://joe59260.github.io/huit-regards/?style=klein&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/klein.json) · [Fichier source](styles/klein.json)

## Soulages

Trouver des variations dans le noir, sans que tout devienne gris… ni qu’on ne voie plus rien. Un équilibre qui a demandé quelques essais ( 18 en tout ! )

[Voir la carte](https://joe59260.github.io/huit-regards/?style=soulages&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/soulages.json) · [Fichier source](styles/soulages.json)

## Kandinsky

Des aplats, du jaune, du rouge, des traits noirs et des formes géométriques. Le plus compliqué est de garder cette composition en dézoomant, sans se retrouver avec de gros cercles partout.

[Voir la carte](https://joe59260.github.io/huit-regards/?style=kandinsky&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/kandinsky.json) · [Fichier source](styles/kandinsky.json)

## Klee

Des ocres, de la terre cuite, du vieux rose, du turquoise et des verts plus profonds. Comme dans la peinture.

[Voir la carte](https://joe59260.github.io/huit-regards/?style=klee&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/klee.json) · [Fichier source](styles/klee.json)

## Matisse

Une recherche autour des papiers découpés : des couleurs franches et des séparations lisibles, en essayant de retrouver quelque chose de l'assemblage propre à Matisse dans la carte.

[Voir la carte](https://joe59260.github.io/huit-regards/?style=matisse&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/matisse.json) · [Fichier source](styles/matisse.json)

## Monet

Une version proche de l'impressionisme et des tons pastel : vert eau,  mauve et moins de contours. Une autre façon de faire apparaître les bâtiments et la végétation.

[Voir la carte](https://joe59260.github.io/huit-regards/?style=monet&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/monet.json) · [Fichier source](styles/monet.json)

## Niki de Saint Phalle

Des couleurs vives, des contours noirs et des repères ronds. Ici, j’avais envie de quelque chose de plus joyeux et contrasté à l'image des grosses nanas dont elle avait le secret.

[Voir la carte](https://joe59260.github.io/huit-regards/?style=niki-de-saint-phalle&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/niki-de-saint-phalle.json) · [Fichier source](styles/niki-de-saint-phalle.json)

## Hundertwasser

J'aime la manière dont il représente la ville donc c'était une évidence de le voir ici mais la couleur seule ne suffisait pas : il fallait aussi travailler les motifs.

[Voir la carte](https://joe59260.github.io/huit-regards/?style=hundertwasser&lieu=lille) · [JSON du style](https://joe59260.github.io/huit-regards/styles/hundertwasser.json) · [Fichier source](styles/hundertwasser.json)

## Explorer, télécharger, reprendre

Sur la carte, vous pouvez choisir un artiste, changer de ville et vous déplacer librement.

Les liens du menu permettent de récupérer le JSON, de télécharger une image JPEG du cadrage affiché ou de copier le lien vers votre vue.

Les huit JSON sont dans le dossier `styles/`. Pour en utiliser un dans une carte MapLibre :

```js
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://joe59260.github.io/huit-regards/styles/hundertwasser.json',
  center: [3.052, 50.641],
  zoom: 14.1
});
```

Petite particularité pour Hundertwasser : ses motifs sont dans le dossier `sprites/`. Le JSON utilise ces images, iil faut donc les télécharger si besoin. 

## Crédits

Conception : moi meme ( joe-ann ) 

Données © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), tuiles [OpenFreeMap](https://openfreemap.org/), affichage [MapLibre](https://maplibre.org/). 

Merci aux travaux partagés sur [geoservice-style](https://github.com/Viglino/geoservice-style), qui ont donné envie de tenter cette expérimentation.

Ces cartes sont des interprétations libres, sans lien avec les artistes ni leurs ayants droit.
