# Paula Viena — Psicanalista

Landing page estática para **Paula Viena**, psicanalista. Construída com Next.js (export estático) e publicada no Cloudflare Workers (static assets).

**URL:** https://paulaviena.com

---

## O que a página traz

Uma página única (one-pager) em português, no mesmo visual do flyer digital de Paula: fundo roxo na seção hero, bloco verde com a foto e informações de atendimento, e um rodapé com botões de contato.

- Headline: _"Você aprendeu a ser forte para todo mundo. Mas quem cuida de você?"_
- CTA principal abre o **WhatsApp** (`47 99994-9255`) com uma mensagem inicial já escrita
- Link secundário para o Instagram **@paulaviena_psicanalista**
- Atendimento: análise para adultos, presencial e online

### Compartilhamento em redes sociais

A página inclui `og:image` e `twitter:card` (1200×630) com a foto de Paula, nome e frase principal, então o preview no WhatsApp, Instagram Direct, Facebook, LinkedIn e Twitter/X mostra a imagem correta em vez de um quadrado em branco.

---

## Stack

| Camada      | Escolha                           |
| ----------- | --------------------------------- |
| Framework   | Next.js 16 (`output: 'export'`)   |
| Styling     | Tailwind CSS v4                   |
| Fontes      | Inter (UI) + Dancing Script (logo)|
| Hospedagem  | Cloudflare Workers via Wrangler   |

Site 100% estático — sem backend, sem banco de dados.

---

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build & deploy

Cada push na `main` publica automaticamente via Cloudflare Workers Builds. Para publicar manualmente:

```bash
npm run deploy
```

Roda `next build` (gera `./dist/`) e em seguida `wrangler deploy` para publicar no Cloudflare Workers.

O Dependabot abre PRs semanais de atualização: patch e minor entram automaticamente, major aguardam revisão.

## Onde mexer

- `app/page.tsx` — conteúdo e layout da landing page
- `app/layout.tsx` — metadados (title, OG image, Twitter card, ícones)
- `public/` — foto `paula.png`, imagem de preview `og-image.png`, favicons
- `wrangler.toml` — configuração do Cloudflare Workers
