# Plano de Recuperação e Fortalecimento do Joelho — PWA

PWA construída com Next.js 14 (App Router) que exibe um plano de treino de **4 semanas** focado em recuperação de dores no joelho e emagrecimento. O conteúdo é renderizado a partir de um arquivo Markdown local e funciona completamente **offline**, ideal para uso na academia sem internet.

🔗 **Acesse a aplicação:** [plano-treino-app.vercel.app](https://plano-treino-app.vercel.app)

---

## O que o app faz

- Exibe o cronograma semanal (caminhada + circuito de fortalecimento com elásticos)
- Descreve cada exercício com foco, execução e cuidados pós-treino
- Funciona **offline** via Service Worker (PWA instalável no celular)
- Suporta **modo escuro automático** (via preferência do sistema)
- Carregamento instantâneo graças à geração estática (SSG)

---

## Stack

| Tecnologia              | Versão  | Papel                       |
| ----------------------- | ------- | --------------------------- |
| Next.js                 | 14.2.15 | Framework (App Router, SSG) |
| React                   | 18.3.1  | UI                          |
| TypeScript              | 5.5.4   | Tipagem estrita             |
| Tailwind CSS            | 3.4.7   | Estilização + modo escuro   |
| @tailwindcss/typography | 0.5.13  | Prose do Markdown           |
| react-markdown          | 9.0.1   | Renderização do Markdown    |
| remark-gfm              | 4.0.0   | Suporte a tabelas GFM       |
| @ducanh2912/next-pwa    | 10.2.9  | Service Worker / offline    |

---

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

> O Service Worker fica **desabilitado em desenvolvimento** por padrão — isso é esperado. Para testar o modo offline, use o build de produção.

### Build de produção

```bash
npm run build
npm start
```

O `next-pwa` gera `public/sw.js` e `public/workbox-*.js` automaticamente, cacheando HTML, JS/CSS e imagens para uso offline.

---

## Estrutura de arquivos

```
plano-treino-app/
├── app/
│   ├── layout.tsx           # Metadados, manifest, viewport, tema
│   ├── page.tsx             # Rota "/": lê o Markdown em build time (SSG)
│   └── globals.css          # Tailwind + estilos base
├── components/
│   ├── Header.tsx           # Cabeçalho com título e badge offline
│   ├── OfflineBadge.tsx     # Indicador online/offline (Client Component)
│   └── MarkdownRenderer.tsx # Renderização do Markdown via react-markdown
├── content/
│   └── plano_caminhada_joelho.md  # Conteúdo do plano (Markdown)
├── lib/
│   └── content.ts           # Leitura do .md via fs em build time
├── public/
│   ├── manifest.json        # Manifesto do PWA
│   └── icons/               # Ícones do PWA (192, 512, maskable)
├── next.config.mjs          # Config do Next.js + next-pwa
├── tailwind.config.ts       # Dark mode "media" + typography plugin
└── package.json
```

---

## Deploy

Hospedado na Vercel com deploy automático a cada push na branch `main`:

```bash
npx vercel
```

A página usa `export const dynamic = "force-static"`, garantindo HTML pré-renderizado e cache total via PWA mesmo sem conexão.
