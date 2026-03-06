# streaming-ab-test

Teste A/B entre dois nomes/layouts para um guia de streaming brasileiro.

## Estrutura

```
streaming-ab-test/
├── controle-tv/
│   ├── index.html          ← site controle.tv (dark mode)
│   └── functions/
│       └── tmdb.js         ← proxy da API do TMDb
├── streamfinder/
│   ├── index.html          ← site StreamFinder (light mode)
│   └── functions/
│       └── tmdb.js         ← proxy da API do TMDb
└── README.md
```

## Como funciona

Cada pasta é um projeto separado no Cloudflare Pages.
Quando você editar qualquer arquivo e salvar no GitHub,
o Cloudflare detecta a mudança e faz o deploy automaticamente.

## Variáveis de ambiente (Cloudflare)

Em cada projeto no Cloudflare Pages, adicionar:

| Variável     | Valor                    |
|---|---|
| TMDB_API_KEY | sua chave da API do TMDb |

## Analytics

- controle-tv  → GA4 G-5JT3DBY0SQ
- streamfinder → GA4 G-YZBXBK8Y43

## Como editar pelo GitHub (sem instalar nada)

1. Clica no arquivo (ex: controle-tv/index.html)
2. Clica no lápis ✏️ no canto superior direito
3. Faz a edição
4. Clica em "Commit changes"
5. Cloudflare faz o deploy em ~1 minuto automaticamente
