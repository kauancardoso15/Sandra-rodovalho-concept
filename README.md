<!-- deploy trigger -->

# Sandra Rodovalho Concept — Vitrine Digital

Pré-projeto comercial de um site profissional para a loja de moda feminina
**Sandra Rodovalho Concept**: uma vitrine digital premium que organiza o
catálogo (hoje divulgado pelo Instagram) em um site elegante, com painel
administrativo próprio, e direciona toda venda para o WhatsApp da loja.

> ⚠️ **Conteúdo demonstrativo (DEMO):** os produtos, categorias, preços,
> número de WhatsApp e textos institucionais deste projeto são fictícios e
> servem apenas para demonstrar o funcionamento do site. Veja a seção
> [O que substituir antes de publicar](#o-que-substituir-antes-de-publicar).

---

## Estrutura criada

### Site público (`app/(site)`)
| Rota | Descrição |
|---|---|
| `/` | Home — hero editorial, jornada Instagram → Site → Produto → WhatsApp → Venda, novidades, categorias, ofertas, Instagram, sobre |
| `/novidades` | Peças marcadas como novidade |
| `/categorias` | Grade de categorias |
| `/categorias/[slug]` | Produtos de uma categoria |
| `/produtos` | Catálogo completo com busca e filtros (categoria, faixa de preço, novidade, oferta) |
| `/produtos/[slug]` | Página do produto — preço, promoção, descrição e botão "Comprar pelo WhatsApp" |
| `/ofertas` | Produtos em promoção, com desconto calculado automaticamente |
| `/sobre` | Institucional da marca |
| `/contato` | WhatsApp e Instagram |

### Painel administrativo (`app/admin`)
| Rota | Descrição |
|---|---|
| `/admin/login` | Login (e-mail/senha) + "Esqueci minha senha" |
| `/admin/redefinir-senha` | Definir nova senha (fluxo real do Supabase Auth) |
| `/admin` | Dashboard com indicadores do catálogo |
| `/admin/produtos` | Listagem, ativar/desativar, marcar novidade/oferta, excluir |
| `/admin/produtos/novo` / `/admin/produtos/[id]` | Cadastrar/editar produto |
| `/admin/categorias` | Listagem e gestão de categorias |
| `/admin/categorias/novo` / `/admin/categorias/[id]` | Cadastrar/editar categoria |
| `/admin/instagram` | Gerencia as imagens da seção "Visto no Instagram" da Home |
| `/admin/instagram/novo` / `/admin/instagram/[id]` | Adicionar/editar imagem do Instagram |
| `/admin/configuracoes` | Nome da loja, logo, WhatsApp, Instagram, textos e imagens da Home/Sobre |

### Código
```
app/(site)/…          páginas públicas
app/admin/…            painel administrativo (protegido)
components/ui/         Button, Badge, Container, SectionHeading, ProductImage (com moldura elegante quando não há foto)
components/product/    ProductCard, ProductGrid, PriceTag (desconto automático), WhatsAppBuyButton, ProductFilters
components/category/   CategoryCard
components/home/       Hero, NewArrivalsSection, CategoriesSection, OffersSection, InstagramSection, AboutSection, JourneySection
components/layout/     Header, Footer, WhatsAppFloatingButton
components/admin/      Sidebar, LoginForm, ProductForm, CategoryForm, SettingsForm, InactivityProvider, ImageUploadField…
lib/                   types, config (constantes centrais), data (camada única de acesso a dados), demo-data, utils, supabase/*
supabase/schema.sql    schema idempotente + RLS + seed de demonstração
middleware.ts → proxy.ts   proteção de rotas /admin e renovação de sessão Supabase
```

## Tecnologias utilizadas
Next.js 16 (App Router + Server Actions) · TypeScript · Tailwind CSS v4 ·
Supabase (Auth + Postgres + Storage) · `@supabase/ssr`.

## Funcionalidades disponíveis
- Catálogo com busca, filtros (categoria, preço, novidade, oferta), páginas de produto e categoria.
- Desconto e badge "-X%" **sempre calculados automaticamente** a partir de preço e preço promocional — nunca digitados manualmente.
- Botão "Comprar pelo WhatsApp" no menu, na Home, em cada produto, no rodapé e como botão flutuante — todos usando o número centralizado em Configurações.
- Painel administrativo com autenticação real via Supabase Auth, proteção de rota no servidor (`proxy.ts` + verificação no layout do painel — nunca depende só de esconder o link).
- Logout automático por **inatividade** (não por tempo de página aberta) após `ADMIN_INACTIVITY_TIMEOUT_MS` (15 min, ajustável em `lib/config.ts`), com mensagem "Sua sessão foi encerrada por segurança."
- Recuperação de senha real (Supabase Auth) — link por e-mail → `/admin/redefinir-senha`.
- CRUD completo de produtos, categorias e imagens do Instagram, com upload de imagem para o Supabase Storage (ou colar uma URL).
- **Todas** as fotos do site são editáveis pelo painel: produtos, categorias, logo, hero da Home, imagem do Sobre e as imagens da seção "Visto no Instagram" — nenhuma foto fica presa no código.
- Estado elegante "Imagem não cadastrada" sempre que não há foto — nunca um ícone de imagem quebrada.
- SEO: `title`/`description`/Open Graph por página, `sitemap.xml`, `robots.txt`, URLs amigáveis.

## O que está funcionando agora (modo demonstração)
Sem nenhuma configuração adicional, o site público funciona 100% com dados
de exemplo (`lib/demo-data.ts`): 6 categorias e 8 produtos DEMO. É o que
você está vendo nos links abaixo.

## O que precisa do Supabase conectado
O login do painel (`/admin`), a recuperação de senha e a persistência real
de produtos/categorias/configurações dependem de um projeto Supabase:

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor, execute `supabase/schema.sql` (idempotente — pode rodar mais de uma vez sem apagar dados).
3. Copie `.env.local.example` para `.env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Crie o primeiro usuário em **Authentication → Users → Add user** (e-mail + senha) — não há cadastro público.
5. Reinicie o servidor (`npm run dev`).

Isso está **preparado e documentado**, não implementado de forma falsa: sem
o Supabase configurado, a tela de login explica isso claramente em vez de
fingir autenticar.

> Já conectou o Supabase antes e o `schema.sql` mudou depois (ex.: bucket
> `instagram-images` adicionado)? Basta rodar o arquivo de novo no SQL
> Editor — é idempotente, então só adiciona o que falta, sem apagar nada
> que já existe.

## Como acessar o painel administrativo
- URL: `/admin` (redireciona para `/admin/login` se não houver sessão).
- Sem Supabase configurado: a tela explica que a conexão precisa ser feita (ver acima).
- Com Supabase configurado: entre com o e-mail/senha criados no passo 4 acima.

## O que substituir antes de publicar
- [ ] Todos os produtos e categorias DEMO (`lib/demo-data.ts` / seed do `schema.sql`) pelos produtos reais, cadastrados pelo painel.
- [ ] Número de WhatsApp (`Configurações`).
- [ ] Link e usuário do Instagram (`Configurações`).
- [ ] Textos e imagens da Home e da seção Sobre (`Configurações`).
- [ ] Fotos reais de produtos e categorias (hoje mostram a moldura "Imagem não cadastrada").
- [ ] Domínio real em `NEXT_PUBLIC_SITE_URL` (usado no SEO/sitemap).

## Rodando localmente
```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Suba o código para um repositório no GitHub/GitLab/Bitbucket.
2. Em [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório. O framework (Next.js) é detectado automaticamente, nenhum ajuste de build é necessário.
3. Em **Settings → Environment Variables**, cadastre:

   | Variável | Valor |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | URL do seu projeto Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública (`anon`/`publishable`) do Supabase — **nunca** a `service_role` |
   | `NEXT_PUBLIC_SITE_URL` | O domínio final do site (ex.: `https://sandrarodovalhoconcept.com.br` ou o `https://SEU-PROJETO.vercel.app` gerado pela Vercel) — usado no SEO, Open Graph e `sitemap.xml` |

4. Deploy. Depois do primeiro deploy, se você definiu um domínio próprio na Vercel, atualize `NEXT_PUBLIC_SITE_URL` para esse domínio definitivo e faça um novo deploy (redeploy) para o sitemap/SEO refletirem a URL certa.
5. Crie o usuário administrador (se ainda não existir) em **Supabase → Authentication → Users → Add user** e teste o login em `https://SEU-DOMINIO/admin/login`.

Nenhuma configuração adicional de servidor é necessária — o projeto não depende de `localhost` em nenhum lugar do código (tudo lê de `NEXT_PUBLIC_SITE_URL`/variáveis de ambiente), e a proteção do `/admin` (via `proxy.ts`, a convenção de middleware do Next.js) funciona nativamente na Vercel.
