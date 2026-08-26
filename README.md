# Plano de Caminhada e Recuperação do Joelho — PWA

Aplicação Next.js (App Router) que renderiza um plano de treino a partir de um
arquivo Markdown local, com suporte completo a tabelas, imagens/GIFs, modo
escuro automático e funcionamento offline (PWA).

## 1. Inicializar o projeto

Se você está partindo do zero (em vez de usar os arquivos já fornecidos):

```bash
npx create-next-app@latest plano-treino-app --typescript --tailwind --app --src-dir=false --import-alias "@/*"
cd plano-treino-app
```

Depois, copie os arquivos deste pacote por cima da estrutura gerada.

## 2. Instalar as dependências exatas

```bash
npm install next@14.2.15 react@18.3.1 react-dom@18.3.1 react-markdown@9.0.1 remark-gfm@4.0.0 rehype-slug@6.0.0 @ducanh2912/next-pwa@10.2.9

npm install -D typescript@5.5.4 @types/node@20.14.15 @types/react@18.3.3 @types/react-dom@18.3.0 tailwindcss@3.4.7 @tailwindcss/typography@0.5.13 postcss@8.4.40 autoprefixer@10.4.19 eslint@8.57.0 eslint-config-next@14.2.15
```

Ou simplesmente:

```bash
npm install
```

(usando o `package.json` já incluído neste pacote).

## 3. Adicionar seu conteúdo real

Substitua o conteúdo de:

```
content/plano_caminhada_joelho.md
```

pelo seu arquivo real. Ele já suporta:
- Tabelas GFM (`| coluna | coluna |`)
- Imagens e GIFs: `![Descrição](caminho-ou-url-da-imagem.gif)`
- Citações `>`, listas, negrito, cabeçalhos `##`/`###`

Se as imagens forem locais, coloque-as em `public/images/` e referencie como
`![Descrição](/images/exercicio-1.gif)` no Markdown.

## 4. Rodar em desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000 — note que o Service Worker do PWA fica
**desabilitado em desenvolvimento** (comportamento padrão e recomendado do
`@ducanh2912/next-pwa`, configurado em `next.config.mjs`).

## 5. Gerar o build de produção (SSG + PWA ativo)

```bash
npm run build
npm run start
```

No build de produção, o `next-pwa` gera automaticamente:
- `public/sw.js` — o Service Worker
- `public/workbox-*.js` — runtime do Workbox

Esses arquivos cacheiam o HTML, JS/CSS e as imagens/GIFs do plano, permitindo
que o app abra instantaneamente mesmo sem internet (ex.: na academia).

## 6. Ícones do PWA

Este pacote já inclui ícones placeholder em `public/icons/`
(`icon-192x192.png`, `icon-512x512.png`, `icon-maskable-512x512.png`).
Substitua-os pela identidade visual real do seu app quando desejar — os
tamanhos e o `purpose: "maskable"` já seguem as recomendações do PWA.

## 7. Deploy

Qualquer plataforma que sirva Next.js funciona (Vercel é a mais simples):

```bash
npx vercel
```

Como a página usa `export const dynamic = "force-static"`, o HTML é gerado
estaticamente no build (SSG), garantindo carregamento instantâneo mesmo em
conexões ruins — e cache total via PWA quando totalmente offline.

## Estrutura de arquivos

```
plano-treino-app/
├── app/
│   ├── layout.tsx        # Metadados, manifest, tema, viewport
│   ├── page.tsx          # Rota principal "/", lê o Markdown (SSG)
│   └── globals.css       # Tailwind + estilos base do conteúdo
├── components/
│   ├── Header.tsx        # Cabeçalho com título e badge offline
│   ├── OfflineBadge.tsx  # Indicador visual online/offline (Client Component)
│   └── MarkdownRenderer.tsx # Renderização do Markdown com react-markdown
├── content/
│   └── plano_caminhada_joelho.md  # << substitua pelo seu conteúdo real
├── lib/
│   └── content.ts        # Leitura do .md em build time (fs)
├── public/
│   ├── manifest.json      # Manifesto do PWA
│   └── icons/             # Ícones do PWA
├── next.config.mjs        # Configuração do Next + next-pwa (cache offline)
├── tailwind.config.ts      # Dark mode automático ("media") + typography
└── package.json
```
