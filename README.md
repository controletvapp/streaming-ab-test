# streaming-ab-test

Teste A/B entre dois nomes/layouts para um guia de streaming brasileiro.

## Estrutura

streaming-ab-test/
├── vou.buscar/
│   ├── index.html        ← site vou.buscar (dark mode)
│   └── functions/api/
│       └── tmdb.js       ← proxy da API do TMDb
├── catalogo.stream/
│   ├── index.html        ← site catálogo.stream (light mode)
│   └── functions/api/
│       └── tmdb.js       ← proxy da API do TMDb
└── README.md

## Como funciona

Cada pasta é um projeto independente no Cloudflare Pages.
Deploy automático a cada commit no `main`.
A chave da API do TMDb fica como secret no Cloudflare — nunca exposta no frontend.

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
